import styles from './Main.module.css'
import { PlusCircle, Trash } from 'phosphor-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../Task/Task';
import { TasksCounter } from '../TasksCounter/TasksCounter';
import { EmptyTaskList } from '../EmptyTaskList/EmptyTaskList';

export function Main() {

  interface Task {
    id: string;
    content: string;
    isComplete: boolean;
  }

  const storedTaskList = JSON.parse(localStorage.getItem('taskList')!) //the exclamation point addresses the fact that TS expects string and the JSON.stringify method may return string OR null
  const [taskList, setTaskList] = useState<Task[]>(storedTaskList)
  const [newTask, setNewTask] = useState("")
  const [completedTask, setCompletedTask] = useState(false)

  const uuid = uuidv4()
  
  const taskModel = {
    id: uuid,
    content: newTask,
    isComplete: completedTask
  }

  //implemented to make sure that the state change is recorded and re-render the component
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList))
  }, [taskList])

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    if(newTask !== "") {
      setTaskList([...taskList, taskModel])
      localStorage.setItem('taskList', JSON.stringify(taskList))
      setNewTask("")
    } else {
      return window.alert("Please write a description for your task first =)");
    }
  }

  function removeTask(taskToDelete: Task) {
    const taskListWithoutDeletedTask = taskList.filter(task => {
      return task.id !== taskToDelete.id
    })

    setTaskList(taskListWithoutDeletedTask)
  }

  function isTaskCompleted(taskToComplete: Task) {
    let mappedTasks = taskList.map(task => {
      if (task.id === taskToComplete.id) {
        return {...task, isComplete: !task.isComplete}
      } else {
        return {...task}
      }
    })

    setTaskList(mappedTasks)
  }

  return(
    <main className={styles.mainWrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.taskInput}>
          <input
            type="text"
            placeholder="Let's do stuff!"
            value={newTask}
            onChange={handleNewTaskChange}
          />
          <button
            type="submit"
            disabled={newTask.length === 0}
          >
            Create <PlusCircle size={20}/>
          </button>
        </form>
        <section className={styles.taskListWrapper}>
          <TasksCounter taskList={taskList}/>

          {/* if the list is empty it returns the container with message and svg */}
          { taskList.length === 0 && <EmptyTaskList /> }

          <div className={styles.taskList}>
            {taskList.map((task) => {
              return <Task task={task} onCompletedTask={isTaskCompleted} onRemoveTask={removeTask} />
            })}
          </div>
        </section>
      </main>
  )
}