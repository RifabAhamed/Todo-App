import { Button, ConfigProvider, Divider, Image, Input } from "antd";
import mainImage from "../../assets/images/mainImage.png";
import { Tabs } from "antd";
import { useState } from "react";

const Home = () => {
  const onChange = (key) => setActiveKey(key);

 


  const tasks = [
    { id: 1, title: "Task 1", status: "todo" },
    { id: 2, title: "Task 2", status: "done" },
    { id: 3, title: "Task 3", status: "notDone" },
    { id: 4, title: "Task 4", status: "todo" },
    { id: 5, title: "Task 5", status: "done" },
  ];

  const [activeKey, setActiveKey] = useState("1");

  // Function to filter tasks based on status
  const filterTasks = (status) => tasks.filter((task) => task.status === status);


  const tabItems = [
    {
      label: "Todo",
      key: "1",
      children: (
        <ul>
          {filterTasks("todo").map((task) => (
            <li key={task.id} style={{ fontSize: "18px", padding: "4px 0" }}>
              {task.title}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Done",
      key: "2",
      children: (
        <ul>
          {filterTasks("done").map((task) => (
            <li key={task.id} style={{ fontSize: "18px", padding: "4px 0" }}>
              {task.title}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Not Done",
      key: "3",
      children: (
        <ul>
          {filterTasks("notDone").map((task) => (
            <li key={task.id} style={{ fontSize: "18px", padding: "4px 0" }}>
              {task.title}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="w-full h-[100vh] bg-[#f7f9ff] p-10">
      <div className="w-full flex flex-col items-center justify-center">
        <Image width={400} preview={false} src={mainImage} />
      </div>
      <div className="w-full flex flex-col justify-center gap-5">
        <div className="flex flex-row justify-center items-center gap-10">
          <Input
            placeholder="Add new task"
            size="large"
            className="w-[60%] h-36 text-8xl rounded-3xl"
          />
          <Button className="w-[10%] h-36 text-8xl font-semibold rounded-3xl">
            Add
          </Button>
        </div>
        <Divider />
        <div className="w-full">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  cardPadding: "10px 500px",
                  colorBgContainer: "rgb(186,80,38)",
                  titleFontSize: 80,
                  cardGutter: 20,
                  borderRadiusLG: 20,
                },
              },
            }}
          >
            <Tabs
              className="text-7xl px-72"
              onChange={onChange}
              centered={true}
              type="card"
              activeKey={activeKey}
              items={tabItems}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default Home;
