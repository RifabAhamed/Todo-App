import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskStatus = {
  TODO: 'todo',
  DONE: 'done',
  NOT_DONE: 'not_done',
};

const TaskSchema = new Schema(
  {
    taskTitle: {
      type: String,
      required: true,
      unique: true, 
      trim: true, 
    },
    taskDescription: {
      type: String,
      required: false,
    },
    taskDate:{
      type: Date,
      required: false,
    },
    taskStatus: {
      type: String,
      enum: Object.values(TaskStatus), 
      required: true,
      default: TaskStatus.TODO, 
    },
  },
  { timestamps: true } 
);


const TaskModel = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export { TaskModel, TaskStatus };
export default TaskModel;
