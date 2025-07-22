import express from "express";
import HomeController from "../controllers/HomeController.js"

const router = express.Router();
const homeController = new HomeController();


router.post("/create-task", homeController.createTaskController);
router.get("/get-all-tasks", homeController.getAllTasksController);
router.put("/update-task/", homeController.updateTaskController);
router.delete("/delete-task/", homeController.deleteTaskController);

export default router;