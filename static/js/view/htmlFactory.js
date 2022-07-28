export const htmlTemplates = {
    board: 1,
    card: 2,
    modal: 0
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.modal]: modalBuilder
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
                <section class="board" data-board-id="${board.id}">
                    <div class="board-header"><span class="board-title">${board.title}</span>
                            <button class="toggle-board-button" data-board-id="${board.id}">^^^</button>
                    <div class="board-columns" data-board-id="${board.id}">
                        <div class="board-column">
                            <div class="board-column-title">New<button class="board-add">+</button></div>
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

function modalBuilder(modal) {
    return `
      <div class="modal" id="test-modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p> Test </p>
        </div>
      </div  
    `
}


// function modalBuilder(modal) {
//     return `<div class="modal fade" id="modalContactForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
//   aria-hidden="true">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header text-center">
//         <h4 class="modal-title w-100 font-weight-bold">Write to us</h4>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body mx-3">
//         <div class="md-form mb-5">
//           <i class="fas fa-user prefix grey-text"></i>
//           <input type="text" id="form34" class="form-control validate">
//           <label data-error="wrong" data-success="right" for="form34">Your name</label>
//         </div>
//
//         <div class="md-form mb-5">
//           <i class="fas fa-envelope prefix grey-text"></i>
//           <input type="email" id="form29" class="form-control validate">
//           <label data-error="wrong" data-success="right" for="form29">Your email</label>
//         </div>
//
//         <div class="md-form mb-5">
//           <i class="fas fa-tag prefix grey-text"></i>
//           <input type="text" id="form32" class="form-control validate">
//           <label data-error="wrong" data-success="right" for="form32">Subject</label>
//         </div>
//
//         <div class="md-form">
//           <i class="fas fa-pencil prefix grey-text"></i>
//           <textarea type="text" id="form8" class="md-textarea form-control" rows="4"></textarea>
//           <label data-error="wrong" data-success="right" for="form8">Your message</label>
//         </div>
//
//       </div>
//       <div class="modal-footer d-flex justify-content-center">
//         <button class="btn btn-unique">Send <i class="fas fa-paper-plane-o ml-1"></i></button>
//       </div>
//     </div>
//   </div>
// </div>
//
// <div class="text-center">
//   <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalContactForm">Launch
//     Modal Contact Form</a>
// </div>`;
// }


