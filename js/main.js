document.addEventListener("DOMContentLoaded", function () {
    Splitting();

    gsap.registerPlugin(ScrollTrigger); //SrollTrigger를 불러온다.

    ScrollTrigger.matchMedia({
        // large
        "(min-width: 960px)": function () {
            // 섹션2 설정
            var reveal = gsap.utils.toArray(".reveal");
            reveal.forEach((text) => {
                ScrollTrigger.create({
                    // markers: true,
                    trigger: text,
                    toggleClass: "active",
                    start: "top 90%",
                    end: "bottom -50%",
                });
            });

            var reveal_2 = gsap.utils.toArray(".reveal_2");
            reveal_2.forEach((textElement) => {
                ScrollTrigger.create({
                    //markers: true,
                    trigger: textElement,
                    toggleClass: "active",
                    start: "top 90%",
                    end: "170% 0%", //앞에꺼가 end, 뒤에꺼가 scroll-end
                });
            });
            /////////////////////// 섹션2 end///////////////////////



            // 섹션3 설정
            // 큰글씨 순서대로 나타나기
            gsap.set(".section3 .t1, .section3 .t2, .section3 .t3", { opacity: 0, x: 200 });

            gsap.to(".section3 .t1", {
                //애니메이션을 적용할 개체를 선택
                scrollTrigger: {
                    // markers: true,
                    trigger: ".section3 .title", //스크롤을 감지할 대상의 selector 기준. trigger가 뷰포트 안에 들어오면 해당 애니메이션이 실행됌
                    scrub: true, // 되감기 기능
                    start: "0% 100%", //trigger의 10% 지점과 viewport의 90% 지점이 만나면 애니메이션 시작 / 앞에꺼가 start, 뒤에꺼가 scroll-start
                    end: "40% 50%", //trigger의 100% 지점과 viewport의 100% 지점이 만나면 애니메이션 종료 / 앞에꺼가 end, 뒤에꺼가 scroll-end
                },
                opacity: 1,
                x: 0,
                duration: 1,
            });
            gsap.to(".section3 .t2", {
                scrollTrigger: {
                    // markers: true,
                    trigger: ".section3 .title",
                    scrub: true,
                    start: "30% 80%",
                    end: "70% 60%",
                },
                opacity: 1,
                x: 0,
                duration: 1,
            });
            gsap.to(".section3 .t3", {
                scrollTrigger: {
                    // markers: true,
                    trigger: ".section3 .title",
                    scrub: true,
                    start: "60% 80%",
                    end: "130% 100%",
                },
                opacity: 1,
                x: 0,
                duration: 1,
            });
            /////////////////////// 섹션3 end///////////////////////
      


            // 섹션5 설정
            gsap.to(".section5 .reveal_img .animation", { //움직일 대상의 selector
                scrollTrigger: {
                    //markers: true, // trigger의 시작, 끝 지점을 보여줌 (디버깅용)
                    trigger: ".section5", // 스크롤을 감지할 대상의 selector
                    start: "0% 100%", // trigger의 0% 지점과 viewport의 0% 지점이 만나면 애니메이션 시작
                    end: "30% 100%", // trigger의 100% 지점과 viewport의 100% 지점이 만나면 애니메이션 종료
                    scrub: 1, // 반대로 스크롤할때도 애니메이션을 반대로 적용할지 여부
                },
                ease: "none", // 애니메이션의 속도 곡선
                transform: "translateX(0)", // 애니메이션의 속성
            });

            /////////////////////// 섹션5 end///////////////////////



            // 섹션6 설정
            //text_marquee
            var containers = $(".marquee");
            if (containers.length) {
                containers.each(function () {
                    var container = $(this);

                    // 화면 너비보다 텍스트 너비가 작을 경우, 텍스트를 화면 너비에 맞게 복사하여 채움
                    if (container.find(".scrolling-text").outerWidth() < $(window).width()) {
                        var windowToScrolltextRatio = Math.round($(window).width() / container.find(".scrolling-text").outerWidth()),
                            scrollTextContent = container.find(".scrolling-text .scrolling-text-content").text(),
                            newScrollText = "";
                        for (var i = 0; i < windowToScrolltextRatio; i++) {
                            newScrollText += " " + scrollTextContent;
                        }
                        container.find(".scrolling-text .scrolling-text-content").text(newScrollText);
                    }

                    // 변수 및 설정 초기화
                    var scrollingText = container.find(".scrolling-text"),
                        scrollingTextWidth = scrollingText.outerWidth(),
                        scrollingTextHeight = scrollingText.outerHeight(true),
                        startLetterIndent = parseInt(scrollingText.find(".scrolling-text-content").css("font-size"), 10) / 4.8,
                        startLetterIndent = Math.round(startLetterIndent),
                        scrollAmountBoundary = Math.abs($(window).width() - scrollingTextWidth),
                        transformAmount = 0,
                        leftBound = 0,
                        rightBound = scrollAmountBoundary,
                        transformDirection = container.hasClass("left-to-right") ? -1 : 1,
                        transformSpeed = 200;

                    // 변환 속도 읽기
                    if (container.attr("speed")) {
                        transformSpeed = container.attr("speed");
                    }

                    // 무한 스크롤을 위해 텍스트 복사
                    container.append(scrollingText.clone().addClass("scrolling-text-copy"));
                    container.find(".scrolling-text").css({ position: "absolute", left: 0 });
                    container.css("height", scrollingTextHeight);

                    var getActiveScrollingText = function (direction) {
                        var firstScrollingText = container.find(".scrolling-text:nth-child(1)");
                        var secondScrollingText = container.find(".scrolling-text:nth-child(2)");

                        var firstScrollingTextLeft = parseInt(container.find(".scrolling-text:nth-child(1)").css("left"), 10);
                        var secondScrollingTextLeft = parseInt(container.find(".scrolling-text:nth-child(2)").css("left"), 10);

                        if (direction === "left") {
                            return firstScrollingTextLeft < secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
                        } else if (direction === "right") {
                            return firstScrollingTextLeft > secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
                        }
                    };

                    $(window).on("wheel", function (e) {
                        var delta = e.originalEvent.deltaY;

                        if (delta > 0) {
                            // 아래로 스크롤
                            transformAmount += transformSpeed * transformDirection;
                            container.find(".scrolling-text .scrolling-text-content").css("transform", "skewX(10deg)");
                        } else {
                            // 위로 스크롤
                            transformAmount -= transformSpeed * transformDirection;
                            container.find(".scrolling-text .scrolling-text-content").css("transform", "skewX(-10deg)");
                        }
                        setTimeout(function () {
                            container.find(".scrolling-text").css("transform", "translate3d(" + transformAmount * -1 + "px, 0, 0)");
                        }, 10);
                        setTimeout(function () {
                            container.find(".scrolling-text .scrolling-text-content").css("transform", "skewX(0)");
                        }, 500);

                        // 경계 처리
                        if (transformAmount < leftBound) {
                            var activeText = getActiveScrollingText("left");
                            activeText.css({ left: Math.round(leftBound - scrollingTextWidth - startLetterIndent) + "px" });
                            leftBound = parseInt(activeText.css("left"), 10);
                            rightBound = leftBound + scrollingTextWidth + scrollAmountBoundary + startLetterIndent;
                        } else if (transformAmount > rightBound) {
                            var activeText = getActiveScrollingText("right");
                            activeText.css({ left: Math.round(rightBound + scrollingTextWidth - scrollAmountBoundary + startLetterIndent) + "px" });
                            rightBound += scrollingTextWidth + startLetterIndent;
                            leftBound = rightBound - scrollingTextWidth - scrollAmountBoundary - startLetterIndent;
                        }
                    });
                });
            }/////////////////////// 섹션6 end///////////////////////



            // 섹션7 설정
            gsap.to(".section7 .reveal_img .animation", { //움직일 대상의 selector
                scrollTrigger: {
                    //markers: true, // trigger의 시작, 끝 지점을 보여줌 (디버깅용)
                    trigger: ".section7", // 스크롤을 감지할 대상의 selector
                    start: "0% 100%", // trigger의 0% 지점과 viewport의 0% 지점이 만나면 애니메이션 시작
                    end: "30% 100%", // trigger의 100% 지점과 viewport의 100% 지점이 만나면 애니메이션 종료
                    scrub: 1, // 반대로 스크롤할때도 애니메이션을 반대로 적용할지 여부
                },
                ease: "none", // 애니메이션의 속도 곡선
                transform: "translateX(0)", // 애니메이션의 속성
            });
            /////////////////////// 섹션7 end///////////////////////


            // 섹션8 설정
            gsap.to(".section8 .reveal_img .animation", { //움직일 대상의 selector
                scrollTrigger: {
                    //markers: true, // trigger의 시작, 끝 지점을 보여줌 (디버깅용)
                    trigger: ".section8 .reveal_img", // 스크롤을 감지할 대상의 selector
                    start: "0% 100%", // trigger의 0% 지점과 viewport의 0% 지점이 만나면 애니메이션 시작
                    end: "30% 100%", // trigger의 100% 지점과 viewport의 100% 지점이 만나면 애니메이션 종료
                    scrub: 1, // 반대로 스크롤할때도 애니메이션을 반대로 적용할지 여부
                },
                ease: "none", // 애니메이션의 속도 곡선
                transform: "translateY(0)", // 애니메이션의 속성
            });
            /////////////////////// 섹션7 end///////////////////////





















            

        },

        // medium
        "(min-width: 600px) and (max-width: 959px)": function () {
            // The ScrollTriggers created inside these functions are segregated and get
            // reverted/killed when the media query doesn't match anymore.
        },

        // small
        "(max-width: 599px)": function () {
            // The ScrollTriggers created inside these functions are segregated and get
            // reverted/killed when the media query doesn't match anymore.
        },

        // all
        all: function () {
            // ScrollTriggers created here aren't associated with a particular media query,
            // so they persist.
        },
    });
}); ///////////////////////////////js/////////////////////////////
