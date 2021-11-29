let next = document.getElementById("next");
let cancel = document.getElementById("cancel");
//요소의 절대위치 구하는 방법. 참고출처 : https://mommoo.tistory.com/85
//const clientRect = next.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
//const relativeTop = clientRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
//const scrolledTopLength = window.pageYOffset; // 스크롤된 길이
//const scrolledTopLength = pageYOffset; // window 객체 없이 pageYOffset 메서드를 써도 가능하다.
//const absoluteTop = scrolledTopLength + relativeTop; // 절대좌
//div의 절대위치 구하는 방법. 참고출처 : https://cofs.tistory.com/197
// var div = $(".second");
//var divTop = div.offset().top;
// var divBottom = div.getBoundingClientRect().bottom;
// var divLeft = div.getBoundingClientRect().left;
// var divRight = div.getBoundingClientRect().right;
//div의 절대좌표로 이동시키기. 참고출처 : https://webisfree.com/2014-09-07/[jquery]-%EC%A0%88%EB%8C%80%EC%A2%8C%ED%91%9C-%EB%B0%8F-%EC%83%81%EB%8C%80%EC%A2%8C%ED%91%9C-%ED%99%95%EC%9D%B8-%EB%B0%8F-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-offset()-position()
//div.offset({ top: 400 });
let div_arr = [];
let idx = 0;

let table_arr = [];
let entrance_arr = [];
let exit_arr = [];
let kitchen_arr = [];
let toilet_arr = [];
let room_arr = [];
let block_arr = [];
let targetDragging = null; //현재 드래그가 일어나는 블럭요소
let isDragging = null;
let originLeft = null;
let originTop = null;
let originX = null;
let originY = null;

let table_line = $(".border").offset().top; //테이블 구성하는 영역의 border의 top위치
let block_line = $("#_table").offset().top;
let targeted = "";
function down(e, d) {
    //요소 드래그 시작
    //드래그를 시작하면 제자리에 자신을 복사하여 하나더 생성해 놓는다.

    let id = d.id;

    targetDragging = id;
    for (let i = 0; i < block_arr.length; i++) {
        console.log(block_arr[i].id);
        if (id != block_arr[i].id) {
            $(`#${block_arr[i].id}`).css({
                "pointer-events": "none",
            });
        } else {
            console.log(idx);
            idx = i;
        }
    }

    isDragging = true;
    originX = e.clientX;
    originY = e.clientY;
    originLeft = block_arr[idx].offsetLeft;
    originTop = block_arr[idx].offsetTop;
}
function up(e, d) {
    //마우스를 놓았을 떄,
    //위로 움직임 불가 , 일정영역 벗어나야 적용완료.
    let id = e.target.id; //드래그 한 요소의 id
    let obj = $(`#${id}`).offset().top;
    idx = id.split("_")[0];

    for (let i = 0; i < block_arr.length; i++) {
        $(`#${block_arr[i].id}`).css({
            "pointer-events": "auto",
        });
    }

    let moveLeft = e.clientX;
    let moveTop = e.clientY;
    if (obj < table_line || obj <= block_line) {
        //요소가 영역안에 들어오지 못함
        //또는 요소가 위쪽으로 드래그 된 경우,
        //다시 원위치 시킨다.
        //클릭 한 요소를 그냥 제거시키면 된다.
        alert("no");
        $(`#${id}`).offset({
            left: originLeft,
            top: originTop,
        });
    } else {
        //성공적인 드래그 한 경우
        // table_arr.pop();
        console.log(table_arr);
    }
    isDragging = false;
}
function move(e, i) {
    let id = e.target.id;
    // console.log(id);
    if (isDragging) {
        const diffX = e.clientX - originX;
        const diffY = e.clientY - originY;
        if (targetDragging == id)
            $(`#${id}`).offset({
                left: originLeft + diffX,
                top: originTop + diffY,
            });
    }
}
let nextNode;
let cancelNode;
function init() {
    //초기 상태 페이지
    let register_name = sessionStorage.getItem("register_name");
    let name = document.getElementById("place_name");
    name.innerHTML = register_name;

    nextNode = $(`<button id="next" >다음</button>`);
    nextNode.css({ "z-index": 1, left: $(`#next`).offset().left });
    nextNode.css({ position: "absolute" });
    cancelNode = $(`<button id="next" >취소</button>`);
    cancelNode.css({ "z-index": 1, left: $(`#cancel`).offset().left });
    cancelNode.css({ position: "absolute" });

    $(`.parent`).append(nextNode);
    $(`.parent`).append(cancelNode);

    for (let i = 0; i < 50; i++) {
        node = $(`<div class="div first new" id="${i}_table">
                <span contenteditable="false">n</span>번 테이블
             </div>`);
        node.css({ "z-index": i, left: $(`#_table`).offset().left });
        node.css({ position: "absolute" });
        $(`.parent`).append(node);
    }

    for (let i = 0; i < 3; i++) {
        node = $(
            `<div class="div second new" id="${i}_entrance">입<br />구</div>`
        );
        node.css({ "z-index": i, left: $(`#_entrance`).offset().left });
        node.css({ position: "absolute" });
        $(`.parent`).append(node);
    }
    for (let i = 0; i < 3; i++) {
        node = $(`<div class="div third new" id="${i}_exit">출<br />구</div>`);

        node.css({ "z-index": i, left: $(`#_exit`).offset().left });
        node.css({ position: "absolute" });
        $(`.parent`).append(node);
    }
    for (let i = 0; i < 2; i++) {
        node = $(`<div class="div fourth new" id="${i}_kitchen">주방</div>`);

        node.css({ "z-index": i, left: $(`#_kitchen`).offset().left });
        node.css({ position: "absolute" });
        $(`.parent`).append(node);
    }
    for (let i = 0; i < 3; i++) {
        node = $(`<div class="div fifth new" id="${i}_toilet">화장실</div>`);

        node.css({ "z-index": i, left: $(`#_toilet`).offset().left });
        node.css({ position: "absolute" });
        $(`.parent`).append(node);
    }
    for (let i = 0; i < 10; i++) {
        node = $(`<div class="div sixth new" id="${i}_room">
                <span contenteditable="false">n</span>번 룸
             </div>`);
        node.css({ "z-index": i, left: $(`#_room`).offset().left });
        node.css({ position: "absolute" });
        $(`.parent`).append(node);
    }

    let tables = $(".first.new");
    let entrances = $(".second.new");
    let exits = $(".third.new");
    let kitchens = $(".fourth.new");
    let toilets = $(".fifth.new");
    let rooms = $(".sixth.new");
    $(".origin").remove();
    let blocks = $(".div");

    //테이블,입구, 출구, 주방, 화장실, 룸 블럭에 마우스 이벤트 달기
    $(".new").on("mousedown", function (e) {
        let d = this;
        down(e, d);
    });
    $(".new").on("mouseup", function (e) {
        up(e);
    });
    $(".new").on("mousemove", function (e) {
        // console.log(e);
        move(e);
    });
    for (let i = 0; i < blocks.length; i++) {
        block_arr[i] = blocks[i];
    }
    for (let i = 0; i < tables.length; i++) {
        table_arr[i] = tables[i];
    }
    for (let i = 0; i < entrances.length; i++) {
        entrance_arr[i] = entrances[i];
    }
    for (let i = 0; i < exits.length; i++) {
        exit_arr[i] = exits[i];
    }
    for (let i = 0; i < kitchens.length; i++) {
        kitchen_arr[i] = kitchens[i];
    }
    for (let i = 0; i < toilets.length; i++) {
        toilet_arr[i] = toilets[i];
    }
    for (let i = 0; i < rooms.length; i++) {
        room_arr[i] = rooms[i];
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
nextNode.on("click", click_next);
cancelNode.on("click", click_cancel);
// next.addEventListener("click", click_next);
// cancel.addEventListener("click", click_cancel);
