import { HomeView } from "./views/HomeView";

window.onload = () => {
    window.alert("I am loaded!");
    new HomeView().inject(document.getElementById("app"));
}