let username = document.getElementById("name");
let phone_number = document.getElementById("phone_number");
let id = document.getElementById("id");
let check_id = document.getElementById("check_id");
let pw = document.getElementById("pw");
let check_pw = document.getElementById("check_pw");
let nickname = document.getElementById("nickname");
let classfication = document.getElementsByName("classfication");
let signup = document.getElementById("signup");
let cancel = document.getElementById("cancel");
let id_flag = true;
let login_flag = true;

// 영문+숫자+한글만 입력 체크     //출처: https://curryyou.tistory.com/208 [카레유]
function checkEngNum(str) {
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

function click_signup() {
    //아이디는 중복되면 안되고, 모든 입력은 영어와 숫자로만 이루어져야한다.
    if (!id_flag) {
        //id가 중복된 상태
        login_flag = false;
        alert(`아이디 중복 체크를 다시 확인해주세요.`);
        // return;
    }
    let cUsername = username.value; //이름
    let cPhone_number = phone_number.value; //폰 번호
    let cId = id.value; //id
    let cPw = pw.value; //pw
    let cCheck_pw = check_pw.value; //check pw
    let cNickname = nickname.value; //nickname
    let cClassfication = "";
    if (classfication[0].checked) {
        //손님용이 선택.
        cClassfication = "user";
    } else if (classfication[1].checked) {
        //사장용이 선택.
        cClassfication = "owner";
    } else {
        alert("회원분류가 선택되지 않았습니다. 확인해주세요.");
        return;
        //아무것도 선택되지 않은 상황
    }
    //모든 입력이 한글, 영어, 숫자로 이루어졌는지 확인하고, 맞다면 login_flag 를 true로 설정한다.

    login_flag =
        checkEngNum(cUsername) &&
        checkEngNum(cPhone_number) &&
        checkEngNum(cId) &&
        checkEngNum(cPw) &&
        checkEngNum(cCheck_pw) &&
        checkEngNum(cNickname);

    if (cPw != cCheck_pw) {
        //비밀번호와, 비밀번호 확인의 입력이 같은지.
        login_flag = false;
        alert(`비밀번호가 일치하지 않습니다.`);
        return;
    }
    if (login_flag) {
        //모든 입력이 정상적으로 이루어졌다면,

        let userInfo = {
            //db에 저장한 userInfo 객체
            _username: cUsername,
            _phone_number: cPhone_number,
            _id: cId,
            _pw: cPw,
            _nickname: cNickname,
            _classfication: cClassfication,
        };
        db.collection("Users") //db에 저장.
            .doc(cId)
            .set(userInfo)
            .then(() => {
                console.log(`유저 정보 저장 성공`);
            })
            .then(() => {
                open("./login.html", "_self");
            });
        //유효성 검사가 통과되면 firestore에 데이터 저장후, 로그인 페이지로 이동.
    } else {
        alert(`입력을 다시 확인해주세요.`);
    }
}
function click_cancel() {
    //이전페이지로 돌아간다.
    history.go(-1);
}
function click_check_id() {
    //아이디중복 확인 버튼 클릭 이벤트.
    id_flag = true;

    //firestore 에서 user들의 데이터를 가져와 id의 중복여부를 체크한다.
    //중복된다면 id_flag = false, 유일하다면, id_flag = true;
    db.collection("Users")
        .get()
        .then((query) => {
            query.forEach((doc) => {
                //db의 모든 id를 순차적으로 가져온다.
                let _id = doc.data()._id;
                console.log(_id);
                if (_id == id.value) {
                    //입력 id와 db의 id가 같다면 중복됨을 의미.
                    console.log(id.value);
                    console.log("id is already exist");
                    id_flag = false;
                }
            });
        })
        .then(() => {
            console.log(id_flag);
            if (id_flag == false) {
                //중복됨을 의미.
                alert(`사용이 불가능한 id입니다. 다시 입력해주세요.`);
            } else {
                alert(`사용 가능한 id입니다.`);
            }
        });
}

signup.addEventListener("click", click_signup);
cancel.addEventListener("click", click_cancel);
check_id.addEventListener("click", click_check_id);
