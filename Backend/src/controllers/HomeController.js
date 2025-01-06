import HomeService from "../../src/services/Homeservice.js";
import { successResponse, errorResponse } from "../utils/responseUtil.js";
import mongoose from "mongoose";

const { isValidObjectId } = mongoose; // Importing isValidObjectId
const homeService = new HomeService();

class HomeController {
  // Create Action
  async createActionController(req, res, next) {
    try {
      const dto = req.body;
      const response = await homeService.createActionService(dto);

      if (response && response.success) {
        return successResponse(res, response.message, response.data, 201); // 201 Created
      } else {
        return errorResponse(res, response.message, 500); // Internal Server Error
      }
    } catch (error) {
      console.error("Error in createActionController:", error);
      next(error); // Pass error to middleware
    }
  }

  // Get All Actions
  async getAllActionsController(req, res, next) {
    try {
      const response = await homeService.getAllActionsService();

      if (response.success) {
        return successResponse(res, response.message, response.data, 200); // 200 OK
      } else {
        return errorResponse(res, response.message, 500); // Internal Server Error
      }
    } catch (error) {
      console.error("Error in getAllActionsController:", error);
      next(error); // Pass error to middleware
    }
  }

  // Update Action
  async updateActionController(req, res, next) {
    try {
      const { id } = req.body; // Extract ID from the URL
      if (!isValidObjectId(id)) {
        return errorResponse(res, "Invalid action ID", 400); // Bad Request
      }

      const dto = req.body; // Extract data to update from the request body
      console.log("Updating action with ID:", id); // Debugging log
      console.log("Received data:", dto); // Debugging log

      // Call the service to update action
      const response = await homeService.updateActionService(id, dto);

      if (response.success) {
        return successResponse(res, response.message, response.data, 200); // 200 OK
      } else {
        return errorResponse(res, response.message, 500); // Internal Server Error
      }
    } catch (error) {
      console.error("Error in updateActionController:", error);
      next(error); // Pass error to middleware
    }
  }

  // Delete Action
  async deleteActionController(req, res) {
    try {
     const { id } = req.query;
      if (!isValidObjectId(id)) {
        return errorResponse(res, "Invalid action ID", 400); // Bad Request
      }

      console.log("Deleting action with ID:", id); // Debugging log

      // Call the service to delete action
      const response = await homeService.deleteActionService(id);

      if (response.success) {
        return successResponse(res, response.message, response.data || {}, 200); // 200 OK
      } else {
        return errorResponse(res, response.message, 404); // Not Found
      }
    } catch (error) {
      console.error("Error in deleteActionController:", error);
      next(error); // Pass error to middleware
    }
  }
}

export default HomeController;
