import React, { useState, useEffect } from "react";
import "./App.css";

interface Duration {
  hours: number;
  minutes: number;
}

interface Task {
  name: string;
  date: Date;
}

function calculateHourMinutes(
  deltaSeconds: number
): Duration {
  const hours: number = Math.round(deltaSeconds / 3600);
  const minutes: number = Math.round((deltaSeconds - hours * 3600) / 60);
  return { hours, minutes };
}

function calculateSecondsInterval(end: Date, start: Date):number {
  return (+end - +start) / 1000
}

function calculateDelta(end: Date, start: Date): Duration {
  const deltaSeconds = calculateSecondsInterval(end, start);
  const { hours, minutes } = calculateHourMinutes(deltaSeconds);
  return {
    hours,
    minutes,
  };
}

function formatHoursMinutes(hours:number, minutes:number) : {h:string, m:string} {
  const h =  `${hours}`;
  const m = `${minutes < 10 ? "0" : ""}${minutes}`;
  return {h, m};
}

function hoursMinutesDisplay(hours: number, minutes: number): string {
  const {h, m} = formatHoursMinutes(hours, minutes);
  return `${h}:${m}`;
}

function durationDisplay(hours: number, minutes:number):string {
  const {h, m} = formatHoursMinutes(hours, minutes);
  return `${h}h ${m}min`;
}

function dateDisplay(date: Date): string {
  return hoursMinutesDisplay(date.getHours(), date.getMinutes());
}

function rowDisplay(name:string, date:Date, idx:number, tasksLogs:Task[]) {
  let start: Date;
  if (idx === 0) {
    start = date;
  } else {
    start = tasksLogs[idx-1].date;
  }
  const duration = calculateDelta(date, start);
  return (
    <tr key={name} className="tr-logs">
      <td className="td-duration">{durationDisplay(duration.hours, duration.minutes)}</td>
      <td className="td-interval">{`${dateDisplay(
        start
      )} - ${dateDisplay(date)}`}</td>
      {name.endsWith("**") ? (
        <td className="td-name-ignore">{name}</td>
      ) : (
        <td className="td-name">{name}</td>
      )}
    </tr>
  )

}

function logTasks(tasksLogs: Task[]) {
  return (
    <table>
      <tbody>
        {tasksLogs.map(({ name, date }, idx) => (
          <React.Fragment key={name+`${idx}`}>{rowDisplay(name, date, idx, tasksLogs)}</React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

function totalLogDisplay(tasksLogs: Task[]) {
  if (tasksLogs.length < 2) return;
  var totalSeconds = 0;
  for (let i = 1; i < tasksLogs.length; i++){
    const task = tasksLogs[i];
    if (!task.name.endsWith("**")) {
      totalSeconds += calculateSecondsInterval(task.date, tasksLogs[i-1].date);
    }
  }

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
          <td className="td-duration">{durationDisplay(hours, minutes)}</td>
        </tr>
        <tr className="tr-work">
          <td className="td-name">Time Left:</td>
          <td className="td-duration">{durationDisplay(hoursLeft, minutesLeft)}</td>
        </tr>
      </tbody>
    </table>
  );
}

function App() {
  const [taskName, setTaskName] = useState<string>("arrived **");
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
    return <>{durationDisplay(hours, minutes)}</>;
  };

  const handleLog = (taskName: string) => {
    const newLog = {
      name: taskName,
      date: new Date(),
    };
    setTasksLogs([...tasksLogs, newLog]);
    setTaskName("");
    setEveryMinuteDate(new Date());
  };

  const handleAddClick = () => {
    handleLog(taskName);
  };

  const handleTaskName = (name: string) => {
    if (tasksLogs.length > 0) {
      setTaskName(name);
    }
  }

  const handleKeyPress = (e:React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddClick();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>{totalLogDisplay(tasksLogs)}</div>
        <div className="Insert-task">
          {tasksLogs.length > 0 ? calculateTaskDuration(tasksLogs[tasksLogs.length - 1].date, everyMinuteDate):<></>}
          <input
            className="input-task"
            value={taskName}
            onKeyPress={handleKeyPress}
            onChange={(e) => handleTaskName(e.target.value)}
          ></input>
          <button onClick={handleAddClick} >Add</button>
        </div>
        <div>{logTasks(tasksLogs)}</div>
      </header>
    </div>
  );
}

export default App;
