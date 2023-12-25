<template>
  <div>
    <h1 class="text-pink-500">VueChat - チャットルーム一覧</h1>
    <ul>
      <li v-for="room in chatRooms" :key="room.id">
        <router-link :to="`/rooms/${room.id}`">{{ room.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

type ChatRoom = {
  id: number;
  name: string;
}

export default defineComponent({
  data() {
    return {
      chatRooms: [] as ChatRoom[],
    };
  },
  mounted() {
    this.fetchChatRooms();
  },
  methods: {
    fetchChatRooms() {
      axios
        .get('http://localhost:3000/rooms')
        .then(response => {
          this.chatRooms = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
});
</script>