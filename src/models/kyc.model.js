import mongoose from "mongoose";

const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    documentType: {
      type: String,
      enum: ["AADHAAR", "PAN"],
      required: true
    },
    documentNumber: {
      type: String,
      required: true
    },
    documentImages: {
      type: [String]
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    },
    remark: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Kyc", kycSchema);
