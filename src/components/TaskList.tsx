import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(newTask: any) {
    
    const randomId = ()=>{
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }

    newTask = {id:randomId(), title: newTaskTitle , isComplete: true}

    if(newTask.title !== ''){    
    setTasks([...tasks, newTask])
    setNewTaskTitle('')  
    }      

  }

  function handleToggleTaskCompletion(id: number) {
    
    const completedTasks = tasks.map(task => {
      if(task.id === id && task.isComplete === false){
        task.isComplete = true
      }
      else if(task.id === id && task.isComplete === true){
        task.isComplete = false
      }
      return task      
    })
    setTasks(completedTasks)   
  }

  function handleRemoveTask(id: number) {
    const tasksNotDeleted = tasks.filter(task => {
      if(task.id !== id)
      return task  
   
  })
    setTasks(tasksNotDeleted)
  
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}

          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : 'incompleted'} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button title="Adicionar tarefa" type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}          
        </ul>
      </main>
    </section>
  )
}