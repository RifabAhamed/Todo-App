import express from "express";
import HomeController from "../controllers/HomeController.js"

const router = express.Router();
const homeController = new HomeController();


router.post("/create-action", homeController.createActionController);
router.get("/get-all-actions", homeController.getAllActionsController);
router.put("/update-action/", homeController.updateActionController);
router.delete("/delete-action/", homeController.deleteActionController);

export default router;