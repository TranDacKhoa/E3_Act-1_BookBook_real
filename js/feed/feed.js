import {
  data_images,
  data_user,
  data_user_other,
  data_sponsor,
} from "../data.js"; // data fake
import { comment, post, suggest_people, sponsor } from "./view.js";

// load view
post(data_images);
suggest_people(data_user_other);
sponsor(data_sponsor);
//nav header
const header_center = document.querySelectorAll(".header-center ul li");
header_center.forEach((item) => {
  item.onclick = () => {
    header_center.forEach((li) => {
      li.classList.remove("active");
    });
    item.classList.add("active");
  };
});

//nav left
const ul_wrap = document.querySelectorAll(".ul-wrap li");
ul_wrap.forEach((item) => {
  item.onclick = () => {
    ul_wrap.forEach((li) => {
      li.classList.remove("active");
    });
    item.classList.add("active");
  };
});

// like post
const btn_like = document.querySelectorAll(".btn-like");
btn_like.forEach((item) => {
  item.onclick = () => {
    item.classList.toggle("active-like");
  };
});
// show comments
const btn_show_comments = document.querySelectorAll(".btn-show-comments");
const post_comments = document.querySelectorAll(".post-comments");
btn_show_comments.forEach((item, index) => {
  item.onclick = () => {
    post_comments[index].setAttribute("style", "display:block;");
  };
});
// comment
const handleComment = (index) => {
  let input_value = input_comments[index].value;
  if (input_value == "") {
    alert("Please, enter your comment!!");
    return;
  }
  const location = post_comments[index].querySelector(".comments-wrap");
  comment(location, input_value, data_user); // (vị trí để show new comment, value, user)
  input_comments[index].value = "";
};

const input_comments = document.querySelectorAll(".input-comments");
const btn_comments = document.querySelectorAll(".btn-comment");
btn_comments.forEach((item, index) => {
  item.onclick = () => {
    handleComment(index);
  };
  input_comments[index].addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      handleComment(index);
    }
  });
});
