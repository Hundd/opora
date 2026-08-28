import type { Exercise } from '../data/exercises'

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <article className="exercise">
      <div className="tags">
        <span className="tag">{exercise.time}</span>
        {exercise.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <h3>{exercise.name}</h3>
      <p className="muted">{exercise.why}</p>
      <ol>
        {exercise.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="cue">{exercise.cue}</p>
    </article>
  )
}
