import { useState } from "react";

export const TodoList = () => {
    const [tasks, setTasks] = useState(['Read a book', 'Buy grocery'])

    const addTask = () => {
        setTasks([...tasks, "New task"])
    }
  return (
    <div>
        <ul>
            {tasks.map((task, index) => {
                <li key={index}>{task}</li>
            })}
        </ul>
        <p>{tasks}</p>
        <button onClick={addTask}>Add Task</button>
    </div>
  )
}
