function init() {
    //초기 상태 페이지
    alert(`메인로고 클릭시 홈으로 이동합니다.`);
    //포스기 화면은 col개수를 6개로 맞춘다.
    //db에서 테이블 , 룸 등의 개수를 검색해 col이 6개가 되도록 화면 구성.
}
init();
let home = document.getElementById("home");
function click_home() {
    //흠으로 가기 버튼 클릭시 메인페이지로 이동한다.
    open("./index.html", "_self");
}
home.addEventListener("click", click_home);
