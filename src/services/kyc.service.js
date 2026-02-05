import User from "../models/user.model.js";
import Kyc from "../models/kyc.model.js";

export const submitKycService = async (userId, data) => {
  const existingKyc = await Kyc.findOne({ userId });
  if (existingKyc) {
    throw new Error("KYC already submitted");
  }

  return await Kyc.create({
    userId,
    ...data,
  });
};

export const getMyKycService = async (userId) => {
  const kyc = await Kyc.findOne({ userId });
  if (!kyc) {
    throw new Error("KYC not found");
  }
  return kyc;
};

export const getAllKycService = async () => {
  return await Kyc.find().populate("userId", "email role");
};

export const updateKycStatusService = async (kycId, data) => {
  const kyc = await Kyc.findByIdAndUpdate(kycId, data, { new: true });

  if (!kyc) {
    throw new Error("KYC not found");
  }
  //IMPORTANT PART
  if (data.status === "APPROVED") {
    await User.findByIdAndUpdate(kyc.userId, {
      isKycApproved: true,
    });
  }
  if (data.status === "REJECTED") {
    await User.findByIdAndUpdate(kyc.userId, {
      isKycApproved: false,
    });
  }
  return kyc;
};
