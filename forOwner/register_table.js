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

let isDragging = null;
let originLeft = null;
let originTop = null;
let originX = null;
let originY = null;
let table_line = $(".border").offset().top; //테이블 구성하는 영역의 border의 top위치
let block_line = $("#_table").offset().top;
function init() {
    //초기 상태 페이지
    let register_name = sessionStorage.getItem("register_name");
    let name = document.getElementById("place_name");
    name.innerHTML = register_name;
    for (let i = 0; i < divs.length; i++) {
        //상단의 테이블, 입구, 출구, 주방, 화장실, 룸 의 블럭의 드래그 앤 드롭 효과를 준다.
        div_arr[i] = divs[i];
        console.log(div_arr[i]);
        div_arr[i].addEventListener("mousedown", (e) => {
            console.log(e);
            //요소 드래그 시작
            //드래그를 시작하면 제자리에 자신을 복사하여 하나더 생성해 놓는다.
            isDragging = true;
            originX = e.clientX;
            originY = e.clientY;
            originLeft = div_arr[i].offsetLeft;
            originTop = div_arr[i].offsetTop;
        });
        div_arr[i].addEventListener("mouseup", (e) => {
            //마우스를 놓았을 떄,
            //위로 움직임 불가 , 일정영역 벗어나야 적용완료.
            let id = e.path[0].id; //드래그 한 요소의 id
            let obj = $(`#${id}`).offset().top;
            // console.log(e);

            let moveLeft = e.clientX;
            let moveTop = e.clientY;
            if (obj < table_line || obj <= block_line) {
                console.log(obj);
                console.log(table_line);
                console.log(block_line);
                //요소가 영역안에 들어오지 못함
                //또는 요소가 위쪽으로 드래그 된 경우,
                //다시 원위치 시킨다.
                //클릭 한 요소를 그냥 제거시키면 된다.
                alert("no");
            } else {
                //성공적인 드래그 한 경우이고,
                //블록을 복사하여드래그 하는것이다.
                let _id = e.path[0].id;
                let node;
                console.log(originX);
                if (_id == "_table") {
                    node = $(`#${_id}`).clone();
                    node.css({ "z-index": "2" });
                    // node.style.zIndex = 2;
                }
                if (_id == "_entrance") {
                    node = $(`#${_id}`).clone();
                    node.css({ "z-index": "2" });
                }
                if (_id == "_exit") {
                }
                if (_id == "_kitchen") {
                }
                if (_id == "_toilet") {
                }
                if (_id == "_room") {
                }
                console.log(node);
                node.css({ position: "absolute" });
                $(`#_entrance`).before(node);
                // node.offset({ top: originTop, left: originLeft });
            }
            isDragging = false;
        });
        div_arr[i].addEventListener("mousemove", (e) => {
            let id = e.path[0].id;
            // console.log(id);
            if (isDragging) {
                const diffX = e.clientX - originX;
                const diffY = e.clientY - originY;
                console.log(originX);
                $(`#${id}`).offset({
                    left: originLeft + diffX,
                    top: originTop + diffY,
                });
            }
        });
    }
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

// next.addEventListener("click", click_next);
// cancel.addEventListener("click", click_cancel);
