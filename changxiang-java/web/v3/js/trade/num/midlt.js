//var dltjsonurl = "/ipub/trade/issue!toMain.action?lotCode=1" ;
var dltjsonurl = "/data/issueOrMath/dlt_opencode.json";
var mcdlt ={} ;
mcdlt.issuecode = "";
mcdlt.issueid ="";
mcdlt.lotid = 1 ;
mcdlt.playId = 1001 ;
mcdlt.listCode=[];

mcdlt.redList=[] ;
mcdlt.blueList=[] ;

mcdlt.dtredList=[];
mcdlt.dtblueList=[];

mcdlt.zs = 0 ;
mcdlt.amt = 0 ;
mcdlt.totalzs = 0 ;
mcdlt.totalamt = 0 ;
mcdlt.opentime ;

var ballObje={} ;
ballObje.redball = [] ;
ballObje.blueball = [] ;
ballObje.redNum = 0 ;
ballObje.blueNum = 0 ;
ballObje.redDtNum = 0 ;
ballObje.blueDtNum = 0 ;

function initBallObj(){
	var redBall={} ;
	var blueBall={};
	
	$("i[name='selRed']").each(function(i , o){
		redBall[i+1] = $(o) ;
		redBall[i+1].click(function(){
			//var date1 = new Date();
			var thisp = $(this) ;
			var classValue = thisp.context.getAttribute("class") ;
			var vrq = thisp.context.getAttribute("vrq") ;
			if(classValue == "i-redball"){
				thisp.context.setAttribute("class","tored") ;
				ballObje.redNum = ballObje.redNum + 1 ; //红球加1
			} else if(classValue=="tored"){
				//if(ballObje.redNum >= 2 && (ballObje.redNum + ballObje.redDtNum) >= 6 && ballObje.redDtNum <= 3){
					thisp.context.setAttribute("class","i-balldan");
					thisp.context.innerHTML = vrq+"<b class=\"toudanms\">胆</b>" ;
					ballObje.redDtNum = ballObje.redDtNum + 1 ; //胆加1
					ballObje.redNum = ballObje.redNum - 1 ; //红球减1
				/*} else {
					thisp.context.setAttribute("class","i-redball") ;
					thisp.context.innerHTML = vrq ;
					ballObje.redNum = ballObje.redNum -1 ; //红球减1
					if(ballObje.redNum >= 2 && (ballObje.redNum + ballObje.redDtNum) >= 6 && ballObje.redDtNum <= 4){
					} else {
						var danObj ;
						var danCls  ;
						for (var cc = 1; cc < 36; cc++) {
							danObj = ballObje.redball[cc].context ;
							danCls = danObj.getAttribute("class") ;
							if(danCls == "i-balldan"){
								danObj.setAttribute("class","i-redball");
								danObj.innerHTML= danObj.getAttribute("vrq");
							}
						}
						ballObje.redDtNum = 0 ;//胆清0
					}
				}*/
			} else if(classValue=="i-balldan"){
				thisp.context.setAttribute("class","i-redball") ;
				thisp.context.innerHTML = vrq ;
				ballObje.redDtNum = ballObje.redDtNum - 1 ;//胆减1
				/*if(ballObje.redNum >= 2 && (ballObje.redNum + ballObje.redDtNum) >= 6 && ballObje.redDtNum <= 4){
				} else {
					var danObj ;
					var danCls  ;
					for (var cc = 1; cc < 36; cc++) {
						danObj = ballObje.redball[cc].context ;
						danCls = danObj.getAttribute("class") ;
						if(danCls == "i-balldan"){
							danObj.setAttribute("class","i-redball");
							danObj.innerHTML= danObj.getAttribute("vrq");
						}
					}
					ballObje.redDtNum = 0 ;//胆清0
				}*/
			}
			presentSelNum();
		}) ;
	}) ;
	$("i[name='selBlue']").each(function(i , o){
		blueBall[i+1] = $(o) ;
		blueBall[i+1].click(function(){
			var thisp = $(this).context ;
			var blueCls = thisp.getAttribute("class");
			var vbq = thisp.getAttribute("vbq");
			
			if(blueCls=="i-blueball"){
				thisp.setAttribute("class","toblue") ;
				ballObje.blueNum = ballObje.blueNum + 1 ;//蓝球加1
			} else if(blueCls=="toblue"){
				//if(ballObje.blueNum >= 2 && (ballObje.blueNum + ballObje.blueDtNum) >= 3 && ballObje.blueDtNum <= 0){
					thisp.setAttribute("class","i-blueballdan") ;
					thisp.innerHTML=vbq+"<b class=\"toudanms\">胆</b>";
					ballObje.blueDtNum = ballObje.blueDtNum + 1;//胆加1
					ballObje.blueNum = ballObje.blueNum-1 ;//蓝球减1
				/*} else {
					thisp.setAttribute("class","i-blueball") ;
					thisp.innerHTML = vbq;
					ballObje.blueNum = ballObje.blueNum - 1;//蓝球减1
					if(ballObje.blueNum >= 2 && (ballObje.blueNum + ballObje.blueDtNum) >= 3 && ballObje.blueDtNum <= 1){
					} else {
						var danObj ;
						var danCls ;
						for(var cc = 1 ; cc < 13 ; cc++){
							danObj = ballObje.blueball[cc].context ;
							danCls = danObj.getAttribute("class") ;
							if(danCls == "i-blueballdan"){
								danObj.setAttribute("class","i-blueball") ;
								danObj.innerHTML = danObj.getAttribute("vbq");
							}
						}
						ballObje.blueDtNum = 0 ; //胆清0
					}
				}*/
			} else if(blueCls=="i-blueballdan"){
				thisp.setAttribute("class","i-blueball") ;
				thisp.innerHTML = vbq ;
				ballObje.blueDtNum = ballObje.blueDtNum - 1 ;//胆减1
				/*if(ballObje.blueNum >= 2 && (ballObje.blueNum + ballObje.blueDtNum) >= 3 && ballObje.blueDtNum <= 1){
				} else {
					var danObj ;
					var danCls ;
					for(var cc = 1 ; cc < 13 ; cc++){
						danObj = ballObje.blueball[cc].context ;
						danCls = danObj.getAttribute("class") ;
						if(danCls == "i-blueballdan"){
							danObj.setAttribute("class","i-blueball") ;
							danObj.innerHTML = danObj.getAttribute("vbq");
						}
					}
					ballObje.blueDtNum = 0 ; //胆清0
				}*/
			}
			presentSelNum();
		}) ;
	}) ;
	ballObje.redball=redBall ;
	ballObje.blueball=blueBall ;
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
	
	
	//初始化数据
	prizeData();
	
	//加载红球，蓝球
	var q = redq();
	$("#redq").html(q.red) ;
	$("#blueq").html(q.blue) ;
	
	initBallObj();
	
	//跳转到买页面
	$("#tobuy").click(function(){		
		if(mcdlt.zs < 1){
			if(ballObje.redNum < 5 && ballObje.redDtNum < 1){
				open_message("请至少选5个红球");
			} else if(ballObje.redDtNum > 4){
				open_message("红球胆码最多4个");
			} else if(ballObje.redDtNum > 0 && (ballObje.redNum+ballObje.redDtNum < 6)){
				open_message("红球胆码+拖码至少需要6个");
			} else if(ballObje.blueNum <2 && ballObje.blueDtNum<1){
				open_message("请至少选2个蓝球");
			} else if(ballObje.blueDtNum > 1){
				open_message("蓝球胆码最多1个");
			} else if(ballObje.blueDtNum>0 && (ballObje.blueNum+ballObje.blueDtNum < 3)){
				open_message("蓝球胆码+拖码至少需要3个");
			} else {
				open_message("至少选择一注");
			}
			return ;
		}
		var red = mcdlt.redList.join(",") ;
		if(mcdlt.dtredList.length > 0){
			red = mcdlt.dtredList.join(",") + "#"+ red;
		}
		var blue= mcdlt.blueList.join(",") ;
		if(mcdlt.dtblueList.length > 0){
			blue = mcdlt.dtblueList.join(",")+"#" + blue;
		}
		mcdlt.listCode.push(red+"|"+blue) ;
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
		if(mcdlt.playId == 1002 || mcdlt.playId == 1005)temp = 3 ;
		$(this).val('');
		$(this).val(qs);
		
		$("#sqs").html(qs);
		$("#szs").html(mcdlt.totalzs);
		$("#sam").html(mcdlt.totalzs*qs*bs*temp);
	});

	$("#qs").keydown(function() {
		}).keyup(function(e) {
		var temp = 2 ;
		var qs = $(this).val();
		var bs = $("#bs").val();
		if(qs > 500)qs = 500;
		if(mcdlt.playId == 1002 || mcdlt.playId == 1005)temp = 3 ;
		$(this).val('');
		$(this).val(qs);
		
		$("#sqs").html(qs);
		$("#szs").html(mcdlt.totalzs);
		$("#sam").html(mcdlt.totalzs*qs*bs*temp);
	}) ;
	
	//倍数
	$("#bs").focus(function() {
		}).blur(function() {
		var temp = 2 ;
		var qs = $("#qs").val();
		var bs = $(this).val();
		if(bs > 99)bs = 99;
		if(mcdlt.playId == 1002 || mcdlt.playId == 1005)temp = 3 ;
		if(isNaN(bs) || bs <= 0)bs = 1 ;
		$(this).val('');
		$(this).val(bs);
		$("#sbs").html(bs);
		$("#szs").html(mcdlt.totalzs);
		$("#sam").html(mcdlt.totalzs*qs*bs*temp);
	});
	
	$("#bs").keydown(function() {
		}).keyup(function(e) {
		var temp = 2 ;
		var qs = $("#qs").val();
		var bs = $(this).val();
		if(bs > 99)bs = 99;
		if(mcdlt.playId == 1002 || mcdlt.playId == 1005)temp = 3 ;
		$(this).val('');
		$(this).val(bs);
		$("#sbs").html(bs);
		$("#szs").html(mcdlt.totalzs);
		$("#sam").html(mcdlt.totalzs*qs*bs*temp);
		
	}) ;
	
	//定时期号
	activeIssue();
/*	
	//异步定时获取期号
	//setInterval("activeIssue()" , 1000);
*/	
	//追加投注
	$("#addamt").click(function(){
		var thisv = $(this) ;
		if(thisv.attr("class") == "i-check"){
			mcdlt.playId = 1002 ;
			thisv.attr("class" , "i-checked") ;
		} else {
			mcdlt.playId = 1001 ;
			thisv.attr("class" , "i-check") ;
		}
		showselq();
	}) ;
	
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
	if(temp_login_exist("lotCode")){
		var numberContent = read_temp_login("numberContent") ;
		var dlt_play = read_temp_login("dlt_play") ;
		var dlt_bs = read_temp_login("dlt_bs") ;
		var dlt_qs = read_temp_login("dlt_qs") ;
		if(dlt_play == 1002 || dlt_play == 1005){
			$("#addamt").addClass("i-checked") ;
		}
		mcdlt.listCode = numberContent.split("$") ;
		$("#qs").val(dlt_qs);
		$("#bs").val(dlt_bs);
		showselq() ;
	}
}) ;

//拼成购买数据

//当前选号
function presentSelNum(){
	//select_code_id
	var redBalls=[] ;
	var blueBalls=[] ;
	var redBallsdt=[] ;
	var blueBallsdt=[] ;
	var redthisp ;
	var redCls ;
	var vrq ;
	for (var cc = 1; cc < 36; cc++) {
		//redthisp = selRed[cc] ;
		redthisp = ballObje.redball[cc].context ;
		redCls =  redthisp.getAttribute("class") ;
		vrq = redthisp.getAttribute("vrq") ;
		if(redCls=="tored"){
			redBalls.push(vrq) ;
		} else if(redCls=="i-balldan"){
			redBallsdt.push(vrq) ;
		}
	}
	var bluethisp ;
	var blueCls ;
	var vbq ;
	for (var cc = 1; cc < 13; cc++) {
		bluethisp = ballObje.blueball[cc].context ;
		blueCls = bluethisp.getAttribute("class");
		vbq = bluethisp.getAttribute("vbq");
		if(blueCls=="toblue"){
			blueBalls.push(vbq) ;
		} else if(blueCls=="i-blueballdan"){
			blueBallsdt.push(vbq) ;
		}
	}
	var bl = true ;
	if(blueBallsdt.length > 0){
		if((blueBallsdt.length + blueBalls.length) < 3 || blueBallsdt.length > 1){
			bl = false ;
		}
	}
	if(redBallsdt.length > 0){
		if((redBallsdt.length + redBalls.length) < 6 || redBallsdt.length > 4){
			bl = false ;
		} 
	}
	var s = mcdtcalZS(redBalls , redBallsdt , blueBalls , blueBallsdt) ;
	if(s > 0 && bl){
		mcdlt.zs = s ;
		mcdlt.redList = redBalls ;
		mcdlt.blueList = blueBalls ;
		mcdlt.dtredList = redBallsdt ;
		mcdlt.dtblueList = blueBallsdt ;
		$("#m-submit_box_s").attr("class","m-submit_box") ;
		$("#select_code_id").html("选了<span color=\"red\">"+s+"</span>注，共<span color=\"red\">"+(s*2)+"</span>元");
	} else {
		mcdlt.zs = 0 ;
		mcdlt.redList = [] ;
		mcdlt.blueList = [] ;
		mcdlt.dtredList = [] ;
		mcdlt.dtblueList = [] ;
		$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
		$("#select_code_id").html("请至少选<span color=\"red\">5</span>个红球+<span color=\"red\">2</span>个蓝球");
	}
}
//大乐透计算注数
function mcdtcalZS(redBalls , redBallsdt , bluBalls , bluBallsdt){
	var redzs=Math.c(redBalls.length,5-redBallsdt.length,18);
	var bluzs=Math.c(bluBalls.length,2-bluBallsdt.length,18);
	return redzs*bluzs;
};

//获取期号
function activeIssue(){
	dlttimeCounter("show_time" , false , function(){
		var tp_time =-1;
		var url = "/trade/num/dlt!activeIssue.action?t="+new Date().getTime() ;
		baseAjax("get",url,false,null,"text",function(data){
	  		var lot_state = eval("("+data+")");
			if(!(typeof lot_state=="undefined") && lot_state != null){
				 tp_time = formatDate(lot_state.msg.officialEndTime , true) - formatDate(lot_state.msg.currentSysDate , true) ;
				 tp_time = tp_time / 1000 ;
			} else {
				tp_time =  -1 ;
			};
			if(lot_state.msg.issueCode != mcdlt.issuecode){
				mcdlt.issueid = lot_state.msg.issueId ;
				mcdlt.issuecode = lot_state.msg.issueCode ;
				var times = formatDate(lot_state.msg.officialEndTime) ;
				mcdlt.cur_nex_his.endtime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
				var date= formatDate(lot_state.msg.officialOpenTime , true) ;
				var day = getTimeDiffer(date,new Date());
				var dthtm="<strong>距"+mcdlt.issuecode+"期截止</strong><strong id=\"show_time\">00天00小时00分00秒</strong><span class=\"gray\">奖池</span><span class=\"red\"></span>" ;
				$("#open_code_time_id").html(dthtm);
			}	
	  	});
		return tp_time ;
	});
}

function initdata(){
	mcdlt.redList=[] ;
	mcdlt.blueList=[] ;
	mcdlt.dtredList=[];
	mcdlt.dtblueList=[];
	mcdlt.zs = 0 ;
	mcdlt.amt = 0 ;
	
	//清除选的颜色
	var danObj ;
	for (var cc = 1; cc < 36; cc++) {
		danObj = ballObje.redball[cc].context ;
		danObj.setAttribute("class","i-redball");
		danObj.innerHTML= danObj.getAttribute("vrq");
	}
	for(var aa = 1 ; aa < 13 ; aa++){
		danObj = ballObje.blueball[aa].context ;
		danObj.setAttribute("class","i-blueball") ;
		danObj.innerHTML = danObj.getAttribute("vbq");
	}
	
	//清除选号数量
	ballObje.redNum = 0 ;
	ballObje.redDtNum = 0 ;
	ballObje.blueNum = 0 ;
	ballObje.blueDtNum = 0 ;
	
	$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
	$("#select_code_id").html('请至少选<span class="red">5</span>个红球+<span class="red">2</span>个蓝球');
}

//加载开奖信息，期号
function prizeData(){
	//type,url,async,data,dataType,callBack
	baseAjax("get" , dltjsonurl , false , null , "text" , function(data){
		var	x = eval('(' + data + ')');
		if(x != null){
			mcdlt.cur_nex_his = x;
			showinfo(x);
		}
	});
}

//显示红球，蓝球
function redq(){
	var redAndBlueq={};
	redAndBlueq.red = "" ;
	redAndBlueq.blue = "" ;
	for(var i = 1; i < 36; i++)redAndBlueq.red += '<label class="changeballcolor" name="redlabel"><i class="i-redball" name="selRed" selvalue="0" vrq=' + (i < 10 ? '0' + i : i) + '>'+ (i < 10 ? '0' + i: i) +'</i></label>';
	for(var i = 1; i < 13; i++)redAndBlueq.blue += '<label class="changeballcolor" name="bluelabel"><i class="i-blueball" name="selBlue" selvalue="0" vbq=' + (i < 10 ? '0' + i : i) + '>'+ (i < 10 ? '0' + i: i) +'</i></label>';
	return redAndBlueq ;
}

//显示数据
function showinfo(jsoninfo){
	var htm = makehtml(jsoninfo) ;
	mcdlt.issuecode = htm.issuecode ;
	mcdlt.issueid = htm.issueid ;
	//mcdlt.lotid = htm.lotid ;
	var times = formatDate(htm.opentime);
	mcdlt.opentime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
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
	$("#open_code_time_id").html('<strong>距'+info.issuecode+'期截止  </strong><strong id=\"show_time\">00天00小时00分00秒</strong>  <span class="gray">奖池</span><span class="red">'+moneyFormat(info.guncunPool)+'</span>');
	info.back = "" ;
	json.openlist.each(function(o , i){
		var hm = o.opencode.split("|") ;
		if(i == 0){
			info.head = "<div>上期开奖:"+hm[0]+" &nbsp;<span class='spline'></span>&nbsp;"+hm[1]+"</div>" + "<span class='i-slide' onclick='showHistoryData(this)'><em class='i-slideDown'></em>点此展开历史开奖</span>";
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div><div class=\"pl3totle\">"
					  + "<span class='red'> "+hm[0]+"</span> <span class='blue'>"+hm[1]+"</span></div></li>";
		} else {
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div><div class=\"pl3totle\">"
			 		  + "<span class='red'> "+hm[0]+"</span> <span class='blue'>"+hm[1]+"</span></div></li>";
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

//进入购买页面
function showselq(){
	var temp = 2;
	var liCode = mcdlt.listCode ;
	var dan = liCode.join("&") ;
	var isDan = 0 ; //是不是胆拖
	if(dan.indexOf("#") > -1){
		isDan = 1 ;
	}
	if($("#addamt").hasClass("i-checked")){
		if(isDan == 1){
			mcdlt.playId = 1005 ;
		} else {
			mcdlt.playId = 1002 ;
		}
	} else {
		if(isDan == 1){
			mcdlt.playId = 1004 ;
		} else {
			mcdlt.playId = 1001 ;
		}
	}
	if(mcdlt.playId == 1002 || mcdlt.playId == 1005){
		temp = 3 ;
	}
	$("#selhm").hide();
	//计算总注数
	counttotalsz(liCode);
	var liht="" ;		
	for (var i = liCode.length-1 ; i >= 0; i--) {
		liht+="<li class='ssq'>" ;
		liht+="<var><span class='red'>";
		var code = liCode[i].split("|") ;
		
		if(code[0].indexOf("#") > -1){
			var v = code[0].replace(/,/g, " ").split("#");
			liht+="["+v[0]+"]"+ v[1];
		} else {
			liht+=code[0].replace(/,/g, " ");
		}
		//liht+=code[0].replace(/,/g, " ");
		liht+="</span>" ;
		
		liht+="&nbsp;&nbsp;<span class='blue'>" ;
		if(code[1].indexOf("#") > -1){
			var v = code[1].replace(/,/g, " ").split("#");
			liht+="["+v[0]+"]"+ v[1];
		} else {
			liht+=code[1].replace(/,/g, " ");
		}
		//liht+=code[1].replace(/,/g, " "); 
		liht+="</span></var>" ;
		liht+="<p>"+getZs(liCode[i])+"注"+getZs(liCode[i])*temp+"元</p>" ;
		liht+="<i class='i-del' onclick='deli("+i+")'></i>";
	}
	var qs = $("#qs").val();
	var bs = $("#bs").val();
	$("#szs").html(mcdlt.totalzs);
	$("#sam").html(mcdlt.totalzs*qs*bs*temp);
	$("#sqs").html(qs);
	$("#sbs").html(bs);
	$("#addli").html(liht);
	$("#buy").show();
}

//获得总注数
function counttotalsz(liCode){
	mcdlt.totalzs = 0 ;
	liCode.each(function(o){
		var v = o ;
		var rb = v.split("|") ;
		var rdt = rb[0].split("#") ;
		var red = rdt[0].split(",") ;
		var reddt = [] ;
		if(rdt.length > 1){
			reddt=rdt[0].split(",") ;
			red = rdt[1].split(",") ;
		}
		var bdt = rb[1].split("#") ;
		var blue = bdt[0].split(",") ;
		var bluedt = [] ;
		if(bdt.length > 1){
			bluedt = bdt[0].split(",") ;
			blue = bdt[1].split(",") ;
		}
		var zs = mcdtcalZS(red, reddt, blue, bluedt) ;
		mcdlt.totalzs+=zs ;
	}) ;
}

//计算注数
function getZs(code){
	var rb = code.split("|") ;
	var rdt = rb[0].split("#") ;
	var red = rdt[0].split(",") ;
	var reddt = [] ;
	if(rdt.length > 1){
		reddt=rdt[0].split(",") ;
		red = rdt[1].split(",") ;
	}
	var bdt = rb[1].split("#") ;
	var blue = bdt[0].split(",") ;
	var bluedt = [] ;
	if(bdt.length > 1){
		bluedt = bdt[0].split(",") ;
		blue = bdt[1].split(",") ;
	}
	mcdlt.zs = mcdtcalZS(red, reddt, blue, bluedt) ;
	//mcdlt.zs = mcdltcalZS(red, blue);
	return mcdlt.zs;
}

// 删除已选号码
function deli(v){
	mcdlt.listCode.splice(v,1);
	if(mcdlt.listCode.length < 1){
		$("#selhm").show();
		$("#buy").hide();
	} else {
		showselq();
	}
}

//机选
function getRedRandom(){
	var startArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];//seed array  
	var N = 5;//随机数个数  
	var resultArray = new Array();//结果存放在里面  
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray[i] = startArray[seed];//赋值给结果数组  
	    startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	return resultArray ;
}
function getBlueRandom(){
	var startArray = [1,2,3,4,5,6,7,8,9,10,11,12];//seed array  
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
	var red_code_url = $("#redq").find("label");
	var blue_code_url = $("#blueq").find("label");
	
	red_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
		obj.html(obj.attr("vrq"));
	});
	
	blue_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-blueball");
		obj.html(obj.attr("vbq"));
	});
	
	var redball = getRedRandom();
	var blueball = getBlueRandom();
	
	mcdlt.redList= [] ;
	mcdlt.blueList=[] ;
	mcdlt.zs = 1 ;
	mcdlt.amt = 2 ;
	for(var i = 0 ; i < redball.length ; i++){
		var v = redball[i] ;
		ballObje.redball[v].context.setAttribute("class" , "tored") ;
		if(v < 10){
			v = "0"+v ;
		}
		mcdlt.redList.push(v) ;
		//$("#redq label i[vrq='" + v + "']").attr("class", "tored");
	}
		
	for(var i = 0 ; i < blueball.length ; i++){
		var v = blueball[i] ;
		ballObje.blueball[v].context.setAttribute("class" , "toblue") ;
		if(v < 10){
			v = "0"+v ;
		}
		mcdlt.blueList.push(v) ;
		//$("#blueq label i[vbq='" + v + "']").attr("class", "toblue");
	}
	ballObje.redNum = 5 ;
	ballObje.redDtNum = 0 ;
	ballObje.blueNum = 2 ;
	ballObje.blueDtNum = 2 ;
	presentSelNum();
	//selqList() ;
}

//机选一注
function radomone(){
	var redball = getRedRandom();
	var blueball = getBlueRandom();
	var redList= [] ;
	var blueList=[] ;
	
	for(var i = 0 ; i < redball.length ; i++){
		var v = redball[i] ;
		if(v < 10){
			v = "0"+v ;
		}
		redList.push(v) ;
	}
		
	for(var i = 0 ; i < blueball.length ; i++){
		var v = blueball[i] ;
		if(v < 10){
			v = "0"+v ;
		}
		blueList.push(v) ;
	}
	var red = redList.join(",") ;
	var blue= blueList.join(",") ;
	mcdlt.listCode.push(red+"|"+blue) ;
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
	var cur_stop_time = new Date(mcdlt.cur_nex_his.endtime.replace(/-/g,"/").replace("/.0/",""));
//	var nex_start_time = new Date(mcdlt.cur_nex_his.nextissue.starttime.replace(/-/g,"/").replace("/.0/",""));
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
	
	var numberContent = mcdlt.listCode.join("$");
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
		//toWriteTempData("dlt_number_content",numberContent);
		//toWriteTempData("dlt_play_id",mcdlt.playId);
		//toWriteTempData("dlt_bs_id",multiple);
		//toWriteTempData("dlt_qs_id",trackCount);
		write_temp_login("lotCode" , "1" , 1) ;
		write_temp_login("numberContent" , numberContent , 1) ;
		write_temp_login("dlt_play" , mcdlt.playId , 1) ;
		write_temp_login("dlt_bs" , multiple , 1) ;
		write_temp_login("dlt_qs" , trackCount , 1) ;
		//登录
//		toAuthLogin();
		var bakUrl = "/v3shtml/trade/num/dlt.shtml" ;
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
	if(!isOffline) {
		same.hasEnoughMoney(mcdlt.playId,mcdlt.lotid,trackCount,totalAmt,mcdlt.lotid,mcdlt.issuecode,callbackType,"");
	} else {
		same.offlineConfirmHtml(mcdlt.playId,mcdlt.lotid,trackCount,totalAmt,mcdlt.lotid,mcdlt.issuecode,callbackType,"");
	}
}

function dobuy(){
	var temp = 2 ;
	var numberContent = mcdlt.listCode.join("$");
	var noteCount = mcdlt.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	if(mcdlt.playId == 1002 || mcdlt.playId == 1005)temp = 3 ;
	var totalAmt = parseInt(noteCount) * multiple * temp ;//* parseInt(trackCount);
	var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
//	var isStop = 0;//追号是否停止
	var playId = mcdlt.playId;//玩法
	var lotCode = mcdlt.lotid;
	var issueId = mcdlt.issueid;//期号ID
	var issueCode = mcdlt.issuecode;
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
		same.buySubmit(postData,$.trim(mcdlt.opentime));
		/*$.post(url, postData, function post_Sucess(data){
			//返回处理
			//{flag:0,msg:"失败原因"}
			var backobject = eval("(" + data + ")");
			if(backobject.flag == 1){
				var json = eval('(' + backobject.msg + ')');
				if(json){
					var projectId = json.projectId ;
					if( typeof(projectId) == "undefined"){
						projectId= 0 ;
					}
					var issue = issueCode;
					var lot = lotCode;
					var opentime = $.trim(mcdlt.opentime) ;
					var paym = totalAmt * parseInt(trackCount);
					var investType = json.investType;
					window.location.href = "/mcpay/mc-pay!buyfinish.action?lotid="+lot+"&issueCode="+issue+"&projectId="+projectId+"&totalAmt="+paym+"&openTime="+opentime+"&investType="+investType+"&trackCount="+trackCount;
				};
			}else{
				open_message(backobject.msg);
				
			};
		}, 'text');*/
}

function doOfflineBuy(){
	var temp = 2 ;
	var numberContent = mcdlt.listCode.join("$");
	var noteCount = mcdlt.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	if(mcdlt.playId == 1002 || mcdlt.playId == 1005)temp = 3 ;
	var totalAmt = parseInt(noteCount) * multiple * temp ;//* parseInt(trackCount);
	var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
//	var isStop = 0;//追号是否停止
	var playId = mcdlt.playId;//玩法
	var lotCode = mcdlt.lotid;
	var issueId = mcdlt.issueid;//期号ID
	var issueCode = mcdlt.issuecode;
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
			payType:100,//付款方式：线下付款
         	isTicket:0//是否取票：0未取票
		};
		same.buySubmit(postData,$.trim(mcdlt.opentime));
		
}
//获取totalAmt
function getTotalAmt(){
	var temp = 2 ;
	var noteCount = mcdlt.totalzs;// 注数
	var qs = parseInt($("#sqs").html());
	var multiple =parseInt($("#sbs").html()); // 倍数
	if(mcdlt.playId == 1002 || mcdlt.playId==1005)temp = 3 ;
	var totalAmt = parseInt(noteCount) * multiple * temp * parseInt(qs);
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

