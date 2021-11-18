function init() {
    let info = localStorage.getItem("restraunt_info");
    info = JSON.parse(info);
    let place_name = info.place_name;
    let table_info = localStorage.getItem("table_info");
    let name = document.getElementById("place_name");
    name.innerHTML = place_name;
    let table_num = document.getElementById("table_info");
    table_num.innerHTML = table_info;
}
init();
let cancel = document.getElementById("cancel");
let next = document.getElementById("next");

function click_cancel() {
    //취소버튼을 눌렀을 떄, 현재 화면이 닫힌다.
    if (confirm("입력한 정보가 모두 사라집니다. 취소하시겠습니까?") == true) {
        // alert("");
    } else {
        return;
    }
    open("./table.html");
    close();
}
function click_next() {
    open("./pay.html");
    close();
}
cancel.addEventListener("click", click_cancel);
next.addEventListener("click", click_next);
