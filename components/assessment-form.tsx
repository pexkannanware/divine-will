"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Icon } from "@/components/landing-page";
import {
  assessmentSections,
  domainInterpretation,
  overallInterpretation,
  responseOptions,
  resultLevel,
  totalQuestionCount,
  type AssessmentDomain,
} from "@/data/assessment-data";

type Answers = Record<number, number>;

export function AssessmentForm({ selectedAssessment }: { selectedAssessment: string }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const remainingCount = totalQuestionCount - answeredCount;
  const scores = useMemo(() => {
    let questionIndex = 0;
    const domains = {} as Record<AssessmentDomain, number>;
    assessmentSections.forEach((section) => {
      domains[section.domain] = section.questions.reduce((total) => {
        const value = answers[questionIndex] ?? 0;
        questionIndex += 1;
        return total + value;
      }, 0);
    });
    return { domains, total: Object.values(answers).reduce((sum, value) => sum + value, 0) };
  }, [answers]);

  const elevatedAreas = assessmentSections.filter((section) => {
    const max = section.questions.length * 3;
    return resultLevel(scores.domains[section.domain], max) === "support";
  });

  function submitAssessment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answeredCount !== totalQuestionCount) {
      const firstUnanswered = Array.from({ length: totalQuestionCount }, (_, index) => index).find((index) => answers[index] === undefined);
      setAttemptedSubmit(true);
      setShowResults(false);
      setError(`${remainingCount} ${remainingCount === 1 ? "answer is" : "answers are"} still needed before your results can be shown.`);
      window.setTimeout(() => {
        const missingQuestion = document.getElementById(`assessment-question-${(firstUnanswered ?? 0) + 1}`);
        missingQuestion?.scrollIntoView({ behavior: "smooth", block: "center" });
        missingQuestion?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
      }, 50);
      return;
    }
    setError("");
    setAttemptedSubmit(false);
    setShowResults(true);
    window.setTimeout(() => document.getElementById("assessment-results")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function answerQuestion(index: number, value: number) {
    const nextRemaining = remainingCount - (answers[index] === undefined ? 1 : 0);
    setAnswers((current) => ({ ...current, [index]: value }));
    if (attemptedSubmit) {
      setError(nextRemaining === 0
        ? ""
        : `${nextRemaining} ${nextRemaining === 1 ? "answer is" : "answers are"} still needed before your results can be shown.`);
    }
  }

  function resetAssessment() {
    setAnswers({});
    setShowResults(false);
    setError("");
    setAttemptedSubmit(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let questionNumber = 0;

  return (
    <>
      <section className="assessment-intro">
        <div>
          <p className="eyebrow">Client self-assessment form</p>
          <h1>Emotional Well-being Self-Assessment</h1>
          <p className="assessment-for">Your focus: <strong>{selectedAssessment}</strong> <span aria-hidden="true">·</span> Results across all 8 areas</p>
        </div>
        <div className="assessment-key">
          <span><Icon name="clock" /> Past 2 weeks</span>
          <span><Icon name="lock" /> Answers stay on this device</span>
        </div>
      </section>

      <form className="screening-form" onSubmit={submitAssessment}>
        <section className="client-details" aria-labelledby="client-details-title">
          <div>
            <p className="eyebrow">Before you begin</p>
            <h2 id="client-details-title">About you</h2>
          </div>
          <div className="client-fields">
            <label>Name <input name="name" type="text" autoComplete="name" placeholder="Your name" /></label>
            <label>Date <input name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></label>
            <label>Age <input name="age" type="number" min="12" max="120" placeholder="Age" /></label>
            <label>Gender <select name="gender" defaultValue=""><option value="">Prefer not to say</option><option>Woman</option><option>Man</option><option>Non-binary</option><option>Self-describe</option></select></label>
          </div>
        </section>

        <section className="screening-instructions" aria-labelledby="instructions-title">
          <div>
            <p className="eyebrow">Instructions</p>
            <h2 id="instructions-title">Think about the past 2 weeks</h2>
            <p>Choose the answer that best describes your experience. There are no right or wrong answers; answer honestly based on how you have felt recently.</p>
          </div>
          <div className="scale-guide" aria-label="Response scale">
            {responseOptions.map((option) => <div key={option.value}><strong>{option.value}</strong><span>{option.detail}</span></div>)}
          </div>
        </section>

        <div className={`assessment-progress ${attemptedSubmit && remainingCount > 0 ? "has-missing-answers" : ""}`} id="assessment-progress" aria-live="polite">
          <div className="assessment-progress-copy"><span><strong>{answeredCount}</strong> of {totalQuestionCount} answered</span>{attemptedSubmit && remainingCount > 0 && <strong className="remaining-answers">Complete {remainingCount} more to see results</strong>}</div>
          <div className="progress-track"><span style={{ width: `${(answeredCount / totalQuestionCount) * 100}%` }} /></div>
        </div>

        {assessmentSections.map((section, sectionIndex) => (
          <fieldset className="question-section" key={section.domain}>
            <legend><span>{String(sectionIndex + 1).padStart(2, "0")}</span>{section.label}</legend>
            <div className="question-list">
              {section.questions.map((question) => {
                const index = questionNumber++;
                return (
                  <div
                    className={`question-card ${answers[index] !== undefined ? "answered" : ""} ${attemptedSubmit && answers[index] === undefined ? "question-missing" : ""}`}
                    id={`assessment-question-${index + 1}`}
                    key={question}
                  >
                    <p><span>{index + 1}</span>{question}</p>
                    <div className="answer-options" role="radiogroup" aria-label={`Question ${index + 1}`} aria-invalid={attemptedSubmit && answers[index] === undefined}>
                      {responseOptions.map((option) => (
                        <label key={option.value}>
                          <input
                            type="radio"
                            name={`question-${index + 1}`}
                            value={option.value}
                            checked={answers[index] === option.value}
                            onChange={() => answerQuestion(index, option.value)}
                          />
                          <span><strong>{option.value}</strong><small>{option.short}</small></span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="assessment-submit">
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button-primary" type="submit" aria-controls="assessment-results" aria-expanded={showResults}>See my results <Icon name="arrow" /></button>
          <p>Your answers are calculated only in your browser and are not submitted to us.</p>
        </div>
      </form>

      {showResults && (
        <section className="assessment-results" id="assessment-results" aria-live="polite">
          <div className="result-heading">
            <p className="eyebrow">Your screening result</p>
            <h2>{overallInterpretation(scores.total)}</h2>
            <p>Your answers point to the areas below. This is a check-in, not a label.</p>
          </div>
          <div className="result-legend" aria-label="Result level guide">
            <span className="low"><i /> Good</span>
            <span className="notice"><i /> Average</span>
            <span className="support"><i /> Needs attention</span>
          </div>
          <div className="domain-results">
            {assessmentSections.map((section) => {
              const max = section.questions.length * 3;
              const score = scores.domains[section.domain];
              const level = resultLevel(score, max);
              return (
                <article className={`result-card result-${level}`} key={section.domain}>
                  <div className="result-card-top"><span className="result-status"><i />{level === "low" ? "Good" : level === "notice" ? "Average" : "Needs attention"}</span><strong>{score}<small>/{max}</small></strong></div>
                  <h3>{section.label}</h3>
                  <p className="result-short-label">{section.shortLabel}</p>
                  <span className="result-meter"><i style={{ width: `${(score / max) * 100}%` }} /></span>
                  <p>{domainInterpretation(score, max)}</p>
                </article>
              );
            })}
          </div>
          {elevatedAreas.length > 0 && (
            <div className="result-gentle-alert" role="status">
              <span className="gentle-alert-icon"><Icon name="spark" /></span>
              <div><p className="eyebrow">A gentle nudge</p><h3>You deserve support with {elevatedAreas.map((area) => area.label).join(", ")}.</h3><p>You do not need to wait until things feel unbearable. A confidential conversation can be a small, positive next step.</p></div>
            </div>
          )}
          <div className="result-important">
            <Icon name="spark" className="h-7 w-7" />
            <div><h3>A caring reminder</h3><p>These results support reflection and a counselling conversation; they do not establish a diagnosis. Whatever your result, your experience is valid and help is available whenever you would like it.</p></div>
          </div>
          <div className="result-contact">
            <div><p className="eyebrow">You do not have to interpret this alone</p><h2>Talk through your result with care.</h2><p>Contact The Divine Will for a confidential conversation and appropriate professional guidance.</p></div>
            <div className="result-actions"><Link href="/contact" className="button-light">Contact us <Icon name="arrow" /></Link><a href="tel:+919884619519" className="button-outline-light"><Icon name="phone" /> Call us</a></div>
          </div>
          <button className="reset-assessment" type="button" onClick={resetAssessment}>Clear answers and start again</button>
        </section>
      )}
    </>
  );
}
