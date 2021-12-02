//  if (infoColors[i] == "red") color = "darkred";
//  if (infoColors[i] == "yellow") color = "khaki";
//  if (infoColors[i] == "green") color = "darkgreen";

function init() {
    //초기 상태 페이지
    // alert(`메인로고 클릭시 홈으로 이동합니다.`);

    //포스기 화면은 col개수를 6개로 맞춘다.
    //db에서 테이블 , 룸 등의 개수를 검색해 col이 6개가 되도록 화면 구성.
    let rowNum = 0;
    let login_id = sessionStorage.getItem("login_id");
    let selectTable = sessionStorage.getItem("select_table");
    let placeName = selectTable.split("(")[0].trim();
    console.log(selectTable);
    let address = selectTable
        .split("(")[1]
        .trim()
        .substr(0, selectTable.split("(")[1].trim().length - 1)
        .trim();
    document.getElementById("place_name").innerHTML = placeName;
    let timestamp;
    let blocks;
    let idxs;
    let colors;
    let menus = [];
    let infos = [];
    let prices = [];
    let orderTime = [];
    console.log(address);
    db.collection("Users")
        .doc(login_id)
        .collection("restaurants")
        .get()
        .then((query) => {
            query.forEach((doc) => {
                // console.log(doc.data()._address);
                if (doc.data()._address.trim() == address) {
                    timestamp = doc.id;
                }
            });
        })
        .then(() => {
            db.collection("Users")
                .doc(login_id)
                .collection("restaurants")
                .doc(timestamp)
                .collection("table_info")
                .doc("table_info")
                .get()
                .then((doc) => {
                    // console.log(timestamp);
                    // console.log(doc.data());
                    blocks = doc.data()._infoBlock;
                    idxs = doc.data()._infoIdx;
                    colors = doc.data()._infoColor;
                })
                .then(() => {
                    db.collection("Users")
                        .doc(login_id)
                        .collection("restaurants")
                        .doc(timestamp)
                        .collection("order")
                        .get()
                        .then((query) => {
                            query.forEach((doc) => {
                                orderTime.push(doc.id);
                                menus.push(doc.data()._orderMenu);
                                infos.push(doc.data()._table);
                                prices.push(cal_sum(doc.data()._orderPrice));
                            });
                        })
                        .then(() => {
                            let tr = $(`<tr></tr>`);
                            for (let i = 0; i < blocks.length; i++) {
                                let color = colors[i].trim();
                                let td;
                                let span2;
                                let span3;
                                // console.log(color);
                                if (color.length == 0) {
                                    // console.log(`null`);
                                    continue;
                                }
                                if (color == "green") {
                                    td = $(`<td class="green"></td>`);
                                }
                                if (color == "yellow") {
                                    td = $(`<td class="yellow"></td>`);
                                }
                                if (color == "red") {
                                    td = $(`<td class="red"></td>`);
                                    // console.log(orderTime);
                                    for (let j = 0; j < infos.length; j++) {
                                        let idx;
                                        let tb;
                                        idx = infos[j].split("번")[0].trim();
                                        tb = infos[j].split("번")[1].trim();
                                        let price = prices[j];
                                        console.log(idx + " " + tb);

                                        if (
                                            tb == blocks[i].trim() &&
                                            idx == idxs[i].trim()
                                        ) {
                                            let time = new Date(
                                                Number(orderTime[j])
                                            );
                                            console.log(time);
                                            let seatTime = `${
                                                time.getMonth() + 1
                                            }월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분`;

                                            span2 = $(
                                                `<span>${price} 원</span>`
                                            );
                                            span3 = $(
                                                `<span>${seatTime}</span>`
                                            );
                                        }
                                    }
                                }
                                let span1 = $(
                                    `<span>${idxs[i]}번 ${blocks[i]}</span>`
                                );
                                // console.log(td);
                                td.append(span1);
                                td.append("<br/>");
                                td.append(span2);
                                td.append("<br/>");
                                console.log(span3);
                                td.append(span3);
                                tr.append(td);
                            }
                            $("tbody").append(tr);
                        });
                });
        });
}
init();
function cal_sum(arr) {
    //합계 계산 함수.
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i]);
    }
    return sum;
}
let home = document.getElementById("home");
function click_home() {
    //흠으로 가기 버튼 클릭시 메인페이지로 이동한다.
    open("./index.html", "_self");
}
home.addEventListener("click", click_home);
