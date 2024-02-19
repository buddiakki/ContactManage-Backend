const mongoose = require('mongoose');


const contactSchema = mongoose.Schema({
    
    user_id:{
        type: mongoose.Schema.ObjectId,
        required : true,
        ref: "User"
    },

    name : {
        type: String,
        require : [true, 'please add contact name']
    },
    email : {
        type: String,
        require : [true, 'please add contact email']
    },
    phone : {
        type: String,
        require : [true, 'please add contact phone']
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Contact',contactSchema);