import mongoose from "mongoose";
import HomeRepository from "../../src/repositories/HomeRepository.js";

const { isValidObjectId } = mongoose; // Importing isValidObjectId

class HomeService {
  constructor() {
    this.repository = new HomeRepository();
  }

  async createActionService(dto) {
    try {
      const response = await this.repository.createActionRepository(dto);
      return response;
    } catch (error) {
      console.error("Error in createActionService:", error); // Improved error logging
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async getAllActionsService() {
    try {
      const response = await this.repository.getAllActionsRepository();
      if (response.success) {
        return {
          success: true,
          message: "Actions fetched successfully",
          data: response.data || [], // Ensure `data` is always an array
        };
      } else {
        return {
          success: false,
          message: response.message || "Failed to fetch actions",
          data: [],
        };
      }
    } catch (error) {
      console.error("Error in getAllActionsService:", error);
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  }

  async updateActionService(id, dto) {
    try {
      if (!id || !isValidObjectId(id)) {
        return {
          success: false,
          message: "Invalid or missing ID",
          data: null,
        };
      }

      const response = await this.repository.updateActionRepository(id, dto);
      if (response.success) {
        return {
          success: true,
          message: "Action updated successfully",
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "Action not found or failed to update",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error in updateActionService:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async deleteActionService(id) {
    try {
      if (!id || !isValidObjectId(id)) {
        return {
          success: false,
          message: "Invalid or missing ID",
          data: null,
        };
      }

      const response = await this.repository.deleteActionRepository(id);
      if (response.success) {
        return {
          success: true,
          message: "Action deleted successfully",
          data: response.data || {}, // Return empty object if no data
        };
      } else {
        return {
          success: false,
          message: "Action not found or failed to delete",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error in deleteActionService:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}

export default HomeService;
