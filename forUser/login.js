let id = document.getElementById("id");
let pw = document.getElementById("pw");
let auto_login = document.getElementById("auto_login");
let login = document.getElementById("login");
let signup = document.getElementById("signup");

function click_login() {
    //로그인 버튼 클릭시 실행되는 함수.
    //유효성검사를 통과하면 로그인되고, 메인 페이지로 이동한다.
    //유효성 : firestore에서 유저들의 데이터들을 읽어 입력한 id,pw값과 일치하면 통과

    id = id.value;
    pw = pw.value;
    let login_flag = false;
    auto_login = auto_login.Checked; //자동 로그인 체크 여부.
    //firestore 에 연결하여 확인하는 부분
    // ~~~~
    //통과되면 login_flag = true;

    if (login_flag) {
        if (auto_login) {
            //세션, 쿠키를 이용하여 자동로그인 하는 부분.
            alert(`아직은 사용할 수 없습니다. 미구현.`);
            return;
        }
        localStorage.setItem("login", true);

        open("./index.html", "_self");
    } else {
        alert(`아이디 또는 비밀번호가 일치하지 않습니다.`);
    }
}
function click_signup() {
    //회원가입 클릭시 실행되는 함수.
    //회원가입 페이지로 이동한다.
    open("./signup.html", "_self");
}
login.addEventListener("click", click_login);
signup.addEventListener("click", click_signup);
