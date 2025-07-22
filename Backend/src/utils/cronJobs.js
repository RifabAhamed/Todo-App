import cron from "node-cron";
import ActionModel, { ActionStatus } from "../models/ActionModel.js";

const updateActionStatuses = () => {
  // Run daily at midnight
  cron.schedule("*/1 * * * *", async () => {
    try {
      const now = new Date();

      await ActionModel.updateMany(
        {
          actionDate: { $lt: now },
          actionStatus: ActionStatus.TODO,
        },
        {
          $set: { actionStatus: ActionStatus.NOT_DONE },
        }
      );

      console.log(
        `[CRON] Actions updated to 'not_done' at ${now.toISOString()}`
      );
    } catch (error) {
      console.error("Error updating actions:", error);
    }
  });
};

export default updateActionStatuses;
