function init() {
    //페이지 초기상태
    let name = localStorage.getItem("register_name");
    let place_name = document.getElementById("place_name");
    place_name.innerHTML = name;
}
init();

let register_done = document.getElementById("register_done"); //등록완료 버튼
let cancel = document.getElementById("cancel"); //취소버튼
function click_register_done() {
    //등록완료 버튼시 모든 정보입력을 끝냈으므로, 메인페이지로 이동
    open("./index.html", "_self");
}
function click_cancel() {
    //이전페이지로 이동
    history.go(-1);
}
cancel.addEventListener("click", click_cancel);
register_done.addEventListener("click", click_register_done);
