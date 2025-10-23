import mongoose from "mongoose";
import TaskModel from "../../src/models/TaskModel.js";

const { isValidObjectId } = mongoose; // Importing isValidObjectId

class HomeRepository {
  // Create task repository
  async createTaskRepository(dto) {
    try {
      // Check for existing entity
      const existingEntity = await TaskModel.findOne({
        taskTitle: dto.taskTitle,
      });

      if (existingEntity) {
        return {
          success: false,
          message: "Task already exists.",
          data: null,
        };
      }

      // Create and save the new entity
      const newEntity = new TaskModel(dto);
      const createdEntity = await newEntity.save();

      return {
        success: true,
        message: "Task created.",
        data: createdEntity,
      };
    } catch (error) {
      console.error("Error performing Task operation (create):", error, dto);
      return {
        success: false,
        message: "Error performing Task operation.",
        data: null,
      };
    }
  }

  // Get all tasks repository
  async getAllTasksRepository() {
    try {
      const tasks = await TaskModel.find().exec();

      return {
        success: true,
        message: "Task fetched successfully.",
        data: tasks,
      };
    } catch (error) {
      console.error("Error performing Task operation (fetch all):", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Update task repository
  async updateTaskRepository(id, dto) {
    try {
      if (!isValidObjectId(id)) {
        return {
          success: false,
          message: "Invalid task ID",
          data: null,
        };
      }

      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { $set: dto },
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        return {
          success: false,
          message: "Task not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
      };
    } catch (error) {
      console.error("Error updating Task:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Delete task repository
  async deleteTaskRepository(id) {
    try {
      if (!isValidObjectId(id)) {
        return {
          success: false,
          message: "Invalid task ID",
          data: null,
        };
      }

      const deletedTask = await TaskModel.findByIdAndDelete(id);

      if (!deletedTask) {
        return {
          success: false,
          message: "Task not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Task deleted successfully",
        data: deletedATask,
      };
    } catch (error) {
      console.error("Error deleting Task:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}

export default HomeRepository;
