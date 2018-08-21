// 粒子数组，粒子连线数组
var particulars=[];
var lines=[];
// 粒子数量
var particularNum=80;
// 画布
var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');

var clearParticular=false;
var blackHeight=0;

// 创建背景渐变
var grd=ctx.createLinearGradient(0,0,0,window.innerHeight);
grd.addColorStop(0,'#fad0c4');
grd.addColorStop(1,'#ff9a9e');
// 创建粒子，粒子连线
for(var i=0;i<particularNum;i++){
	createParticular();
}
createLine();
// 初始化画布尺寸，加载动画
init();

// 初始化画布尺寸，加载动画
function init() {
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;

	window.requestAnimationFrame(draw);
}

function createParticular() {
	var particular={
		x:Math.random()*window.innerWidth,
		y:Math.random()*window.innerHeight,
		vx:Math.random()-0.5,
		vy:Math.random()-0.5,
		// 小概率产生大粒子，大概率产生小粒子
		radius:Math.random()>0.9 ? Math.random()*5+3 : Math.random()*2+2,
		color:'#fff'
	};

	particulars.push(particular);
}

function createLine() {
	var temp;
	// 双重遍历粒子数组，创建粒子连线
	for(var i=0;i<particularNum;i++){
		for(var j=0;j<particularNum;j++){
			if(i==j){
				break;
			}

			temp={
				from:particulars[i],
				to:particulars[j]
			};
			// 删除重复的连线
			var flag=false;
			lines.forEach(function (e) {
				if(temp.from==e.from && temp.to==e.to){
					flag=true;
				}
				else if(temp.from==e.to && temp.to==e.from){
					flag=true;
				}
			});
			if(!flag){
				lines.push(temp);
			}
		}
	}
}

function draw() {
	if(!clearParticular){
		// 背景
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
		// 遍历粒子连线进行绘制
		lines.forEach(function (templine) {
			if(distance(templine.from,templine.to)<=200){
				ctx.strokeStyle='#fff';
				ctx.lineWidth=1;
				ctx.globalAlpha=1.0-distance(templine.from,templine.to)/200;
				ctx.beginPath();
				ctx.moveTo(templine.from.x,templine.from.y);
				ctx.lineTo(templine.to.x,templine.to.y);
				ctx.stroke();
			}
		});
		// 绘制粒子
		var temp;
		ctx.globalAlpha=1.0;
		for(var i=0;i<particularNum;i++){
			temp=particulars[i];

			temp.x+=temp.vx;
			temp.y+=temp.vy;

			if(temp.x>window.innerWidth || temp.x<0){
				temp.vx=-temp.vx;
			}
			if(temp.y>window.innerHeight || temp.y<0){
				temp.vy=-temp.vy;
			}

			ctx.fillStyle=temp.color;
			ctx.beginPath();
			ctx.arc(temp.x,temp.y,temp.radius,0,Math.PI*2,true);
			ctx.fill();
		}
	}else{
		ctx.fillStyle='rgba(0,0,0,0.01)';
		ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
	}
	window.requestAnimationFrame(draw);

}
// 计算两粒子距离
function distance(particular1,particular2) {
	return Math.sqrt(Math.pow((particular1.x - particular2.x), 2) + Math.pow((particular1.y - particular2.y), 2));
}