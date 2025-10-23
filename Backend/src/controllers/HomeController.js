import HomeService from "../../src/services/Homeservice.js";
import { successResponse, errorResponse } from "../utils/responseUtil.js";
import mongoose from "mongoose";

const { isValidObjectId } = mongoose; // Importing isValidObjectId
const homeService = new HomeService();

class HomeController {
  // Create Task
  async createTaskController(req, res, next) {
    try {
      const dto = req.body;
      const response = await homeService.createTaskService(dto);

      if (response && response.success) {
        return successResponse(res, response.message, response.data, 201); // 201 Created
      } else {
        return errorResponse(res, response.message, 500); // Internal Server Error
      }
    } catch (error) {
      console.error("Error in createTaskController:", error);
      next(error); // Pass error to middleware
    }
  }

  // Get All Tasks
  async getAllTasksController(req, res, next) {
    try {
      const response = await homeService.getAllTasksService();

      if (response.success) {
        return successResponse(res, response.message, response.data, 200); // 200 OK
      } else {
        return errorResponse(res, response.message, 500); // Internal Server Error
      }
    } catch (error) {
      console.error("Error in getAllTasksController:", error);
      next(error); // Pass error to middleware
    }
  }

  // Update Task
  async updateTaskController(req, res, next) {
    try {
      const { id } = req.body; // Extract ID from the URL
      if (!isValidObjectId(id)) {
        return errorResponse(res, "Invalid Task ID", 400); // Bad Request
      }

      const dto = req.body; // Extract data to update from the request body
      console.log("Updating Task with ID:", id); // Debugging log
      console.log("Received data:", dto); // Debugging log

      // Call the service to update Task
      const response = await homeService.updateTaskService(id, dto);

      if (response.success) {
        return successResponse(res, response.message, response.data, 200); // 200 OK
      } else {
        return errorResponse(res, response.message, 500); // Internal Server Error
      }
    } catch (error) {
      console.error("Error in updateTaskController:", error);
      next(error); // Pass error to middleware
    }
  }

  // Delete Task
  async deleteTaskController(req, res) {
    try {
      const { id } = req.query;
      if (!isValidObjectId(id)) {
        return errorResponse(res, "Invalid Task ID", 400); // Bad Request
      }

      console.log("Deleting Task with ID:", id); // Debugging log

      // Call the service to delete Task
      const response = await homeService.deleteTaskService(id);

      if (response.success) {
        return successResponse(res, response.message, response.data || {}, 200); // 200 OK
      } else {
        return errorResponse(res, response.message, 404); // Not Found
      }
    } catch (error) {
      console.error("Error in deleteTaskController:", error);
      next(error); // Pass error to middleware
    }
  }
}

export default HomeController;
