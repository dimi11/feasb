import { HomeView } from "./views/HomeView";

window.onload = () => {
    new HomeView().inject(document.getElementById("app"));
}