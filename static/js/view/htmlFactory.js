

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


    return `
            <div class="board-container">
                <section class="board" data-board-id="${board.id}">
                    <div class="board-header"><span class="board-title">${board.title}</span>
                            <button class="toggle-board-button" data-board-id="${board.id}">Hide Cards</button>
                            <button class="card-add" id="myBtn${board.id}" data-new-card="${board.id}">+ New Card</button>
                                <div id="myModal" data-new-modal="${board.id}" class="modal">

                                      <!-- Modal content 
                                      input req: board_id, status, title, text, card_order-->
                                      <div class="modal-content">
                                        <span class="close" data-card-close="${board.id}">&times;</span>
                                        <p>Some text in the Modal of board_id: ${board.id}</p>
                                        <form id="addCard${board.id}" action="/api/boards/${board.id}/cards/"  method="POST">
                                        <input type="hidden" id="board_id" name="board_id" value="${board.id}"><br>

                                                <input type="radio" id=new" name="card_status" value="New" required="">
                                                <label for="new">New</label><br>

                                                 <input type="radio" id="in_progress" name="card_status" value="In Progress" required="">
                                                 <label for="in_progress">In Progress</label><br>
                                                 
                                                 <input type="radio" id="testing" name="card_status" value="Testing" required="">
                                                 <label for="testing">Testing</label><br>
                                                 
                                                 <input type="radio" id="done" name="card_status" value="Done" required="">
                                                 <label for="done">Done</label><br>
              
                                        <label for="title${board.id}">Title</label>
                                        <input type="text" id="title${board.id}" name="title" required=""><br>
                                        <label for="text">Text</label>
                                        <input type="text" id="text" name="text" required=""><br>
                                        <input type="hidden" id="card_oder" name="card_order" value="1"><br>
                                        <button type="submit" class="submitBtn${board.id}">Submit</button>
                                        </form>
</form>
                                      </div>
                                    
                                    </div>
                                                                        
                                    
                    <div class="board-columns" data-board-id="${board.id}">
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
                        </div>    
                        
                        <div class="board-column">
                            <div class="board-column-title">Done</div>
                                <div class="board-column-content" data-card-title="4">
                                    
                                </div>
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
                <div class="card-text">${card.text}</div>
            </div>`;
}

function buttonBuilder(button) {

}


