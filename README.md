# jianzhou_message
建周短信平台Node.js SDK

> 使用前请先阅读建周官方文档[http://jianzhou.mydoc.io/?t=197952]

### Install
```
    npm install jianzhou_message
```
### Usage
```javascript
    const Jianzhou = require('jianzhou_message');
    const sms = new Jianzhou('username','password','友好速搭');
```
#### 发送短信【批量】
建周没有单条短信发送接口，只能批量发送，需要单条，则只传一个手机号即可。
```javascript
    // 发送即时短信
    await sms.sendMsgBatch(['18683030303'],'测试短信内容，不带签名');
    // 发送定时短信
    await sms.sendMsgBatch(['18683030303'],'测试短信内容，不带签名',{
        sendDateTime: '201803231400' // 可以为Date对象，会自动转换为符合的STRING
    });
    // 客户收到的短信为：
    // 测试短信内容，不带签名【友好速搭】
```
#### 发送个性化短信
```javascript
    await sms.sendPersonalMsgBatch(['号码1','号码2'],['发送给号码1的内容','发送给号码2的内容']);
```
#### 获取账户信息（剩余条数等）
```javascript
    await sms.getUserInfo();
    // 返回值：
    /**
    { vip: '0',
            usertype: '1',
            userId: '11428',
            mmsrate: '6',
            sign: '',
            remainFee: '94873',
            Channels: { Channel: [ [Object], [Object], [Object] ] } }
    **/
```