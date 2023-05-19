import { asyncError, errorhandler } from "@/middlewares/error";
import { cookieSetter } from "@/utils/features";

const handler = asyncError(async (req, res) => {
    if (req.method !== "GET")
        return errorhandler(res, 400, "Only GET Method is allowed");

    // set here  cookie... for resgister


    cookieSetter(res, null, false)

    res.status(200).json({
        succes: true,
        message: `Logged Out SuccesFully`
    });


})

export default handler;