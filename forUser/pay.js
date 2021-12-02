let pay = document.getElementById("next");
let cancel = document.getElementById("cancel");
let order_menus; //주문 메뉴들
let order_prices; //주문 가격들
function init() {
    let total_sum = document.getElementById("total_sum"); //총 가격
    let sum = sessionStorage.getItem("sum");
    total_sum.innerHTML = sum;
    let num = sessionStorage.getItem("selectNum"); //메뉴 선택 갯수.
    let login_id = sessionStorage.getItem("login_id"); //현재 로그인 id
    let info = sessionStorage.getItem("restraunt_info"); //현재 검색한 가게 정보
    info = JSON.parse(info);
    let place_name = info[3]; //가게 이름
    db.collection("Users")
        .doc(login_id)
        .collection("order")
        .doc(place_name)
        .get()
        .then((doc) => {
            order_menus = doc.data()._orderMenu;
            order_prices = doc.data()._orderPrice;
        })
        .then(() => {
            for (let i = 0; i < num; i++) {
                let li = $(`<li id="menu${i}">${order_menus[i]}</li>`);
                $("ul").append(li);
            }
        });
}
init();
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
    let arrivalTime = document.getElementById("time").value;
    let require = document.getElementById("require").value;
    //결제 완료후 메인페이지로 이동, 로컬스토리지의 item을 지운다.
    let login_id = sessionStorage.getItem("login_id");
    let info = sessionStorage.getItem("restraunt_info");
    info = JSON.parse(info);
    let place_name = info[3];
    let table_info = sessionStorage.getItem("table_info");
    let address = info[0];
    let ownerId;
    let ownerTimestamp;
    let timestamp = new Date().getTime();
    timestamp = timestamp.toString();
    let orderSet = {};
    orderSet._orderMenu = order_menus;
    orderSet._orderPrice = order_prices;
    orderSet._require = require;
    orderSet._arrivalTime = arrivalTime;
    orderSet._table = table_info;
    let index = table_info //n번 테이블의 n
        .split(" ")[0]
        .substr(0, table_info.split(" ")[0].length - 1);
    let kindTable = table_info.split(" ")[1]; //n번 테이블 의 테이블
    let blocks;
    let idxs;
    let colors;
    console.log(index);
    console.log(kindTable);
    db.collection("Table_infos")
        .get()
        .then((query) => {
            query.forEach((doc) => {
                if (doc.data()._address == address) {
                    //내가 선택한 가게와 db의 가게정보 일치
                    ownerId = doc.data()._id;
                    ownerTimestamp = doc.id;
                    sessionStorage.setItem("owner_id", ownerId);
                    blocks = doc.data()._infoBlock;
                    idxs = doc.data()._infoIdx;
                    colors = doc.data()._infoColor;
                }
            });
        })
        .then(() => {
            console.log(`#1`);
            db.collection("Users") //owner db에 소비자의 주문시간을 doc로 주문 메뉴와 가격, 도착예정시간, 요구사항 저장
                .doc(ownerId)
                .collection("restaurants")
                .doc(ownerTimestamp)
                .collection("order")
                .doc(timestamp) //소비자의 주문 시간. 밀리 초 -> 주문 취소를 위함. 5분 = 300000 밀리초
                .set(orderSet)
                .then(() => {
                    console.log(`#2`);
                    orderSet._flag = true;
                    orderSet._orderTime = timestamp; //단위 밀리 초
                    orderSet._tableInfo = table_info;
                    db.collection("Users") //예약 색 바꾸기.
                        .doc(login_id)
                        .collection("order")
                        .doc(place_name)
                        .set(orderSet)
                        .then(() => {
                            console.log(blocks);
                            for (let i = 0; i < blocks.length; i++) {
                                if (
                                    blocks[i].trim() == kindTable.trim() &&
                                    idxs[i].trim() == index.trim()
                                ) {
                                    console.log("this");
                                    //일치
                                    colors[i] = "red"; //예약 완료.
                                }
                            }
                            //table info 변경.
                            db.collection("Users")
                                .doc(ownerId)
                                .collection("restaurants")
                                .doc(ownerTimestamp)
                                .collection("table_info")
                                .doc("table_info")
                                .update({ _infoColor: colors })
                                .then(() => {
                                    db.collection("Table_infos")
                                        .doc(ownerTimestamp)
                                        .update({ _infoColor: colors })
                                        .then(() => {
                                            console.log(colors);
                                            alert("결제되었습니다.");
                                            // sessionStorage.removeItem("table_info");
                                            // sessionStorage.removeItem("restraunt_info");
                                            open("./index.html", "_self");
                                        });
                                });
                        });
                });
        });
}
cancel.addEventListener("click", click_cancel);
pay.addEventListener("click", click_pay);
