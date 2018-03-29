/**
 * Created by aurum on 2018/3/17.
 */
const requestPromise = require('request-promise');
const _ = require('lodash');

const config = require('./config');
const utils = require('./utils');
const xmlParser = require('./libs/XML').parser;

class JianzhouMsg {
    constructor(account, password, sign) {
        if (!account || !password) {
            throw new Error(`账号密码不能为空`);
        }
        if (!sign) {
            throw new Error(`签名不能为空`);
        }

        this.account = account;
        this.password = password;
        this.sign = sign;
    }

    /**
     * 批量发送短信（可定时发送）
     * 没有单条短信发送接口，如需单条，只传一个号码即可
     * @param numbers {Array} 手机号数组，手机号为string
     * @param content {String} 内容不带签名
     * @param options
     * @param options.sendDateTime {String|Date}定时发送时间，即时短信请留空
     * @returns {Promise.<*>}
     */
    async sendMsgBatch(numbers, content, options = {}) {
        _check(numbers, content);
        content = this._sign(content);

        const sendTime = options.sendDateTime &&
          (typeof options.sendDateTime === 'string' ? options.sendDateTime : utils.formatDate(options.sendDateTime));
        const reqOpts = {
            uri: config.SEND_BATCH_MSG_URL,
            form: {
                account: this.account,
                password: this.password,
                destmobile: numbers.join(';'),
                msgText: content,
                sendDateTime: sendTime || '',
                ext: options.ext,
                userTaskID: options.userTaskID
            }
        };
        const result = await requestPromise.post(reqOpts);

        this._checkError(result);

        return result;
    }

    /**
     * 发送个性化短信
     * @param numbers {Array}
     * @param contents {Array}
     * @returns {Promise.<*>}
     */
    async sendPersonalMsgBatch(numbers, contents,) {
        _check(numbers, contents);
        contents = this._sign(contents);

        const result = await requestPromise.post({
            uri: config.SEND_PERSONAL_MSG_URL,
            form: {
                account: this.account,
                password: this.password,
                destMobiles: numbers.join('||'),
                msgContents: contents.join('||')
            }
        });

        this._checkError(result);

        return result;
    }

    /**
     * 获取账号信息（余额）
     * @returns {Promise.<*>}
     * { vip: '0',
        usertype: '1',
        userId: '11428',
        mmsrate: '6',
        sign: '',
        remainFee: '94873',
        Channels: { Channel: [ [Object], [Object], [Object] ] } }
     */
    async getUserInfo() {
        const response = await requestPromise.post({
            uri: config.GET_USER_INFO_URL,
            form: {
                account: this.account,
                password: this.password
            }
        });

        return (await xmlParser.parseStringAsync(response)).userinfo;
    }

    /**
     * 为发送的内容增加签名
     * @param content
     * @returns {*}
     * @private
     */
    _sign(content) {
        let contentArr;
        const isStr = typeof content === 'string';
        if (isStr) {
            contentArr = [content];
        } else if (content instanceof Array) {
            contentArr = content;
        } else {
            throw new Error(`参数必须为string或string数组`);
        }

        for (let i = 0; i < contentArr.length; i++) {
            const single = contentArr[i];
            contentArr[i] = `${single}【${this.sign}】`;
        }

        return isStr ? contentArr[0] : contentArr;
    }

    /**
     * 检查响应中是否返回了错误
     * @param res
     * @private
     */
    _checkError(res) {
        const code = parseInt(res, 10);
        if (code < 0) {
            const err = new Error(`短信接口返回错误,detail：${res}`);
            err.code = code || undefined;
            throw err;
        }
    }
}

module.exports = JianzhouMsg;


function _check(numbers, content) {
    if (_.isEmpty(numbers)) {
        throw new Error(`手机号不能为空`);
    }
}


