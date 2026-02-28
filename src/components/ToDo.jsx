import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

const ToDo = ({ task, taskList, setTaskList, dragType = "todo" }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "todo",
      item: {
        id: task.id,
        projectName: task.projectName,
        taskDescription: task.taskDescription,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task, dragType],
  );
  const handleDelete = (e) => {
    setTaskList((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <>
      <div
        ref={drag}
        className="flex flex-col items-start bg-white ml-6 my-4 w-3/4 max-w-lg py-4 px-6"
      >
        <div className="flex w-full justify-between flex-row">
          <p className="font-semibold text-xl mb-2">{task.projectName}</p>
          <EditTask task={task} taskList={taskList} setTaskList={setTaskList} />
        </div>
        <p className="text-lg">{task.taskDescription}</p>
        <div className="flex w-full justify-center sm:flex-row flex-col items-center sm:justify-evenly mt-2">
          <button
            className="bg-red-500 text-white rounded-lg px-3 py-1 font-semibold hover:opacity-70"
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
