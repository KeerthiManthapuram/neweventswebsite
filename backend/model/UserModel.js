// Import mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose'); 

/**
 * User Schema Definition
 * Defines validation rules and structure for user documents in MongoDB
 */
const userSchemaRules = {
   
    // User's full name - required field
    name: {
        type: String,
        required: true
    },

    // User's email - must be unique and required
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Password - must be at least 8 characters
    password: {
        type: String,
        required: true,
        minlength: 8
    },
};

//Create a Mongoose schema using the rules defined above
const userSchema = new mongoose.Schema(userSchemaRules);

//Import bcrypt to securely hash passwords before saving to the database
const bcrypt = require("bcrypt");

//Mongoose pre-save hook to hash the user's password
userSchema.pre("save", async function(next) {
  //Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  //Hash the password with a cost factor of 12 (secure and performant)
  this.password = await bcrypt.hash(this.password, 12);

  //Remove confirmPassword before saving — it's only used for validation, not storage
  this.confirmPassword = undefined;

  next(); //Proceed to save the user
});

// Create a model from the schema — this will interact with the "usermodels" collection
const UserModel = mongoose.model("UserModel", userSchema);

// Export the model to use in controllers and routes
module.exports = UserModel;