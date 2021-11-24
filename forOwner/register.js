let h2 = document.getElementById("h2"); //등록할 가게 이름을 보여줄 h2태그
let register = document.getElementById("register"); //등록하기 버튼
let cancel = document.getElementById("cancel"); //취소 버튼
function init() {
    //페이지 초기 상태함수
    h2.innerHTML = sessionStorage.getItem("register_name");
}
init();
function click_register() {
    //등록하기 버튼 클릭시 firestore에 입력값들이 저장되고,
    //가게의 내부 모습 등록 페이지로 넘어간다.
    alert(`정보가 등록되었습니다. 내부 모습 등록 페이지로 이동합니다.`);
    open("./register_table.html", "_self");
}
function click_cancel() {
    //취소 버튼 클릭시 이전페이지로 돌아간다.
    history.go(-1);
}
register.addEventListener("click", click_register);
cancel.addEventListener("click", click_cancel);
