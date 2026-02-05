import Profile from "../models/profile.model.js";

export const createProfileService = async (userId, data) => {
  const existingProfile = await Profile.findOne({ userId });
  if (existingProfile) {
    throw new Error("Profile already exists");
  }

  const profile = await Profile.create({
    userId,
    ...data,
  });

  return profile;
};
export const getMyProfileService = async (userId) => {
  const profile = await Profile.findOne({ userId });
  if (!profile) {
    throw new Error("Profile not found");
  }
  return profile;
};
export const updateProfileService = async (userId, data) => {
  const profile = await Profile.findOneAndUpdate({ userId }, data, {
    new: true,
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};
