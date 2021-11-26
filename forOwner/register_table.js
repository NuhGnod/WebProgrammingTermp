let next = document.getElementById("next");
let cancel = document.getElementById("cancel");
//요소의 절대위치 구하는 방법. 참고출처 : https://mommoo.tistory.com/85
//const clientRect = next.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
//const relativeTop = clientRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
//const scrolledTopLength = window.pageYOffset; // 스크롤된 길이
//const scrolledTopLength = pageYOffset; // window 객체 없이 pageYOffset 메서드를 써도 가능하다.
//const absoluteTop = scrolledTopLength + relativeTop; // 절대좌
//div의 절대위치 구하는 방법. 참고출처 : https://cofs.tistory.com/197
var div = $(".second");
//var divTop = div.offset().top;
// var divBottom = div.getBoundingClientRect().bottom;
// var divLeft = div.getBoundingClientRect().left;
// var divRight = div.getBoundingClientRect().right;
//div의 절대좌표로 이동시키기. 참고출처 : https://webisfree.com/2014-09-07/[jquery]-%EC%A0%88%EB%8C%80%EC%A2%8C%ED%91%9C-%EB%B0%8F-%EC%83%81%EB%8C%80%EC%A2%8C%ED%91%9C-%ED%99%95%EC%9D%B8-%EB%B0%8F-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-offset()-position()
//div.offset({ top: 400 });
let divs = $(".div");
let div_arr = [];
let start = "";
let end = "";
let idDragging = null;
let originLeft = null;
let originTop = null;
let originX = null;
let originY = null;

function init() {
    //초기 상태 페이지
    let register_name = sessionStorage.getItem("register_name");
    let name = document.getElementById("place_name");
    name.innerHTML = register_name;
    for (let i = 0; i < divs.length; i++) {
        div_arr[i] = divs[i];
        div_arr[i].addEventListener("mousedown", (e) => {
            idDragging = true;
            originX = e.clientX;
            originY = e.clientY;
            originLeft = e.clientLeft;
            console.log(e.clientX);
        });
        div_arr[i].addEventListener("mouseup", (e) => {
            console.log(e.clientX);
        });
        div_arr[i].addEventListener("mousemove", (e) => {
            // console.log(this);
            // $(this).offset({ top: 400 });
            console.log(e.path[0].id);
            let id = $(this).id;
            console.log(id);
            // d.offset({ top: 400 });
            // console.log($(this));
            div.offset({ top: 400 });
            // console.log(e);
        });
        // div_arr[i].addEventListener(d, allowDrop);
        console.log(div_arr[i]);
    }
    console.log(divs.length);
    // console.log("다음 " + absoluteTop);
    // console.log("입구 " + divTop);
    // div.offset({ top: 400 });
}
function dd() {
    console.log("D");
}
function drag(ev) {
    console.log(ev);
}
function drop(ev) {
    ev.preventDefault();
    console.log(ev);
}
function allowDrop(ev) {
    ev.preventDefault();
    console.log(ev);
}
init();
function click_next() {
    //다음 버튼 클릭시, 메뉴 등록 페이지로 이동
    open("./register_menu.html", "_self");
}
function click_cancel() {
    //취소 버튼 클릭시 이전 페이지로 이동
    history.go(-1);
}

next.addEventListener("click", click_next);
cancel.addEventListener("click", click_cancel);
