import resSender from "../utils/resSender.js";

export async function dashboardHandler(req, res){
    try{
        const user = req.user;
        return resSender(res, 200, true, 'Dashboard data fetched successfully', { user });
    } catch(err){
        console.error("Dashboard Error:", err.message);
        return resSender(res, 500, false, 'Internal server error', err.message);
    }
}