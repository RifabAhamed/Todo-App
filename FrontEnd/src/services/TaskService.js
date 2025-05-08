import axios from "axios";

const TaskService = () => {
  const getAllTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/home/get-all-actions"
      );

      if (response?.data?.success) {
        return { responseType: "success", output: response.data };
      } else {
        return { responseType: "fail", output: response.data };
      }
    } catch (error) {
      return { responseType: "error", output: error.response || error.message };
    }
  };

  const addNewTask = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/home/create-action",
        {
          actionTitle: data.actionTitle || "No Title",
          actionDescription: data.actionDescription || "No Description",
          actionStatus: data.actionStatus || "todo",
          actionDate: data.actionDate || "",
        }
      );

      if (response?.data?.success) {
        return { responseType: "success", output: response.data };
      } else {
        return { responseType: "fail", output: response.data };
      }
    } catch (error) {
      return { responseType: "error", output: error.response || error.message };
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/home/update-action",
        {
          id,
          actionStatus: newStatus,
        }
      );

      if (response?.data?.success) {
        return { responseType: "success", output: response.data };
      } else {
        return { responseType: "fail", output: response.data };
      }
    } catch (error) {
      return { responseType: "error", output: error.response || error.message };
    }
  };
  const updateTask = async (id, data) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/home/update-action",
        {
          id,
          actionTitle: data.actionTitle,
          actionDescription: data.actionDescription,
          actionDate: data.actionDate
        }
      );

      if (response?.data?.success) {
        return { responseType: "success", output: response.data };
      } else {
        return { responseType: "fail", output: response.data };
      }
    } catch (error) {
      return { responseType: "error", output: error.response || error.message };
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/home/delete-action`,
        {
          params: { id }, // Pass id as a query parameter
        }
      );

      if (response?.data?.success) {
        return { responseType: "success", output: response.data };
      } else {
        return { responseType: "fail", output: response.data };
      }
    } catch (error) {
      return { responseType: "error", output: error.response || error.message };
    }
  };


  return { getAllTasks, addNewTask, updateTaskStatus, deleteTask, updateTask };
};

export default TaskService;
