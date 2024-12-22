// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;

  const { avatarUrl, nickName, phoneNumber, gender } = event;

  const userCollection = db.collection('notd_user');
  const updateResult = await userCollection.where({
    openId
  }).update({
    data: {
      avatarUrl,
      nickName,
      phoneNumber,
      gender
    }
  });

  if (updateResult.stats.updated === 0) {
    return {
      success: false,
      message: '用户信息更新失败，未找到该用户'
    };
  }

  return {
    success: true,
    message: '保存成功'
  };
}