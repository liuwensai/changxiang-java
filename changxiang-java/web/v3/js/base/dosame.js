var same = {};

same.repeat = 0;
same.lotType = {
		"1":"大乐透",
		"2":"排列三",
		"3":"排列五",
		"4":"七星彩",
		"5":"22选5",
		"6":"胜负彩",
		"7":"6场半全",
		"8":"4场进球",
		"9":"竞彩足球",
		"10":"竞彩篮球",
		"20":"河北11选5",
		"21":"天津11选5"
};
/*
$(document).ready(function(){
	$('#rechcancel').live("click",function(){
		$(this).parent().parent().parent().remove();
	});
	$('#rechsure').live("click",function(){
		$(this).parent().parent().parent().remove();
		doTempBuy(same.argJSON);
	});
	$('#concancel').live("click",function(){
		$(this).parent().parent().parent().remove();
	});
	$('#consure').live("click",function(){
		$(this).parent().parent().parent().remove();
		dobuy();
	});
});
*/
same.onebutton=function(){
	$('#rechcancel').off("click").one("click",function(){
		$(this).parent().parent().parent().remove();
	});
	$('#rechsure').off("click").one("click",function(){
		$(this).parent().parent().parent().remove();
		doTempBuy(same.argJSON);
	});
	$('#concancel').off("click").one("click",function(){
		$(this).parent().parent().parent().remove();
	});
	$('#consure').off("click").one("click",function(){
		$(this).parent().parent().parent().remove();
		dobuy();
	});
};

same.oneOfflineButton=function(){
	$('#rechcancel').off("click").one("click",function(){
		$(this).parent().parent().parent().remove();
	});
	$('#rechsure').off("click").one("click",function(){
		$(this).parent().parent().parent().remove();
		doTempBuy(same.argJSON);
	});
	$('#concancel').off("click").one("click",function(){
		$(this).parent().parent().parent().remove();
	});
	$('#consure').off("click").one("click",function(){
		$(this).parent().parent().parent().remove();
		doOfflineBuy();
	});
};

same.recharge = '<article class="g-dialog_box masked ui-avc" id="js-rule_dialog">'+
			'<div class="g-dialog_body padding flex1"><div class=" mb_15 mt_10">'+
			'<h3 class="tits fontfulls">您的余额不足！<br />'+
			'还需充值<em class="red">{$rechargeMoney}</em>元<p>{$ptw}</p></h3>'+
			'</div><section class="m-dialog_submits ui-avc">'+
			'<a href="javascript:;" class="btn_white fullbtn flex1 mr_6" id="rechcancel">取消</a>'+
			'<a href="javascript:;" class="btn_red fullbtn flex1 ml_6" id="rechsure">去充值</a>'+
			'</section></div></article>';
same.onMoney='<article class="g-dialog_box masked ui-avc" id="js-rule_dialog">'+
			'<div class="g-dialog_body padding flex1"><div class=" mb_15 mt_10">'+
			'<h3 class="tits fontfulls">您的余额不足！<br />'+
			'还需充值<em class="red">{$rechargeMoney}</em>元<p>{$ptw}</p></h3>'+
			'</div><section class="m-dialog_submits ui-avc">'+
			'<a href="javascript:;" class="btn_white fullbtn flex1 mr_6" id="rechcancel">取消</a>'+
			'</section></div></article>';

same.confirm = '<article class="g-dialog_box masked ui-avc" id="pay_comfirm_id">'+
			'<div class="g-dialog_body padding flex1">'+
			'<div class=" mb_15 mt_10"><h3 class="tits fontfulls">'+
			'购彩金额：<em class="red">{$totalMoney}</em>元<br />'+
			'<div class="c_9 fontorz"><p>{$lotterystr}</p>'+
			'<!--账户余额：{$userAMT}元--><p>{$ptw}</p></div></h3></div>'+
			'<section class="m-dialog_submits ui-avc">'+
			'<a href="javascript:;" class="btn_white fullbtn flex1 mr_6" id="concancel">取消</a>'+
			'<a href="javascript:;" class="btn_red fullbtn flex1 ml_6" id="consure">确认</a>'+
			'</section></div></article>';

same.offlineconfirm = '<article class="g-dialog_box masked ui-avc" id="pay_comfirm_id">'+
'<div class="g-dialog_body padding flex1">'+
'<div class=" mb_15 mt_10"><h3 class="tits fontfulls">'+
'方案金额：<em class="red">{$totalMoney}</em>元<br />'+
'<div class="c_9 fontorz"><p>{$lotterystr}</p>'+
'<p>{$ptw}</p></div></h3></div>'+
'<section class="m-dialog_submits ui-avc">'+
'<a href="javascript:;" class="btn_white fullbtn flex1 mr_6" id="concancel">取消</a>'+
'<a href="javascript:;" class="btn_red fullbtn flex1 ml_6" id="consure">确认</a>'+
'</section></div></article>';

same.getConfirmHTML = function(json,lotCode,issue,isOffline){
	if(json.lotCode ==9||json.lotCode ==10){
		json.lotterystr = "投注信息：选择"+lotCode+"场，投注"+issue+"倍";
	}else if(json.lotCode == 6 && json.playId == 6001){
		var va ="已经选号码:<br/>" + json.context.replace(/0#/g,"<span style=\"color:blue;\">0</span>").replace(/1#/g,"<span style=\"color:blue;\">1</span>").replace(/3#/g,"<span style=\"color:blue;\">3</span>")+"<br/>";
		json.lotterystr = va+"彩票期数："+"胜负彩"+issue+"期";
	}else if(json.lotCode == 6 && json.playId == 6002){
		var va ="已经选号码:<br/>" +json.context.replace(/0#/g,"<span style=\"color:blue;\">0</span>").replace(/1#/g,"<span style=\"color:blue;\">1</span>").replace(/3#/g,"<span style=\"color:blue;\">3</span>")+"<br/>";
		json.lotterystr = va+"彩票期数："+"任选9场"+issue+"期";
	}else if(json.lotCode == 6 && json.playId == 6003){
		var va ="已经选号码(蓝色为胆):<br/>" +json.context.replace(/0#/g,"<span style=\"color:blue;\">0</span>").replace(/1#/g,"<span style=\"color:blue;\">1</span>").replace(/3#/g,"<span style=\"color:blue;\">3</span>")+"<br/>";
		json.lotterystr = va+"彩票期数："+"任选9场"+issue+"期";
	}else if(json.lotCode == 7){
		var va ="已经选号码:<br/>" +json.context.replace(/0#/g,"<span style=\"color:blue;\">0</span>").replace(/1#/g,"<span style=\"color:blue;\">1</span>").replace(/3#/g,"<span style=\"color:blue;\">3</span>")+"<br/>";
		json.lotterystr = va+"彩票期数："+"6场半全"+issue+"期";
	}else if(json.lotCode == 8){
		var va ="已经选号码:<br/>"+ json.context.replace(/0#/g,"<span style=\"color:blue;\">0</span>").replace(/1#/g,"<span style=\"color:blue;\">1</span>").replace(/3#/g,"<span style=\"color:blue;\">3</span>")+"<br/>";
		json.lotterystr = va+"彩票期数："+"4场进球"+issue+"期";
	} else {
		json.lotterystr = "彩票期数："+same.lotType[lotCode]+issue+"期";
	}
	var ptw = "" ;
	if(printTicketWay()==1){
		ptw = "<br/>本平台仅提供订单信息传递功能，彩民保存订单后，请与所在投注站联系，完成出票、取票、交易等操作。" ;
		//json.lotterystr=json.lotterystr+"<br/>您投注订单由您所在投注站出票，需要到投注站自行领票，确认领票后，投注站才会收到出票款";	
	}
	json.ptw = ptw ;
	var html = ""; 
	if(isOffline) {//线下支付
		html = same.offlineconfirm.tpl(json);
	} else {
		html = same.confirm.tpl(json);
	}
	return html;
};

same.getRechargeHTML = function(argJSON){
	json = {};
	same.argJSON = argJSON;
	//var temp = argJSON.money+0.004;
	//temp = temp.toFixed(2) ;
	json.rechargeMoney = argJSON.money; 
	var html = same.recharge.tpl(json);
	return html;
};

same.getOnMoneyHTML=function(argJSON){
	json = {};
	same.argJSON = argJSON;
	//var temp = argJSON.money+0.004;
	//temp = temp.toFixed(2) ;
	json.rechargeMoney = argJSON.money; 
	var html = same.onMoney.tpl(json);
	return html;
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
//确认提交
same.buySubmit = function(param){
	//竞彩重新格式玩法和号码
	if(param.lotTypeCode==9 || param.lotTypeCode==10) {
		var returnArr = same.getPlayIdAndBetNumber(param.lotPlayType,param.numberContent);
		var betPlayId = returnArr[0];//格式化后的玩法
		var betNumber = returnArr[1]; //格式化后的投注号码
		param.lotPlayType = betPlayId;
		param.numberContent = betNumber;
	}
	
//	if(same.repeat>0)
//		return;
//	same.repeat++;
	var url = "/ipub/trade/invest!toMain.action";
	var opentime = arguments[1];
	if(param.investType && param.investType == 2)
	   url='/trade/index!allTrack.action';
	$.post(url,param,function(responseText) {
		try {
			var json = eval('(' + responseText + ')');
			if (json && json.flag == 1) {
				var returnMsg = eval("(" + json.msg + ")");
				var lot = returnMsg.lotId;
				var playId = returnMsg.playId;
				var investType = returnMsg.investType;
				if(lot == 9 || lot == 10){
					var paym = param.totalAmt;
					var projectId = returnMsg.betProjectId;
					window.location.href = "/mcpay/mc-pay!buyjcfinish.action?lotid="+ lot + "&projectId=" + projectId + "&totalAmt=" + paym + "&investType="
						+ investType+ "&playId="+ playId+ "&jczmark=0";
				}else{
					var issue = param.issueCode;
					var projectId = returnMsg.projectId;
					if(!projectId)
						projectId = 0;
					var paym = param.totalAmt * parseInt(param.trackCount);
					if(param.investType && param.investType == 2){
						var mId=returnMsg.tmId;
						window.location.href = "/mcpay/mc-pay!buyfinish.action?lotid="+lot+"&playId="+playId+"&issueCode="+issue+"&tmId="
						+mId+"&totalAmt="+paym+"&openTime="+opentime+"&investType="+investType+"&trackCount="+param.trackCount;
					}else{
						window.location.href = "/mcpay/mc-pay!buyfinish.action?lotid="+lot+"&playId="+playId+"&issueCode="+issue+"&projectId="
						+projectId+"&totalAmt="+paym+"&openTime="+opentime+"&investType="+investType+"&trackCount="+param.trackCount;
					}
				}
			} else {
				open_message(json.msg);
		
			}
		} catch (err) {
			open_message(err);
	
		}
	}, "text");
};

/**
 * 校验金额
 * playid 玩法
 * lotcode 彩种
 * jczmark 追号期数  
 * totalm 总金额
 * len 彩种  如果彩种是竞彩表示选择了几场比赛，其他的彩种表示期号
 * showbs    如果彩种是竞彩表示倍数，其他的彩种表示期号
 * callbackType 购买类型 1普通购彩 2追号
 */
same.hasEnoughMoney = function(playId,lotCode,jczmark,totalm,len,showbs,callbackType , context){
	var url = "/trade/index!checkMoney.action?moneyTotal=" + totalm+"&t=" + new Date().getTime();
	if(lotCode!=9 && lotCode!=10){
		url +="&trackCount="+jczmark+"&traceMoney="+totalm*jczmark+"&isdongjie=100";
	}
	$.ajax({
		type : 'post',
		url : url,
		async : false,
		cache : false,
		dataType : "json",
		success : function(data) {
			if (data.flag == "2") {
				
					var obj = eval("(" + data.msg + ")");
					var o = {};
					o.playId = playId;
					o.lotCode = lotCode;
					if(lotCode==9 || lotCode==10)
						o.jczmark = jczmark;
					o.allMoney = obj.allMoney;
					o.money = Math.abs(obj.returnCash_);
					o.context = context ;
					if(callbackType)
						o.callbackType = callbackType;
					var rechargeHTML = "" ;
					if(obj.isable == "0"){
						rechargeHTML = same.getOnMoneyHTML(o) ; //不允许差额支付
					} else {
						rechargeHTML = same.getRechargeHTML(o);
					}
					$('body').append(rechargeHTML);
			} else if (data.flag == "1") {
				var obj = eval("(" + data.msg + ")");
				var o = {};
				if(lotCode==9 && lotCode==10)
					o.totalMoney = totalm*jczmark;
				else
					o.totalMoney = totalm;
				o.userAMT = obj.allMoney;
				o.lotCode = lotCode;
				o.context = context ;
				o.playId = playId ;
				var confirmHTML = same.getConfirmHTML(o,len,showbs,false);
				$('body').append(confirmHTML);
			} else {
				open_message(data.msg);
			}
			same.onebutton();
		}
	});
};

//线下支付确认html
same.offlineConfirmHtml = function(playId,lotCode,jczmark,totalm,len,showbs,callbackType , context) {
	var o = {};
	if(lotCode==9 && lotCode==10)
		o.totalMoney = totalm*jczmark;
	else
		o.totalMoney = totalm;
//	o.userAMT = obj.allMoney;
	o.lotCode = lotCode;
	o.context = context ;
	o.playId = playId ;
	var confirmHTML = same.getConfirmHTML(o,len,showbs,true);
	$('body').append(confirmHTML);
	same.oneOfflineButton();
};

//竞彩单一玩法，就不要以混合投注的玩法ID入库:获取入库的玩法和号码
same.getPlayIdByNum = function(betPlayId,betArr) {
	var playId = 0;
	for (var i = 0; i < betArr.length; i++) {
		var codeArr = betArr[i].split('/');
		for (var j = 0; j < codeArr.length; j++) {
			var everyCode = codeArr[j];
			if(everyCode.indexOf(';') != -1) {//存在多个玩法，返回混投玩法
				return betPlayId;
			} else {
				var playIds = parseInt(everyCode.split('|')[2].split('@')[0]);
				if(playId != 0 && playId != playIds) {//玩法不相同
					return betPlayId;
				} else {
					playId = playIds;
				}
			} 
		}
	}
	return playId;
};

var jcHhtzPlay = [9006,10005];//竞彩混投
//竞彩单一玩法，就不要以混合投注的玩法ID入库:获取入库的玩法和号码
same.getPlayIdAndBetNumber = function(betPlayId, betNumber) {
	var playId = 0;
	var betCode = betNumber;
	 
	betPlayId = parseInt(betPlayId);
	if(jcHhtzPlay.indexOf(betPlayId)>-1){
		if(betNumber.indexOf('#') != -1) {//存在胆
			var betArr = betNumber.split('#');
			playId = same.getPlayIdByNum(betPlayId, betArr);
		} else {
			var betArr = betNumber.split('$');
			playId = same.getPlayIdByNum(betPlayId, betArr);
		}
		if(jcHhtzPlay.indexOf(playId)==-1){
			betCode = betCode.replace(/\d{4,6}@/g, "");
		}
	} else {
		playId = betPlayId;
	}
	var returnArr = [];
	returnArr.push(playId);
	returnArr.push(betCode);
	return returnArr;
};