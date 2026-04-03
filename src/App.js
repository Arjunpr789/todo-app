import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (data) setTasks(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const pending = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <h1>🌿 To-Do App</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet</p>
          ) : (
            tasks.map((t) => (
              <div className="task" key={t.id}>
                <div className="left">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                  />
                  <span className={t.completed ? "done" : ""}>
                    {t.text}
                  </span>
                </div>

                <button
                  className="delete"
                  onClick={() => deleteTask(t.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <p className="pending">Pending: {pending}</p>
      </div>
    </div>
  );
}