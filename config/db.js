const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DB_URL;
const URI = "mongodb://127.0.0.1:27017/";
const Database = "notes_app"


// Connect to MongoDB database using Mongoose
const connectDB = async () => {
    try {
        mongoose.connect(URI + Database).then(() =>
        console.log("MongoDB connected successfully")
        );
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
module.exports = connectDB;





// const mongoose = require('mongoose');
// require('dotenv').config();
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB Connected....");
//     } catch (err) {
//         console.error('ERROR HAS BEEN GENERATED : ', err.message);
//         process.exit(1);
//     }
// }