import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import "./index.css";
import ActionCable from "actioncable";

const cable = ActionCable.createConsumer("wss://realtimechat-api-rkjb.onrender.com/cable");
const app = createApp(App);
app.use(router);
app.provide("cable", cable);
app.mount("#app");
