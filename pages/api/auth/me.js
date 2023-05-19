import { asyncError, errorhandler } from "@/middlewares/error";
import { checkAuth } from "@/utils/features";

const handler = asyncError(async (req, res) => {
    if (req.method !== "GET")
        return errorhandler(res, 400, "Only GEt Method is allowed");


    const user = await checkAuth(req)

    if (!user) return errorhandler(res, 401, "Login First")

    res.status(200).json({
        succes: true,
        user,
    });


})

export default handler;