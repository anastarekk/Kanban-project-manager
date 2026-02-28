import { useEffect, useState } from "react";

const EditTask = ({ task, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, [task]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") {
      setProjectName(value);
    } else if (name === "taskDescription") {
      setTaskDescription(value);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!projectName) {
      setErrorMessage("Enter project name to continue");
      return;
    }

    setTaskList((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, projectName, taskDescription } : t,
      ),
    );

    setEditModal(false);
    setErrorMessage("");
  };

  return (
    <div>
      <button
        className="uppercase bg-gray-400 text-white rounded-lg px-3 py-1 text-sm font-semibold hover:opacity-70"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal ? (
        <>
          <div className="flex items-center justify-center fixed overflow-x-hidden overflow-y-auto inset-0 pt-25 z-50">
            <div className="bg-white w-9/12 rounded-lg shadow-md relative flex flex-col">
              <div className="flex justify-between p-5 bg-white border-b border-slate-200">
                <h1 className="text-3xl font-semibold">Edit Task</h1>
                <button
                  className="text-gray-400 text-3xl font-semibold px-1 block mb-1"
                  onClick={() => {
                    setEditModal(false);
                  }}
                >
                  x
                </button>
              </div>
              <form>
                <div className="p-6 flex flex-col">
                  <label
                    className="mb-2 uppercase text-xs font-semibold tracking-wide text-gray-700"
                    htmlFor="project-name"
                  >
                    Project Name
                  </label>
                  <input
                    className="bg-gray-200 border border-gray-200 rounded  focus:bg-white focus:outline-none leading-none p-3"
                    type="text"
                    id="project-name"
                    name="projectName"
                    placeholder="Project Name"
                    required
                    value={projectName}
                    onChange={handleInput}
                  />
                  <p className="text-red-500 text-center mt-2 mb-5">
                    {errorMessage}
                  </p>
                </div>
                <div className="flex flex-col p-5 border-b border-slate-200">
                  <label
                    htmlFor="task-description"
                    className="mb-2 uppercase text-xs font-semibold tracking-wide  mt-2 text-gray-700"
                  >
                    Task Description
                  </label>
                  <textarea
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white "
                    id="task-description"
                    name="taskDescription"
                    placeholder="Task Description"
                    rows={5}
                    required
                    value={taskDescription}
                    onChange={handleInput}
                  />
                </div>
              </form>
              <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                <button
                  className="bg-blue-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                  onClick={handleUpdate}
                >
                  Update task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default EditTask;
