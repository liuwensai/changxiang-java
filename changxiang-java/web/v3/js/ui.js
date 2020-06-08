(function(){
var lnks = document.body.querySelectorAll('[class^="btn_"],.slider li,.js-touch');
	for (var i = lnks.length - 1; i >= 0; i--) {
		lnks[i].addEventListener("touchstart", function(){this.classList.add("ontouch");}, false);
		lnks[i].addEventListener("touchend", function(){this.classList.remove("ontouch");}, false);
		lnks[i].addEventListener("touchcancel", function(){this.classList.remove("ontouch");}, false);
	};

var slider = document.body.querySelectorAll('.m-lottery_history,.m-lottery_moreHis');
if(slider.length !== 0 ){
	for (var i = slider.length - 1; i >= 0; i--) {
		slider[i].addEventListener("touchstart",function(e){
			var touch=e.touches[0];
			o_y=touch.pageY;
			this.addEventListener("touchmove",function(e){
				var touch=e.touches[0];
				if(touch.pageY - o_y > 30){
					$('.m-lottery_moreHis').css('margin-top','0');
				}else if(touch.pageY - o_y < -30){
					$('.m-lottery_moreHis').css('margin-top','-'+$('.m-lottery_moreHis').height()+'px');
				}
				e.preventDefault();
			},false);
		},false);
	};
	
}

})();





function sortNumber(a,b)
{
return a - b
}

function rnd(a,b){
	var _arr = [];
	while(_arr.length<b){
		var num = Math.floor(Math.random()*a+1);
		num = parseInt(num);
		if(_arr.indexOf(num) === -1){
			_arr.push(num);
		}
	}
	_arr.sort(sortNumber);
	return _arr;
}



