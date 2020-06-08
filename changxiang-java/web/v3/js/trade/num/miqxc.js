// 七星彩 静态文件路径 
var qxcjsonurl = "/data/issueOrMath/qxc_opencode.json";
var qxc ={} ;
qxc.issuecode = "";
qxc.issueid ="";
qxc.lotid = 4;
qxc.playId = 4001 ;
qxc.listCode=[];
qxc.opentime ;

qxc.zs = 0 ;
qxc.amt = 0 ;
qxc.totalzs = 0 ;
qxc.totalamt = 0 ;

qxc.ball_1=[] ;
qxc.ball_2=[] ;
qxc.ball_3=[] ;
qxc.ball_4=[] ;
qxc.ball_5=[] ;
qxc.ball_6=[] ;
qxc.ball_7=[] ;

// 保存选球元素
var ballObje={} ;
ballObje.ball_1 = [] ;
ballObje.ball_2 = [] ;
ballObje.ball_3 = [] ;
ballObje.ball_4 = [] ;
ballObje.ball_5 = [] ;
ballObje.ball_6 = [] ;
ballObje.ball_7 = [] ;

// 绑定选球点击事件
function initBallObj(){
	
	$("i[class='i-redball']").each(function(i,o){
		// 绑定点击事件
		$(o).click(function(){
			var thisp = $(this) ;
			var classValue = thisp.context.getAttribute("class") ;
			if(classValue == "i-redball"){
				thisp.context.setAttribute("class","tored") ;
			} else if(classValue=="tored"){
				thisp.context.setAttribute("class","i-redball");
			}
			// 选号事件
			presentSelNum();
		}) ;
		// 添加元素到内存
		var name = o.attributes["name"].value;
		if(name==='selBall1'){
			ballObje.ball_1.push(o);
		}else if(name==='selBall2'){
			ballObje.ball_2.push(o);
		}else if(name==='selBall3'){
			ballObje.ball_3.push(o);
		}else if(name==='selBall4'){
			ballObje.ball_4.push(o);
		}else if(name==='selBall5'){
			ballObje.ball_5.push(o);
		}else if(name==='selBall6'){
			ballObje.ball_6.push(o);
		}else if(name==='selBall7'){
			ballObje.ball_7.push(o);
		}
	}) ;
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
	
	
	// 彩种是否停售
	lotCodeIsSale(qxc.lotid,"/");
	// 初始化当前期 和 历史开奖信息
	prizeData();
	// 初始化选球
	var ballHtml = initAllBall();
	$("#ball_1").html(ballHtml.ball1) ;
	$("#ball_2").html(ballHtml.ball2) ;
	$("#ball_3").html(ballHtml.ball3) ;
	$("#ball_4").html(ballHtml.ball4) ;
	$("#ball_5").html(ballHtml.ball5) ;
	$("#ball_6").html(ballHtml.ball6) ;
	$("#ball_7").html(ballHtml.ball7) ;
	// 绑定事件
	initBallObj();
	
	//跳转到买页面
	$("#tobuy").click(function(){
		
		// 注数为0时 机选一注
		if(qxc.zs < 1){
			//showRandom();
			open_message("至少选择一注");
			return ;

		}else{
			
			var b1 = qxc.ball_1.join('');
			var b2 = qxc.ball_2.join('');
			var b3 = qxc.ball_3.join('');
			var b4 = qxc.ball_4.join('');
			var b5 = qxc.ball_5.join('');
			var b6 = qxc.ball_6.join('');
			var b7 = qxc.ball_7.join('');
			
			qxc.listCode.push(b1+","+b2+","+b3+","+b4+","+b5+","+b6+","+b7) ;
			
			showselq();
		}
	}) ;
	
	// 继续选号
	$("#contisel").click(function(){
		initdata();
		$("#selhm").show();
		$("#buy").hide();
	});
	
	// 立即支付
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
		$("#szs").html(qxc.totalzs);
		$("#sam").html(qxc.totalzs*qs*bs*temp);
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
		$("#szs").html(qxc.totalzs);
		$("#sam").html(qxc.totalzs*qs*bs*temp);
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
		$("#szs").html(qxc.totalzs);
		$("#sam").html(qxc.totalzs*qs*bs*temp);
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
		$("#szs").html(qxc.totalzs);
		$("#sam").html(qxc.totalzs*qs*bs*temp);
		
	}) ;
	
	// 定时期号
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
	if(temp_login_exist("qxc_lotCode")){
		var numberContent = read_temp_login("qxc_numberContent") ;
		var qxc_bs = read_temp_login("qxc_bs") ;
		var qxc_qs = read_temp_login("qxc_qs") ;
		qxc.listCode = numberContent.split("$") ;
		$("#qs").val(qxc_qs);
		$("#bs").val(qxc_bs);
		showselq() ;
	}
}) ;

//拼成购买数据

//当前选号
function presentSelNum(){
	
	var b1=[],b2=[],b3=[],b4=[],b5=[],b6=[],b7=[];						// 保存选中的号码
	var b1_class,b2_class,b3_class,b4_class,b5_class,b6_class,b7_class; // class值

	for (var cc = 0; cc < 10; cc++) {
		
		b1_class = ballObje.ball_1[cc].className;
		b1_class==="tored"&&b1.push(ballObje.ball_1[cc].attributes["vrq"].value);
		
		b2_class = ballObje.ball_2[cc].className;
		b2_class==="tored"&&b2.push(ballObje.ball_2[cc].attributes["vrq"].value);
		
		b3_class = ballObje.ball_3[cc].className;
		b3_class==="tored"&&b3.push(ballObje.ball_3[cc].attributes["vrq"].value);

		b4_class = ballObje.ball_4[cc].className;
		b4_class==="tored"&&b4.push(ballObje.ball_4[cc].attributes["vrq"].value);
		
		b5_class = ballObje.ball_5[cc].className;
		b5_class==="tored"&&b5.push(ballObje.ball_5[cc].attributes["vrq"].value);
		
		b6_class = ballObje.ball_6[cc].className;
		b6_class==="tored"&&b6.push(ballObje.ball_6[cc].attributes["vrq"].value);
		
		b7_class = ballObje.ball_7[cc].className;
		b7_class==="tored"&&b7.push(ballObje.ball_7[cc].attributes["vrq"].value);
		
	}
	// 判断是否可以确认选号
	var isOk = false ;
	if(b1.length > 0 && b2.length > 0 && b3.length > 0 && 
			b4.length > 0 && b5.length > 0 && b6.length > 0 && b7.length > 0){
		isOk = true;
	}
	// 选择的注数
	var qxc_zs = qxccalZS(b1.length,b2.length ,b3.length,b4.length,b5.length,b6.length,b7.length) ;
	
	if(qxc_zs > 0 && isOk){
		
		qxc.zs = qxc_zs ;
		qxc.ball_1 = b1 ;
		qxc.ball_2 = b2 ;
		qxc.ball_3 = b3 ;
		qxc.ball_4 = b4 ;
		qxc.ball_5 = b5 ;
		qxc.ball_6 = b6 ;
		qxc.ball_7 = b7 ;
		$("#m-submit_box_s").attr("class","m-submit_box") ;
		$("#select_code_id").html("选了<span class=\"red\">"+qxc_zs+"</span>注，共<span class=\"red\">"+(qxc_zs*2)+"</span>元");
	} else {
		qxc.zs = 0 ;
		qxc.ball_1=[] ;
		qxc.ball_2=[] ;
		qxc.ball_3=[] ;
		qxc.ball_4=[] ;
		qxc.ball_5=[] ;
		qxc.ball_6=[] ;
		qxc.ball_7=[] ;
		$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
		$("#select_code_id").html("每一位至少选择<span class=\"red\">1</span>个号码");
	}
}
/**
 *  七星彩 - 计算注数
 */
function qxccalZS(b1,b2,b3,b4,b5,b6,b7){
	return b1*b2*b3*b4*b5*b6*b7;
};

//获取期号
function activeIssue(){
	dlttimeCounter("show_time" , false , function(){
		var tp_time =-1;
		var url = "/trade/num/qxc!activeIssue.action?t="+new Date().getTime() ;
		baseAjax("get",url,false,null,"text",function(data){
	  		var lot_state = eval("("+data+")");
			if(!(typeof lot_state=="undefined") && lot_state != null){
				 tp_time = formatDate(lot_state.msg.officialEndTime , true) - formatDate(lot_state.msg.currentSysDate , true) ;
				 tp_time = tp_time / 1000 ;
			} else {
				tp_time =  -1 ;
			};
			if(lot_state.msg.issueCode != qxc.issuecode){
				qxc.issueid = lot_state.msg.issueId ;
				qxc.issuecode = lot_state.msg.issueCode ;
				var times = formatDate(lot_state.msg.officialEndTime) ;
				qxc.cur_nex_his.endtime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
				// var date= formatDate(lot_state.msg.officialOpenTime , true) ;
				// var day = getTimeDiffer(date,new Date());
				var dthtm="<strong>距"+qxc.issuecode+"期截止</strong><strong id=\"show_time\">00天00小时00分00秒</strong><span class=\"gray\">奖池</span><span class=\"red\"></span>" ;
				$("#open_code_time_id").html(dthtm);
			}	
	  	});
		return tp_time ;
	});
}

function initdata(){
	// 清空数据
	qxc.ball_1=[],qxc.ball_2=[],qxc.ball_3=[],qxc.ball_4=[],qxc.ball_5=[],qxc.ball_6=[],qxc.ball_7=[] ;
	qxc.zs = 0 ;
	qxc.amt = 0 ;
	
	// 初始化数据
	for(var i=0;i<10;i++){
		// 选中机选的号码 并且 清除之前选中的号码
		ballObje.ball_1[i].className="i-redball";
		ballObje.ball_2[i].className="i-redball";
		ballObje.ball_3[i].className="i-redball";
		ballObje.ball_4[i].className="i-redball";
		ballObje.ball_5[i].className="i-redball";
		ballObje.ball_6[i].className="i-redball";
		ballObje.ball_7[i].className="i-redball";
	}
	
	$("#m-submit_box_s").attr("class","m-submit_box disabled") ;
	$("#select_code_id").html('每一位至少选择<span class="red">1</span>个号码');
}

//加载开奖信息，期号
function prizeData(){
	//type,url,async,data,dataType,callBack
	baseAjax("get" , qxcjsonurl , false , null , "text" , function(data){
		var	x = eval('(' + data + ')');
		if(x != null){
			qxc.cur_nex_his = x;
			showinfo(x);
		}
	});
}

/**
 *  初始化选球
 */
function initAllBall(){
	var ball={};
	ball.ball1 = "" ;
	ball.ball2 = "" ;
	ball.ball3 = "" ;
	ball.ball4 = "" ;
	ball.ball5 = "" ;
	ball.ball6 = "" ;
	ball.ball7 = "" ;
	for(var i=0;i<10;i++){
		ball.ball1 += '<label class="changeballcolor"><i class="i-redball" name="selBall1" vrq='+i+'>'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display: none;">0</p></label>';
		ball.ball2 += '<label class="changeballcolor"><i class="i-redball" name="selBall2" vrq='+i+'>'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display: none;">0</p></label>';
		ball.ball3 += '<label class="changeballcolor"><i class="i-redball" name="selBall3" vrq='+i+'>'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display: none;">0</p></label>';
		ball.ball4 += '<label class="changeballcolor"><i class="i-redball" name="selBall4" vrq='+i+'>'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display: none;">0</p></label>';
		ball.ball5 += '<label class="changeballcolor"><i class="i-redball" name="selBall5" vrq='+i+'>'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display: none;">0</p></label>';
		ball.ball6 += '<label class="changeballcolor"><i class="i-redball" name="selBall6" vrq='+i+'>'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display: none;">0</p></label>';
		ball.ball7 += '<label class="changeballcolor"><i class="i-redball" name="selBall7" vrq='+i+'>'+ (i < 10 ? '' + i: i) +'</i><p class="miss" style="display: none;">0</p></label>';
	}
	return ball ;
}

//显示数据
function showinfo(jsoninfo){
	var htm = makehtml(jsoninfo) ;
	qxc.issuecode = htm.issuecode ;
	qxc.issueid = htm.issueid ;
	var times = formatDate(htm.opentime);
	qxc.opentime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
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
	$("section[id='history_back_s']").toggle();
}

function showMiss(){
	$("p[class='miss']").toggle();
	$('.miss_option label').find('i').toggleClass('i-checked');
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
	//var date= new Date(info.opentime.replace(/-/g,"/"));
	//var day = getTimeDiffer(date,new Date());
	$("#open_code_time_id").html('<strong>距'+json.issuecode+'期截止  </strong><strong id=\"show_time\">00天00小时00分00秒</strong>  <span class="gray">奖池</span><span class="red">'+moneyFormat(info.guncunPool)+'</span>');
	info.back = "" ;
	json.openlist.each(function(o , i){
		if(o.opencode==null || o.opencode=='null'){
			o.opencode="";
		}
		if(i == 0){
			info.head = "<div>上期开奖:"+o.opencode+" &nbsp;</div>" + "<span class='clickpailie3 i-slide' onclick='showHistoryData(this)'><em class='i-slideDown fold'></em>点此展开历史开奖</span>";
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div><div class=\"pl3totle\">"
					  + "<span class='red'> "+o.opencode+"</span></div></li>";
		} else {
			info.back +="<li class=\"d-boxadd\"><div class='no'>"+o.issuecode+"期</div> <div class='timeline'></div><div class=\"pl3totle\">"
			 		  + "<span class='red'> "+o.opencode+"</span> </div></li>";
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

//进入购买页面
function showselq(){
	
	// 隐藏选号界面
	$("#selhm").hide();
	//计算总注数
	counttotalsz(qxc.listCode);
	
	var listBall="" ;
	
	for (var i = qxc.listCode.length-1; i >= 0 ; i--) {
		
		listBall+="<li class='ssq'>" ;
		listBall+="<var><span class='red'>";
		listBall+=qxc.listCode[i];//.replace(/,/g, " ");
		listBall+="</span></var>" ;
		
		listBall+="<p>"+getZs(qxc.listCode[i])+"注"+getZs(qxc.listCode[i])*2+"元</p>" ;
		listBall+="<i class='i-del' onclick='deli("+i+")'></i>";
	}
	
	var qs = $("#qs").val(); // 期数
	var bs = $("#bs").val(); // 倍数
	$("#szs").html(qxc.totalzs);	// 总注数
	$("#sam").html(qxc.totalzs*qs*bs*2); // 总金额
	$("#sqs").html(qs);
	$("#sbs").html(bs);
	$("#addli").html(listBall);
	$("#buy").show();
}

/**
 * 获得总注数
 */
function counttotalsz(liCode){
	// 注数
	qxc.totalzs = 0 ;
	liCode.each(function(o){
		var ballList = o.split(",");
		var b1 = ballList[0];
		var b2 = ballList[1];
		var b3 = ballList[2];
		var b4 = ballList[3];
		var b5 = ballList[4];
		var b6 = ballList[5];
		var b7 = ballList[6];
		qxc.totalzs+=qxccalZS(b1.length,b2.length,b3.length,b4.length,b5.length,b6.length,b7.length) ;
	}) ;
}

/**
 * 计算注数
 * @code 8,0,02,20,2,4,1
 */
function getZs(code){
	var ballList = code.split(",");
	var b1 = ballList[0];
	var b2 = ballList[1];
	var b3 = ballList[2];
	var b4 = ballList[3];
	var b5 = ballList[4];
	var b6 = ballList[5];
	var b7 = ballList[6];
	qxc.zs=qxccalZS(b1.length,b2.length,b3.length,b4.length,b5.length,b6.length,b7.length) ;
	return qxc.zs;
}

// 删除已选号码
function deli(v){
	qxc.listCode.splice(v,1);
	if(qxc.listCode.length < 1){
		$("#selhm").show();
		$("#buy").hide();
	} else {
		showselq();
	}
}

// 机选
function getRandomNum(){
	var startArray = [0,1,2,3,4,5,6,7,8,9]; //seed array  
	var N = 1;//随机数个数  
	var resultArray = new Array();//结果存放在里面  
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray[i] = startArray[seed];//赋值给结果数组  
	    startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	return resultArray ;
}

/**
 * 机选
 */ 
function showRandom(){
	
	// 机选 清空数据
	qxc.ball_1=[] ;
	qxc.ball_2=[] ;
	qxc.ball_3=[] ;
	qxc.ball_4=[] ;
	qxc.ball_5=[] ;
	qxc.ball_6=[] ;
	qxc.ball_7=[] ;
	
	var b1=getRandomNum(),b2=getRandomNum(),b3=getRandomNum(),b4=getRandomNum(),b5=getRandomNum(),b6=getRandomNum(),b7=getRandomNum();
	
	// 初始化数据
	for(var i=0;i<10;i++){
		var b1_vrq = ballObje.ball_1[i].attributes["vrq"].value;
		var b2_vrq = ballObje.ball_2[i].attributes["vrq"].value;
		var b3_vrq = ballObje.ball_3[i].attributes["vrq"].value;
		var b4_vrq = ballObje.ball_4[i].attributes["vrq"].value;
		var b5_vrq = ballObje.ball_5[i].attributes["vrq"].value;
		var b6_vrq = ballObje.ball_6[i].attributes["vrq"].value;
		var b7_vrq = ballObje.ball_7[i].attributes["vrq"].value;
		// 选中机选的号码 并且 清除之前选中的号码
		b1_vrq==b1[0]?ballObje.ball_1[i].className="tored":ballObje.ball_1[i].className="i-redball";
		b2_vrq==b2[0]?ballObje.ball_2[i].className="tored":ballObje.ball_2[i].className="i-redball";
		b3_vrq==b3[0]?ballObje.ball_3[i].className="tored":ballObje.ball_3[i].className="i-redball";
		b4_vrq==b4[0]?ballObje.ball_4[i].className="tored":ballObje.ball_4[i].className="i-redball";
		b5_vrq==b5[0]?ballObje.ball_5[i].className="tored":ballObje.ball_5[i].className="i-redball";
		b6_vrq==b6[0]?ballObje.ball_6[i].className="tored":ballObje.ball_6[i].className="i-redball";
		b7_vrq==b7[0]?ballObje.ball_7[i].className="tored":ballObje.ball_7[i].className="i-redball";
	}
	presentSelNum();
}

// 立即购买页面 机选一注
function radomone(){
	
	var b1=getRandomNum(),b2=getRandomNum(),b3=getRandomNum(),b4=getRandomNum(),b5=getRandomNum(),b6=getRandomNum(),b7=getRandomNum();
	
	//qxc.ball_1=b1,qxc.ball_2=b2,qxc.ball_3=b3,qxc.ball_4=b4,qxc.ball_5=b5,qxc.ball_6=b6,qxc.ball_7=b7;
	//qxc.zs = 1 ;
	//qxc.amt = 2 ;
	
	qxc.listCode.push(b1+","+b2+","+b3+","+b4+","+b5+","+b6+","+b7) ;
	
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
	// 该期停售时间
	var cur_stop_time = new Date(qxc.cur_nex_his.endtime.replace(/-/g,"/").replace("/.0/",""));
	// 获取服务器当前时间
	var cur_time = new Date(getCurrentTimeAjax());
	
	if(cur_time>=cur_stop_time){
		open_message("当前期已停止购买");
		return;
	}
	
	if($("#iagree").attr("class")=="i-check"){		
		open_message("您需要同意“购彩协议”才能投注");		
		return ;
	}
	
	var numberContent = qxc.listCode.join("$");
	if(numberContent == null || numberContent == ""){
		open_message("没有选码投注号码，请添加号码");		
		return ;
	}
	
	var totalAmt = getTotalAmt();
	if(totalAmt>600000){
		open_message("单笔投注金额不能超过600000元!");		
		return;
	}
	// 检查登陆
	if(!checkLoginByAjax()){		
		//保存数据
		var multiple = parseInt($("#sbs").html()); // 倍数
		var trackCount = $("#sqs").html();
		write_temp_login("qxc_lotCode" , "4" , 1) ;
		write_temp_login("qxc_numberContent" , numberContent , 1) ;
		write_temp_login("qxc_play" , qxc.playId , 1) ;
		write_temp_login("qxc_bs" , multiple , 1) ;
		write_temp_login("qxc_qs" , trackCount , 1) ;
		var bakUrl = "/v3shtml/trade/num/qxc.shtml" ;
		to_login(bakUrl);
		return ;
	}
	var trackCount = parseInt($("#sqs").html());
	var investType = trackCount > 1 ? 2 : 1;
	var callbackType = 0;
	if(investType == 2){
		callbackType = 2;
	}else{
		callbackType = 1;
	}
	//金额审核
	
	if(!isOffline) {
		same.hasEnoughMoney(qxc.playId,qxc.lotid,trackCount,totalAmt,qxc.lotid,qxc.issuecode,callbackType,"");
	} else {
		same.offlineConfirmHtml(qxc.playId,qxc.lotid,trackCount,totalAmt,qxc.lotid,qxc.issuecode,callbackType,"");
	}
}

function dobuy(){
	var numberContent = qxc.listCode.join("$");
	var noteCount = qxc.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	var totalAmt = parseInt(noteCount) * multiple * 2;
	var isStop=contractCheck('stop_track_img_id')==true?1:0; //追号是否停止 1停止 0 不停止
	var playId = qxc.playId;//玩法
	var lotCode = qxc.lotid;
	var issueId = qxc.issueid;//期号ID
	var issueCode = qxc.issuecode;
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
		same.buySubmit(postData,$.trim(qxc.opentime));
}
//线下订单购买
function doOfflineBuy(){
	var numberContent = qxc.listCode.join("$");
	var noteCount = qxc.totalzs;// 注数
	var multiple = parseInt($("#sbs").html()); // 倍数
	var trackCount = $("#sqs").html();
	var totalAmt = parseInt(noteCount) * multiple * 2;
	var isStop=contractCheck('stop_track_img_id')==true?1:0; //追号是否停止 1停止 0 不停止
	var playId = qxc.playId;//玩法
	var lotCode = qxc.lotid;
	var issueId = qxc.issueid;//期号ID
	var issueCode = qxc.issuecode;
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
		same.buySubmit(postData,$.trim(qxc.opentime));
}
//差额支付时用
function doTempBuy(argJSON){
	var callbackType = argJSON.callbackType;
	var userBalacne = argJSON.allMoney;
	 var numberObject = qxc.listCode.join("$");
     var multiple = $("#sbs").html(); // 倍数
     var trackCount = $("#sqs").html();
     var zhushu = qxc.totalzs;
     var issue = qxc.issuecode;
     var lotTypeCode = qxc.lotid;
     var lotTypeplay = qxc.playId;//玩法
     var temp = 2 ;
 	 var totalAmt = parseInt(zhushu) * multiple * temp * parseInt(trackCount);
     var stopMoney=0;
	 var investType = trackCount > 1 ? 2 : 1;
     var trackType = 0;	//追号类型
     var issueId = qxc.issueid;//期号ID
     var startIssueCode=qxc.issuecode;
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
	var noteCount = qxc.totalzs;// 注数
	var multiple =parseInt($("#sbs").html()); // 倍数
	var qs = parseInt($("#sqs").html());
	var totalAmt = parseInt(noteCount) * multiple * 2 * qs;
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
