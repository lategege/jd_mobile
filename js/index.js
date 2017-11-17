/**
 * Created by xuhongliang on 2017/8/31.
 */
window.onload = function () {
    headerScroll();
    cutDownTime();
    banner();
}

/*
 * 获取导航栏高度
 * @param arg
 */


function headerScroll() {
    var navDom = document.querySelector(".jd-nav");
    var maxDistance = navDom.offsetHeight + navDom.offsetTop;
    var headerDom = document.querySelector(".jd-header");
    //注册onscroll事件
    window.onscroll = function () {
        //获取滚动距离，计算0-1百分数 设置顶部通栏的透明度
        var scrollDistance = window.document.body.scrollTop;
        var percent = scrollDistance / maxDistance;
        if (percent > 1) {
            percent = 1;
        }
        headerDom.style.backgroundColor = 'rgba(201,21,25,' + percent + ')';
    }
}

function cutDownTime() {
    var totalSec = 3 * 60 * 60;
    var liArray = document.querySelectorAll('.main-content:nth-child(1) .content-top li');

    var timer = setInterval(function () {
        if (totalSec == 0) {
            clearInterval(timer);
            return;
        }
        totalSec--;
        var hour = Math.floor(totalSec / 60 / 60);
        var min = Math.floor(totalSec % 3600 / 60);
        var sec = totalSec % 60;

        liArray[0].innerHTML = Math.floor(hour / 10);
        liArray[1].innerHTML = hour % 10;

        liArray[3].innerHTML = Math.floor(min / 10);
        liArray[4].innerHTML = min % 10;


        liArray[6].innerHTML = Math.floor(sec / 10);
        liArray[7].innerHTML = sec % 10;

    }, 1000);
}

function banner() {
    //获取屏幕宽度
    var width = document.body.clientWidth;

    var bannerContent = document.querySelector('.banner-images');
    var bannerLiArr = document.querySelectorAll('.banner-index li');
    bannerContent.style.transition = "all .3s";
    //定义index 记录
    var index = 1;

    var timer = setInterval(function () {
        index++;
        bannerContent.style.transition = "all .3s";
        console.log(bannerContent + "..." + index + "...." + width + "..." + bannerLiArr.length);
        //修改ul位置
        bannerContent.style.transform = "translateX(" + index * width * -1 + "px)";


    }, 2000);

    bannerContent.addEventListener("webkitTransitionEnd", function () {
        if (index == 9) {
            index = 1;
            //关闭过度 瞬间切换到第一张
            bannerContent.style.transition = "";
            bannerContent.style.transform = "translateX(" + index * width * -1 + "px)";
        }

        if(index==0){
            index = 8;
            //关闭过度 瞬间切换到第一张
            bannerContent.style.transition = "";
            bannerContent.style.transform = "translateX(" + index * width * -1 + "px)";
        }


        for (var i = 0; i < bannerLiArr.length; i++) {
            bannerLiArr[i].className = "";
        }
        bannerLiArr[index - 1].className = "current";
    });


    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    bannerContent.addEventListener("touchstart", function (event) {
        //关闭定时器，关闭过度效果
        clearInterval(timer);
        bannerContent.style.transition = "";
        startX = event.touches[0].clientX;
        console.log(startX);
    });

    bannerContent.addEventListener("touchmove", function (event) {
        moveX = event.touches[0].clientX - startX;
        bannerContent.style.transform = "translateX(" + (moveX + index * width * -1) + "px)";
        console.log(moveX);
    });

    bannerContent.addEventListener("touchend", function (event) {
        distanceX = moveX + distanceX;

        if (Math.abs(moveX) > width/2) {
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }
            bannerContent.style.transition = "all .3s";
            bannerContent.style.transform = "translateX(" + ( index * width * -1) + "px)";
        }else{
            bannerContent.style.transition = "all .3s";
            bannerContent.style.transform = "translateX(" + ( index * width * -1) + "px)";
        }

        timer = setInterval(function () {
            index++;
            bannerContent.style.transition = "all .3s";
            console.log(bannerContent + "..." + index + "...." + width + "..." + bannerLiArr.length);
            //修改ul位置


            bannerContent.style.transform = "translateX(" + index * width * -1 + "px)";


        }, 2000);

        console.log(moveX);
    });

}



