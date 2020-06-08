//type,url,async,data,dataType,callBack
var baseAjax=(function(){return function(d,e,f,g,h,i){var j;$.ajax({type:d,url:e,async:f,data:g,dataType:h,success:function(a){j=i(a)},error:function(a,b,c){}});return j}})();
//elemId元素id , isclear到时是否清除定时器 , fuc到时执行函数 需要有返回值
var timeCounter=(function(){var int;var total=-1;return function(elemID,isclear,fuc){var obj;if(elemID!=null&&elemID!=""){obj=document.getElementById(elemID)}int=setTimeout("timeCounter('"+elemID+"',"+isclear+","+fuc+")",1000);if(total>=0){var s=(total%60)<10?('0'+total%60):total%60;var h=total/3600<10?('0'+parseInt(total/3600)):parseInt(total/3600);var m=(total-h*3600)/60<10?('0'+parseInt((total-h*3600)/60)):parseInt((total-h*3600)/60);if(elemID!=null&&elemID!=""){obj.innerHTML=h+':'+m+':'+s}total--}else if(total<0){if(isclear){clearTimeout(int)}total=-1;if(elemID!=null&&elemID!=""){obj.innerHTML="00:00:00"}if(!(typeof fuc=="undefined")&&fuc!=null&&fuc!=""){total=fuc()}}}})();
//传入参数，str字符串时间，con true返回时间，false返回时分秒，星期自己组装
var formatDate = (function() {
	return function(str, con) {
		var times = {};
		var st;
		if (!isNaN(str) || /^\d+$/.test(str)) {
			st = str;
		} else {
			st = str.replace(/-/g, "/").replace(".0", "");
		}
		var now = new Date(st);
		if (con) {
			return now;
		}
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}
		var date = now.getDate();
		if (date < 10) {
			date = "0" + date;
		}
		var hour = now.getHours();
		if (hour < 10) {
			hour = "0" + hour;
		}
		var minute = now.getMinutes();
		if (minute < 10) {
			minute = "0" + minute;
		}
		var second = now.getSeconds();
		if (second < 10) {
			second = "0" + second;
		}
		var day = now.getDay();
		var week = "";
		if (day == 0) week = "星期日";
		if (day == 1) week = "星期一";
		if (day == 2) week = "星期二";
		if (day == 3) week = "星期三";
		if (day == 4) week = "星期四";
		if (day == 5) week = "星期五";
		if (day == 6) week = "星期六";
		times.year = year;
		times.month = month;
		times.date = date;
		times.hour = hour;
		times.minute = minute;
		times.second = second;
		times.day = week;
		return times;
	};
})();


var dlttimeCounter = (function() {
	var int;
	var total = -1;
	return function(elemID, isclear, fuc) {
		var obj;
		if (elemID != null && elemID != "") {
			obj = document.getElementById(elemID);
		}
		int = setTimeout("dlttimeCounter('" + elemID + "'," + isclear + "," + fuc + ")", 1000);
		if (total >= 0) {
			var t = total / 86400 < 10 ? ('0' + parseInt(total / 86400)) : parseInt(total / 86400);
			if(t < 1){
				t = 0 ;
			}
			
			var s = (total % 60) < 10 ? ('0' + total % 60) : total % 60;
			var h = total / 3600 < 10 ? ('0' + parseInt(total / 3600)) : parseInt(total / 3600);
			h = h - t*24 ;
			var m = (total - t*24*3600 - h * 3600) / 60 < 10 ? ('0' + parseInt((total - t*24*3600 - h * 3600) / 60)) : parseInt((total - t*24*3600 -  h * 3600) / 60);
			if (elemID != null && elemID != "") {
				obj.innerHTML = t+"天"+h + '小时' + m + '分' + s+"秒" ;
			}
			total--;
		} else if (total < 0) {
			if (isclear) {
				clearTimeout(int);
			}
			total = -1;
			if (elemID != null && elemID != "") {
				obj.innerHTML = "00天00小时00分00秒";
			}
			if (!(typeof fuc == "undefined") && fuc != null && fuc != "") {
				total = fuc();
			}
		}
	};
})();

var plstimeCounter = (function() {
	var int;
	var total = -1;
	return function(elemID, isclear, fuc) {
		var obj;
		if (elemID != null && elemID != "") {
			obj = document.getElementById(elemID);
		}
		int = setTimeout("plstimeCounter('" + elemID + "'," + isclear + "," + fuc + ")", 1000);
		if (total >= 0) {
			var t = total / 86400 < 10 ? ('0' + parseInt(total / 86400)) : parseInt(total / 86400);
			if(t < 1){
				t = 0 ;
			}
			
			var s = (total % 60) < 10 ? ('0' + total % 60) : total % 60;
			var h = total / 3600 < 10 ? ('0' + parseInt(total / 3600)) : parseInt(total / 3600);
			h = h - t*24 ;
			var m = (total - t*24*3600 - h * 3600) / 60 < 10 ? ('0' + parseInt((total - t*24*3600 - h * 3600) / 60)) : parseInt((total - t*24*3600 -  h * 3600) / 60);
			if (elemID != null && elemID != "") {
				obj.innerHTML = h + '小时' + m + '分' + s+"秒" ;
			}
			total--;
		} else if (total < 0) {
			if (isclear) {
				clearTimeout(int);
			}
			total = -1;
			if (elemID != null && elemID != "") {
				obj.innerHTML = "00小时00分00秒";
			}
			if (!(typeof fuc == "undefined") && fuc != null && fuc != "") {
				total = fuc();
			}
		}
	};
})();

var t11x5timeCounter = (function() {
	var int;
	var total = -1;
	return function(elemID, isclear, fuc) {
		var obj;
		if (elemID != null && elemID != "") {
			obj = document.getElementById(elemID);
		}
		int = setTimeout("t11x5timeCounter('" + elemID + "'," + isclear + "," + fuc + ")", 1000);
		if (total >= 0) {
			var t = total / 86400 < 10 ? ('0' + parseInt(total / 86400)) : parseInt(total / 86400);
			if(t < 1){
				t = 0 ;
			}
			
			var s = (total % 60) < 10 ? ('0' + total % 60) : total % 60;
			var h = total / 3600 < 10 ? ('0' + parseInt(total / 3600)) : parseInt(total / 3600);
			h = h - t*24 ;
			var m = (total - t*24*3600 - h * 3600) / 60 < 10 ? ('0' + parseInt((total - t*24*3600 - h * 3600) / 60)) : parseInt((total - t*24*3600 -  h * 3600) / 60);
			if (elemID != null && elemID != "") {
				obj.innerHTML = m + '分' + s+"秒" ;
			}
			total--;
		} else if (total < 0) {
			if (isclear) {
				clearTimeout(int);
			}
			total = -1;
			if (elemID != null && elemID != "") {
				obj.innerHTML = "00分00秒";
			}
			if (!(typeof fuc == "undefined") && fuc != null && fuc != "") {
				total = fuc();
			}
		}
	};
})();

var openway = (function(){
	return function(){
		var userAgentInfo = navigator.userAgent;
		if(/Windows/gi.test(userAgentInfo)){
			document.location.href="/pcforbidden.shtml";
		}
	};
})();
//判断彩种是否停售
var lotCodeIsSale=(function(){
	return function(lotCode , backUrl){
		
		baseAjax("get" , "/com-ajax!toMain.action?lotCode="+lotCode+"&t="+new Date().getTime() , false , null , "text" , function(data){
			var v = eval("("+data+")");
			if(v != null){
				if(v.flag == 0 || v.flag == 3 || v.flag == 4){
					alert("该彩种已暂停销售");
					document.location.href=backUrl ;
				} 
			}
		});
};})() ;

var printTicketWay =(function(){
	return function(){
		var flg =0;
		baseAjax("get" , "/com-ajax!printTicketWay.action?t="+new Date().getTime() , false , null , "text" , function(data){
			var v = eval("("+data+")");
			if(v != null){
				flg = v.msg ;
			} else {
				flg = 0 ;
			}
		});
		return flg ;
	};
})();
