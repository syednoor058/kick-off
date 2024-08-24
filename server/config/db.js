const mongoose = require("mongoose");

const connectDB = async () => {
    try {
       const connectData = await mongoose.connect(process.env.MONGODB_URL);
       console.log(`Database is connected successfully! ${connectData.connection.host}`);
    } catch (error) {console.log(`Error occured connecting database. &{error}`)}
}

module.exports = connectDB;