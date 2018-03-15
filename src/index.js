import Observer from './observer';

const VueChatEngine = {
    install(Vue, { pnConfig, chatEngineConfig, store }) {
        if (!pnConfig) {
            throw new Error("[VueChatEngine] 'pnConfig' missing on init");
        }

        if (typeof pnConfig.publishKey !== 'string' ||
            typeof pnConfig.subscribeKey !== 'string'
        ) {
            throw new Error("[VueChatEngine] 'pnConfig' object is invalid");
        }

        let observer = new Observer({ pnConfig, chatEngineConfig, store });

        Vue.mixin({
            created() {
                this.$chatEngine = observer.ChatEngine;
            }
        });
    }
}

export default VueChatEngine;