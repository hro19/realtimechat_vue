<template>
  <div>
    <header>
      <h1 class="text-3xl text-purple-400">【{{ roomId }}】{{ roomName }}</h1>
    </header>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <strong>{{ message.sender_name }}:</strong> {{ message.content }}
      </li>
    </ul>
    <hr />
    <form @submit.prevent="sendMessage">
      <div>
        <h3>名前</h3>
        <input type="text" v-model="senderName" placeholder="名前を入力" required />
      </div>
      <div>
        <h3>メッセージ</h3>
        <input
          type="text"
          v-model="newMessageContent"
          placeholder="メッセージを入力"
          required
        />
      </div>
      <div>
        <button type="submit">送信</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { inject } from 'vue';

type Message = {
  id: number;
  sender_name: string;
  content: string;
};

export default defineComponent({
  props: ["roomId"],
  data() {
    return {
      roomName: "" as string,
      messages: [] as Message[],
      senderName: "" as string,
      newMessageContent: "" as string,
      subscription: null as any,
    };
    },
  setup() {
    const cable = inject('cable');
    return { cable };
  },
  created() {
      this.fetchMessages();
    this.createSubscription();
  },
    methods: {
    createSubscription() {
      this.subscription = (this.cable as any).subscriptions.create(
          { channel: 'RoomChannel', room_id: this.roomId },
          {
          received: (message: Message) => {
              this.messages.push(message);
          },
        }
      );
    },
    fetchMessages() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/rooms/${this.roomId}/messages`)
        .then((response) => {
          this.messages = response.data.messages;
          this.roomName = response.data.room.name;
        })
        .catch((error) => {
          console.error(error);
        });
      },
    sendMessage() {
      axios
        .post(`${import.meta.env.VITE_API_URL}/rooms/${this.roomId}/messages`, {
          content: this.newMessageContent,
          sender_name: this.senderName
        })
        .then(() => {
          this.newMessageContent = ''
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
});
</script>
