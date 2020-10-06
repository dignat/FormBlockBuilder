import Vue from 'vue'
import App from '../App'
import Login from "../Login";
import Dashboard from "../Dashboard";
import Register from "../Register";
export const routes = [
    {path:'/dashboard', name: "Dashboard", component: Dashboard},
    {path: '/', name: "Login", component: Login},
    {path: '/register', name: "Register", component: Register}

];

export default routes;

