//thao đổi data của modal sau khi resquest data của item từ server
const changeData = (res) => {
  const item_title = document.querySelector("#item-title");
  const seller_avt = document.querySelector("#seller-avt");
  const seller_name = document.querySelector("#seller-name");
  const time_post_item = document.querySelector("#time-post-item");
  const item_des = document.querySelector("#item-des");
  const item_img = document.querySelector("#item-img");
  const item_price = document.querySelector("#item-price");
  item_title.innerHTML = res.title;
  seller_avt.src = res.seller_avt;
  seller_name.innerHTML = res.post_by;
  time_post_item.innerHTML = res.post_time;
  item_des.src = res.text;
  item_img.innerHTML = res.img;
  item_price.innerHTML = res.price;
};

const event_click_image = () => {
  const items = document.querySelectorAll(".list-item-group");
  items.forEach((item, index) => {
    item.onclick = () => {
      let id = item.querySelector(".post_id");
      id = id.innerHTML;
      //fetch here to take item data
      // const res =???;
      // changeData(res);
    };
  });
};

event_click_image();
