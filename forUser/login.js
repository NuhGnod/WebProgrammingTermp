let id = document.getElementById("id");
let pw = document.getElementById("pw");
let auto_login = document.getElementById("auto_login");
let login = document.getElementById("login");
let signup = document.getElementById("signup");
let main_logo = document.getElementById("main_logo");
function click_logo() {
    open("./index.html", "_self");
}
function click_login() {
    //로그인 버튼 클릭시 실행되는 함수.
    //유효성검사를 통과하면 로그인되고, 메인 페이지로 이동한다.
    //유효성 : firestore에서 유저들의 데이터들을 읽어 입력한 id,pw값과 일치하면 통과

    let cId = id.value;
    let cPw = pw.value;
    let login_flag = false;
    let cAuto_login = auto_login.checked; //자동 로그인 체크 여부.
    //firestore 에 연결하여 확인하는 부분
    //통과되면 login_flag = true;
    db.collection("Users")
        .get()
        .then((query) => {
            query.forEach((doc) => {
                //모든 doc의 id값은 회원가입시 입력한 id로 되어있다.
                let _pw = doc.data()._pw;
                let _id = doc.data()._id;
                let _classfication = doc.data()._classfication;

                if (cId == _id && cPw == _pw && _classfication == "user") {
                    //db의 id,pw 와 내가 입력한 id,pw가 일치.
                    //id는 유일하다.
                    login_flag = true;
                }
            });
        })
        .then(() => {
            //db에서 데이터를 검사한 후,
            if (login_flag) {
                //로그인 유효성 통과.
                if (cAuto_login) {
                    localStorage.setItem("auto_login", true);
                    localStorage.setItem("login_id", cId);
                }
                sessionStorage.setItem("login", true);
                sessionStorage.setItem("login_id", cId);

                open("./index.html", "_self");
            } else {
                alert(`아이디 또는 비밀번호가 일치하지 않습니다.`);
            }
        });
}
function click_signup() {
    //회원가입 클릭시 실행되는 함수.
    //회원가입 페이지로 이동한다.
    open("./signup.html", "_self");
}
main_logo.addEventListener("click", click_logo);
login.addEventListener("click", click_login);
signup.addEventListener("click", click_signup);
