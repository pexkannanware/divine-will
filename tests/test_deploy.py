"""Exercise the real deployment script with isolated Docker/HTTP command doubles."""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
SHA = 'a' * 40


class DeploymentTests(unittest.TestCase):
    def scenario(self, failure='', owner='correct'):
        with tempfile.TemporaryDirectory() as temp:
            base = Path(temp).resolve()
            app = base / 'app'
            release = app / 'releases' / f'{SHA}-123-1'
            release.mkdir(parents=True)
            (app / 'docker-compose.yml').write_text('previous configuration\n')
            (app / '.deployed-revision').write_text('previous-sha\n')
            (release / 'docker-compose.production.yml').write_text('new configuration\n')
            (release / 'image.tar.gz').touch()
            script = (ROOT / 'scripts/deploy-droplet.sh').read_text()
            script = script.replace('/var/www/divine-will', str(app))
            script = script.replace('/var/lock/shared-web-proxy.lock', str(base / 'proxy.lock'))
            deploy = base / 'deploy.sh'
            deploy.write_text(script)
            commands = base / 'bin'
            commands.mkdir()
            flock = commands / 'flock'
            flock.write_text('#!/bin/sh\nexit 0\n')
            flock.chmod(0o755)
            docker = commands / 'docker'
            docker.write_text('''#!/usr/bin/env python3
import os,sys
from pathlib import Path
args=sys.argv[1:]; line=' '.join(args)
p=Path(os.environ['CASE_DIR'])
with (p/'commands').open('a') as f: f.write(line+'\\n')
if args[:1]==['inspect']:
    if '.Image' in line: print('sha256:previous')
    elif 'working_dir' in line: print(os.environ['APP_DIR'] if os.environ['OWNER']=='correct' else '/other-site')
    elif 'project"' in line: print('divine-will')
    elif 'service"' in line: print('web')
elif args[:2]==['image','inspect']: print('a'*40)
elif ' up ' in ' '+line+' ':
    if not (p/'up-attempted').exists():
        (p/'up-attempted').touch()
        if os.environ['FAILURE']=='health': sys.exit(1)
''')
            curl = commands / 'curl'
            curl.write_text('''#!/usr/bin/env python3
import os,sys,json
from pathlib import Path
if '/api/health' in sys.argv[-1]:
    if os.environ['FAILURE']=='revision': print('wrong revision')
    else: print(json.dumps({'status':'ok','revision':'a'*40},separators=(',',':')))
elif os.environ['FAILURE']=='https':
    p=Path(os.environ['CASE_DIR'])/'https-attempted'
    if not p.exists(): p.touch(); sys.exit(1)
''')
            docker.chmod(0o755)
            curl.chmod(0o755)
            result = subprocess.run(['bash', str(deploy), str(release), SHA],
                                    env={**os.environ, 'PATH': f'{commands}:'+os.environ['PATH'],
                                         'CASE_DIR': temp, 'APP_DIR': str(app),
                                         'OWNER': owner, 'FAILURE': failure},
                                    capture_output=True, text=True)
            self.assertTrue((base / 'commands').exists(), result.stdout + result.stderr)
            log = (base / 'commands').read_text()
            if failure or owner != 'correct':
                self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertEqual((app / 'docker-compose.yml').read_text(), 'previous configuration\n')
                self.assertEqual((app / '.deployed-revision').read_text(), 'previous-sha\n')
                if owner == 'correct':
                    self.assertIn('tag sha256:previous divine-will:latest', log)
                    self.assertIn('Previous deployment restored.', result.stderr)
                else:
                    self.assertNotIn('load --input', log)
                    self.assertNotIn(' up ', log)
            else:
                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertEqual((app / '.deployed-revision').read_text(), SHA+'\n')
                self.assertEqual((app / 'docker-compose.yml').read_text(), 'new configuration\n')
                self.assertTrue((release / 'succeeded').exists())
            self.assertNotIn('down', log)
            self.assertNotIn('prune', log)
            self.assertNotIn('restart', log)

    def test_success(self): self.scenario()
    def test_health_failure_rolls_back(self): self.scenario('health')
    def test_https_failure_rolls_back(self): self.scenario('https')
    def test_revision_mismatch_rolls_back(self): self.scenario('revision')
    def test_foreign_owner_is_refused(self): self.scenario(owner='foreign')


if __name__ == '__main__':
    unittest.main()
