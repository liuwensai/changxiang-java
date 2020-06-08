var jsonurl = "/ipub/trade/issue!toIssueOrMatch.action?lotCode=9" ; //获取对阵


var jcz ={} ;
jcz.playid = 9005 ;
jcz.maxjj = 0 ;
jcz.gg=[] ;
var match = [] ;
var onex , oney;
var twox , twoy ;
var x , y ;

jcz.amt = 2 ;

var oneindex , twoindex ;

var onecc , twocc;

$(document).ready(function(){
	getJsonDataAndSetToVar();
	var v = "2串1" ;
	index.ggType.push(v) ;
	index.GuoGuanType=2;
	index.bs = 1 ;

	/*$("#onediv").mouseup(function(e){
		 var newXPos = e.pageX;
		  //向左滑动5个像素
		  if (onex - newXPos >= 5) {
			  open_message("prev");
		  }
		   if (newXPos - onex >= 5) {
			   open_message("next");
		   }
	}).mousedown(function(e){
		onex = e.pageX;
	});
	*/
	
	/*
	$("#oneleft").click(function(){
		oneindex = oneindex -1  ;
		if(twoindex == oneindex){
			oneindex = oneindex - 1 ;
		}
		if(oneindex < 1){
			oneindex = 0 ;
			if(twoindex == 0){
				oneindex = 1 ;
			}
			$("#oneleft").attr("class","marjtleft fold tap") ;
			changeonediv(match[oneindex]) ;
		} else {
			$("#oneleft").attr("class","marjtleft fold") ;
			changeonediv(match[oneindex]) ;
		}
		$("#oneright").attr("class","marjtright fold") ;
		$("div[mk='one']").attr("class" , "butbox") ;
		addData();
	}) ;
	
	$("#oneright").click(function(){
		oneindex = oneindex +1  ;
		if(twoindex == oneindex){
			oneindex = oneindex + 1 ;
			
		}
		if(oneindex >= match.length){
			oneindex = match.length -1  ;
			if(twoindex == match.length-1){
				oneindex = match.length - 2 ;
			}
			$("#oneright").attr("class","marjtright fold tap") ;
			changeonediv(match[oneindex]) ;
		} else {
			$("#oneright").attr("class","marjtright fold") ;
			changeonediv(match[oneindex]) ;
		}
		$("#oneleft").attr("class","marjtleft fold") ;
		$("div[mk='one']").attr("class" , "butbox") ;
		addData();
	}) ;
	
	
	
	$("#twoleft").click(function(){
		twoindex = twoindex -1  ;
		if(twoindex == oneindex){
			twoindex = twoindex - 1 ;
		}
		if(twoindex < 1){
			twoindex = 0 ;
			if(oneindex == 0){
				twoindex = 1 ;
			}
			$("#twoleft").attr("class","marjtleft fold tap") ;
			changetwodiv(match[twoindex]) ;
		} else {
			$("#twoleft").attr("class","marjtleft fold") ;
			changetwodiv(match[twoindex]) ;
		}
		$("#tworight").attr("class","marjtright fold") ;
		$("div[mk='two']").attr("class" , "butbox") ;
		addData();
	}) ;
	
	$("#tworight").click(function(){
		twoindex = twoindex +1  ;
		if(twoindex == oneindex){
			twoindex = twoindex + 1 ;
			
		}
		if(twoindex >= match.length){
			twoindex = match.length -1  ;
			if(oneindex == match.length-1){
				twoindex = match.length - 2 ;
			}
			$("#tworight").attr("class","marjtright fold tap") ;
			changetwodiv(match[twoindex]) ;
		} else {
			$("#tworight").attr("class","marjtright fold") ;
			changetwodiv(match[twoindex]) ;
		}
		$("#twoleft").attr("class","marjtleft fold") ;
		$("div[mk='two']").attr("class" , "butbox") ;
		addData();
	}) ;
	*/
	
	$("div[name='selbs']").click(function(){
		var thisp = $(this) ;
		index.bs = thisp.attr("va") ;
		updata() ;
		showbs();
	});
	//立即投注
	$("#selbtn").one("click",toDoBuy);	
}) ;

/*
//第一场 向左
function oneleft(){
	oneindex = oneindex -1  ;
	if(twoindex == oneindex){
		oneindex = oneindex - 1 ;
	}
	if(oneindex < 1){
		oneindex = 0 ;
		if(twoindex == 0){
			oneindex = 1 ;
		}
		$("#oneleft").attr("class","marjtleft fold tap") ;
		changeonediv(match[oneindex]) ;
	} else {
		//$("#onediv").animate({left:"100px"});
		$("#oneleft").attr("class","marjtleft fold") ;
		changeonediv(match[oneindex]) ;
	}
	$("#oneright").attr("class","marjtright fold") ;
	$("div[mk='one']").attr("class" , "butbox") ;
	addData();
	
}

//第一场向右
function oneright(){
	oneindex = oneindex +1  ;
	if(twoindex == oneindex){
		oneindex = oneindex + 1 ;
	}
	if(oneindex >= match.length){
		oneindex = match.length -1  ;
		if(twoindex == match.length-1){
			oneindex = match.length - 2 ;
		}
		$("#oneright").attr("class","marjtright fold tap") ;
		changeonediv(match[oneindex]) ;
	} else {
		$("#oneright").attr("class","marjtright fold") ;
		changeonediv(match[oneindex]) ;
	}
	$("#oneleft").attr("class","marjtleft fold") ;
	$("div[mk='one']").attr("class" , "butbox") ;
	addData();
}

//第二场向左
function twoleft(){
	twoindex = twoindex -1  ;
	if(twoindex == oneindex){
		twoindex = twoindex - 1 ;
	}
	if(twoindex < 1){
		twoindex = 0 ;
		if(oneindex == 0){
			twoindex = 1 ;
		}
		$("#twoleft").attr("class","marjtleft fold tap") ;
		changetwodiv(match[twoindex]) ;
	} else {
		$("#twoleft").attr("class","marjtleft fold") ;
		changetwodiv(match[twoindex]) ;
	}
	$("#tworight").attr("class","marjtright fold") ;
	$("div[mk='two']").attr("class" , "butbox") ;
	addData();
}

//第二场向右
function tworight(){
	twoindex = twoindex +1  ;
	if(twoindex == oneindex){
		twoindex = twoindex + 1 ;
		
	}
	if(twoindex >= match.length){
		twoindex = match.length -1  ;
		if(oneindex == match.length-1){
			twoindex = match.length - 2 ;
		}
		$("#tworight").attr("class","marjtright fold tap") ;
		changetwodiv(match[twoindex]) ;
	} else {
		$("#tworight").attr("class","marjtright fold") ;
		changetwodiv(match[twoindex]) ;
	}
	$("#twoleft").attr("class","marjtleft fold") ;
	$("div[mk='two']").attr("class" , "butbox") ;
	addData();
}

*/
function showbs(){
	$("#showselbs").toggle();
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
	match = [] ;
	if(data.length < 1){
		$(".g-ball_box").html('<div class="gray mt_100 i-txtcen">暂无赛事信息，您可投注其它彩种</div>') ;
	} else {
		var ohtm = "" ;
		var thtm = "" ;
		for (var cs = 0; cs < data.length; cs++) {
			if(cs == 0){
				continue ;
			}			
			var valu = showcc(data[cs] , cs) ;
			if(valu.ohtm != null && valu.ohtm != ""){
				ohtm = ohtm + valu.ohtm ;
				thtm = thtm + valu.thtm ;
			}
		}
		
		if(ohtm == "" && thtm == ""){
			
		} else {			
			$("#oneshow").html(ohtm) ;
			$("#twoshow").html(thtm) ;
			addscroll();
			if(sumcc < 1){
				$("#twoshow").hide();
			} else {
				mytwoSwiper.swipeNext();
			}
			
		}
	}
	bindselMatch();
}

//绑定选号点击事件
function bindselMatch(){
	$("div[name='selmts']").click(function(){
		var va = $(this) ;
		va.toggleClass("on") ;
		addData(va.parent() , va) ;
	});
	$("div[name='selmtp']").click(function(){
		var va = $(this) ;
		va.toggleClass("on") ;
		addData(va.parent() , va) ;
	});
	$("div[name='selmtf']").click(function(){
		var va = $(this) ;
		va.toggleClass("on") ;
		addData(va.parent() , va) ;
	});
}

//添加选择数据
function addData(thisp , thisv){
	//index.gameList=[];
	/*
	if($("div[mk='one'][class='butbox on']").length > 0){
		chooseNumber(match[oneindex] , "onediv");
	}
	if($("div[mk='two'][class='butbox on']").length > 0){
		chooseNumber(match[twoindex] , "twodiv");
	}
	*/
	
	chooseNumber(thisp , thisv);
	
	updata() ;
	if(index.gameList.length > 1){
		$("#selbtn").html("立即支付");
	} else{
		$("#selbtn").html("至少选择2场比赛");
	}
}


//修改倍数的js
function updata(){
	index.zs=index.getZhushu();
	//index.bs=$("#bs").val()*1;
	var eachmaxjj=comm.predictMaxPrize(index.gameList);
	index.totalMoney=index.bs*index.zs*2;
	jcz.maxjj = Math.round(eachmaxjj*index.bs*100)/100 ;
	$("#selzs").html(index.zs) ;
	$("#selbs").html(index.bs);
	$("#selamt").html(index.totalMoney) ;
	$("#seljj").html(jcz.maxjj);
	$("#seledamt").html(index.bs) ;
	//$("span[name='tojj']").html(sf.maxjj) ;
};

function showcc(base , n){
	var valu = {} ;
	 valu.ohtm = "" ;
	 valu.thtm = "" ;
	for (var c = 0; c < base.length; c++) {
		var ow = showspf(base[c] , c) ;
		if(ow != "" && ow != null){
			valu.ohtm = valu.ohtm + ow.htm ;
			valu.thtm = valu.thtm + ow.whtm ;
			sumcc = sumcc + 1 ;
		}
	}
	return valu ;
}

//第一场对阵改变
function changeonediv(one){
	if(one != null){
		var tm = formatdates(one.gendtime) ;
		$("#oneheadinfo").html(one.leagueName+"&nbsp;"+tm.day+"&nbsp;"+tm.hour+":"+tm.minute+"截止") ;
		$("#onebodyhome").html(one.homeName);
		var sp = one.sp.split(",");
		$("#ones").html("主胜"+sp[0]);
		$("#onep").html("平 "+sp[1]) ;
		$("#onebodyguest").html(one.guestName);
		$("#onef").html(sp[2]);
	}
}

//第二场对阵改变
function changetwodiv(two){
	if(two != null){
		var tm = formatdates(two.gendtime) ;
		$("#twoheadinfo").html(two.leagueName+"&nbsp;"+tm.day+"&nbsp;"+tm.hour+":"+tm.minute+"截止") ;
		$("#twobodyhome").html(two.homeName);
		var sp = two.sp.split(",");
		$("#twos").html("主胜"+sp[0]);
		$("#twop").html("平 "+sp[1]) ;
		$("#twobodyguest").html(two.guestName);
		$("#twof").html(sp[2]);
	}
}


//显示对阵基本信息
function showspf(base , nindex){
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
	
	var param={
			sp:spv,
			cid:ccid,
			cnumber:ccNumber,
			leagueName:leagueName,
			homeName:homeName,
			guestName:guestName,
			suff:suff,
			gendtime:gendtime,
			gdate:gdate
	} ;
	
	var values = {} ;
	values.htm = "" ;
	values.whtm = "" ;
	
	if(sp[0] == 0 || sp[1] == 0 || sp[2] == 0){
		
	} else {
		//sp='+sp[2]+' pval="0" cvalue="9005_0"
		
		
		values.htm +="<div class='swiper-slide'>" ;
		
		values.htm +='<div class="marcontitle">' ;
		//values.htm +='<span class="marjtleft fold"><div class="icn-jtdw"></div></span>' ;
		values.htm +='<span>'+leagueName+'&nbsp;'+tm.day+'&nbsp;'+tm.hour+':'+tm.minute+'截止</span>';
		//values.htm +='<span class="marjtright fold"><div class="icn-jtdw"></div></span>' ;
		values.htm +='</div>' ;
		
		values.htm +='<div class="marcon" name="onediv" gdate ="'+gdate+'" gendtime="'+gendtime+'" ccid="'+ccid+'" ccNumber="'+ccNumber+'" leagueName="'+leagueName+'" homeName="'+homeName+'" guestName="'+guestName+'" suff="'+suff+'" pid="9005" win='+sp[0]+' draw='+sp[1]+' lost='+sp[2]+' spv='+spv+'>' ;
		
		values.htm +='<div class="butbox" name="selmts" mk = "one" sp='+sp[0]+' pval="3" cvalue="9005_3">' ;
		values.htm +='<span>'+homeName+'</span>' ;
		values.htm +='<em>主胜'+sp[0]+'</em>' ;
		values.htm +='</div>' ;
		
		values.htm +='<div class="butbox" name="selmtp" mk = "one" sp='+sp[1]+' pval="1" cvalue="9005_1">' ;
		values.htm +='<span>vs</span>' ;
		values.htm +='<em>平'+sp[1]+'</em>' ;
		values.htm +='</div>' ;
		
		values.htm +='<div class="butbox" name="selmtf" mk = "one" sp='+sp[2]+' pval="0" cvalue="9005_0">' ;
		values.htm +='<span>'+guestName+'</span>' ;
		values.htm +='<em>客胜'+sp[2]+'</em>' ;
		values.htm +='</div>' ;
		
		values.htm +='</div>' ;
		
		values.htm +="</div>" ;
		
		
		values.whtm +="<div class='swiper-slide'>" ;
		
		
		values.whtm +='<div class="marcontitle">' ;
		//values.whtm +='<span class="marjtleft fold"><div class="icn-jtdw"></div></span>' ;
		values.whtm +='<span>'+leagueName+'&nbsp;'+tm.day+'&nbsp;'+tm.hour+':'+tm.minute+'截止</span>';
		//values.whtm +='<span class="marjtright fold"><div class="icn-jtdw"></div></span>' ;
		values.whtm +='</div>' ;
		
		
		values.whtm +='<div class="marcon" name="twodiv" gdate ="'+gdate+'" gendtime="'+gendtime+'" ccid="'+ccid+'" ccNumber="'+ccNumber+'" leagueName="'+leagueName+'" homeName="'+homeName+'" guestName="'+guestName+'" suff="'+suff+'" pid="9005" win='+sp[0]+' draw='+sp[1]+' lost='+sp[2]+' spv='+spv+'>' ;
		
		values.whtm +='<div class="butbox" name="selmts" mk = "two" sp='+sp[0]+' pval="3" cvalue="9005_3">' ;
		values.whtm +='<span>'+homeName+'</span>' ;
		values.whtm +='<em>主胜'+sp[0]+'</em>' ;
		values.whtm +='</div>' ;
		
		values.whtm +='<div class="butbox" name="selmtp" mk = "two" sp='+sp[1]+' pval="1" cvalue="9005_1">' ;
		values.whtm +='<span>vs</span>' ;
		values.whtm +='<em>平'+sp[1]+'</em>' ;
		values.whtm +='</div>' ;
		
		values.whtm +='<div class="butbox" name="selmtf" mk = "two" sp='+sp[2]+' pval="0" cvalue="9005_0">' ;
		values.whtm +='<span>'+guestName+'</span>' ;
		values.whtm +='<em>客胜'+sp[2]+'</em>' ;
		values.whtm +='</div>' ;
		
		values.whtm +='</div>' ;
		
		values.whtm +="</div>" ;	
		
		match.push(param) ;
	}
	return values ;
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
			if(returnData != null)
				showmatch(returnData);
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
	
	var nam = $(obj).attr("name") ;
	if(nam == "onediv"){
		onecc = cid ;
	} else if(nam == "twodiv"){
		twocc = cid ;
	}
	
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
				if ($(self).attr("class") == "butbox on") {
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
				if ($(chks).attr("class") == "butbox on") {
					ret.push($.trim($(chks).attr("cvalue")));
				}
				return ret;
			})(objtd),
			selectedSP : (function(chks) {
				var ret = [];
				if ($(chks).attr("class") == "butbox on") {
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
	
	updata() ;
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
		if ($(objtd).attr("class") == "butbox on")
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
		if ($(objtd).attr("class") == "butbox on")
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
			if ($(objtd).attr("class") == "butbox on")
				chos.push($(objtd).attr("pval"));
		} else {
			chos = index.gameList[k].choose[d][paid].split(",");
			if ($(objtd).attr("class") == "butbox on")
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
	
	updata() ;
};


function retsel(){
	$("#buy").hide();
	$("#sel").show();
	
	baksel();
}

function toDoBuy(){
	confirmtobuy();
	$("#selbtn").one("click" , toDoBuy);
}
//确定购买
function confirmtobuy(){
	if(index.ggType.length == 0){		
		open_message("请选择过关方式");
		return ;
	}
	if(index.gameList.length < 2){		
		open_message("至少选择2场");
		return ;
	}
	
	if(!toCheckLogin()){		
		//保存数据
		toWriteTempData("22222", "333333");
		//登录
		toAuthLogin();
		return ;
	}
	//判断是否有足够钱去买此对阵
	if(!hasEnoughMoney(jcz.playid,9,	1)){
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
				window.location.href = "/mcpay/mc-pay!buyjcfinish.action?lotid="+lot+"&projectId="+projectId+"&totalAmt="+paym+"&investType="+investType+"&playId="+playId+"&jczmark=1" ;
			}else{
				open_message(json.msg);				
			}
		}catch(err){
			open_message(err);
			
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