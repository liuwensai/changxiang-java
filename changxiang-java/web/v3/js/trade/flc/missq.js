var ssqjsonurl = "/ipub/trade/issue!toMain.action?lotCode=50" ;

var mcssq = {};
mcssq.issuecode = "";
mcssq.issueid = "";
mcssq.lotid = 50;
mcssq.playId = 50001;
mcssq.listCode = [];
mcssq.redList = [];
mcssq.blueList = [];
mcssq.zs = 0;
mcssq.amt = 0;
mcssq.totalzs = 0;
mcssq.totalamt = 0;
mcssq.opentime;

$(document).ready(function(){
	// 初始化数据
	prizeData();

	// 加载红球，蓝球
	var q = redq();
	$("#redq").html(q.red);
	$("#blueq").html(q.blue);

	// 更新数据定时器
	// setInterval("prizeData()", 1500);

	$("label[name='redlabel']").click(function(){
		selqList();
	});

	$("label[name='bluelabel']").click(function(){
		selqList();
	});
	
	
	//判断登陆前是否选择了购买号码
	var number_content = toReadTempData("ssq_number_content");
	if(number_content != null && number_content != ""){
		toWriteTempData("ssq_number_content",null);
		showBuyNumber(number_content);
	}

	// 跳转到买页面
	$("#tobuy").click(function(){
		selqList();
		if(mcssq.zs < 1){
			showRandom();
			selqList();
		}else{
			var red = mcssq.redList.join(",");
			var blue = mcssq.blueList.join(",");
			mcssq.listCode.push(red + "|" + blue);
			showselq();
		}
	});

	// 跳转到继续购买
	$("#contisel").click(function(){
		initdata();
		$("#selhm").show();
		$("#buy").hide();
	});

	// 返回到选号页面
	$("#returntosel").click(function(){
		initdata();
		$("#selhm").show();
		$("#buy").hide();
	});

	// 立即支付
	$("#totouzhu").one('click', toDoBuy);

	$("#iknow").click(function(){
		$("#agreegz").hide();
	});

	// 同意购彩协议
	$("#iagree").click(function(){
		var thisv = $(this);
		if(thisv.attr("class") == "i-check"){
			thisv.attr("class", "i-check i-checked");
		}else{
			thisv.attr("class", "i-check");
		}
	});
	// 倍数 期数 改变事件
	qsbschange();

	activeIssue();
	// 异步定时更新期号
	// setInterval("activeIssue()" , 1000) ;
	var hf = window.location.search ;
	if(hf != null && hf != ""){
		var v = hf.split("=") ;
		if(v.length > 1){
			mcssq.listCode.push(v[1]);
			showselq();
		}
	}
	
});

// 获取期号
function activeIssue(){
	var url = "/trade/flc/ssq!activeIssue.action";
	$.ajax({
		type : "POST",
		url : url,
		async : true,
		dataType : "json",
		timeout : 5000,
		success : function(rd){
			if(rd != null){
				var msg = rd.msg;
				mcssq.issueid = msg.issueId;
				mcssq.issuecode = msg.issueCode;
				mcssq.opentime = formatDate(msg.officialOpenTime);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
}

function formatDate(str){
	var st;
	if(isNaN(str)){
		st = str.replace(/-/g, "/");
	}else{
		st = str;
	}
	var now = new Date(st);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

// 期数倍数改变
function qsbschange(){
	// 期数
	$("#qs").focus(function(){
	}).blur(function(){
		var qs = $("#qs").val();
		var bs = $("#bs").val();
		if(isNaN(qs) || qs <= 0){
			qs = 1;
			// $("#qs").val(qs);
		}
		$("#szs").html(mcssq.totalzs);
		$("#sam").html(mcssq.totalzs * qs * bs * 2);
		$("#sbs").html(bs);
		$("#sqs").html(qs);
	});

	$("#qs").keyup(function(){
		var qs = $("#qs").val();
		var bs = $("#bs").val();
		if(isNaN(qs) || qs <= 0){
			qs = 1;
			// $("#qs").val(qs);
		}
		$("#szs").html(mcssq.totalzs);
		$("#sam").html(mcssq.totalzs * qs * bs * 2);
		$("#sbs").html(bs);
		$("#sqs").html(qs);
	});

	// 倍数
	$("#bs").focus(function(){
	}).blur(function(){
		var qs = $("#qs").val();
		var bs = $("#bs").val();
		if(isNaN(bs) || bs <= 0){
			bs = 1;
			// $("#bs").val(bs);
		}
		$("#szs").html(mcssq.totalzs);
		$("#sam").html(mcssq.totalzs * qs * bs * 2);
		$("#sbs").html(bs);
		$("#sqs").html(qs);

	});

	$("#bs").keyup(function(){
		var qs = $("#qs").val();
		var bs = $("#bs").val();
		if(isNaN(bs) || bs <= 0){
			bs = 1;
			// $("#bs").val(bs);
		}
		$("#szs").html(mcssq.totalzs);
		$("#sam").html(mcssq.totalzs * qs * bs * 2);
		$("#sbs").html(bs);
		$("#sqs").html(qs);

	});

	$("#qsdsc").click(function(){
		var qs = $("#qs").val();
		var bs = $("#bs").val();
		qs = parseInt(qs);
		qs = qs - 1;
		if(isNaN(qs) || qs <= 0){
			qs = 1;
		}
		$("#qs").val(qs);
		$("#szs").html(mcssq.totalzs);
		$("#sam").html(mcssq.totalzs * qs * bs * 2);
		$("#sbs").html(bs);
		$("#sqs").html(qs);
	});

	$("#qsadd").click(function(){
		var qs = $("#qs").val();
		var bs = $("#bs").val();
		qs = parseInt(qs);
		qs = qs + 1;
		if(isNaN(qs) || qs <= 0){
			qs = 1;
		}
		$("#qs").val(qs);
		$("#szs").html(mcssq.totalzs);
		$("#sam").html(mcssq.totalzs * qs * bs * 2);
		$("#sbs").html(bs);
		$("#sqs").html(qs);
	});

	$("#bsdsc").click(function(){
		var qs = $("#qs").val();
		var bs = $("#bs").val();
		bs = parseInt(bs);
		bs = bs - 1;
		if(isNaN(bs) || bs <= 0){
			bs = 1;
		}
		$("#bs").val(bs);
		$("#szs").html(mcssq.totalzs);
		$("#sam").html(mcssq.totalzs * qs * bs * 2);
		$("#sbs").html(bs);
		$("#sqs").html(qs);
	});

	$("#bsadd").click(function(){
		var qs = $("#qs").val();
		var bs = $("#bs").val();
		bs = parseInt(bs);
		bs = bs + 1;
		if(isNaN(bs) || bs <= 0){
			bs = 1;
		}
		$("#bs").val(bs);
		$("#szs").html(mcssq.totalzs);
		$("#sam").html(mcssq.totalzs * qs * bs * 2);
		$("#sbs").html(bs);
		$("#sqs").html(qs);
	});
}

function initdata(){
	mcssq.redList = [];
	mcssq.blueList = [];
	mcssq.zs = 0;
	mcssq.amt = 0;
	var red_code_url = $("#redq").find("label");
	var blue_code_url = $("#blueq").find("label");
	
	red_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
	});
	
	blue_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
	});
	
	$("#select_code_id").html('请至少选<span class="red">6</span>个红球+<span class="red">1</span>个蓝球');
}

// 选择球
function selqList(){
	mcssq.redList = [];
	mcssq.blueList = [];
	var red_code_url = $("#redq").find("label");
	var blue_code_url = $("#blueq").find("label");
	red_code_url.each(function(index, el) {
		
		var obj = $(this).find("i");
		if(obj.attr("class") == "i-redball checked"){
			var v = obj.attr("vrq");
			mcssq.redList.push(v);
		}
		
	});
	
	blue_code_url.each(function(index, el) {
		
		var obj = $(this).find("i");
		if(obj.attr("class") == "i-redball checked"){
			var v = obj.attr("vbq");
			mcssq.blueList.push(v);
		}
		
	});
	
	mcssq.zs = mcssqcalZS(mcssq.redList, mcssq.blueList);
	mcssq.amt = mcssq.zs * 2;
	if(mcssq.zs > 0){
		//$("#tobuy").html("共" + mcssq.zs + "注，继续下一步");
	}else{
		$("#select_code_id").html('请至少选<span class="red">6</span>个红球+<span class="red">1</span>个蓝球');
	}
}

// 双色球计算注数
function mcssqcalZS(redBalls, bluBalls){
	redzs = Math.c(redBalls.length, 6);
	bluzs = Math.c(bluBalls.length, 1);
	return redzs * bluzs;
};

// 加载开奖信息，期号
function prizeData(){
	getJsonDataAndSetToVar(ssqjsonurl, true, null);
}

// 显示红球，蓝球
function redq(){
	var redAndBlueq = {};
	redAndBlueq.red = "";
	redAndBlueq.blue = "";
	for(var i = 1; i < 34; i++)redAndBlueq.red += '<label name="redlabel"><i class="i-redball" name="selRed" selvalue="0" vrq=' + (i < 10 ? '0' + i : i) + '>'+ (i < 10 ? '0' + i: i) +'</i></label>';
	for(var i = 1; i < 17; i++)redAndBlueq.blue += '<label name="bluelabel"><i class="i-blueball" name="selBlue" selvalue="0" vbq=' + (i < 10 ? '0' + i : i) + '>'+ (i < 10 ? '0' + i: i) +'</i></label>';
	return redAndBlueq;
}

// 显示数据
function showinfo(jsoninfo){

	var htm = makehtml(jsoninfo);

	mcssq.issuecode = htm.issuecode;
	mcssq.issueid = htm.issueid;
	// mcssq.lotid = htm.lotid ;
	mcssq.opentime = formatDate(htm.opentime);

	$("#head").html(htm.head);
	$("#back").html(htm.back);
}

// 生成数据
function makehtml(json){
	var info = {};
	info.lotid = json.lotid;
	info.issueid = json.issueid;
	info.issuecode = json.issuecode;
	info.starttime = json.starttime;
	info.endtime = json.endtime;
	info.prizeinfo = json.prizeinfo;
	info.opentime = json.opentime;

	// info.head = "<ul><li>第"+json.issuecode+"期&nbsp;"+json.prizeinfo+"</li></ul>" +
	// "<span class='i-slideUp' onclick='slideUp(0)' style='display:none'>点击收起</span><span class='i-slideDown' onclick='slideUp(1)'>点击历史开奖</span>" ;
	
	info.back = "";
	json.openlist.each(function(o, i){
		var hm = o.opencode.split("|");
		
		if(i == 0){
			info.head = "<div>上期开奖:"+hm[0]+" &nbsp;<span class='spline'></span>&nbsp;"+hm[1]+"</div>" + "<span class='i-slideDown'>下拉历史开奖</span>";
			info.back +="<li class='d-box'><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div><div>"
					  + "<span class='red'> "+hm[0]+"</span> <span class='blue'>"+hm[1]+"</span></div></li>";
		} else {
			info.back +="<li class='d-box'><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div><div>"
			 		  + "<span class='red'> "+hm[0]+"</span> <span class='blue'>"+hm[1]+"</span></div></li>";
		}
	});
	return info;
}

// 显示或隐藏历史期
function slideUp(v){
	// 1显示
	if(v == 1){
		$("#back").show();
		$("span[name='up']").show();
		$("span[name='down']").hide();
	}else{
		$("#back").hide();
		$("span[name='up']").hide();
		$("span[name='down']").show();
	}
}

/**
 * 通过ajax同步方式取得后台json格式的数据， async : 是否同步 requestData ： 请求数据
 */
function getJsonDataAndSetToVar(url, async, requestData){
	var returnData = null;
	url = ajaxToData(50);
	url ="D:/tomcat/tomcat_xiaomi3g/webapps/xiaomi-3g/data/trade/ssq/ssq_opencode.json";
	$.ajax({
		type : "POST",
		url : url,
		async : true,
		dataType : "text",
		timeout : 5000,
		success : function(rd){
			returnData = eval('(' + rd + ')');
			if(returnData != null)
				showinfo(returnData);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
	return returnData;
}

// 进入购买页面
function showselq(){

	$("#selhm").hide();

	var liCode = mcssq.listCode;

	// 计算总注数
	counttotalsz(liCode);

	var liht = "";
	for(var i = 0; i < liCode.length; i++){
		liht += "<li class='ssq'>";
		liht += "<var><span class='red'>";
		var code = liCode[i].split("|");
		liht += code[0].replace(/,/g, " ");
		liht += "</span>";

		liht += "&nbsp;&nbsp;<span class='blue'>";
		liht += code[1].replace(/,/g, " ");
		liht += "</span></var>";
		liht += "<p>" + getZs(liCode[i]) + "注" +getZs(liCode[i]) * 2 + "元</p>";
		liht += "<i class='i-del' onclick='deli(" + i + ")'></i>";
	}

	var qs = $("#qs").val();
	var bs = $("#bs").val();

	$("#szs").html(mcssq.totalzs);
	$("#sam").html(mcssq.totalzs * qs * bs * 2);
	$("#sqs").html(qs);
	$("#sbs").html(bs);

	$("#addli").html(liht);
	$("#buy").show();
}


//将登陆选定的购买号码显示在购买页面
function showBuyNumber(number){
	$("#selhm").hide();

	var liCode = number.split("$");

	mcssq.listCode = number.split("$");
	
	// 计算总注数
	counttotalsz(liCode);

	var liht = "";
	for(var i = 0; i < liCode.length; i++){
		liht += "<li class='ssq'>";
		liht += "<var><span class='red'>";
		var code = liCode[i].split("|");
		liht += code[0].replace(/,/g, " ");
		liht += "</span>";

		liht += "&nbsp;&nbsp;<span class='blue'>";
		liht += code[1].replace(/,/g, " ");
		liht += "</span></var>";
		liht += "<p>" + getZs(liCode[i]) + "注" + getZs(liCode[i]) * 2 + "元</p>";
		liht += "<i class='i-del' onclick='deli(" + i + ")'></i>";
	}

	var qs = $("#qs").val();
	var bs = $("#bs").val();

	$("#szs").html(mcssq.totalzs);
	$("#sam").html(mcssq.totalzs * qs * bs * 2);
	$("#sqs").html(qs);
	$("#sbs").html(bs);

	$("#addli").html(liht);
	$("#buy").show();
}

// 获得总注数
function counttotalsz(liCode){
	mcssq.totalzs = 0;
	liCode.each(function(o){
		var v = o;
		var rb = v.split("|");
		var red = rb[0].split(",");
		var blue = rb[1].split(",");
		var zs = mcssqcalZS(red, blue);
		mcssq.totalzs += zs;
	});
}

//计算注数
function getZs(code){
	var rb = code.split("|");
	var red = rb[0].split(",");
	var blue = rb[1].split(",");
	mcssq.zs = mcssqcalZS(red, blue);
	return mcssq.zs;
}

// 删除已选号码
function deli(v){
	mcssq.listCode.splice(v, 1);
	if(mcssq.listCode.length < 1){
		$("#buy").hide();
		$("#selhm").show();
	}else{
		showselq();
	}
}

// 机选
function getRedRandom(){
	var startArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33 ];// seed array
	var N = 6;// 随机数个数
	var resultArray = new Array();// 结果存放在里面
	for(var i = 0; i < N; i++){
		var seed = Math.floor(Math.random() * (startArray.length - i));// Math.random(0, startArray.length - i);//从剩下的随机数里生成
		resultArray[i] = startArray[seed];// 赋值给结果数组
		startArray[seed] = startArray[startArray.length - i - 1];// 把随机数产生过的位置替换为未被选中的值。
	}
	return resultArray;
}
function getBlueRandom(){
	var startArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];// seed array
	var N = 1;// 随机数个数
	var resultArray = new Array();// 结果存放在里面
	for(var i = 0; i < N; i++){
		var seed = Math.floor(Math.random() * (startArray.length - i));// Math.random(0, startArray.length - i);//从剩下的随机数里生成
		resultArray[i] = startArray[seed];// 赋值给结果数组
		startArray[seed] = startArray[startArray.length - i - 1];// 把随机数产生过的位置替换为未被选中的值。
	}
	return resultArray;
}

// 显示机选
function showRandom(){

	var red_code_url = $("#redq").find("label");
	var blue_code_url = $("#blueq").find("label");
	
	red_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
	});
	
	blue_code_url.each(function(index, el) {
		var obj = $(this).find("i");
		obj.attr("class","i-redball");
	});
	
	var redball = getRedRandom();
	var blueball = getBlueRandom();

	mcssq.redList = [];
	mcssq.blueList = [];
	mcssq.zs = 1;
	mcssq.amt = 2;
	for(var i = 0; i < redball.length; i++){
		var v = redball[i];
		if(v < 10){
			v = "0" + v;
		}
		mcssq.redList.push(v);
		$("#redq label i[vrq='" + v + "']").attr("class", "i-redball checked");
	}

	for(var i = 0; i < blueball.length; i++){
		var v = blueball[i];
		if(v < 10){
			v = "0" + v;
		}
		mcssq.blueList.push(v);
		$("#blueq label i[vbq='" + v + "']").attr("class", "i-redball checked");
	}
	selqList();
	// $("#tobuy").html("共"+mcssq.zs+"注，继续下一步");
}

// 机选一注
function radomone(){
	var redball = getRedRandom();
	var blueball = getBlueRandom();
	mcssq.redList = [];
	mcssq.blueList = [];
	mcssq.zs = 1;
	mcssq.amt = 2;

	for(var i = 0; i < redball.length; i++){
		var v = redball[i];
		if(v < 10){
			v = "0" + v;
		}
		mcssq.redList.push(v);
	}

	for(var i = 0; i < blueball.length; i++){
		var v = blueball[i];
		if(v < 10){
			v = "0" + v;
		}
		mcssq.blueList.push(v);
	}

	var red = mcssq.redList.join(",");
	var blue = mcssq.blueList.join(",");
	mcssq.listCode.push(red + "|" + blue);
	showselq();
}

//去购买 
function toDoBuy(){
	doBuy();
	$("#totouzhu").one("click", toDoBuy);
}
// 确定投注
function doBuy(){

	if($("#iagree").attr("class") == "i-check"){		
		open_message("您需要同意“购彩协议”才能投注!");
		return;
	}

	var numberContent = mcssq.listCode.join("$");
	
	if(!toCheckLogin()){
		
		// 保存数据
		toWriteTempData("ssq_number_content",numberContent);
		// 登录
		toAuthLogin();
		return;
	}

	var noteCount = mcssq.totalzs;// 注数
	var multiple = $("#sbs").html(); // 倍数
	var trackCount = $("#sqs").html();
	if(numberContent == null || numberContent == ""){		
		open_message("请选择号吗");
		return;
	}
	if(isNaN(multiple) || multiple < 1){	
		open_message("倍数只能是数字，并且至少1倍");
		return;
	}
	if(isNaN(trackCount) || trackCount < 1){		
		open_message("期数只能是数字,并且至少1期");
		return;
	}
	var totalAmt = parseInt(noteCount) * parseInt(multiple) * 2;

	var playId = 50001;// 玩法
	var lotCode = mcssq.lotid;
	var issueId = mcssq.issueid;// 期号ID
	var issueCode = mcssq.issuecode;
	var buySource = 10;// 购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
	if(numberContent == null || numberContent == ""){
		open_message("没有选码投注号码，请添加号码");		
		return;
	}
	
	var flag = false;//判断金额审核是否能够通过
	var investType = trackCount > 1 ? 2 : 1;
	//金额审核
	$.ajax({
		type : "post", 
		url:"/trade/index!checkMoney.action?moneyTotal="+totalAmt*trackCount+"&t=" + new Date().getTime(),
		async:false,
		success:function post_Sucess(data){
					data = eval("(" + data + ")");
				   	if(data.flag == 1){
				   		flag = true;
				   	}else if(data.flag == 2){
				   		var obj =eval("(" +data.msg+ ")");
				   		$("#balance_id").html(obj.allMoney);
				   		$("#pay_amount_id").html(totalAmt);
				   		$("#difference_id").html(obj.returnCash_);
				   		if(investType == 2 || investType == 3){
							$("#to_recharge_id").attr("onclick","doTempTrackBuy()");
						}else{
							$("#to_recharge_id").attr("onclick","doTempBuy()");
						}
				   		$("#chargeAlertlightbox").show();
				   	}else{
				   		open_message(data.msg);
				   	}
				}
});
	
	if(!flag) return ;//如果金额审核不能通过则不能发起购买
	var postData = {
		multiple : multiple,
		numberContent : numberContent,
		noteCount : noteCount,
		totalAmt : totalAmt,
		lotPlayType : playId,//
		issueCode : issueCode,// 期号//
		lotTypeCode : playId,//
		lotCode : lotCode,//
		issueId : issueId,//
		startIssueId : issueId,
		startIssueCode : issueCode,
		investType : investType,// 1当前值是代购 , 2追号
		stop : 1,
		trackCount : trackCount,// 追号期数
		buySource : buySource,// 购买来源
		isdongjie:100, //默认冻结
		time : new Date().getTime(),// 当前时间
	};
	// open_message(eval(postData)) ;
	var url = "/ipub/trade/invest!toMain.action";
	if(investType == 2){
		url = "/trade/index!allTrack.action";
	}
	$.post(url, postData, function post_Sucess(data){
		// 返回处理
		// {flag:0,msg:"失败原因"}
		var backobject = eval("(" + data + ")");
		if(backobject.flag == 1){
			var json = eval('(' + backobject.msg + ')');
			if(json){
				var projectId = json.projectId;
				if(typeof (projectId) == "undefined"){
					projectId = 0;
				}
				var issue = issueCode;
				var lot = lotCode;
				var opentime = $.trim(mcssq.opentime);
				var paym = totalAmt * parseInt(trackCount);
				var investType = json.investType;
				window.location.href = "/mcpay/mc-pay!buyfinish.action?lotid=" + lot + "&issueCode=" + issue + "&projectId=" + projectId + "&totalAmt=" + paym + "&openTime=" + opentime + "&investType=" + investType;
				// if(json.investType == 1){ ///trade/index!toSuccess.action
				// $("#paym").html(paym);
				// $("#opentime").html(opentime);
				// var src ="/user/user-lot-buy!Details.action?projectId="+projectId+"&lotCode="+lot+"&issueCode="+issue+"&deadline=0&state=0&sellotCode=0" ;
				// $("#touzhuinfo").attr("href",src) ;

				// $("#selhm").hide();
				// $("#buy").hide();
				// $("#buysuccess").show();

				// }else if(json.investType == 2){
				// var opentime = mcssq.opentime ;
				// var paym = totalAmt ;
				// $("#paym").html(paym);
				// $("#opentime").html(opentime);
				// var src ="/user/user-chase!toMain.action" ;
				// $("#touzhuinfo").attr("href",src) ;

				// $("#selhm").hide();
				// $("#buy").hide();
				// $("#buysuccess").show();
				// };
			}
			;
		}else{			
			open_message(backobject.msg);
		}
		;
	}, 'text');
}
