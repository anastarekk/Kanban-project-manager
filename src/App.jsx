import { useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToCompleted(item.id, item.projectName, item.taskDescription),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (id, projectName, taskDescription) => {
    const moveTask = taskList.filter((task) => id === task.id);

    setCompleted((completed) => [
      ...completed,
      { moveTask, projectName, taskDescription },
    ]);

    e.preventDefault();
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1);
    setTaskList((prev) => [...prev]);
  };

  return (
    <>
      <h1 className="text-2xl font-bold py-4 pl-6">03 - The Task Tracker</h1>
      <div className="flex">
        <p className="text-xl pl-6">Click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-0.5">to add a new task</p>
      </div>
      <div className="flex flex-row">
        <div className="w-full">
          <h2 className="ml-6 my-4 text-xl font-semibold w-3/4 max-w-lg py-2 px-2 bg-gray-200 ">
            To Do:
          </h2>
          {taskList
            .slice(0)
            .reverse()
            .map((task, index) => (
              <>
                <ToDo
                  key={new Date().getTime()}
                  task={task}
                  index={index}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              </>
            ))}
        </div>
        <div className="w-full" ref={drop}>
          <h2 className="ml-6 my-4 text-xl font-semibold w-3/4 max-w-lg py-2 px-2 bg-gray-200 ">
            Completed:
          </h2>
          {completed
            .slice(0)
            .reverse()
            .map((task, index) => (
              <>
                <ToDo
                  key={new Date().getTime()}
                  task={task}
                  index={index}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
