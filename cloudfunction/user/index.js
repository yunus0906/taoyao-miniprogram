const edit = require('./edit/index');
const get = require('./get/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'edit':
      return await edit.main(event, context);
    case 'get':
      return await get.main(event, context);
  }
};