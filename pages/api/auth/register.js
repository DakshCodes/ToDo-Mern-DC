import { asyncError, errorhandler } from "@/middlewares/error";
import { User } from "@/models/user";
import { connectDB, cookieSetter, genrateToken } from "@/utils/features";
import bcrypt from 'bcryptjs'

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorhandler(res, 400, "Only Post Method is allowed");

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return errorhandler(res, 400, "Please Enter  All Feiels");


  await connectDB();

  let user = await User.findOne({ email });

  if (user)
    return errorhandler(res, 400, "User Already Register");

  const hashedPassword = await bcrypt.hash(password,10)
  user = await User.create({
    name,
    email,
    password:hashedPassword,
  });

  // set here  cookie... for resgister

  //  
  const token = genrateToken(user._id)


  cookieSetter(res, token, true)

  res.status(201).json({
    succes: true,
    message: "Register Succesfully",
    user

  });


})

export default handler;