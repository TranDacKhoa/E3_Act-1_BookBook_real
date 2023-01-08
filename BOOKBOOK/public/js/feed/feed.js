import {
  data_images,
  data_user,
  data_user_other,
  data_sponsor,
} from "../data.js"; // data fake
// import { comment, post, suggest_people, sponsor } from "./view.js";

// load view
// post(data_images);
// suggest_people(data_user_other);

//nav header
const header_center = document.querySelectorAll(".header-center ul li");
header_center.forEach((item, index) => {
  item.onclick = () => {
    header_center.forEach((li) => {
      li.classList.remove("active");
    });
    if (index != 1) {
      item.classList.add("active");
    }
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

async function sendLikeRequest(url = "/like", id) {
  const data = {
    post: id,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
const btn_like = document.querySelectorAll(".btn-like");
btn_like.forEach((item) => {
  item.onclick = (e) => {
    item.classList.toggle("active-like");
    sendLikeRequest("http://localhost:3000/like", item.getAttribute("id")).then(
      (data) => {}
    );
    e.preventDefault();
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
const comment = (location, data, user) => {
  const html = `
      <div class="comment">
          <div class="user-other d-flex flex-row gap-2">
              <div class="img-user">
                  <img src="avatar/${user.avatar}" alt="" />
              </div>
              <div
              class="user-comment d-flex flex-column justify-content-between w-75">
                  <div class="p-2">
                      <span><b>${user.name}</b></span>
                      <p class="m-0">${data}</p>
                  </div>
              </div>
          </div>
      </div>
      `;
  location.insertAdjacentHTML("afterbegin", html);
};
async function sendCommentRequest(url = "/comment", id, text) {
  const data = {
    post: id,
    content: text,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
const handleComment = (index, id) => {
  let input_value = input_comments[index].value;
  if (input_value == "") {
    return;
  }

  sendCommentRequest("http://localhost:3000/comment", id, input_value).then(
    (data) => {
      console.log(data);
      const location = post_comments[index].querySelector(".comments-wrap");
      comment(location, input_value, data); // (vị trí để show new comment, value, user)
    }
  );

  input_comments[index].value = "";
};

const input_comments = document.querySelectorAll(".input-comments");
const btn_comments = document.querySelectorAll(".btn-comment");
btn_comments.forEach((item, index) => {
  const id = item.getAttribute("name");
  item.onclick = () => {
    handleComment(index, id);
  };
  input_comments[index].addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      handleComment(index, id);
    }
  });
});

// suggested people
async function follow(user_to_follow) {
  return await fetch("/profile/follow", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user_to_follow: user_to_follow }),
  })
    .then((res) => res.json())
    .then((data_received) => {
      if (data_received.result == 1) {
        console.log(`start following ${user_to_follow}`);
        return true;
      } else {
        console.log(`error occurs when try to follow ${user_to_follow}`);
        return false;
      }
    });
}
async function unfollow(user_to_unfollow) {
  return await fetch("/profile/unfollow", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user_to_unfollow: user_to_unfollow }),
  })
    .then((res) => res.json())
    .then((data_received) => {
      if (data_received.result == 1) {
        console.log(`unfollow ${user_to_unfollow}`);
        return true;
      } else {
        console.log(`error occurs when try to unfollow ${user_to_unfollow}`);
        return false;
      }
    });
}

const state_btns = document.querySelectorAll(".state");
state_btns.forEach((item) => {
  const user_following = item.getAttribute("name");
  item.onclick = () => {
    const state = item.getAttribute("state");
    console.log(state);
    if (state == "Follow") {
      follow(user_following).then((data) => {
        console.log(data);
      });
      item.setAttribute("state", "Unfollow");
      item.innerHTML = "Unfollow";
    } else {
      unfollow(user_following).then((data) => {
        console.log(data);
      });
      item.setAttribute("state", "Follow");
      item.innerHTML = "Follow";
    }
  };
});
// const suggest_ = document.querySelectorAll(".suggest-user");
// suggest_.forEach((item, index) => {
//   item.onclick = (e) => {
//     let usr = item.username;
//     console.log(usr);
//     window.location.href = `/user?user=${usr}`;
//   };
// });
