function init() {
    //메뉴페이지 초기상태설정
    let info = localStorage.getItem("restraunt_info");
    info = JSON.parse(info);
    let place_name = info.place_name;
    let table_info = localStorage.getItem("table_info");

    let name = document.getElementById("place_name"); //선택한 가게의 이름을 보여준다.
    name.innerHTML = place_name;
    let table_num = document.getElementById("table_info"); //몇번 좌석인지 알려준다.
    table_num.innerHTML = table_info;
}
init();
let cancel = document.getElementById("cancel");
let next = document.getElementById("next");

function click_cancel() {
    //취소버튼을 눌렀을 떄, 이전 페이지로 돌아간다.
    if (confirm("입력한 정보가 모두 사라집니다. 취소하시겠습니까?") == true) {
        // alert("");
    } else {
        return;
    }
    history.go(-1);
    // close();
}
function click_next() {
    //메뉴들을 선택하고, 결제페이지로 넘어간다.
    open("./pay.html", "_self");
    // close();
}
cancel.addEventListener("click", click_cancel);
next.addEventListener("click", click_next);
