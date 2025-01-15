import {createApp} from "vue";
import Dashboard from "./components/Dashboard.vue";

const mount = (el) => {
    const app = createApp(Dashboard);
    app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
    const wrapper = document.querySelector('#_id-dashboard-dev-root');

    if (wrapper) {
        mount(wrapper)
    }
}

export { mount };
