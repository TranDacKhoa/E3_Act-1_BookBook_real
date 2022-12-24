import { showModal } from "../profile/modal.js"; // modal show image
import { data_images, data_user } from "../data.js"; // data fake

const username = document.getElementById("user").innerText;
const uViewed_username = document.getElementById("userViewed").innerText;

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

// *************************************************************
// edit profile

const form_edit = document.querySelector("#form-edit");
const fullname_regex =
  /^[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*(?: [A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*$/;

const avatar = document.getElementById("edit-avatar");
const fullname = document.getElementById("exampleInputFullName");
const about = document.getElementById("exampleInputAbout");
const gender = document.querySelector('input[name="gender"]:checked');
const dob = document.getElementById("exampleInputDayOfBirth");
const location = document.getElementById("exampleInputuserCity");

let avatar_cur_src = avatar.src;
let fullname_cur_value = fullname.value;
let about_cur_value = about.value;
let gender_cur_value = gender.value;
let dob_cur_value = dob.value;
let location_cur_value = location.value;

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
  //const avatar_wrap = document.querySelector(".avatar-wrap");
  file_avatar = e.target.files[0];
  if (file_avatar) {
    file_avatar.preview = URL.createObjectURL(file_avatar);
    avatar.src = `${file_avatar?.preview}`;
    //avatar_wrap.innerHTML = `<img src="${file_avatar?.preview}" alt="" />`;
  } else {
    avatar.src = avatar_cur_src;
    //avatar_wrap.innerHTML = `<img src="${avatar_cur_src}" alt="" />`;
  }
});

fullname.addEventListener("input", () => {
  if (fullname_regex.test(fullname.value)) {
    fullname.setCustomValidity("");
  } else {
    fullname.setCustomValidity("Invalid");
  }
});

document.getElementById("submit-btn").addEventListener("click", () => {
  if (form_edit.checkValidity()) {
    $("#modalEditProfile").modal("hide");
  }
  form_edit.classList.add("was-validated");
});

document.getElementById("close-btn").addEventListener("click", () => {
  form_edit.classList.remove("was-validated");

  avatar.src = avatar_cur_src;
  fullname.value = fullname_cur_value;
  about.value = about_cur_value;
  gender.value = gender_cur_value;
  dob.value = dob_cur_value;
  location.value = location_cur_value;
});

// event submit form
form_edit.addEventListener("submit", (e) => {
  e.preventDefault();
  const edit_data = new FormData(form_edit);
  console.log(edit_data);
  form_edit.submit();

  avatar_cur_src = avatar.value;
  fullname_cur_value = fullname.value;
  about_cur_value = about.value;
  gender_cur_value = gender.value;
  dob_cur_value = dob.value;
  location_cur_value = location.value;
});

// *************************************************************
// follow/unfollow
const htmlSmallFollowing = `<button type="button" class="btn btn-success btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                              Following <i class="fa fa-check"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end dropdown-sm">
                              <li>
                                  <button type="button" class="btn dropdown-item" name="unfollow">
                                    Unfollow
                                  </button>
                              </li>
                            </ul>`
const htmlSmallNotFollow = `<button type="button" class="btn btn-outline-success" name="follow">Follow</button>`

const htmlFollowing = `<button type="button" class="btn btn-info w-100" data-bs-toggle="dropdown" aria-expanded="false" id="following-btn">
                        Following <i class="fa fa-check"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                          <button type="button" class="dropdown-item" name="unfollow" id="unflw-viewedUser-btn">
                              Unfollow
                          </button>
                        </li>
                      </ul>`

const htmlNotFollowing = `<button type="button" class="btn btn-outline-info w-100" name="follow" id="flw-viewedUser-btn">
                            Follow
                          </button>`

async function handleFollowViewedUser(event) {
  let result = await follow(uViewed_username)
  if (!result) {
    alert(`Error occurs when following ${uViewed_username}`)
  }
  else {
    // replace button
    let parent = this.parentElement
    this.outerHTML = htmlFollowing

    // set event listener for unfollow button
    let newBtn = parent.children[1].children[0].children[0]
    newBtn.addEventListener('click', handleUnfollowViewedUser)
  }
}

async function handleUnfollowViewedUser(event) {
  let result = await unfollow(uViewed_username)
  if (!result) {
    alert(`Error occurs when unfollowing ${uViewed_username}`)
  }
  else {
    // replace button
    let ul = this.parentElement.parentElement
    let divParent = ul.parentElement
    let following_btn = ul.previousElementSibling
    ul.outerHTML = ''
    following_btn.outerHTML = htmlNotFollowing

    // set event listener for follow button
    let newBtn = divParent.children[0]
    newBtn.addEventListener('click', handleFollowViewedUser)
  }
}

async function handleFollow(event) {
  let user_to_follow = event.currentTarget.user_to_follow
  let result = await follow(user_to_follow)
  if (!result) {
    alert(`Error occurs when following ${user_to_follow}`)
  }
  else {
    // replace button
    let parent = this.parentElement
    parent.innerHTML = htmlSmallFollowing

    // set event listener for unfollow button
    let newBtn = parent.children[1].children[0].children[0]
    newBtn.addEventListener('click', handleUnfollow)
    newBtn.user_to_unfollow = user_to_follow
  }
}

async function handleUnfollow(event) {
  let user_to_unfollow = event.currentTarget.user_to_unfollow
  let result = await unfollow(user_to_unfollow)
  if (!result) {
    alert(`Error occurs when unfollowing ${user_to_unfollow}`)
  }
  else {
    // replace button
    let divParent = this.parentElement.parentElement.parentElement
    divParent.innerHTML = htmlSmallNotFollow

    // set event listener for follow button
    let newBtn = divParent.children[0]
    newBtn.addEventListener('click', handleFollow)
    newBtn.user_to_follow = user_to_unfollow
  }
}

let follow_btns = document.getElementsByName("follow")
let unfollow_btns = document.getElementsByName("unfollow")

for (let i = 0; i < follow_btns.length; i++) {

  if (follow_btns[i].id == "flw-viewedUser-btn") {
    follow_btns[i].addEventListener('click', handleFollowViewedUser)
  }
  else {
    follow_btns[i].addEventListener('click', handleFollow)
    let username_span = follow_btns[i].parentElement.previousElementSibling.lastElementChild
    follow_btns[i].user_to_follow = username_span.innerText.substring(1)
    //console.log(follow_btns[i].user_to_follow)
  }
}

for (let i = 0; i < unfollow_btns.length; i++) {
  if (unfollow_btns[i].id == "unflw-viewedUser-btn") {
    unfollow_btns[i].addEventListener('click', handleUnfollowViewedUser)
  }
  else {
    unfollow_btns[i].addEventListener('click', handleUnfollow)
    let username_span = unfollow_btns[i].parentElement.parentElement.parentElement.previousElementSibling.lastElementChild
    unfollow_btns[i].user_to_unfollow = username_span.innerText.substring(1)
    //console.log(unfollow_btns[i].user_to_unfollow)
  }
}

async function follow(user_to_follow) {
  return await fetch("/profile/follow", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ user_to_follow: user_to_follow })
  })
  .then(res => res.json())
  .then(data_received => {
    if (data_received.result == 1) {
      console.log(`start following ${user_to_follow}`)
      return true
    }
    else {
      console.log(`error occurs when try to follow ${user_to_follow}`)
      return false
    }
  })
    .then((res) => res.json())
    .then((data_received) => {
      if (data_received.result == 1) {
        console.log(`start following ${user_to_follow}`);
      } else {
        console.log(`error occurs when try to follow ${user_to_follow}`);
      }
    });
}

async function unfollow(user_to_unfollow) {
  return await fetch("/profile/unfollow", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ user_to_unfollow: user_to_unfollow })
  })
  .then(res => res.json())
  .then(data_received => {
    if (data_received.result == 1) {
      console.log(`unfollow ${user_to_unfollow}`)
      return true
    }
    else {
      console.log(`error occurs when try to unfollow ${user_to_unfollow}`)
      return false
    }
  })
    .then((res) => res.json())
    .then((data_received) => {
      if (data_received.result == 1) {
        console.log(`unfollow ${user_to_unfollow}`);
      } else {
        console.log(`error occurs when try to unfollow ${user_to_unfollow}`);
      }
    });
}

// prevent go to other profile when clicking on follow box
let follow_boxes = document.querySelectorAll(".box-follow")
follow_boxes.forEach((box) => {
  box.addEventListener('click', (e) => {
    e.stopPropagation()
  })
})

// prevent go to other profile when clicking on following button in user box
let following_btns = document.getElementsByName("following")
for (let i = 0; i < following_btns.length; i++) {
  following_btns[i].addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// go to other profile when click on user box
let user_boxs = document.querySelectorAll(".user-box");
user_boxs.forEach((user_box) => {
  user_box.addEventListener('click', async () => {
    let other_username = user_box.children[1].children[1].innerText
    other_username = other_username.substring(1)        // remove '@'
    window.location.href = `/profile/?username=${other_username}`
  })
})

// *************************************************************
// main
const main = async () => {
  // render_followers();
  //render_following();
  render_images();
  //load_modal_edit();
  event_click_image();
};
main();
