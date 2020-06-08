var url = "/data/trade/jcl/jcl_002.json" ; //获取对阵

var match = {} ;
$(document).ready(function(){
	getJsonDataAndSetToVar();
}) ;

//格式化时间
function formatdates(str) {
	var times={} ;
	var st ; 
	//全数字
	 if(/^\d+$/.test(str) && isNaN(str)){
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
var matchDatas = new Array();
function showmatch(data){
	if(data == null){
		return ;
	}
	if(data.length < 1){
		$(".g-ball_box").html('<div class="gray mt_100 i-txtcen">暂无赛事信息，您可投注其它彩种</div>') ;
	} else {
		var vshow = "" ;
		matchDatas = data;//将值设置为全局变量
		for (var cs = 0; cs < data.length; cs++) {
			var tim = data[cs][0][0][5] ;
			var tm = formatdates(tim) ;
			vshow +="<div class='game_group plr_16'>"+tm.year+":"+tm.month+":"+tm.date+"&nbsp;"+tm.day+" "+data[cs].length+"场比赛可投 <i class='i-arrowD ui-trans'></i></div>" ;
			vshow +=showcc(data[cs] , cs) ;
		}
		$("#showmt").html(vshow) ;
		
		//判断选号点击事件
		/*$(".matinfo_boxi").click(function() {
			
			if($(this).attr("class")=="matinfo_boxi"){
				$(this).attr("class", "matinfo_boxi on");
			}else{
				$(this).attr("class", "matinfo_boxi");
			}
			
			//选号统计
			comm.chooseNumber($(this).parent(),$(this));
			
			//显示选中场数
			$("#selected_match_num").html("已选择"+index.gameList.length+"场");
		});*/
	}
}

//获取选中的对阵信息
function getMatchByCcid(ccid){
	var gameList = index.gameList ;
	
	for(var i = 0 ; i < gameList.length ; i++){
		if(gameList[i].cid == ccid){
			return gameList[i];
		}
	}
	
	return null;
}

//判断对信息中该玩法是否被选中
function isPlayChecked(ccid,cvalue){
	var match = getMatchByCcid(ccid);//获取选择的对阵信息
	if(match != null){
		var chks = match.chks ;
	    for(var j = 0 ; j < chks.length ; j++){
	    	
	    	if(cvalue == chks[j]){
	    		return "checked";
	    	}
	    	
	    }
	}
	
	return "";
	
}

function showcc(base , n){
	
	var va = "" ;
	va +="<ul class='game_ul'>" ;
	for (var c = 0; c < base.length; c++) {
		va +=showspf(base[c]) ;
	}
	va +="</ul>" ;
	return va ;
}

//显示对阵基本信息
function showspf(base){
	//[[ccId , ccNumber , leagueName , homeName , guestName , stopDate ][oddsSpfg][oddsRqspfg , ggConcede]]
	var spv = base[0][8] ;
	var rq = base[1][1] ;
	var sp = spv.split(",") ;
	var tm = formatdates(base[0][5]) ;
	
	var ccid = base[0][0] ;
	var ccNumber = base[0][1] ;
	var leagueName = base[0][2] ;
	var homeName = base[0][3] ;
	var guestName = base[0][4] ;
	var gdate = base[0][6];
	var gyushe = base[0][7];
	var sfOdds = base[0][8];
	var gendtime = base[0][5] ;
	var suff = tm.year.toString()+tm.month.toString()+tm.date.toString()+ccNumber+"" ;
	
	va = "" ;
	va +="<li class='game_item'>" ;
	va +="<div class='sum d-box'>" ;
	va +="<div class='gameinfo'>" ;
	va +="<div class='l'>常规赛</div>" ;
	va +="<div class='t'>"+tm.hour+":"+tm.date+"截止</div>" ;
	va +="</div>" ;
	va +="<div class='b-flex'>" ;
	va +="<div class='teams d-box'>" ;
	va +="<div class='home b-flex'>"+guestName+"<span class='"+(rq>0?"red rf":"green rf")+"'>("+(rq>0?"+"+rq:rq)+")</span></div>" ;
	va +="<div class='vs'>VS</div>" ;
	va +="<div class='away b-flex'>"+homeName+"</div>" ;
	va +="</div>" ;
	va +="<div class='jctz d-box'rq="+rq+" paid='10001' gtype='' gyushe="+gyushe+"  ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">" ;
	va +="<label class='b-flex'><input type='checkbox' onclick='sfClick(this)' "+isPlayChecked(ccid,'10001_1')+" class='hide3' pl='"+sp[1]+"' cvalue='10001_1' pval='1'><i class='tzb js-touch'>客胜"+sp[1]+"</i></label>" ;
	va +="<label class='b-flex'><input type='checkbox' onclick='sfClick(this)' "+isPlayChecked(ccid,'10001_2')+" class='hide3' pl='"+sp[0]+"' cvalue='10001_2' pval='2'><i class='tzb js-touch'>主胜 "+sp[0]+"</i></label>" ;
	va +="</div>" ;
	va +="</div>" ;
	va +="</div>" ;
	va +="</li>" ;
	
	
/*	va +="<li class='b-flex' rq="+rq+" paid='10002' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">" ;
	va +="<div class='matinfo_ltxt'>" ;
	va +="<span class='site'>" ;
	va +="<em>"+leagueName+"</em><br />" ;
	va +="<em>"+tm.hour+":"+tm.date+"截止</em>" ;
	va +="</span>" ;
	va +="</div>";
	
	va +="<div class='"+(isPlayChecked(ccid,'10002_1')==true?"matinfo_boxi on":"matinfo_boxi")+"' pl='"+sp[1]+"' cvalue='10002_1' pval='1'>" ;
	va +="<span class='pitch'>" ;
	va +="<em class='"+(guestName.length>5?"f12 fon":"f12")+"'>"+guestName+"</em>" ;
	va +="<p>客胜"+sp[1]+" </p>" ;
	va +="</span>" ;
	va +="</div>" ;
	
	va +="<div class='"+(isPlayChecked(ccid,'10002_2')==true?"matinfo_boxi on":"matinfo_boxi")+"' pl='"+sp[0]+"' cvalue='10002_2' pval='2'>" ;
	va +="<span class='pitch'>" ;
	va +="<em class='"+(homeName.length>5?"f12 fon":"f12")+"'>"+homeName+"<i class="+(rq>0?"red fz_12":"green fz_12")+">("+(rq>0?"+"+rq:rq)+")</i></em>" ;
	va +="<p>主胜"+sp[0]+" </p>" ;
	va +="</span>" ;
	va +="</div>" ;
	va +="</li>" ;*/
	
	return va ;
}

function sfClick(obj){
	//选号统计
	comm.chooseNumber($(obj).parent().parent(),$(obj),obj);
	

	if(index.gameList.length >= 2){
		$('.m-submit_box').removeClass("disabled");
		
		//显示选中场数
		$("#selected_num_id").html("已选"+index.gameList.length+"场比赛");
	}else{
		$('.m-submit_box').addClass("disabled");
		$("#selected_num_id").html("请至少选择2场比赛");
	}
	
}

//判断对信息中该玩法是否被选中
function isPlayChecked(ccid,cvalue){
	var match = getMatchByCcid(ccid);//获取选择的对阵信息
	if(match != null){
		var chks = match.chks ;
	    for(var j = 0 ; j < chks.length ; j++){
	    	
	    	if(cvalue == chks[j]){
	    		return "checked";
	    	}
	    	
	    }
	}
	
	return "";
	
}

/**
 * 通过ajax同步方式取得后台json格式的数据
 */
function getJsonDataAndSetToVar() {
	var returnData = null;
	url = ajaxToData(10);
	$.ajax({
		type:"POST",
		url:url,
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
comm.chooseNumber = function(obj, objtd,cheObj) {
	// 得到玩法id
	var paid = $(obj).attr("paid");
	// /得到选中cid
	var cid = $(obj).attr("ccid");
	var k = -1;// 被选的对象判断是否存在
	for ( var i = 0, j = index.gameList.length; i < j; i++) {
		if (index.gameList[i].cid == cid) {
			k = i;
		}
	}
	if (k != -1) {
		comm.chooseNumberIsSelected(paid, objtd, k,cheObj);
	} else {
		var singleInfo = {
			choose : (function(self) {
				var d = -1;
				switch (paid * 1) {
				case 10001:d = 0;break;
				case 10002:d = 1;break;
				case 10003:d = 2;break;
				case 10004:d = 3;break;
				}
				var ret = [ {10001 : ""}, {10002 : ""}, {10003 : ""}, {10004 : ""}];
				if (cheObj.checked == true) {
					ret[d][paid] = $(self).attr("pval");
				}
				return ret;
			}(objtd)),
			suffix : obj.attr('suff'),// 用来排序的下标 标示
			cid : obj.attr('ccid'), // 赛事ID
			cnumber : obj.attr('ccNumber'), // 完整编号 1001
			cname : comm.getMatchName(obj.attr('ccNumber')), // 周一001
			gname : obj.attr('leagueName'), // 完整名称
			gtype : obj.attr('gtype'), // 赛事类型
			gdate : obj.attr('gdate'), // 完整日期
			hometeam : obj.attr('homeName'), // 主队
			guestteam : obj.attr('guestName'), // 客队
			rq : obj.attr('rq'), // 让球
			gendtime : obj.attr('gendtime'), // 截止时间
			ysf:obj.attr("gyushe"),//预设总分
			dan : "0", // 1为胆
			chks : (function(chks) {
				var ret = [];
				if (cheObj.checked == true) {
					ret.push($.trim($(chks).attr("cvalue")));
				}
				return ret;
			})(objtd),
			selectedSP : (function(chks) {
				var ret = [];
				if (cheObj.checked == true) {
					var _sp = "";
					_sp = $(chks).attr("pl");
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
};

//对选中的号码进行处理
comm.chooseNumberIsSelected = function(paid, objtd, k,cheObj) {
	var d = -1;
	switch (paid * 1) {
	case 10001:d = 0;break;
	case 10002:d = 1;break;
	case 10003:d = 2;break;
	case 10004:d = 3;break;
	}
	// index.gameList[k].choose[d][paid]=function(self){
	if (d != -1) {
		// 给选中的框赋值
		var iii = -1;
		if (cheObj.checked == true)
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
		if (cheObj.checked == true)
			index.gameList[k].selectedSP.push($(objtd).attr("pl"));
		else {
			index.gameList[k].selectedSP.splice(iii, 1);
		}
		index.gameList[k].minSP = Math.min.apply(Math,
				index.gameList[k].selectedSP) || 1; // 最小赔率
		index.gameList[k].maxSP = Math.max.apply(Math,
				index.gameList[k].selectedSP) || 1; // 最大赔率
		var chos = [];
		if (index.gameList[k].choose[d][paid] == "") {
			if (cheObj.checked == true)
				chos.push($(objtd).attr("pval"));
		} else {
			chos = index.gameList[k].choose[d][paid].split(",");
			if (cheObj.checked == true)
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
};