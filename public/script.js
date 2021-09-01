let socket = null;

const app = Vue.createApp({
  data() {
    return {
      username: '',
      newMsg: '',
      messages: [{ text: 'Sziasztok!' }, { text: 'Joined chat' }],
    };
  },
  methods: {
    sendMessage() {
      socket.emit('message', this.username, this.newMsg);
    },
  },
  created() {
    socket = io();
  },
  mounted() {
    socket.on('allMessage', (data) => {
      this.messages = data;
    });
    socket.on('message', (username, message) => {
      this.messages = [...this.messages, { username, text: message }];
    });
  },
}).mount('#app');
