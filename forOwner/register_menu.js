function init() {
    //페이지 초기상태
    let name = sessionStorage.getItem("register_name");
    let place_name = document.getElementById("place_name");
    place_name.innerHTML = "가게 이름 : " + name;
}
init();
let register = document.getElementById("register"); //등록하기 버튼
let register_done = document.getElementById("register_done"); //등록완료 버튼
let cancel = document.getElementById("cancel"); //취소버튼
let menu = document.getElementById("menu"); //메뉴 입력 창
let price = document.getElementById("price"); //가격  입력 창
let menus = []; //메뉴 배열
let prices = []; //가격 배열
function checkNum(str) {
    if (str.length == 0) {
        //내가 구현
        //입력되지 않음.//내가 구현
        return false; //내가 구현
    } //내가 구현
    //코드라인 -9
    const regExp = /[0-9]/g;
    if (regExp.test(str)) {
        return true;
    } else {
        return false;
    }
}
function checkText(str) {
    if (str.length == 0) {
        //내가 구현
        //입력되지 않음.//내가 구현
        return false; //내가 구현
    } //내가 구현
    //코드라인 -9
    const regExp = /[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g;
    if (regExp.test(str)) {
        return true;
    } else {
        return false;
    }
}

function click_register() {
    //메뉴와 가격 입력후 등록 기능.
    let _menu = menu.value.trim();
    let _price = price.value.trim();
    if (checkText(_menu) && checkNum(_price)) {
        //메뉴는 영어 한글 숫자, 가격은 숫자만 에 대해 유효성 검사
        let tr = $(`<tr></tr>`); //tr
        let td1 = $(`<td>${_menu}</td>`); //메뉴 이름 td
        let td2 = $(`<td>${_price}</td>`); //가격 td
        tr.append(td1);
        tr.append(td2);
        $("tbody").append(tr);
        menus.push(_menu);
        prices.push(_price);
    }
}
function click_register_done() {
    let id = sessionStorage.getItem("login_id");
    let timestamp = sessionStorage.getItem("timestamp");
    let infoSet = {};
    infoSet._infoMenu = menus;
    infoSet._infoPrice = prices;
    if (menus.length == 0) {
        //저장된 정보가 없음.
        alert(`입력된 정보가 없습니다. 입력해주세요.`);
        return;
    }
    //등록완료 버튼시 모든 정보입력을 끝냈으므로, 메인페이지로 이동
    db.collection("Users")
        .doc(id)
        .collection("restaurants")
        .doc(timestamp)
        .collection("menu_info")
        .doc("menu_info")
        .set(infoSet)
        .then(() => {
            db.collection("Table_infos")
                .doc(timestamp)
                .collection("Menu_infos")
                .doc(timestamp)
                .set(infoSet)
                .then(() => {
                    alert(`저장이 완료되었습니다.`);
                    //db에 저장후 메인화면으로 돌아간다.
                    open("./index.html", "_self");
                });
        });
}
function click_cancel() {
    //이전페이지로 이동
    history.go(-1);
}
register.addEventListener("click", click_register);
cancel.addEventListener("click", click_cancel);
register_done.addEventListener("click", click_register_done);
