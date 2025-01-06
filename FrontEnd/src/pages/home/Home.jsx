import {
  Button,
  ConfigProvider,
  Divider,
  Image,
  Input,
  Modal,
  Skeleton,
  Tabs,
} from "antd";
import mainImage from "../../assets/images/mainImage.png";
import { useEffect, useState } from "react";
import TaskService from "../../services/TaskService";
const Home = () => {
  const { getAllTasks, addNewTask, updateTaskStatus, deleteTask } =
    TaskService();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModel = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTask("");
    setDescription("");
  };

  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    const response = await deleteTask(taskId);

    if (response.responseType === "success") {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } else if (response.responseType === "fail") {
      console.error("Failed to delete task:", response.output);
    } else if (response.responseType === "error") {
      console.error("Error deleting task:", response.output);
    }
    setLoading(false);
  };

  const markAsDone = async (taskId) => {
    setLoading(true);
    const response = await updateTaskStatus(taskId, "done");
    if (response.responseType === "success") {
      const updatedTask = response.output?.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } else if (response.responseType === "fail") {
      console.error("Failed to update task:", response.output);
    } else if (response.responseType === "error") {
      console.error("Error updating task:", response.output);
    }
    setLoading(false);
  };
  
  const markAsUnDone = async (taskId) => {
    setLoading(true);
    const response = await updateTaskStatus(taskId, "todo");
    if (response.responseType === "success") {
      const updatedTask = response.output?.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } else if (response.responseType === "fail") {
      console.error("Failed to update task:", response.output);
    } else if (response.responseType === "error") {
      console.error("Error updating task:", response.output);
    }
    setLoading(false);
  };

  const onChange = (key) => setActiveKey(key);

  useEffect(() => {
    fetchTasks();
  }, [activeKey]);

  const fetchTasks = async () => {
    setLoading(true);
    const response = await getAllTasks();
    if (response) {
      if (response.responseType === "success") {
        setTasks(response.output?.data || []);
      } else if (response.responseType === "fail") {
        console.error("Failed to fetch tasks:", response.output);
      } else if (response.responseType === "error") {
        console.error("Error fetching tasks:", response.output);
      }
    }
    setLoading(false);
  };

const handleAddNewTask = async () => {
  if (!task.trim() || !description.trim()) {
    console.error("Task title and description cannot be empty.");
    return;
  }

  const newTask = {
    actionTitle: task.trim(),
    actionDescription: description.trim(),
  };

  setLoading(true);
  setIsModalOpen(false);
  const response = await addNewTask(newTask);

  if (response.responseType === "success") {
    setTasks([...tasks, response.output?.data]);
    setTask("");
    setDescription("");
  } else if (response.responseType === "fail") {
    console.error("Failed to add task:", response.output);
  } else if (response.responseType === "error") {
    console.error("Error adding task:", response.output);
  }
  setLoading(false);
};

  // Function to filter tasks based on status
  const filterTasks = (status) =>
    tasks.filter((task) => task.actionStatus === status);

  const tabItems = [
    {
      label: "Todo",
      key: "1",
      children: (
        <>
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton />
            </div>
          ) : (
            <div>
              {filterTasks("todo").map((task, index) => (
                <div
                  key={index}
                  className="bg-[#c3d2f7] text-xl w-full h-10 my-1 rounded-md flex items-center px-2 hover:shadow-md"
                >
                  <div className="flex gap-20 w-full">
                    <div className="w-[20%]">{task.actionTitle}</div>
                    <div className="text-sm w-[30%]">
                      {task.actionDescription}
                    </div>
                    <div>
                      <Button onClick={() => markAsDone(task._id)}>
                        Mark as Done
                      </Button>
                      <Button onClick={() => handleDeleteTask(task._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ),
    },
    {
      label: "Done",
      key: "2",
      children: (
        <>
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton />
            </div>
          ) : (
            <div>
              {filterTasks("done").map((task, index) => (
                <div
                  key={index}
                  className="bg-[#c3d2f7] text-xl w-full h-10 my-1 rounded-md flex items-center px-2 hover:shadow-md"
                >
                  <div className="flex gap-20 w-full">
                    <div className="w-[20%]">{task.actionTitle}</div>
                    <div className="text-sm w-[30%]">
                      {task.actionDescription}
                    </div>
                    <div>
                      <Button onClick={() => markAsUnDone(task._id)}>
                        Mark as UnDone
                      </Button>
                      <Button onClick={() => handleDeleteTask(task._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ),
    },
    {
      label: "Not Done",
      key: "3",
      children: (
        <>
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton />
            </div>
          ) : (
            <div>
              {filterTasks("notDone").map((task, index) => (
                <div
                  key={index}
                  className="bg-[#c3d2f7] text-xl w-full h-10 my-1 rounded-md flex items-center px-2 hover:shadow-md"
                >
                  {task.actionTitle}
                  {task.actionDescription}
                </div>
              ))}
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="w-full h-[100vh] bg-[#f7f9ff] p-10">
      <div className="w-full flex flex-col items-center justify-center">
        <Image width={100} preview={false} src={mainImage} />
      </div>
      <div className="w-full flex flex-col justify-center gap-5">
        <div className="flex flex-row justify-center items-center gap-5">
          <Button
            className=" h-12 text-2xl font-semibold rounded-xl bg-[#c3d2f7]"
            onClick={showModel}
          >
            Add a New Task
          </Button>
        </div>
        <Divider className="my-0" />
        <div className="w-full">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  cardPadding: "0px 10px",
                  colorBgContainer: "rgb(195,210,247)",
                  titleFontSize: 20,
                  cardGutter: 10,
                  borderRadiusLG: 10,
                },
              },
            }}
          >
            <Tabs
              onChange={onChange}
              centered={true}
              type="card"
              activeKey={activeKey}
              items={tabItems}
            />
          </ConfigProvider>
        </div>
      </div>
      <Modal
        title="Add New Task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col w-full gap-10">
          <div className="flex flex-col w-full gap-2">
            <div>Title:</div>
            <Input
              placeholder="Add new task"
              size="large"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            <div>Description:</div>
            <Input
              placeholder="Add new task"
              size="large"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <Button type="primary" onClick={handleAddNewTask}>
            Add Task
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
