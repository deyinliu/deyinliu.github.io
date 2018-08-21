window.AudioContext = window.AudioContext || window.webkitAudioContext;
var time=0,clickTimes=0;
var wish1=document.getElementById('wish1');
var wish2=document.getElementById('wish2');
var wish3=document.getElementById('wish3');
var wish4=document.getElementById('wish4');
var wish5=document.getElementById('wish5');
var wish6=document.getElementById('wish6');
var changedColor='#f38077';
var normalColor='#fff';

(function () {
    if (!window.AudioContext) { 
        alert('能不能换个浏览器呢( ･´ω`･ )不然听不了音乐呢……');
        return;
    }
    
    // 创建新的音频上下文接口
    var audioCtx = new AudioContext();
    
    // 发出的声音频率数据，表现为音调的高低
    // Happy Birthday的频率
    var arrFrequency = [262,262,294,262,349,330,262,262,294,262,392,349,262,262,523,440,349,294,466,466,440,349,392,349];
    
    // 音调依次递增或者递减处理需要的参数
    var start = 0, direction = 1;
    
    document.onclick=function audioplay() {
        time++;
        if(time>=7){
            time=1;
            clickTimes++;
        }
        changeColor();
        // 当前频率
        var frequency = arrFrequency[start];
        // 如果到头，重头再来）
        if (!frequency) {
            start=0;
            frequency = arrFrequency[start];
        }
        // 改变索引，下一次hover时候使用
        start = start + direction;
        
        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        var oscillator = audioCtx.createOscillator();
        // 创建一个GainNode,它可以控制音频的总音量
        var gainNode = audioCtx.createGain();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode);
        // audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        gainNode.connect(audioCtx.destination);
        // 指定音调的类型，其他还有square|triangle|sawtooth
        oscillator.type = 'sine';
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.frequency.value = frequency;
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        // 0.01秒后音量为1
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
        // 音调从当前时间开始播放
        oscillator.start(audioCtx.currentTime);
        // 1秒内声音慢慢降低，是个不错的停止声音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
        // 1秒后完全停止声音
        oscillator.stop(audioCtx.currentTime + 1);

        if(clickTimes==3 && time==6){
            clearInit();
            
        }
    };
})();

function changeColor() {
    switch(time){
        case 1:
            wish1.style.color=changedColor;
            wish2.style.color=normalColor;
            wish3.style.color=normalColor;
            wish4.style.color=normalColor;
            wish5.style.color=normalColor;
            wish6.style.color=normalColor;
            break;
        case 2:
            wish1.style.color=normalColor;
            wish2.style.color=changedColor;
            wish3.style.color=normalColor;
            wish4.style.color=normalColor;
            wish5.style.color=normalColor;
            wish6.style.color=normalColor;
            break;
        case 3:
            wish1.style.color=normalColor;
            wish2.style.color=normalColor;
            wish3.style.color=changedColor;
            wish4.style.color=normalColor;
            wish5.style.color=normalColor;
            wish6.style.color=normalColor;
            break;
        case 4:
            wish1.style.color=normalColor;
            wish2.style.color=normalColor;
            wish3.style.color=normalColor;
            wish4.style.color=changedColor;
            wish5.style.color=normalColor;
            wish6.style.color=normalColor;
            break;
        case 5:
            wish1.style.color=normalColor;
            wish2.style.color=normalColor;
            wish3.style.color=normalColor;
            wish4.style.color=normalColor;
            wish5.style.color=changedColor;
            wish6.style.color=normalColor;
            break;
        case 6:
            wish1.style.color=normalColor;
            wish2.style.color=normalColor;
            wish3.style.color=normalColor;
            wish4.style.color=normalColor;
            wish5.style.color=normalColor;
            wish6.style.color=changedColor;
            break;
    }
}