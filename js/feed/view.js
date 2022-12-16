export const post = (data_images) => {
   const feed_posts = document.querySelector('.feed-posts');
   const html = data_images.map((item) => {
      return `
        <div class="post bg-light">
            <div class="d-flex flex-column gap-1">
            <div
                class="post-header d-flex justify-content-between gap-2 px-3 pt-3 pb-2">
                <div class="post-avatar img-user">
                    <img src="${item.avatar}" alt="" />
                </div>
                <div class="post-name d-flex flex-column">
                    <span><b>${item.user}</b></span>
                    <span class="fw-lighter" style="font-size: 13px"
                        >21 hours ago</span
                    >
                </div>
                <div
                    class="post-options hover-icon d-flex align-items-center px-3"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                        <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#"
                        >Something else here</a
                        >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                        <a class="dropdown-item" href="#">Separated link</a>
                    </li>
                </ul>
            </div>
            <div class="post-body mb-3">
                <img
                    class="img-fill"
                    src="${item.image}"
                    alt="" />
            </div>
            <div class="post-footer">
                <div class="contents-footer px-4 mb-2">
                    <div class="py-1 d-flex justify-content-around gap-3">
                        <div
                        class="d-flex justify-content-center align-items-center gap-3 pt-2 pb-2 px-3 hover-icon w-50 btn-like">
                        <i class="fa-regular fa-thumbs-up"></i>
                        <span>Like</span>
                        </div>
                        <div
                        class="d-flex justify-content-center align-items-center gap-3 pt-2 pb-2 px-3 hover-icon w-50 btn-show-comments">
                        <i class="fa-regular fa-message"></i>
                        <span>Comments</span>
                        </div>
                    </div>
                </div>
                <div class="post-content px-3">
                    <p>${item.contents}</p>
                </div>
                <div class="post-comments" style="display: none">
                    <div class="input-wrap px-3 mb-3">
                        <div class="d-flex gap-2">
                        <div class="img-user">
                            <img src="${item.avatar}" alt="" />
                        </div>
                        <input
                            type="email"
                            class="form-control shadow-none input-comments"
                            placeholder="Your comment..." />
                        <button
                            type="button"
                            class="btn btn-primary px-3 btn-comment">
                            <i class="fa-regular fa-comment-dots"></i>
                        </button>
                        </div>
                    </div>
                    <div class="comments-wrap px-3 d-flex flex-column gap-3 mb-2">
                    ${item.data
                       .map((comment) => {
                          return `
                        <div class="comment">
                            <div class="user-other d-flex flex-row gap-2">
                                <div class="img-user">
                                    <img
                                        src="${comment.avatar}"
                                        alt="" />
                                </div>
                                <div
                                    class="user-comment d-flex flex-column justify-content-between w-75">
                                    <div class="p-2">
                                        <span><b>${comment.name}</b></span>
                                        <p class="m-0">${comment.comment}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                       })
                       .join('')}
                    </div>
                </div>
            </div>
            </div>
        </div>
        `;
   });
   feed_posts.innerHTML = html.join('');
};
export const comment = (location, data, user) => {
   const html = `
    <div class="comment">
        <div class="user-other d-flex flex-row gap-2">
            <div class="img-user">
                <img src="${user.avatar}" alt="" />
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
   location.insertAdjacentHTML('afterbegin', html);
};
export const suggest_friends = (data) => {
   const friends_wrap = document.querySelector('.friends-wrap');
   const html = data.map((item) => {
      return `
       <div
           class="friend d-flex gap-2 justify-content-center align-items-center">
           <div class="img-user">
               <img src="${item.avatar}" alt="" />
           </div>
           <div
               class="d-flex flex-column justify-content-center user-name" style="flex:1">
               <span><b>${item.name}</b></span>
               <span>${item.about}</span>
           </div>
           <div>
               <button type="button" class="btn btn-info">Add</button>
           </div>
       </div>
       `;
   });
   friends_wrap.innerHTML = html.join('');
};
export const blog = (data) => {
   const blog_wrap = document.querySelector('.blog-wrap');
   const html = data.map((item) => {
      return `
        <div class="d-flex gap-2 align-items-center">
            <div class="blog-img">
                <img src="${item.image}" alt="" />
            </div>
            <div class="d-flex flex-column blog-link px-1">
                <span><b>
                    <a href="${item.url}" class="text-decoration-none">${item.content}</a>
                </b></span>
                <span class="fw-lighter" style="font-size: 15px">
                    <i>${item.date}</i>
                </span>
            </div>
        </div>
        `;
   });
   blog_wrap.innerHTML = html.join('');
};
