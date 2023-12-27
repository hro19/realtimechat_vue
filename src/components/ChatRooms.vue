<template>
  <div>
    <h1 class="text-pink-500 text-2xl">VueChat - チャットルーム一覧</h1>
    <ul>
      <li v-for="room in chatRooms" :key="room.id" class="underline">
        <router-link :to="`/rooms/${room.id}`">{{ room.name }}</router-link>
      </li>
    </ul>
    <hr />
    <h3 class=" text-blue-500">チャットルーム作成</h3>
    <div class="flex">
      <input type="text" v-model="newRoomName" class="border border-gray-300 rounded-l px-2" />
      <button @click="createRoom" class="bg-blue-500 text-white rounded px-4 ml-1">作成</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { add } from '../api/roomsAll';

type ChatRoom = {
  id: number;
  name: string;
}

export default defineComponent({
  data() {
    return {
      chatRooms: [] as ChatRoom[],
      newRoomName: '' as string,
    };
  },
  mounted() {
    this.fetchChatRooms();
  },
  created() {
    this.fetchChatRooms();
      const result = add(10, 35);
      console.log(result);
  },
  methods: {
    fetchChatRooms() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/rooms`)
        .then(response => {
          this.chatRooms = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    createRoom() {
      axios.post(`${import.meta.env.VITE_API_URL}/rooms`, {
        name: this.newRoomName,
      })
        .then(response => {
          this.chatRooms.push(response.data);
          this.newRoomName = '';
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
});
</script>../api/roomsAll