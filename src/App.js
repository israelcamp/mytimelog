import "./App.css";
import React, { useState } from "react";

function calculateHourMinutes(deltaSeconds) {
  const hours = Math.floor(deltaSeconds / 3600);
  const minutes = Math.round((deltaSeconds - hours * 3600) / 60);
  return { hours, minutes };
}

function calculateDelta(end, start) {
  const deltaSeconds = (end - start) / 1000;
  const { hours, minutes } = calculateHourMinutes(deltaSeconds);
  return {
    hours,
    minutes,
    deltaSeconds,
    start,
    end,
  };
}

function dateDisplay(date) {
  const h = date.getHours();
  const m = `${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
  return `${h}:${m}`;
}

function logTasks(tasksLogs) {
  return (
    <table>
      <tbody>
        {tasksLogs.map(({ name, duration }) => (
          <tr key={name} className="tr-logs">
            <td className="td-duration">{`${duration.hours}h ${duration.minutes}min`}</td>
            <td className="td-interval">{`${dateDisplay(
              duration.start
            )} - ${dateDisplay(duration.end)}`}</td>
            <td className="td-name">{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function totalLogDisplay(tasksLogs) {
  console.log(tasksLogs);
  if (tasksLogs.length < 1) return;
  var totalSeconds = 0;
  for (const a of tasksLogs) totalSeconds += a.duration.deltaSeconds;
  const { hours, minutes } = calculateHourMinutes(totalSeconds);

  const hoursLeft = hours < 8 ? 8 - hours - 1 : 0;
  const minutesLeft = hours < 8 ? 60 - minutes : 0;

  return (
    <table>
      <tbody>
        <tr className="tr-work">
          <td className="td-name">Work Done:</td>
          <td className="td-duration">{`${hours}h ${
            minutes < 10 ? "0" : ""
          }${minutes}min`}</td>
        </tr>
        <tr className="tr-work">
          <td className="td-name">Time Left:</td>
          <td className="td-duration">{`${hoursLeft}h ${
            minutesLeft < 10 ? "0" : ""
          }${minutesLeft}min`}</td>
        </tr>
      </tbody>
    </table>
  );
}

function App() {
  const [taskName, setTaskName] = useState("arrived **");
  const [taskStartTime, setTaskStartTime] = useState(null);
  const [tasksLogs, setTasksLogs] = useState([]);

  const handleLog = (taskName, start, end) => {
    const duration = calculateDelta(end, start);
    const newLog = {
      name: taskName,
      duration,
    };
    setTasksLogs([...tasksLogs, newLog]);
    setTaskName("");
    setTaskStartTime(end);
  };

  const handleAddClick = () => {
    // start counting
    if (taskName === "arrived **") {
      const start = new Date();
      handleLog(taskName, start, start);
    } else if (taskName.length > 0) {
      const end = new Date(); // we ended previous task
      handleLog(taskName, taskStartTime, end);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>{totalLogDisplay(tasksLogs)}</div>
        <div className="Insert-task">
          <input
            className="input-task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          ></input>
          <button onClick={handleAddClick}>Add</button>
        </div>
        <div>{logTasks(tasksLogs)}</div>
      </header>
    </div>
  );
}

export default App;
