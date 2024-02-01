const mongoose = require ('mongoose');
const db = require("../config/db");
const bcrypt = require('bcrypt')
//Define the schema for a user. A user has an email, password and name.
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


userSchema.pre('save',async function() {
  try {
    const salt = await (bcrypt.genSalt(10));
    const hashpass = await (bcrypt.hashSync(this.password, salt));
    this.password = hashpass;
    this.email = this.email.toLowerCase()
    
  } catch (error) {
    throw error;
  }
})



// userSchema.methods.isCorrectPassword = async function(password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw error;
//   }
// }



//const UserModel = db.model('User', userSchema);

module.exports = userSchema;