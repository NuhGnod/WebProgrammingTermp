let cancel = document.getElementById("cancel"); //취소버튼
let place_name = document.getElementById("place_name"); //가게 이름
let origin_place_name = document.getElementById("origin_place_name"); //기존 가게 이름
let origin_place_number = document.getElementById("origin_place_number"); //기존 가게 번호
// let origin_place_address = document.getElementById("origin_place_address"); //기존 가게 주소
let origin_owner_name = document.getElementById("origin_owner_name"); //기존 주인 이름

let new_place_name = document.getElementById("new_place_name"); //새 가게 이름
let new_place_number = document.getElementById("new_place_number"); //새 가게 번호
// let new_place_address = document.getElementById("new_place_address"); //새 가게 주소
let new_owner_name = document.getElementById("new_owner_name"); //새 주인 이름

let place_name_modify = document.getElementById("place_name_modify"); //가게이름변경버튼
let place_number_modify = document.getElementById("place_number_modify"); //가게번호 변경버튼
// let place_address_modify = document.getElementById("place_address_modify"); //가게 주소 변경 버튼
let owner_name_modify = document.getElementById("owner_name_modify"); //가게주인이름변경버튼
let timestamp;
let oldPlaceName;
let oldPlaceNumber;
let oldPlaceAddress;
let oldOwnerName;
function click_cancel() {
    //이전페이지로이동
    history.go(-1);
}
function init() {
    let page_info = sessionStorage.getItem("restaurant_page_info");
    page_info = page_info.split("(");
    let placeName = page_info[0].trim();
    let address = page_info[1].substr(0, page_info[1].length - 1);
    place_name.innerHTML = placeName;
    let login_id = sessionStorage.getItem("login_id");
    db.collection("Users")
        .doc(login_id)
        .collection("restaurants")
        .get()
        .then((query) => {
            query.forEach((doc) => {
                if (doc.data()._address == address) {
                    timestamp = doc.id;
                    console.log(doc.data()._name);
                    oldPlaceName = doc.data()._place_name;
                    oldPlaceNumber = doc.data()._phone_number;
                    oldOwnerName = doc.data()._name;
                    oldPlaceAddress = doc.data()._address;
                    //db와 클릭 정보 일치
                    origin_owner_name.innerHTML = "(" + doc.data()._name + ")";
                    // origin_place_address.innerHTML =
                    //     "(" + doc.data()._address + ")";
                    origin_place_number.innerHTML =
                        "(" + doc.data()._phone_number + ")";
                    origin_place_name.innerHTML =
                        "(" + doc.data()._place_name + ")";
                }
            });
        });
}
init();
function click_modify() {
    //가게 정보 수정.
    let login_id = sessionStorage.getItem("login_id");
    let id = this.id;
    let target = "";
    let newWord = "";
    let docs = [];
    if (id == "place_name_modify") {
        let temp;
        //가게 이름
        newWord = new_place_name.value;
        db.collection("Users")
            .doc(login_id)
            .collection("restaurants")
            .doc(timestamp)
            .update({ _place_name: newWord })
            .then(() => {
                db.collection("Users")
                    .doc(login_id)
                    .collection("restaurants")
                    .doc(timestamp)
                    .collection("table_info")
                    .doc("table_info")
                    .update({ _placeName: newWord })
                    .then(() => {
                        db.collection("Users")
                            .get()
                            .then((doc) => {
                                docs.push(doc.id);
                            })
                            .then(() => {
                                for (let i = 0; i < docs.length; i++) {
                                    db.collection("Users")
                                        .doc(docs[i])
                                        .collection("order")
                                        .get()
                                        .then((doc) => {
                                            if (doc.id == oldPlaceName) {
                                                let data = doc.data();
                                                db.collection("Users")
                                                    .doc(doc[i])
                                                    .collection("order")
                                                    .doc(newWord)
                                                    .set(data);
                                            }
                                        })
                                        .then(() => {
                                            db.collection("Tables_infos")
                                                .get()
                                                .then((doc) => {
                                                    if (
                                                        doc.data()._address ==
                                                        oldPlaceAddress
                                                    ) {
                                                        temp = doc.id;
                                                    }
                                                })
                                                .then(() => {
                                                    db.collection(
                                                        "Tables_infos"
                                                    )
                                                        .doc(temp)
                                                        .update({
                                                            _placeName: newWord,
                                                        });
                                                });
                                        });
                                }
                            });
                    });
            });
    }
    if (id == "place_number_modify") {
        //가게 번호
        newWord = new_place_name.value;
        db.collection("Users")
            .doc(login_id)
            .collection("restaurants")
            .doc(timestamp)
            .update({ _phone_number: newWord })
            .then(() => {
                console.log("ok");
            });
    }
    // if (id == "place_address_modify") {
    //     //가게 주소
    //     newWord = new_place_name.value;
    //     db.collection("Users")
    //         .doc(login_id)
    //         .collection("restaurants")
    //         .doc(timestamp)
    //         .update({ _address: newWord })
    //         .then(() => {
    //             console.log("ok");
    //         });
    // }
    if (id == "owner_name_modify") {
        //주인 이름
        newWord = new_place_name.value;

        db.collection("Users")
            .doc(login_id)
            .collection("restaurants")
            .doc(timestamp)
            .update({ _name: newWord })
            .then(() => {
                console.log("ok");
            });
    }
}
place_name_modify.addEventListener("click", click_modify);
place_number_modify.addEventListener("click", click_modify);
// place_address_modify.addEventListener("click", click_modify);
owner_name_modify.addEventListener("click", click_modify);
cancel.addEventListener("click", click_cancel);
