let next = document.getElementById("next");
let cancel = document.getElementById("cancel");
function init() {
    //초기 상태 페이지
    let register_name = sessionStorage.getItem("register_name");
    let name = document.getElementById("place_name");
    name.innerHTML = register_name;
}
init();
function click_next() {
    //다음 버튼 클릭시, 메뉴 등록 페이지로 이동
    open("./register_menu.html", "_self");
}
function click_cancel() {
    //취소 버튼 클릭시 이전 페이지로 이동
    history.go(-1);
}
next.addEventListener("click", click_next);
cancel.addEventListener("click", click_cancel);
