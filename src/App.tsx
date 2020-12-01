import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

interface Duration {
  hours: number;
  minutes: number;
  deltaSeconds: number;
  start: Date;
  end: Date;
}

interface Task {
  name: string;
  duration: Duration;
}

function calculateHourMinutes(
  deltaSeconds: number
): { hours: number; minutes: number } {
  const hours: number = Math.floor(deltaSeconds / 3600);
  const minutes: number = Math.floor((deltaSeconds - hours * 3600) / 60);
  return { hours, minutes };
}

function calculateDelta(end: Date, start: Date): Duration {
  const deltaSeconds = (+end - +start) / 1000;
  const { hours, minutes } = calculateHourMinutes(deltaSeconds);
  return {
    hours,
    minutes,
    deltaSeconds,
    start,
    end,
  };
}

function dateDisplay(date: Date): string {
  const h = date.getHours();
  const m = `${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
  return `${h}:${m}`;
}

function logTasks(tasksLogs: Task[]) {
  return (
    <table>
      <tbody>
        {tasksLogs.map(({ name, duration }) => (
          <tr key={name} className="tr-logs">
            <td className="td-duration">{`${duration.hours}h ${
              duration.minutes < 10 ? "0" : ""
            }${duration.minutes}min`}</td>
            <td className="td-interval">{`${dateDisplay(
              duration.start
            )} - ${dateDisplay(duration.end)}`}</td>
            {name.endsWith("**") ? (
              <td className="td-name-ignore">{name}</td>
            ) : (
              <td className="td-name">{name}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function totalLogDisplay(tasksLogs: Task[]) {
  if (tasksLogs.length < 1) return;
  var totalSeconds = 0;
  for (const a of tasksLogs)
    if (!a.name.endsWith("**")) totalSeconds += a.duration.deltaSeconds;

  const { hours, minutes } = calculateHourMinutes(totalSeconds);

  let hoursLeft = hours < 8 ? 8 - hours - 1 : 0;
  let minutesLeft = hours < 8 ? 60 - minutes : 0;
  if (hoursLeft === 7 && minutesLeft === 60) {
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
  const [taskName, setTaskName] = useState<string>("arrived **");
  const [taskStartTime, setTaskStartTime] = useState<Date>(new Date());
  const [everyMinuteDate, setEveryMinuteDate] = useState<Date>(new Date());
  const [tasksLogs, setTasksLogs] = useState<Task[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEveryMinuteDate(new Date());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const calculateTaskDuration = (start: Date, end: Date) => {
    const { hours, minutes } = calculateDelta(end, start);
    return <>{`${hours}h ${minutes < 10 ? "0" : ""}${minutes}m`}</>;
  };

  const handleLog = (taskName: string, start: Date, end: Date) => {
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
