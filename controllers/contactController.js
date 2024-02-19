const asynchandler = require("express-async-handler")
const Contact = require('../models/contactModal')

const getContact = asynchandler( async (req, res) => {
    const Contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(Contacts);
});

const getContactById = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404)
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const postContact = asynchandler(async (req, res) => {
    console.log('this is request from client:',req.body );
    const {phone,email,name} = req.body;
    if (!phone || !email ||!name ) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id
    })
    res.status(201).json(contact);
});

const updateContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404)
        throw new Error("Contact not found");
    }
    if( contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user dont have permission to update another user contact");
    }
    const UpdateContact = await Contact.findByIdAndUpdate(
     req.params.id,
     req.body, 
     {new: true},
    )
    res.status(200).json(UpdateContact);
});

const deleteContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found");
    }

    if( contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user dont have permission to delete another user contact");
    }
    // const removedContact = await Contact.findByIdAndRemove(req.params.id);
    const removedContact = await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json({
        message: "Contact deleted successfully",
        deletedContact: removedContact
    });
});


module.exports = {getContact, getContactById, postContact, updateContact, deleteContact};