// handle view button
let view_user = document.getElementsByName("view-user")
for (let i = 0; i < view_user.length; i++) {
    view_user[i].addEventListener('click', function() {
        let username = view_user[i].parentElement.parentElement.children[1].innerText
        window.location.href = `/profile/?username=${username}`
    })
}
let view_post = document.getElementsByName("view-post")
for (let i = 0; i < view_post.length; i++) {
    view_post[i].addEventListener('click', async function() {
        let post_id = view_post[i].parentElement.parentElement.children[1].innerText
        await fetch(`/admin/post/view?post_id=${post_id}`)
        .then(res => res.json())
        .then(data => {
            const profile = data.author_username_user_profile
            const html_avatar = `<img src="avatar/${profile.avatar}" alt="" />`
            const html_image = `<img src="post/${data.img}" alt="" />`;
            const html_contents = `<p>${data.text}</p>`;
            const html_header_name = `<span><strong>${profile.fullname}</strong></span>
                                        <span
                                        class="fst-italic fw-lighter"
                                        >@${data.author_username}</span>`

            document.querySelector("#post-image").innerHTML = html_image;
            document.querySelector(".contents-body").innerHTML = html_contents;
            document.querySelector(".header-img").innerHTML = html_avatar;
            document.querySelector(".header-name").innerHTML = html_header_name;
            $("#exampleModal").modal('show')
        })
    })
}

// handle skip button
let confirm = document.getElementById("confirm-skip")

function confirmSkip(skip_btn) {
    $("#skipModal").modal('show')
    confirm.addEventListener('click', skip, false)
    confirm.skip_btn = skip_btn
}

function skip(event) {
    let row_index = event.currentTarget.skip_btn.parentElement.parentElement.rowIndex
    document.getElementById("rp-table").deleteRow(row_index)
    $("#skipModal").modal('hide')
    confirm.removeEventListener('click', skip, false)
}

document.querySelector('.header-setting').disabled = true
document.getElementById("inputComment").disabled = true