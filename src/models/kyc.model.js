import mongoose from "mongoose";

const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    documentType: {
      type: String,
      enum: ["AADHAAR", "PAN"],
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
    },
    documentImages: {
      type: [String],
    },

    // Third-party provider info
    provider: {
      type: String,
      enum: ["PERSONA"],
      default: "PERSONA",
    },

    providerRequestId: {
      type: String, // Persona check ID
    },

    providerStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    remark: {
      type: String,
    },

    // optional but useful (debug / audit)
    providerResponse: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Kyc", kycSchema);
