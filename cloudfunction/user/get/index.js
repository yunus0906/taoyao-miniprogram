// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;

  // 查询数据库中是否有相同的openid的记录
  const userCollection = db.collection('notd_user');
  const userResult = await userCollection.where({
    openId
  }).get();

  const userInfo = userResult.data[0];
  return {
    isNewUser: false,
    userInfo,
  };
}