var jclq={};
jclq.lotid=10;
jclq.playId=10001;
jclq.ablePlay_sf=1; 
var daytpl = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
var daytpl2 = ["","周一","周二","周三","周四","周五","周六","周天"];
var ggtype_tpl = ["","一","二","三","四","五","六","七","八"];

var matchUrl = "/trade/jclq/index!getMatchMapAjax.action?_t=";
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
			if((tempObj.blendMark&jclq.ablePlay_sf)==jclq.ablePlay_sf){
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
			if($.inArray(matchk.league_name, index.sslist)==-1){
				index.sslist.push(matchk.league_name);
			}
			matchk.home_name = matchdata[k].homeName;
			matchk.guest_name = matchdata[k].guestName;
			matchk.stop_time = matchdata[k].stopDate;
			
			var __stopTime = new Date(Date.parse(matchdata[k].stopDate.replace(/-/g,"/")));
			var hours = __stopTime.getHours();
			var minute = __stopTime.getMinutes();
			matchk.hours = hours<10?"0"+hours:hours;
			matchk.minute = minute<10?"0"+minute:minute;
			matchk.week = daytpl[__stopTime.getDay()];
			
			var ccnumber = matchdata[k].ccNumber+"";
			matchk.cc_number_str=daytpl2[ccnumber.substr(0,1)]+ccnumber.substr(1);
			
			matchk.rq=matchdata[k].concede;
			if(matchdata[k].oddsSfg){
				matchk.odds_spfg = matchdata[k].oddsSfg;
				var oddsArray = matchdata[k].oddsSfg.split(",");
				//oddsArray = same.fixedNumber(oddsArray,2);
				matchk.sodd = oddsArray[0];
				matchk.fodd = oddsArray[1];
				//if(oddsArray[0]*oddsArray[1]>0){
				//	matchk.isspf = 1;
				//}else{
				//	matchk.isspf = 0;
				//}
				oddsArray.sort(function(a,b){
					return a-b;
				});
				matchk.min = oddsArray[0];
				matchk.max = oddsArray[1];
			}
			
			matchList.push(matchk);
		}
		matchObj.matchList=matchList;
		match.push(matchObj);
		matchList=[];
		matchObj={};
	}
	return match;
}

// 初始化对阵数据 至 HTML
function initMatchList(){
	// 加载对阵数据
	var match = initMatchData(pageNumber);
	
	if(match.length<1){
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
	var sslist_html = template('sslist_info',{"list":index.sslist});
	
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
				span.html(parseInt(span.html(), 10)+match[i].matchList.length);
				// 追加 对阵
				var matchhtml = template('matchDataList_temp',{"matchObj":match[i]});
				$("#match"+match[i].matchDate).append(matchhtml);
			}
		}
	}else{
		
	}
}


//格式化时间
function dateFMT(date){
	var nian = date.substring(0,4);
	var yue = date.substring(4,6);
	var ri = date.substring(6,8);
	var newdate = new Date(nian,yue-1,ri);
	
	return nian+"-"+yue+"-"+ri+" "+daytpl[newdate.getDay()];
}

function xuanhao(obj){
	
	var cs = "";
	if($(obj).attr("class")=="tzb winselect"){
		$(obj).attr("class","tzb");
		cs="tzb";
	}else{
		$(obj).attr("class","tzb winselect");
		cs="tzb winselect";
	}
	var buy_parent = $(obj).parent().parent();
	// 保存数据
	chooseNumber(buy_parent,$(obj));
	
	// 确认投注页面选号事件
	if($(obj).attr("name")=="touzhu_click_tzb"){
		// 如果没有选择项 就删除胆样式
		buy_parent.find("i[class='tzb winselect']").length==0&&clearDan();
		
		$("div[cid='"+buy_parent.attr("cid")+"']").find("i[name='click_tzb'][cvalue='"+$(obj).attr("cvalue")+"']").attr("class",cs);
		
		changeGgType();
		
		updateBuyInfo();
	}
	
	if(index.gameList.length>1){
		$("#selcs").html("已选择"+index.gameList.length+"场比赛");
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
	var paid = jclq.playId;
	// 选中对阵cid
	var cid = $(obj).attr("cid");
	// 被选的对象判断是否存在
	var k = -1; 
	for ( var i = 0, j = index.gameList.length; i < j; i++) {
		if (index.gameList[i].cid == cid) {
			k = i;
		}
	}
	// 添加或者更新对象
	if (k != -1) { 
		updateChooseNumber(paid, objele, k); 
	} else { 
		
		if(index.gameList.length>=14){
			open_message("最多选择14场比赛");
			objele.attr("class","tzb");
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
			//rq : obj.attr('rq'), // 让球
			win : obj.attr('sodd'), // 胜的赔率
			draw : obj.attr('podd'), // 平的赔率
			lost : obj.attr('fodd'), // 负的赔率
			gendtime : obj.attr('gendtime'), // 截止时间
			rq : obj.attr('rq'), // 截止时间
			dan : obj.attr('dan')?1:0, // 1为胆 0不为胆
			choose : (function(chks) {
				var d = -1;
				switch (paid * 1) {
				case 10001:d = 0;break;
				case 10002:d = 1;break;
				case 10003:d = 2;break;
				case 10004:d = 3;break;
				}
				var ret = [ {10001 : ""}, {10002 : ""}, {10003 : ""}, {10004 : ""}];
				if ($(chks).attr("class")==="tzb winselect") {
					ret[d][paid] = $(chks).attr("pval");
				}
				return ret;
			}(objele)),
			chks : (function(chks) {
				var ret = [];
				if ($(chks).attr("class")==="tzb winselect") {
					ret.push($.trim($(chks).attr("cvalue")));
				}
				// 选择的投注内容数组
				return ret;
			})(objele),
			selectedSP : (function(chks) {
				var ret = [];
				if ($(chks).attr("class")==="tzb winselect") {
					ret.push($.trim($(chks).attr("odds")));
				}
				// 选择的赔率数组
				return ret;
			})(objele)
		};
		
		singleInfo.minSP = Math.min.apply(Math, singleInfo.selectedSP) || 1; // 最小赔率
		singleInfo.maxSP = Math.max.apply(Math, singleInfo.selectedSP) || 1; // 最大赔率
		index.gameList.push(singleInfo);
		
		//排序 用suffix
		index.gameList.sort(function(a,b){
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
		case 10001:d = 0;break;
		case 10002:d = 1;break;
		case 10003:d = 2;break;
		case 10004:d = 3;break;
	}
	if (d != -1) {
		var chos = index.gameList[k].choose[d][playId]==""?[]:index.gameList[k].choose[d][playId].split(",");
		// 添加赔率
		if ($(objele).attr("class")==="tzb winselect"){
			
			index.gameList[k].chks.push($.trim($(objele).attr("cvalue")));
			index.gameList[k].selectedSP.push($.trim($(objele).attr("odds")));
			chos.push($(objele).attr("pval"));
			
		}else {
			// 删除赔率
			for ( var i = 0, j = index.gameList[k].chks.length; i < j; i++) {
				if (index.gameList[k].chks[i] == $.trim($(objele).attr("cvalue"))) {
					index.gameList[k].chks.splice(i, 1);
					index.gameList[k].selectedSP.splice(i, 1);
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
		index.gameList[k].minSP = Math.min.apply(Math,index.gameList[k].selectedSP) || 1; 
		// 最大赔率
		index.gameList[k].maxSP = Math.max.apply(Math,index.gameList[k].selectedSP) || 1; 
				
		// 如果没有选中的项 就删除对象
		if (index.gameList[k].chks.length == 0) {
			index.gameList.splice(k, 1);
			return;
		}
		
		index.gameList[k].choose[d][playId] = chos.join(",");
	}
}

// 设胆
function setDan(cid){
	
	if(index.GuoGuanType==3){
		open_message("多串过关不支持设胆");
		return;
	}
	
	var danLen = -1; //可设胆数
	if(index.ggType.length>0){
		for(var i = 0 ; i < index.ggType.length; i++){
			var val = parseInt(index.ggType[i].val,10) -1;
			if(danLen==-1 || danLen>val){
				danLen=val;
			}
		}
	}else{
		open_message("请选择过关方式");
		return;
	}
	
	// 已设胆数
	var s_danLen = $("ul[id='tobuy_matchList']").find("i[name='dan'][class='jczqsd-qrpage winselect']").length;
	
	// 设胆
	var dan_class =	$("#tobuy_match_"+cid).find("i[name='dan']");
	index.gameList.each(function(o,i){
		if(o.cid==cid){
			if(dan_class.attr("class")=="jczqsd-qrpage"){
				if(s_danLen >= danLen || danLen==0){
					open_message("设胆数不能超过最小过关数");
					return;
				}
				o.dan="1";
				dan_class.attr("class","jczqsd-qrpage winselect");
			}else{
				o.dan="0";
				dan_class.attr("class","jczqsd-qrpage");
			}
		 }
	 });
	
	updateBuyInfo();
	
}


function getMatchName(num) {
	
	var dic = {
		1 : '周一',
		2 : '周二',
		3 : '周三',
		4 : '周四',
		5 : '周五',
		6 : '周六',
		7 : '周日'
	};
	
	if (num && num.length == 4) {
		return num.replace(/([1-7])\d{3}/gi, function(match) {
			return dic[match.charAt(0)] + match.substring(1);
		});
	}
	
	return num;
};

//赛事隐藏和显示
function shopMatchList(o){
	$(o).toggleClass('fold');
}

/**
 *  确认赛事 投注明细
 */
function toBuyInfoShow(){
	
	if(index.gameList.length < 2){
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


function showChooseBall(){
	$("#chooseBall").show();
	$("#toBuyDiv").hide();
}


// 将 cooike 的值 回显示
function backGameList(){
	if(index.gameList.length > 0){
		// 回显选号页面
		for (var i = 0; i < index.gameList.length; i++) {
			var chks = index.gameList[i].chks ;
			var suffix = index.gameList[i].suffix ;
			var cid = index.gameList[i].cid;
			var parent = $("div[suffix='"+suffix+"'][cid='"+cid+"']") ;
			for(var a = 0 ; a < chks.length ; a++){
				if(chks[a]=="10001_2"){
					parent.find("i[cvalue='"+chks[a]+"']").attr("class" , "tzb winselect");
				} else if(chks[a]=="10001_1"){
					parent.find("i[cvalue='"+chks[a]+"']").attr("class" , "tzb winselect");
				}
			}
		}
		$("#selcs").html("已选择"+index.gameList.length+"场比赛");
		$(".m-submit_box").removeClass("disabled");
		
		// 回显确认投注页面
		var match = formatGameList();
		var tobuy_match_html = template('tobuy_match',{"list":match});
		$("#tobuy_matchList").html(tobuy_match_html);
		
		for(var i=0;i<index.ggType.length;i++){
			var ggType = $("i[name='gg_type'][val='"+index.ggType[i].val+"']");
			if(ggType.length>0){
				index.GuoGuanType=2;
				break;
			}else{
				var dcGGType = $("i[name='dc_gg_type'][val='"+index.ggType[i].val+"']");
				if(dcGGType.length>0){
					index.GuoGuanType=3;
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
	
	index.gameList.each(function(o,i){
		o.dan="0";
	});
	
	$("i[name='dan']").attr("class","jczqsd-qrpage");
	
}

/*
 * 确认投注 - 删除对阵
 */
function delMatch(cid){
	var isdel = 0 ;
	 index.gameList.each(function(o,i){
		 if(o.cid==cid){
			for(var k = 0 ; k < o.chks.length  ; k++){
				// 删除选中 样式 style="display:none;"  i-chkbox winselect
				$("div[cid='"+cid+"']").find("i[cvalue='"+o.chks[k]+"']").removeClass("tzb winselect").addClass("tzb");
			}
			// 删除LI元素
			$("#tobuy_match_"+cid).remove();
			// 删除这中的对阵数据
			index.gameList.splice(i,1);
			// 跳出循环
			isdel = 1 ;
			return false;
		 }
	 });
	 
	 clearDan();
	 
	 if(isdel==0){
		 $("#tobuy_match_"+cid).remove();
	 }
	
	if(index.gameList.length>1){
		$("#selcs").html("已选择"+index.gameList.length+"场比赛");
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
	index.totalZs=index.getZhushu(); //注数
	index.totalMoney=index.bs*index.totalZs*2; // 单倍 总金额
	var jjArr = index.refreshPrice(jclq.playId);
	//var maxjj = index.getMaxJJ();
	$('.gg_mode span').text(getGgTypeStr());
	$("#touzhu_zs").html(index.totalZs+"注");
	$("#touzhu_bs").html(index.bs+"倍");
	$("#maxjj").html("最高奖金："+rundFunc(jjArr[1]*index.bs,1)+"元");
	$("#touzhu_money").html("共"+index.totalMoney+"元");
	
}

// 生成模板数据
function formatGameList(){
	//var list = [];
	for(var i=0;i<index.gameList.length;i++){
		//var match = {};
		//match.cid=index.gameList[i].cid;
		//match.guestteam=index.gameList[i].guestteam;
		//match.hometeam=index.gameList[i].hometeam;
		//match.win=index.gameList[i].win;
		//match.draw=index.gameList[i].draw;
		//match.lost=index.gameList[i].lost;
		var chs = index.gameList[i].choose[0][jclq.playId];
		index.gameList[i].win_chk  = chs.indexOf("2")>=0?"tzb winselect":"tzb";
		//index.gameList[i].draw_chk = chs.indexOf("1")>=0?"tzb winselect":"tzb";
		index.gameList[i].lost_chk = chs.indexOf("1")>=0?"tzb winselect":"tzb";
		//match.suffix=index.gameList[i].suffix;
		//list.push(match);
	}
	return index.gameList;
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
	
	if(index.gameList.length < 2){
		open_message("请至少选择2场比赛");
		return ;
	}
	
	if(index.ggType.length == 0){
		open_message("请选择过关方式");
		return ;
	}
	
	// 检查登陆
	if(!checkLoginByAjax()){		
		//保存数据
		write_temp_login("jclqsf_lotCode" , jclq.lotid) ;
		write_temp_login("jclqsf_gameList" , getListStr(index.gameList)) ;
		write_temp_login("jclqsf_ggType" , getListStr(index.ggType) ) ;
		write_temp_login("jclqsf_bs" , index.bs ) ;
		//write_temp_login("spf_zs" , spf.totalZs) ;
		var bakUrl = "/v3shtml/trade/jclq/sf.shtml" ;
		to_login(bakUrl);
		return ;
	}
	//金额审核
	if(!isOffline) {
		same.hasEnoughMoney(jclq.playId,jclq.lotid,1,index.totalMoney,index.gameList.length,index.bs,1);
	} else {
		same.offlineConfirmHtml(jclq.playId,jclq.lotid,1,index.totalMoney,index.gameList.length,index.bs,1);//线下交易直接购买
	}
	
}

// list to 字符串
function getListStr(list){
	var str = "";
	for (var i = 0; i < list.length; i++) {
		str += JSON.stringify(list[i]);
		if(i!=list.length-1)
			str += "/";
	}
	return str;
}

//字符串 to list
function getStrList(str,list){
	var number = str.split("/");
	for(var i=0;i<number.length;i++){
		var singleInfo = $.parseJSON(number[i]);
		//singleInfo.maxSP = singleInfo.maxSP*1;
		//singleInfo.minSP = singleInfo.minSP*1;
		list.push(singleInfo);
	}
}

// 购买彩票
function dobuy(){
	
	var ggType=[];
	for(var i=0;i<index.ggType.length;i++){
		ggType.push(index.ggType[i].key);
	}
	var postData={
			lotPlayType:jclq.playId,
			ggType:index.GuoGuanType,
			ggId:ggType,
			noteCount:index.totalZs,
			multiple:index.bs,
			numberContent:getBuyCode(),
			totalAmt:index.totalMoney,
			firstChangic:index.gameList[0].cnumber,
			lastChangic:index.gameList[index.gameList.length-1].cnumber,
			firstDate:index.gameList[0].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
			lastDate:index.gameList[index.gameList.length-1].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
			lotTypeCode:jclq.lotid,
			lotCode:jclq.lotid,
			ggName: ggType.join(","),
			singlePlay:0,  // 单一
			buySource:10   //购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
			//token_name:tokenValue,
			//token_type:tokenType
	};
	same.buySubmit(postData,"");
}

//线下订单购买
function doOfflineBuy(){
	var ggType=[];
	for(var i=0;i<index.ggType.length;i++){
		ggType.push(index.ggType[i].key);
	}
	var postData={
			lotPlayType:jclq.playId,
			ggType:index.GuoGuanType,
			ggId:ggType,
			noteCount:index.totalZs,
			multiple:index.bs,
			numberContent:getBuyCode(),
			totalAmt:index.totalMoney,
			firstChangic:index.gameList[0].cnumber,
			lastChangic:index.gameList[index.gameList.length-1].cnumber,
			firstDate:index.gameList[0].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
			lastDate:index.gameList[index.gameList.length-1].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
			lotTypeCode:jclq.lotid,
			lotCode:jclq.lotid,
			ggName: ggType.join(","),
			singlePlay:0,  // 单一
			buySource:10,   //购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
			payType:100,//付款方式：线下付款
			isTicket:0//是否取票：0未取票
	};
	same.buySubmit(postData,"");
}

// 如果没有值 默认为1
function doTempBuy(argJSON){
	var ggType=[];
	for(var i=0;i<index.ggType.length;i++){
		ggType.push(index.ggType[i].key);
	}
	
	var callbackType = argJSON.callbackType;
	var userBalacne = argJSON.allMoney;
	 var numberObject = getBuyCode();
     var multiple = index.bs; // 倍数
     var trackCount = 1;    // 竞彩 没有期数 默认1
     var isStop=0;			 //追号是否停止 竞彩 没有追号
     var zhushu = index.totalZs;
     var lotTypeCode = jclq.lotid;
     var lotTypeplay = jclq.playId;//玩法
     var temp = 2 ;
 	 var totalAmt = index.totalMoney;//* parseInt(trackCount);
     var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
     var investType = 1;
     var inflowamt = totalAmt - userBalacne;
     var singleAmonut = parseInt(zhushu) * multiple * temp ;
     var postData = {
 			ggType:index.GuoGuanType,
 			firstChangic:index.gameList[0].cnumber,
 			lastChangic:index.gameList[index.gameList.length-1].cnumber,
 			firstDate:index.gameList[0].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
 			lastDate:index.gameList[index.gameList.length-1].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
 			ggName: ggType.join(","),
 			singlePlay:0,  // 单一
     		multiple:multiple,
     		numberObject:numberObject,
     		noteCount:zhushu,
     		totalAmt:totalAmt,
     		playId:lotTypeplay,
     		lotCode:lotTypeCode,
     		investType:investType,
     		isZjStop:isStop,
     		buySource:buySource,
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


function getBuyCode(){
	var dancodes=[];
	var tuocodes=[];
	index.gameList.each(function(o,i){
		var choose ="" ;
		for(var j = 0 ; j < o.chks.length ; j++){
			choose = choose + o.chks[j].split("_")[1] ;
			if(j < o.chks.length-1){
				choose=choose+"," ;
			}
		}
		if(o.dan=="1"){
			dancodes.push(o.gdate+"|"+o.cnumber+"|"+choose);
		}else{
			tuocodes.push(o.gdate+"|"+o.cnumber+"|"+choose);
		}
	});
	
	if(dancodes.length>0){
		return dancodes.join("/")+"#"+tuocodes.join("/");
	}else{
		return tuocodes.join("/");
	}
};


function forEach(o,f,z){
	if(o){
	for(var i=0,j=o.length;i<j;i++){
	if(false===f.call(z||o[i],o[i],i,o,j)){
	break;}}}
	return z||o;
}
