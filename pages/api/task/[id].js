import { asyncError, errorhandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";

const handler = asyncError(async (req, res) => {
    await connectDB();
    const user = await checkAuth(req)
    if (!user) return errorhandler(res, 401, "Login First")

    const taskId = req.query.id

    const task = await Task.findById(taskId);

    if (!task) return errorhandler(res, 404, "Task Not Found")

    // FOR UPDATE and DELETE

    if (req.method !== "PUT") {
        //  For Update Task
        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            succces: true,
            message: "Task Updated Succesfully"
        });
    }

    else if (req.method !== "DELETE") {

        // for deleting task

        await task.deleteOne();

        res.status(200).json({
            succces: true,
            message: "Task Delete Succesfully"
        });

    } else {
        errorhandler(res, 400, "ONLY PUT AND DELETE AVINLABle")
    }
}
)
export default handler;