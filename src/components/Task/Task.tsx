import { Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface Task {
  id: string;
  content: string;
  isComplete: boolean;
}

interface TaskProps {
  task: Task;
  onCompletedTask: (taskToComplete: Task) => void;
  onRemoveTask: (taskToDelete: Task) => void;
}

export function Task({ task, onCompletedTask, onRemoveTask }: TaskProps) {
  function handleCompletedTask() {
    onCompletedTask(task)
  }

  function handleRemoveTask() {
    onRemoveTask(task)
  }

  return(
    <div key={task.id} className={styles.taskWrapper}>
      <div className={styles.taskContent}>
        <div className={styles.customCheckbox}>
          <input
            type="checkbox"
            checked={task.isComplete}
            onChange={() => handleCompletedTask()}
            id={task.id}
          />
          <label htmlFor={task.id}></label>
        </div>
        <p className={task.isComplete === true ? styles.test : ""}>{task.content}</p>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => handleRemoveTask()}
      >
        <Trash />
      </button>
    </div>
  )
}