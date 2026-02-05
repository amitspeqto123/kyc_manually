import {
  submitKycService,
  getMyKycService,
  getAllKycService,
  updateKycStatusService
} from "../services/kyc.service.js";

export const submitKyc = async (req, res) => {
  try {
    const kyc = await submitKycService(req.user._id, req.body);
    res.status(201).json({
      message: "KYC submitted successfully",
      kyc
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyKyc = async (req, res) => {
  try {
    const kyc = await getMyKycService(req.user._id);
    res.status(200).json({
      message: "KYC fetched successfully",
      kyc
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllKyc = async (req, res) => {
  try {
    const kycs = await getAllKycService();
    res.status(200).json({
      message: "All KYC records",
      kycs
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateKycStatus = async (req, res) => {
  try {
    const kyc = await updateKycStatusService(
      req.params.kycId,
      req.body
    );
    res.status(200).json({
      message: "KYC status updated",
      kyc
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// New endpoint to fix existing KYC records
export const fixKycProviderId = async (req, res) => {
  try {
    const { kycId, providerRequestId } = req.body;

    if (!kycId || !providerRequestId) {
      return res.status(400).json({
        message: "kycId and providerRequestId are required"
      });
    }

    const Kyc = (await import("../models/kyc.model.js")).default;
    const kyc = await Kyc.findByIdAndUpdate(
      kycId,
      { providerRequestId },
      { new: true }
    );

    if (!kyc) {
      return res.status(404).json({ message: "KYC not found" });
    }

    res.status(200).json({
      message: "KYC providerRequestId updated successfully",
      kyc
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
