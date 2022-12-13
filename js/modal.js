// modal
export const showModal = (params, data_comment) => {
   // image
   const modal_body_img = document.querySelector('.modal-body');
   let html_img = `<img src="${params}" alt="" />`;
   modal_body_img.innerHTML = html_img;

   // user
   const contents_header = document.querySelector('.contents-header');
   let html_header = `                                 
    <div class="header-img">
       <img src="../public/image/nguyen.png" alt="" />
    </div>
    <div class="header-name d-flex flex-column">
       <span>Tuan le</span>
       <span class="fst-italic fw-lighter">@tuanle</span>
    </div>
    <div class="header-setting">
       <i class="fa-solid fa-grip"></i>
    </div>`;
   contents_header.innerHTML = html_header;
   // content
   const contents_body = document.querySelector('.contents-body');
   let html_body = `                                 
    <p>
       jksdfhjskdfhjsdkmncbfx sdljfhlds sdfjsijdlkjf slkdjf sdk
    </p>`;
   contents_body.innerHTML = html_body;
   // comment
   const comments_list = document.querySelector('.comments-list');
   const html_comments = data_comment.map((item) => {
      return `
       <div
          class="user-other d-flex flex-row justify-content-between gap-2 mb-3">
          <div class="img-user">
             <img src="${item.image}" alt="" />
          </div>
          <div
             class="user-comment d-flex flex-column justify-content-between">
             <div class="p-2">
                <span><b>${item.name}</b></span>
                <span><p class="m-0">
                   ${item.comment}
                </p></span>
             </div>
          </div>
       </div>
       `;
   });
   comments_list.innerHTML = html_comments.join('');
};
