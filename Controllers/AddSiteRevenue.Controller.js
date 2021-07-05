const {
    addSiteRevenue_create,
    addSiteRevenue_get_all,
    addSiteRevenue_get_one,
    addSiteRevenue_update,
    addSiteRevenue_delete,
} = require("../Services/AddSiteRevenue.Service");

const { user_get_one, user_update } = require("../Services/UserService");
const { specialRevenueSite_get_one } = require("../Services/SpecialRevenueSiteService");
const { otherRevenueSite_get_one } = require("../Services/OtherRevenueSite.Service");

const addSiteRevenueCreate = async (req, res, next) => {
    try {
        const { siteId, userId } = req.body;

        let site = await specialRevenueSite_get_one(siteId);
        if (!site) {
            site = await otherRevenueSite_get_one(siteId);
            if (!site) {
                return res.status(400).json({
                    error: true,
                    addSiteRevenue: null,
                    message: "site not get!",
                });
            }
        }
        const user = await user_get_one(userId);
        console.log(site, user)

        const userUp = await user_update(userId, { walletAmount: user.walletAmount + site.revenue, totalMinuteServed: user.totalMinuteServed + site.minVisitingTime });

        if (!userUp) {
            return res.status(400).json({
                error: true,
                addSiteRevenue: null,
                message: "addSiteRevenue not created, something want wrong!",
            });
        }

        const addSiteRevenue = await addSiteRevenue_create(req.body);
        const addSiteRevenueObj = JSON.parse(JSON.stringify(addSiteRevenue));

        return res.status(200).json({
            error: false,
            addSiteRevenue: addSiteRevenueObj,
            message: "addSiteRevenue created",
        });

    } catch (error) {
        return res.status(500).json({
            error: error,
            addSiteRevenue: null,
            message: "addSiteRevenue not created.!",
        });
    }
};

const addSiteRevenueGetAll = async (req, res, next) => {
    try {
        const addSiteRevenue = await addSiteRevenue_get_all();
        const addSiteRevenueObj = JSON.parse(JSON.stringify(addSiteRevenue));

        return res.status(200).json({
            error: false,
            addSiteRevenue: addSiteRevenueObj,
            message: "addSiteRevenue's get successfully.!",
        });
    } catch (error) {
        return res.status(500).json({
            error: error,
            addSiteRevenue: null,
            message: "addSiteRevenue not get.!",
        });
    }
};

const addSiteRevenueGetOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        //console.log(id);
        const addSiteRevenue = await addSiteRevenue_get_one(id);
        const addSiteRevenueObj = JSON.parse(JSON.stringify(addSiteRevenue));

        return res.status(200).json({
            error: false,
            addSiteRevenue: addSiteRevenueObj,
            message: "addSiteRevenue get one",
        });
    } catch (error) {
        return res.status(500).json({
            error: error,
            addSiteRevenue: null,
            message: "addSiteRevenue not get.!",
        });
    }
};

const addSiteRevenueUpdate = async (req, res, next) => {
    try {
        const info = req.body;
        const { id } = req.params;
        const addSiteRevenueUp = await addSiteRevenue_update(id, info);
        if (!addSiteRevenueUp) {
            return res.status(400).json({
                error: true,
                addSiteRevenue: null,
                message: "addSiteRevenue not Updated.!"
            })
        }
        const addSiteRevenue = await addSiteRevenue_get_one(id);
        const addSiteRevenueObj = JSON.parse(JSON.stringify(addSiteRevenue));

        return res.status(200).json({
            error: false,
            addSiteRevenue: addSiteRevenueObj,
            message: "addSiteRevenue update successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: error,
            addSiteRevenue: null,
            message: "addSiteRevenue not updated.!",
        });
    }
};

const addSiteRevenueDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const addSiteRevenueDel = await addSiteRevenue_delete(id);
        if (!addSiteRevenueDel) {
            return res.status(400).json({
                error: true,
                addSiteRevenue: null,
                message: "addSiteRevenue not deleted.!"
            })
        }
        const addSiteRevenue = await addSiteRevenue_get_one(id);
        const addSiteRevenueObj = JSON.parse(JSON.stringify(addSiteRevenue));
        return res.status(200).json({
            error: false,
            addSiteRevenue: addSiteRevenueObj,
            message: "addSiteRevenue delete successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: error,
            addSiteRevenue: null,
            message: "addSiteRevenue not deleted.!",
        });
    }
};

module.exports = {
    addSiteRevenueCreate,
    addSiteRevenueGetAll,
    addSiteRevenueGetOne,
    addSiteRevenueUpdate,
    addSiteRevenueDelete,
};
