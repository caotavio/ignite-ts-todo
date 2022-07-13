import styles from './TasksCounter.module.css'

interface Task {
  id: string;
  content: string;
  isComplete: boolean;
}

interface TaskListProps {
  taskList: Task[];
}

export function TasksCounter({ taskList }: TaskListProps) {
  const countCompletedTasks = taskList.reduce((counter, obj) => {
    if (obj.isComplete === true) {
      counter = counter + 1
    }
    return counter
  }, 0)

  return(
    <div className={styles.taskListHeader}>
      <strong className={styles.createdCounter}>Created Tasks <span>{taskList.length}</span></strong>
      <strong className={styles.completedCounter}>
        Completed {taskList.length === 0 ?
          <span>{taskList.length}</span> :
          <span>{countCompletedTasks} of {taskList.length}</span>}
      </strong>
    </div>
  )
}