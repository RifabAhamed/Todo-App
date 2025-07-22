import mongoose from "mongoose";
import HomeRepository from "../../src/repositories/HomeRepository.js";

const { isValidObjectId } = mongoose; // Importing isValidObjectId

class HomeService {
  constructor() {
    this.repository = new HomeRepository();
  }

  async createTaskService(dto) {
    try {
      const response = await this.repository.createTaskRepository(dto);
      return response;
    } catch (error) {
      console.error("Error in createTaskService:", error); // Improved error logging
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async getAllTasksService() {
    try {
      const response = await this.repository.getAllTasksRepository();
      if (response.success) {
        return {
          success: true,
          message: "Tasks fetched successfully",
          data: response.data || [], // Ensure `data` is always an array
        };
      } else {
        return {
          success: false,
          message: response.message || "Failed to fetch Tasks",
          data: [],
        };
      }
    } catch (error) {
      console.error("Error in getAllTasksService:", error);
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  }

  async updateTaskService(id, dto) {
    try {
      if (!id || !isValidObjectId(id)) {
        return {
          success: false,
          message: "Invalid or missing ID",
          data: null,
        };
      }

      const response = await this.repository.updateTaskRepository(id, dto);
      if (response.success) {
        return {
          success: true,
          message: "Task updated successfully",
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "Task not found or failed to update",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error in updateTaskService:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async deleteTaskService(id) {
    try {
      if (!id || !isValidObjectId(id)) {
        return {
          success: false,
          message: "Invalid or missing ID",
          data: null,
        };
      }

      const response = await this.repository.deleteTaskRepository(id);
      if (response.success) {
        return {
          success: true,
          message: "Task deleted successfully",
          data: response.data || {}, // Return empty object if no data
        };
      } else {
        return {
          success: false,
          message: "Task not found or failed to delete",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error in deleteTaskService:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}

export default HomeService;
