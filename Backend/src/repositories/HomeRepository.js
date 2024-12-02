import ActionModel from "../../src/models/ActionModel.js";

class HomeRepository {
  async createActionRepository(dto) {
    try {
      // Check for existing entity
      const existingEntity = await ActionModel.findOne({
        actionTitle: dto.actionTitle,
        isActive: true,
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
      console.error("Error creating action:", error);
      return {
        success: false, // Corrected success flag
        message: "Error creating action.",
        data: null,
      };
    }
  }

  async getAllActionsRepository(dto) {
    try {
      const skip = (dto.page - 1) * dto.limit;
  
      let sortField = dto.sort || "createdAt";
      const sortOrder = dto.order || "asc";
  
      const allowedSortFields = ["createdAt"];
      if (!allowedSortFields.includes(sortField)) {
        return {
          success: false,
          message: "Invalid sort.",
          data: null,
        };
      }
  
      const query = {};
  
      // if (dto.search) {
      //   query.fullName = { $regex: dto.search, $options: "i" };
      // }
  
      // if (dto.workspaceId) {
      //   query.workspaceId = dto.workspaceId;
      // }
  
      const allActions = ActionModel.find(query);
  
      // Apply sorting, skipping, and limiting
      allActions
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(dto.limit);
  
      const actions = await allActions.exec();
      const totalActions = await allActions.countDocuments(query);
  
      console.log("Fetched Dazhs:", actions); // Check what is fetched
  
      return {
        success: true,
        message: "Dazhboard fetched.",
        data: {
          actions: actions,
          totalPages: Math.ceil(totalActions / dto.limit),
          currentPage: dto.page,
        },
      };
    } catch (error) {
      console.error("Error fetching Dazhboards:", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
  
}

export default HomeRepository;
