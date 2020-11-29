import "./App.css";
import React, { useState, useEffect } from "react";

function calculateHourMinutes(deltaSeconds) {
  const hours = Math.floor(deltaSeconds / 3600);
  const minutes = Math.floor((deltaSeconds - hours * 3600) / 60);
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
  if (tasksLogs.length < 1) return;
  var totalSeconds = 0;
  for (const a of tasksLogs) totalSeconds += a.duration.deltaSeconds;
  const { hours, minutes } = calculateHourMinutes(totalSeconds);

  let hoursLeft = hours < 8 ? 8 - hours - 1 : 0;
  let minutesLeft = hours < 8 ? 60 - minutes : 0;
  if ((hoursLeft === 7) & (minutesLeft === 60)) {
    hoursLeft = 8;
    minutesLeft = 0;
  }

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
  const [taskStartTime, setTaskStartTime] = useState(new Date());
  const [everyMinuteDate, setEveryMinuteDate] = useState(new Date());
  const [tasksLogs, setTasksLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEveryMinuteDate(new Date());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const calculateTaskDuration = (start, end) => {
    const { hours, minutes } = calculateDelta(end, start);
    return <>{`${hours}h ${minutes < 10 ? "0" : ""}${minutes}min`}</>;
  };

  const handleLog = (taskName, start, end) => {
    const duration = calculateDelta(end, start);
    const newLog = {
      name: taskName,
      duration,
    };
    setTasksLogs([...tasksLogs, newLog]);
    setTaskName("");
    setTaskStartTime(end);
    setEveryMinuteDate(new Date());
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
          {calculateTaskDuration(taskStartTime, everyMinuteDate)}
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
