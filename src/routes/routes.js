import Vue from 'vue'
import App from '../App'
import Login from "../Login";
import Dashboard from "../Dashboard";
import Register from "../Register";
import Clients from "../Clients";
export const routes = [
    {path:'/dashboard', name: "Dashboard", component: Dashboard},
    {path: '/', name: "Login", component: Login},
    {path: '/register', name: "Register", component: Register},
    {path:'/clients', name: 'Clients', component: Clients}

];

export default routes;

