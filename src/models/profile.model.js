import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    dob: {
      type: Date
    },
    images: {
      type: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
