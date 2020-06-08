
Date.prototype.format = function(r, t) {
	var n, e, o, a, i;
	n = [],
	r = r || "YY年MM月DD日 星期dd",
	e = "FullYear,Month,Date,Hours,Minutes,Seconds,Day".split(","),
	o = [/YY/g, /Y/g, /MM/g, /M/g, /DD/g, /D/g, /hh/g, /h/g, /mm/g, /m/g, /ss/g, /s/g, /dd/g, /d/g];
	for (var u = 0; 7 > u; u++) i = this["get" + e[u]]() + ("Month" === e[u] ? 1 : 0),
	n.push(("0" + i).slice( - 2), i);
	a = [n[1], n[0]].concat(n.slice(2, -2)),
	a.push("日一二三四五六".substr(n.slice( - 1), 1), n.slice( - 1));
	for (var u = 0; 14 > u; u++) r = r.replace(o[u], a[u]);
	return t ? t(r) : r;
};

//格式化时间
function formatdates(str,con) {
	var times={} ;
	var st ; 
	//全数字
	 if(!isNaN(str) || /^\d+$/.test(str)){
		 st = str ;
	 } else {
		 st = str.replace(/-/g,"/").replace(".0","");
	 }
	var now = new Date(st);
	if (con)
		return now;
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	if(month < 10){
		month = "0"+month ;
	}
	var date=now.getDate();
	if(date < 10){
		date = "0"+date ;
	}
	var hour=now.getHours();
	if(hour < 10){
		hour = "0"+hour ;
	}
	var minute=now.getMinutes();
	if(minute < 10){
		minute = "0"+minute ;
	}
	var second=now.getSeconds();
	if(second < 10){
		second = "0"+second ;
	}
	var day = now.getDay() ;
	var week ="" ;
	if(day==0) week="星期日"  ;
	if(day==1) week="星期一"  ;
	if(day==2) week="星期二"  ;
	if(day==3) week="星期三"  ;
	if(day==4) week="星期四" ;
	if(day==5) week="星期五" ;
	if(day==6) week="星期六" ;
	
	times.year = year ;
	times.month = month ;
	times.date = date ;
	times.hour = hour ;
	times.minute = minute ;
	times.second = second ;
	times.day = week ;
	return times ;
}

/**
 * 用新接口的日期[201501242000000]，返回年、月、日、时、分、秒
 * @param Str
 */
function privatDate(str){
	var mydate={};
	mydate.year = str.substr(0,4);
	mydate.month=str.substr(4,2);
	mydate.date=str.substr(6,2);
	
	mydate.hour = str.substr(8,2);
	mydate.minute = str.substr(10,2);
	mydate.second = str.substr(12,2);
	return mydate;
}

//处理日期
function getMydate(str){		
	var mydate = [];
	var now = new Date(str); //当前日期
	var tem_m=now.getMonth()+1;
	var tem_d=now.getDate();
	var day_dic = {"0":"(周日)","1":"(周一)","2":"(周二)","3":"(周三)","4":"(周四)","5":"(周五)","6":"(周六)"};
	mydate.push((tem_m>9 ? tem_m:("0"+tem_m))+"-"+(tem_d>9 ? tem_d:("0"+tem_d)));
	
	var strdate=now.getDay();
	strdate = day_dic[strdate];
	mydate.push(strdate);
	
	var tem_h=now.getHours();
	var tem_min=now.getMinutes();
	mydate.push((tem_h>9 ? tem_h:("0"+tem_h))+":"+(tem_min>9 ? tem_min:("0"+tem_min)));
	
	return mydate;
}