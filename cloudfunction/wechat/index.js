// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database(); // 获取数据库实例

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 查询 status 为 1 的记录
    const statusResult = await db.collection('notd_wechat')
      .where({ status: "1" })
      .get();

    // 如果存在 status 为 1 的记录，返回第一条
    if (statusResult.data.length > 0) {
      const selectedItem = statusResult.data[0];
      return {
        code: 200,
        message: '获取成功 (status: 1)',
        data: {
          info: selectedItem.info,
          image: selectedItem.images,
          account: selectedItem.account,
        },
      };
    }

    return {
      code: 404,
      message: '数据为空，请检查数据库是否有记录。',
    };
    
  } catch (error) {
    console.error('获取数据失败:', error);
    return {
      code: 500,
      message: '服务器错误，请稍后再试',
      error: error.message,
    };
  }
};
