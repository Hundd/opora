import type { Exercise } from '../data/exercises'
import { ui } from '../ui'
import { ExerciseFigure } from './ExerciseFigure'

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <article className={ui.exercise}>
      <ExerciseFigure id={exercise.id} />
      <div className={ui.tags}>
        <span className={ui.tag}>{exercise.time}</span>
        {exercise.tags.map((tag) => (
          <span className={ui.tag} key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <h3>{exercise.name}</h3>
      <p className={ui.muted}>{exercise.why}</p>
      <ol>
        {exercise.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className={ui.cue}>{exercise.cue}</p>
    </article>
  )
}
