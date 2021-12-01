let option = document.getElementById("option"); //옵션 설정 이미지버튼
let my_page = document.getElementById("my_page"); //마이페이지 버튼
let close_option = document.getElementById("close_option"); //옵션 설정 닫기 버튼
let close_my_page = document.getElementById("close_my_page"); //마이페이지 닫기 버튼
let nextBtn = document.getElementById("nextBtn"); //다음페이지 버튼
let prevBtn = document.getElementById("prevBtn"); //이전페이지 버튼
let move = document.getElementById("move"); //이동 버튼
let login = document.getElementById("login"); //로그인 버튼
let logout = document.getElementById("logout"); //로그아웃 버튼
let singup = document.getElementById("signup"); //회원가입 버튼
let container = document.getElementById("map"); //지도가 보여질 map div
var map;
let markers = []; //마커들을 제어하기 위한 배열.
let cMarker; //내 위치 마커.
let blue_mark;
let red_mark;
let yellow_mark;
let blue_imageSrc = "";
let red_imageSrc = "";
let yellow_imageSrc = ";";

function init() {
    //페이지의 이미지를 firebase storage에서 가져와 로딩한다.

    storageRef //firebase storage api 사용.
        .child("images/" + `restraunt_png.png`) //메인로고
        .getDownloadURL()
        .then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
                var blob = xhr.response;
            };
            xhr.open("GET", url);

            // Or inserted into an <img> element:
            document.getElementById("main_logo").src = url;
        })
        .catch(function (error) {
            console.log(error);
        });
    storageRef
        .child("images/" + `close.png`) //닫기 버튼
        .getDownloadURL()
        .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
                var blob = xhr.response;
            };
            xhr.open("GET", url);

            document.getElementById("close_option").src = url;
            document.getElementById("close_my_page").src = url;
        })
        .catch(function (error) {
            console.log(error);
        });
    storageRef
        .child("images/" + `option.png`) //옵션 버튼
        .getDownloadURL()
        .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
                var blob = xhr.response;
            };
            xhr.open("GET", url);

            document.getElementById("option").src = url;
        })
        .catch(function (error) {
            console.log(error);
        });

    if (navigator.geolocation) {
        //위치 정보를 얻기
        navigator.geolocation.getCurrentPosition(function (pos) {
            let curOptions = {
                //사용자의 현재위치 웹으로 geolocation을 사용하면 부정확하다.

                center: new kakao.maps.LatLng(
                    pos.coords.latitude,
                    pos.coords.longitude
                ),
                level: 4, //크기가 클수록 넓은 영역이 보여진다.
            };
            var places = new kakao.maps.services.Places(); //검색 기능을 위한 api
            map = new kakao.maps.Map(container, curOptions); //초기에보여질 지도

            let imageSize = new kakao.maps.Size(40, 40); //마커 이미지 크기
            let imageOption = { offset: new kakao.maps.Point(21, 36) }; //마커내 이미지위치

            blue_mark = new kakao.maps.MarkerImage( //파란색 마커를 생성한다. //검색된 가게를 나타냄
                blue_imageSrc,
                imageSize,
                imageOption
            );

            red_mark = new kakao.maps.MarkerImage( //빨간색 마커를 생성한다. 현재 내 위치를 나타냄
                red_imageSrc,
                imageSize,
                imageOption
            );

            yellow_mark = new kakao.maps.MarkerImage( //노란색 마커를 생성한다. 사용자가 클릭한 가게를 나타냄
                yellow_imageSrc,
                imageSize,
                imageOption
            );

            let marker = new kakao.maps.Marker({
                //사용자 위치 마커
                //지도에 마커 생성.
                map: map,
                position: new kakao.maps.LatLng(
                    pos.coords.latitude,
                    pos.coords.longitude
                ),
                image: red_mark,
            });
            //사용자 위치 마커 식별을 위해 인포윈도우 올림.
            let content = `<div class ="marker_center"><span class="left"></span><span>현재 나의 위치!</span><span class="right"></span></div>`;
            let removeAble = true;

            let infoWindow = new kakao.maps.InfoWindow({
                content: content,
                removable: removeAble,
            });

            infoWindow.open(map, marker);

            cMarker = marker;
            // marker.setMap(map); //현재 내위치 마커 표시.
            option = {};
            let key = "";
            var callback = function (result, status, pagination) {
                //kakao map api 를 사용하기위한 callback함수

                if (status === kakao.maps.services.Status.OK) {
                    console.log(`asdasdasdsadasd`);
                    if (pagination.totalCount != 0) {
                        //검색 결과가 있는경우
                        console.log(`callback`);

                        $("ul").children().remove(); //영억을 모두 지우고 새 결과인 목록들로 다시 구성하기 위함.
                        console.log(result);
                        option = {
                            //option 파라미터로 활용.
                            center: new kakao.maps.LatLng(
                                result[0].y,
                                result[0].x
                            ), //검색된 결과의 경도 위도 값으로 지도를 초기화
                            level: 3,
                        };
                        //검색된 결과의 첫번째 검색값으로 지도 위치를 이동시킨다.
                        setCenter(result[0].x, result[0].y);

                        for (let i = 0; i < result.length; i++) {
                            let id = JSON.stringify(result[i]);
                            //검색 된 모든 가게위치를 마커로 달아주다.
                            addMarker(
                                new kakao.maps.LatLng(result[i].y, result[i].x),
                                blue_mark,
                                id
                            );

                            //검색한 결과인 result 를 li태그로 목록영억에 달아준다.
                            $("ul").append(
                                `<li class="li" id='${id}'>${result[i].place_name}</li>`
                            );
                        }
                        $(".li").on("click", click_li); //각 li에 click_li함수를 달아준다.
                    } else {
                    }

                    nextBtn.addEventListener("click", function () {
                        // 속성 값으로 다음 페이지가 있는지 확인하고
                        if (pagination.hasNextPage) {
                            $("ul").children().remove();
                            pagination.nextPage();
                            // 있으면 다음 페이지를 검색한다.

                            console.log(result);
                        }
                    });

                    prevBtn.addEventListener("click", function () {
                        //속성 값으로 이전 페이지가 있는지 확인하고
                        if (pagination.hasPrevPage) {
                            $("ul").children().remove();
                            pagination.prevPage();

                            console.log(result);
                            // 있으면 이전 페이지를 검색한다.
                        }
                    });
                } else {
                    let search_results = [];
                    //검색 목록과 일치하는 db의 가게리스트를 받아온다.
                    db.collection("Table_infos")
                        .get()
                        .then((query) => {
                            query.forEach((doc) => {
                                console.log(key);
                                console.log(doc.data()._placeName);
                                if (doc.data()._placeName == key) {
                                    //검색 키워드와 일치.
                                    let arr = [];
                                    arr.push(doc.data()._address); //주소
                                    arr.push(doc.data()._name); //대표자 이름
                                    arr.push(doc.data()._phoneNumber); //가게번호
                                    arr.push(doc.data()._placeName); //가게이름
                                    arr.push(doc.id); //timestamp -> 문서 id
                                    search_results.push(arr);
                                }
                            });
                        })
                        .then(() => {
                            console.log(search_results);
                            $("ul").children().remove(); //영억을 모두 지우고 새 결과인 목록들로 다시 구성하기 위함.
                            for (let i = 0; i < search_results.length; i++) {
                                console.log(search_results[i]);
                                let id = JSON.stringify(search_results[i]);
                                //검색 된 모든 가게위치를 마커로 달아주다.

                                //검색한 결과인 result 를 li태그로 목록영억에 달아준다.
                                $("ul").append(
                                    `<li class="li" id='${id}'>${search_results[i][3]} (${search_results[i][0]})</li>`
                                );
                                $(".li").on("click", click_li); //각 li에 click_li함수를 달아준다.
                            }
                        });
                }
            };
            let search = document.getElementById("search");

            search.addEventListener("click", function () {
                hideMarkers(); //지도의 마커 초기화 후 검색 시작.
                //키워드로 검색하는 함수
                key = document.getElementById("search_restraunt").value;
                console.log(key);
                if (!key) {
                    //검색어가 없는경우
                    alert(`검색어를 입력해주세요.`);
                    return;
                } //검색어가 있다면 해당 검색어로 카카오맵에서 검색시작.
                places.keywordSearch(key, callback, op);
            });
            let op = {
                //내 주소로 초기 지도 모습 설정
                location: new kakao.maps.LatLng(36.3635948, 127.3490568),
                radius: 5000,
            };
        });
    } else {
        alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
}
storageRef //firebase storage api 사용.
    .child("images/" + `large_blue_mark.png`) //blue_mark
    .getDownloadURL()
    .then(function (url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
            var blob = xhr.response;
        };
        xhr.open("GET", url);
        blue_imageSrc = url;
        console.log(blue_imageSrc);
    })
    .then(() => {
        storageRef //firebase storage api 사용.
            .child("images/" + `large_red_mark.png`) //red_mark
            .getDownloadURL()
            .then(function (url) {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open("GET", url);

                red_imageSrc = url;
            })
            .then(() => {
                storageRef //firebase storage api 사용.
                    .child("images/" + `large_yellow_mark.png`) //yellow_mark
                    .getDownloadURL()
                    .then(function (url) {
                        // `url` is the download URL for 'images/stars.jpg'

                        // This can be downloaded directly:
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = "blob";
                        xhr.onload = function (event) {
                            var blob = xhr.response;
                        };
                        xhr.open("GET", url);

                        yellow_imageSrc = url;
                    })
                    .then(() => {
                        init();
                    });
            });
    });

// var options = {이건 실제 내 주소.
//     center: new kakao.maps.LatLng(36.3635948, 127.3490568),
//     level: 3,
// };
function addMarker(position, image, id) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: position,
        image: image,
        clickable: true,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 생성된 마커를 배열에 추가합니다
    markers.push(marker);

    //마커 위의 인포윈도우 텍스트
    info = JSON.parse(id);
    let content = `<div style="padding:10px;">${info.place_name}</div>`;
    let removeAble = true;
    let infoWindow = new kakao.maps.InfoWindow({
        content: content,
        removable: removeAble,
    });
    kakao.maps.event.addListener(marker, "click", function () {
        clickMarker(marker);
        // 마커 위에 인포윈도우를 표시합니다
        infoWindow.open(map, marker);
        sessionStorage.setItem("restraunt_info", id);
    });
}
function clickMarker(marker) {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].getImage() != blue_mark) markers[i].setImage(blue_mark);
    }
    marker.setImage(yellow_mark);
}
function setMarkers(m) {
    //마커 제거를 위해 배열에 접근 하여 제거한다.
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(m);
    }
}
function hideMarkers() {
    // 검색버튼클릭시 모든 마커 제거후 다시 로드
    setMarkers(null);
}
function setCenter(x, y) {
    //지도 옮기기.
    // 지도 중심을 이동 시킵니다
    var moveLatLon = new kakao.maps.LatLng(y, x);

    map.setCenter(moveLatLon);
}
function click_login() {
    //로그인 버튼 클릭시 실행되는 함수, login페이지로 이동한다.
    //이미 로그인 되어있다면, alert창을 띄운다.

    open("./login.html", "_self");
}
function click_logout() {
    //로그아웃한다. 모든 스토리지의 item을 제거한다.
    localStorage.clear();
    sessionStorage.clear();
    //현재 화면을 새로고침.
    window.location.reload();
}
function click_signup() {
    //회원가입버튼을 누르면 실행되고, 회원가입 하는 페이지로 이동한다.
    open("./signup.html", "_self");
    // close();
}
function click_move() {
    open("./table.html", "_self"); //그 가게의 테이블 현황(모습)페이지로 넘어간다.
}
function click_li() {
    //검색결과로 보여지는 목록중 하나를 클릭 했을 시,
    // console.log(this);
    let info = [];
    info = JSON.parse(this.id);

    console.log(this);
    setCenter(info.x, info.y);
    sessionStorage.setItem("restraunt_info", this.id);
}
function click_option() {
    let login_flag;
    if (localStorage.getItem("auto_login")) {
        //자동 로그인 되있다면 로그인버튼 없앰 -> 로그인 되있는 상태이므로,
        login_flag = true;
    } else {
        login_flag = sessionStorage.getItem("login");
    } //로그인 여부.
    if (login_flag) {
        //로그인 되어있다면 옵션영억에서 로그인버튼은 안보이게 수정한다.
        document.getElementById("login").style.display = "none";
    }
    //옵션 설정 (이미지) 누르기
    let div = document.getElementById("option_div");
    div.style.display =
        div.style.display == "inline-block" ? "none" : "inline-block";
}
function click_my_page() {
    //옵션설정의 마이페이지 누르기
    let div = document.getElementById("my_page_div_wrapper");
    div.style.display =
        div.style.display == "inline-block" ? "none" : "inline-block";
}
function search() {}

option.addEventListener("click", click_option);
close_option.addEventListener("click", click_option);
my_page.addEventListener("click", click_my_page);
close_my_page.addEventListener("click", click_my_page);
login.addEventListener("click", click_login);
logout.addEventListener("click", click_logout);
singup.addEventListener("click", click_signup);
move.addEventListener("click", click_move);
