import { signupUser, loginUser } from "../services/user.service.js";

export const signup = async (req, res) => {
  try {
    const user = await signupUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.status(200).json({
      message: "Login successful",
      ...data
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
