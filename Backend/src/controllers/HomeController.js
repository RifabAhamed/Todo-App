import HomeService from "../../src/services/Homeservice.js";
import { successResponse, errorResponse } from "../utils/responseUtil.js";

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
      next(error); // Pass error to the next middleware (error handler)
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
      next(error); // Pass error to the next middleware (error handler)
    }
  }

  // Update Action
  async updateActionController(req, res, next) {
    try {
      const dto = req.body;

      // Validate the request body
      if (!dto.id) {
        return errorResponse(res, "Missing required field id", 400); // 400 Bad Request
      }

      const response = await homeService.updateActionService(dto);
      if (response && response.success) {
        return successResponse(res, response.message, response.data, 200); // 200 OK
      } else {
        return errorResponse(res, response?.message || 'Error occurred', 500); // Internal Server Error
      }
    } catch (error) {
      next(error); // Pass error to the next middleware (error handler)
    }
  }

  // Delete Action
  async deleteActionController(req, res, next) {
    try {
      const dto = req.body; // Assuming the ID to delete is passed in the request body

      // Validate the request body
      if (!dto.id) {
        return errorResponse(res, "Missing required field: id", 400); // 400 Bad Request
      }

      const response = await homeService.deleteActionService(dto);
      if (response && response.success) {
        return successResponse(res, response.message, response.data, 200); // 200 OK
      } else {
        return errorResponse(res, response?.message || 'Error occurred', 500); // Internal Server Error
      }
    } catch (error) {
      next(error); // Pass error to the next middleware (error handler)
    }
  }
}

export default HomeController;
