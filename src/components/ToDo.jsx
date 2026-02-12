import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

const ToDo = ({ task, index, taskList, setTaskList }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      projectName: task.projectName,
      taskDescription: task.taskDescription,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = (e) => {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1);
    setTaskList((prev) => [...prev]);
  };
  return (
    <>
      <div
        className="flex flex-col items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg"
        ref={drag}
      >
        <div className="w-full flex flex-row justify-between">
          <p className="font-semibold text-xl">{task.projectName}</p>
          <EditTask
            task={task}
            index={index}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <p className="text-lg py-2">{task.taskDescription}</p>
        <div className="flex w-full justify-center flex-col sm:flex-row items-center sm-justify-evenly">
          <button
            className="bg-red-500 rounded-lg text-white text-sm font-semibold uppercase py-1.5 px-3 mb-1"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
};

export default ToDo;
