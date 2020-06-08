var url = "/data/trade/jcl/jcl_003.json" ; //获取对阵

var match = {} ;
$(document).ready(function(){
	getJsonDataAndSetToVar();
}) ;


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
var matchDatas = new Array();
//显示对阵
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
			if(cs == 0){
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
	}
	
	//判断登陆前是否存在购买号码
	var number_content = toReadTempData("hhtz_number_content");
	var jcl_play_id = toReadTempData("jcl_play_id");
	if(number_content != null && number_content != ""){
		toWriteTempData("hhtz_number_content",null);
		showBuyNumber(number_content,jcl_play_id);
		//toWriteTempData("dlt_play_id",null);
	}
}

function showcc(base , n){
	
	var va = "" ;
	for (var c = 0; c < base.length; c++) {
		va +="<ul class='j-ht'>" ;
		va +=showspf(base[c],c,n) ;
		va +="</ul>" ;
	}
	return va ;
}

//显示对阵基本信息
function showspf(base,c,n){
	//[[ccId , ccNumber , leagueName , homeName , guestName , stopDate ][oddsSpfg][oddsRqspfg , ggConcede]]
	var aa = base;
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
	va +="<li class='b-flex' rq="+rq+" paid='10002' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">" ;
	
	va +="<div class='j-ht_list'>" ;
	
	va +="<div class='j-lq_htlistleft'>" ;
	va +="<span class='txtpt'>" ;
	va +="<em>"+leagueName+"</em><br />" ;
	va +="<em>"+tm.hour+":"+tm.date+"截止</em>" ;
	va +="</span>" ;
	va +="</div>";
	
	va +="<div class='j-htlistright'>" ;
	va +="<div class='b-flex listboxr'>";
	va +="<div class='listboxcon_lq'>";
	va +="<em class='team_left'>"+guestName+"</em>" ;
	va +="<em class='team_center'>VS</em>" ;
	va +="<em class='team_right'>"+homeName+"</em>" ;
	va +="</div>" ;
	va +="<div class='listboxnum_lq'>" ;
	va +="<div class='btn_listboxlq' onclick='showMatchChild(\"s-lqsel\","+c+","+n+")'  id='match_child_id_"+ccid+"'>展开选项</div>" ;
	va +="</div>" ;
	va +="</div>" ;
	va +="</div>" ;
	
	va +="</div>" ;
	va +="</li>" ;
	
	return va ;
}

//获取对阵信息
function getMatchData(c,n){
	return matchDatas[n][c];
}

//获取对阵展开选项中的数据
function showMatchChild(str,c,n){
	toggle(str);
	var base = getMatchData(c,n);
	
	var sfv = base[1][0] ;
	var sf = sfv.split(",") ;
	
	var rfsfv = base[2][0] ;
	var rfsf = rfsfv.split(",") ;
	
	var dxfv = base[3][0] ;
	var dxf = dxfv.split(",") ;
	
	var sfcv = base[4][0] ;
	var sfc = sfcv.split(",") ;

	var ccid = base[0][0] ;
	var ccNumber = base[0][1] ;
	var leagueName = base[0][2] ;
	var homeName = base[0][3] ;
	var guestName = base[0][4] ;
	var gdate = base[0][6];
	var gyushe = base[0][7];
	var sfOdds = base[0][8];
	var gendtime = base[0][5] ;
	var rq = base[1][1] ;
	var tm = formatdates(base[0][5]) ;
	var suff = tm.year.toString()+tm.month.toString()+tm.date.toString()+ccNumber+"" ;
    
	$("#b_jlboxlist_id").empty();
	
	var val = "";
	val +="<div class='b_jlbox'>";
	val +="<ul class='b_jlboxlist'>";
	val +="<li class='b-flex'>";
	val +="<div class='boxlist_ltxt sp_ta'>胜负</div>";
	val +="<div class='boxlist_right'>";
	val +="<div class='boxlist_full'>";
	val +="<em class='tameleft'>"+guestName+"</em>";
	val +="<em class='tamecen'>VS</em>";
	val +="<em class='tameright'>"+homeName+"</em>";
	val +="</div>";
	val +="<div class='b-boxfullSet'>";
	val +="<div class='d-box'  rq="+rq+" paid='10001' gtype='' gyushe="+gyushe+"  ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val +="<a href='javascript:;'  onclick='sfClick(this)'  class='"+(isPlayChecked(ccid,'10001_1')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"' cvalue='10001_1' pval='1' pl="+sf[1]+">客胜"+sf[1]+"</a>";
	val +="<a href='javascript:;'  onclick='sfClick(this)' class='"+(isPlayChecked(ccid,'10001_2')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"' cvalue='10001_2' pval='2' pl="+sf[0]+">主胜"+sf[0]+"</a>";
	val +="</div>";
	val +="</div>";
	val +="</div>";
	val +="</li>";
	
	val +="<li class='b-flex'  >";
	val +="<div class='boxlist_ltxt sp_tb'>让分</div>";
	val +="<div class='boxlist_right'>";
	val +="<div class='boxlist_full'>";
	val +="<em class='tameleft'>"+guestName+"<em class='"+(rq>0?"red fz_12":"green fz_12")+"'>("+(rq>0?"+"+rq:rq)+")</em></em>";
	val +="<em class='tamecen'>VS</em>";
	val +="<em class='tameright'>"+homeName+"</em>";
	val +="</div>";
	val +="<div class='b-boxfullSet'>";
	val +="<div class='d-box'  rq="+rq+" paid='10002' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val +="<a href='javascript:;' onclick='sfClick(this)'  cvalue='10002_1' pval='1' pl="+rfsf[1]+" class='"+(isPlayChecked(ccid,'10002_1')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>客胜"+rfsf[1]+"</a>";
	val +="<a href='javascript:;' onclick='sfClick(this)'  cvalue='10002_2' pval='2' pl="+rfsf[0]+" class='"+(isPlayChecked(ccid,'10002_2')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>主胜"+rfsf[0]+"</a>";
	val +="</div>";
	val +="</div>";
	val +="</div>";
	val +="</li>";
	
	val +="<li class='b-flex'>";
	val +="<div class='boxlist_ltxt sp_tc'>大小分</div>";
	val +="<div class='boxlist_right'>";
	val +="<div class='boxlist_full'>";
	val +="总分"+gyushe;
	val +="</div>";
	val +="<div class='b-boxfullSet'>";
	val +="<div class='d-box' rq="+rq+" paid='10004' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10004_1' pval='1' pl="+dxf[1]+" class='"+(isPlayChecked(ccid,'10004_1')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>大分"+dxf[1]+"</a>";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10004_2' pval='2' pl="+dxf[0]+" class='"+(isPlayChecked(ccid,'10004_2')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>小分"+dxf[0]+"</a>";
	val +="</div>";
	val +="</div>";
	val +="</div>";
	val +="</li>";
	
	
	val +="<li class='b-flex'>";
	val +="<div class='boxlist_ltxt sp_td'>胜分差</div>";
	val +="<div class='boxlist_right'>";
	val +="<div class='b-boxsfc'>";
	val +="<div class='boxlist_full'>"+guestName+"胜</div>";
	val +="<div class='b-boxfullSet'>";
	val +="<div class='d-box'  rq="+rq+" paid='10003' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_01' pval='01' pl="+sfc[0]+" class='"+(isPlayChecked(ccid,'10003_01')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>1-5分</a>";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_02' pval='02' pl="+sfc[1]+" class='"+(isPlayChecked(ccid,'10003_02')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>6-10分</a>";
	val +="</div>";
	val +="</div>";
	val +="<div class='b-boxfullSet'>";
	val +="<div class='d-box'  rq="+rq+" paid='10003' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_03' pval='03' pl="+sfc[2]+"  class='"+(isPlayChecked(ccid,'10003_03')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>11-15分</a>";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_04' pval='04' pl="+sfc[3]+" class='"+(isPlayChecked(ccid,'10003_04')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>16-20分</a>";
	val +="</div>";
	val +="</div>";
	val +="<div class='b-boxfullSet'>";
	val +="<div class='d-box' rq="+rq+" paid='10003' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_05' pval='05' pl="+sfc[4]+" class='"+(isPlayChecked(ccid,'10003_05')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>21-25分</a>";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_06' pval='06' pl="+sfc[5]+" class='"+(isPlayChecked(ccid,'10003_06')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>&gt;26分</a>";
	val +="</div>";
	val +="</div>";
	val +="</div>";
    val +="<div class='b-boxsfc right'>";
	val +="<div class='boxlist_full'>"+homeName+"胜</div>";
	val +="<div class='b-boxfullSet'>";
	val +="<div class='d-box'  rq="+rq+" paid='10003' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_11' pval='11' pl="+sfc[6]+"  class='"+(isPlayChecked(ccid,'10003_11')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>1-5分</a>";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_12' pval='12' pl="+sfc[7]+"  class='"+(isPlayChecked(ccid,'10003_12')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>6-10分</a>";
	val +="</div>";
	val +="</div>";
	val +="<div class='b-boxfullSet'>";
	val +="<div class='d-box'   rq="+rq+" paid='10003' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_13' pval='13' pl="+sfc[8]+" class='"+(isPlayChecked(ccid,'10003_13')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>11-15分</a>";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_14' pval='14' pl="+sfc[9]+" class='"+(isPlayChecked(ccid,'10003_14')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>16-20分</a>";
	val +="</div>";
	val +="</div>";
	val +="<div class='b-boxfullSet'>";
	val +="<div class='d-box'  rq="+rq+" paid='10003' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_15' pval='15' pl="+sfc[10]+" class='"+(isPlayChecked(ccid,'10003_15')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>21-25分</a>";
	val +="<a href='javascript:;' onclick='sfClick(this)' cvalue='10003_16' pval='16' pl="+sfc[11]+" class='"+(isPlayChecked(ccid,'10003_16')==true?"btnboxlq on b-flex":"btnboxlq b-flex")+"'>&gt;26分</a>";
	val +="</div>";
	val +="</div>";
	val +="</div>";
	val +="</div>";
	val +="</li>";
	val +="</ul>";
	val +="</div>";
    
	val +="<div class='mt_10 bboxbnt'>";
	val +="<span class='btn_grey fullbtnx' onclick='toggle(\"s-lqsel\")'>取消</span>";
	val +="<span class='btn_red fullbtnx'  onclick='selectedMatchOk("+ccid+")' id='selected_match_ok'>确认</span>";
	val +="</div>";

	$("#b_jlboxlist_id").html(val);
}

//选号点击事件
function sfClick(obj){
	
	if($(obj).attr("class")=="btnboxlq b-flex"){
		$(obj).attr("class", "btnboxlq on b-flex");
	}else{
		$(obj).attr("class", "btnboxlq b-flex");
	}
	
	//选号统计
	comm.chooseNumber($(obj).parent(),$(obj));
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
	    		return true;
	    	}
	    	
	    }
	}
	
	return false;
}

//对阵玩法选择确认效果
function selectedMatchOk(ccid){
	var seleteMatchChild = "";
	
	var gameList = index.gameList ;
	
	for(var i = 0 ; i < gameList.length ; i++){
		if(gameList[i].cid == ccid){
			var chks = gameList[i].chks ;
		    for(var j = 0 ; j < chks.length ; j++){
		    	var v0 = parseInt(chks[j].split("_")[0]) ;
		    	var v1 = parseInt(chks[j].split("_")[1]) ;
		    	
	        	if(v0 == 10001){
	        		seleteMatchChild += sfshow[v1];
	        	}
	        	
	        	if(v0 == 10002){
	        		seleteMatchChild += rfsfshow[v1];
	        	}
	        	
	        	if(v0 == 10003){
	        		seleteMatchChild += sfcshow[v1];
	        	}
	        	
	        	if(v0 == 10004){
	        		seleteMatchChild += dxfshow[v1];
	        	}

		    	seleteMatchChild += "&nbsp;";
		    }
		}
	}
	
	if(seleteMatchChild != ""){
		
		$("#match_child_id_"+ccid).attr("class", "btn_listboxlq on");
		$("#match_child_id_"+ccid).html(seleteMatchChild);
	}else{
		$("#match_child_id_"+ccid).attr("class", "btn_listboxlq");
		$("#match_child_id_"+ccid).html("展开选项");
	}
	
	if(index.gameList.length >= 2){
		//显示选中场数
		$("#selected_match_num").html("确认赛事");
	}else{
		$("#selected_match_num").html("至少选择2场比赛");
	}
	
	toggle("s-lqsel");
	buyDeal();//购买统计处理
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
comm.chooseNumber = function(obj, objtd) {
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
		comm.chooseNumberIsSelected(paid, objtd, k);
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
				if ($(self).attr("class") == "btnboxlq on b-flex") {
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
				if ($(chks).attr("class") == "btnboxlq on b-flex") {
					ret.push($.trim($(chks).attr("cvalue")));
				}
				return ret;
			})(objtd),
			selectedSP : (function(chks) {
				var ret = [];
				if ($(chks).attr("class") == "btnboxlq on b-flex") {
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
comm.chooseNumberIsSelected = function(paid, objtd, k) {
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
		if ($(objtd).attr("class") == "btnboxlq on b-flex")
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
		if ($(objtd).attr("class") == "btnboxlq on b-flex")
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
			if ($(objtd).attr("class") == "btnboxlq on b-flex")
				chos.push($(objtd).attr("pval"));
		} else {
			chos = index.gameList[k].choose[d][paid].split(",");
			if ($(objtd).attr("class") == "btnboxlq on b-flex")
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