import { showModal } from "../report/modalrp.js"; // modal show image
import { data_images } from "../data.js"; // data fake
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
const main = async () => {
  event_click_image();
};
main();
