import { HomeView } from "./examples/HomeView"

window.onload = () => {
    let homeView = new HomeView();
    homeView.inject(document.getElementById("app"));
}