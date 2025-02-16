import mongoose from "mongoose";

const DBCon = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDb is Connected.");
  } catch (error) {
    console.log(error);
  }
};

export default DBCon;
