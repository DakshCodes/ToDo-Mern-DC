import mongoose from 'mongoose';
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import { User } from '@/models/user';

export const connectDB = async () => {

  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "NextTodo",
  });
  console.log(`Database Connected on ${connection.host}`)

}

// Set Cookie  Function...


export const cookieSetter = (res, token, set) => {
  res.setHeader("Set-Cookie", serialize("token", set ? token : "", {
    path: '/',
    httpOnly: true,
    maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
  }));
}
// token function..
export const genrateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET)
}

// check auth..

export const checkAuth = async (req) => {

  const cookie = req.headers.cookie;

  if(!cookie) return null;

  const token = cookie.split("=")[1];
  
  const decode = jwt.verify(token,process.env.JWT_SECRET)

  return await User.findById(decode._id);
};