import { checkPersonaKycStatus } from "../services/kycPolling.service.js";

// Manual trigger route (for testing / Postman)
export const pollKycStatus = async (req, res) => {
  try {
    const { kycId } = req.params;
    const kyc = await checkPersonaKycStatus(kycId);
    res.json({ message: "KYC status updated", kyc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
