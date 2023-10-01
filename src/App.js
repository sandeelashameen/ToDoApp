import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setEditingIndex(index);
    setTaskText(tasks[index].text);
  };

  const saveEditedTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = taskText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setTaskText('');
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setTaskText('');
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={editingIndex !== null ? () => saveEditedTask(editingIndex) : addTask}>
          {editingIndex !== null ? 'Save' : 'Add'}
        </button>
        {editingIndex !== null && (
          <button className="cancel-button" onClick={cancelEditing}>
            Cancel
          </button>
        )}
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {editingIndex === index ? (
              <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
            ) : (
              <span>{task.text}</span>
            )}
            <div className="task-actions">
              {editingIndex === index ? (
                <button onClick={() => saveEditedTask(index)}>Save</button>
              ) : (
                <>
                  <button onClick={() => toggleTaskCompletion(index)}>
                    {task.completed ? 'Uncomplete' : 'Complete'}
                  </button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                  <button onClick={() => editTask(index)}>Edit</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
