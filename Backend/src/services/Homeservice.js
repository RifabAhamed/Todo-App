import HomeRepository from "../../src/repositories/HomeRepository.js";

class HomeService {
  constructor() {
    this.repository = new HomeRepository();
  }

  async createActionService(dto) {
    try {
      const response = await this.repository.createActionRepository(dto);
      return response;
    } catch (error) {
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
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async updateActionService(dto) {
    try {
      // Basic validation
      if (!dto.id) {
        return {
          success: false,
          message: "Missing required field id",
          data: null,
        };
      }

      const response = await this.repository.updateActionRepository(dto);
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async deleteActionService(dto) {
    try {
      if (!dto.id) {
        return {
          success: false,
          message: "Missing required field: id",
          data: null,
        };
      }

      const response = await this.repository.deleteActionRepository(dto.id);
      if (response) {
        return {
          success: true,
          message: "Action deleted successfully", // Success message
          data: response,
        };
      } else {
        return {
          success: false,
          message: "Action not found", // If the action doesn't exist
          data: null,
        };
      }
    } catch (error) {
      console.error("Error in deleteActionService:", error, dto); // Log dto for better traceability
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}

export default HomeService;
