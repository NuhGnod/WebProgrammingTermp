let option = document.getElementById("option");
let my_page = document.getElementById("my_page");
let close_option = document.getElementById("close_option");
let close_my_page = document.getElementById("close_my_page");
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
if (navigator.geolocation) {
    //위치 정보를 얻기
    navigator.geolocation.getCurrentPosition(function (pos) {
        console.log("위도 " + pos.coords.latitude);
        console.log("경도 " + pos.coords.longitude);
        var container = document.getElementById("map"); //지도가 보여질 map div
        var options = {
            center: new kakao.maps.LatLng(36.3635948, 127.3490568),
            level: 3,
        };
        var places = new kakao.maps.services.Places(); //검색 기능을 위한 api
        map = new kakao.maps.Map(container, options); //초기에보여질 지도
        option = {};
        var callback = function (result, status, pagination) {
            //kakao map api 를 사용하기위한 callback함수

            if (status === kakao.maps.services.Status.OK) {
                if (pagination.totalCount != 0) {
                    //검색 결과가 있는경우
                    console.log(`callback`);

                    $("ul").children().remove();
                    console.log(result);
                    option = {
                        //option 파라미터로 활용.
                        center: new kakao.maps.LatLng(result[0].y, result[0].x), //검색된 결과의 경도 위도 값으로 지도를 초기화
                        level: 3,
                    };
                    map = new kakao.maps.Map(container, option);
                    for (let i = 0; i < result.length; i++) {
                        let id = JSON.stringify(result[i]);
                        // id = id.substring(1, id.length);
                        // id = id.substring(0, id.length - 1);
                        // console.log(id);

                        $("ul").append(
                            `<li class="li" id='${id}'>${result[i].place_name}</li>`
                        );
                    }
                    $(".li").on("click", click_li);
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
            }
        };
        let search = document.getElementById("search");
        let key = "";
        search.addEventListener("click", function () {
            //키워드 검색하는 함수
            key = document.getElementById("search_restraunt").value;
            console.log(key);
            if (!key) {
                alert(`검색어를 입력해주세요.`);
                return;
            }
            places.keywordSearch(key, callback, op);
        });
        let op = {
            location: new kakao.maps.LatLng(36.3635948, 127.3490568),
            radius: 5000,
        };
    });
} else {
    alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
}
function click_li() {
    console.log(this);
    open("./table.html");
    let info = [];

    localStorage.setItem("restraunt_info", this.id);
    // console.log(opener.document.referrer);
}
function click_option() {
    //옵션 설정 (이미지) 누르기
    let div = document.getElementById("option_div");
    div.style.display =
        div.style.display == "inline-block" ? "none" : "inline-block";
}
function click_my_page() {
    //마이페이지 누르기
    let div = document.getElementById("my_page_div_wrapper");
    div.style.display =
        div.style.display == "inline-block" ? "none" : "inline-block";
}
function search() {}

option.addEventListener("click", click_option);
close_option.addEventListener("click", click_option);
my_page.addEventListener("click", click_my_page);
close_my_page.addEventListener("click", click_my_page);
