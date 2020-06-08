var jsonurl = "/ipub/trade/issue!toIssueOrMatch.action?lotCode=9" ; //获取对阵


var jcz ={} ;
jcz.playid = 9005 ;
jcz.maxjj = 0 ;
jcz.gg=[] ;
jcz.findsp = -1 ;//-1全部，0小于1.5 ， 1，1.5到2.0，2大于2.0
jcz.data = null ;
$(document).ready(function(){
	getJsonDataAndSetToVar();
	var v = "2串1" ;
	index.ggType.push(v) ;
	index.GuoGuanType=2;
	
    $("#bs").focus(function(){
  	}).blur(function(){
        var val = parseInt($(this).val()) ;
        if(isNaN(val)){
        	$("#bs").val(1) ;
        } else {
        	$("#bs").val(val) ;
        }
        updatebs() ;
  	});
    
    $("#bs").keyup(function(){
        var val = parseInt($(this).val()) ;
        if(isNaN(val)){
        } else {
        	$("#bs").val(val) ;
        }
        updatebs() ;
    });	
    
	$("#bsdsc").click(function(){
        var val = parseInt($("#bs").val()) ;
        val = val - 1 ;
        if(isNaN(val) || val <= 0){
        	val = 1 ;
        } else {
        	$("#bs").val(val) ;
        }
        $("#bs").val(val) ;
        updatebs() ;
	}) ;
	
	$("#bsadd").click(function(){
        var val = parseInt($("#bs").val()) ;
        val = val + 1 ;
        if(isNaN(val) || val <= 0){
        	val = 1 ;
        } else {
        	$("#bs").val(val) ;
        }
        $("#bs").val(val) ;
        updatebs() ;
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
	
	$("#iknow").click(function(){
		$("#agreegz").hide() ;
	});
	
	
	$("#totouzhu").one("click" , function(){
		confirmtobuy();
	}) ;
	
	$("div[name='findsp']").click(function(){
		var thisv = $(this) ;
		findsp(thisv) ;
	}) ;
}) ;


//过滤赛事
function findsp(thisv){
	jcz.playid = 9005 ;
	jcz.maxjj = 0 ;
	index.ggType =[] ;
	var v = "2串1" ;
	index.ggType.push(v) ;
	index.GuoGuanType=2;
	index.gameList=[] ;
	showselc();
	
	$("#s-sjgz").hide();
	
	$("div[name='findsp']").attr("class" , "btn_martboxlist") ;
	thisv.toggleClass("on");
	jcz.findsp = thisv.attr("va") ;
	if(jcz.data != null){
		showmatch(jcz.data) ;
	}
}

function initDatabak(){
	jcz.playid = 9005 ;
	jcz.maxjj = 0 ;
	index.ggType=[];
	var v = "2串1" ;
	index.ggType.push(v) ;
	index.GuoGuanType=2;
	index.gameList=[] ;
	$("div[name='selmts']").attr("class", "matinfo_boxi") ;
	$("div[name='selmtp']").attr("class", "matinfo_boxvs") ;
	$("div[name='selmtf']").attr("class", "matinfo_boxi") ;
	showselc();
}

//场次隐藏 显示
function matchshowhide(n){
	//btn_jtup fold
	$("#jp_"+n).toggleClass("fold") ;
	$("#mt_"+n).toggle();
}


//格式化时间
function formatdates(str) {
	var times={} ;
	var st ; 
	//全数字
	 if(/^\d+$/.test(str) && !isNaN(str)){
		 st = str ;
	 } else {
		 st = str.split(".")[0].replace(/-/g,"/");
	 }
	var now = new Date(st);
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

//显示对阵
function showmatch(data){
	if(data == null){
		return ;
	}
	var vshow = "" ;
	if(data.length < 1){
		$(".g-ball_box").html('<div class="gray mt_100 i-txtcen">暂无赛事信息，您可投注其它彩种</div>') ;
	} else {
		for (var cs = 0; cs < data.length; cs++) {
			if(cs == 0){
				continue ;
			}
			
			var tim = data[cs][0][0][5] ;
			var tm = formatdates(tim) ;
			if(cs == 1){
				vshow +="<div class='j-jctitle plr_16' onclick='matchshowhide("+cs+")'>"+tm.year+":"+tm.month+":"+tm.date+"&nbsp;"+tm.day+" "+data[cs].length+"场比赛可投注 <span id='jp_"+cs+"' class='btn_jtup fold'><div class='icn-jtdw'></div></span></div>" ;
				vshow +="<div class='j-matchesinfo' id='mt_"+cs+"'>" ;
			} else {
				vshow +="<div class='j-jctitle plr_16' onclick='matchshowhide("+cs+")'>"+tm.year+":"+tm.month+":"+tm.date+"&nbsp;"+tm.day+" "+data[cs].length+"场比赛可投注 <span id='jp_"+cs+"' class='btn_jtup'><div class='icn-jtdw'></div></span></div>" ;
				vshow +="<div class='j-matchesinfo' style='display:none' id='mt_"+cs+"'>" ;
			}
			vshow +=showcc(data[cs] , cs) ;
			vshow +="</div>" ;
		}
		$("#showmt").html(vshow) ;
		bindselMatch();
	}
}

//返回后返选号码
function baksel(){
	if(index.gameList.length > 0){
		//$("div[name='selmts']").attr("class", "matinfo_boxi") ;
		//$("div[name='selmtp']").attr("class", "matinfo_boxvs") ;
		//$("div[name='selmtf']").attr("class", "matinfo_boxi") ;
		if(jcz.data != null){
			showmatch(jcz.data) ;
		}
		
		for (var i = 0; i < index.gameList.length; i++) {
			var chks = index.gameList[i].chks ;
			var suffix = index.gameList[i].suffix ;
			var parent = $("li[suff='"+suffix+"']") ;
			for(var a = 0 ; a < chks.length ; a++){
				if(chks[a]=="9005_3"){
					parent.find("div[cvalue='"+chks[a]+"']").addClass("on") ;
				} else if(chks[a]=="9005_1"){
					parent.find("div[cvalue='"+chks[a]+"']").addClass("on") ;
				} else if(chks[a]=="9005_0"){
					parent.find("div[cvalue='"+chks[a]+"']").addClass("on") ;
				}
			}
		}
	}
	bindselMatch();
}

//绑定选号点击事件
function bindselMatch(){
	$("div[name='selmts']").unbind("click") ;
	$("div[name='selmts']").click(function(){
		var va = $(this) ;
		va.toggleClass("on") ;
		chooseNumber(va.parent() , va);
		showselc();
	});
	$("div[name='selmtp']").unbind("click") ;
	$("div[name='selmtp']").click(function(){
		var va = $(this) ;
		va.toggleClass("on") ;
		chooseNumber(va.parent()  , va);
		showselc();
	});
	$("div[name='selmtf']").unbind("click") ;
	$("div[name='selmtf']").click(function(){
		var va = $(this) ;
		va.toggleClass("on") ;
		chooseNumber(va.parent()  , va);
		showselc();
	});
}

function showselc(){
	if(index.gameList.length < 2){
		$("#showselc").html("至少选择2场比赛");
	} else {
		$("#showselc").html("选择了"+index.gameList.length+"场比赛");
	}
}


function showcc(base , n){
	var va = "" ;
	for (var c = 0; c < base.length; c++) {
		va +="<ul class='j-matcheslist'>" ;
		va +=showspf(base[c]) ;
		va +="</ul>" ;
	}
	return va ;
}

//显示对阵基本信息
function showspf(base){
	//[[ccId , ccNumber , leagueName , homeName , guestName , stopDate ][oddsSpfg][oddsRqspfg , ggConcede]]
	var spv = base[1][0] ;
	var sp = spv.split(",") ;
	var tm = formatdates(base[0][5]) ;
	
	var ccid = base[0][0] ;
	var ccNumber = base[0][1] ;
	var leagueName = base[0][2] ;
	var homeName = base[0][3] ;
	var guestName = base[0][4] ;
	var suff = tm.year.toString()+tm.month.toString()+tm.date.toString()+ccNumber+"" ;
	var gdate = $.trim(base[0][6]) ;
	
	var gendtime = $.trim(base[0][5]) ;//tm.year+"-"+tm.month +"-"+tm.date+" "+tm.hour+":"+tm.minute+":"+tm.second ;
	
	if(sp[0]==0 || sp[1] == 0 || sp[2] == 0){
		return "";
	}
	
	var s = parseFloat(sp[0]) ;
	var p = parseFloat(sp[1]) ;
	var f = parseFloat(sp[2]) ;
	
	if(jcz.findsp == -1){
	} else if(jcz.findsp == 0) {
		if(s > 1.5 && p > 1.5 && f >1.5 ){
			return "" ;
		}
	} else if(jcz.findsp == 1) {
		if((p >= 2.0 || p <=1.5) &&  (s >= 2.0 || s <=1.5) && (f >= 2.0 || f <=1.5) ){
			return "" ;
		}
	} else if(jcz.findsp == 2) {
		if(sp[1] < 2.0 && sp[0] < 2.0 && sp[2] < 2.0 ){
			return "" ;
		}
	}
	
	
	va = "" ;
	va +="<li class='b-flex' gdate ='"+gdate+"' gendtime='"+gendtime+"' ccid='"+ccid+"' ccNumber='"+ccNumber+"' leagueName='"+leagueName+"' homeName='"+homeName+"' guestName='"+guestName+"' suff='"+suff+"' pid='9005' win="+sp[0]+" draw="+sp[1]+" lost="+sp[2]+" spv='"+spv+"'>" ;

	va +="<div class='matinfo_ltxt'>" ;
	
	va +="<span class='site'>" ;
	va +="<em>"+leagueName+"</em><br />" ;
	va +="<em>"+tm.hour+":"+tm.date+"截止</em>" ;
	va +="</span>" ;
	va +="</div>";
	
	var homet = "" ;
	if(jcz.findsp == -1){
		homet = "<div class='matinfo_boxi' name='selmts' sp="+sp[0]+" pval='3' cvalue='9005_3'>" ;
	} else if(jcz.findsp == 0) {
		if(s <= 1.5){
			homet = "<div class='matinfo_boxi org' name='selmts' sp="+sp[0]+" pval='3' cvalue='9005_3'>" ;
		} else {
			homet = "<div class='matinfo_boxi' name='selmts' sp="+sp[0]+" pval='3' cvalue='9005_3'>" ;
		}
	} else if(jcz.findsp == 1) {
		if(s >1.5 && s <2.0){
			homet = "<div class='matinfo_boxi org' name='selmts' sp="+sp[0]+" pval='3' cvalue='9005_3'>" ;
		} else {
			homet = "<div class='matinfo_boxi' name='selmts' sp="+sp[0]+" pval='3' cvalue='9005_3'>" ;
		}
	} else if(jcz.findsp == 2) {
		if(s >=2.0){
			homet = "<div class='matinfo_boxi org' name='selmts' sp="+sp[0]+" pval='3' cvalue='9005_3'>" ;
		} else {
			homet = "<div class='matinfo_boxi' name='selmts' sp="+sp[0]+" pval='3' cvalue='9005_3'>" ;
		}
	}
	
	va += homet ;//"<div class='matinfo_boxi' name='selmts' sp="+sp[0]+" pval='3' cvalue='9005_3'>" ;
	va +="<span class='pitch'>" ;
	va +="<em class='f12'>"+homeName+"</em>" ;
	va +="<p>主胜"+sp[0]+" </p>" ;
	va +="</span>" ;
	va +="</div>" ;
	
	var vst = "" ;
	if(jcz.findsp == -1){
		vst = "<div class='matinfo_boxvs' name='selmtp' sp="+sp[1]+" pval='1' cvalue='9005_1'>" ;
	} else if(jcz.findsp == 0) {
		if(p <= 1.5){
			vst = "<div class='matinfo_boxvs org' name='selmtp' sp="+sp[1]+" pval='1' cvalue='9005_1'>" ;
		} else {
			vst = "<div class='matinfo_boxvs' name='selmtp' sp="+sp[1]+" pval='1' cvalue='9005_1'>" ;
		}
	} else if(jcz.findsp == 1) {
		if(p >1.5 && p <2.0){
			vst = "<div class='matinfo_boxvs org' name='selmtp' sp="+sp[1]+" pval='1' cvalue='9005_1'>" ;
		} else {
			vst = "<div class='matinfo_boxvs' name='selmtp' sp="+sp[1]+" pval='1' cvalue='9005_1'>" ;
		}
	} else if(jcz.findsp == 2) {
		if(p >=2.0){
			vst = "<div class='matinfo_boxvs org' name='selmtp' sp="+sp[1]+" pval='1' cvalue='9005_1'>" ;
		} else {
			vst = "<div class='matinfo_boxvs' name='selmtp' sp="+sp[1]+" pval='1' cvalue='9005_1'>" ;
		}
	}
	
	va += vst ;//"<div class='matinfo_boxvs' name='selmtp' sp="+sp[1]+" pval='1' cvalue='9005_1'>" ;
	va +="<span class='pitch'>" ;
	va +="<em class='f12'>vs</em>" ;
	va +="<p>平"+sp[1]+" </p>" ;
	va +="</span>" ;
	va +="</div>" ;
	
	
	var guestt = "" ;
	if(jcz.findsp == -1){
		guestt = "<div class='matinfo_boxi' name='selmtf' sp="+sp[2]+" pval='0' cvalue='9005_0'>" ;
	} else if(jcz.findsp == 0) {
		if(f <= 1.5){
			guestt = "<div class='matinfo_boxi org' name='selmtf' sp="+sp[2]+" pval='0' cvalue='9005_0'>" ;
		} else {
			guestt = "<div class='matinfo_boxi' name='selmtf' sp="+sp[2]+" pval='0' cvalue='9005_0'>" ;
		}
	} else if(jcz.findsp == 1) {
		if(f >1.5 && f <2.0){
			guestt = "<div class='matinfo_boxi org' name='selmtf' sp="+sp[2]+" pval='0' cvalue='9005_0'>" ;
		} else {
			guestt = "<div class='matinfo_boxi' name='selmtf' sp="+sp[2]+" pval='0' cvalue='9005_0'>" ;
		}
	} else if(jcz.findsp == 2) {
		if(f >=2.0){
			guestt = "<div class='matinfo_boxi org' name='selmtf' sp="+sp[2]+" pval='0' cvalue='9005_0'>" ;
		} else {
			guestt = "<div class='matinfo_boxi' name='selmtf' sp="+sp[2]+" pval='0' cvalue='9005_0'>" ;
		}
	}
	va += guestt ;//"<div class='matinfo_boxi' name='selmtf' sp="+sp[2]+" pval='0' cvalue='9005_0'>" ;
	va +="<span class='pitch'>" ;
	va +="<em class='f12'>"+guestName+"</em>" ;
	va +="<p>客胜"+sp[2]+" </p>" ;
	va +="</span>" ;
	va +="</div>" ;
	va +="</li>" ;
	
	return va ;
}


/**
 * 通过ajax同步方式取得后台json格式的数据
 */
function getJsonDataAndSetToVar() {
	var returnData = null;
	jsonurl = ajaxToData(9);
	$.ajax({
		type:"POST",
		url:jsonurl,
		async:true,
		dataType:"text",
		timeout: 60000,
		success:function(rd) {
			returnData = eval(rd);
			if(returnData != null){
				jcz.data = returnData ;
				showmatch(returnData);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$(".g-ball_box").html('<div class="gray mt_100 i-txtcen">暂无赛事信息，您可投注其它彩种</div>') ;
			open_message(XMLHttpRequest.status);
		}
	});
	return returnData;
}



/** 竞彩足球选号代码开始 */
//添加内容
var chooseNumber = function(obj, objtd) {
	// 得到玩法id
	var paid = $(obj).attr("pid");
	// /得到选中cid
	var cid = $(obj).attr("ccid");
	
	//sp
	var spv = $(obj).attr("spv") ;
	
	var k = -1;// 被选的对象判断是否存在
	for ( var i = 0, j = index.gameList.length; i < j; i++) {
		if (index.gameList[i].cid == cid) {
			k = i;
		}
	}
	if (k != -1) {
		chooseNumberIsSelected(paid, objtd, k);
	} else {
		var singleInfo = {
			choose : (function(self) {
				var d = -1;
				switch (paid * 1) {
				case 9005:
					d = 0;
					break;
				case 9001:
					d = 1;
					break;
				case 9004:
					d = 2;
					break;
				case 9002:
					d = 3;
					break;
				case 9003:
					d = 4;
					break;
				}
				var ret = [ {9005 : ""}, {9001 : ""}, {9004 : ""}, {9002 : ""}, {9003 : ""} ];
				if ($(self).attr("class") == "matinfo_boxi on" || $(self).attr("class") == "matinfo_boxi org on" || $(self).attr("class") == "matinfo_boxvs on" || $(self).attr("class") == "matinfo_boxvs org on") {
					ret[d][paid] = $(self).attr("pval");
				}
				return ret;
			}(objtd)),
			suffix : obj.attr('suff'),// 用来排序的下标 标示
			cid : obj.attr('ccid'), // 赛事ID
			cnumber : obj.attr('ccNumber'), // 完整编号 1001
			//cname : comm.getMatchName(obj.attr('cnumber')), // 周一001
			gname : obj.attr('leagueName'), // 完整名称
			gtype : obj.attr('gtype'), // 赛事类型
			gdate : obj.attr('gdate'), // 完整日期
			hometeam : obj.attr('homeName'), // 主队
			guestteam : obj.attr('guestName'), // 客队
			rq : obj.attr('rq'), // 让球
			win : obj.attr('win'), // 胜的赔率
			draw : obj.attr('draw'), // 平的赔率
			lost : obj.attr('lost'), // 负的赔率
			gendtime : obj.attr('gendtime'), // 截止时间
			dan : "0", // 1为胆
			spv:spv,
			chks : (function(chks) {
				var ret = [];
				if ($(chks).attr("class") == "matinfo_boxi on" || $(chks).attr("class") == "matinfo_boxi org on" || $(chks).attr("class") == "matinfo_boxvs on" || $(chks).attr("class") == "matinfo_boxvs org on") {
					ret.push($.trim($(chks).attr("cvalue")));
				}
				return ret;
			})(objtd),
			selectedSP : (function(chks) {
				var ret = [];
				if ($(chks).attr("class") == "matinfo_boxi on" || $(chks).attr("class") == "matinfo_boxi org on" || $(chks).attr("class") == "matinfo_boxvs on" || $(chks).attr("class") == "matinfo_boxvs org on") {
					var _sp = "";
					_sp = $(chks).attr("sp");
					ret.push($.trim(_sp));
				}
				return ret;
			})(objtd)
		};
		singleInfo.minSP = Math.min.apply(Math, singleInfo.selectedSP) || 1; // 最小赔率
		singleInfo.maxSP = Math.max.apply(Math, singleInfo.selectedSP) || 1; // 最大赔率
		index.gameList.push(singleInfo);
	}
	
	//排序 用suffix
	index.gameList.sort(function(a,b){
		  return a.suffix-b.suffix;
	});
	
	updatebs() ;
};

var chooseNumberIsSelected = function(paid, objtd, k) {
	var d = -1;
	switch (paid * 1) {
	case 9005:
		d = 0;
		break;
	case 9001:
		d = 1;
		break;
	case 9004:
		d = 2;
		break;
	case 9002:
		d = 3;
		break;
	case 9003:
		d = 4;
		break;
	}
	// index.gameList[k].choose[d][paid]=function(self){
	if (d != -1) {
		// 给选中的框赋值
		var iii = -1;
		if ($(objtd).attr("class") == "matinfo_boxi on" || $(objtd).attr("class") == "matinfo_boxi org on" || $(objtd).attr("class") == "matinfo_boxvs on" || $(objtd).attr("class") == "matinfo_boxvs org on")
			index.gameList[k].chks.push($.trim($(objtd).attr("cvalue")));
		else {
			for ( var i = 0, j = index.gameList[k].chks.length; i < j; i++) {
				if (index.gameList[k].chks[i] == $
						.trim($(objtd).attr("cvalue"))) {
					index.gameList[k].chks.splice(i, 1);
					iii = i;
				}
			}
		}
		if (index.gameList[k].chks.length == 0) {
			index.gameList.splice(k, 1);
			return;
		}
		// 给赔率赋值
		if ($(objtd).attr("class") == "matinfo_boxi on" || $(objtd).attr("class") == "matinfo_boxi org on" || $(objtd).attr("class") == "matinfo_boxvs on" || $(objtd).attr("class") == "matinfo_boxvs org on")
			index.gameList[k].selectedSP.push($(objtd).attr("sp"));
		else {
			index.gameList[k].selectedSP.splice(iii, 1);
		}
		index.gameList[k].minSP = Math.min.apply(Math,
				index.gameList[k].selectedSP) || 1; // 最小赔率
		index.gameList[k].maxSP = Math.max.apply(Math,
				index.gameList[k].selectedSP) || 1; // 最大赔率
		var chos = [];
		if (index.gameList[k].choose[d][paid] == "") {
			if ($(objtd).attr("class") == "matinfo_boxi on" || $(objtd).attr("class") == "matinfo_boxi org on" || $(objtd).attr("class") == "matinfo_boxvs on" || $(objtd).attr("class") == "matinfo_boxvs org on")
				chos.push($(objtd).attr("pval"));
		} else {
			chos = index.gameList[k].choose[d][paid].split(",");
			if ($(objtd).attr("class") == "matinfo_boxi on" || $(objtd).attr("class") == "matinfo_boxi org on" || $(objtd).attr("class") == "matinfo_boxvs on" || $(objtd).attr("class") == "matinfo_boxvs org on")
				chos.push($(objtd).attr("pval"));
			else {
				for ( var i = 0, j = chos.length; i < j; i++) {
					if (chos[i] == $(objtd).attr("pval")) {
						chos.splice(i, 1);
						break;
					}
				}
			}
		}
		index.gameList[k].choose[d][paid] = chos.join(",");
	}
	
	updatebs() ;
};





//跳转到购买页面
function tobuydiv(){
	if(index.gameList.length > 1){
		defgg() ;
		$("#sel").hide();
		var showinf = "" ;
		for (var v = 0; v < index.gameList.length; v++) {
			showinf += buydivinfo(index.gameList[v] , v) ;
		}
		$("#buyinfsel").html(showinf);
		bindselMatch();
		
		updatebs();
		$("#buy").show();
		
	}
}

//默认过关
function defgg(){
	var len = index.gameList.length ;
	var v = "2串1" ;
	if(len > 1 && len < 8){
		v = len+"串1" ;
	} else if(len >= 8){
		v = "8串1" ;
	}
	index.ggType=[] ;
	index.ggType.push(v) ;
	index.GuoGuanType=2;
	$("#selectedgs").html(v) ;
}

function retsel(){
	$("#buy").hide();
	$("#sel").show();
	baksel();
	$("#showselc").html("选择了"+index.gameList.length+"场比赛") ;
}

//显示购买div信息
function buydivinfo(base , n){
	//[[ccId , ccNumber , leagueName , homeName , guestName , stopDate ][oddsSpfg][oddsRqspfg , ggConcede]]
	var spv = base.spv.split(",") ;
	var s = spv[0] ;
	var p = spv[1] ;
	var f = spv[2] ;
	//var sp = spv.split(",") ;
	var tm = formatdates(base.gendtime) ;
	
	var ccid = base.cid;
	var ccNumber = base.cnumber ;
	var leagueName = base.gname ;
	var homeName = base.hometeam ;
	var guestName = base.guestteam ;
	var suff = tm.year.toString()+tm.month.toString()+tm.date.toString()+ccNumber+"" ;
	var gdate = base.gdate ;
	
	var gendtime = $.trim(base.gendtime) ;//tm.year+"-"+tm.month +"-"+tm.date+" "+tm.hour+":"+tm.minute+":"+tm.second ;
	var chks = base.chks ;
	
	var va = "<ul class='j-matcheslist'>" ;
	va +="<li class='b-flex' gdate='"+gdate+"' gendtime='"+gendtime+"' ccid="+ccid+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" suff="+suff+" pid='9005' win="+s+" draw="+p+" lost="+f+">" ;
	
	var vs = "<div class='matinfo_boxi' name='selmts' sp="+s+" pval='3' cvalue='9005_3'>" ; ;
	for(var i = 0 ; i < chks.length ; i++){
		if(chks[i] == "9005_3"){
			vs = "<div class='matinfo_boxi on' name='selmts' sp="+s+" pval='3' cvalue='9005_3'>" ;
		}
	}
	va +=vs ;
	
	
	va +="<span class='pitch'>" ;
	va +="<em class='f12'>"+homeName+"</em>" ;
	va +="<p>主胜"+s+" </p>" ;
	va +="</span>" ;
	va +="</div>" ;
	//va +="<div class='matinfo_boxvs' name='selmtp' sp="+p+" pval='1' cvalue='9005_1'>" ;
	
	var vp = "<div class='matinfo_boxi' name='selmtp' sp="+p+" pval='1' cvalue='9005_1'>" ; ;
	for(var i = 0 ; i < chks.length ; i++){
		if(chks[i] == "9005_1"){
			vp = "<div class='matinfo_boxi on' name='selmtp' sp="+p+" pval='1' cvalue='9005_1'>" ;
		}
	}
	va +=vp ;
	
	
	va +="<span class='pitch'>" ;
	va +="<em class='f12'>vs</em>" ;
	va +="<p>平"+p+" </p>" ;
	va +="</span>" ;
	va +="</div>" ;
	//va +="<div class='matinfo_boxi'  name='selmtf' sp="+f+" pval='0' cvalue='9005_0'>" ;
	
	var vf = "<div class='matinfo_boxi' name='selmtf' sp="+f+" pval='0' cvalue='9005_0'>" ; ;
	for(var i = 0 ; i < chks.length ; i++){
		if(chks[i] == "9005_0"){
			vf = "<div class='matinfo_boxi on' name='selmtf' sp="+f+" pval='0' cvalue='9005_0'>" ;
		}
	}
	va +=vf ;
	
	va +="<span class='pitch'>" ;
	va +="<em class='f12'>"+guestName+"</em>" ;
	va +="<p>客胜"+f+" </p>";
	va +="</span>" ;
	va +="</div>" ;
	va +="<div class='matinfo_ltxtcart martpositon' >" ;
	va +="<i class='i-del' onclick='delm("+n+")'></i>";
	va +="</div>" ;
	va +="</li>" ;
	va +="</ul>" ;

	return va ;
}

//删除选择的对阵
function delm(m){
	index.gameList.splice(m,1);
	if(index.gameList.length < 2){
		retsel();
	} else {
		tobuydiv();
	}
}

//显示过关数
function showggdiv(){
	//showgg
	//<li class="on"><div class="listbtn">2串1</div></li>
	var v = "" ;
	if(index.gameList.length < 8){
		for (var i = 1; i < index.gameList.length; i++) {
			v += "<li name='"+(i+1)+"x1' mark='gg'><div class='listbtn'>"+(i+1)+"串1</div></li>" ;
		}
	} else {
		v += "<li name='2x1' mark='gg'><div class='listbtn'>2串1</div></li>" ;
		v += "<li name='3x1' mark='gg'><div class='listbtn'>3串1</div></li>" ;
		v += "<li name='4x1' mark='gg'><div class='listbtn'>4串1</div></li>" ;
		v += "<li name='5x1' mark='gg'><div class='listbtn'>5串1</div></li>" ;
		v += "<li name='6x1' mark='gg'><div class='listbtn'>6串1</div></li>" ;
		v += "<li name='7x1' mark='gg'><div class='listbtn'>7串1</div></li>" ;
		v += "<li name='8x1' mark='gg'><div class='listbtn'>8串1</div></li>" ;
	}
	$("#showgg").html(v) ;
	bindgg();
}


function selggs(){
	showggdiv();
	for(var v = 0 ; v < index.ggType.length ; v++){
		if(index.ggType[v] =="2串1"){
			$("li[name='2x1']").attr("class" , "on") ;
		} else if(index.ggType[v] =="3串1"){
			$("li[name='3x1']").attr("class" , "on") ;
		} else if(index.ggType[v] =="4串1"){
			$("li[name='4x1']").attr("class" , "on") ;
		} else if(index.ggType[v] =="5串1"){
			$("li[name='5x1']").attr("class" , "on") ;
		} else if(index.ggType[v] =="6串1"){
			$("li[name='6x1']").attr("class" , "on") ;
		} else if(index.ggType[v] =="7串1"){
			$("li[name='7x1']").attr("class" , "on") ;
		} else if(index.ggType[v] =="8串1"){
			$("li[name='8x1']").attr("class" , "on") ;
		}
	}
	$("#s-numbox").toggle();
	if($("#s-numbox").css("display")=="block"){
		$("#selectedgs").html("收起");
	} else {
		$("#selectedgs").html(index.ggType.join(","));
	}
	
}

//绑定过关事件
function bindgg(){
	$("li[mark='gg']").click(function(){
		var th = $(this) ;
		if(th.attr("class") == "on"){
			th.removeClass("on") ;
		} else {
			th.addClass("on") ;	
		}
		ggtypes();
	});
}

function ggtypes(){
	index.ggType=[] ;
	$("li[class='on']").each(function(){
		var th = $(this) ;
		if(th.attr("name") =="2x1"){
			index.ggType.push("2串1") ;
		} else if(th.attr("name") == "3x1") {
			index.ggType.push("3串1") ;
		} else if(th.attr("name") == "4x1") {
			index.ggType.push("4串1") ;
		} else if(th.attr("name") == "5x1") {
			index.ggType.push("5串1") ;
		} else if(th.attr("name") == "6x1") {
			index.ggType.push("6串1") ;
		} else if(th.attr("name") == "7x1") {
			index.ggType.push("7串1") ;
		} else if(th.attr("name") == "8x1") {
			index.ggType.push("8串1") ;
		}
		updatebs();
	}) ;
}


//修改倍数的js
function updatebs(){
	index.zs=index.getZhushu();
	index.bs=$("#bs").val()*1;
	var eachmaxjj=comm.predictMaxPrize(index.gameList);
	index.totalMoney=index.bs*index.zs*2;
	jcz.maxjj = Math.round(eachmaxjj*index.bs*100)/100 ;
	$("#szs").html(index.zs) ;
	$("#sbs").html(index.bs);
	$("#samt").html(index.totalMoney) ;
	$("#tojj").html(jcz.maxjj);
	//$("span[name='tojj']").html(sf.maxjj) ;
};


//确定购买
function confirmtobuy(){
	if($("#iagree").attr("class")=="i-check"){		
		$("#totouzhu").one("click",confirmtobuy) ;
		open_message("您需要同意“购彩协议”才能投注!");
		return ;
	}	
	
	if(!toCheckLogin()){
		$("#totouzhu").one("click",confirmtobuy) ;
		//保存数据
		toWriteTempData("22222", "333333");
		//登录
		toAuthLogin();
		return ;
	}
	
	if(index.ggType.length == 0){
		open_message("请选择过关方式");
		$("#totouzhu").one("click",confirmtobuy) ;
		return ;
	}
	if(index.gameList.length < 2){
		open_message("至少选择2场");
		$("#totouzhu").one("click",confirmtobuy) ;
		return ;
	}
	//判断是否有足够钱去买此对阵
	if(!hasEnoughMoney(jcz.playid,9,0)){
		return ;
	}
	var singlePlay = 0 ;
	  if(index.isDanYi){
		  singlePlay = 100 ;
	  }else{
		  singlePlay = 0 ;
	  }
	//var tokenValue = $("#token_name").val();
	//var tokenType = $("#token_type").val();
	var url="";
	url="/ipub/trade/invest!toMain.action";
	var ggName = index.ggType.join(",") ;
	var param={
		lotPlayType:jcz.playid,
		ggType:index.GuoGuanType,
		ggId:index.ggType,
		noteCount:index.zs,
		multiple:index.bs,
		numberContent:getBuyCode(),
		totalAmt:index.totalMoney,
		firstChangic:index.gameList[0].cnumber,
		lastChangic:index.gameList[index.gameList.length-1].cnumber,
		firstDate:index.gameList[0].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
		lastDate:index.gameList[index.gameList.length-1].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
		lotTypeCode:9,
		lotCode:9,
		ggName: ggName,
		singlePlay:singlePlay,
		buySource:10,  //购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
		//token_name:tokenValue,
		//token_type:tokenType
	};
	$.post(url,param,function(responseText){
		try{
			var json=eval('('+responseText+')');
			if(json&&json.flag==1){
				var returnMsg = eval("("+json.msg+")");
				var lot = returnMsg.lotId ;
				var projectId = returnMsg.betProjectId ;
				var investType = returnMsg.investType ;
				var paym = index.totalMoney ;
				var playId= returnMsg.playId ;
				window.location.href = "/mcpay/mc-pay!buyjcfinish.action?lotid="+lot+"&projectId="+projectId+"&totalAmt="+paym+"&investType="+investType+"&playId="+playId+"&jczmark=0" ;
				//window.location.href="/trade/index!toSuccess.action?lotTypeCode=9&lotPlayType=${playId}&betProjectId="+returnMsg.betProjectId+"&ggType="+returnMsg.ggType+"&e=${e}";
			}else{
				open_message(json.msg);
				$("#totouzhu").one("click",confirmtobuy) ;
			}
		}catch(err){
			open_message(err);
			$("#totouzhu").one("click",confirmtobuy) ;
		}
	},"text");
}

//验证金额是否足够
function hasEnoughMoney(playId,lotCode,jczmark) {
	var ret = false;
	$.ajax({
		type : 'post',
		url : "/trade/index!checkMoney.action?moneyTotal=" + index.totalMoney + "&t=" + new Date().getTime(),
		async : false,
		cache : false,
		dataType : "json",
		success : function(data) {
			if (data.flag == "2") {
				var obj =eval("(" +data.msg+ ")");
		   		$("#balance_id").html(obj.allMoney);
		   		$("#pay_amount_id").html(index.totalMoney);
		   		$("#difference_id").html(obj.returnCash_);
				$("#to_recharge_id").attr("onclick","doTempBuy("+playId+","+lotCode+","+jczmark+")");
		   		$("#chargeAlertlightbox").show();
			} else {
				ret = true;
			}
		}
	});
	return ret;
};

//购买号码
function getBuyCode(){
	var dancodes=[];
	var tuocodes=[];
	var playId = jcz.playid ;
	if(playId==9006 ||playId==10005){
		index.gameList.each(function(o,i){
			var ch = "" ;
			var v9005="" ;
			var v9001="" ;
			for(var c = 0 ; c < o.chks.length ; c++){
				var vale = o.chks[c].split("_") ;
				
				if(vale[0] == 9005){
					if(v9005!=""){
						v9005= v9005+"," ;
					}
					if(v9005==""){
						v9005=vale[0]+"@" ;
					}
					v9005= v9005 + vale[1] ;
				} else if(vale[0] == 9001){
					if(v9001!=""){
						v9001= v9001+"," ;
					}
					if(v9001==""){
						v9001=vale[0]+"@" ;
					}
					v9001= v9001 + vale[1] ;
				}
			}
			
			if(v9005=="" && v9001!=""){
				ch = v9001 ;
			} else if(v9005!="" && v9001==""){
				ch = v9005 ;
			} else if(v9005!="" && v9001!=""){
				ch = v9005+";"+v9001 ;
			}
				
			
			if(o.dan=="1"){
				dancodes.push(o.gdate+"|"+o.cnumber+"|"+ch);
			}else{
				tuocodes.push(o.gdate+"|"+o.cnumber+"|"+ch);
			}
		});
	}else{
		index.gameList.each(function(o,i){
			if(o.dan=="1"){
				var choose ="" ;
				for(var j = 0 ; j < o.chks.length ; j++){
					choose = choose + o.chks[j].split("_")[1] ;
					if(j < o.chks.length-1){
						choose=choose+"," ;
					}
				}
				dancodes.push(o.gdate+"|"+o.cnumber+"|"+choose);
			}else{
				var choose ="" ;
				for(var j = 0 ; j < o.chks.length ; j++){
					choose = choose + o.chks[j].split("_")[1] ;
					if(j < o.chks.length-1){
						choose=choose+"," ;
					}
				}
				tuocodes.push(o.gdate+"|"+o.cnumber+"|"+choose);
			}
		});
	}
	if(dancodes.length>0)
		return dancodes.join("/")+"#"+tuocodes.join("/");
	else
		return tuocodes.join("/");
};