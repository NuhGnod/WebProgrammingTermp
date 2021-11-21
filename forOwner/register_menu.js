function init() {
    let name = localStorage.getItem("register_name");
    let place_name = document.getElementById("place_name");
    place_name.innerHTML = name;
}
init();
