var str = '张大宝，生日快乐。<br>你是我的开心果，<br>很高兴遇见你。';
var i = 0;
var j = 0;
var word = document.getElementById('word');
var wordBackground = document.getElementById('wordBackground');
var wish = document.getElementById('wish');
var attention = document.getElementById('attention');
var timer = document.getElementById('timer');
var initOpacity = 0.0;

word.style.marginTop = document.documentElement.clientHeight / 3 + 'px';
word.style.marginLeft = document.documentElement.clientWidth * 0.15 + 'px';
wordBackground.style.marginTop = document.documentElement.clientHeight / 3 - 5 + 'px';
wordBackground.style.marginLeft = document.documentElement.clientWidth * 0.15 + 'px';
wish.style.marginLeft = document.documentElement.clientWidth * 0.15 + 'px';
wish.style.marginTop = document.documentElement.clientHeight / 3 + 150 + 'px';

timer.style.marginTop = document.documentElement.clientHeight / 3 + 230 + 'px';
timer.style.marginLeft = document.documentElement.clientWidth * 0.15 + 'px';

attention.style.marginTop = document.documentElement.clientHeight / 3 + 370 + 'px';
attention.style.marginLeft = document.documentElement.clientWidth * 0.15 + 'px';

wish.style.opacity = initOpacity;
timer.style.opacity = initOpacity;
attention.style.opacity = initOpacity;

timer.style.color = '#fa796f';

function typing() {
    if (i <= str.length) {
        word.innerHTML = str.slice(0, i++) + '_';
        var time = Math.random() > 0.7 ? 50 : 300;
        setTimeout(typing, time); //递归调用
    } else {
        wordEnd();
    }
}

function wordEnd() {
    if (j % 2 == 0) {
        word.innerHTML = str + '_';
    } else {
        word.innerHTML = str + ' ';
    }
    j++;
    setTimeout(wordEnd, 1000);
}

function leftTimer(year, month, day, hour, minute, second) {
    var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数 
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 
    var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 
    days = checkTime(days);
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    // setInterval("leftTimer(2017,10,28,0,0,0)",1000); 
    timer.innerHTML = "From 17 To <span style='font-size:40px;'>∞</span> &nbsp;:<br>(&nbsp;" + days + " days&nbsp;&nbsp;&nbsp;" + hours + " hours&nbsp;&nbsp;&nbsp;" + minutes + " minutes&nbsp;&nbsp;&nbsp;" + seconds + " seconds&nbsp;)";
}

function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


setTimeout(typing, 1500);

setTimeout(function() {
    setInterval("leftTimer(2017,2,3,0,0,0)", 1000);
}, 1500)

//实现淡入效果
setTimeout(function() {
    var i = setInterval(function() {
        wish.style.opacity = initOpacity;
        timer.style.opacity = initOpacity;
        attention.style.opacity = initOpacity - 0.7;
        if (initOpacity < 1.5) {
            initOpacity += 0.01;
        }
        if (initOpacity >= 1.49) {
            clearInterval(i);
        }
        // leftTimer(2018,4,17,0,0,0)
    }, 25);

}, 10000);

// setTimeout(function () {
//     setInterval("leftTimer(2018,4,17,0,0,0)",1000);
// },10000)
// leftTimer(2017,10,28,0,0,0);