<template>
  <div>
    <h1>チャットルーム {{ roomId }} </h1>

    <ul>
      <li v-for="message in messages" :key="message.id">
        <strong>{{ message.sender_name }}:</strong> {{ message.content }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

type Message = {
  id: number;
  sender_name: string;
  content: string;
}

export default defineComponent({
  props: ['roomId'],
  data() {
    return {
      roomName: '',
      messages: [] as Message[],
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      axios
        .get(`http://localhost:3000/rooms/${this.roomId}/messages`)
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
});
</script>