let menus;
let prices;
let checkMenus = [];
let checkPrices = [];
let sum = 0; //총 가격
function init() {
    //메뉴페이지 초기상태설정
    let info = sessionStorage.getItem("restraunt_info");
    info = JSON.parse(info);
    let place_name = info[3];
    let table_info = sessionStorage.getItem("table_info");

    let name = document.getElementById("place_name"); //선택한 가게의 이름을 보여준다.
    name.innerHTML = "가게 이름 : " + place_name;
    let table_num = document.getElementById("table_info"); //몇번 좌석인지 알려준다.
    table_num.innerHTML = "선택 좌석 : " + table_info;
    let timestamp = sessionStorage.getItem("timestamp");
    //db에서 menu price를 가져옴.

    db.collection("Table_infos")
        .doc(timestamp)
        .collection("Menu_infos")
        .doc(timestamp)
        .get()
        .then((doc) => {
            menus = doc.data()._infoMenu;
            prices = doc.data()._infoPrice;
            console.log(doc.data());
            console.log(doc.data()._infoPrice);
            console.log(menus);
        })
        .then(() => {
            for (let i = 0; i < menus.length; i++) {
                let tr = $(`<tr></tr>`);
                let menu = $(`<td id="menu${i}">${menus[i]}</td>`); //메뉴td
                let price = $(`<td id="price${i}">${prices[i]}</td>`); //가격td
                let checkBox = $(
                    `<td><input id="checkbox${i}" type="checkbox" name="checkbox"></input></td>`
                ); //체크박스td                tr.append(menu);
                tr.append(menu);
                tr.append(price);
                tr.append(checkBox);
                $("tbody").append(tr);
            }
            $("input").on("click", cal_sum);
        });
}
init();
let cancel = document.getElementById("cancel");
let next = document.getElementById("next");
function cal_sum() {
    //선택한 메뉴들 가격합친 총 가격
    console.log(this);

    let idx = this.id.charAt(this.id.length - 1);
    let menu = menus[idx];
    let price = prices[idx];
    console.log(this.checked);
    let checked = this.checked;
    if (checked) {
        //체크됬다면
        console.log("ASD");
        checkMenus.push(menu);
        checkPrices.push(price);
        sum += Number(prices[idx]);
    } else {
        //체크 안된사애
        sum -= Number(prices[idx]);
    }
    let total_sum = document.getElementById("total_sum");

    total_sum.innerHTML = sum;
}
function click_cancel() {
    //취소버튼을 눌렀을 떄, 이전 페이지로 돌아간다.
    if (confirm("입력한 정보가 모두 사라집니다. 취소하시겠습니까?") == true) {
        // alert("");
    } else {
        return;
    }

    history.go(-1);
    // close();
}
function click_next() {
    let login_id = sessionStorage.getItem("login_id");
    let info = sessionStorage.getItem("restraunt_info");
    info = JSON.parse(info);
    let place_name = info[3];
    let table_info = sessionStorage.getItem("table_info");
    let infoSet = {};
    infoSet._flag = false; //실제로 주문 했는지 여부, 결게까지 진행되면 true로 바뀜
    infoSet._orderMenu = checkMenus;
    infoSet._orderPrice = checkPrices;
    infoSet._tableInfo = table_info;
    db.collection("Users")
        .doc(login_id)
        .collection("order")
        .doc(place_name)
        .set(infoSet)
        .then(() => {
            alert(`메뉴선택이 완료되었습니다.`);
            sessionStorage.setItem("sum", sum);
            sessionStorage.setItem("selectNum", checkMenus.length);
        })
        .then(() => {
            //메뉴들을 선택하고, 결제페이지로 넘어간다.
            open("./pay.html", "_self");
        });
}

cancel.addEventListener("click", click_cancel);
next.addEventListener("click", click_next);
