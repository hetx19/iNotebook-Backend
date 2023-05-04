import mongoose from "mongoose";

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected to iNotebook Databse successfully ${connection.connection.host}`
        .bgGreen.white
    );
  } catch (err) {
    console.log(err);
  }
};

export default connect;
