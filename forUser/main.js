let option = document.getElementById("option"); //옵션 설정 이미지버튼
let my_page = document.getElementById("my_page"); //마이페이지 버튼
let close_option = document.getElementById("close_option"); //옵션 설정 닫기 버튼
let close_my_page = document.getElementById("close_my_page"); //마이페이지 닫기 버튼
let nextBtn = document.getElementById("nextBtn"); //다음페이지 버튼
let prevBtn = document.getElementById("prevBtn"); //이전페이지 버튼
let login = document.getElementById("login"); //로그인 버튼
let logout = document.getElementById("logout"); //로그아웃 버튼
let singup = document.getElementById("signup"); //회원가입 버튼
window.onload = function () {
    // alert("ASD");
};

function init() {
    //페이지의 이미지를 firebase storage에서 가져와 로딩한다.
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
        .catch(function (error) {
            console.log(error);
        });
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
        .catch(function (error) {
            console.log(error);
        });
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
        .catch(function (error) {
            console.log(error);
        });
}
init();
if (navigator.geolocation) {
    //위치 정보를 얻기
    navigator.geolocation.getCurrentPosition(function (pos) {
        console.log("위도 " + pos.coords.latitude);
        console.log("경도 " + pos.coords.longitude);
        var container = document.getElementById("map"); //지도가 보여질 map div
        var options = {
            center: new kakao.maps.LatLng(36.3635948, 127.3490568),
            level: 3,
        };
        var places = new kakao.maps.services.Places(); //검색 기능을 위한 api
        map = new kakao.maps.Map(container, options); //초기에보여질 지도
        option = {};
        var callback = function (result, status, pagination) {
            //kakao map api 를 사용하기위한 callback함수

            if (status === kakao.maps.services.Status.OK) {
                if (pagination.totalCount != 0) {
                    //검색 결과가 있는경우
                    console.log(`callback`);

                    $("ul").children().remove(); //영억을 모두 지우고 새 결과인 목록들로 다시 구성하기 위함.
                    console.log(result);
                    option = {
                        //option 파라미터로 활용.
                        center: new kakao.maps.LatLng(result[0].y, result[0].x), //검색된 결과의 경도 위도 값으로 지도를 초기화
                        level: 3,
                    };
                    map = new kakao.maps.Map(container, option);
                    for (let i = 0; i < result.length; i++) {
                        let id = JSON.stringify(result[i]);
                        //검색한 결과인 result 를 li태그로 목록영억에 달아준다.
                        $("ul").append(
                            `<li class="li" id='${id}'>${result[i].place_name}</li>`
                        );
                    }
                    $(".li").on("click", click_li); //각 li에 click_li함수를 달아준다.
                }

                nextBtn.addEventListener("click", function () {
                    // 속성 값으로 다음 페이지가 있는지 확인하고
                    if (pagination.hasNextPage) {
                        $("ul").children().remove();
                        pagination.nextPage();
                        // 있으면 다음 페이지를 검색한다.

                        console.log(result);
                    }
                });

                prevBtn.addEventListener("click", function () {
                    //속성 값으로 이전 페이지가 있는지 확인하고
                    if (pagination.hasPrevPage) {
                        $("ul").children().remove();
                        pagination.prevPage();

                        console.log(result);
                        // 있으면 이전 페이지를 검색한다.
                    }
                });
            }
        };
        let search = document.getElementById("search");
        let key = "";
        search.addEventListener("click", function () {
            //키워드로 검색하는 함수
            key = document.getElementById("search_restraunt").value;
            console.log(key);
            if (!key) {
                //검색어가 없는경우
                alert(`검색어를 입력해주세요.`);
                return;
            } //검색어가 있다면 해당 검색어로 카카오맵에서 검색시작.
            places.keywordSearch(key, callback, op);
        });
        let op = {
            //내 주소로 초기 지도 모습 설정
            location: new kakao.maps.LatLng(36.3635948, 127.3490568),
            radius: 5000,
        };
    });
} else {
    alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
}
function click_login() {
    //로그인 버튼 클릭시 실행되는 함수, login페이지로 이동한다.
    //이미 로그인 되어있다면, alert창을 띄운다.

    open("./login.html", "_self");
}
function click_logout() {
    //로그아웃한다. 모든 스토리지의 item을 제거한다.
    localStorage.clear();
    //현재 화면을 새로고침.
    window.location.reload();
}
function click_signup() {
    //회원가입버튼을 누르면 실행되고, 회원가입 하는 페이지로 이동한다.
    open("./signup.html", "_self");
    // close();
}
function click_li() {
    //검색결과로 보여지는 목록중 하나를 클릭 했을 시,
    // console.log(this);
    let info = [];

    localStorage.setItem("restraunt_info", this.id);
    open("./table.html", "_self"); //그 가게의 테이블 현황(모습)페이지로 넘어간다.
}
function click_option() {
    // //for test

    let login_flag = localStorage.getItem("login"); //로그인 여부.
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
}
function search() {}

option.addEventListener("click", click_option);
close_option.addEventListener("click", click_option);
my_page.addEventListener("click", click_my_page);
close_my_page.addEventListener("click", click_my_page);
login.addEventListener("click", click_login);
logout.addEventListener("click", click_logout);
singup.addEventListener("click", click_signup);
