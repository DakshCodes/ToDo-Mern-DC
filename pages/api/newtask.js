import { asyncError, errorhandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";

const handler = asyncError(async (req, res) => {
    if (req.method !== "POST")
        return errorhandler(res, 400, "Only Post Method is allowed");
    await connectDB();

    const { title, description } = req.body;

    if(!title || !description) return errorhandler(res,400, "Fill All fields");
    
    const user = await checkAuth(req)

    if (!user) return errorhandler(res, 401, "Login First")

    await Task.create({
        title,
        description,
        user: user._id
    })

    res.json({
        success: true,
        message: "task Created"
    })
}
)
export default handler;