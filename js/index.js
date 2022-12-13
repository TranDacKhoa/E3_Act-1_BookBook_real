import { showModal } from './modal.js';

const users_other = document.querySelector('.user-box');
// users-other
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
// image
const data_images = [
   {
      url: '../public/image/nguyen.png',
      id: 1,
   },
   {
      url: '../public/image/new.jpg',
      id: 2,
   },
   {
      url: '../public/image/nguyen.png',
      id: 3,
   },
   {
      url: '../public/image/new.jpg',
      id: 4,
   },
   {
      url: '../public/image/nguyen.png',
      id: 5,
   },
   {
      url: '../public/image/new.jpg',
      id: 6,
   },
   {
      url: '../public/image/nguyen.png',
      id: 7,
   },
   {
      url: '../public/image/new.jpg',
      id: 8,
   },
   {
      url: '../public/image/nguyen.png',
      id: 9,
   },
];
const image_list = document.querySelector('.image-list');
const render_images = () => {
   const htmls = data_images.map((item) => {
      return `
      <div class="images" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="${item.url}" id="${item.id}" alt="" />
      </div>`;
   });
   return (image_list.innerHTML = htmls.join(''));
};
render_images();

//
const data_comment = [
   {
      name: 'Tuan Le',
      image: '../public/image/nguyen.png',
      comment: 'Các bạn thông cảm, anh qua Qatar coi đá banh dới mét si dới rô nán đồ gòi',
   },
   {
      name: 'Nguyen Hoang',
      image: '../public/image/new.jpg',
      comment: 'Aisshh chít tịt sao Rosé (BlackPink) lại xinh như vậy chứ 🥹',
   },
   {
      name: 'Huy Huynh',
      image: '../public/image/logo1.png',
      comment: 'Hình ảnh cảm lạnh cùng những tiếng gào thét bất lực khi dạy bài cho em 🥹',
   },
   {
      name: 'Huy Huynh',
      image: '../public/image/logo1.png',
      comment: 'Hình ảnh cảm lạnh cùng những tiếng gào thét bất lực khi dạy bài cho em 🥹',
   },
   {
      name: 'Huy Huynh',
      image: '../public/image/logo1.png',
      comment: 'Hình ảnh cảm lạnh cùng những tiếng gào thét bất lực khi dạy bài cho em 🥹',
   },
   {
      name: 'Huy Huynh',
      image: '../public/image/logo1.png',
      comment: 'Hình ảnh cảm lạnh cùng những tiếng gào thét bất lực khi dạy bài cho em 🥹',
   },
];

const images = document.querySelectorAll('.images');

images.forEach((item) => {
   item.onclick = () => {
      const child = item.childNodes[1].attributes[0].value;
      showModal(child, data_comment); // url image , data comments
   };
});
