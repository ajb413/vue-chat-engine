import Observer from './observer';

const VueChatEngine = {
    install(Vue, { chatEngine, store }) {

        let observer = new Observer({ chatEngine, store });

        Vue.mixin({
            created() {
                this.$chatEngine = observer.ChatEngine;
            }
        });
    }
}

export default VueChatEngine;
