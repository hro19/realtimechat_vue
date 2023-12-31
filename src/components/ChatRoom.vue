<template>
  <div>
    <header>
      <h1 class="text-3xl text-purple-400 mb-2">【{{ roomId }}】{{ roomName }}</h1>
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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { inject } from 'vue'  
import axios from 'axios'

// propsの定義
const props = defineProps<{
  roomId: number
}>()

// 状態の定義
const messages = ref<any>([])
const roomName = ref<string>('')  
const senderName = ref<string>('')
const newMessageContent = ref<string>('')

// Action Cableのinject
const cable:any = inject('cable')  

// ライフサイクルフックで初期化
onMounted(() => {
  fetchMessages()
  createSubscription() 
})

// Action Cableでの購読設定
const createSubscription = () => {

  cable.subscriptions.create({
    channel: 'RoomChannel',
    room_id: props.roomId
  }, {
    received: (message: any) => {
      messages.value.push(message) 
    } 
  })

}

// メッセージの取得
const fetchMessages = async () => {

  const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${props.roomId}/messages`) 
  
  messages.value = response.data.messages 
  roomName.value = response.data.room.name

}  

// メッセージの送信 
const sendMessage = async () => {

  await axios.post(`${import.meta.env.VITE_API_URL}/rooms/${props.roomId}/messages`, {
    content: newMessageContent.value,
    sender_name: senderName.value 
  })
  
  newMessageContent.value = ''

}

</script>