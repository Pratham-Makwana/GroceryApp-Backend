import "dotenv/config";
import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";
import { Admin } from "../models/user.js";

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;

const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.log("Session store error", error);
});

export const authenticate = async (email, password) => {
  // if(email && password){
  //   if(email === 'pratham@gmail.com' && password === '12345678'){
  //       return Promise.resolve({email : email,  password : password})
  //   }else{
  //       return null;
  //   }
  // }

    // Uncomment This Code Created Admin Manually
  if (email && password) {
    const user = await Admin.find({ email });
    if (!user) {
      return null;
    }
    console.log(user);
    // console.log(user.password);
    

    if (user[0].password === password) {
      return Promise.resolve({ email: email, password: password });
    } else {
      return null;
    }
  }

  return null;
};
