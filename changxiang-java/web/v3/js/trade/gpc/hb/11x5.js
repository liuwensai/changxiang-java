// 河北 11选五 
var gpcjsonurl = "/data/issueOrMath/gpc_opencode.json";
var gpc ={} ;
gpc.issuecode = "";
gpc.issueid = "";
gpc.lotid = 20 ;     // 河北11选5
gpc.playId = 20007;  // 全局 默认任五玩法
gpc.listCode = new Array();     // 保存所有的选号数据 // [20007_04#09,08,01,02,10]
gpc.ht_play_id = 20030; // 混投
gpc.qr_play_id = 20015; // 前二直选
gpc.qs_play_id = 20018; // 前三直选

gpc.totalzs = 0 ;  // 总注数
gpc.totalamt = 0 ; // 总金额
gpc.opentime;

// 保存 DOM 对象
var ballObje={} ; 
ballObje.selball_1 = [] ;  // 第一位 号码元素
ballObje.selball_2 = [] ;  // 第二位 号码元素
ballObje.selball_3 = [] ;  // 第三位 号码元素
ballObje.selnum1 = 0 ;   // 第一位 选号个数（非胆） 
ballObje.selnum2 = 0 ;   // 第二位 选号个数
ballObje.selnum3 = 0 ;   // 第三位 选号个数
ballObje.selDtnum = 0 ;  // 第一位 选号个数（胆个数）

//通过玩法获取玩法名
var playStrDic={20001:'任选二',20002:'任2胆拖',20003:'任三',20004:'任3胆拖',20005:'任四',20006:'任四胆拖',20007:'任五',20008:'任五胆拖',20009:'任六',20010:'任六胆拖',20011:'任七',20012:'任七胆拖',20013:'任八',20014:'前一',20015:'前二直选',20016:'前二组选',20017:'前二组选胆拖',20018:'前三直选',20019:'前三组选',20020:'前三组选胆拖',20021:'任八胆拖',20030:'混合投注'};
function getplayData(playId){
	return playStrDic[playId];
}
//通过玩法获取奖金
var playSingeMoneyStrDic={20001:6,20003:19,20005:78,20007:540,20009:90,20011:26,20013:9,20014:13,20015:130,20016:65,20018:1170,20019:195};
function getSingeMoney(playId){
	return playSingeMoneyStrDic[playId];
}

// 机选个数  ( 直选比较特殊 )
var pldIdToPlayId={20001:2,20003:3,20005:4,20007:5,20009:6,20011:7,20013:8,20014:1,20015:2,20016:2,20018:3,20019:3};
function getRCode(playId){
	return pldIdToPlayId[playId];
}

// 不含胆的选号方法
var ball_click = function(){
	var thisp = $(this) ;
	var classValue= thisp.context.getAttribute("class") ;
	var thisName= thisp.context.getAttribute("name") ;
	if(classValue=="i-redball"){
		thisp.context.setAttribute("class","tored") ;
		if(thisName=="selball"){
			ballObje.selnum1 = ballObje.selnum1 + 1 ;
		}else if(thisName=="selball_2"){
			ballObje.selnum2 = ballObje.selnum2 + 1 ;
		}else{
			ballObje.selnum3 = ballObje.selnum3 + 1 ;
		}
	} else if(classValue=="tored"){
		thisp.context.setAttribute("class","i-redball") ;
		if(thisName=="selball"){
			ballObje.selnum1 = ballObje.selnum1 - 1 ;
		}else if(thisName=="selball_2"){
			ballObje.selnum2 = ballObje.selnum2 - 1 ;
		}else{
			ballObje.selnum3 = ballObje.selnum3 - 1 ;
		}
	}
	presentSelNum();
};

// 含有胆的选号方法
var ball_dan_click = function(){
	var thisp = $(this) ;
	var classValue= thisp.context.getAttribute("class"); 
	var vrq = thisp.context.getAttribute("index") ;
	if(classValue=="i-redball"){
		thisp.context.setAttribute("class","tored") ;
		ballObje.selnum = ballObje.selnum + 1 ;
	} else if(classValue=="tored"){
		thisp.context.setAttribute("class","i-balldan");
		var v = "" ;
		if(vrq < 10){
			v ="0"+vrq ;
		} else {
			v = vrq ;
		}
		thisp.context.innerHTML = v+"<b class=\"toudanms\">胆</b>" ;
		ballObje.selDtnum += 1;
		ballObje.selnum = ballObje.selnum - 1 ;
	} else if(classValue="i-balldan"){
		var v = "" ;
		if(vrq < 10){
			v ="0"+vrq ;
		} else {
			v = vrq ;
		}
		thisp.context.setAttribute("class","i-redball") ;
		thisp.context.innerHTML = v  ;
		ballObje.selDtnum = ballObje.selDtnum - 1 ;
	}
	presentSelNum();
};

// 加载选球至内存 并且绑定选球事件
function initBallObj(){
	var selBall1={};
	var selBall2={};
	var selBall3={};
	// 第一位
	$("i[name='selball']").each(function(i,o){
		selBall1[i] = $(o);
		selBall1[i].click(ball_dan_click) ;
	});
	// 第二位
	$("i[name='selball_2']").each(function(i,o){
		selBall2[i] = $(o);
		selBall2[i].click(ball_click) ;
	});
	// 第三位
	$("i[name='selball_3']").each(function(i,o){
		selBall3[i] = $(o);
		selBall3[i].click(ball_click) ;
	});
	ballObje.selball_1 = selBall1 ;
	ballObje.selball_2 = selBall2 ;
	ballObje.selball_3 = selBall3 ;
}

// 重新绑定选号事件
var p_arr = [20014,20015,20018];
function bindChooseEvent(p,w){ // 之前的玩法，选择的玩法
	if(p_arr.contains(p) && !p_arr.contains(w)){
		for(var i=0;i<11;i++){
			var jquery_obj = ballObje.selball_1[i];
			jquery_obj.off("click");
			jquery_obj.on("click",ball_dan_click);
		}
	}else if(!p_arr.contains(p) && p_arr.contains(w)){
		for(var i=0;i<11;i++){
			var jquery_obj = ballObje.selball_1[i];
			jquery_obj.off("click");
			jquery_obj.on("click",ball_click);
		}
	}
}

//切换玩法时清空已选号码
function clearChooseBall(){
	var n=1;
	var m=2;
	if(gpc.playId==gpc.qr_play_id || gpc.playId==gpc.qs_play_id){  // 直选
		m=4;
	}
	// 清除选中的号码
	for(n;n<m;n++){  
		var code_url_w = $("#codes_div_"+n).find("label");
		code_url_w.each(function(index, el) {
			var iCode= $(this).find("i");
			var val = iCode.attr("index");
			if(val < 10){
				val = "0"+val ;
			}
			iCode.attr("class","i-redball");
			iCode.html(val);
		});
	}
	// 清除选中数据
	ballObje.selnum1 = 0 ;   // 第一位 选号个数（非胆） 
	ballObje.selnum2 = 0 ;   // 第二位 选号个数
	ballObje.selnum3 = 0 ;   // 第三位 选号个数
	ballObje.selDtnum = 0 ;  // 第一位 选号个数（胆个数）
}

function codesDiv2Hide(){
	$("#codes_div_2").hide();
}

function codesDiv2Show(){
	$("#codes_div_2").show();
}

function codesDiv3Hide(){
	$("#codes_div_3").hide();
}

function codesDiv3Show(){
	$("#codes_div_3").show();
}

function buyShow(){
	$("#buy").show();
}

function buyHide(){
	$("#buy").hide();
}

function selhmShow(){
	$("#selhm").show();
}

function selhmHide(){
	$("#selhm").hide();
}

function goSelhm(){
	buyHide();
	selhmShow();
}

$(document).ready(function(){
	// 加载开奖号码和期号
	prizeData();
	// 加载选球 绑定选球事件
	initBallObj();
	// 切换玩法
	$("#play_ul_id li").click(function() {
		
		var switchPlayId =  $(this).attr("playid");//选中的玩法
		switchPlayId = parseInt(switchPlayId,10);
		
		if($(this).attr("class") == "")$(this).attr("class", "on");  // 选中样式
		
		clearChooseBall();  // 清空已选号码
		
		//prizeData(); // //每次切换玩法的时候都去请求一次上期的开奖号码
		
		bindChooseEvent(gpc.playId,switchPlayId); // 重新绑定选号事件
		
		// 切换玩法时修改页面显示效果
		$("#play_ul_id li").each(function(index, el) {
			
			var pid = $(this).attr("playid");  // 取消之前的选中样式
			pid = parseInt(pid,10);
			if(switchPlayId != pid){
				$(this).attr("class", "");
			}
			
			//修改页面玩法
			if(switchPlayId == pid){
				gpc.playId=switchPlayId;  // 修改页面全局玩法变量
				var codeNum = getRCode(gpc.playId);  // 玩法至少选中个数
				var singeMoney = getSingeMoney(gpc.playId); // 玩法中奖奖金
				
				if(gpc.playId == gpc.qr_play_id){   // 前二直选
					codesDiv3Hide();
					codesDiv2Show();
					$("#codes_div_1_tip").html("第1位");
					$("#select_code_id").html("请每位至少选择<span class='red'>1</span>个不同号码");
				}else if(gpc.playId == gpc.qs_play_id){  // 前三直选
					codesDiv2Show(); 
					codesDiv3Show(); 
					$("#codes_div_1_tip").html("第1位");
					$("#select_code_id").html("请每位至少选择<span class='red'>1</span>个不同号码");
				}else{
					codesDiv2Hide();
					codesDiv3Hide();
					$("#codes_div_1_tip").html("选号");
					$("#select_code_id").html("请至少选择<span class='red'>"+getRCode(gpc.playId)+"</span>个号码");
				}
				
				if(codeNum >5) codeNum = 5;//开奖号码最多开5个
				if(gpc.playId == 20014){  // 前一玩法 提示信息
					$("#winning_tips").html("至少选择<span class='red'>"+codeNum+"</span>个号，猜中开奖号码第<span class='red'>1</span>个，奖金<span class='red'>"+singeMoney+"</span>元");
				}else if(gpc.playId == gpc.qr_play_id || gpc.playId == gpc.qs_play_id){  // 直选 提示信息
					$("#winning_tips").html("至少选择<span class='red'>"+getRCode(gpc.playId)+"</span>个号，按位猜中前<span class='red'>"+codeNum+"</span>个开奖号，奖金<span class='red'>"+singeMoney+"</span>元");
				}else if(gpc.playId <= 20005 || gpc.playId == 20016 || gpc.playId == 20019){ // 任二、任三、任四、前二组选、前三组选
					$("#winning_tips").html("至少选择<span class='red'>"+getRCode(gpc.playId)+"</span>个号，猜中开奖号码任意<span class='red'>"+codeNum+"</span>个，奖金<span class='red'>"+singeMoney+"</span>元");
				}else{
					$("#winning_tips").html("至少选择<span class='red'>"+getRCode(gpc.playId)+"</span>个号，猜中开奖号全部<span class='red'>"+codeNum+"</span>个，奖金<span class='red'>"+singeMoney+"</span>元");
				}
			}
		});
		
	});
	
	// 确认选号 - 跳转到买页面( 将选中的号码添加入购买篮中 )
	$("#tobuy").click(function() {
		
		var code = getSelectedCode(gpc.playId); // 三位所有的选号号码
		var zhTotal = getZhushuByPlay(gpc.playId,code);  // 获取注数
		if(zhTotal <= 0){
			showRandom(); //随机显示
			return ;
		}
		// 保存信息到投注栏
		var selectCode = splitCode(gpc.playId,code); // 所有选中的号码组成的字符串 
		gpc.listCode.push(selectCode) ;
		// go 购买页面
		showselq();
		
	});
	
	// 购买页面go选号页面
	$("#contisel").click(function(){
		selhmShow();
		buyHide();
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
	if(temp_login_exist("hbrx5lotCode")){
		var numberContent = read_temp_login("hbrx5numberContent") ;
		var pls_bs = read_temp_login("hbrx5_bs") ;
		var pls_qs = read_temp_login("hbrx5_qs") ;
		gpc.listCode = numberContent.split("$") ;
		$("#qs").val(pls_qs);
		$("#bs").val(pls_bs);
		showselq() ;
	}
}) ;

// 确认选号信息
function presentSelNum(){ 
	var code = getSelectedCode(gpc.playId); 	 // 三位所有的选号号码
	var zhTotal = getZhushuByPlay(gpc.playId,code);  //获取注数
	if(zhTotal>0){
		$("#m-submit_box_s").attr("class","m-submit_box") ;
		$("#select_code_id").html("选了<span class=\"red\">"+zhTotal+"</span>注，共<span class=\"red\">"+(zhTotal*2)+"</span>元");
	}else{
		if(gpc.playId==gpc.qr_play_id || gpc.playId==gpc.qs_play_id){
			$("#select_code_id").html("请至少选<span class=\"red\">1</span>个号码");
		}else{
			$("#select_code_id").html("请至少选<span class=\"red\">"+getRCode(gpc.playId)+"</span>个号码");
		}
		$("#m-submit_box_s").addClass("disabled") ;
	}
}

// 获取选中的号码
function getSelectedCode(p){
	
	var code = new Array(); 
	var b1 = new Array([],[]); // 第一表示拖，第二表示胆
	var b2 = new Array();
	var b3 = new Array();
	
	var code_obj_1 = ballObje.selball_1;
	var code_obj_2 = ballObje.selball_2;
	var code_obj_3 = ballObje.selball_3;
	
	var bb1,bb1_cls,bb1_val;
	var bb2,bb2_cls,bb2_val;
	var bb3,bb3_cls,bb3_val;
	
	for(var i=0;i<11;i++){
		bb1 = code_obj_1[i].context ;
		bb1_cls = bb1.getAttribute("class") ;
		bb1_val = bb1.getAttribute("index") ;
		if(bb1_cls=="tored"){
			if(bb1_val < 10){
				bb1_val = "0"+bb1_val ;
			}
			b1[0].push(bb1_val);  // 拖
		}else if(bb1_cls=="i-balldan"){
			if(bb1_val < 10){
				bb1_val = "0"+bb1_val ;
			}
			b1[1].push(bb1_val) ; // 胆
		}
	}
	// 直选遍历 第二、第三位
	if(p==gpc.qr_play_id || p== gpc.qs_play_id){
		for(var i=0;i<11;i++){
			
			bb2 = code_obj_2[i].context ;
			bb2_cls = bb2.getAttribute("class") ;
			bb2_val = bb2.getAttribute("index") ;
			if(bb2_cls=="tored"){
				if(bb2_val < 10){
					bb2_val = "0"+bb2_val ;
				}
				b2.push(bb2_val) ;
			}
			
			bb3 = code_obj_3[i].context ;
			bb3_cls = bb3.getAttribute("class") ;
			bb3_val = bb3.getAttribute("index") ;
			if(bb3_cls=="tored"){
				if(bb3_val < 10){
					bb3_val = "0"+bb3_val ;
				}
				b3.push(bb3_val) ;
			}
		}
	}
	code.push(b1);
	code.push(b2);
	code.push(b3);
	return code;
}

// 拼接 显示的投注内容
function splitCode(p,c){
	var code = c;
	var selectCode="";
	if(code != null && code[0] != null && code[0].length != 0){
		// 有胆
		if(code[0][1].length>0){
			selectCode = code[0][1].join(",")+"#"+code[0][0].join(",");
		}else{
			if(code[1].length>0){ // 直选
				selectCode = code[0][0].join(",");
			}else{
				// 没有胆
				selectCode = code[0][0].join(",");
			}
		}
	}
	if(code != null && code[1] != null && code[1].length != 0){
		selectCode = selectCode + "|" +code[1].join(",");
	}
	if(code != null && code[2] != null && code[2].length != 0){
		selectCode = selectCode + "|" +code[2].join(",");
	}
	return p+"_"+selectCode;
}

// 根据玩法和选号内容获取注数
function getZhushuByPlay(p,c){
	var code = c;
	var zs = 0;
	// 非直选
	if(p != gpc.qr_play_id && p != gpc.qs_play_id ){
		zs = gpc.calZS(code[0][0],code[0][1],getRCode(p));
		return zs*1;
	}
	// 前二直选
	if(p == gpc.qr_play_id){
		zs = gpc.calZS_qr(code[0][0], code[1]);
		return zs*1;
	}
	// 前三直选
	if(p == gpc.qs_play_id){
		zs = gpc.calZS_qs(code[0][0], code[1],code[2]);
		return zs*1;
	}
}

gpc.warn_info=(function(){
	return function(msg){
		gpc.zs = 0 ;
		gpc.selball=[] ;
		gpc.selDtball=[];
		$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
		$("#select_code_id").html(msg);
	};
})();

gpc.calZS = function(sellist , selDtlist , rx){
	//m!/(m-n)!/n!
	var selNum = sellist.length ;
	var selDtNum = selDtlist.length ;
	if((selDtNum > (rx-1)) || selNum<rx){  // 胆数不能超过最大设胆数、非胆数必须大于等于任N
		return 0;
	}
	var sum = 1 ;
	for (var m = 1; m <= selNum; m++) {
		sum = sum * m ;
	}
	var sum_n = 1 ;
	for(var m_n = 1 ; m_n<= selNum-rx+selDtNum ;m_n++){
		sum_n = sum_n*m_n ;
	}
	var sunn = 1 ;
	for(var n = 1 ; n <= (rx-selDtNum) ; n++){
		sunn = sunn*n ;
	}
	gpc.zs = sum/sum_n/sunn ;
	gpc.amt = gpc.zs*gpc.bs*2 ;
	return gpc.zs ;
} ;

gpc.calZS_qr=function(s1,s2){
	//m!/(m-n)!/n!
	var selNum = s1.length ;
	var selNum2 = s2.length ;
	var tem=0 ;
	for(var v = 0 ; v < s1.length ; v++){
		for(var v2=0 ; v2 <s2.length ; v2++ ){
			if(s1[v]==s2[v2]){
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
};

gpc.calZS_qs = function(s1,s2,s3){
	var xhb = function(w,q,b){
		var len = 0;
		for(var i=0;i<b.length;i++){
			if(w!=q&&q!=b[i]&&w!=b[i])
				len = len + 1;
		}
		return len;
	};
	var xhq = function(w,q,b){
		var len = 0 ;
		for(var i=0;i<q.length;i++){
			if(w!=q[i])
				len = len + xhb(w,q[i],b);
		}
		return len;
	};
	var qs = function(w,q,b){
		var count = 0;
		for(var i=0;i<w.length;i++)
			count = count + xhq(w[i],q,b);
		return count;
	};
	return qs(s1,s2,s3);
};

//获取期号
function activeIssue(){
	t11x5timeCounter("show_time" , false , function(){
		var tp_time =-1;
		var url = "/trade/gpc/hb11x5!getNowIssue.action?t="+new Date().getTime() ;
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
				var dthtm="<strong>距"+gpc.issuecode+"期截止</strong><strong id=\"show_time\">00分00秒</strong>" ;
				$("#open_code_time_id").html(dthtm);
			}	
	  	});
		return tp_time ;
	});
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
	$("#head").html(htm.head);   // 上期开奖号码
	$("#back").html(htm.back) ;  // 历史开奖号码
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
	$("#open_code_time_id").html('<strong>距'+info.issuecode+'期截止  </strong><strong id=\"show_time\">00分00秒</strong>');
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

// 进入购买页面
function showselq(){
	
	var temp = 2;
	var liCode = gpc.listCode;  // 号码篮
	var zs_li = 0;
	var liht="" ;
	var cont = "" ;
	var dtliCode=[];
	for (var i = liCode.length-1; i >=0; i--) {
		var zs_temp = getZs(liCode[i]);
		var li_code_arr = liCode[i].split("_");
		var playId_temp = parseInt(li_code_arr[0]);
		liht+="<li class='ssq'>" ;
		liht+="<var><span class='red'>";
		if(li_code_arr[1].indexOf("#") != -1){
			dtliCode = li_code_arr[1].split("#");
			cont = "["+dtliCode[0].replace(/,/g," ").replace(/[|]/g,",")+"] "+dtliCode[1].replace(/,/g," ").replace(/[|]/g,",") ;
		} else {
			if(playId_temp==gpc.qr_play_id || playId_temp==gpc.qs_play_id){  // 直选
				cont = li_code_arr[1];
			}else{
				cont = li_code_arr[1].replace(/,/g," ").replace(/[|]/g,",") ;
			}
		}
		liht+=cont ;
		liht+="</span></var>" ;
		liht+="<p>"+ getplayData(playId_temp,10) +"： "+zs_temp+"注"+zs_temp*temp+"元</p>" ;
		liht+="<i class='i-del' onclick='deli("+i+")'></i>";
		zs_li+=zs_temp;
	}
	gpc.totalzs=zs_li;
	// 购买支付总结信息 
	var qs = $("#qs").val();
	var bs = $("#bs").val();
	$("#szs").html(gpc.totalzs);  // 注数
	$("#sam").html(gpc.totalzs*qs*bs*temp); // 总金额
	$("#sqs").html(qs);  // 期数
	$("#sbs").html(bs);  // 倍数
	$("#addli").html(liht);  // 投注内容列表 li
	
	selhmHide(); //隐藏选号页面
	buyShow();   //显示购买页面
}

//计算注数
function getZs(c){
	
	var code = new Array();
	var b1 = new Array([],[]); // 第一表示拖，第二表示胆
	var b2 = new Array();
	var b3 = new Array();
	
	var arr = c.split("_");
	var playId = parseInt(arr[0], 10);
	var codes = arr[1];
	
	if(playId == gpc.qr_play_id || playId == gpc.qs_play_id){  // 直选
		var tz = codes.split("|");
		b1[0] = tz[0].split(",");
		b2 = tz[1].split(",");
		if(tz.length>2){
			b3 = tz[2].split(",");
		}
	}else{
		if(codes.indexOf("#")!=-1){ // 胆
			var tz = codes.split("#");
			b1[0] = tz[1].split(",");
			b1[1] = tz[0].split(",");
		}else{
			b1[0] = codes.split(",");
		}
	}
	code.push(b1);
	code.push(b2);
	code.push(b3);
	return getZhushuByPlay(playId,code); // 获取注数 
}

// 删除已选号码
function deli(v){
	gpc.listCode.splice(v,1);
	if(gpc.listCode.length < 1){
		selhmShow();
		buyHide();
	} else {
		showselq();
	}
}


/* 选号页面机选 开始 */

var a =new Array('01','02','03','04','05','06','07','08','09','10',
		 '11','12','13','14','15','16','17',"18","19","20",
		 '21','22','23','24','25','26','27',"28","29","30",
		 '31','32','33','34','35');

//m 球的总个数，n  选球的个数， 返回字符型数据：“01”，“02”，“03”
function jixuan(m,n){
	var result = new Array();
	while(result.length<n) {
		var aValue = a[random(m-1,0)];
		if (!result.contains(aValue)) {
			result[result.length] = aValue;	
		}
	}
	return result;
}

//获取随机数
function random(x, y) {
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}

//机选 
function getRedRandom(){
	var startArray = [0,2,3,4,5,6,7,8,9,10];//seed array  
	var N = rx;//随机数个数  
	var resultArray = new Array();//结果存放在里面  
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray[i] = startArray[seed];//赋值给结果数组  
	    startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	return resultArray ;
}

// 选号页面 - 机选
function showRandom(){
	
	// 清除数据
	clearChooseBall();
	
	var ball = jixuan(11,getRCode(gpc.playId)); // 普通机选
	
	if(!ball || ball.length==0){
		return;
	}
	
	if(gpc.playId==gpc.qr_play_id){  // 前二直选
		for(var v=0 ; v < ball.length ; v++){
			var index = parseInt(ball[v], 10);
			if(v==0){
				ballObje.selball_1[index-1].context.setAttribute("class" , "tored") ;
			}
			if(v==1){
				ballObje.selball_2[index-1].context.setAttribute("class" , "tored") ;
			}
		}
	}else if(gpc.playId==gpc.qs_play_id){ // 前二直选
		for(var v=0 ; v < ball.length ; v++){
			var index = parseInt(ball[v], 10);
			if(v==0){
				ballObje.selball_1[index-1].context.setAttribute("class" , "tored") ;
			}
			if(v==1){
				ballObje.selball_2[index-1].context.setAttribute("class" , "tored") ;
			}
			if(v==2){
				ballObje.selball_3[index-1].context.setAttribute("class" , "tored") ;
			}
		}
	}else{
		for(var v=0 ; v < ball.length ; v++){
			var index = parseInt(ball[v], 10);
			ballObje.selball_1[index-1].context.setAttribute("class" , "tored") ;
		}
	}
	
	$("#m-submit_box_s").attr("class","m-submit_box"); // 点亮 确认选号按钮
	$("#select_code_id").html("选了<span class=\"red\">1</span>注，共<span class=\"red\">2</span>元");
}

// 机选一注
function radomone(){
	
	//获取购买数据
	var selectCode = "";
	if(gpc.playId == gpc.qr_play_id || gpc.playId == gpc.qs_play_id){
		selectCode = gpc.playId + "_" + jixuan(11,getRCode(gpc.playId)).join("|"); // 获取前二、前三直选 随机号码
	}else{
		selectCode = gpc.playId + "_" + jixuan(11,getRCode(gpc.playId)).join(",");
	}
	
	gpc.listCode.push(selectCode) ;
	
	showselq();
	
}

/* 选号页面机选 结束 */

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
		write_temp_login("hbrx5lotCode" , "20" , 1) ;
		write_temp_login("hbrx5numberContent" , numberContent , 1) ;
		write_temp_login("hbrx5_play" , gpc.playId , 1) ;
		write_temp_login("hbrx5_bs" , multiple , 1) ;
		write_temp_login("hbrx5_qs" , trackCount , 1) ;
		//登录
		var bakUrl = "/v3shtml/trade/gpc/hb/11x5.shtml" ;
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
	var context = "" ;
	var numberContent =  getBuyCode(gpc.listCode);
	var noteCount = gpc.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	var totalAmt = parseInt(noteCount) * multiple * 2;
	var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
	//var isStop = 0;//追号是否停止
	var playId = checkPlay(gpc.listCode);//玩法
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
	 var numberObject = getBuyCode(gpc.listCode);//gpc.listCode.join("$");
     var multiple = $("#sbs").html(); // 倍数
     var trackCount = $("#sqs").html();
     var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
     var zhushu = gpc.totalzs;
     var issue = gpc.issuecode;
     var lotTypeCode = gpc.lotid;
     var lotTypeplay = checkPlay(gpc.listCode); //玩法
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

// 检查是否混投玩法
function checkPlay(listCode){
	var playId = 0;
	listCode.each(function(o,i){
		var p = o.split("_")[0];
		p = parseInt(p,10);
		if((o.split("_")[1].indexOf("#")!=-1))(p==20013?p=20021:(p+=1));
		if( playId == 0 ){
			playId = p;
		}
		if(playId != p){
			playId = gpc.ht_play_id;
			return;
		}
	});
	return playId;
}

// 获取玩法字符串
function getBuyCode(listCode){
	
	var context = "";
	
	if(!listCode||listCode.length==0){
		return context;
	}
	if(checkPlay(listCode)==gpc.ht_play_id){  // 混投
		listCode.each(function(o,indx){
			if(indx != 0){
				context +="$" ;
			}
			
			var arr = o.split("_");
			var playId = parseInt(arr[0], 10);
			var codes = arr[1];
			
			if(playId==gpc.qr_play_id || playId==gpc.qs_play_id){ // 直选
				context += o.replace("_","@");
			}else{
				if(codes.indexOf("#") != -1){
					//var _c = codes.split("#");
					context += (playId==20013?20021:(playId+1))+"@"+codes;
				} else {
					context += playId+"@"+codes;
				}
			}
		});
	}else{  // 非混投
		listCode.each(function(o,indx){
			if(indx != 0){
				context +="$" ;
			}
			var arr = o.split("_");
			//var playId = parseInt(arr[0], 10);
			var codes = arr[1];
			context += codes;
			
		});
	}
	return context;
}

//获取totalAmt
function getTotalAmt(){
	var temp = 2 ;
	var noteCount = gpc.totalzs;// 注数
	var multiple =parseInt($("#sbs").html()); // 倍数
	var qs = parseInt($("#sqs").html());
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

