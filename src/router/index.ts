import { createRouter, createWebHistory } from "vue-router";
import ChatRooms from "../components/ChatRooms.vue"; 
import "../components/ChatRooms.vue";
import ChatRoom from "../components/ChatRoom.vue"; 

const routes = [
  { path: "/", component: ChatRooms },
  {
    path: "/rooms/:id",
    component: ChatRoom,
    props: (route: any) => ({ roomId: Number(route.params.id) }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
