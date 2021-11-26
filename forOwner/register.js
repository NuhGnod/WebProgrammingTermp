let h2 = document.getElementById("h2"); //등록할 가게 이름을 보여줄 h2태그
let register = document.getElementById("register"); //등록하기 버튼
let cancel = document.getElementById("cancel"); //취소 버튼
function init() {
    //페이지 초기 상태함수
    h2.innerHTML = sessionStorage.getItem("register_name");
}
init();
function click_register() {
    let phone_number = document.getElementById("phone_number").value;
    let address = document.getElementById("address").value;
    let name = document.getElementById("name").value;
    let place_name = sessionStorage.getItem("register_name");
    let userTimestamp = new Date().getTime(); //현재 등록하는 시간 ms 을 기준으로 doc의 id값으로 지정해주기 위함

    let register_info = {
        //db에 저장할 가게 정보 객체
        _phone_number: phone_number,
        _address: address,
        _name: name,
        _place_name: place_name,
        _timestamp: userTimestamp,
    };
    let cId;
    if (localStorage.getItem("auto_login"))
        cId = localStorage.getItem("login_id");
    else cId = sessionStorage.getItem("login_id");
    db.collection("Users") //db에 저장. Users->사용자 id -> restaurants -> timestamp
        .doc(cId)
        .collection("restaurants")
        .doc(userTimestamp.toString())
        .set(register_info)
        .then(() => {
            console.log(`유저 정보 저장 성공`);
        })
        .then(() => {
            alert(`정보가 등록되었습니다. 내부 모습 등록 페이지로 이동합니다.`);
            open("./register_table.html", "_self");
        });
    //등록하기 버튼 클릭시 firestore에 입력값들이 저장되고,
    //가게의 내부 모습 등록 페이지로 넘어간다.
}
function click_cancel() {
    //취소 버튼 클릭시 이전페이지로 돌아간다.
    history.go(-1);
}
register.addEventListener("click", click_register);
cancel.addEventListener("click", click_cancel);
