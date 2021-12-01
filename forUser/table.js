// console.log(opener.document.referrer);
let cancel = document.getElementById("cancel");
let next = document.getElementById("next");

function click_item() {
    console.log(this);
    //각 좌석들은 선택했을 때의 함수
    if (this.className != "item green") {
        //녹색 좌석만 선택가능.
        alert(`녹색 좌석만 선택가능합니다.`);
        return;
    }
    let table_info = document.getElementById("table_info"); //선택된 좌석의 번호를 화면에 보여준다.
    table_info.innerHTML = this.innerHTML;
    // console.log(`item`);
    alert(table_info.innerHTML + "이 선택되었습니다.");
}
function init() {
    //화면 초기상태
    //info 는 배열 형태로 받아와진다.
    let info = sessionStorage.getItem("restraunt_info"); //선택된 가게의 이름을 메인로고 아래에 보여준다.
    info = JSON.parse(info);
    let place_name = info[3];
    document.getElementById("place_name").innerHTML = place_name;
    let timestamp = info[4];
    console.log(timestamp);
    db.collection("Table_infos")
        .get()
        .then((q) => {
            q.forEach((d) => {
                if (d.id == timestamp) console.log(`CORRECT`);
            });
        });
    //db에서 테이블 정보를 받아와 화면을 구성한다.
    let infoBlocks;
    let infoIdxs;
    let infoLefts;
    let infoTops;
    db.collection("Table_infos")
        .doc(timestamp)
        .get()
        .then((doc) => {
            infoBlocks = doc.data()._infoBlock; //배열형태.
            infoIdxs = doc.data()._infoIdx;
            infoLefts = doc.data()._infoLeft;
            infoTops = doc.data()._infoTop;
        })
        .then(() => {
            for (let i = 0; i < infoBlocks.length; i++) {
                let node;
                if (infoBlocks[i].trim() == "테이블") {
                    node = $(
                        `<div class="div first new" id="${i}">${infoBlocks[i] //id값은 각 배열의 index를 의미.나중에 테이블현황을 위함.
                            .trim()}</div>`
                    );
                }
                if (infoBlocks[i].trim() == "입구") {
                    node = $(
                        `<div class="div second new" id="${i}">${infoBlocks[
                            i
                        ].trim()}</div>`
                    );
                }
                if (infoBlocks[i].trim() == "출구") {
                    node = $(
                        `<div class="div third new" id="${i}">${infoBlocks[
                            i
                        ].trim()}</div>`
                    );
                }
                if (infoBlocks[i].trim() == "주방") {
                    node = $(
                        `<div class="div fourth new" id="${i}">${infoBlocks[
                            i
                        ].trim()}</div>`
                    );
                }
                if (infoBlocks[i].trim() == "화장실") {
                    node = $(
                        `<div class="div fifth new" id="${i}">${infoBlocks[
                            i
                        ].trim()}</div>`
                    );
                }
                if (infoBlocks[i].trim() == "룸") {
                    node = $(
                        `<div class="div sixth new" id="${i}">${infoBlocks[
                            i
                        ].trim()}</div>`
                    );
                }
                console.log(infoBlocks[i].trim());
                node.css({
                    "z-index": 1,
                    left: infoLefts[i],
                    top: infoTops[i],
                });
                node.on("click", click_item); //각 좌석에 click_item 함수를 달아준다.

                $(".border").append(node);
            }
        });
}
function click_cancel() {
    //취소버튼을 눌렀을 떄, 이전페이지로 돌아간다.
    if (confirm("입력한 정보가 모두 사라집니다. 취소하시겠습니까?") == true) {
        //취소하면, 메인화면으로 이동해야하고, 모든 localStorage 를 삭제한다.
        console.log("ASD");
        history.go(-1);

        sessionStorage.removeItem("table_info");
        sessionStorage.removeItem("restraunt_info");
        // alert("");
    } else {
        console.log("###");
    }
    console.log("########");
}
function click_next() {
    //좌석 선택후, 메뉴페이지로 이동한다.
    let table_info = document.getElementById("table_info").innerHTML;
    sessionStorage.setItem("table_info", table_info);
    open("./menu.html", "_self");
}
init();
next.addEventListener("click", click_next);
cancel.addEventListener("click", click_cancel);
