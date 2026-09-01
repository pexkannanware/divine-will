import Image from "next/image";
import Link from "next/link";
import { PageCTA, SiteFrame } from "@/components/interior-pages";
import { Icon } from "@/components/landing-page";

const schoolTopics = [
  "Emotional Intelligence & Emotional Regulation",
  "Stress, Anxiety & Coping Skills",
  "Self-Esteem & Self-Confidence",
  "Adolescence & Emotional Changes",
  "Peer Pressure & Social Influences",
  "Healthy Relationships & Boundaries",
  "Bullying, Cyberbullying & Its Psychological Impact",
  "Exam Stress & Performance Anxiety",
  "Mindfulness & Resilience",
  "Understanding Behaviour & Emotional Needs",
  "Parenting & Adolescent Psychology",
  "Teacher Well-being & Burnout Prevention",
  "Mental Health Awareness",
  "Digital & Social Media Influence on Mental Health",
];

const corporateTopics = [
  "Workplace Stress Management",
  "Emotional Intelligence at Work",
  "Burnout Awareness & Prevention",
  "Workplace Anxiety & Emotional Well-being",
  "Communication & Interpersonal Skills",
  "Conflict Management",
  "Healthy Boundaries at Work",
  "Resilience & Coping with Change",
  "Work-Life Balance",
  "Employee Mental Health Awareness",
  "Leadership & Emotional Intelligence",
  "Managing Difficult Workplace Relationships",
  "Motivation & Positive Workplace Culture",
  "Psychological Safety & Well-being",
];

const programmeFormats = [
  "Awareness Workshops",
  "Interactive Training Sessions",
  "Group Sessions",
  "Faculty & Employee Training",
  "Parent Sessions",
  "Student Programmes",
  "Customised Corporate Programmes",
];

const gallery = [
  { src: "/images/workshops/being-a-child-indoor-display.png", alt: "Being a Child in Childhood interactive workshop for students in classes six to eight", title: "Being a Child in Childhood", meta: "Classes VI–VIII" },
  { src: "/images/workshops/emotional-wellbeing-boys.jpeg", alt: "Boys attending an emotional well-being school workshop", title: "Emotional Well-being", meta: "Classes IX–XI" },
  { src: "/images/workshops/fear-free-board-exams.jpeg", alt: "Students participating in a fear-free board exams workshop", title: "Fear-Free Board Exams", meta: "Class X" },
  { src: "/images/workshops/being-a-child-outdoor-display.png", alt: "Students participating in an outdoor school workshop", title: "Learning through conversation", meta: "Interactive school session" },
  { src: "/images/workshops/emotional-wellbeing-girls-display.png", alt: "Girls taking part in an emotional well-being workshop", title: "Emotional awareness", meta: "Student programme" },
];

function TopicList({ topics }: { topics: string[] }) {
  return (
    <ul className="workshop-topic-list">
      {topics.map((topic) => <li key={topic}><Icon name="check" /> <span>{topic}</span></li>)}
    </ul>
  );
}

export function WorkshopsTrainingPage() {
  return (
    <SiteFrame>
      <section className="workshops-hero">
        <div className="workshops-hero-mark" aria-hidden="true">W</div>
        <div className="mx-auto grid max-w-site items-end gap-12 px-5 py-20 lg:grid-cols-[1.2fr_.8fr] lg:px-8 lg:py-28">
          <div className="relative z-10 reveal">
            <p className="eyebrow">Workshops &amp; Training</p>
            <h1>Building healthier minds, stronger relationships &amp; <span>resilient workplaces.</span></h1>
          </div>
          <div className="workshops-hero-copy reveal">
            <p>Psychology-based programmes that turn meaningful ideas into practical skills people can use in everyday life.</p>
            <Link href="/contact" className="button-primary">Invite us for a workshop <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="workshops-intro section bg-white">
        <div className="mx-auto grid max-w-site gap-10 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div className="reveal"><p className="eyebrow">Practical psychology</p><h2>Designed around the people in the room.</h2></div>
          <div className="workshops-lead reveal">
            <p>At The Divine Will Counseling Centre, we conduct psychology-based workshops and training programmes designed to promote emotional well-being, self-awareness, resilience and healthier interpersonal relationships.</p>
            <p>Our sessions are interactive, practical and tailored to the specific needs of the audience—helping participants understand psychological concepts and apply them meaningfully in their everyday lives.</p>
          </div>
        </div>
      </section>

      <section className="workshop-audiences section bg-mist">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="workshop-audience-grid">
            <article className="workshop-audience reveal">
              <div className="workshop-audience-heading"><span>01</span><div><p className="eyebrow">Students · Teachers · Parents</p><h2>For Schools</h2></div></div>
              <p>Programmes for students, teachers, parents and school communities, with a focus on creating emotionally healthy and supportive environments.</p>
              <h3>Key topics include</h3>
              <TopicList topics={schoolTopics} />
            </article>
            <article className="workshop-audience reveal">
              <div className="workshop-audience-heading"><span>02</span><div><p className="eyebrow">Teams · Leaders · Organisations</p><h2>For Corporates</h2></div></div>
              <p>Programmes focused on psychological well-being, effective interpersonal functioning and healthier workplace environments.</p>
              <h3>Key topics include</h3>
              <TopicList topics={corporateTopics} />
            </article>
          </div>
        </div>
      </section>

      <section className="workshop-custom section bg-navy text-white">
        <div className="mx-auto grid max-w-site gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div className="reveal"><p className="eyebrow">Customised training programmes</p><h2>Built for your setting, people and goals.</h2><p>Every organisation has different needs. We shape sessions around the age group, workplace environment, organisational requirements and psychological concerns identified by the institution.</p></div>
          <div className="workshop-formats reveal">
            {programmeFormats.map((format, index) => <span key={format}><small>{String(index + 1).padStart(2, "0")}</small>{format}</span>)}
          </div>
        </div>
      </section>

      <section className="workshop-gallery-section section bg-white">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="workshop-gallery-heading reveal"><div><p className="eyebrow">Workshop gallery</p><h2>Learning that feels alive and participatory.</h2></div><p>Moments from school programmes on emotional well-being, childhood and exam confidence.</p></div>
          <div className="workshop-gallery">
            {gallery.map((image, index) => (
              <figure className={`workshop-gallery-item workshop-gallery-item-${index + 1} reveal`} key={image.src}>
                <Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"} />
                <figcaption><span>{image.title}</span><small>{image.meta}</small></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="workshop-invite section bg-mist">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="workshop-invite-card reveal">
            <span className="workshop-invite-icon"><Icon name="workshop" /></span>
            <div><p className="eyebrow">Invite us for a workshop</p><h2>Let’s create something relevant, practical and psychologically meaningful.</h2><p>If your school, educational institution, company or organisation wants to build awareness around mental health, emotional well-being and psychological development, we would be happy to collaborate.</p></div>
            <Link href="/contact" className="button-light">Discuss your requirements <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
      <PageCTA title="Bring thoughtful psychological learning to your community." />
    </SiteFrame>
  );
}
