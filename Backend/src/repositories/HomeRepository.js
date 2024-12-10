import ActionModel from "../../src/models/ActionModel.js";

class HomeRepository {
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

  async updateActionRepository(dto) {
    try {
      // Find the action by its ID and update it
      const updatedAction = await ActionModel.findOneAndUpdate(
        { _id: dto.id }, // Corrected to use _id instead of id
        {
          $set: {
            actionTitle: dto.actionTitle || undefined, // Only update if provided
            actionDescription: dto.actionDescription || undefined,
            actionStatus: dto.actionStatus || undefined,
          },
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedAction) {
        return {
          success: false,
          message: "Action not found or is inactive.",
          data: null,
        };
      }
  
      return {
        success: true,
        message: "Action updated successfully.",
        data: updatedAction,
      };
    } catch (error) {
      console.error("Error performing action operation (update):", error, dto);
      return {
        success: false,
        message: "Error performing action operation.",
        data: null,
      };
    }
  }
  

  async deleteActionRepository(id) {
    try {
      // Attempt to delete the action based on the ID
      const deletedAction = await ActionModel.findByIdAndDelete(id);

      // Check if the action was found and deleted
      if (!deletedAction) {
        return {
          success: false,
          message: "Action not found or already deleted.",
          data: null,
        };
      }

      return {
        success: true,
        message: "Action deleted successfully.",
        data: deletedAction,
      };
    } catch (error) {
      console.error("Error performing action operation (delete):", error, id);
      return {
        success: false,
        message: "Error performing action operation.",
        data: null,
      };
    }
  }
}

export default HomeRepository;
