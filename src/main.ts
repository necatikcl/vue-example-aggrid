import { createApp } from "vue";
import router from "./base/router";
import server from "./base/server";
import App from "./base/App.vue";
import "./base/index.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
