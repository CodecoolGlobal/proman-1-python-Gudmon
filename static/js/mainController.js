import {dataHandler} from "./data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "./view/htmlFactory.js";
import {domManager} from "./view/domManager.js";
import {cardsManager} from "./controller/cardsManager.js";
import {dragManager} from "./controller/dragManager.js";
import {boardsManager} from "./controller/boardsManager.js";


function onStart(){
    let boardCreator = document.querySelectorAll("#board-create-btn");
    console.log(boardCreator);
    domManager.addEventListener(boardCreator, 'click', boardsManager.loadBoards())
    }


onStart();