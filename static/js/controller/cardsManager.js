import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";


export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-content[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
};


function deleteButtonHandler(clickEvent) {
    let cardId = clickEvent.target.dataset.cardId;
    let toDelete = document.querySelectorAll(`.card[data-card-id="${cardId}"]`);
    toDelete[0].outerHTML = " ";
}
