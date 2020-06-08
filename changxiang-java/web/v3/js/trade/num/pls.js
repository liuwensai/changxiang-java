// 排列三
var plsjsonurl = "/data/issueOrMath/pls_opencode.json";
var mcpls ={} ;
mcpls.issuecode = "";
mcpls.issueid ="";
mcpls.lotid = 2 ;    // 彩种ID 排列三
mcpls.playId = 2001; // 直选复式  默认
mcpls.listCode=[];   // 号码篮

mcpls.totalzs = 0 ;  // 总注数
mcpls.totalamt = 0 ; // 总金额
mcpls.opentime ;
mcpls.hezhiMap2002; // 直选和值 和值对应 注数以及投注内容集合
mcpls.hezhiMap2009;  // 组选和值 和值对应 注数以及投注内容集合

var ballObje={} ;   // 页面元素 选球
ballObje.pls_code_1;  
ballObje.pls_code_2;
ballObje.pls_code_3;

// 初始化选球 - 默认直选
function initBallObj(){
	
	var pls_code_1={};
	var pls_code_2={};
	var pls_code_3={};
	
	$("i[name='ball_1']").each(function(i,o){
		pls_code_1[i] = $(o) ;
		pls_code_1[i].click(chooseBall) ;
	});
	$("i[name='ball_2']").each(function(i,o){
		pls_code_2[i] = $(o) ;
		pls_code_2[i].click(chooseBall) ;
	});
	$("i[name='ball_3']").each(function(i,o){
		pls_code_3[i] = $(o) ;
		pls_code_3[i].click(chooseBall) ;
	});
	ballObje.pls_code_1 = pls_code_1 ;
	ballObje.pls_code_2 = pls_code_2 ;
	ballObje.pls_code_3 = pls_code_3 ;
}

// 球 选中方法
function chooseBall(){
	var thisp = $(this) ;
	var classValue= thisp.context.getAttribute("class") ;
	if(classValue=="i-redball"){
		thisp.context.setAttribute("class","tored") ;
	} else if(classValue=="tored"){
		thisp.context.setAttribute("class","i-redball") ;
	}
	presentSelNum();
}

// 获取集合 计算注数使用
function getResultMap(){
	baseAjax("get" , "/data/trade/pls/he_zhi_2002.json" , false , null , "text" , function(data){
		mcpls.hezhiMap2002 = eval('(' + data + ')');
	});
	baseAjax("get" , "/data/trade/pls/he_zhi_2009.json" , false , null , "text" , function(data){
		mcpls.hezhiMap2009 = eval('(' + data + ')');
	});
}

// 通过玩法获取玩法名称
var playStrDic={2001:'直选',2004:'组三',2006:'组六',2002:'直选和值',2009:'组选和值'};
function getplayData(playId){
	return playStrDic[playId];
}

// 模板
var top_html="<div class=\"balls_tit\">"+
				"<h3 class=\"tit_line1\">{{ball_1_text}}</h3>"+
				"<h3 class=\"tit_line2\" style=\"display:none;\"><span class=\"grey\">遗漏</span></h3>"+
			"</div>";
var body_html="<div class=\"m-ball_list test b-flex clearfix mb_25\">";
var foot_html="</div>";

// 生成 选号区域
function switchPlayMakeBall(){
	$("#pls_code_1").html();
	var tp = "";
	var top_html_temp = "";
	if(mcpls.playId==2001 || mcpls.playId==2004 || mcpls.playId==2006 ){
		if(mcpls.playId==2001){
			top_html_temp = top_html.replace("{{ball_1_text}}", "百位");
			pls_code_2_show();
			pls_code_3_show();  // 隐藏十位、百位
		}else{
			top_html_temp = top_html.replace("{{ball_1_text}}", "选号");
			pls_code_2_hide();
			pls_code_3_hide();  // 隐藏十位、百位
		}
		for(var i=0;i<10;i++){
			tp+='<label class="changeballcolor"><i name="ball_1" index="'+i+'"  class="i-redball">'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display:none;">21</p></label>';
		}
		$("#pls_code_1").html(top_html_temp+body_html+tp+foot_html);
	}else if(mcpls.playId==2002){
		for(i=1;i<28;i++){
			tp+='<label class="changeballcolor"><i name="ball_1" index="'+i+'" class="i-redball">'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display:none;">21</p></label>';
		}
		pls_code_2_hide();
		pls_code_3_hide();  // 隐藏十位、百位
		$("#pls_code_1").html(body_html+tp+foot_html);
	}else{
		for(i=1;i<27;i++){
			tp+='<label class="changeballcolor"><i name="ball_1" index="'+i+'" class="i-redball">'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display:none;">21</p></label>';
		}
		pls_code_2_hide();
		pls_code_3_hide();  // 隐藏十位、百位
		$("#pls_code_1").html(body_html+tp+foot_html);
	}
	
	// 重新加载 选球元素
	ballObje.pls_code_1 = {};
	var temp_ball = {};
	$("i[name='ball_1']").each(function(i,o){
		temp_ball[i] = $(o) ;
		temp_ball[i].click(chooseBall) ;
	});
	ballObje.pls_code_1 = temp_ball;
	
	clearStyle(mcpls.playId);  // 清除选中样式
}

// 清除选中样式
function clearStyle(p){
	
	var n=0,m=0;
	if(p==2001 || p==2004 || p==2006){ // 直选、组三、组六
		m=10; // 10
	}else if(p==2002){ // 27
		m=27;
	}else if(p==2009){ // 26
		m=26;
	}
	
	for(n;n<m;n++){
		var bb1 = ballObje.pls_code_1[n].context ;
		bb1.setAttribute("class","i-redball");
		if(p==2001){
			var bb2 = ballObje.pls_code_2[n].context ;
			bb2.setAttribute("class","i-redball") ;
			var bb3 = ballObje.pls_code_3[n].context ;
			bb3.setAttribute("class","i-redball") ;
		}
	}
}

function pls_code_1_show(){
	$("#pls_code_1").show();
}

function pls_code_1_hide(){
	$("#pls_code_1").hide();
}

function pls_code_2_show(){
	$("#pls_code_2").show();
}

function pls_code_2_hide(){
	$("#pls_code_2").hide();
}

function pls_code_3_show(){
	$("#pls_code_3").show();
}

function pls_code_3_hide(){
	$("#pls_code_3").hide();
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

function goSellhm(){
	buyHide();
	selhmShow();
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
	
	
	// 计算注数使用
	getResultMap();
	//初始化数据
	prizeData();
	// 初始化 直选玩法选号区域
	initBallObj();
	
	// 切换玩法
	$("#play_ul_id li").click(function() {
		
		var switchPlayId =  $(this).attr("playid"); //选中的玩法
		switchPlayId = parseInt(switchPlayId,10);
		
		if(switchPlayId != mcpls.playId){ // 真正切换玩法 
			// 选中样式
			if($(this).attr("class") == "")$(this).attr("class", "on");
			// 取消之前的选中样式
			$("#play_ul_id li").each(function(index, el) {
				var pid = $(this).attr("playid"); 
				pid = parseInt(pid,10);
				if(switchPlayId != pid){
					$(this).attr("class", "");
				}
			});
			// 修改页面全局玩法变量
			mcpls.playId=switchPlayId; 
			// 重新生成选号区域 (根据切换的玩法 重新生成 选号 区域)
			switchPlayMakeBall();
			
			if(mcpls.playId== 2001){  // 直选
				$("#select_code_id").html("请每位至少选择<span class=\"red\">1</span>个号码");
			}else if(mcpls.playId== 2004 || mcpls.playId== 2006){  // 组三、组六
				$("#select_code_id").html("请至少选择<span class=\"red\">"+(mcpls.playId==2004?2:3)+"</span>个号码");
			}else{  // 直选和值、组选和值
				$("#select_code_id").html("请至少选择<span class=\"red\">1</span>个号码");
			}
			$("#m-submit_box_s").addClass("disabled") ;
			
			if(mcpls.playId == 2001){  // 直选
				$("#winning_tips").html("每位至少选<span class='red'>1</span>个号，奖金<span class='red'>1040</span>元");
			}else if(mcpls.playId == 2004){  // 组三
				$("#winning_tips").html("至少选<span class='red'>2</span>个号，奖金<span class='red'>346</span>元");
			}else if(mcpls.playId == 2006){  // 组六
				$("#winning_tips").html("至少选<span class='red'>3</span>个号，奖金<span class='red'>173</span>元");
			}else if(mcpls.playId == 2002){  // 直选和值
				$("#winning_tips").html("至少选<span class='red'>1</span>个和值，奖金<span class='red'>1040</span>元");
			}else{
				$("#winning_tips").html("至少选<span class='red'>1</span>个和值，组三奖金<span class='red'>346</span>元，组六奖金<span class='red'>173</span>元");
			}
		}
	});
	
	// 确认选号
	$("#tobuy").click(function(){
		
		var code = getSelectedCode(mcpls.playId); // 三位所有的选号号码
		var zhTotal = getZhushuByPlay(mcpls.playId,code);  // 获取注数
		if(zhTotal <= 0){
			showRandom(); //随机显示
			return ;
		}
		// 保存信息到投注栏
		var selectCode = splitCode(mcpls.playId,code); // 所有选中的号码组成的字符串 
		mcpls.listCode.push(selectCode) ;
		// go 购买页面
		showselq();
		
	}) ;
	
	//跳转到继续购买
	$("#contisel").click(function(){
		clearStyle(mcpls.playId);
		selhmShow();
		buyHide();
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
		$("#szs").html(mcpls.totalzs);
		$("#sam").html(mcpls.totalzs*qs*bs*temp);
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
	if(temp_login_exist("plszhxlotCode")){
		var numberContent = read_temp_login("plszhxnumberContent") ;
		var pls_bs = read_temp_login("plszhx_bs") ;
		var pls_qs = read_temp_login("plszhx_qs") ;
		mcpls.listCode = numberContent.split("$") ;
		$("#qs").val(pls_qs);
		$("#bs").val(pls_bs);
		showselq() ;
	}
}) ;

//拼成购买数据

// 当前选号 - 计算注数以及金额
function presentSelNum(){
	
	var code = getSelectedCode(mcpls.playId); // 三位所有的选号号码
	var zhTotal = getZhushuByPlay(mcpls.playId,code); //获取注数
	if(zhTotal>0){
		$("#select_code_id").html("选了<span class=\"red\">"+zhTotal+"</span>注，共<span class=\"red\">"+(zhTotal*2)+"</span>元");
		$("#m-submit_box_s").removeClass("disabled") ;
	}else{
		if(mcpls.playId== 2001){  // 直选
			$("#select_code_id").html("请每位至少选择<span class=\"red\">1</span>个号码");
		}else if(mcpls.playId== 2004 || mcpls.playId== 2006){  // 组三、组六
			$("#select_code_id").html("请至少选择<span class=\"red\">"+(mcpls.playId==2004?2:3)+"</span>个号码");
		}else{  // 直选和值、组选和值
			$("#select_code_id").html("请至少选择<span class=\"red\">1</span>个号码");
		}
		$("#m-submit_box_s").addClass("disabled") ;
	}
}

// 获取选中的号码
function getSelectedCode(p){
	
	var code = new Array(); 
	var b1 = new Array(); // 第一表示拖，第二表示胆
	var b2 = new Array();
	var b3 = new Array();
	
	var code_obj_1 = ballObje.pls_code_1;
	var code_obj_2 = ballObje.pls_code_2;
	var code_obj_3 = ballObje.pls_code_3;
	
	var bb1,bb1_cls,bb1_val;
	var bb2,bb2_cls,bb2_val;
	var bb3,bb3_cls,bb3_val;
	
	var chked = function (cls,arr,val){  // 添加选号
		if(cls=="tored"){
			arr.push(val);
		}
	};
	
	var n=0,m=0;
	if(p==2001 || p==2004 || p==2006){ // 直选、组三、组六
		m=10; // 10
	}else if(p==2002){ // 27
		m=27;
	}else if(p==2009){ // 26
		m=26;
	}
	
	for(n;n<m;n++){
		bb1 = code_obj_1[n].context ;
		bb1_cls = bb1.getAttribute("class") ;
		bb1_val = bb1.getAttribute("index") ;
		chked(bb1_cls,b1,bb1_val);
		if(p==2001){  // 直选 十位、百位
			bb2 = code_obj_2[n].context ;
			bb2_cls = bb2.getAttribute("class") ;
			bb2_val = bb2.getAttribute("index") ;
			chked(bb2_cls,b2,bb2_val);
			
			bb3 = code_obj_3[n].context ;
			bb3_cls = bb3.getAttribute("class") ;
			bb3_val = bb3.getAttribute("index") ;
			chked(bb3_cls,b3,bb3_val);
		}
	}
	code.push(b1);
	code.push(b2);
	code.push(b3);
	return code;
}

//拼接 显示的投注内容
function splitCode(p,c){
	var code = c;
	var selectCode="";
	if(code != null && code[0] != null && code[0].length != 0){
		if(p==2001){
			selectCode = code[0].join("");
		}else{
			selectCode = code[0].join(",");
		}
	}
	if(code != null && code[1] != null && code[1].length != 0){
		selectCode = selectCode + "," +code[1].join("");
	}
	if(code != null && code[2] != null && code[2].length != 0){
		selectCode = selectCode + "," +code[2].join("");
	}
	return p+"_"+selectCode;
}

//根据玩法和选号内容获取注数
function getZhushuByPlay(p,c){
	var code = c;
	var zs = 0;
	// 直选
	if(p == 2001){
		zs = mcpls.calZS(code[0],code[1],code[2]);
		return zs*1;
	}
	// 组三
	if(p == 2004){
		zs = mcpls.z3_calzs(code[0]);
		return zs*1;
	}
	// 组六
	if(p == 2006){
		zs = mcpls.z6_calzs(code[0]);
		return zs*1;
	}
	// 直选和值
	if(p == 2002){
		zs = mcpls.zhixu_he_calzs(code[0]);
		return zs*1;
	}
	// 组选和值
	if(p == 2009){
		zs = mcpls.zx_he_calzs(code[0]);
		return zs*1;
	}
}

//计算组合数公式 C5/6
function Cmn( m,  n)
{
    var n1 = 1, n2 = 1;
    for (var i = m, j = 1; j <= n; n1 *= i--, n2 *= j++) ;
    return n1 / n2;
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
		var sumdata = eval(mcpls.hezhiMap2002[parseInt(count[0])]);
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
		var sumdata = eval(mcpls.hezhiMap2009[parseInt(count[0])]);
		//从对象里面取出注数
		zx_hz_note += sumdata.noteCount;
	}
	return zx_hz_note;
};


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
				var dthtm="<strong>距"+mcpls.issuecode+"期截止</strong><strong id=\"show_time\">00小时00分00秒</strong>" ;
				$("#open_code_time_id").html(dthtm);
			}	
	  	});
		return tp_time ;
	});
}

// 加载开奖信息，期号
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
	$("#open_code_time_id").html('<strong>距'+info.issuecode+'期截止  </strong><strong id=\"show_time\">00小时00分00秒</strong>');
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
		var cont1 = (hm=="null"||!hm)?"-":hm.join(" ");
		var cont2 = "";
		try{
			cont2 = parseInt(hm[0])+parseInt(hm[1])+parseInt(hm[2]);
		}catch(e){
		}
		
		if(i == 0){
			info.head = "<div>上期开奖："+cont1+"</div>" + "<span class='i-slide' onclick='showHistoryData(this)'><em class='i-slideDown'></em>点此展开历史开奖</span>";
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div>" +
					"<div class=\"pl3totle\"><div class=\"red1\">"+cont1+"</div><div class=\"blacktxtpl\">"+(cont2?cont2:"-")+"</div><div class=\"blacktxt\">"+hmstate+"</div><div class=\"\"></div>";
					//  + "<span class='red'> "+hm[0]+"</span> <span class='blue'>"+hm[1]+"</span></div></li>";
		} else {
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div>" +
					"<div class=\"pl3totle\"><div class=\"red1\">"+cont1+"</div><div class=\"blacktxtpl\">"+(cont2?cont2:"-")+"</div><div class=\"blacktxt\">"+hmstate+"</div><div class=\"\"></div>";		  
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
	var zs_li = 0;
	var liCode = mcpls.listCode ;
	//计算总注数
	var liht="" ;
	var cont = "" ;
	for (var i = liCode.length-1; i >=0; i--) {
		var zs_temp = getZs(liCode[i]); // 获取注数
		var li_code_arr = liCode[i].split("_");
		var playId_temp = parseInt(li_code_arr[0]); // 玩法
		
		liht+="<li class='ssq'>" ;
		liht+="<var><span class='red'>";
		cont = li_code_arr[1];
		liht+=cont ;
		liht+="</span></var>" ;
		liht+="<p>"+getplayData(playId_temp)+"："+zs_temp+"注"+zs_temp*temp+"元</p>" ;
		liht+="<i class='i-del' onclick='deli("+i+")'></i>";
		zs_li+=zs_temp;
	}
	mcpls.totalzs=zs_li;
	// 购买支付总结信息
	var qs = $("#qs").val();
	var bs = $("#bs").val();
	$("#szs").html(mcpls.totalzs);
	$("#sam").html(mcpls.totalzs*qs*bs*temp);
	$("#sqs").html(qs);
	$("#sbs").html(bs);
	$("#addli").html(liht);
	
	selhmHide();
	buyShow();
}

//计算注数
function getZs(c){
	var code = new Array();
	var b1 = new Array(); 
	var b2 = new Array();
	var b3 = new Array();
	
	var arr = c.split("_");
	var playId = parseInt(arr[0], 10);
	var codes = arr[1];
	
	var splitStr = function(str,arr){
		for(var i=0;i<str.length;i++){
			arr.push(parseInt(str.charAt(i), 10));
		}
	};
	
	if(playId == 2001){  // 直选
		var tz = codes.split(",");
		splitStr(tz[0],b1);
		splitStr(tz[1],b2);
		splitStr(tz[2],b3);
	}else{
		b1 = codes.split(",");
	}
	code.push(b1);
	code.push(b2);
	code.push(b3);
	return getZhushuByPlay(playId,code); // 获取注数 
}

// 删除已选号码
function deli(v){
	mcpls.listCode.splice(v,1);
	if(mcpls.listCode.length < 1){
		selhmShow();
		buyHide();
	} else {
		showselq();
	}
}

// 获取几个选球
function getRandomBall(p){
	if(p==2001 || p==2006){ // 直选、组六
		return jixuan(10,3);
	}else if( p==2004 ){  // 组三
		return jixuan(10,2);
	}else if(p==2002){   
		return jixuan(27,1);
	}else if(p==2009){  
		return jixuan(26,1);
	}
}

// 机选
function showRandom(){
	// 清除数据
	clearStyle(mcpls.playId);
	// 获取随机号码
	var randomBall =getRandomBall(mcpls.playId);
	if(!randomBall || randomBall.length==0){
		return;
	}
	if(mcpls.playId==2001){ // 直选
		ballObje.pls_code_1[randomBall[0]].context.setAttribute("class" , "tored") ;
		ballObje.pls_code_2[randomBall[1]].context.setAttribute("class" , "tored") ;
		ballObje.pls_code_3[randomBall[2]].context.setAttribute("class" , "tored") ;
	}else if( mcpls.playId==2004 ){  // 组三
		ballObje.pls_code_1[randomBall[0]].context.setAttribute("class" , "tored") ;
		ballObje.pls_code_1[randomBall[1]].context.setAttribute("class" , "tored") ;
	}else if( mcpls.playId==2006 ){  // 组六
		ballObje.pls_code_1[randomBall[0]].context.setAttribute("class" , "tored") ;
		ballObje.pls_code_1[randomBall[1]].context.setAttribute("class" , "tored") ;
		ballObje.pls_code_1[randomBall[2]].context.setAttribute("class" , "tored") ;
	}else if(mcpls.playId==2002 || mcpls.playId==2009){   
		ballObje.pls_code_1[randomBall[0]].context.setAttribute("class" , "tored") ;
	}
	presentSelNum();
}

// 机选一注
function radomone(){
	//获取购买数据
	var selectCode = "";
	
	var randomBall =getRandomBall(mcpls.playId);
	if(!randomBall || randomBall.length==0){
		return;
	}
	
	if(mcpls.playId==2002 || mcpls.playId==2009){ // 和值
		randomBall.each(function(o,i){
			randomBall[i]=o+1;
		});
	}
	selectCode = mcpls.playId + "_" + randomBall.join(",");
	
	mcpls.listCode.push(selectCode);
	
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
		write_temp_login("plszhxlotCode" , "1" , 1) ;
		write_temp_login("plszhxnumberContent" , numberContent , 1) ;
		write_temp_login("plszhx_play" , mcpls.playId , 1) ;
		write_temp_login("plszhx_bs" , multiple , 1) ;
		write_temp_login("plszhx_qs" , trackCount , 1) ;
		//登录
		var bakUrl = "/v3shtml/trade/num/pls.shtml" ;
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
		same.hasEnoughMoney(mcpls.playId,mcpls.lotid,trackCount,totalAmt,mcpls.lotid,mcpls.issuecode,callbackType , "");
	} else {
		same.offlineConfirmHtml(mcpls.playId,mcpls.lotid,trackCount,totalAmt,mcpls.lotid,mcpls.issuecode,callbackType , "");//线下订单直接购买
	}
}

function dobuy(){
	var numberContent = getBuyCode(mcpls.listCode);
	var noteCount = mcpls.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	var totalAmt = parseInt(noteCount) * multiple *2 ;//* parseInt(trackCount);
	var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
	//var isStop = 0;//追号是否停止
	var playId = checkPlay(mcpls.listCode); // 玩法
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
			isdongjie:100, //冻结
			singleAmonut:singleAmonut,
			time : new Date().getTime(),//当前时间
		};
		same.buySubmit(postData,$.trim(mcpls.opentime));
}
//线下订单购买
function doOfflineBuy(){
	
	var numberContent = getBuyCode(mcpls.listCode);
	var noteCount = mcpls.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	var totalAmt = parseInt(noteCount) * multiple *2 ;//* parseInt(trackCount);
	var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
	//var isStop = 0;//追号是否停止
	var playId = checkPlay(mcpls.listCode); // 玩法
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
			trackCount : trackCount,//追号期数
			buySource : buySource,//购买来源
			isdongjie:0, //不冻结
			singleAmonut:singleAmonut,
			time : new Date().getTime(),//当前时间
			payType:100,//付款方式：线下付款
         	isTicket:0//是否取票：0未取票
		};
		same.buySubmit(postData,$.trim(mcpls.opentime));
}

//差额支付时用
function doTempBuy(argJSON){
	var callbackType = argJSON.callbackType;
	var userBalacne = argJSON.allMoney;
	 var numberObject = getBuyCode(mcpls.listCode);
     var multiple = $("#sbs").html(); // 倍数
     var trackCount = $("#sqs").html();
     var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
     var zhushu = mcpls.totalzs;
     var issue = mcpls.issuecode;
     var lotTypeCode = mcpls.lotid;
     var lotTypeplay = checkPlay(mcpls.listCode);// 玩法
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
 
 
//检查是否混投玩法
 function checkPlay(listCode){
 	var playId = 0;
 	listCode.each(function(o,i){
 		var p = o.split("_")[0];
 		p = parseInt(p,10);
 		if( playId == 0 ){
 			playId = p;
 		}
 		if(playId != p){
 			playId = 2020;
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
 	if(checkPlay(listCode)==2020){  // 混投
 		listCode.each(function(o,indx){
 			if(indx != 0){
 				context +="$" ;
 			}
 			context += o.replace("_","@");
 		});
 	}else{  // 非混投
 		listCode.each(function(o,indx){
 			if(indx != 0){
 				context +="$" ;
 			}
 			var arr = o.split("_");
 			var codes = arr[1];
 			context += codes;
 			
 		});
 	}
 	return context;
 }

//获取totalAmt
function getTotalAmt(){
	var temp = 2 ;
	var noteCount = mcpls.totalzs;// 注数
	var qs = parseInt($("#sqs").html());
	var multiple =parseInt($("#sbs").html()); // 倍数
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


var a =new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);

//m 球的总个数，n 选球的个数  1 - 30
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

