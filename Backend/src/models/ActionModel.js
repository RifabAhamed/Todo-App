import mongoose from "mongoose";

const { Schema } = mongoose;

const ActionSchema = new Schema({
  actionTitle: {
    type: String,
    required: true,
  },
  actionDescription: {
    type: String,
    required: false,
  },
  actionStatus: {
    type: Number,
    enum: [0, 1], // 0 for inactive, 1 for active
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const ActionModel = mongoose.model("ActionModel", ActionSchema);

export default ActionModel;
