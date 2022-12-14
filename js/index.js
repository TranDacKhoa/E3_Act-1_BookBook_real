import { showModal } from './modal.js'; // modal show image
import { data_images } from './data.js'; // data fake

// users-other
const render_users_other = () => {
   const users_other = document.querySelector('.user-box');
   for (let index = 0; index < 5; index++) {
      let html = `
           <div class="user-box d-flex gap-2 pt-2 pb-2 align-items-center">
               <div class="box-image">
               <img src="../public/image/nguyen.png" alt="" />
               </div>
               <div
               class="box-name d-flex flex-column justify-content-center align-items-flex-start">
               <span><b>Nguyen Hoang</b></span>
               <span>@nguyenhoang</span>
               </div>
               <div class="box-follow">
               <button type="button" class="btn btn-warning w-100">Follow</button>
               </div>
           </div>`;
      users_other.insertAdjacentHTML('afterend', html);
   }
};

// render images
const render_images = () => {
   const image_list = document.querySelector('.image-list');
   const htmls = data_images.map((item) => {
      return `
      <div class="images" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="${item.image}" id="${item.id}" alt="" />
      </div>`;
   });
   return (image_list.innerHTML = htmls.join(''));
};

// add event click image
const event_click_image = () => {
   const images = document.querySelectorAll('.images');
   images.forEach((item, index) => {
      item.onclick = () => {
         showModal(data_images[index]);
      };
   });
};

// main
const main = async () => {
   render_users_other();
   render_images();
   event_click_image();
};
main();
