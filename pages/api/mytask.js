import { asyncError, errorhandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";

const handler = asyncError(async (req, res) => {
    if (req.method !== "GET")
        return errorhandler(res, 400, "Only GET Method is allowed");
    await connectDB();

    const user = await checkAuth(req)

    if(!user) return errorhandler(res,401,"Login First")
    
    const tasks = await Task.find({ user: user._id })
    res.json({
        success: true,
        tasks,
    });
}
);
export default handler;