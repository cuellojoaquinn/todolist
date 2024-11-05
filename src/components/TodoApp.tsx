import { useState } from 'react';
import './TodoApp.css'; // Importamos el archivo CSS

interface taskItem {
  id: string;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<taskItem[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask !== '') {
      const newId = crypto.randomUUID();
      const newTodoItem: taskItem = {
        id: newId,
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTodoItem]);
      setNewTask('');
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = tasks.filter((task) => task.id !== id);
    setTasks(updatedTodos);
  };

  const toggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Tus tareas</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Añadir tarea</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.text}
            </span>
            <button className="remove-button" onClick={() => removeTodo(task.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
