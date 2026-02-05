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
