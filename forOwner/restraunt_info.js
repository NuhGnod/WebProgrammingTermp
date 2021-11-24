let cancel = document.getElementById("cancel"); //취소버튼
function click_cancel() {
    //이전페이지로이동
    history.go(-1);
}
cancel.addEventListener("click", click_cancel);
