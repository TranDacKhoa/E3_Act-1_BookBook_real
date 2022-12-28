const left_search = document.querySelector("#left-form");
const btn_submit = document.querySelector("#left-submit");

left_search.addEventListener("submit", (e) => {
  e.preventDefault();
  left_search.submit();
});
