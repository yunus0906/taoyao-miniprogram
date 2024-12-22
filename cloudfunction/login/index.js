// 云函数入口文件
const cloud = require('wx-server-sdk');
const dayjs = require('dayjs');

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

  const serviceCollection = db.collection('notd_service');
  const serviceResult = await serviceCollection.where({
    status: '1'
  }).get();

  // 模拟其他数据
  const countsData = [
    { num: 2, name: '积分', type: 'point' },
    { num: 10, name: '优惠券', type: 'coupon' },
  ];

  const customerServiceInfo = serviceResult.data[0];

  if (userResult.data.length === 0) {
    // 没有相同的openid记录，新增一条用户数据
    const randomNum = Math.floor(Math.random() * 10000);
    const newUser = {
      openId,
      avatarUrl: `cloud://taoyao-5gv1osvt9d19db6b.7461-taoyao-5gv1osvt9d19db6b-1331326078/avatar.jpg`,
      nickName: `呱呱用户${randomNum}`,
      phoneNumber: '',
      gender: '2'
    };

    await userCollection.add({
      data: newUser
    });
    
    return {
      isNewUser: true,
      userInfo: newUser,
      countsData,
      customerServiceInfo
    };

  } else {
    const userInfo = userResult.data[0];
    return {
      isNewUser: false,
      userInfo,
      countsData,
      customerServiceInfo
    };
  }
}