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
const images = document.querySelector('.images');
for (let index = 0; index < 50; index++) {
   let html = `<div class="images">
        <img src="../public/image/nguyen.png" alt="" />
    </div>`;
   images.insertAdjacentHTML('afterend', html);
}
