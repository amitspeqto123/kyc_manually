import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { kycmanaualdatabse } from "./config/db.js";


const PORT = process.env.PORT || 3000;

kycmanaualdatabse();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
