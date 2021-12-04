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
    });
