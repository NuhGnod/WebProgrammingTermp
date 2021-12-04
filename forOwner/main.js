let option = document.getElementById("option"); //옵션 설정 이미지버튼
let my_page = document.getElementById("my_page"); //마이페이지 버튼
let close_option = document.getElementById("close_option"); //옵션 설정 닫기 버튼
let close_my_page = document.getElementById("close_my_page"); //마이페이지 닫기 버튼
let nextBtn = document.getElementById("nextBtn"); //다음페이지 버튼
let prevBtn = document.getElementById("prevBtn"); //이전페이지 버튼
let login = document.getElementById("login"); //로그인 버튼
let logout = document.getElementById("logout"); //로그아웃 버튼
let singup = document.getElementById("signup"); //회원가입 버튼
let searchBtn = document.getElementById("search"); //검색 버튼
let login_flag = false; //로그인 여부
let modify_name = document.getElementById("change_my_name_btn"); //이름 정보 수정버튼
let modify_phone_number = document.getElementById("change_my_phone_number_btn"); //번호 정보 수정버튼
let myName;
let myPhoneNumber;

storageRef //firebase storage api 사용.
    .child("images/" + `restraunt_png.png`) //메인로고
    .getDownloadURL()
    .then(function (url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
            var blob = xhr.response;
        };
        xhr.open("GET", url);

        // Or inserted into an <img> element:
        document.getElementById("main_logo").src = url;
    })
    .then(() => {
        storageRef
            .child("images/" + `close.png`) //닫기 버튼
            .getDownloadURL()
            .then(function (url) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open("GET", url);

                document.getElementById("close_option").src = url;
                document.getElementById("close_my_page").src = url;
            })
            .then(() => {
                storageRef
                    .child("images/" + `option.png`) //옵션 버튼
                    .getDownloadURL()
                    .then(function (url) {
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = "blob";
                        xhr.onload = function (event) {
                            var blob = xhr.response;
                        };
                        xhr.open("GET", url);

                        document.getElementById("option").src = url;
                    })
                    .then(init());
            });
    });
function init() {
    //스토리지 부분

    //
    if (localStorage.getItem("auto_login")) {
        login_flag = true;
        let login_id = localStorage.getItem("login_id");
        sessionStorage.setItem("login_id", login_id);
    }
    if (sessionStorage.getItem("login")) login_flag = true;
    if (login_flag) {
        let login_id = sessionStorage.getItem("login_id"); //현재 로그인 id
        console.log(login_id);
        let idx = 0;
        db.collection("Users")
            .doc(login_id)
            .collection("restaurants")
            .get()
            .then((query) => {
                query.forEach((doc) => {
                    let placeName;
                    let address;
                    address = doc.data()._address;
                    placeName = doc.data()._place_name;
                    console.log(doc.data()._address);
                    let li = $(
                        `<li class="li" id="li${idx}">${placeName} (${address}) </li>`
                    );
                    li.on("click", click_li);
                    idx++;
                    $("#ulList").append(li);
                });
            });
    }
}
//페이지의 이미지를 firebase storage에서 가져와 로딩한다.
init();
function click_login() {
    //로그인 버튼 클릭시 실행되는 함수, login페이지로 이동한다.
    //이미 로그인 되어있다면, alert창을 띄운다.

    open("./login.html", "_self");
}
function click_logout() {
    //로그아웃한다. 모든 스토리지의 item을 제거한다.
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
}
function click_signup() {
    //회원가입버튼을 누르면 실행되고, 회원가입 하는 페이지로 이동한다.
    open("./signup.html", "_self");
    // close();
}
function click_li() {
    //검색결과로 보여지는 목록중 하나를 클릭 했을 시,
    let info = [];
    console.log(this);
    sessionStorage.setItem("select_table", this.innerHTML);
    open("./restraunt_table.html", "_self"); //그 가게의 테이블 현황(모습)페이지로 넘어간다.
}
function click_modify_name() {
    //마이페이지 의 이름 정보 수정
    let newName = document.getElementById("change_my_name"); //변경할 이름
    let id = sessionStorage.getItem("login_id"); //로그인한 아이디
    db.collection("Users")
        .doc(id)
        .update({ _username: newName.value })
        .then(() => {
            db.collection("Users")
                .doc(id)
                .get()
                .then((doc) => {
                    myName.innerHTML = doc.data()._username;
                    myPhoneNumber.innerHTML = doc.data()._phone_number;
                });
        });
}
function click_modify_phone_number() {
    //마이페이지 의 번호 정보 수정
    let newPhoneNumber = document.getElementById("change_my_phone_number"); //변경할 이름
    let id = sessionStorage.getItem("login_id"); //로그인한 아이디
    db.collection("Users")
        .doc(id)
        .update({ _phone_number: newPhoneNumber.value })
        .then(() => {
            db.collection("Users")
                .doc(id)
                .get()
                .then((doc) => {
                    myName.innerHTML = doc.data()._username;
                    myPhoneNumber.innerHTML = doc.data()._phone_number;
                });
        });
}
function click_option() {
    if (localStorage.getItem("auto_login")) {
        //자동 로그인 되있다면 로그인버튼 없앰 -> 로그인 되있는 상태이므로,
        login_flag = true;
    } else {
        login_flag = sessionStorage.getItem("login");
    } //로그인 여부.
    if (login_flag) {
        //로그인 되어있다면 옵션영억에서 로그인버튼은 안보이게 수정한다.
        document.getElementById("login").style.display = "none";
    }
    //옵션 설정 (이미지) 누르기
    let div = document.getElementById("option_div");
    div.style.display =
        div.style.display == "inline-block" ? "none" : "inline-block";
}
function click_my_page() {
    //옵션설정의 마이페이지 누르기
    let div = document.getElementById("my_page_div_wrapper");
    div.style.display =
        div.style.display == "inline-block" ? "none" : "inline-block";
    myName = document.getElementById("my_name");
    myPhoneNumber = document.getElementById("my_phone_number");
    let login_id = sessionStorage.getItem("login_id");
    let idx = 0;
    $("#ulRestaurantInfo").children().remove();
    db.collection("Users")
        .doc(login_id)
        .collection("restaurants")
        .get()
        .then((query) => {
            query.forEach((doc) => {
                let placeName;
                let address;
                address = doc.data()._address;
                placeName = doc.data()._place_name;
                console.log(doc.data()._address);
                let li = $(
                    `<span class="restraunt_info" id="restraunt_info${idx}">${placeName} (${address})</span>`
                );
                // let li = $(
                //     `<li class="restraunt_info" id="restraunt_info${idx}">${placeName} (${address}) </li>`
                // );
                li.on("click", click_restraunt_page);
                idx++;
                $("#ulRestaurantInfo").append(li);
            });
        })
        .then(() => {
            db.collection("Users")
                .doc(login_id)
                .get()
                .then((doc) => {
                    myName.innerHTML = doc.data()._username;
                    myPhoneNumber.innerHTML = doc.data()._phone_number;
                });
        });
}
function click_restraunt_page() {
    alert(`미구현!`);
    //firebase 의 firestore 구성을 잘못 짜서 구현불가.
    //클릭시, 그 가게의 정보 수정 페이지로 이동한다.
    // console.log(this);
    // sessionStorage.setItem("restaurant_page_info", this.innerHTML);
    // open("./restraunt_info.html", "_self");
}
function click_search() {
    if (!login_flag) {
        alert(`로그인 해주세요.`);
        return;
    }
    //메인의 검색바에서 등록할 가게 이름을 입력후 등록버튼을 누른경우
    let word = document.getElementById("search_restraunt").value; //검색바에서 입력된 단어.
    if (word.length == 0) {
        alert(`단어를 입력해주세요.`);
        return;
    }
    sessionStorage.setItem("register_name", word);
    open("register.html", "_self");
}

option.addEventListener("click", click_option);
close_option.addEventListener("click", click_option);
my_page.addEventListener("click", click_my_page);
close_my_page.addEventListener("click", click_my_page);
login.addEventListener("click", click_login);
logout.addEventListener("click", click_logout);
singup.addEventListener("click", click_signup);
modify_name.addEventListener("click", click_modify_name);
modify_phone_number.addEventListener("click", click_modify_phone_number);
searchBtn.addEventListener("click", click_search);
