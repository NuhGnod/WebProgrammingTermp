// console.log(opener.document.referrer);
let cancel = document.getElementById("cancel");
let next = document.getElementById("next");

function click_item() {
    //각 좌석들은 선택했을 때의 함수
    if (this.className != "item green") {
        //녹색 좌석만 선택가능.
        alert(`녹색 좌석만 선택가능합니다.`);
        return;
    }
    let table_info = document.getElementById("table_info"); //선택된 좌석의 번호를 화면에 보여준다.
    table_info.innerHTML = this.innerHTML;
    // console.log(`item`);
    alert(table_info.innerHTML + "이 선택되었습니다.");
}
function init() {
    //화면 초기상태

    let info = localStorage.getItem("restraunt_info"); //선택된 가게의 이름을 메인로고 아래에 보여준다.
    info = JSON.parse(info);
    let place_name = info.place_name;
    document.getElementById("place_name").innerHTML = place_name;
    let items = document.getElementsByClassName("item");
    if (localStorage.getItem("table_info") != null) {
        let table_info = document.getElementById("table_info"); //선택된 좌석의 번호를 화면에 보여준다.
        table_info.innerHTML = localStorage.getItem("table_info");
    }
    //각 좌석에 click_item 함수를 달아준다.
    for (let i = 0; i < items.length; i++)
        items[i].addEventListener("click", click_item);
}
function click_cancel() {
    //취소버튼을 눌렀을 떄, 이전페이지로 돌아간다.
    if (confirm("입력한 정보가 모두 사라집니다. 취소하시겠습니까?") == true) {
        //취소하면, 메인화면으로 이동해야하고, 모든 localStorage 를 삭제한다.
        console.log("ASD");
        history.go(-1);

        localStorage.removeItem("table_info");
        localStorage.removeItem("restraunt_info");
        // alert("");
    } else {
        console.log("###");
    }
    console.log("########");
}
function click_next() {
    //좌석 선택후, 메뉴페이지로 이동한다.
    let table_info = document.getElementById("table_info").innerHTML;
    localStorage.setItem("table_info", table_info);
    open("./menu.html", "_self");
}
init();
next.addEventListener("click", click_next);
cancel.addEventListener("click", click_cancel);
