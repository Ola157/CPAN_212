import mongoose from "mongoose";

const userSChema = mongoose.userSChema({
  email: {
    type: String,
    require: true,
  /},
});
