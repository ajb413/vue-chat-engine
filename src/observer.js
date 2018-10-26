export default class {
    constructor(params) {

        this.ChatEngine = params.chatEngine;

        if (params.store) {
            this.store = params.store;
        }

        this.onEvent();
    }

    onEvent() {
        this.ChatEngine.onAny((event, payload, sender) => {
            if (this.store) {
                const chat = sender && sender instanceof Object && sender.chat ?
                    sender.chat : null;
                chat && !payload.chat ? payload.chat = chat : null;
                this.passToStore('CHATENGINE_' + event, payload);
            }
        });
    }

    passToStore(event, payload) {
        if (!event.startsWith('CHATENGINE_')) {
            return;
        }

        for (let namespaced in this.store._mutations) {
            let mutation = namespaced.split('/').pop();

            if (mutation === event) {
                this.store.commit(namespaced, payload);
            }
        }

        for (let namespaced in this.store._actions) {
            let action = namespaced.split('/').pop();

            if (action === event) {
                this.store.dispatch(namespaced, payload);
            }
        }
    }
}
