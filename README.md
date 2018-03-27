# Vue-Chat-Engine

A Vue.js 2 Plugin

Build chat apps with Vue and Vuex using PubNub ChatEngine.

## Install

``` bash
npm install vue-chat-engine --save
```

## Use in a Vue.js app

Main.js

```javascript
import Vue from 'vue';
import App from './App';
import store from './store';
import VueChatEngine from 'vue-chat-engine';
import ChatEngineCore from 'chat-engine';

const chatEngine = ChatEngineCore.create({
  publishKey: 'pub_key_here',
  subscribeKey: 'sub_key_here'
}, {
  globalChannel: 'chatengine-vue-demo-global',
  enableSync: true,
});

// Chat Engine injected into every component instance
Vue.use(VueChatEngine, {chatEngine, store});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: {App},
  template: '<App/>',
  created() {
    const ChatEngine = this.$chatEngine;
    const store = this.$store;
    ChatEngine.connect(me.uuid, me);
    // ...
  },
});
```


store.js

```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  chats: {},
  chatMessages: {},
  me: {},
};

const mutations = {
  setMe(state, {me}) {
    state.me = me;
  },
  CHATENGINE_message(state, {event, sender, chat, data}) {
    let channel = chat.config.channel;

    if (!state.chatMessages[channel]) {
      Vue.set(state.chatMessages, channel, []);
    }

    let myUuid = this.state.me.uuid;
    let message = data;

    if (sender.uuid === myUuid) {
      message.who = 'me';
    } else {
      message.who = 'them';
    }

    state.chatMessages[channel].push(message);
    state.chatMessages[channel].sort((msg1, msg2) => {
      return msg1.time > msg2.time;
    });

  },
};

```

## Build

``` bash
npm run build
```