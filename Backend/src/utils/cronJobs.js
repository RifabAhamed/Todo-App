import cron from "node-cron";
import ActionModel from "../models/ActionModel" // Import the Mongoose model

// Schedule job to run every minute
cron.schedule("* * * * *", async () => {
  console.log("Checking for overdue tasks...");

  try {
    const now = new Date();

    // Find tasks that are overdue and still marked as "todo"
    const overdueTasks = await ActionModel.find({
      actionStatus: "todo",
      actionDate: { $lt: now }, // Find tasks with a past date
    });

    if (overdueTasks.length > 0) {
      console.log(
        `Found ${overdueTasks.length} overdue tasks. Updating status...`
      );

      // Update status of overdue tasks
      await ActionModel.updateMany(
        { actionStatus: "todo", actionDate: { $lt: now } },
        { $set: { actionStatus: "not_done" } }
      );

      console.log("Overdue tasks moved to 'not_done'.");
    } else {
      console.log("No overdue tasks found.");
    }
  } catch (error) {
    console.error("Error updating overdue tasks:", error);
  }
});

export default cron;
