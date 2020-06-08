//var plwjsonurl = "/ipub/trade/issue!toMain.action?lotCode=1" ;
var plwjsonurl = "/data/issueOrMath/plw_opencode.json";
var plw ={} ;
plw.issuecode = "";
plw.issueid ="";
plw.lotid = 3 ;
plw.playId = 3001 ;
plw.listCode=[];

plw.numberList=[] ;

plw.zs = 0 ;
plw.amt = 0 ;
plw.totalzs = 0 ;
plw.totalamt = 0 ;
plw.opentime ;

plw.lsoneList="";
plw.lstwoList="";
plw.lsthreeList="";
plw.lsFourList="";
plw.lsFiveList="";


var ballObje={} ;
ballObje.one_list=[];
ballObje.two_list=[];
ballObje.three_list=[];
ballObje.four_list=[];
ballObje.five_list=[];

//显示选号面板
function show_plw(){
	var redAndBlueq={};
	redAndBlueq.w_num = "" ;
	redAndBlueq.q_num = "" ;
	redAndBlueq.b_num = "" ;
	redAndBlueq.s_num = "" ;
	redAndBlueq.g_num = "" ;
	
	for(var i = 0; i < 10; i++)redAndBlueq.w_num += '<label class="changeballcolor" name="arr_one"><i  name="plw_one" class="i-redball" ls_one='+ (i < 10 ? '' + i: i) +'>'+ (i < 10 ? '' + i: i) +'</i><!--<p class="miss red">21</p>--></label>';
	//遗漏展示区 <p class="miss red">21</p></label>
	for(var i = 0; i < 10; i++)redAndBlueq.q_num += '<label class="changeballcolor" name="arr_two"><i name="plw_two" class="i-redball" ls_two='+ (i < 10 ? '' + i: i) +'>'+ (i < 10 ? '' + i: i) +'</i><!--<p class="miss red">21</p>--></label>';
	
	for(var i = 0; i < 10; i++)redAndBlueq.b_num += '<label class="changeballcolor" name="arr_three"><i name="plw_three" class="i-redball" ls_three='+ (i < 10 ? '' + i: i) +'>'+ (i < 10 ? '' + i: i) +'</i><!--<p class="miss red">21</p>--></label>';
	
	for(var i = 0; i < 10; i++)redAndBlueq.s_num += '<label class="changeballcolor" name="arr_four"><i name="plw_four" class="i-redball" ls_four='+ (i < 10 ? '' + i: i) +'>'+ (i < 10 ? '' + i: i) +'</i><!--<p class="miss red">21</p>--></label>';
	
	for(var i = 0; i < 10; i++)redAndBlueq.g_num += '<label class="changeballcolor" name="arr_five"><i name="plw_five" class="i-redball" ls_five='+ (i < 10 ? '' + i: i) +'>'+ (i < 10 ? '' + i: i) +'</i><!--<p class="miss red">21</p>--></label>';
	
	return redAndBlueq ;
}

//选号
function initBallObj(){
	var w_ball={} ;
	var q_ball={};
	var b_ball={};
	var s_ball={};
	var g_ball={};
	
	$("i[name='plw_one']").each(function(i , o){
		w_ball[i+1] = $(o) ;
		w_ball[i+1].click(function(){
			//var date1 = new Date();
			var thisp = $(this) ;
			var classValue = thisp.context.getAttribute("class") ;
			var val = thisp.context.getAttribute("ls_one") ;
			if(classValue == "i-redball"){
				thisp.context.setAttribute("class","tored") ;
				//ballObje.redNum = ballObje.redNum + 1 ; //红球加1
			} else if(classValue=="tored"){
				thisp.context.setAttribute("class","i-redball") ;
				thisp.context.innerHTML = val ;
				//ballObje.redDtNum = ballObje.redDtNum - 1 ;//胆减1
			
			}
			presentSelNum();
		}) ;
	}) ;
	$("i[name='plw_two']").each(function(i , o){
		q_ball[i+1] = $(o) ;
		q_ball[i+1].click(function(){
			//var date1 = new Date();
			var thisp = $(this) ;
			var classValue = thisp.context.getAttribute("class") ;
			var val = thisp.context.getAttribute("ls_two") ;
			if(classValue == "i-redball"){
				thisp.context.setAttribute("class","tored") ;
				//ballObje.redNum = ballObje.redNum + 1 ; //红球加1
			} else if(classValue=="tored"){
				thisp.context.setAttribute("class","i-redball") ;
				thisp.context.innerHTML = val ;
				//ballObje.redDtNum = ballObje.redDtNum - 1 ;//胆减1
			
			}
			presentSelNum();
		}) ;
	}) ;
	$("i[name='plw_three']").each(function(i , o){
		b_ball[i+1] = $(o) ;
		b_ball[i+1].click(function(){
			//var date1 = new Date();
			var thisp = $(this) ;
			var classValue = thisp.context.getAttribute("class") ;
			var val = thisp.context.getAttribute("ls_three") ;
			if(classValue == "i-redball"){
				thisp.context.setAttribute("class","tored") ;
				//ballObje.redNum = ballObje.redNum + 1 ; //红球加1
			} else if(classValue=="tored"){
				thisp.context.setAttribute("class","i-redball") ;
				thisp.context.innerHTML = val ;
				//ballObje.redDtNum = ballObje.redDtNum - 1 ;//胆减1
			
			}
			presentSelNum();
		}) ;
	}) ;
	$("i[name='plw_four']").each(function(i , o){
		s_ball[i+1] = $(o) ;
		s_ball[i+1].click(function(){
			//var date1 = new Date();
			var thisp = $(this) ;
			var classValue = thisp.context.getAttribute("class") ;
			var val = thisp.context.getAttribute("ls_four") ;
			if(classValue == "i-redball"){
				thisp.context.setAttribute("class","tored") ;
				//ballObje.redNum = ballObje.redNum + 1 ; //红球加1
			} else if(classValue=="tored"){
				thisp.context.setAttribute("class","i-redball") ;
				thisp.context.innerHTML = val ;
				//ballObje.redDtNum = ballObje.redDtNum - 1 ;//胆减1
			
			}
			presentSelNum();
		}) ;
	}) ;
	$("i[name='plw_five']").each(function(i , o){
		g_ball[i+1] = $(o) ;
		g_ball[i+1].click(function(){
			//var date1 = new Date();
			var thisp = $(this) ;
			var classValue = thisp.context.getAttribute("class") ;
			var val = thisp.context.getAttribute("ls_five") ;
			if(classValue == "i-redball"){
				thisp.context.setAttribute("class","tored") ;
				//ballObje.redNum = ballObje.redNum + 1 ; //红球加1
			} else if(classValue=="tored"){
				thisp.context.setAttribute("class","i-redball") ;
				thisp.context.innerHTML = val ;
				//ballObje.redDtNum = ballObje.redDtNum - 1 ;//胆减1
			
			}
			presentSelNum();
		}) ;
	}) ;
	ballObje.one_list=w_ball;
	ballObje.two_list=q_ball;
	ballObje.three_list=b_ball;
	ballObje.four_list=s_ball;
	ballObje.five_list=g_ball;
	plw.numberList[0]=w_ball;
	plw.numberList[1]=q_ball;
	plw.numberList[2]=b_ball;
	plw.numberList[3]=s_ball;
	plw.numberList[4]=g_ball;
					
}

$(document).ready(function(){
	/**
	 * 页面托管出票或投注站出票的显示
	 */
	printTicketWay();
	if(print_ticket_way==1){//投注站出票
		$("#stop_track_id").hide();
		$("#qs").each(function(){
		      this.disabled=true;
		   });
		$("#show_button").html("<a class=\"btn_red b-flex\" id=\"toOfflineBuy\">免费保存</a>");
	}else{//托管出票
		$("#stop_track_id").show();
	}
	
	//显示选号区
	var all_arr=show_plw();
	$("#w_num").html(all_arr.w_num);
	$("#q_num").html(all_arr.q_num);
	$("#b_num").html(all_arr.b_num);
	$("#s_num").html(all_arr.s_num);
	$("#g_num").html(all_arr.g_num);
	
	//初始化数据
	prizeData();
	
	initBallObj();
	//跳转到买页面
	$("#tobuy").click(function(){		
		//selqList();
		if(plw.zs < 1){
			//showRandom();
			open_message("至少选择一注");
			return ;
		}else{
			plw.numberList=[];
			plw.numberList.push(plw.lsoneList);
			plw.numberList.push(plw.lstwoList);
			plw.numberList.push(plw.lsthreeList);
			plw.numberList.push(plw.lsfourList);
			plw.numberList.push(plw.lsfiveList);
			var code = plw.numberList.join(",") ;
			plw.listCode.push(code);
			showselq();
		}
	}) ;
	
	//跳转到继续购买
	$("#contisel").click(function(){
		initdata();
		$("#selhm").show();
		$("#buy").hide();
	});
	
	//立即支付
	$("#totouzhu").one('click' , toDoBuy) ;
	//免费保存
	$("#toOfflineBuy").one('click' , toOfflineDoBuy) ;
	
	//期数倍数触发事件
	$("#qs").focus(function() {
	}).blur(function() {
		var temp = 2 ;
		var qs = $(this).val();
		var bs = $("#bs").val();
		if(qs > 500)qs = 500;
		if(isNaN(qs) || qs <= 0)qs = 1 ;		
		$(this).val('');
		$(this).val(qs);
		
		$("#sqs").html(qs);
		$("#szs").html(plw.totalzs);
		$("#sam").html(plw.totalzs*qs*bs*temp);
	});

	$("#qs").keydown(function() {
		}).keyup(function(e) {
		var temp = 2 ;
		var qs = $(this).val();
		var bs = $("#bs").val();
		if(qs > 500)qs = 500;		
		$(this).val('');
		$(this).val(qs);
		
		$("#sqs").html(qs);
		$("#szs").html(plw.totalzs);
		$("#sam").html(plw.totalzs*qs*bs*temp);
	}) ;
	
	//倍数
	$("#bs").focus(function() {
		}).blur(function() {
		var temp = 2 ;
		var qs = $("#qs").val();
		var bs = $(this).val();
		if(bs > 99)bs = 99;		
		if(isNaN(bs) || bs <= 0)bs = 1 ;
		$(this).val('');
		$(this).val(bs);
		$("#sbs").html(bs);
		$("#szs").html(plw.totalzs);
		$("#sam").html(plw.totalzs*qs*bs*temp);
	});
	
	$("#bs").keydown(function() {
		}).keyup(function(e) {
		var temp = 2 ;
		var qs = $("#qs").val();
		var bs = $(this).val();
		if(bs > 99)bs = 99;
		$(this).val('');
		$(this).val(bs);
		$("#sbs").html(bs);
		$("#szs").html(plw.totalzs);
		$("#sam").html(plw.totalzs*qs*bs*temp);
		
	}) ;
	
	//定时期号
	activeIssue();
/*	
	//异步定时获取期号
	//setInterval("activeIssue()" , 1000);
*/	
	
	
	//同意购彩协议
	$("#iagree").click(function(){
		var thisv = $(this) ;
		if(thisv.attr("class") == "i-check"){
			thisv.attr("class" , "i-checked") ;
		} else {
			thisv.attr("class" , "i-check") ;
		}
	}) ;
	
	//判断是否是登陆后返回
	if(temp_login_exist("plw_lotCode")){
		var numberContent = read_temp_login("plw_numberContent") ;
		var plw_play = read_temp_login("plw_play") ;
		var plw_bs = read_temp_login("plw_bs") ;
		var plw_qs = read_temp_login("plw_qs") ;
		
		plw.listCode = numberContent.split("$") ;
		$("#qs").val(plw_qs);
		$("#bs").val(plw_bs);
		showselq() ;
	}
}) ;

//拼成购买数据

//当前选号
function presentSelNum(){
	//select_code_id
	var one_balls= "";
	var two_balls="";
	var three_balls="";
	var four_balls="";
	var five_balls="";
	var obj_thisp ="";
	var obj_cls ="";
	var obj_num ="";
	for (var cc = 1; cc < 11; cc++) {
		obj_thisp = ballObje.one_list[cc].context ;
		obj_cls =  obj_thisp.getAttribute("class") ;
		obj_num = obj_thisp.getAttribute("ls_one") ;
		if(obj_cls=="tored"){
			one_balls+=obj_num ;
		} 
	}	
	 obj_thisp="" ;
	 obj_cls ="";
	 obj_num ="";
	 for (var cc = 1; cc < 11; cc++) {
		obj_thisp = ballObje.two_list[cc].context ;
		obj_cls =  obj_thisp.getAttribute("class") ;
		obj_num = obj_thisp.getAttribute("ls_two") ;
		if(obj_cls=="tored"){
			two_balls+=obj_num ;
		} 
	}
	 obj_thisp="" ;
	 obj_cls ="";
	 obj_num ="";
	 for (var cc = 1; cc < 11; cc++) {
		obj_thisp = ballObje.three_list[cc].context ;
		obj_cls =  obj_thisp.getAttribute("class") ;
		obj_num = obj_thisp.getAttribute("ls_three") ;
		if(obj_cls=="tored"){
			three_balls+=obj_num ;
		} 
	}
	 obj_thisp="" ;
	 obj_cls ="";
	 obj_num ="";
	 for (var cc = 1; cc < 11; cc++) {
		obj_thisp = ballObje.four_list[cc].context ;
		obj_cls =  obj_thisp.getAttribute("class") ;
		obj_num = obj_thisp.getAttribute("ls_four") ;
		if(obj_cls=="tored"){
			four_balls+=obj_num ;
		} 
	}
	 obj_thisp="" ;
	 obj_cls ="";
	 obj_num ="";
	 for (var cc = 1; cc < 11; cc++) {
		obj_thisp = ballObje.five_list[cc].context ;
		obj_cls =  obj_thisp.getAttribute("class") ;
		obj_num = obj_thisp.getAttribute("ls_five") ;
		if(obj_cls=="tored"){
			five_balls+=obj_num ;
		} 
	}
	 
	var s = mcdtcalZS(one_balls , two_balls , three_balls , four_balls,five_balls) ;
	if(s > 0 ){
		plw.zs = s ;
		plw.lsoneList=one_balls;
		plw.lstwoList=two_balls;
		plw.lsthreeList=three_balls;
		plw.lsfourList=four_balls;
		plw.lsfiveList=five_balls;

		$("#m-submit_box_s").attr("class","m-submit_box") ;
		$("#select_code_id").html("选了<span color=\"red\">"+s+"</span>注，共<span color=\"red\">"+(s*2)+"</span>元");
	} else {
		plw.zs = 0 ;
		plw.numberList = [] ;
		plw.dtredList = [] ;
		$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
		$("#select_code_id").html("请每位至少选<span color=\"red\">1</span>个号码");
	}
}
//计算注数
function mcdtcalZS(one_balls , two_balls , three_balls , four_balls,five_balls){
	
	return one_balls.length*two_balls.length*three_balls.length*four_balls.length*five_balls.length;
};

//获取期号
function activeIssue(){
	dlttimeCounter("show_time" , false , function(){
		var tp_time =-1;
		var url = "/trade/num/plw!activeIssue.action?t="+new Date().getTime() ;
		baseAjax("get",url,false,null,"text",function(data){
	  		var lot_state = eval("("+data+")");
			if(!(typeof lot_state=="undefined") && lot_state != null){
				 tp_time = formatDate(lot_state.msg.officialEndTime , true) - formatDate(lot_state.msg.currentSysDate , true) ;
				 tp_time = tp_time / 1000 ;
			} else {
				tp_time =  -1 ;
			};
			if(lot_state.msg.issueCode != plw.issuecode){
				plw.issueid = lot_state.msg.issueId ;
				plw.issuecode = lot_state.msg.issueCode ;
				var times = formatDate(lot_state.msg.officialEndTime) ;
				plw.cur_nex_his.endtime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
				var date= formatDate(lot_state.msg.officialOpenTime , true) ;
				var day = getTimeDiffer(date,new Date());
				var dthtm="<strong>距"+plw.issuecode+"期截止</strong><strong id=\"show_time\">00小时00分00秒</strong><span class=\"gray\">奖池</span><span class=\"red\"></span>" ;
				$("#open_code_time_id").html(dthtm);
			}	
	  	});
		return tp_time ;
	});
}

function initdata(){
	plw.numberList=[] ;
	
	plw.zs = 0 ;
	plw.amt = 0 ;
	
	//清除选的颜色
	var danObj ;
	for (var cc = 1; cc < 11; cc++) {
		danObj = ballObje.one_list[cc].context ;
		danObj.setAttribute("class","i-redball");
		danObj.innerHTML= danObj.getAttribute("ls_one");
	}
	for (var cc = 1; cc < 11; cc++) {
		danObj = ballObje.two_list[cc].context ;
		danObj.setAttribute("class","i-redball");
		danObj.innerHTML= danObj.getAttribute("ls_two");
	}
	for (var cc = 1; cc < 11; cc++) {
		danObj = ballObje.three_list[cc].context ;
		danObj.setAttribute("class","i-redball");
		danObj.innerHTML= danObj.getAttribute("ls_three");
	}
	for (var cc = 1; cc < 11; cc++) {
		danObj = ballObje.four_list[cc].context ;
		danObj.setAttribute("class","i-redball");
		danObj.innerHTML= danObj.getAttribute("ls_four");
	}
	for (var cc = 1; cc < 11; cc++) {
		danObj = ballObje.five_list[cc].context ;
		danObj.setAttribute("class","i-redball");
		danObj.innerHTML= danObj.getAttribute("ls_five");
	}
	
	//清除选号数量
	//ballObje.redNum = 0 ;
	//ballObje.redDtNum = 0 ;
	
	$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
	$("#select_code_id").html('请每位至少选<span class="red">1</span>个号码');
}

//加载开奖信息，期号
function prizeData(){
	//type,url,async,data,dataType,callBack
	baseAjax("get" , plwjsonurl , false , null , "text" , function(data){
		var	x = eval('(' + data + ')');
		if(x != null){
			plw.cur_nex_his = x;
			showinfo(x);
		}
	});
}

//显示数据
function showinfo(jsoninfo){
	var htm = makehtml(jsoninfo) ;
	plw.issuecode = htm.issuecode ;
	plw.issueid = htm.issueid ;
	//plw.lotid = htm.lotid ;
	var times = formatDate(htm.opentime);
	plw.opentime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
	$("#head").append(htm.head);
	$("#back").append(htm.back) ;
}

//点击显示历史记录
var down_flag = true;
function showHistoryData(obj){
	if(down_flag){
		$(obj).html('<em class="i-slideDown fold"></em>点击收起');
		down_flag = false;
	}else{
		$(obj).html('<em class="i-slideDown"></em>点此展开历史开奖');
		down_flag = true;
	}
	$("section[name='history_back_s']").toggle();
}
//生成数据
function makehtml(json){
	var info ={} ;
	info.lotid = json.lotid ;
	info.issueid = json.issueid ;
	info.issuecode = json.issuecode ;
	info.starttime = json.starttime ;
	info.endtime = json.endtime ;
	info.prizeinfo = json.prizeinfo ;
	info.opentime = json.opentime ;
	info.guncunPool = json.guncunPool ;
	info.opentime.indexOf('.0')>-1?info.opentime = info.opentime.replace('.0',""):"";
	var date= new Date(info.opentime.replace(/-/g,"/"));
	var day = getTimeDiffer(date,new Date());
	$("#open_code_time_id").html('<strong>距'+info.issuecode+'期截止  </strong><strong id=\"show_time\">00小时00分00秒</strong>  <span class="gray">奖池</span><span class="red">'+moneyFormat(info.guncunPool)+'</span>');
	info.back = "" ;
	json.openlist.each(function(o , i){
		var hm = o.opencode.split("|") ;
		if(i == 0){
			info.head = "<div>上期开奖:"+hm[0]+"</div>" + "<span class='i-slide' onclick='showHistoryData(this)'><em class='i-slideDown'></em>点此展开历史开奖</span>";
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div><div class=\"pl3totle\">"
					  + "<span class='red'> "+hm[0]+"</span> </span></div></li>";
		} else {
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div><div class=\"pl3totle\">"
			 		  + "<span class='red'> "+hm[0]+"</span></div></li>";
		}
	}) ;
	return info ;
}

//金额格式化
function moneyFormat(money){
	var moneyStr = "";
	var qy = money % 100000000;
	var qw = money % 10000;
	var y = (money - qy)/100000000;
	var w = (money - y*100000000 -qw)/10000;
	
	if(y > 0){
		moneyStr = moneyStr + y + "亿";
	}
	if(w > 0){
		moneyStr = moneyStr + w + "万";
	}
	if(qw > 0){
		//moneyStr = moneyStr + qw;
	}
	return moneyStr;
}

//获取两个时间的时间差(返回天数)
function getTimeDiffer(date1,date2){
	 var timeDif = (date1.getTime()-date2.getTime())/1000;
	 
	 var days = timeDif/(60*60*24);
     var day = Math.floor(days);
     var hours = timeDif%(60*60*24)/3600;
     var hour = Math.floor(hours);
     var minuters = timeDif%(60*60)/60;
     var minuter = Math.floor(minuters);
     var secondes = timeDif%60;
     var seconde =  Math.floor(secondes);
     return day;
}

//获取时间时分
function getTimeHM(date){
    if (date) {
    	var hour=date.getHours();
    	var minute=date.getMinutes();
    	 return hour+":"+minute;
	}
    return "";
}


//显示或隐藏历史期
function slideUp(v){
	//1显示
	if(v == 1){
		$("#back").show();
		$("span[name='up']").show();
		$("span[name='down']").hide();
	} else {
		$("#back").hide();
		$("span[name='up']").hide();
		$("span[name='down']").show();
	}
}


//记录选号
function showselq(){
	var temp = 2;
	var liCode = plw.listCode ;
		
	$("#selhm").hide();
	//计算总注数
	counttotalsz(liCode);
	var liht="" ;		
	for (var i = 0; i < liCode.length; i++) {
		liht+="<li class='ssq'>" ;
		liht+="<var><span class='red'>";

		liht+=liCode[i];
		//liht+=code[0].replace(/,/g, " ");
		liht+="</span>" ;
	
		liht+="</span></var>" ;
		liht+="<p>"+getZs(liCode[i])+"注"+getZs(liCode[i])*temp+"元</p>" ;
		liht+="<i class='i-del' onclick='deli("+i+")'></i>";
	}
	var qs = $("#qs").val();
	var bs = $("#bs").val();
	$("#szs").html(plw.totalzs);
	$("#sam").html(plw.totalzs*qs*bs*temp);
	$("#sqs").html(qs);
	$("#sbs").html(bs);
	$("#addli").html(liht);
	$("#buy").show();
}

//获得总注数
function counttotalsz(liCode){
	plw.totalzs = 0 ;
	liCode.each(function(o){
		var v = o ;
		var list = v.split(",") ;
		
		var zs = mcdtcalZS(list[0], list[1], list[2], list[3],list[4]) ;
		plw.totalzs+=zs ;
	}) ;
}

//计算注数
function getZs(code){
	var list = code.split(",");	
	plw.zs = mcdtcalZS(list[0], list[1], list[2], list[3],list[4]) ;
	//plw.zs = plwcalZS(red, blue);
	return plw.zs;
}

// 删除已选号码
function deli(v){
	plw.listCode.splice(v,1);
	if(plw.listCode.length < 1){
		$("#selhm").show();
		$("#buy").hide();
	} else {
		showselq();
	}
}

//机选
function getplwRandom(){
	var startArray = [0,1,2,3,4,5,6,7,8,9];//seed array  
	var N = 1;//随机数个数  
	var resultArray = new Array();//结果存放在里面  
	//万位号码
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray.push(startArray[seed]);//赋值给结果数组  
	   // startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	//千位号码
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray.push(startArray[seed]);//赋值给结果数组
	    //startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	//百位号码
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray.push(startArray[seed]);//赋值给结果数组
	   // startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	//十位号码
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray.push(startArray[seed]);//赋值给结果数组
	    //startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	//各位号码
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray.push(startArray[seed]);//赋值给结果数组
	    //startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	return resultArray ;
}


//显示机选
function showRandom(){
	var w_num_code_url = $("#w_num").find("label");	
	w_num_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
		obj.html(obj.attr("ls_one"));
	});
	
	var q_num_code_url = $("#q_num").find("label");	
	q_num_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
		obj.html(obj.attr("ls_two"));
	});
	
	var b_num_code_url = $("#b_num").find("label");	
	b_num_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
		obj.html(obj.attr("ls_three"));
	});
	
	var s_num_code_url = $("#s_num").find("label");	
	s_num_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
		obj.html(obj.attr("ls_four"));
	});
	
	var g_num_code_url = $("#g_num").find("label");	
	g_num_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
		obj.html(obj.attr("ls_five"));
	});
	
	
	
	var all_ball = getplwRandom();
	//var ball_list = all_ball.splice(",");
	plw.numberList= [] ;
	plw.zs = 1 ;
	plw.amt = 2 ;
	
	var v = "";
	v = all_ball[0]+1 ;
	ballObje.one_list[v].context.setAttribute("class" , "tored") ;
	v = all_ball[1]+1 ;
	ballObje.two_list[v].context.setAttribute("class" , "tored") ;	
	v = all_ball[2]+1 ;
	ballObje.three_list[v].context.setAttribute("class" , "tored") ;	
	v = all_ball[3]+1 ;
	ballObje.four_list[v].context.setAttribute("class" , "tored") ;	
	v = all_ball[4]+1 ;
	ballObje.five_list[v].context.setAttribute("class" , "tored") ;	
	
	plw.numberList= all_ball ;
	
	//ballObje.redNum = 5 ;
	presentSelNum();
}


//机选一注
function radomone(){
	var all_ball = getplwRandom();
	plw.numberList= [] ;
	plw.zs = 1 ;
	plw.amt = 2 ;
	
	for(var i = 0 ; i < all_ball.length ; i++){
		var v = all_ball[i] ;		
		plw.numberList.push(v) ;
	}
	
	var code = plw.numberList.join(",") ;
	plw.listCode.push(code) ;
	showselq();
}


function toDoBuy(){
	confirmBuy(false);
	$("#totouzhu").one('click' , toDoBuy) ;
}

//线下订单
function toOfflineDoBuy(){
	confirmBuy(true);
	$("#toOfflineBuy").one('click' , toOfflineDoBuy) ;
}
//确定投注
function confirmBuy(isOffline){
//	var cur_stop_time = new Date('2014/10/10 00:00:00');
	var cur_stop_time = new Date(plw.cur_nex_his.endtime.replace(/-/g,"/").replace("/.0/",""));
//	var nex_start_time = new Date(plw.cur_nex_his.nextissue.starttime.replace(/-/g,"/").replace("/.0/",""));
	var cur_time = new Date(getCurrentTimeAjax());
//	if(cur_time>=cur_stop_time && cur_time<=nex_start_time){
//		open_message("当前期已停止购买");
//		return;
//	}
	
	if(cur_time>=cur_stop_time){
		open_message("当前期已停止购买");
		return;
	}
	
	if($("#iagree").attr("class")=="i-check"){		
		open_message("您需要同意“购彩协议”才能投注");		
		return ;
	}
	
	var numberContent = plw.listCode.join("$");
	if(numberContent == null || numberContent == ""){
		open_message("请选择号码");		
		return ;
	}
	
	var totalAmt = getTotalAmt();
	if(totalAmt>5000){
		open_message("单笔投注金额不能超过5000元!");		
		return;
	}
	
	if(numberContent == null || numberContent == ""){
		open_message("没有选码投注号码，请添加号码");		
		return;
	}
	
	if(!checkLoginByAjax()){		
		//保存数据
		var multiple = parseInt($("#sbs").html()); // 倍数
		var trackCount = $("#sqs").html();
		//toWriteTempData("plw_number_content",numberContent);
		//toWriteTempData("plw_play_id",plw.playId);
		//toWriteTempData("plw_bs_id",multiple);
		//toWriteTempData("plw_qs_id",trackCount);
		write_temp_login("plw_lotCode" , "1" , 1) ;
		write_temp_login("plw_numberContent" , numberContent , 1) ;
		write_temp_login("plw_play" , plw.playId , 1) ;
		write_temp_login("plw_bs" , multiple , 1) ;
		write_temp_login("plw_qs" , trackCount , 1) ;
		//登录
//		toAuthLogin();
		var bakUrl = "/v3shtml/trade/num/plw.html" ;
		to_login(bakUrl);
		return ;
	}
	var trackCount = parseInt($("#sqs").html());
	var investType = trackCount > 1 ? 2 : 1;
	var callbackType = 0;
	if(investType == 2 || investType == 3){
		callbackType = 2;
	}else{
		callbackType = 1;
	}
	//金额审核
	//same.hasEnoughMoney(plw.playId,plw.lotid,trackCount,totalAmt,plw.lotid,plw.issuecode,callbackType,"");
	//金额审核
	if(!isOffline) {
		same.hasEnoughMoney(plw.playId,plw.lotid,trackCount,totalAmt,plw.lotid,plw.issuecode,callbackType,"");
	} else {
		same.offlineConfirmHtml(plw.playId,plw.lotid,trackCount,totalAmt,plw.lotid,plw.issuecode,callbackType,"");//线下订单直接购买
	}
}

function dobuy(){
	var temp = 2 ;
	var numberContent = plw.listCode.join("$");
	var noteCount = plw.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	if(plw.playId == 1002 || plw.playId == 1005)temp = 3 ;
	var totalAmt = parseInt(noteCount) * multiple * temp;
	var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
//	var isStop = 0;//追号是否停止
	var playId = plw.playId;//玩法
	var lotCode = plw.lotid;
	var issueId = plw.issueid;//期号ID
	var issueCode = plw.issuecode;
	var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
	var investType = trackCount > 1 ? 2 : 1;
	
	var singleAmonut = totalAmt / trackCount ;
	var postData = {
			multiple : multiple,
			numberContent : numberContent,
			noteCount : noteCount,
			totalAmt : totalAmt,
			lotPlayType : playId,//
			issueCode : issueCode,//期号//
			lotTypeCode : playId,//
			lotCode : lotCode,//
			issueId : issueId,//
			startIssueId : issueId,
			startIssueCode : issueCode,
			investType : investType,//1当前值是代购 , 2追号
			stop:isStop,
			trackCount : trackCount,//追号期数
			buySource : buySource,//购买来源
			isdongjie:100, //不冻结
			singleAmonut:singleAmonut,
			time : new Date().getTime()//当前时间
		};
		same.buySubmit(postData,$.trim(plw.opentime));
	
}
//线下订单
function doOfflineBuy(){
	var temp = 2 ;
	var numberContent = plw.listCode.join("$");
	var noteCount = plw.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	if(plw.playId == 1002 || plw.playId == 1005)temp = 3 ;
	var totalAmt = parseInt(noteCount) * multiple * temp;
	var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
//	var isStop = 0;//追号是否停止
	var playId = plw.playId;//玩法
	var lotCode = plw.lotid;
	var issueId = plw.issueid;//期号ID
	var issueCode = plw.issuecode;
	var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
	var investType = trackCount > 1 ? 2 : 1;
	
	var singleAmonut = totalAmt / trackCount ;
	var postData = {
			multiple : multiple,
			numberContent : numberContent,
			noteCount : noteCount,
			totalAmt : totalAmt,
			lotPlayType : playId,//
			issueCode : issueCode,//期号//
			lotTypeCode : playId,//
			lotCode : lotCode,//
			issueId : issueId,//
			startIssueId : issueId,
			startIssueCode : issueCode,
			investType : investType,//1当前值是代购 , 2追号
			stop:isStop,
			trackCount : trackCount,//追号期数
			buySource : buySource,//购买来源
			isdongjie:100, //不冻结
			singleAmonut:singleAmonut,
			time : new Date().getTime(),//当前时间
			payType:100,//付款方式：线下付款
         	isTicket:0//是否取票：0未取票
		};
		same.buySubmit(postData,$.trim(plw.opentime));
	
}
//差额支付时用
function doTempBuy(argJSON){
	var callbackType = argJSON.callbackType;
	var userBalacne = argJSON.allMoney;
	 var numberObject = plw.listCode.join("$");
     var multiple = $("#sbs").html(); // 倍数
     var trackCount = $("#sqs").html();
     var zhushu = plw.totalzs;
     var issue = plw.issuecode;
     var lotTypeCode = plw.lotid;
     var lotTypeplay = plw.playId;//玩法
     var temp = 2 ;
 	 var totalAmt = parseInt(zhushu) * multiple * temp * parseInt(trackCount);
     var stopMoney=0;
	 var investType = trackCount > 1 ? 2 : 1;
     var trackType = 0;	//追号类型
     var issueId = plw.issueid;//期号ID
     var startIssueCode=plw.issuecode;
     var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买

     var investType = trackCount > 1 ? 2 : 1;
     var inflowamt = totalAmt - userBalacne;
     var singleAmonut = parseInt(zhushu) * multiple * temp ;
     var postData = {
     		multiple:multiple,
     		numberObject:numberObject,
     		noteCount:zhushu,
     		totalAmt:totalAmt,
     		playId:lotTypeplay,
     		issueCode:issue,
     		lotTypeCode:lotTypeCode,
     		lotCode:lotTypeCode,
     		issueId:issueId,
     	 	startIssueId:issueId,
     		startIssueCode:startIssueCode,
     		investType:investType,
     		isZjStop:1,
     		stopMoney:1,
     		buySource:buySource,
     		isDongjie:100,
     		userBalance:userBalacne,
     		inflowAmt:inflowamt,
     		singleAmonut:singleAmonut,
     		trackCount:trackCount,
     		time:new Date().getTime()};
     
    var url = '';
    if(investType == 2 || investType == 3) {
    	url='/ipub/trade/temp!tempTrack.action';
    }else {
 	   url='/ipub/trade/temp!tempProject.action';
    }
     $.post(url,postData,function post_Sucess(data){
    	 var returnObject = eval("("+data+")");
    	 if(returnObject.flag==1)
    		 window.location.href ="/pay/alipay/ali-pay!charge.action?callbackType="+callbackType+"&callbackId="+returnObject.msg;
    	 else
    		 open_message(returnObject.msg);
     },'text');	
 };
//获取totalAmt
function getTotalAmt(){
	var temp = 2 ;
	var noteCount = plw.totalzs;// 注数
	var multiple =parseInt($("#sbs").html()); // 倍数
	var qs = parseInt($("#sqs").html());
	if(plw.playId == 1002 || plw.playId==1005)temp = 3 ;
	var totalAmt = parseInt(noteCount) * multiple * temp * qs;
	return totalAmt;
}

//合约验证
function contractCheck(obj){
	if($("#"+obj).attr("class") == "i-check i-checked"){
		return true;
	}else if($("#"+obj).attr("class") == "i-check"){
		return false;
	}
}
//合约点击效果
function contrackButt(obj){
	if($(obj).attr("class") == "i-check i-checked"){
		$(obj).attr("class","i-check");
	}else if($(obj).attr("class") == "i-check"){
		$(obj).attr("class","i-check i-checked");
	}
}

function qxclearSelect(){
	//清空选号的样式
	plw.index=0;
	plw.numberList=[];
	plw.initNumber();
	plw.lsoneList=[];
	plw.lstwoList=[];
	plw.lsthreeList=[];
	plw.lsFourList=[];
	plw.lsFiveList=[];
	//清空选号的样式
	plw.clearBallClass();

	eachobj = {};

	//刷新金额
	$("#ttmoney").html(plw.claMoney());
	plw.caltotalZSAndMoney();
}
//重写dlttimeCounter时钟函数，排列五去掉天数
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
				obj.innerHTML =h + '小时' + m + '分' + s+"秒" ;
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