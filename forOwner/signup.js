let username = document.getElementById("name");
let phone_number = document.getElementById("phone_number");
let id = document.getElementById("id");
let check_id = document.getElementById("check_id");
let pw = document.getElementById("id");
let check_pw = document.getElementById("id");
let nickname = document.getElementById("id");
let classfication = document.getElementsByName("classfication");
let signup = document.getElementById("signup");
let cancel = document.getElementById("cancel");
let id_flag = false;
let login_flag = true;

// 영문+숫자만 입력 체크     //출처: https://curryyou.tistory.com/208 [카레유]
function checkEngNum(str) {
    if (str.length == 0) {
        //내가 구현
        //입력되지 않음.//내가 구현
        return false; //내가 구현
    } //내가 구현
    //코드라인 -9
    const regExp = /[a-zA-Z0-9]/g;
    if (regExp.test(str)) {
        return true;
    } else {
        return false;
    }
}

function click_signup() {
    //아이디는 중복되면 안되고, 모든 입력은 영어와 숫자로만 이루어져야한다.
    if (!id_flag) {
        //id가 중복된 상태
        login_flag = false;
        alert(`아이디 중복 체크를 다시 확인해주세요.`);
        // return;
    }
    username = username.value;
    phone_number = phone_number.value;
    id = id.value;
    pw = pw.value;
    check_pw = check_pw.value;
    nickname = nickname.value;
    if (classfication[0].checked) {
        //손님용이 선택.
        classfication = "user";
    } else if (classfication[1].checked) {
        //사장용이 선택.
        classfication = "owner";
    } else {
        alert("회원분류가 선택되지 않았습니다. 확인해주세요.");
        return;
        //아무것도 선택되지 않은 상황
    }
    login_flag =
        checkEngNum(username) &&
        checkEngNum(phone_number) &&
        checkEngNum(id) &&
        checkEngNum(pw) &&
        checkEngNum(check_pw) &&
        checkEngNum(nickname);
    if (pw != check_pw) {
        login_flag = false;
        alert(`비밀번호가 일치하지 않습니다.`);
        return;
    }
    if (login_flag) {
        //유효성 검사가 통과되면 firestore에 데이터 저장후, 로그인 페이지로 이동.
        open("./login.html", "_self");
    } else {
        alert(`입력을 다시 확인해주세요.`);
    }
}
function click_cancel() {
    //이전페이지로 돌아간다.
    history.go(-1);
}
function click_check_id() {
    //firestore 에서 user들의 데이터를 가져와 id의 중복여부를 체크한다.
    //중복된다면 id_flag = false, 유일하다면, id_flag = true;

    if (!id_flag) {
        alert("사용 불가능한 id입니다. 다시 입력해주세요.");
    } else {
        alert("사용 가능한 id입니다.");
    }
}

signup.addEventListener("click", click_signup);
cancel.addEventListener("click", click_cancel);
check_id.addEventListener("click", click_check_id);
