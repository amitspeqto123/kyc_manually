import { checkPersonaKycStatus } from "../services/kycPolling.service.js";
import Kyc from "../models/kyc.model.js";
import User from "../models/user.model.js";

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

export const personaWebhook = async (req, res) => {
  try {
    console.log("Persona webhook payload:", JSON.stringify(req.body, null, 2));

    const payload = req.body;

    // Persona sends data inside payload.data
    const inquiryId = payload?.data?.id;
    if (!inquiryId) {
      return res.status(400).json({ message: "Inquiry ID missing in webhook" });
    }

    // Find KYC
    const kyc = await Kyc.findOne({ providerRequestId: inquiryId });
    if (!kyc) {
      return res.status(404).json({ message: "KYC not found" });
    }

    const attributes = payload?.data?.attributes || {};

    const verificationResult = payload?.data?.attributes?.verification_result;

    if (verificationResult === "approved") {
      kyc.status = "APPROVED";
      kyc.providerStatus = "SUCCESS";
      kyc.remark = "Approved via Persona webhook";
    } else if (verificationResult === "rejected") {
      kyc.status = "REJECTED";
      kyc.providerStatus = "FAILED";
      kyc.remark = "Rejected via Persona webhook";
    } else {
      kyc.status = "PENDING";
      kyc.providerStatus = "PENDING";
      kyc.remark = "KYC pending via Persona webhook";
    }

    // Save provider response
    kyc.providerResponse = payload;
    await kyc.save();

    // Update user
    if (kyc.status === "APPROVED") {
      const user = await User.findById(kyc.userId);
      if (user) {
        user.isKycApproved = true;
        await user.save();
      }
    }

    return res.status(200).json({
      message: "Webhook processed successfully",
      kyc,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ message: "Webhook processing failed" });
  }
};
