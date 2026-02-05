import {
  createProfileService,
  getMyProfileService,
  updateProfileService,
} from "../services/profile.service.js";

export const createProfile = async (req, res) => {
  try {
    const profile = await createProfileService(req.user._id, req.body);
    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getMyProfile = async (req, res) => {
  try {
    const profile = await getMyProfileService(req.user._id);
    res.status(200).json({
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const profile = await updateProfileService(req.user._id, req.body);
    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
