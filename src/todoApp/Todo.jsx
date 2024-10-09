import { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import "./Todo.css";

export const Todo = () => {
  const [inputValue, setInputValue] = useState({ id: "", content: "", checked: false });
  const [task, setTask] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const handleInputChange = (value) => {
    setInputValue({ id: Date.now().toString(), content: value, checked: false });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on submit
    if (!inputValue.content) return; // Prevent empty tasks

    const ifTodoContentMatched = task.find((curTask) => curTask.content === inputValue.content);
    if (ifTodoContentMatched) return; // Prevent duplicate tasks

    setTask((prevTask) => [...prevTask, inputValue]);
    setInputValue({ id: "", content: "", checked: false }); // Reset input
  };

  // Get date and time
  const getDateTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    setDateTime(`${formattedDate} - ${formattedTime}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getDateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle delete task
  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curTask) => curTask.content !== value);
    setTask(updatedTask);
  };

  // Handle clear all tasks
  const handleClearTodoData = () => {
    setTask([]);
  };

  // Handle check/uncheck task
  const handleCheckedTodo = (content) => {
    const updatedTask = task.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      }
      return curTask;
    });
    setTask(updatedTask);
  };

  

  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <h2 className="date-time">{dateTime}</h2>
      </header>
      <section className="form">
        <form onSubmit={handleFormSubmit}>
          <div>
            <input
              type="text"
              className="todo-input"
              autoComplete="off"
              value={inputValue.content}
              onChange={(event) => handleInputChange(event.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="todo-btn">
              Add Task
            </button>
          </div>
        </form>
      </section>
      <section className="myUnOrdList">
        <ul>
          {task.map((curTask) => (
            <li key={curTask.id} className="todo-item">
              <span className={curTask.checked ? "checkList" : "notCheckList"}>{curTask.content}</span>
              <button className="check-btn" onClick={() => handleCheckedTodo(curTask.content)}>
                <MdCheck />
              </button>
              <button className="delete-btn" onClick={() => handleDeleteTodo(curTask.content)}>
                <MdDeleteForever />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <button className="clear-btn" onClick={handleClearTodoData}>
          Clear all
        </button>
      </section>
    </section>
  );
};
