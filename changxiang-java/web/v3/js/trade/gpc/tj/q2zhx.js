//11选五任选
//var plsjsonurl = "/ipub/trade/issue!toMain.action?lotCode=1" ;
var rx = 1 ;
var gpcjsonurl = "/data/issueOrMath/tjgpc_opencode.json";
var gpc ={} ;
gpc.issuecode = "";
gpc.issueid ="";
gpc.lotid = 21 ;
gpc.playId = 21015 ;
gpc.listCode=[];

gpc.selball1=[] ;
gpc.selball2=[] ;

gpc.zs = 0 ;
gpc.amt = 0 ;
gpc.totalzs = 0 ;
gpc.totalamt = 0 ;
gpc.opentime ;

var ballObje={} ;
ballObje.selball1 = [] ;
ballObje.selball2 = [] ;

ballObje.selnum1 = 0 ;
ballObje.selnum2 = 0 ;

function initBallObj(){
	var selBall1={} ;
	var selBall2={} ;
	
	$("i[name='q2zhx1']").each(function(i,o){
		selBall1[i] = $(o) ;
		selBall1[i].click(function(){
			var thisp = $(this) ;
			var classValue= thisp.context.getAttribute("class") ;
//			var idxvalue= thisp.context.getAttribute("index") ;
			if(classValue=="i-redball"){
				thisp.context.setAttribute("class","tored") ;
				ballObje.selnum1 = ballObje.selnum1 + 1 ;
//				if(ballObje.selball2[idxvalue-1].context.getAttribute("class")=="tored"){
//					ballObje.selball2[idxvalue-1].context.setAttribute("class","i-redball");
//					ballObje.selnum2 = ballObje.selnum2 - 1 ;
//				}
			} else if(classValue=="tored"){
				thisp.context.setAttribute("class","i-redball") ;
				ballObje.selnum1 = ballObje.selnum1 - 1 ;
			}
			presentSelNum();
		}) ;
	});
	$("i[name='q2zhx2']").each(function(i,o){
		selBall2[i] = $(o) ;
		selBall2[i].click(function(){
			var thisp = $(this) ;
			var classValue= thisp.context.getAttribute("class") ;
//			var idxvalue= thisp.context.getAttribute("index") ;
			if(classValue=="i-redball"){
				thisp.context.setAttribute("class","tored") ;
				ballObje.selnum2 = ballObje.selnum2 + 1 ;
//				if(ballObje.selball1[idxvalue-1].context.getAttribute("class")=="tored"){
//					ballObje.selball1[idxvalue-1].context.setAttribute("class","i-redball");
//					ballObje.selnum1 = ballObje.selnum1 - 1 ;
//				}
			} else if(classValue=="tored"){
				thisp.context.setAttribute("class","i-redball") ;
				ballObje.selnum2 = ballObje.selnum2 - 1 ;
			}
			presentSelNum();
		}) ;
	});
	ballObje.selball1 = selBall1 ;
	ballObje.selball2 = selBall2 ;
}

$(document).ready(function(){
	//初始化数据
	prizeData();
	
	initBallObj();

	//跳转到买页面
	$("#tobuy").click(function(){		
		if(gpc.zs < 1){
			open_message("至少选择一注");
			return ;
		}
		var q2zhx1 = gpc.selball1.join(",") ;
		var q2zhx2 = gpc.selball2.join(",") ;
		
		gpc.listCode.push(q2zhx1+"|"+q2zhx2) ;
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
		if(gpc.playId == 1002 || gpc.playId == 1005)temp = 3 ;
		$(this).val('');
		$(this).val(qs);
		
		$("#sqs").html(qs);
		$("#szs").html(gpc.totalzs);
		$("#sam").html(gpc.totalzs*qs*bs*temp);
	});

	$("#qs").keydown(function() {
		}).keyup(function(e) {
		var temp = 2 ;
		var qs = $(this).val();
		var bs = $("#bs").val();
		if(qs > 500)qs = 500;
		if(gpc.playId == 1002 || gpc.playId == 1005)temp = 3 ;
		$(this).val('');
		$(this).val(qs);
		
		$("#sqs").html(qs);
		$("#szs").html(gpc.totalzs);
		$("#sam").html(gpc.totalzs*qs*bs*temp);
	}) ;
	
	//倍数
	$("#bs").focus(function() {
		}).blur(function() {
		var temp = 2 ;
		var qs = $("#qs").val();
		var bs = $(this).val();
		if(bs > 99)bs = 99;
		if(gpc.playId == 1002 || gpc.playId == 1005)temp = 3 ;
		if(isNaN(bs) || bs <= 0)bs = 1 ;
		$(this).val('');
		$(this).val(bs);
		$("#sbs").html(bs);
		$("#szs").html(gpc.totalzs);
		$("#sam").html(gpc.totalzs*qs*bs*temp);
	});
	
	$("#bs").keydown(function() {
		}).keyup(function(e) {
		var temp = 2 ;
		var qs = $("#qs").val();
		var bs = $(this).val();
		if(bs > 99)bs = 99;
		if(gpc.playId == 1002 || gpc.playId == 1005)temp = 3 ;
		$(this).val('');
		$(this).val(bs);
		$("#sbs").html(bs);
		$("#szs").html(gpc.totalzs);
		$("#sam").html(gpc.totalzs*qs*bs*temp);
		
	}) ;
	
	//定时期号
	activeIssue();
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
	if(temp_login_exist("tjq2zhxlotCode")){
		var numberContent = read_temp_login("tjq2zhxnumberContent") ;
		var pls_bs = read_temp_login("tjq2zhx_bs") ;
		var pls_qs = read_temp_login("tjq2zhx_qs") ;
		gpc.listCode = numberContent.split("$") ;
		$("#qs").val(pls_qs);
		$("#bs").val(pls_bs);
		showselq() ;
	}
}) ;

//拼成购买数据

//当前选号
function presentSelNum(){
	//select_code_id
	var selBalls1=[] ;
	var selBalls2=[] ;
	
	var baithisp ;
	var baiCls ;
	var baiv ;
	
	for (var cc = 1; cc < 12; cc++) {
		//redthisp = selRed[cc] ;
		baithisp = ballObje.selball1[cc-1].context ;
		baiCls =  baithisp.getAttribute("class") ;
		baiv = baithisp.getAttribute("index") ;
		if(baiCls=="tored"){
			if(baiv < 10){
				baiv = "0"+baiv ;
			}
			selBalls1.push(baiv) ;
		}
		
		baithisp = ballObje.selball2[cc-1].context ;
		baiCls =  baithisp.getAttribute("class") ;
		baiv = baithisp.getAttribute("index") ;
		if(baiCls=="tored"){
			if(baiv < 10){
				baiv = "0"+baiv ;
			}
			selBalls2.push(baiv) ;
		}
	}
	
	if(selBalls1.length < 1 || selBalls2.length <1){
		gpc.zs = 0 ;
		gpc.selball1=[] ;
		gpc.selball2=[] ;
		$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
		$("#select_code_id").html("请每位至少选择<span class=\"red\">1</span>个号码");
	} else {
		gpc.selball1=selBalls1 ;
		gpc.selball2=selBalls2 ;
		var s = gpc.calZS(gpc.selball1,gpc.selball2) ;
		gpc.zs = s ;
		gpc.amt = s * 2 ;
		if(s < 1){
			gpc.zs = 0 ;
			gpc.selball1=[] ;
			gpc.selball2=[] ;
			$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
			$("#select_code_id").html("请每位至少选择<span class=\"red\">1</span>个号码");
		} else {
			$("#m-submit_box_s").attr("class","m-submit_box") ;
			$("#select_code_id").html("选了<span class=\"red\">"+s+"</span>注，共<span class=\"red\">"+(s*2)+"</span>元");
		}
	}
}
gpc.calZS=function(selList1 , selList2){
	//m!/(m-n)!/n!
	var selNum = selList1.length ;
	var selNum2 = selList2.length ;
	
	var tem=0 ;
	for(var v = 0 ; v < selList1.length ; v++){
		for(var v2=0 ; v2 <selList2.length ; v2++ ){
			if(selList1[v]==selList2[v2]){
				tem+=1 ;
			}
		}
	}
	
	var zs = selNum*selNum2-tem ;
	if(zs <= 0){
		gpc.zs = 0 ;
		gpc.totalAmt = 0 ;
		gpc.amt = 0 ;
		return 0;
	}
	return zs ;
}


//获取期号
function activeIssue(){
	t11x5timeCounter("show_time" , false , function(){
		var tp_time =-1;
		var url = "/trade/gpc/tj/tj11x5!getNowIssue.action?t="+new Date().getTime() ;
		baseAjax("get",url,false,null,"text",function(data){
	  		var lot_state = eval("("+data+")");
			if(!(typeof lot_state=="undefined") && lot_state != null){
				 tp_time = formatDate(lot_state.hct_stop , true) - formatDate(lot_state.currentSysDate , true) ;
				 tp_time = tp_time / 1000 ;
			} else {
				tp_time =  -1 ;
			};
			if(lot_state.IssueCode != gpc.issuecode){
				gpc.issueid = lot_state.issueId ;
				gpc.issuecode = lot_state.IssueCode ;
				var times = formatDate(lot_state.hct_stop) ;
				gpc.cur_nex_his.endtime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
				var dthtm="<strong>距"+gpc.issuecode+"期截止</strong><strong id=\"show_time\">00分00秒</strong><p class=\"gray mt_5\">选2个号，按位猜中前2个开奖号，中奖130元</p>" ;
				$("#open_code_time_id").html(dthtm);
			}	
	  	});
		return tp_time ;
	});
}

function initdata(){
	gpc.selball1=[] ;
	gpc.selball2=[] ;

	gpc.zs = 0 ;
	gpc.amt = 0 ;
	
	//清除选的颜色
	var danObj ;
	for (var cc = 0; cc < 11; cc++) {
		danObj = ballObje.selball1[cc].context ;
		danObj.setAttribute("class","i-redball");
		danObj = ballObje.selball2[cc].context ;
		danObj.setAttribute("class","i-redball");
	}
	
	//清除选号数量
	ballObje.selnum1 = 0 ;
	ballObje.selnum2 = 0 ;
	$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
	$("#select_code_id").html("请每位至少选择<span class=\"red\">1</span>个号码");
}

//加载开奖信息，期号
function prizeData(){
	//type,url,async,data,dataType,callBack
	baseAjax("get" , gpcjsonurl , false , null , "text" , function(data){
		var	x = eval('(' + data + ')');
		if(x != null){
			gpc.cur_nex_his = x;
			showinfo(x);
		}
	});
}

//显示数据
function showinfo(jsoninfo){
	var htm = makehtml(jsoninfo) ;
	gpc.issuecode = htm.issuecode ;
	gpc.issueid = htm.issueid ;
	//gpc.lotid = htm.lotid ;
	var times = formatDate(htm.opentime);
	gpc.opentime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
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
	info.opentime.indexOf('.0')>-1?info.opentime = info.opentime.replace('.0',""):"";
	$("#open_code_time_id").html('<strong>距'+info.issuecode+'期截止  </strong><strong id=\"show_time\">00分00秒</strong><p class=\"gray mt_5\">选2个号，按位猜中前2个开奖号，中奖130元</p>');
	info.back = "" ;
	json.openlist.each(function(o , i){
		var hm = o.openCode.split(",") ;
		if(i == 0){
			info.head = "<div>上期开奖:"+(hm.join(" "))+ "<span class='i-slide' onclick='showHistoryData(this)'><em class='i-slideDown'></em>点此展开历史开奖</span>";
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issueCode+"期</div> <div class='timeline'></div><div class=\"pl3totle\">"
					  + "<span class='red'> "+(hm.join(" "))+"</span></div></li>";
		} else {
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issueCode+"期</div> <div class='timeline'></div><div class=\"pl3totle\">"
			 		  + "<span class='red'> "+(hm.join(" "))+"</span></div></li>";
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
	var liCode = gpc.listCode ;
	
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
		liht+="<p>前二直选： "+getZs(liCode[i])+"注"+getZs(liCode[i])*temp+"元</p>" ;
		liht+="<i class='i-del' onclick='deli("+i+")'></i>";
	}
	var qs = $("#qs").val();
	var bs = $("#bs").val();
	$("#szs").html(gpc.totalzs);
	$("#sam").html(gpc.totalzs*qs*bs*temp);
	$("#sqs").html(qs);
	$("#sbs").html(bs);
	$("#addli").html(liht);
	$("#buy").show();
}

//获得总注数
function counttotalsz(liCode){
	gpc.totalzs = 0 ;
	liCode.each(function(o){
		var v = o ;
		var rb = v.split("|") ;
		var v1 = rb[0].split(",");
		var v2 = rb[1].split(",");
		var zs = gpc.calZS(v1 , v2);
		gpc.totalzs+=zs ;
	}) ;
}

//计算注数
function getZs(code){
	var rb = code.split("|") ;
	var v1 = rb[0].split(",");
	var v2 = rb[1].split(",");
	gpc.zs = gpc.calZS(v1 , v2);
	return gpc.zs;
}

// 删除已选号码
function deli(v){
	gpc.listCode.splice(v,1);
	if(gpc.listCode.length < 1){
		$("#selhm").show();
		$("#buy").hide();
	} else {
		showselq();
	}
}

//机选
function getRedRandom(){
	var startArray = [0,2,3,4,5,6,7,8,9,10];//seed array  
	var N = 2;//随机数个数  
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
	
	var selRan1 = getRedRandom();
	
	ballObje.selball1[selRan1[0]].context.setAttribute("class" , "tored") ;
	gpc.selball1.push(selRan1[0]) ;
	
	ballObje.selball2[selRan1[1]].context.setAttribute("class" , "tored") ;
	gpc.selball2.push(selRan1[1]) ;
	presentSelNum();
	//selqList() ;
}

//机选一注
function radomone(){
	//先初始化数据
	initdata();
	
	var selRan1 = getRedRandom();
	ballObje.selball1[selRan1[0]].context.setAttribute("class" , "tored") ;
	ballObje.selball2[selRan1[1]].context.setAttribute("class" , "tored") ;
	presentSelNum();
	gpc.listCode.push(gpc.selball1.join(",")+"|"+gpc.selball2.join(",")) ;
	showselq();
}


function toDoBuy(){
	confirmBuy();
	$("#totouzhu").one('click' , toDoBuy) ;
}
//确定投注
function confirmBuy(){
//	var cur_stop_time = new Date('2014/10/10 00:00:00');
	var cur_stop_time = new Date(gpc.cur_nex_his.endtime.replace(/-/g,"/").replace("/.0/",""));
//	var nex_start_time = new Date(gpc.cur_nex_his.nextissue.starttime.replace(/-/g,"/").replace("/.0/",""));
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
	
	var numberContent = gpc.listCode.join("$");
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
		write_temp_login("tjq2zhxlotCode" , "1" , 1) ;
		write_temp_login("tjq2zhxnumberContent" , numberContent , 1) ;
		write_temp_login("tjq2zhx_play" , gpc.playId , 1) ;
		write_temp_login("tjq2zhx_bs" , multiple , 1) ;
		write_temp_login("tjq2zhx_qs" , trackCount , 1) ;
		//登录
		var bakUrl = "/v3shtml/trade/gpc/tj/q2zhx.shtml" ;
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
	same.hasEnoughMoney(gpc.playId,gpc.lotid,trackCount,totalAmt,gpc.lotid,gpc.issuecode,callbackType,"");
}

function dobuy(){
	var numberContent = gpc.listCode.join("$");
	var noteCount = gpc.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	var totalAmt = parseInt(noteCount) * multiple * 2;
	var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
	//var isStop = 0;//追号是否停止
	var playId = gpc.playId;//玩法
	var lotCode = gpc.lotid;
	var issueId = gpc.issueid;//期号ID
	var issueCode = gpc.issuecode;
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
			isdongjie:100, //冻结
			singleAmonut:singleAmonut,
			time : new Date().getTime(),//当前时间
		};
		same.buySubmit(postData,$.trim(gpc.opentime));
}

//差额支付时用
function doTempBuy(argJSON){
	var callbackType = argJSON.callbackType;
	var userBalacne = argJSON.allMoney;
	 var numberObject = gpc.listCode.join("$");
     var multiple = $("#sbs").html(); // 倍数
     var trackCount = $("#sqs").html();
     var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
     var zhushu = gpc.totalzs;
     var issue = gpc.issuecode;
     var lotTypeCode = gpc.lotid;
     var lotTypeplay = gpc.playId;//玩法
     var temp = 2 ;
 	 var totalAmt = parseInt(zhushu) * multiple * temp * parseInt(trackCount);
     var stopMoney=0;
	 var investType = trackCount > 1 ? 2 : 1;
     var trackType = 0;	//追号类型
     var issueId = gpc.issueid;//期号ID
     var startIssueCode=gpc.issuecode;
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
	var noteCount = gpc.totalzs;// 注数
	var multiple =parseInt($("#sbs").html()); // 倍数
	var qs = parseInt($("#sqs").html());
	if(gpc.playId == 1002 || gpc.playId==1005)temp = 3 ;
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

