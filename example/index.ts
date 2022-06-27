import { HomeViewsNoDecorators } from "./views/HomeViewsNoDecorators";
import { HomeView } from "./views/HomeView";
import { ParentChildView } from "./views/ParentChildView";
import { CollectionOfViewsView } from "./views/CollectionOfViewsView";
import { ProcessingEventView } from "./views/ProcessingEventView";

window.onload = () => {
    window.onhashchange = () =>{            
        if (window.location.hash === "#no-decorators"){
            new HomeViewsNoDecorators().inject(document.getElementById("app"));
        }else if (window.location.hash === "#parent-child"){
            new ParentChildView().inject(document.getElementById("app"));
        }else if (window.location.hash === "#collection-of-views"){
            new CollectionOfViewsView().inject(document.getElementById("app"));
        }else if (window.location.hash === "#event-from-view"){
            new ProcessingEventView().inject(document.getElementById("app"));
        }else{
            new HomeView().inject(document.getElementById("app"));
        }
    }
}