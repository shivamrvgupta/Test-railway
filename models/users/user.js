const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

    // Define user schema
    const userSchema = new mongoose.Schema({
        token: {
            type : String,
            default: null
        }, 
        usertype:  { 
            type: String,
            required: true,
            maxLength: 200
        },
        profile:{
            type: String,
            default: 'default_profile.jpg',
        },
        first_name: {
            type: String,
            required: true,
            maxLength: 200
        },
        last_name: {
            type: String,
            required: true,
            maxLength: 200
        },
        dob:  { 
            type: Date,
            required: true,
            maxLength: 200
        },
        email:  { 
            type: String,
            required: true,
            maxLength: 200
        },
        password:  { 
            type: String,
            required: false,
            maxLength: 200
        },  
        gender:  { 
            type: String,
            required: true,
            maxLength: 200
        },
        phone:  { 
            type: String,
            required: true,
            maxLength: 200
        },
        company: {
            type: String,
        },
        is_mobile_verified: {
            type: Boolean,
            default: true,
        },
        is_email_verified : {
            type: Boolean,
            default: false,
        },
        is_address_available : {
            type: Boolean,
            default: false,
        },
        is_active:  { 
            type: Boolean,
            required: true,
        },
        accept_term: {
            type: Boolean,
            required: true,
        },
        created_date: {
            type:Date,
            default: Date.now
        },
        updated_date: {
            type:Date,
            default: Date.now
        }
    });

// Define the comparePassword method for the userSchema
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
};

// Static method to check if the address is confirmed for a user based on the phone number
userSchema.statics.checkIfAddressConfirmed = async function (phone_number) {
    try {
      const user = await this.findOne({ phone: phone_number });
      return user.is_address_available; // Assuming the field 'is_address_available' is used to store address confirmation status
    } catch (error) {
      console.error('Error checking if address is confirmed:', error);
      throw error;
    }
  };

const User = mongoose.model('User', userSchema);
module.exports = User
