export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {


    return `<div class="board-container">
                <section class="board" data-board-id=${board.id}>
                    <div class="board-header"><span class="board-title">${board.title}</span>
                            <button class="board-add">Add Card</button>
                            <button class="toggle-board-button" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i> Show Cards</button>
                    </div>
                    <div class="board-columns">
                        <div class="board-column">
                            <div class="board-column-title">New</div>
                                <div class="board-column-content" data-card-title="1">
                                    
                                </div>
                        </div>  
                          
                        <div class="board-column">
                            <div class="board-column-title">In Progress</div>
                                <div class="board-column-content" data-card-title="2">
                                    
                                </div>
                        </div>
                        
                        
                        <div class="board-column">
                            <div class="board-column-title">Testing</div>
                                <div class="board-column-content" data-card-title="3">
                                   
                        </div>    
                        
                        <div class="board-column">
                            <div class="board-column-title">Done</div>
                                <div class="board-column-content" data-card-title="4">
                                    
                                </div>
                        </div>
                    
                        
                    </div>       
                </section>    
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" draggable="true">
                <button class="card-remove" data-card-id="${card.id}"><i class="fas fa-trash-alt"></i>Remove</button>
                <div class="card-title">${card.title}</div>
            </div>`;
}

function buttonBuilder(button) {

}

