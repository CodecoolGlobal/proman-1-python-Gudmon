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

                                      <!-- Modal content -->
                                      <div class="modal-content">
                                        <span class="close">&times;</span>
                                        <p>Some text in the Modal of board_id: ${board.id}</p>
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
            </div>`;
}

function buttonBuilder(button) {

}


function addCard () {

    let feedBack = document.getElementById("#modal_feedback");
    console.log(feedBack)

    feedBack.addEventListener("submit", function(e) {
      let form = this;
      if(form.name.value == "") {
        alert("Please enter your Name");
        form.name.focus();
        e.preventDefault();
      } else if(form.email.value == "") {
        alert("Please enter a valid Email address");
        form.email.focus();
        e.preventDefault();
      } else if(form.message.value == "") {
        alert("Please enter your comment or question in the Message box");
        form.message.focus();
        e.preventDefault();
      }
    }, false);

    document.addEventListener("DOMContentLoaded", function() {
      let modalWrapper = document.getElementById("#modal_wrapper");
      let modalWindow  = document.getElementById("#modal_window");

      let openModal = function(e)
      {
        modalWrapper.className = "overlay";
        modalWindow.style.marginTop = (-modalWindow.offsetHeight)/2 + "px";
        modalWindow.style.marginLeft = (-modalWindow.offsetWidth)/2 + "px";
        e.preventDefault();
      };

      let closeModal = function(e)
      {
        modalWrapper.className = "";
        e.preventDefault();
      };

      let clickHandler = function(e) {
        if(e.target.tagName == "DIV") {
          if(e.target.id != "modal_window") closeModal(e);
        }
      };

      let keyHandler = function(e) {
        if(e.keyCode == 27) closeModal(e);
      };

      document.getElementById("#modal_open").addEventListener("click", openModal, false);
      document.getElementById("#modal_close").addEventListener("click", closeModal, false);
      document.addEventListener("click", clickHandler, false);
      document.addEventListener("keydown", keyHandler, false);
    }, false);
    }
    // Original JavaScript code by Chirp Internet: chirpinternet.eu
    // Please acknowledge use of this code by including this header.

