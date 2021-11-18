let pay = document.getElementById("next");
let cancel = document.getElementById("cancel");

function click_cancel() {
    //취소버튼을 눌렀을 떄, 현재 화면이 닫힌다.
    if (confirm("입력한 정보가 모두 사라집니다. 취소하시겠습니까?") == true) {
        // alert("");
    } else {
        return;
    }

    //취소하면, 이전페이지로이동.
    history.go(-1);
}
function click_pay() {
    //결제 완료후 메인페이지로 이동, 로컬스토리지의 item을 지운다.
    alert("결제되었습니다.");

    localStorage.removeItem("table_info");
    localStorage.removeItem("restraunt_info");
    open("./index.html", "_self");
}
cancel.addEventListener("click", click_cancel);
pay.addEventListener("click", click_pay);
