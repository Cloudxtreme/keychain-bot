"use strict";

const cache = require("memory-cache");

module.exports = class SkillSaveKey {
    constructor(){
        this.required_parameter = {
            service: {
                message_to_confirm: {
                    type: "text",
                    text: "アプリ名またはサービス名を教えてください。"
                }
            }
        }
    }

    finish(bot, event, context, resolve, reject) {
        let keychain = cache.get(`keychain_${bot.extract_sender_id()}`);

        let key;
        if (keychain){
            key = keychain.find(key => key.service === context.confirmed.service);
        }

        let message;
        if (key){
            message = {
                type: "text",
                text: `ユーザー名: ${key.username}\nパスワード: ${key.password}`
            }
        } else {
            message = {
                type: "text",
                text: `該当の情報はありませんでした。`
            }
        }
        return bot.reply(message).then((response) => {
            return resolve()
        })
    }
}
