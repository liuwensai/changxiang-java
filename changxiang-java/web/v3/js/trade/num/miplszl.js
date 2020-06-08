//排列三组六
//var plsjsonurl = "/ipub/trade/issue!toMain.action?lotCode=1" ;
var plsjsonurl = "/data/issueOrMath/pls_opencode.json";
var mcpls ={} ;
mcpls.issuecode = "";
mcpls.issueid ="";
mcpls.lotid = 2 ;
mcpls.playId = 2006 ;
mcpls.listCode=[];

mcpls.zsball=[] ;

mcpls.zs = 0 ;
mcpls.amt = 0 ;
mcpls.totalzs = 0 ;
mcpls.totalamt = 0 ;
mcpls.opentime ;

var ballObje={} ;
ballObje.zsball = [] ;

ballObje.zsNum = 0 ;

var hezhiMap2002,hezhiMap2009;

function initBallObj(){
	var zsBall={} ;
	
	
	$("i[name='zlball']").each(function(i,o){
		zsBall[i] = $(o) ;
		zsBall[i].click(function(){
			var thisp = $(this) ;
			var classValue= thisp.context.getAttribute("class") ;
			if(classValue=="i-redball"){
				thisp.context.setAttribute("class","tored") ;
				ballObje.zsNum = ballObje.zsNum + 1 ;
			} else if(classValue=="tored"){
				thisp.context.setAttribute("class","i-redball") ;
				ballObje.zsNum = ballObje.zsNum - 1 ;
			}
			presentSelNum();
		}) ;
	});
	
	ballObje.zsball = zsBall ;
}

$(document).ready(function(){
	baseAjax("get" , "/data/trade/pls/he_zhi_2002.json" , false , null , "text" , function(data){
		hezhiMap2002 = eval('(' + data + ')');
	});
	baseAjax("get" , "/data/trade/pls/he_zhi_2009.json" , false , null , "text" , function(data){
		hezhiMap2009 = eval('(' + data + ')');
	});
	//初始化数据
	prizeData();

	
	initBallObj();
	
	//跳转到买页面
	$("#tobuy").click(function(){		
		if(mcpls.zs < 1){
			open_message("至少选择一注");
			return ;
		}
		var zs = mcpls.zsball.join(",") ;
		
		mcpls.listCode.push(zs) ;
		showselq();
	}) ;
	
	
	//跳转到继续购买
	$("#contisel").click(function(){
		initdata();
		$("#selhm").show();
		$("#buy").hide();
	});
	
	//立即支付
	$("#totouzhu").one('click' , toDoBuy) ;

	//期数倍数触发事件
	$("#qs").focus(function() {
	}).blur(function() {
		var temp = 2 ;
		var qs = $(this).val();
		var bs = $("#bs").val();
		if(qs > 500)qs = 500;
		if(isNaN(qs) || qs <= 0)qs = 1 ;
		if(mcpls.playId == 1002 || mcpls.playId == 1005)temp = 3 ;
		$(this).val('');
		$(this).val(qs);
		
		$("#sqs").html(qs);
		$("#szs").html(mcpls.totalzs);
		$("#sam").html(mcpls.totalzs*qs*bs*temp);
	});

	$("#qs").keydown(function() {
		}).keyup(function(e) {
		var temp = 2 ;
		var qs = $(this).val();
		var bs = $("#bs").val();
		if(qs > 500)qs = 500;
		if(mcpls.playId == 1002 || mcpls.playId == 1005)temp = 3 ;
		$(this).val('');
		$(this).val(qs);
		
		$("#sqs").html(qs);
		$("#szs").html(mcpls.totalzs);
		$("#sam").html(mcpls.totalzs*qs*bs*temp);
	}) ;
	
	//倍数
	$("#bs").focus(function() {
		}).blur(function() {
		var temp = 2 ;
		var qs = $("#qs").val();
		var bs = $(this).val();
		if(bs > 99)bs = 99;
		if(mcpls.playId == 1002 || mcpls.playId == 1005)temp = 3 ;
		if(isNaN(bs) || bs <= 0)bs = 1 ;
		$(this).val('');
		$(this).val(bs);
		$("#sbs").html(bs);
		$("#szs").html(mcpls.totalzs);
		$("#sam").html(mcpls.totalzs*qs*bs*temp);
	});
	
	$("#bs").keydown(function() {
		}).keyup(function(e) {
		var temp = 2 ;
		var qs = $("#qs").val();
		var bs = $(this).val();
		if(bs > 99)bs = 99;
		if(mcpls.playId == 1002 || mcpls.playId == 1005)temp = 3 ;
		$(this).val('');
		$(this).val(bs);
		$("#sbs").html(bs);
		$("#szs").html(mcpls.totalzs);
		$("#sam").html(mcpls.totalzs*qs*bs*temp);
		
	}) ;
	
	//定时期号
	activeIssue();
/*	
	//异步定时获取期号
	//setInterval("activeIssue()" , 1000);
	//追加投注
	$("#addamt").click(function(){
		var thisv = $(this) ;
		if(thisv.attr("class") == "i-check"){
			mcpls.playId = 1002 ;
			thisv.attr("class" , "i-checked") ;
		} else {
			mcpls.playId = 1001 ;
			thisv.attr("class" , "i-check") ;
		}
		showselq();
	}) ;
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
	if(temp_login_exist("plszllotCode")){
		var numberContent = read_temp_login("plszlnumberContent") ;
		var pls_bs = read_temp_login("plszl_bs") ;
		var pls_qs = read_temp_login("plszl_qs") ;
		mcpls.listCode = numberContent.split("$") ;
		$("#qs").val(pls_qs);
		$("#bs").val(pls_bs);
		showselq() ;
	}
}) ;

//拼成购买数据

//当前选号
function presentSelNum(){
	//select_code_id
	var selZSBalls=[] ;
	
	var zsthisp ;
	var zsCls ;
	var zsv ;
	for (var cc = 0; cc < 10; cc++) {
		//redthisp = selRed[cc] ;
		zsthisp = ballObje.zsball[cc].context ;
		zsCls =  zsthisp.getAttribute("class") ;
		zsv = zsthisp.getAttribute("index") ;
		if(zsCls=="tored"){
			selZSBalls.push(zsv) ;
		}
	}
	
	if(selZSBalls.length<3){
		mcpls.zs = 0 ;
		mcpls.zsball=[] ;
		$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
		$("#select_code_id").html("请每位至少选择<span class=\"red\">2</span>个号码");
	} else {
		var s = mcpls.z6_calzs(selZSBalls) ;
		mcpls.zs = s ;
		mcpls.amt = s * 2 ;
		mcpls.zsball=selZSBalls ;
		$("#m-submit_box_s").attr("class","m-submit_box") ;
		$("#select_code_id").html("选了<span class=\"red\">"+s+"</span>注，共<span class=\"red\">"+(s*2)+"</span>元");
	}
}


//计算排列三直选注数
mcpls.calZS=function(geweiBalls,shiweiBalls,baiweiBalls){
	return geweiBalls.length*shiweiBalls.length*baiweiBalls.length;
};
//计算排列三组三注数
mcpls.z3_calzs=function(balls) {
	return Cmn(balls.length, 2)* 2;
};
//计算排列三组六注数
mcpls.z6_calzs=function(balls) {
	return Cmn(balls.length, 3);
};

//计算排列三直选和值注数
mcpls.zhixu_he_calzs=function(balls) {
	var zx_hz_note = 0;
	for(var i = 0,j=balls.length;i<j;i++) {
		var count =balls[i].match(/\d+/ig);
		//通过值获取该对象
		//通过正则表达式的match获取到的是一个对象数组,直接引用的话是会报异常的
		var sumdata = eval(hezhiMap2002[parseInt(count[0])]);
		//从对象里面取出注数
		zx_hz_note += sumdata.noteCount;
	}
	return zx_hz_note;
};

//计算排列三组选和值注数
mcpls.zx_he_calzs=function(balls) {
	var zx_hz_note = 0;
	for(var i = 0,j=balls.length;i<j;i++) {
		var count =balls[i].match(/\d+/ig);
		//通过值获取该对象
		//通过正则表达式的match获取到的是一个对象数组,直接引用的话是会报异常的
		var sumdata = eval(hezhiMap2009[parseInt(count[0])]);
		//从对象里面取出注数
		zx_hz_note += sumdata.noteCount;
	}
	return zx_hz_note;
};

//计算组合数公式 C5/6
function Cmn( m,  n)
{
    var n1 = 1, n2 = 1;
    for (var i = m, j = 1; j <= n; n1 *= i--, n2 *= j++) ;
    return n1 / n2;
}
//获取期号
function activeIssue(){
	plstimeCounter("show_time" , false , function(){
		var tp_time =-1;
		var url = "/trade/num/pls!activeIssue.action?t="+new Date().getTime() ;
		baseAjax("get",url,false,null,"text",function(data){
	  		var lot_state = eval("("+data+")");
			if(!(typeof lot_state=="undefined") && lot_state != null){
				 tp_time = formatDate(lot_state.msg.officialEndTime , true) - formatDate(lot_state.msg.currentSysDate , true) ;
				 tp_time = tp_time / 1000 ;
			} else {
				tp_time =  -1 ;
			};
			if(lot_state.msg.issueCode != mcpls.issuecode){
				mcpls.issueid = lot_state.msg.issueId ;
				mcpls.issuecode = lot_state.msg.issueCode ;
				var times = formatDate(lot_state.msg.officialEndTime) ;
				mcpls.cur_nex_his.endtime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
				var dthtm="<strong>距"+mcpls.issuecode+"期截止</strong><strong id=\"show_time\">00小时00分00秒</strong><p class=\"gray mt_5\">至少选3个号，奖金173元</p>" ;
				$("#open_code_time_id").html(dthtm);
			}	
	  	});
		return tp_time ;
	});
}

function initdata(){
	mcpls.zsball=[] ;

	mcpls.zs = 0 ;
	mcpls.amt = 0 ;
	
	//清除选的颜色
	var danObj ;
	for (var cc = 0; cc < 10; cc++) {
		danObj = ballObje.zsball[cc].context ;
		danObj.setAttribute("class","i-redball");
	}
	
	//清除选号数量
	ballObje.zsNum = 0 ;
	
	$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
	$("#select_code_id").html("请每位至少选择<span class=\"red\">1</span>个号码");
}

//加载开奖信息，期号
function prizeData(){
	//type,url,async,data,dataType,callBack
	baseAjax("get" , plsjsonurl , false , null , "text" , function(data){
		var	x = eval('(' + data + ')');
		if(x != null){
			mcpls.cur_nex_his = x;
			showinfo(x);
		}
	});
}

//显示数据
function showinfo(jsoninfo){
	var htm = makehtml(jsoninfo) ;
	mcpls.issuecode = htm.issuecode ;
	mcpls.issueid = htm.issueid ;
	//mcpls.lotid = htm.lotid ;
	var times = formatDate(htm.opentime);
	mcpls.opentime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
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
	$("#open_code_time_id").html('<strong>距'+info.issuecode+'期截止  </strong><strong id=\"show_time\">00小时00分00秒</strong><p class=\"gray mt_5\">至少选3个号，奖金173元</p>');
	info.back = "" ;
	info.back = '<li class="d-boxadd"><div class="no">期号</div><div class="timeline"></div><div class="pl3totle"><div class="red1">开奖号</div><div class="blacktxtpl">和值</div><div class="blacktxt">形态</div><div class=""></div></div></li>' ;
	json.openlist.each(function(o , i){
		var hm = o.opencode.split(",") ;
		var hmstate ="组六" ;
		if(hm.length == 3){
			if(hm[0] == hm[1] && hm[0]==hm[2]){
				hmstate="豹子" ;
			} else if(hm[0] != hm[1] && hm[0]!=hm[2] && hm[1]!=hm[2]){
				hmstate="组六" ;
			} else {
				hsstate="组三" ;
			}
		}
		var cont1=hm.join(" ");
		var cont2 = "";
		try{
			cont2 = parseInt(hm[0])+parseInt(hm[1])+parseInt(hm[2]);
		}catch(e){
		}
		if(i == 0){
			info.head = "<div>上期开奖:"+cont1+"</div>" + "<span class='i-slide' onclick='showHistoryData(this)'><em class='i-slideDown'></em>点此展开历史开奖</span>";
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div>" +
					"<div class=\"pl3totle\"><div class=\"red1\">"+cont1+"</div><div class=\"blacktxtpl\">"+cont2+"</div><div class=\"blacktxt\">"+hmstate+"</div><div class=\"\"></div>";
					//  + "<span class='red'> "+hm[0]+"</span> <span class='blue'>"+hm[1]+"</span></div></li>";
		} else {
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div>" +
					"<div class=\"pl3totle\"><div class=\"red1\">"+cont1+"</div><div class=\"blacktxtpl\">"+cont2+"</div><div class=\"blacktxt\">"+hmstate+"</div><div class=\"\"></div>";		  
			//+ "<span class='red'> "+hm[0]+"</span> <span class='blue'>"+hm[1]+"</span></div></li>";
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

//进入购买页面
function showselq(){
	var temp = 2;
	var liCode = mcpls.listCode ;
	
	$("#selhm").hide();
	//计算总注数
	counttotalsz(liCode);
	var liht="" ;
	var cont = "" ;
	for (var i = liCode.length-1; i >=0; i--) {
		liht+="<li class='ssq'>" ;
		liht+="<var><span class='red'>";
		cont = liCode[i] ;
		liht+=cont ;
		liht+="</span></var>" ;
		liht+="<p>组六 "+getZs(liCode[i])+"注"+getZs(liCode[i])*temp+"元</p>" ;
		liht+="<i class='i-del' onclick='deli("+i+")'></i>";
	}
	var qs = $("#qs").val();
	var bs = $("#bs").val();
	$("#szs").html(mcpls.totalzs);
	$("#sam").html(mcpls.totalzs*qs*bs*temp);
	$("#sqs").html(qs);
	$("#sbs").html(bs);
	$("#addli").html(liht);
	$("#buy").show();
}

//获得总注数
function counttotalsz(liCode){
	mcpls.totalzs = 0 ;
	liCode.each(function(o){
		var v = o ;
		var rb = v.split(",") ;
		
		var zs = mcpls.z6_calzs(rb);
		mcpls.totalzs+=zs ;
	}) ;
}

//计算注数
function getZs(code){
	var rb = code.split(",") ;
	
	mcpls.zs = mcpls.z6_calzs(rb);
	return mcpls.zs;
}

// 删除已选号码
function deli(v){
	mcpls.listCode.splice(v,1);
	if(mcpls.listCode.length < 1){
		$("#selhm").show();
		$("#buy").hide();
	} else {
		showselq();
	}
}

//机选
function getRedRandom(){
	var startArray = [0,1,2,3,4,5,6,7,8,9];//seed array  
	var N = 3;//随机数个数  
	var resultArray = new Array();//结果存放在里面  
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray[i] = startArray[seed];//赋值给结果数组  
	    startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	return resultArray ;
}

//显示机选
function showRandom(){
	//先初始化数据
	initdata();
	
	var zsRan = getRedRandom();
	
	ballObje.zsball[zsRan[0]].context.setAttribute("class" , "tored") ;
	mcpls.zsball.push(zsRan[0]) ;
	
	ballObje.zsball[zsRan[1]].context.setAttribute("class" , "tored") ;
	mcpls.zsball.push(zsRan[1]) ;
	
	ballObje.zsball[zsRan[2]].context.setAttribute("class" , "tored") ;
	mcpls.zsball.push(zsRan[2]) ;
	
	presentSelNum();
	//selqList() ;
}

//机选一注
function radomone(){
	//先初始化数据
	initdata();
	
	var zsRan = getRedRandom();
	
	ballObje.zsball[zsRan[0]].context.setAttribute("class" , "tored") ;
	mcpls.zsball.push(zsRan[0]) ;
	
	ballObje.zsball[zsRan[1]].context.setAttribute("class" , "tored") ;
	mcpls.zsball.push(zsRan[1]) ;
	
	ballObje.zsball[zsRan[2]].context.setAttribute("class" , "tored") ;
	mcpls.zsball.push(zsRan[2]) ;
	
	presentSelNum();
	
	var zs = mcpls.zsball.join(",") ;
	mcpls.listCode.push(zs) ;
	showselq();
}


function toDoBuy(){
	confirmBuy();
	$("#totouzhu").one('click' , toDoBuy) ;
}
//确定投注
function confirmBuy(){
//	var cur_stop_time = new Date('2014/10/10 00:00:00');
	var cur_stop_time = new Date(mcpls.cur_nex_his.endtime.replace(/-/g,"/").replace("/.0/",""));
//	var nex_start_time = new Date(mcpls.cur_nex_his.nextissue.starttime.replace(/-/g,"/").replace("/.0/",""));
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
	
	var numberContent = mcpls.listCode.join("$");
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
		write_temp_login("plszllotCode" , "1" , 1) ;
		write_temp_login("plszlnumberContent" , numberContent , 1) ;
		write_temp_login("plszl_play" , mcpls.playId , 1) ;
		write_temp_login("plszl_bs" , multiple , 1) ;
		write_temp_login("plszl_qs" , trackCount , 1) ;
		//登录
		var bakUrl = "/v3shtml/trade/num/plszl.shtml" ;
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
	same.hasEnoughMoney(mcpls.playId,mcpls.lotid,trackCount,totalAmt,mcpls.lotid,mcpls.issuecode,callbackType,"");
}

function dobuy(){
	var numberContent = mcpls.listCode.join("$");
	var noteCount = mcpls.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	var totalAmt = parseInt(noteCount) * multiple * 2;
	var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
	//var isStop = 0;//追号是否停止
	var playId = mcpls.playId;//玩法
	var lotCode = mcpls.lotid;
	var issueId = mcpls.issueid;//期号ID
	var issueCode = mcpls.issuecode;
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
		};
		same.buySubmit(postData,$.trim(mcpls.opentime));
}

function doTempBuy(argJSON){
	var callbackType = argJSON.callbackType;
	var userBalacne = argJSON.allMoney;
	 var numberObject = mcpls.listCode.join("$");
     var multiple = $("#sbs").html(); // 倍数
     var trackCount = $("#sqs").html();
     var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
     var zhushu = mcpls.totalzs;
     var issue = mcpls.issuecode;
     var lotTypeCode = mcpls.lotid;
     var lotTypeplay = mcpls.playId;//玩法
     var temp = 2 ;
 	 var totalAmt = parseInt(zhushu) * multiple * temp * parseInt(trackCount);
     var stopMoney=0;
	 var investType = trackCount > 1 ? 2 : 1;
     var trackType = 0;	//追号类型
     var issueId = mcpls.issueid;//期号ID
     var startIssueCode=mcpls.issuecode;
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
     		isZjStop:isStop,
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
	var noteCount = mcpls.totalzs;// 注数
	var multiple =parseInt($("#sbs").html()); // 倍数
	var qs = parseInt($("#sqs").html());
	if(mcpls.playId == 1002 || mcpls.playId==1005)temp = 3 ;
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

