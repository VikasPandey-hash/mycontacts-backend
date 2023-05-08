const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModal")

//@ desc Get all contacts 
//@ route  GET /api/contacts 
//@ access public 
const getContacts =asyncHandler(async (req, res) => {
    const contacts = await Contact.find() ;
    res.status(200).json(contacts);
});
 
//@ desc  Create New Contact 
//@ route  POST/api/contacts 
//@ access public 
const createContact = asyncHandler(   async (req,res) => {
    console.log("the request body is :",req.body);
    const {name , email , phone} = req.body ;
    if(!name || ! email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const contact = await Contact.create({
        name ,
        email ,
        phone,
    });
    res.status(201).json({contact});
});
//@ desc  Get contact
//@ route  GET /api/contacts/:id
//@ access public 
const getContact =  asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
});
//@ Upadate contact 
//@ route Put /api/contacts/:id
//@ access public 
const updateContact = asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found ");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id ,
        req.body ,
        {new : true }
    )
    res.status(201).json(updatedContact)
});
//@ Delete contacts 
//@ delete /api/contacts/:id 
//@ access public 
const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("contact not foumd");
    }
    await Contact.remove() ;
    res.status(200).json(contact);
});

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact}