import mongoose from "mongoose";
import ActionModel from "../../src/models/ActionModel.js";

const { isValidObjectId } = mongoose; // Importing isValidObjectId

class HomeRepository {
  // Create action repository
  async createActionRepository(dto) {
    try {
      // Check for existing entity
      const existingEntity = await ActionModel.findOne({
        actionTitle: dto.actionTitle,
      });

      if (existingEntity) {
        return {
          success: false,
          message: "Action already exists.",
          data: null,
        };
      }

      // Create and save the new entity
      const newEntity = new ActionModel(dto);
      const createdEntity = await newEntity.save();

      return {
        success: true,
        message: "Action created.",
        data: createdEntity,
      };
    } catch (error) {
      console.error("Error performing action operation (create):", error, dto);
      return {
        success: false,
        message: "Error performing action operation.",
        data: null,
      };
    }
  }

  // Get all actions repository
  async getAllActionsRepository() {
    try {
      const actions = await ActionModel.find().exec();

      return {
        success: true,
        message: "Actions fetched successfully.",
        data: actions,
      };
    } catch (error) {
      console.error("Error performing action operation (fetch all):", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Update action repository
  async updateActionRepository(id, dto) {
    try {
      if (!isValidObjectId(id)) {
        return {
          success: false,
          message: "Invalid action ID",
          data: null,
        };
      }

      const updatedAction = await ActionModel.findByIdAndUpdate(
        id,
        { $set: dto },
        { new: true, runValidators: true }
      );

      if (!updatedAction) {
        return {
          success: false,
          message: "Action not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Action updated successfully",
        data: updatedAction,
      };
    } catch (error) {
      console.error("Error updating action:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Delete action repository
  async deleteActionRepository(id) {
    try {
      if (!isValidObjectId(id)) {
        return {
          success: false,
          message: "Invalid action ID",
          data: null,
        };
      }

      const deletedAction = await ActionModel.findByIdAndDelete(id);

      if (!deletedAction) {
        return {
          success: false,
          message: "Action not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Action deleted successfully",
        data: deletedAction,
      };
    } catch (error) {
      console.error("Error deleting action:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}

export default HomeRepository;
