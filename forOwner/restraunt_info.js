let cancel = document.getElementById("cancel");
function click_cancel() {
    history.go(-1);
}
cancel.addEventListener("click", click_cancel);
