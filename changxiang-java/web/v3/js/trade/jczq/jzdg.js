var jczq={};
jczq.lotid=9;
jczq.playId=9006;
jczq.spfPlayId=9005;
jczq.rqspfPlayId=9001;
jczq.gameList=[]; 	 // 存放所有选择 对阵对象
jczq.GuoGuanType=2;  // 2是自由过关,3是多串过关
jczq.bs=1;			 //默认的倍数=1
jczq.ggType=[];	   //存放选择的过关方式
jczq.totalMoney=0;  //总金额
jczq.totalZs=0;     //总注数
jczq.sslist=[];    // 联赛
jczq.ablePlay_rqspf=1;
jczq.ablePlay_spf=128;

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
			if(((tempObj.ablePlay&jczq.ablePlay_spf)==jczq.ablePlay_spf)
					|| ((tempObj.ablePlay&jczq.ablePlay_rqspf)==jczq.ablePlay_rqspf)){
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
			
			matchk.jzdg_rqspf_sale=0;
			matchk.jzdg_spf_sale=0;
			if((matchdata[k].ablePlay&jczq.ablePlay_rqspf)==jczq.ablePlay_rqspf){
				matchk.jzdg_rqspf_sale=1; // 让球胜平负单关开售
			}
			if((matchdata[k].ablePlay&jczq.ablePlay_spf)==jczq.ablePlay_spf){
				matchk.jzdg_spf_sale=1; // 胜平负单关开售
			}
			
			if(matchdata[k].oddsSpfg && matchk.jzdg_spf_sale==1){
				matchk.odds_spfg = matchdata[k].oddsSpfg;
				var oddsArray = matchk.odds_spfg.split(",");
				var odds={};
				odds.sodd = oddsArray[0];
				odds.podd = oddsArray[1];
				odds.fodd = oddsArray[2];
				matchk.spfodds=odds;
			}else{
				matchk.odds_spfg = matchdata[k].oddsSpfg;
				var odds={};
				odds.sodd = "-";
				odds.podd = "-";
				odds.fodd = "-";
				matchk.spfodds=odds;
			}
			
			if(matchdata[k].oddsRqspfg && matchk.jzdg_rqspf_sale==1){
				matchk.odds_rqspfg = matchdata[k].oddsRqspfg;
				var oddsArray = matchk.odds_rqspfg.split(",");
				var odds={};
				odds.sodd = oddsArray[0];
				odds.podd = oddsArray[1];
				odds.fodd = oddsArray[2];
				matchk.rqspfodds=odds;
			}else{
				matchk.odds_rqspfg = matchdata[k].oddsRqspfg;
				var odds={};
				odds.sodd = "-";
				odds.podd = "-";
				odds.fodd = "-";
				matchk.rqspfodds=odds;
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
		$("#querenbtn").hide();
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
}

// 加载更多对阵数据
function showMatchForPage(){
	if(pageNumber==0){
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

function xuanhao(obj){
	
	if($(obj).attr("class")=="tzb winselect"){
		$(obj).attr("class","tzb");
	}else{
		$(obj).attr("class","tzb winselect");
	}
	var buy_parent = $(obj).parent().parent();
	// 保存数据
	chooseNumber(buy_parent,$(obj));
	
	updateBuyInfo();
	
	if(jczq.gameList.length>0){
		$("#selcs").hide();
		$("#maxjj").show();
		$(".m-submit_box").removeClass("disabled");
	}else{
		$("#maxjj").hide();
		$("#touzhu_money").html("");
		$("#selcs").show();
		$(".m-submit_box").addClass("disabled");
	}
} 


/**
 * obj 对阵属性<div>
 * objele 选择的胜平负属性<i>
 */
function chooseNumber(obj,objele){
	// 玩法id
	var paid = obj.attr("paid");
	// 选中对阵cid
	var cid = obj.attr("cid");
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
			win : obj.attr('sodd'), // 胜的赔率
			draw : obj.attr('podd'), // 平的赔率
			lost : obj.attr('fodd'), // 负的赔率
			gendtime : obj.attr('gendtime'), // 截止时间
			rq : obj.attr('rq'), // 截止时间
			dan : obj.attr('dan'), // 1为胆 0不为胆
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
		if ($(objele).attr("class")==="tzb winselect"){
			
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

// 保存玩法筛选信息
var jczqWfData = new Array();

//赛事赛选 确认
function wfDoSelect(){
	
	var kxLens=0; // 记录玩法的长度
	var chk = $("#findmatch").find("i[class='i-chkbox winselect']");
	if(chk.length>0){
		chk.each(function(){
			var sxpid = $(this).attr("sxpid");
			kxLens+=$("div[name='clow'][paid='"+sxpid+"']").length;
		});
	}else{
		alert("至少保留一种可选玩法");
		return;
	}
	
	if(kxLens<=0){
		alert("至少保留一种可选玩法");
		return;
	}
	// 保存筛选玩法信息  重置
	jczqWfData = new Array();
	// 遍历
	$("#findmatch").find("i").each(function(){
		var __this =  $(this);
		var sxpid = __this.attr("sxpid");
		if($(this).hasClass("winselect")){
			$("li[name='game_li_item']").each(function(i,o){
				var __o = $(o);
				var s = __o.attr("s");
				var r = __o.attr("r");
				var o_div = __o.find("div[name='clow'][paid='"+sxpid+"']");
				if(o_div.length>0){  // 胜平负 让球胜平负 玩法全开
					o_div.show();
					if(sxpid==9005&&r==0){
						 __o.show();
					}else if(sxpid==9001&&s==0){
						 __o.show();
					}
					// 控制选项和对阵名称之间的间距
					if(sxpid==9001 && s==1 && jczqWfData.contains("9005")){
						o_div.removeClass("top-dis").addClass("xiaochutop");
					}else{
						o_div.removeClass("xiaochutop").addClass("top-dis");
					}
				}
			});
			jczqWfData.push(sxpid);
		}else{
			// $("div[name='clow'][paid='"+sxpid+"']").hide();
			$("li[name='game_li_item']").each(function(i,o){
				var __o = $(o);
				var s = __o.attr("s");
				var r = __o.attr("r");
				var o_div = __o.find("div[name='clow'][paid='"+sxpid+"']");
				if(o_div.length>0){
					o_div.hide();
					if(sxpid==9005 && s==1 && r==0){
						__o.hide();
					}else if(sxpid==9001 && s==0 && r==1){
						__o.hide();
					}
				}
			});
			var tempGameList = jczq.gameList;
			// 删除数据
			tempGameList.each(function(o,i){
				var wf_div = $("div[name='clow'][paid='"+sxpid+"']");
				if(wf_div.length>0){
					wf_div.each(function(e,t){
						// 删除玩法 模拟选号事件
						var obj = $(t).find("i[name='click_tzb'][class='tzb winselect']");
						if(obj.length>0){
							for(var j=0;j<obj.length;j++){
								xuanhao(obj[j]);
							}
						}
					});
				}
			});
			tempGameList=[];
		}
	});
	$(".g-dialog_boxnew").hide();
}


//赛事筛选
function wfOpenFilterDiv(){
	
	if(jczqWfData.length<=0){
		jczqWfData=["9001","9005"];
	}
	// 清除所有选中
	$("#findmatch").find("i").removeClass("winselect");
	// 重新选中筛选玩法
	for(var i=0;i<jczqWfData.length;i++){
		$("#findmatch").find("i[sxpid='"+jczqWfData[i]+"']").addClass("winselect");
		//$("div[name='clow'][paid='"+sxpid+"']").show();
	}
	$(".g-dialog_boxnew").show();
}

function wfCloseFilterDiv(){
	$(".g-dialog_boxnew").hide();
}

// 绑定赛事赛选按钮
function bangding_ss(obj){
	$(obj).toggleClass("winselect");
}

// 将 localstorage 的值 回显示
function backGameList(){
	if(jczq.gameList.length > 0){
		// 回显选号页面
		for (var i = 0; i < jczq.gameList.length; i++) {
			var chks = jczq.gameList[i].chks ;
			var suffix = jczq.gameList[i].suffix ;
			var cid = jczq.gameList[i].cid;
			var parent = $("div[suffix='"+suffix+"'][cid='"+cid+"']") ;
			for(var a = 0 ; a < chks.length ; a++){
				if(chks[a]=="9005_3"){
					parent.find("i[cvalue='"+chks[a]+"']").attr("class" , "tzb winselect");
				} else if(chks[a]=="9005_1"){
					parent.find("i[cvalue='"+chks[a]+"']").attr("class" , "tzb winselect");
				} else if(chks[a]=="9005_0"){
					parent.find("i[cvalue='"+chks[a]+"']").attr("class" , "tzb winselect");
				}else if(chks[a]=="9001_3"){
					parent.find("i[cvalue='"+chks[a]+"']").attr("class" , "tzb winselect");
				} else if(chks[a]=="9001_1"){
					parent.find("i[cvalue='"+chks[a]+"']").attr("class" , "tzb winselect");
				} else if(chks[a]=="9001_0"){
					parent.find("i[cvalue='"+chks[a]+"']").attr("class" , "tzb winselect");
				}
			}
		}
		
		updateBuyInfo();
		
		if(jczq.gameList.length>0){
			$("#selcs").hide();
			$("#maxjj").show();
			$(".m-submit_box").removeClass("disabled");
		}else{
			$("#maxjj").hide();
			$("#touzhu_money").html("");
			$("#selcs").show();
			$(".m-submit_box").addClass("disabled");
		}
	}
}

// 更新购买信息
function updateBuyInfo(){
	// 注数、奖金范围
	jczq.totalZs=jczq.getZhushu();; //注数
	jczq.totalMoney=jczq.bs*jczq.totalZs*2; // 单倍 总金额
	var maxjj = jczq.predictMaxPrize(jczq.gameList);
	$("#touzhu_zs").html(jczq.totalZs+"注");
	$("#touzhu_bs").html(jczq.bs+"倍");
	$("#maxjj").html("最大奖金："+Math.round(maxjj*parseInt(jczq.bs||1, 10)*100)/100+"元");
	$("#touzhu_money").html(jczq.totalMoney+"元");
	
}

// 单关 过关方式
function jzdgInitGgType(){
	jczq.ggType=[];
	var type={};
	type.key="单关";
	type.val=1;
	jczq.ggType.push(type);
}


function toDoBuy(){
	confirmBuy(false);
	$("#doBuy").one('click',toDoBuy);
}

//线下订单
function toOfflineDoBuy(){
	confirmBuy(true);
	$("#offlineDoBuy").one('click' , toOfflineDoBuy) ;
}

// 确定投注 校验参数
function confirmBuy(isOffline){
	
	if(jczq.gameList.length < 1){
		open_message("请至少选择1场比赛");
		return ;
	}
	
	// 检查登陆
	if(!checkLoginByAjax()){		
		//保存数据
		write_temp_login("jzdg_lotCode" , jczq.lotid) ;
		write_temp_login("jzdg_gameList" , getListStr(jczq.gameList)) ;
		write_temp_login("jzdg_ggType" , getListStr(jczq.ggType) ) ;
		write_temp_login("jzdg_bs" , jczq.bs ) ;
		//write_temp_login("jzdg_zs" , jczq.totalZs) ;
		var bakUrl = "/v3shtml/trade/jczq/jzdg.shtml" ;
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

