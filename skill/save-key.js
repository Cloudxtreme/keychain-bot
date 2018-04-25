"use strict";

const cache = require("memory-cache");

module.exports = class SkillSaveKey {
    constructor(){
        this.clear_context_on_finish = true;
        
        this.required_parameter = {
            service: {
                message_to_confirm: {
                    type: "text",
                    text: "アプリ名またはサービス名を教えてください。"
                }
            },
            username: {
                message_to_confirm: {
                    type: "text",
                    text: "ユーザー名を教えてください。"
                }
            },
            password: {
                message_to_confirm: {
                    type: "text",
                    text: "パスワードを教えてください。"
                }
            }
        }
    }

    finish(bot, event, context, resolve, reject) {
        let keychain = cache.get(`keychain_${bot.extract_sender_id()}`);
        if (!keychain) keychain = [];

        keychain.push({
            service: context.confirmed.service,
            username: context.confirmed.username,
            password: context.confirmed.password
        });
        cache.put(`keychain_${bot.extract_sender_id()}`, keychain)

        return bot.reply({
            type: "text",
            text: `${context.confirmed.service}のユーザー名・パスワードを保存しました。`
        }).then((response) => {
            return resolve();
        })
    }
}
