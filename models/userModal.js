const mongoose =  require("mongoose")


const userSchema = mongoose.Schema({

    username : {
        type: String,
        required: [true, 'please enter your user name'],
    },
    email: {
        type: String,
        required:[true,'please enter your email'],
        unique : [true, 'Email address already in use']
    },
    password: {
        type: String,
        required:[true, 'please enter your password']
    },
    imageUrl: {
        type: String, 
        default: null 
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);