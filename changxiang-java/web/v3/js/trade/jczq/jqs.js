var jczq={};
jczq.lotid=9;
jczq.playId=9002;
jczq.gameList=[]; 	 // 存放所有选择 对阵对象
jczq.GuoGuanType=2;   //1是单关,2是自由过关,3是多串过关
jczq.bs=1;			 //默认的倍数=1
jczq.ggType=[];	   //存放选择的过关方式
jczq.totalMoney=0;  //总金额
jczq.totalZs=0;     //总注数
jczq.sslist=[];    // 联赛
jczq.ablePlay_jqs=4;

var daytpl = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
var daytpl2 = ["","周一","周二","周三","周四","周五","周六","周天"];
var ggtype_tpl = ["","一","二","三","四","五","六","七","八"];

var matchUrl = "/trade/jczq/hhtz!getMatchMapAjax.action?_t=";

var pageNumber = 1;
var pageSize = 20;
var totalpage = 0;
// 存放对阵数据
var serData=[];

//加载数据
function getData(){
	var t = new Date().getTime();
	baseAjax("post",matchUrl+t,false,null,"json",function(data){
		var r_data = data?data:[];
		// 对阵数据
		for(var i=0; i< r_data.length; i++){
			var tempObj = r_data[i];
			if((tempObj.blendMark&jczq.ablePlay_jqs)==jczq.ablePlay_jqs){
				serData.push(tempObj);
			}
		}
		// 分页数据
		var totalCount = serData.length;
		if(totalCount%pageSize==0){
			totalpage=totalCount/pageSize;
		}else{
			totalpage=Math.ceil(totalCount/pageSize);
		}
		
		// 第一次加载
		initMatchList();
	});
}


// 加载对阵数据
function initMatchData(pageNumber){
	var curData = [];
	var match = [];
	var matchObj = {};
	var matchList = [];
	
	// 是否包含下一页
	if(pageNumber<=totalpage && pageNumber!=0){
		$("#showMore").show();
		var start = (pageNumber-1)*pageSize;
		var end = start+pageSize;
		// 获取下一页数据
		var data = serData.slice(start,end);
		var tempDate="";
		for(var key = 0; key < data.length; key++){
			var tempObj = data[key];
			if(tempObj.matchDate!=tempDate){
				tempDate = tempObj.matchDate;
				curData.push([]);
			}
			curData[curData.length -1].push(tempObj); // 格式化数据
		}
		pageNumber+1>totalpage&&$("#showMore").hide();
	}else{
		pageNumber=0;
		$("#showMore").hide();  // 没有更多分页数据
	}
	
	for(var i = 0;i<curData.length;i++){
		var matchdata = curData[i];
		// 对阵日期
		matchObj.matchDate = matchdata[0].matchDate;
		matchObj.match_data_str = dateFMT(matchObj.matchDate+"");
		matchObj.match_count=matchdata.length;
		// 对阵数据
		for(var k = 0;k<matchdata.length;k++){
			var matchk = {};
			matchk.cc_id = matchdata[k].ccId;
			matchk.cc_number = matchdata[k].ccNumber;
			matchk.match_date = matchdata[k].matchDate;
			
			matchk.league_name = matchdata[k].leagueName;
			if($.inArray(matchk.league_name, jczq.sslist)==-1){
				jczq.sslist.push(matchk.league_name);
			}
			matchk.home_name = matchdata[k].homeName;
			matchk.guest_name = matchdata[k].guestName;
			matchk.stop_time = matchdata[k].stopDate;
			
			var __stopTime = formatDate(matchdata[k].stopDate);
			var hours = __stopTime.getHours();
			var minute = __stopTime.getMinutes();
			matchk.hours = hours<10?"0"+hours:hours;
			matchk.minute = minute<10?"0"+minute:minute;
			
			matchk.week = daytpl[__stopTime.getDay()];
			
			var ccnumber = matchdata[k].ccNumber+"";
			matchk.cc_number_str=daytpl2[ccnumber.substr(0,1)]+ccnumber.substr(1);
			
			matchk.rq=matchdata[k].concede;
			if(matchdata[k].oddsJqsg){
				matchk.odds_jqsg = matchdata[k].oddsJqsg;
				var jqs_odds={};
				var oddsArray = matchk.odds_jqsg.split(",");
				jqs_odds.jqsodd0 = oddsArray[0];
				jqs_odds.jqsodd1 = oddsArray[1];
				jqs_odds.jqsodd2 = oddsArray[2];
				jqs_odds.jqsodd3 = oddsArray[3];
				jqs_odds.jqsodd4 = oddsArray[4];
				jqs_odds.jqsodd5 = oddsArray[5];
				jqs_odds.jqsodd6 = oddsArray[6];
				jqs_odds.jqsodd7 = oddsArray[7];
				matchk.odds_jqsg_obj=jqs_odds;
				
				oddsArray.sort(function(a,b){
					return a-b;
				});
				
				matchk.min = oddsArray[0];
				matchk.max = oddsArray[2];
			}else{
				matchk.odds_jqsg = matchdata[k].oddsJqsg;
				var jqs_odds={};
				jqs_odds.jqsodd0 = "-";
				jqs_odds.jqsodd1 = "-";
				jqs_odds.jqsodd2 = "-";
				jqs_odds.jqsodd3 = "-";
				jqs_odds.jqsodd4 = "-";
				jqs_odds.jqsodd5 = "-";
				jqs_odds.jqsodd6 = "-";
				jqs_odds.jqsodd7 = "-";
				matchk.odds_jqsg_obj=jqs_odds;
			}
			
			matchList.push(matchk);
		}
		matchObj.matchList=matchList;
		match.push(matchObj);
		matchList=[];
		matchObj={};
	}
	// 分页数据
	if(pageNumber>=totalpage){
		pageNumber=0;
		$("#showMore").hide();  // 没有更多分页数据
	}else{
		$("#showMore").show();
	}
	
	return match;
}

// 初始化对阵数据 至 HTML
function initMatchList(){
	// 加载对阵数据
	var match = initMatchData(pageNumber);
	
	if(match.length<1 && pageNumber!=0){
		var no_match_html = template('no_match',match);
		$("#matchData").html(no_match_html);
		return;
	}
	
	for(var i=0;i<match.length;i++){
		if($(".m-games_list").find("div[id='top_match_"+match[i].matchDate+"']").length<1){
			// 追加 时间条 top_match_
			var matchTopHtml = template('matchDate_top',{"matchObj":match[i]});
			$("#matchData").append(matchTopHtml);
			// 追加 对阵 
			var matchhtml = template('matchDataList_temp',{"matchObj":match[i]});
			$("#match"+match[i].matchDate).append(matchhtml);
		}else{
			// 追加 对阵
			var matchhtml = template('matchDataList_temp',{"matchObj":match[i]});
			$("#match"+match[i].matchDate).append(matchhtml);
		}
	}
	
	// 赛事 筛选
	var sslist_html = template('sslist_info',{"list":jczq.sslist});
	
	$("#sslist").html(sslist_html);
	
}

// 加载更多对阵数据
function showMatchForPage(){
	if(pageNumber==0 || pageNumber+1>totalpage){
		$("#showMore").hide();
		return;
	}
	pageNumber++;
	// 加载对阵数据
	var match = initMatchData(pageNumber); 
	if(match.length>0){
		for(var i=0;i<match.length;i++){
			var top = $(".m-games_list").find("div[id='top_match_"+match[i].matchDate+"']");
			if(top.length<1){
				// 追加 时间条 top_match_
				var matchTopHtml = template('matchDate_top',{"matchObj":match[i]});
				$("#matchData").append(matchTopHtml);
				// 追加 对阵 
				var matchhtml = template('matchDataList_temp',{"matchObj":match[i]});
				$("#match"+match[i].matchDate).append(matchhtml);
			}else{
				var span = top.find("span");
				span.html(parseInt(span.html(), 10)+match[i].match_count);
				// 追加 对阵
				var matchhtml = template('matchDataList_temp',{"matchObj":match[i]});
				$("#match"+match[i].matchDate).append(matchhtml);
			}
		}
	}
	// 赛事 筛选
	var sslist_html = template('sslist_info',{"list":jczq.sslist});
	
	$("#sslist").html(sslist_html);
}

function xuanhao(obj){
	
	var cs = "";
	if($(obj).attr("class")=="b-flex winselect"){
		$(obj).attr("class","b-flex");
		cs="b-flex";
	}else{
		$(obj).attr("class","b-flex winselect");
		cs="b-flex winselect";
	}
	var buy_parent = $(obj).parent().parent().parent().parent().parent();
	// 保存数据
	chooseNumber(buy_parent,$(obj));
	
	// 确认投注页面选号事件
	if($(obj).attr("name")=="touzhu_click_tzb"){
		// 如果没有选择项 就删除胆样式
		buy_parent.find("label[class='b-flex winselect']").length==0&&clearDan();
		
		$("div[cid='"+buy_parent.attr("cid")+"']").find("label[name='click_tzb'][cvalue='"+$(obj).attr("cvalue")+"']").attr("class",cs);
		changeGgType();
		updateBuyInfo();
	}
	
	if(jczq.gameList.length>1){
		$("#selcs").html("已选择"+jczq.gameList.length+"场比赛");
		$(".m-submit_box").removeClass("disabled");
	}else{
		$("#selcs").html("请至少选择2场比赛");
		$(".m-submit_box").addClass("disabled");
	}
} 


/**
 * obj 对阵属性<div>
 * objele 选择的胜平负属性<i>
 */
function chooseNumber(obj,objele){
	// 玩法id
	var paid = jczq.playId;
	// 选中对阵cid
	var cid = $(obj).attr("cid");
	// 被选的对象判断是否存在
	var k = -1; 
	for ( var i = 0, j = jczq.gameList.length; i < j; i++) {
		if (jczq.gameList[i].cid == cid) {
			k = i;
		}
	}
	// 添加或者更新对象
	if (k != -1) { 
		updateChooseNumber(paid, objele, k); 
	} else { 
		
		if(jczq.gameList.length>=14){
			open_message("最多选择14场比赛");
			objele.attr("class","b-flex");
			return;
		}
		
		var singleInfo = {
			suffix : obj.attr('suffix'),// 用来排序的下标 标示
			cid : obj.attr('cid'), // 赛事ID
			cnumber : obj.attr('cnumber'), // 完整编号 1001
			cname : getMatchName(obj.attr('cnumber')), // 周一001
			gname : obj.attr('gname'), // 完整名称
			gtype : obj.attr('gtype'), // 赛事类型
			gdate : obj.attr('gdate'), // 完整日期
			hometeam : obj.attr('hometeam'), // 主队
			guestteam : obj.attr('guestteam'), // 客队
			gendtime : obj.attr('gendtime'), // 截止时间
			rq : obj.attr('rq'), // 截止时间
			dan : "0", // 1为胆 0不为胆
			odds:obj.attr("odds"),
			choose : (function(chks) {
				var d = -1;
				switch (paid * 1) {
					case 9005:d = 0;break;
					case 9001:d = 1;break;
					case 9004:d = 2;break;
					case 9002:d = 3;break;
					case 9003:d = 4;break;
				}
				var ret = [ {9005 : ""}, {9001 : ""}, {9004 : ""}, {9002 : ""}, {9003 : ""} ];
				if ($(chks).attr("class")==="b-flex winselect") {
					ret[d][paid] = $(chks).attr("pval");
				}
				return ret;
			}(objele)),
			chks : (function(chks) {
				var ret = [];
				if ($(chks).attr("class")==="b-flex winselect") {
					ret.push($.trim($(chks).attr("cvalue")));
				}
				// 选择的投注内容数组
				return ret;
			})(objele),
			selectedSP : (function(chks) {
				var ret = [];
				if ($(chks).attr("class")==="b-flex winselect") {
					ret.push($.trim($(chks).attr("odds")));
				}
				// 选择的赔率数组
				return ret;
			})(objele)
		};
		
		singleInfo.minSP = Math.min.apply(Math, singleInfo.selectedSP) || 1; // 最小赔率
		singleInfo.maxSP = Math.max.apply(Math, singleInfo.selectedSP) || 1; // 最大赔率
		jczq.gameList.push(singleInfo);
		
		//排序 用suffix
		jczq.gameList.sort(function(a,b){
			  return a.suffix-b.suffix;
		});
	}
}

/**
 *  更新选择对阵对象
 */
function updateChooseNumber(playId,objele,k){
	
	var d = -1;
	switch (playId * 1) {
		case 9005:d = 0;break;
		case 9001:d = 1;break;
		case 9004:d = 2;break;
		case 9002:d = 3;break;
		case 9003:d = 4;break;
	}
	
	if (d != -1) {
		var chos = jczq.gameList[k].choose[d][playId]==""?[]:jczq.gameList[k].choose[d][playId].split(",");
		// 添加赔率
		if ($(objele).attr("class")==="b-flex winselect"){
			
			jczq.gameList[k].chks.push($.trim($(objele).attr("cvalue")));
			jczq.gameList[k].selectedSP.push($.trim($(objele).attr("odds")));
			chos.push($(objele).attr("pval"));
			
		}else {
			// 删除赔率
			for ( var i = 0, j = jczq.gameList[k].chks.length; i < j; i++) {
				if (jczq.gameList[k].chks[i] == $.trim($(objele).attr("cvalue"))) {
					jczq.gameList[k].chks.splice(i, 1);
					jczq.gameList[k].selectedSP.splice(i, 1);
				}
			}
			
			for ( var i = 0, j = chos.length; i < j; i++) {
				if (chos[i] == $(objele).attr("pval")) {
					chos.splice(i, 1);
					break;
				}
			}
		}
		
		// 最小赔率
		jczq.gameList[k].minSP = Math.min.apply(Math,jczq.gameList[k].selectedSP) || 1; 
		// 最大赔率
		jczq.gameList[k].maxSP = Math.max.apply(Math,jczq.gameList[k].selectedSP) || 1; 
				
		// 如果没有选中的项 就删除对象
		if (jczq.gameList[k].chks.length == 0) {
			jczq.gameList.splice(k, 1);
			return;
		}
		
		jczq.gameList[k].choose[d][playId] = chos.join(",");
	}
}

// 设胆
function setDan(cid){
	
	if(jczq.GuoGuanType==3){
		open_message("多串过关不支持设胆");
		return;
	}
	
	var danLen = 0; //可设胆数
	if(jczq.ggType.length>0){
		for(var i = 0 ; i < jczq.ggType.length; i++){
			var val = parseInt(jczq.ggType[i].val,10) -1;
			if(danLen==0 || danLen>val){
				danLen=val;
			}
		}
	}
	
	// 已设胆数
	var s_danLen = $("ul[id='tobuy_matchList']").find("i[name='dan'][class='jczqsum-qrpage winselect']").length;
	
	// 设胆
	var dan_class =	$("#tobuy_match_"+cid).find("i[name='dan']");
	jczq.gameList.each(function(o,i){
		if(o.cid==cid){
			if(dan_class.attr("class")=="jczqsum-qrpage"){
				if(s_danLen >= danLen || danLen==0){
					open_message("设胆数不能超过最小过关数");
					return;
				}
				o.dan="1";
				dan_class.attr("class","jczqsum-qrpage winselect");
			}else{
				o.dan="0";
				dan_class.attr("class","jczqsum-qrpage");
			}
		 }
	 });
	
	updateBuyInfo();
	
}

/**
 *  确认赛事 投注明细
 */
function toBuyInfoShow(){
	
	if(jczq.gameList.length < 2){
		$("#tobuy_matchList").html("");
		open_message("至少选择2场");
		return ;
	} else {
		// 打开投注确认页面
		showTouzhuDiv();
	}
}

// 打开投注确认页面
function showTouzhuDiv(){
	clearDan();
	// 对阵数据
	var match = formatGameList();
	var tobuy_match_html = template('tobuy_match',{"list":match});
	$("#tobuy_matchList").html(tobuy_match_html);
	// 默认过关方式
	initGgType();
	
	// 投注信息
	updateBuyInfo();
	// 页面切换
	$("#chooseBall").hide();
	$("#toBuyDiv").show();
	// 刷新滚动事件
	myScroll_tobuy.refresh();
}

// 将 cooike 的值 回显示
function backGameList(){
	if(jczq.gameList.length > 0){
		// 回显选号页面
		for (var i = 0; i < jczq.gameList.length; i++) {
			var chks = jczq.gameList[i].chks ;
			var suffix = jczq.gameList[i].suffix ;
			var cid = jczq.gameList[i].cid;
			var parent = $("div[suffix='"+suffix+"'][cid='"+cid+"']") ;
			// 对阵赛事回显
			for(var a = 0 ; a < chks.length ; a++){
				switch (chks[a]) {
				case "9002_0":parent.find("label[cvalue='"+chks[a]+"']").attr("class" , "b-flex winselect");break;
				case "9002_1":parent.find("label[cvalue='"+chks[a]+"']").attr("class" , "b-flex winselect");break;
				case "9002_2":parent.find("label[cvalue='"+chks[a]+"']").attr("class" , "b-flex winselect");break;
				case "9002_3":parent.find("label[cvalue='"+chks[a]+"']").attr("class" , "b-flex winselect");break;
				case "9002_4":parent.find("label[cvalue='"+chks[a]+"']").attr("class" , "b-flex winselect");break;
				case "9002_5":parent.find("label[cvalue='"+chks[a]+"']").attr("class" , "b-flex winselect");break;
				case "9002_6":parent.find("label[cvalue='"+chks[a]+"']").attr("class" , "b-flex winselect");break;
				case "9002_7":parent.find("label[cvalue='"+chks[a]+"']").attr("class" , "b-flex winselect");break;
				default:break;
				}
			}
		}
		$("#selcs").html("已选择"+jczq.gameList.length+"场比赛");
		$(".m-submit_box").removeClass("disabled");
		
		// 确认投注页面回显
		var match = formatGameList();
		var tobuy_match_html = template('tobuy_match',{"list":match});
		$("#tobuy_matchList").html(tobuy_match_html);
		
		for(var i=0;i<jczq.ggType.length;i++){
			var ggType = $("i[name='gg_type'][val='"+jczq.ggType[i].val+"']");
			if(ggType.length>0){
				jczq.GuoGuanType=2;
				break;
			}else{
				var dcGGType = $("i[name='dc_gg_type'][val='"+jczq.ggType[i].val+"']");
				if(dcGGType.length>0){
					jczq.GuoGuanType=3;
					break;
				}
			}
		}
		
		updateBuyInfo();
		
		$("#chooseBall").hide();
		$("#toBuyDiv").show();
		
		// 刷新滚动事件
		myScroll_tobuy.refresh();

	}
}

// 清除胆
function clearDan(){
	
	jczq.gameList.each(function(o,i){
		o.dan="0";
	});
	
	$("i[name='dan']").attr("class","jczqsum-qrpage");
	
}

/*
 * 确认投注 - 删除对阵
 */
function delMatch(cid){
	var isdel = 0 ;
	 jczq.gameList.each(function(o,i){
		 if(o.cid==cid){
			for(var k = 0 ; k < o.chks.length  ; k++){
				// 删除选中 样式 style="display:none;"  i-chkbox winselect
				$("div[cid='"+cid+"']").find("label[cvalue='"+o.chks[k]+"']").removeClass("b-flex winselect").addClass("b-flex");
			}
			// 删除LI元素
			$("#tobuy_match_"+cid).remove();
			
			// 删除这中的对阵数据
			jczq.gameList.splice(i,1);
			// 跳出循环
			isdel = 1 ;
			return false;
		 }
	 });
	 
	 clearDan();
	 
	 if(isdel==0){
		 $("#tobuy_match_"+cid).remove();
	 }
	 myScroll_tobuy.refresh();
	if(jczq.gameList.length>1){
		$("#selcs").html("已选择"+jczq.gameList.length+"场比赛");
		$(".m-submit_box").removeClass("disabled");
	}else{
		$("#selcs").html("请至少选择2场比赛");
		$(".m-submit_box").addClass("disabled");
	}
	changeGgType();
	// 更新购买信息
	updateBuyInfo();
	
}

// 更新购买信息
function updateBuyInfo(){
	
	jczq.totalZs=jczq.getZhushu();; //注数
	jczq.totalMoney=jczq.bs*jczq.totalZs*2; // 单倍 总金额
	var maxjj = jczq.predictMaxPrize(jczq.gameList);
	$('.gg_mode span').text(getGgTypeStr());
	$("#touzhu_zs").html(jczq.totalZs+"注");
	$("#touzhu_bs").html(jczq.bs+"倍");
	$("#maxjj").html("最大奖金："+ Math.round(maxjj*parseInt(jczq.bs||1, 10)*100)/100+"元");
	$("#touzhu_money").html("共"+jczq.totalMoney+"元");
	
}

// 生成模板数据
function formatGameList(){
	
	var d = -1;
	switch (jczq.playId * 1) {
		case 9005:d = 0;break;
		case 9001:d = 1;break;
		case 9004:d = 2;break;
		case 9002:d = 3;break;
		case 9003:d = 4;break;
	}
	
	for(var i=0;i<jczq.gameList.length;i++){
		var chs = jczq.gameList[i].choose[d][jczq.playId];
		var jqschk={};
		jqschk.jqs0  = chs.indexOf("0")>=0?"b-flex winselect":"b-flex";
		jqschk.jqs1 = chs.indexOf("1")>=0?"b-flex winselect":"b-flex";
		jqschk.jqs2 = chs.indexOf("2")>=0?"b-flex winselect":"b-flex";
		jqschk.jqs3 = chs.indexOf("3")>=0?"b-flex winselect":"b-flex";
		jqschk.jqs4 = chs.indexOf("4")>=0?"b-flex winselect":"b-flex";
		jqschk.jqs5 = chs.indexOf("5")>=0?"b-flex winselect":"b-flex";
		jqschk.jqs6 = chs.indexOf("6")>=0?"b-flex winselect":"b-flex";
		jqschk.jqs7 = chs.indexOf("7")>=0?"b-flex winselect":"b-flex";
		jczq.gameList[i].jqs_cks=jqschk;
		
		var jqs_odds={};
		var oddsArray =jczq.gameList[i].odds.split(",");
		jqs_odds.jqsodd0 = oddsArray[0];
		jqs_odds.jqsodd1 = oddsArray[1];
		jqs_odds.jqsodd2 = oddsArray[2];
		jqs_odds.jqsodd3 = oddsArray[3];
		jqs_odds.jqsodd4 = oddsArray[4];
		jqs_odds.jqsodd5 = oddsArray[5];
		jqs_odds.jqsodd6 = oddsArray[6];
		jqs_odds.jqsodd7 = oddsArray[7];
		jczq.gameList[i].odds_jqsg_obj=jqs_odds;
	}
	return jczq.gameList;
};


function toDoBuy(){
	confirmBuy(false);
	$("#doBuy").one('click' , toDoBuy) ;
}

//线下订单
function toOfflineDoBuy(){
	confirmBuy(true);
	$("#offlineDoBuy").one('click' , toOfflineDoBuy) ;
}

// 确定投注 校验参数
function confirmBuy(isOffline){
	
	if($("#iagree").attr("class")=="i-check"){		
		open_message("您需要同意“购彩协议”才能投注");
		return ;
	}
	
	if(jczq.gameList.length < 2){
		open_message("请至少选择2场比赛");
		return ;
	}
	
	if(jczq.ggType.length == 0){
		open_message("请选择过关方式");
		return ;
	}
	
	// 检查登陆
	if(!checkLoginByAjax()){		
		//保存数据
		write_temp_login("jqs_lotCode" , jczq.lotid) ;
		write_temp_login("jqs_gameList" , getListStr(jczq.gameList)) ;
		write_temp_login("jqs_ggType" , getListStr(jczq.ggType) ) ;
		write_temp_login("jqs_bs" , jczq.bs ) ;
		//write_temp_login("jqs_zs" , jczq.totalZs) ;
		var bakUrl = "/v3shtml/trade/jczq/jqs.shtml" ;
		to_login(bakUrl);
		return ;
	}
	//金额审核
	if(!isOffline) {
		same.hasEnoughMoney(jczq.playId,jczq.lotid,1,jczq.totalMoney,jczq.gameList.length,jczq.bs,1);	
	} else {
		same.offlineConfirmHtml(jczq.playId,jczq.lotid,1,jczq.totalMoney,jczq.gameList.length,jczq.bs,1);//线下交易直接购买
	}
	
}

