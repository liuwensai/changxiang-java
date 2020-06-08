//通过玩法获取玩法名
function getplayData(playId){
	var playStrDic={
			21001:'任选二',
			21003:'任选三',
			21005:'任选四',
			21007:'任选五',
			21009:'任选六',
			21011:'任选七',
      		21013:'任选八',
      		21014:'前一',
      		21015:'前二直选',
      		21016:'前二组选',
      		21018:'前三直选',
      		21019:'前三组选',
        };
	
	return playStrDic[playId];
}

function getSingeMoney(playId){
	var playStrDic={
			21001:6,
			21003:19,
			21005:78,
			21007:540,
			21009:90,
			21011:26,
      		21013:9,
      		21014:13,
      		21015:130,
      		21016:65,
      		21018:1170,
      		21019:195,
        };
	
	return playStrDic[playId];
}

//通过玩法名获取玩法
function getPlayId(playData){
	if(playData ==getplayData(21001) ) return 21001;
	if(playData ==getplayData(21003)) return 21003;
	if(playData ==getplayData(21005)) return 21005;
	if(playData ==getplayData(21007)) return 21007;
	if(playData ==getplayData(21009)) return 21009;
	if(playData ==getplayData(21011))  return 21011;
	if(playData ==getplayData(21013)) return 21013;
	if(playData ==getplayData(21014)) return 21014;
	if(playData ==getplayData(21015)) return 21015;
	if(playData ==getplayData(21016)) return 21016;
	if(playData ==getplayData(21018)) return 21018;
	if(playData ==getplayData(21019)) return 21019;
}

//机选个数
function getRCode(playId){
	var pldIdToPlayId={
			21001:2,
			21003:3,
			21005:4,
			21007:5,
			21009:6,
			21011:7,
      		21013:8,
      		21014:1,
      		21015:2,
      		21016:2,
      		21018:3,
      		21019:3
        };
	
	return pldIdToPlayId[playId];
}

//m 球的总个数，n  选球的个数， 返回字符型数据：“01”，“02”，“03”
function jixuan(m, n){
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

var a =new Array('01','02','03','04','05','06','07','08','09','10',
		 '11','12','13','14','15','16','17',"18","19","20",
		 '21','22','23','24','25','26','27',"28","29","30",
		 '31','32','33','34','35');


/**
 * 通过ajax同步方式取得后台json格式的数据， async : 是否同步 requestData ： 请求数据
 */
function getJsonDataAndSetToVar(url, async, requestData) {
	var returnData;
	url = ajaxToData(21);
	$.ajax({
		type : "get",
		url : url,
		async : false,
		data : requestData,
		dataType : "text",
		success : function(data) {
			returnData = eval('(' + data + ')');
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			open_message("资源导入错误!");
		}
	});
	return returnData;
}

//获取格式化开奖号码"," 改为 " "
function fmtCode(number){
	var openCode = "";
	
	var code = number.split(",");
	for(var i=0;i<code.length;i++){
		openCode = openCode + code[i];
		
		if(i < code.length-1){
			openCode = openCode + " ";
		}
	}
	
	return openCode;
}

//获取格式化开奖号码" " 改为 ","
function fmtCodeToKg(number){
	var openCode = "";
	
	var code = number.split(" ");
	for(var i=0;i<code.length;i++){
		openCode = openCode + code[i] ;
		
		if(i < code.length-1){
			openCode = openCode + ",";
		}
	}
	
	return openCode;
}

//获取选中的号码
function getSelectedCode(){
	
	var code = new Array();
	var w = new Array();
	var q = new Array();
	var b = new Array();
	
	var code_url_w = $("#codes_div").find("label");
	var code_url_q = $("#codes_div_q").find("label");
	var code_url_b = $("#codes_div_b").find("label");
	
	code_url_w.each(function(index, el) {
		
		if($(this).find("input").is(":checked"))w[w.length] = $(this).find("i").html();
			
	});
	
	code_url_q.each(function(index, el) {
		
		if($(this).find("input").is(":checked"))q[q.length] = $(this).find("i").html();
			
	});

	code_url_b.each(function(index, el) {
	
	if($(this).find("input").is(":checked"))b[b.length] = $(this).find("i").html();
		
	});
	
	code.push(w);
	code.push(q);
	code.push(b);
	
	return code;
}

//获取购买的号码
function getBuyCodes(){
	var len = 1;
	var buyCodes = "";
	var liLength=$$("selected_code_id").childNodes.length;//获取ul中li的长度
	
	var selected_url = $("#selected_code_id").find("li");
	selected_url.each(function(index, el) {
		len++;
		var obj = $(this).find("var").find("span");
		buyCodes = buyCodes + fmtCodeToKg(obj.html().trim());
		if(len < liLength){
			buyCodes = buyCodes + "$";
		}
		
	});
	
	return buyCodes;
}

//获取选中号码的个数
function codeTotal(){
	var len = 0;
	var code_url = $("#codes_div").find("label");
	
	code_url.each(function(index, el) {
		
		if($(this).find("input").is(":checked")){
			len++;
		}
		
	});
	
	return len;
}

//获取ul厦门li的数量
function _liLength(id){
	 return $$(id).getElementsByTagName("li").length;
}

//判断是否混合投注并返回购买号码字符串
function getBuyCodeStr(){
	if(isCheckHhtz()){
		return getBuyCodes();
	}
	
	if(!isCheckHhtz()){
		var buyCodes = "";
		var liLength=_liLength("selected_code_id");//获取ul中li的长度
		
		var selected_url = $("#selected_code_id").find("li");
		selected_url.each(function(index, el) {
			var obj = $(this).find("var").find("span");
			var playid = getPlayId($(this).find("var").find("em").html());
			
			buyCodes = buyCodes +playid + "@" + fmtCodeToKg(obj.html().trim());
			if(index < liLength - 1){
				buyCodes = buyCodes + "$";
			}
			
		});
		
		return buyCodes;
	}
	
	return null;
}

//判断是否混合投注
function isCheckHhtz(){
	var flag = true;
	var selected_url = $("#selected_code_id").find("li");
	selected_url.each(function(index, el) {
		
		var obja = $(this).find("var").find("em");
		var a = getPlayId(obja.html());
		
		selected_url.each(function(index, el) {
			
			var objb = $(this).find("var").find("em");
			var b = getPlayId(objb.html());
			
			if(a != b){
				flag = false;
			}
			
		});
		
	});
	
	return flag;
}

//获取id对象
function $$(id){
    var obj=document.getElementById(id);  
    return obj;  
}

//判断一个数据是不是数字;如果是则返回n参数
function isNum(val,n){
	var t = /^[0-9]*[1-9][0-9]*$/;
	if(t.test(val)){
		if(val > 9999){
			return n;
		}
		
		return val;
	}else{
		return n;
	}
}

//获取一个时间后一段时间
function showOpenTime(openTime,n){
	var openCodeTime= new Date(openTime.replace(/-/g,"/"));
	var hTime= new Date(openTime.replace(/-/g,"/"));
	hTime.setMinutes(openCodeTime.getMinutes() + n);	//开奖n分钟后开始获取开奖号码
   
    return getNewFormatDate(hTime);
}

//时间格式化
function getNewFormatDate(date){
	var time = date.format("YY-MM-DD hh:mm:ss");
	return time;
}

//显示index页面
function indexShow(){
	 $("#index_page").show();
}

//显示购买页面
function buyShow(){
	 $("#buy_page").show();
}

//隐藏index页面
function indexHide(){
	 $("#index_page").hide();
}

//隐藏购买页面
function buyHide(){
	 $("#buy_page").hide();
}

//显示千位选号
function qcodeShow(){
	$("#codes_div_q").show();
}

//显示百位选号
function bcodeShow(){
	$("#codes_div_b").show();
}

//隐藏千位选号
function qcodeHide(){
	$("#codes_div_q").hide();
}

//隐藏百位选号
function bcodeHide(){
	$("#codes_div_b").hide();
}

//获取不同玩法的注数;玩法，选号数量,选号
function getZhushuByPlay(playId,codeNum,codes){
	
	//任选
	if(playId <= 21014 ){
		return Cmn(codeNum,getRCode(playId));
	}
	
	//前二直选
	if(playId == 21015){
		
		var w = codes[0];
		var q = codes[1];
		return qr(w,q);
	}
	
	//前三直选
	if(playId == 21018){
		
		var w = codes[0];
		var q = codes[1];
		var b = codes[2];
		return qs(w,q,b);
	}
	
	//前二组选
	if(playId == 21016){
		return qrz(codeNum);
	}
	
	//前三组选
	if(playId == 21019){
		return qsz(codeNum);
	}
	
}

//计算组合数公式 C5/6
function Cmn( m,  n){
    var n1 = 1, n2 = 1;
    for (var i = m, j = 1; j <= n; n1 *= i--, n2 *= j++) ;
    return n1 / n2;
}

//前二组选
function qrz(len){
	return (len* (len - 1)) / (2 * 1);
}

//前三组选
function qsz(len){
	return (len * (len-1) *(len - 2)) /(3 * 2 * 1);
}

//前二直选(获取注数数量)
function qr(w,q){
	var count = 0;
	for(var i=0;i<w.length;i++)
		count = count + xh(w[i],q);
	return count;
}

//前二直选(获取注数数量)
function qrCF(w,q){
	var flag = false;
	for(var i=0;i<w.length;i++){
		if(xhCF(w[i],q)){
			flag = true;
		}
	}
		
	return flag;
}

//前二直选(获取注数数据)
function qrData(w,q){
	var data = new Array();
	for(var i=0;i<w.length;i++)
		data[i] = xhData(w[i],q);
	return data;
}

//前三直选（获取注数数量）
function qs(w,q,b){
	var count = 0;
	for(var i=0;i<w.length;i++)
		count = count + xhq(w[i],q,b);
	return count;
}

//前三直选（获取注数数量）
function qsCF(w,q,b){
	var flag = false;
	for(var i=0;i<w.length;i++){
		if(xhqCF(w[i],q,b)){
			flag = true;
		}
	}
		
	return flag;
}

//前三直选（获取注数数据）
function qsData(w,q,b){
	var data = new Array();
	for(var i=0;i<w.length;i++)
		data[i] = xhqData(w[i],q,b);
	return data;
}

//千位循环
function xh(w,q){
	var len = 0 ;
	for(var i=0;i<q.length;i++){
		if(w != q[i])
			len = len + 1;
	}
	
	
	return len;
}

//千位循环
function xhCF(w,q){
	var flag = false;
	for(var i=0;i<q.length;i++){
		if(w == q[i]){
			flag = true;
		}
			
	}
	
	return flag;
}

//千位循环（返回注数数据）
function xhData(w,q){
	var data = new Array();
	var j = 0;
	for(var i=0;i<q.length;i++){
		if(w != q[i]){
			data[j] = (w+","+q[i]);
			j = j + 1;
		}
	}
	return data;
}

//百位循环
function xhb(w,q,b){
	var len = 0;
	for(var i=0;i<b.length;i++){
		if(w!=q&&q!=b[i]&&w!=b[i])
			len = len + 1;
	}
	return len;
}

//百位循环(判断是否重复)
function xhbCF(w,q,b){
	var flag = false;
	for(var i=0;i<b.length;i++){
		if(w==q||q==b[i]||w==b[i])
			flag = true;
	}
	return flag;
}
	
//百位循环(返回注数数据)
function xhbData(w,q,b){
	var data = new Array();
	var j = 0;
	for(var i=0;i<b.length;i++){
		if(w!=q&&q!=b[i]&&w!=b[i]){
			data[j] = (w+","+q+","+b[i]);
			j = j + 1;
		}
			
	}
	return data;
}


//前三直选千位
function xhqCF(w,q,b){
	var flag = false ;
	for(var i=0;i<q.length;i++){
		if(w==q[i]||xhbCF(w,q[i],b)){
			flag = true;
		}
			
	}
	
	return flag;
}

//前三直选千位
function xhq(w,q,b){
	var len = 0 ;
	for(var i=0;i<q.length;i++){
		if(w!=q[i])
			len = len + xhb(w,q[i],b);
	}
	
	return len;
}

//前三直选千位（返回注数数据）
function xhqData(w,q,b){
	var data = new Array();
	var j = 0;
	for(var i=0;i<q.length;i++){
		if(w!=q[i]){
			data[j] = xhbData(w,q[i],b);
			j= j + 1;
		}
	}
	
	return data;
}

//机选
function randomCodeShow(){
	
	var code_url_w = $("#codes_div").find("label");
	var code_url_q = $("#codes_div_q").find("label");
	var code_url_b = $("#codes_div_b").find("label");
	
	var ball = jixuan(11,getRCode(playId))
	
	if(ball == null){
		return ;
	}
	
	if(playId <= 21014 || playId ==21016 || playId ==21019){
		code_url_w.each(function(index, el) {
			
			var iCode= $(this).find("i");
			$(this).find("input").attr("checked",false);
			for(var i=0;i<ball.length;i++){
				if (ball[i] == ($(iCode).html())) {
					$(this).find("input").attr("checked",true);
					$("#zh_total_buy").html("<span>1注 <strong class='red'>共2元</strong></span>");
				}
			}
			
		});
	}

	if(playId == 21015){
		code_url_w.each(function(index, el) {
			
			if (ball[0] == ($(iCode).html())) {
				$(this).find("input").attr("checked",true);
			}
			
		});
		
		code_url_q.each(function(index, el) {
			
			if (ball[1] == ($(iCode).html())) {
				$(this).find("input").attr("checked",true);
			}
			
		});
	}
	
	if(playId == 21018){
		code_url_w.each(function(index, el) {
			
			if (ball[0] == ($(iCode).html())) {
				$(this).find("input").attr("checked",true);
			}
			
		});
		
		code_url_q.each(function(index, el) {
			
			if (ball[1] == ($(iCode).html())) {
				$(this).find("input").attr("checked",true);
			}
			
		});
		
		code_url_b.each(function(index, el) {
			
			if (ball[2] == ($(iCode).html())) {
				$(this).find("input").attr("checked",true);
			}
			
		});
	}
	
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