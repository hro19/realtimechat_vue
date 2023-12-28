<template>
  <div>
    <h1 class="text-pink-500 text-2xl mb-2">VueChat - チャットルーム一覧</h1>
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
import { getAllRooms,createChatRoom } from '../api/roomService';

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
  },
  methods: {
    async fetchChatRooms() {
        this.chatRooms = await getAllRooms();
    },
    async createRoom() {
          const newRoom = await createChatRoom(this.newRoomName)
          this.chatRooms.push(newRoom);
          this.newRoomName = '';
        }
    },
  },
);
</script>