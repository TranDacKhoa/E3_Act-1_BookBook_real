// modal
export const showModal = (data_images) => {
   console.log('data_images', data_images);

   // render image clicked
   const modal_body_img = document.querySelector('.modal-body');
   let html_img = `<img src="${data_images.image}" alt="" />`;
   modal_body_img.innerHTML = html_img;

   //render user
   const contents_header = document.querySelector('.contents-header');
   let html_header = `                                 
    <div class="header-img">
       <img src="${data_images.avatar}" alt="" />
    </div>
    <div class="header-name d-flex flex-column">
       <span>${data_images.user}</span>
       <span class="fst-italic fw-lighter">${data_images.id_user}</span>
    </div>
    <div class="header-setting">
       <i class="fa-solid fa-grip"></i>
    </div>`;
   contents_header.innerHTML = html_header;

   //render content
   const contents_body = document.querySelector('.contents-body');
   let html_body = `<p>${data_images.contents}</p>`;

   contents_body.innerHTML = html_body;

   //render comment
   const comments_list = document.querySelector('.comments-list');
   const html_comments = data_images.data.map((item) => {
      return `
       <div
          class="user-other d-flex flex-row justify-content-between gap-2 mb-3">
          <div class="img-user">
             <img src="${item.avatar}" alt="" />
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
