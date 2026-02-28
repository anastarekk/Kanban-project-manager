import "./App.css";
import { useState } from "react";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addToCompleted(item.id, item.projectName, item.taskDescription),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (id, projectName, taskDescription) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
    setCompletedList((prev) => [...prev, { id, projectName, taskDescription }]);
  };
  const addBackToTodo = (id, projectName, taskDescription) => {
    setCompletedList((prev) => prev.filter((task) => task.id !== id));
    setTaskList((prev) => [...prev, { id, projectName, taskDescription }]);
  };
  const [{ isOver: isOverTodo }, dropTodo] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addBackToTodo(item.id, item.projectName, item.taskDescription),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      <div>
        <h1 className="font-bold text-2xl ml-6 mt-4">The Task Tracker</h1>
        <div className="flex">
          <h3 className="text-xl mt-4 ml-6">Click</h3>
          <AddTask taskList={taskList} setTaskList={setTaskList} />
          <h3 className="text-xl mt-4 ml-2 ">to add a new task</h3>
        </div>
        <div className="flex flex-row">
          <div className="w-full" ref={dropTodo}>
            <h2 className="bg-gray-200 ml-6 my-4 text-xl font-semibold w-3/4 max-w-lg py-2 px-2">
              To Do:
            </h2>
            {taskList.map((task, index) => (
              <ToDo
                key={task.id}
                task={task}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            ))}
          </div>
          <div className="w-full" ref={drop}>
            <h2 className="bg-gray-200 ml-6 my-4 text-xl font-semibold w-3/4 max-w-lg py-2 px-2">
              Completed:
            </h2>
            {completedList.map((task, index) => (
              <ToDo
                key={task.id}
                task={task}
                taskList={completedList}
                setTaskList={setCompletedList}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
