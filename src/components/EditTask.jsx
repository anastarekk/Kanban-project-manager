import { useState, useEffect } from "react";

const EditTask = ({ task, index, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") {
      setProjectName(value);
      setErrorMessage("");
    }
    if (name === "projectName" && value === "") {
      setErrorMessage("Enter project name to continue");
    } else if (name === "taskDescription") {
      setTaskDescription(value);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!projectName) {
      setErrorMessage("Enter project name to continue");
    } else {
      let taskIndex = taskList.indexOf(task);
      taskList.splice(taskIndex, 1);
      setTaskList((prev) => [...prev, { projectName, taskDescription }]);
      setEditModal(false);
    }
  };

  return (
    <>
      <button
        className="bg-gray-400 rounded-lg text-white px-3 py-1 font-semibold text-sm uppercase"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal ? (
        <>
          <div className="flex items-center justify-center fixed overflow-x-hidden overflow-y-auto inset-0 pt-25 z-50">
            <div className="bg-white w-9/12 rounded-lg shadow-md relative flex flex-col">
              <div className="flex flex-row justify-between p-5  bg-white border-b border-slate-200">
                <h3 className="text-3xl  font-semibold">Edit Task</h3>
                <button
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block mb-1"
                  onClick={() => setEditModal(false)}
                >
                  x
                </button>
              </div>
              <form className="px-6 pt-6 pb-4">
                <div>
                  <label
                    className="block tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2"
                    htmlFor="project-name"
                  >
                    Project Name
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                    id="project-name"
                    name="projectName"
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={handleInput}
                    required
                  />
                  <p className="text-red-500 text-center mt-2 mb-5">
                    {errorMessage}
                  </p>
                </div>
                <div>
                  <label
                    className="block tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2"
                    htmlFor="project-description"
                  >
                    Task Description
                  </label>
                  <textarea
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                    id="task-description"
                    placeholder="Task description"
                    rows={5}
                    name="taskDescription"
                    value={taskDescription}
                    onChange={handleInput}
                    required
                  />
                </div>
              </form>
              <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                <button
                  className="bg-blue-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                  onClick={handleUpdate}
                >
                  update Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditTask;
