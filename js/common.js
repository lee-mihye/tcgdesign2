// main.js
document.addEventListener("DOMContentLoaded", function () {
    //AOS 세팅
    AOS.init({
        offset: 120,
        delay: 0,
        duration: 400,
        easing: "linear",
    });



    //햄버거메뉴 영역
    $(".menu_btn").click(function () {
        $(this).toggleClass("on");
        $(this).find("span").toggleClass("on");
        $(".menu_link").toggleClass("on");
    });

}); ////////////////////js///////////////////////
