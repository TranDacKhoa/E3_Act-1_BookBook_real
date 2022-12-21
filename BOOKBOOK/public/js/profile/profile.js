import { showModal } from "../profile/modal.js"; // modal show image
import { data_images, data_user } from "../data.js"; // data fake
// users-other
const render_followers = () => {
  const followers_list = document.querySelector("#followers-list");
  for (let index = 0; index < 2; index++) {
    let html = `
           <div class="user-box d-flex gap-2 pt-2 pb-2 align-items-center">
               <div class="box-image">
               <img src="./images/nguyen.png" alt="" />
               </div>
               <div
               class="box-name d-flex flex-column justify-content-center align-items-flex-start">
               <span><b>Nguyen Hoang</b></span>
               <span>@nguyenhoang</span>
               </div>
               <div class="box-follow">
               <button type="button" class="btn btn-success w-100">Follow</button>
               </div>
           </div>`;
    followers_list.insertAdjacentHTML("afterend", html);
  }
};
const render_following = () => {
  const following_list = document.querySelector("#following-list");
  for (let index = 0; index < 2; index++) {
    let html = `
           <div class="user-box d-flex gap-2 pt-2 pb-2 align-items-center">
               <div class="box-image">
               <img src="./images/nguyen.png" alt="" />
               </div>
               <div
               class="box-name d-flex flex-column justify-content-center align-items-flex-start">
               <span><b>Nguyen Hoang</b></span>
               <span>@nguyenhoang</span>
               </div>
               <div class="box-follow">
               <button type="button" class="btn btn-info w-100">Follow</button>
               </div>
           </div>`;
    following_list.insertAdjacentHTML("afterend", html);
  }
};
// render images
const render_images = () => {
  const image_list = document.querySelector(".image-list");
  const htmls = data_images.map((item) => {
    return `
      <div class="images" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="${item.image}" id="${item.id}" alt="" />
      </div>`;
  });
  return (image_list.innerHTML = htmls.join(""));
};

// add event click image
const event_click_image = () => {
  const images = document.querySelectorAll(".images");
  images.forEach((item, index) => {
    item.onclick = () => {
      showModal(data_images[index]); // data, nơi đặt modal
    };
  });
};
const event_report_user = () => {
  const images = document.querySelectorAll(".big-avt");
  images.forEach((item, index) => {
    item.onclick = () => {
      showModal(data_images[index]); // data, nơi đặt modal
    };
  });
};
// handle modal new post
const input_wrap = document.querySelector(".input-wrap");
const input_file = document.querySelector(".input-file");
input_wrap.addEventListener("click", () => {
  input_file.click();
});
// preview file image
let file_image;
input_file.addEventListener("change", (e) => {
  file_image && URL.revokeObjectURL(file_image.preview);
  const imgPreview = input_wrap.querySelector("div");
  file_image = e.target.files[0];
  if (file_image) {
    file_image.preview = URL.createObjectURL(file_image);
    imgPreview.innerHTML = `<img src="${file_image?.preview}" alt="" />`;
  } else {
    imgPreview.innerHTML = `<span class="m-0">Select file image...</span>`;
  }
});
// event click change avatar
const label_change = document.querySelector(".label-change ");
const input_file_avatar = document.querySelector(".input-file-avatar");
label_change.addEventListener("click", () => {
  input_file_avatar.click();
});
// change avatar
let file_avatar;
input_file_avatar.addEventListener("change", (e) => {
  file_avatar && URL.revokeObjectURL(file_avatar.preview);
  const avatar_wrap = document.querySelector(".avatar-wrap");
  file_avatar = e.target.files[0];
  if (file_avatar) {
    file_avatar.preview = URL.createObjectURL(file_avatar);
    avatar_wrap.innerHTML = `<img src="${file_avatar?.preview}" alt="" />`;
  } else {
    avatar_wrap.innerHTML = `<img src="./images/new.jpg" alt="" />`;
  }
});

// /// load user data modal
// const load_modal_edit = () => {
//   const id_user = document.querySelector(".id-user i");
//   const fullName = document.querySelector("#exampleInputFullName");
//   const about = document.querySelector("#exampleInputAbout");
//   const dayOfBirth = document.querySelector("#exampleInputDayOfBirth");
//   const male = document.querySelector("#male");
//   const female = document.querySelector("#female");
//   const location = document.querySelector("#exampleInputuserCity");

//   id_user.textContent = data_user.id;
//   fullName.value = data_user.name;
//   about.value = data_user.about;
//   dayOfBirth.value = data_user.dayOfBirth;
//   data_user.gender === "male"
//     ? male.setAttribute("checked", true) &&
//       female.setAttribute("checked", false)
//     : female.setAttribute("checked", true) &&
//       male.setAttribute("checked", false);
//   location.value = data_user.location;
// };
const form_edit = document.querySelector("#form-edit");
// event submit form
form_edit.addEventListener("submit", (e) => {
  e.preventDefault();
  const edit_data = new FormData(form_edit);
  console.log(edit_data);
  form_edit.submit();
});

// main
const main = async () => {
  render_followers();
  render_following();
  render_images();
  //load_modal_edit();
  event_click_image();
};
main();
