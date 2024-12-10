import mongoose from "mongoose";

const { Schema } = mongoose;

// Enum for Action Status
const ActionStatus = {
  TODO: 'todo',
  DONE: 'done',
  NOT_DONE: 'not_done',
};

// Action Schema Definition
const ActionSchema = new Schema(
  {
    actionTitle: {
      type: String,
      required: true,
      unique: true, // Ensures action titles are unique
      minlength: [3, 'Action title should be at least 3 characters long'],
      trim: true, // Trims leading/trailing spaces
    },
    actionDescription: {
      type: String,
      required: false,
    },
    actionStatus: {
      type: String,
      enum: Object.values(ActionStatus), // Ensures only the valid statuses are allowed
      required: true,
      default: ActionStatus.TODO, // Default value is 'todo'
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);


const ActionModel = mongoose.model("Action", ActionSchema);

export { ActionModel, ActionStatus };
export default ActionModel;
