let option = document.getElementById("option"); //옵션 설정 이미지버튼
let my_page = document.getElementById("my_page"); //마이페이지 버튼
let close_option = document.getElementById("close_option"); //옵션 설정 닫기 버튼
let close_my_page = document.getElementById("close_my_page"); //마이페이지 닫기 버튼
let nextBtn = document.getElementById("nextBtn"); //다음페이지 버튼
let prevBtn = document.getElementById("prevBtn"); //이전페이지 버튼
let login = document.getElementById("login"); //로그인 버튼
let logout = document.getElementById("logout"); //로그아웃 버튼
let singup = document.getElementById("signup"); //회원가입 버튼
let search = document.getElementById("search"); //검색 버튼

let for_test = document.getElementById("for_test"); //메인의 검색된 가게 리스트 중 첫번째 가게이다. 테스트를 위해 3개의 li중 첫번째만 클릭이벤트를 달아놓는다.
let for_test_ = document.getElementById("for_test_"); //메인의 마이 페이지 영역의 내 가게 리스트이다. 테스트를 위해 첫번째 가게에만 클릭이벤트를 달아놓았다.

function click_login() {
    //로그인 버튼 클릭시 실행되는 함수, login페이지로 이동한다.
    //이미 로그인 되어있다면, alert창을 띄운다.

    open("./login.html", "_self");
}
function click_logout() {
    //로그아웃한다. 모든 스토리지의 item을 제거한다.
    localStorage.clear();
}
function click_signup() {
    //회원가입버튼을 누르면 실행되고, 회원가입 하는 페이지로 이동한다.
    open("./signup.html", "_self");
    // close();
}
function click_li() {
    //검색결과로 보여지는 목록중 하나를 클릭 했을 시,
    let info = [];

    open("./restraunt_table.html", "_self"); //그 가게의 테이블 현황(모습)페이지로 넘어간다.
}
function click_option() {
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
function click_restraunt_page() {
    //현재는 테스트를 위해 첫번째 가게만클릭시 이동.
    //클릭시, 그 가게의 정보 수정 페이지로 이동한다.
    open("./restraunt_info.html", "_self");
}
function click_search() {
    //메인의 검색바에서 등록할 가게 이름을 입력후 등록버튼을 누른경우
    let word = document.getElementById("search_restraunt").value; //검색바에서 입력된 단어.

    localStorage.setItem("register_name", word);
    open("register.html", "_self");
}

option.addEventListener("click", click_option);
close_option.addEventListener("click", click_option);
my_page.addEventListener("click", click_my_page);
close_my_page.addEventListener("click", click_my_page);
login.addEventListener("click", click_login);
logout.addEventListener("click", click_logout);
singup.addEventListener("click", click_signup);
for_test.addEventListener("click", click_li);
for_test_.addEventListener("click", click_restraunt_page);
search.addEventListener("click", click_search);
