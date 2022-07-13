import styles from './EmptyTaskList.module.css'
import clipboard from '../../assets/clipboard.svg'

export function EmptyTaskList() {
  return(
    <div className={styles.emptyTaskList}>
      <img src={clipboard} alt="clipboard image" />
      <div>
        <strong>You still haven't created any tasks</strong>
        <p>Start your journey to become more organized</p>
      </div>
    </div>
  )
}