import User from "../models/user.model.js";
import Kyc from "../models/kyc.model.js";
import axios from "axios";

const PERSONA_BASE_URL = process.env.PERSONA_ENV === 'sandbox'
  ? 'https://api.sandbox.withpersona.com'
  : 'https://api.withpersona.com';
const PERSONA_API_KEY = process.env.PERSONA_API_KEY;
const PERSONA_INQUIRY_TEMPLATE_ID = process.env.PERSONA_INQUIRY_TEMPLATE_ID || "itmpl_p8ANAJy9iqadm2buF2xcVgqH"; // Default template

export const submitKycService = async (userId, data) => {
  const existingKyc = await Kyc.findOne({ userId });
  if (existingKyc) {
    throw new Error("KYC already submitted");
  }

  // Create Persona inquiry first
  try {
    console.log('Creating Persona inquiry...');
    console.log('BASE_URL:', PERSONA_BASE_URL);
    console.log('Template ID:', PERSONA_INQUIRY_TEMPLATE_ID);
    console.log('API Key starts with:', PERSONA_API_KEY.substring(0, 20) + '...');

    const personaResponse = await axios.post(
      `${PERSONA_BASE_URL}/api/v1/inquiries`,
      {
        data: {
          attributes: {
            "inquiry-template-id": PERSONA_INQUIRY_TEMPLATE_ID,
            // Add basic user data if available
            "reference-id": `kyc_${userId}_${Date.now()}`, // Unique reference
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PERSONA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const inquiryId = personaResponse.data.data.id;
    console.log('Persona inquiry created:', inquiryId);

    // Create KYC record with Persona inquiry ID
    return await Kyc.create({
      userId,
      ...data,
      providerRequestId: inquiryId, // Store Persona's inquiry ID
    });
  } catch (error) {
    console.error("Persona API error:", error.response?.data || error.message);
    console.error("Status:", error.response?.status);
    console.error("Full error:", error);

    // Fallback: create KYC without Persona if API fails
    console.log('Falling back to creating KYC without Persona integration');
    return await Kyc.create({
      userId,
      ...data,
      providerRequestId: `fallback_${Date.now()}`,
      remark: `Persona API failed: ${error.message}`,
    });
  }
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
