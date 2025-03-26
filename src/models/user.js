import mongoose from "mongoose";

// Basic User Schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  role: {
    type: String,
    enum: ["Customer", "Admin", "DeliveryPartner"],
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
});

// Cutomer Schema

const customerSchema = new mongoose.Schema({
  ...userSchema.obj,
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Customer"], default: "Customer" },
  liveLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  address: {
    type: String,
  },
});

// Delivery Partner Schema

const deliverySchema = new mongoose.Schema({
  ...userSchema.obj,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["DeliveryPartner"], default: "DeliveryPartner" },
  liveLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  address: {
    type: String,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
});

// Admin Schema

const adminSchema = new mongoose.Schema({
    ...userSchema.obj,  
    email : {type : String, required : true, unique : true},
    password : {type : String, required :true},
    role : {type : String , enum : ["Admin"], default : "Admin"}
})

export const Customer = mongoose.model('Customer', customerSchema)
export const DeliveryPartner = mongoose.model('DeliveryPartner', deliverySchema)
export const Admin = mongoose.model('Admin',adminSchema)

// "name": "Rakesh",
// "role": "DeliveryPartner",
// "isActivated": true,
// "email": "delivery@gmail.com",
// "password": "12345678",
// "phone": "8899775566",
// "liveLocation": {
//   "latitude": 21.16764852593447,
//   "longitude" : 72.8692785134908
// },
// "address" : "Priyanka City Plus",
// "branch" : 67d3251ebb39942bfeb81b71