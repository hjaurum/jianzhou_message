/**
 * Created by aurum on 2018/3/17.
 */
const Msg = require('../index');

const jzMsg = new Msg('', '123456', '友好速搭');
describe('JianzhouMsg', function () {
    it('发送即使短信，ok', async () => {
        const result = await jzMsg.sendMsgBatch(['18682306030'], '感谢您的使用，可进入个人中心查看详情。');
        console.log(result);
    });

    it('发送定时短信，ok', async () => {
        const result = await jzMsg.sendMsgBatch(['18682306030'], '感谢您的使用，可进入个人中心查看详情。', {sendDateTime: new Date()});
        console.log(result);
    });

    it('个性化短信，ok', async () => {
        const result = await jzMsg.sendPersonalMsgBatch(['18825285140','18682306030'], ['金狗给您拜年了','金狗旺财'],);
        console.log(result);
    });

    it('获取用户余额，ok', async () => {
        const result = await jzMsg.getUserInfo();
        console.log(result);
    });
});