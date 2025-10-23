import cron from "node-cron";
import TaskModel, { TaskStatus } from "../models/taskModel.js";

const updateTaskStatuses = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const now = new Date();

      await TaskModel.updateMany(
        {
          taskDate: { $lt: now },
          taskStatus: TaskStatus.TODO,
        },
        {
          $set: { taskStatus: TaskStatus.NOT_DONE },
        }
      );

      console.log(`[CRON] Task updated to 'not_done' at ${now.toISOString()}`);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  });
};

export default updateTaskStatuses;
