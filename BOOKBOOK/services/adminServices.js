const seq = require("../database/db");
const models = seq.models;
//const sequelize = seq.sequelize;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const adminServices = {
    checkExistGroupPost: async (post_id) => {
        const result = await models.group_wall.findAll({
            where: {
                post_id: post_id,
            },
        });
        if (result === null) {
            return false;
        } else {
            return true;
        }
    },
    //Xoa nguoi dung (cua admin)
    deleteUser: async (username) => {
        try {
            const delUser = await models.user_info.update(
                {
                    permission: -1,
                },
                {
                    where: {
                        username: username,
                    },
                }
            );
            const delProfile = await models.user_profile.destroy({
                where: {
                    username: username,
                },
            });
            const delGeneralComments = await models.general_comment.destroy({
                where: {
                    cmt_by: username,
                },
            });
            const delMarketComments = await models.market_comment.destroy({
                where: {
                    cmt_by: username,
                },
            });
            const delUserFollowed = await models.follow.destroy({
                where: {
                    usr_followed: username,
                },
            });
            const delFollow = await models.follow.destroy({
                where: {
                    usr_follow: username,
                },
            });
            const delReaction = await models.reaction.destroy({
                where: {
                    react_by: username,
                },
            });
            const delMarketPost = await models.market_post.destroy({
                where: {
                    post_by: username,
                },
            });
            const delGroupMember = await models.group_member.destroy({
                where: {
                    username: username,
                },
            });
            //Xoa tat ca bao cao ve nguoi dung nay
            const delUserReport = await models.reported_user.destroy({
                where: {
                    reported_user: username,
                },
            });
            console.log(`deleted user with username: ${username} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete user with username:  ${username} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa general post (cua admin)
    deleteGeneralPost: async (post_id) => {
        try {
            const delGeneralPost = await models.general_post.destroy({
                where: {
                    post_id: post_id,
                },
            });
            //Xoa tat ca bao cao ve post nay
            const delPostReport = await models.reported_post.destroy({
                where: {
                    post_id: post_id,
                },
            });
            if (await adminServices.checkExistGroupPost(post_id)) {
                const delPostOfGroup = await models.group_wall.destroy({
                    where: {
                        post_id: post_id,
                    },
                });
                //Xoa tat ca bao cao ve post nay trong nhom
                const delPostReportOfGroup = await models.group_reported_post.destroy({
                    where: {
                        post_id: post_id,
                    },
                });
            }
            console.log(`deleted general post: ${post_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete general post:  ${post_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa post o trong market (cua admin)
    deleteMarketPost: async (post_id) => {
        try {
            const delMarketPost = await models.market_post.destroy({
                where: {
                    post_id: post_id,
                },
            });
            //Xoa tat ca bao cao ve post nay
            const delPostReport = await models.reported_post.destroy({
                where: {
                    post_id: post_id,
                },
            });
            console.log(`deleted market post: ${post_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete market post:  ${post_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa group (cua admin)
    deleteGroup: async (group_id) => {
        try {
            const delGroup = await models.group_info.destroy({
                where: {
                    group_id: group_id,
                },
            });
            //Xoa tat ca bao cao ve group nay
            const delGroupReport = await models.reported_group.destroy({
                where: {
                    group_id: group_id,
                },
            });
            console.log(`deleted group: ${group_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete group:  ${group_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa bao cao nguoi dung cua admin
    deleteUserReport: async (report_id) => {
        try {
            const delUserReport = await models.reported_user.destroy({
                where: {
                    report_id: report_id,
                },
            });
            console.log(`deleted user report: ${report_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete user report:  ${report_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa bao cao post cua admin
    deletePostReport: async (report_id) => {
        try {
            const delPostReport = await models.reported_post.destroy({
                where: {
                    report_id: report_id,
                },
            });
            console.log(`deleted post report: ${report_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete post report:  ${report_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa bao cao group cua admin
    deleteGroupReport: async (report_id) => {
        try {
            const delGroupReport = await models.reported_group.destroy({
                where: {
                    report_id: report_id,
                },
            });
            console.log(`deleted group report: ${report_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete group report:  ${report_id} \n `);
            console.log(err);
            return false;
        }
    }
};


module.exports = adminServices;