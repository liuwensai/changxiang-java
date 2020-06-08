var jczq={};
jczq.lotid=9;
jczq.playId=9006;
jczq.gameList=[];   //   存放所有选择 对阵对象
jczq.GuoGuanType=2; //   2是自由过关,3是多串过关
jczq.bs=1;		   //   默认的倍数=1
jczq.ggType=[];	   //   存放选择的过关方式
jczq.totalMoney=0;  //   总金额
jczq.totalZs=0;     //   总注数
jczq.sslist=[];     //   联赛

//混投 玩法 开售值
jczq.ablePlay_rqspf=1; 
jczq.ablePlay_bf=2;
jczq.ablePlay_jqs=4;
jczq.ablePlay_bqc=8;
jczq.ablePlay_spf=16;

var daytpl = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
var daytpl2 = ["","周一","周二","周三","周四","周五","周六","周天"];
var ggtype_tpl = ["","一","二","三","四","五","六","七","八"];
var play_tpl = {"spf":9005,"rqspf":9001,"bf":9003,"jqs":9002,"bqc":9004};
var play_text_tpl = {"9005":{"9005_3":"胜","9005_1":"平","9005_0":"负"},"9001":{"9001_3":"胜","9001_1":"平","9001_0":"负"},"9003":{"9003_90":"胜其他","9003_10":"1:0","9003_20":"2:0","9003_21":"2:1","9003_30":"3:0","9003_31":"3:1","9003_32":"3:2","9003_40":"4:0","9003_41":"4:1","9003_42":"4:2","9003_50":"5:0","9003_51":"5:1","9003_52":"5:2","9003_99":"平其他","9003_00":"0:0","9003_11":"1:1","9003_22":"2:2","9003_33":"3:3","9003_09":"负其他","9003_01":"0:1","9003_02":"0:2","9003_12":"1:2","9003_03":"0:3","9003_13":"1:3","9003_23":"2:3","9003_04":"0:4","9003_14":"1:4","9003_24":"2:4","9003_05":"0:5","9003_15":"1:5","9003_25":"2:5"},"9002":{"9002_0":"0","9002_1":"1","9002_2":"2","9002_3":"3","9002_4":"4","9002_5":"5","9002_6":"6","9002_7":"7+"},"9004":{"9004_33":"胜胜","9004_31":"胜平","9004_30":"胜负","9004_13":"平胜","9004_11":"平平","9004_10":"平负","9004_33":"胜胜","9004_03":"负胜","9004_01":"负平","9004_00":"负负"}};
var oddsData = {};

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
		serData=r_data;
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
	
	for(var i = 0; i < curData.length; i++){
		var matchdata = curData[i];
		// 对阵日期
		matchObj.matchDate = matchdata[0].matchDate;
		matchObj.match_data_str = dateFMT(matchObj.matchDate+"");
		matchObj.match_count=matchdata.length;
		// 对阵数据
		for(var k = 0; k < matchdata.length; k++){
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
			
			// 开售玩法
			if((matchdata[k].blendMark&jczq.ablePlay_rqspf)==jczq.ablePlay_rqspf){
				matchk.ht_rqspf_sale=1; 
			}else{
				matchk.ht_rqspf_sale=0;
			}
			
			if((matchdata[k].blendMark&jczq.ablePlay_bf)==jczq.ablePlay_bf){
				matchk.ht_bf_sale=1; 
			}else{
				matchk.ht_bf_sale=0;
			}
			
			if((matchdata[k].blendMark&jczq.ablePlay_jqs)==jczq.ablePlay_jqs){
				matchk.ht_jqs_sale=1; 
			}else{
				matchk.ht_jqs_sale=0;
			}
			
			if((matchdata[k].blendMark&jczq.ablePlay_bqc)==jczq.ablePlay_bqc){
				matchk.ht_bqc_sale=1; 
			}else{
				matchk.ht_bqc_sale=0;
			}
			
			if((matchdata[k].blendMark&jczq.ablePlay_spf)==jczq.ablePlay_spf){
				matchk.ht_spf_sale=1; 
			}else{
				matchk.ht_spf_sale=0;
			}
			// 设置赔率集合
			var oddsList={};
			var def = "-";
			
			oddsList.ht_spf_sale=matchk.ht_spf_sale;
			oddsList.ht_rqspf_sale=matchk.ht_rqspf_sale;
			oddsList.ht_bf_sale=matchk.ht_bf_sale;
			oddsList.ht_jqs_sale=matchk.ht_jqs_sale;
			oddsList.ht_bqc_sale=matchk.ht_bqc_sale;
			
			// 胜平负
			if(matchdata[k].oddsSpfg && matchk.ht_spf_sale==1){
				matchk.odds_spfg = matchdata[k].oddsSpfg;
				var oddsArray = matchk.odds_spfg.split(",");
				var odds={};
				var odds_2={};
				odds["9005_3"] = oddsArray[0];
				odds["9005_1"] = oddsArray[1];
				odds["9005_0"] = oddsArray[2];
				odds_2.sodd = oddsArray[0];
				odds_2.podd = oddsArray[1];
				odds_2.fodd = oddsArray[2];
				matchk.spfodds=odds_2;
				oddsList.spf=odds;
			}else{
				matchk.odds_spfg = matchdata[k].oddsSpfg;
				var odds={};
				var odds_2={};
				odds_2.sodd = def;
				odds_2.podd = def;
				odds_2.fodd = def;
				odds["9005_3"] = def;
				odds["9005_1"] = def;
				odds["9005_0"] = def;
				matchk.spfodds=odds_2;
				oddsList.spf=odds;
			}
			// 让球胜平负
			if(matchdata[k].oddsRqspfg && matchk.ht_rqspf_sale==1){
				matchk.odds_rqspfg = matchdata[k].oddsRqspfg;
				var oddsArray = matchk.odds_rqspfg.split(",");
				var odds={};
				var odds_2={};
				odds["9001_3"] = oddsArray[0];
				odds["9001_1"] = oddsArray[1];
				odds["9001_0"] = oddsArray[2];
				odds_2.sodd = oddsArray[0];
				odds_2.podd = oddsArray[1];
				odds_2.fodd = oddsArray[2];
				matchk.rqspfodds=odds_2;
				oddsList.rqspf=odds;
			}else {
				matchk.odds_rqspfg = matchdata[k].oddsRqspfg;
				var odds={};
				var odds_2={};
				odds_2.sodd = def;
				odds_2.podd = def;
				odds_2.fodd = def;
				odds["9001_3"] = def;
				odds["9001_1"] = def;
				odds["9001_0"] = def;
				matchk.rqspfodds=odds_2;
				oddsList.rqspf=odds;
			}
			// 比分
			if(matchdata[k].oddsBf && matchk.ht_bf_sale==1){
				var oddsArray = matchdata[k].oddsBf.split(",");
				var odds={};
				odds["9003_90"] = oddsArray[0];
				odds["9003_10"] = oddsArray[1];
				odds["9003_20"] = oddsArray[2];
				odds["9003_21"] = oddsArray[3];
				odds["9003_30"] = oddsArray[4];
				odds["9003_31"] = oddsArray[5];
				odds["9003_32"] = oddsArray[6];
				odds["9003_40"] = oddsArray[7];
				odds["9003_41"] = oddsArray[8];
				odds["9003_42"] = oddsArray[9];
				odds["9003_50"] = oddsArray[10];
				odds["9003_51"] = oddsArray[11];
				odds["9003_52"] = oddsArray[12];
				odds["9003_99"] = oddsArray[13];
				odds["9003_00"] = oddsArray[14];
				odds["9003_11"] = oddsArray[15];
				odds["9003_22"] = oddsArray[16];
				odds["9003_33"] = oddsArray[17];
				odds["9003_09"] = oddsArray[18];
				odds["9003_01"] = oddsArray[19];
				odds["9003_02"] = oddsArray[20];
				odds["9003_12"] = oddsArray[21];
				odds["9003_03"] = oddsArray[22];
				odds["9003_13"] = oddsArray[23];
				odds["9003_23"] = oddsArray[24];
				odds["9003_04"] = oddsArray[25];
				odds["9003_14"] = oddsArray[26];
				odds["9003_24"] = oddsArray[27];
				odds["9003_05"] = oddsArray[28];
				odds["9003_15"] = oddsArray[29];
				odds["9003_25"] = oddsArray[30];
				oddsList.bf=odds;
			}else{
				var odds={};
				odds["9003_90"] = def;
				odds["9003_10"] = def;
				odds["9003_20"] = def;
				odds["9003_21"] = def;
				odds["9003_30"] = def;
				odds["9003_31"] = def;
				odds["9003_32"] = def;
				odds["9003_40"] = def;
				odds["9003_41"] = def;
				odds["9003_42"] = def;
				odds["9003_50"] = def;
				odds["9003_51"] = def;
				odds["9003_52"] = def;
				odds["9003_99"] = def;
				odds["9003_00"] = def;
				odds["9003_11"] = def;
				odds["9003_22"] = def;
				odds["9003_33"] = def;
				odds["9003_09"] = def;
				odds["9003_01"] = def;
				odds["9003_02"] = def;
				odds["9003_12"] = def;
				odds["9003_03"] = def;
				odds["9003_13"] = def;
				odds["9003_23"] = def;
				odds["9003_04"] = def;
				odds["9003_14"] = def;
				odds["9003_24"] = def;
				odds["9003_05"] = def;
				odds["9003_15"] = def;
				odds["9003_25"] = def;
				oddsList.bf=odds;
			}
			// 进球数
			if(matchdata[k].oddsJqsg && matchk.ht_jqs_sale==1){
				var odds={};
				var oddsArray = matchdata[k].oddsJqsg.split(",");
				odds["9002_0"] = oddsArray[0];
				odds["9002_1"] = oddsArray[1];
				odds["9002_2"] = oddsArray[2];
				odds["9002_3"] = oddsArray[3];
				odds["9002_4"] = oddsArray[4];
				odds["9002_5"] = oddsArray[5];
				odds["9002_6"] = oddsArray[6];
				odds["9002_7"] = oddsArray[7];
				oddsList.jqs=odds;
			}else{
				var odds={};
				odds["9002_0"] = def;
				odds["9002_1"] = def;
				odds["9002_2"] = def;
				odds["9002_3"] = def;
				odds["9002_4"] = def;
				odds["9002_5"] = def;
				odds["9002_6"] = def;
				odds["9002_7"] = def;
				oddsList.jqs=odds;
			}
			// 半全场
			if(matchdata[k].oddsBqcg && matchk.ht_bqc_sale==1){
				var odds={};
				var oddsArray = matchdata[k].oddsBqcg.split(",");
				odds["9004_33"] = oddsArray[0];
				odds["9004_31"] = oddsArray[1];
				odds["9004_30"] = oddsArray[2];
				odds["9004_13"] = oddsArray[3];
				odds["9004_11"] = oddsArray[4];
				odds["9004_10"] = oddsArray[5];
				odds["9004_03"] = oddsArray[6];
				odds["9004_01"] = oddsArray[7];
				odds["9004_00"] = oddsArray[8];
				oddsList.bqc=odds;
			}else{
				var odds={};
				odds["9004_33"] = def;
				odds["9004_31"] = def;
				odds["9004_30"] = def;
				odds["9004_13"] = def;
				odds["9004_11"] = def;
				odds["9004_10"] = def;
				odds["9004_03"] = def;
				odds["9004_01"] = def;
				odds["9004_00"] = def;
				oddsList.bqc=odds;
			}
			// 保存赔率集合
			oddsData[matchk.cc_number]=oddsList;
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
				span.html(parseInt(span.html(), 10)+match[i].matchList.length);
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

//展开投注内容 取消
function closeTouzhu(){
	$("#showMoreOpt").hide();
}

//展开投注内容
function expandTouzhu(obj){
	var e_obj = $(obj);
	var ccnumber = e_obj.attr("ccnumber");
	var e_div = $(".table-select");
	var flag = e_obj.attr("flag");
	
	var match_div = $("div[cnumber='"+ccnumber+"']");
	var rq = match_div.attr("rq");
	var hometeam = match_div.attr("hometeam");
	var guestteam = match_div.attr("guestteam");
	
	var odds = oddsData[ccnumber+""];
	var odds_spf = odds.spf;
	var odds_rqspf = odds.rqspf;
	var odds_bf = odds.bf;
	var odds_jqs = odds.jqs;
	var odds_bqc = odds.bqc;
	// 设置赔率
	e_div.find("i[opt='spf']").each(function(i,o){
		var $o = $(o);
		var t = $o.attr("cvalue");
		if(t=="9005_3"){
			$o.html("胜 "+odds_spf[t]);
		}else if(t=="9005_1"){
			$o.html("平 "+odds_spf[t]);
		}else if(t=="9005_0"){
			$o.html("负 "+odds_spf[t]);
		}
		$o.attr("class","tzb");
		$(o).attr("odds",odds_spf[t]);
	});
	
	e_div.find("i[opt='rqspf']").each(function(i,o){
		var $o = $(o);
		var t = $o.attr("cvalue");
		if(t=="9001_3"){
			$o.html("胜 "+odds_rqspf[t]);
		}else if(t=="9001_1"){
			$o.html("平 "+odds_rqspf[t]);
		}else if(t=="9001_0"){
			$o.html("负 "+odds_rqspf[t]);
		}
		$o.attr("class","tzb");
		$(o).attr("odds",odds_rqspf[t]);
	});
	
	$("td[opt='bf']").each(function(i,o){
		var $o = $(o).find("i[name=\"bf_odds\"]");
		var t = $(o).attr("cvalue");
		$o.html(odds_bf[t]);
		$(o).attr("class","jczq");
		$(o).attr("odds",odds_bf[t]);
	});
	
	$("td[opt='jqs']").each(function(i,o){
		var $o = $(o).find("i[name=\"jqs_odds\"]");
		var t = $(o).attr("cvalue");
		$o.html(odds_jqs[t]);
		$(o).attr("class","jczq");
		$(o).attr("odds",odds_jqs[t]);
	});
	
	$("td[opt='bqc']").each(function(i,o){
		var $o = $(o).find("i[name=\"bqc_odds\"]");
		var t = $(o).attr("cvalue");
		$o.html(odds_bqc[t]);
		$(o).attr("class","jczq");
		$(o).attr("odds",odds_bqc[t]);
	});
	
	$("#home_name").html(hometeam);
	$("#guest_name").html(guestteam);
	if(rq<0){
		e_div.find("span[rq='rq']").html(rq+"&nbsp;").attr("class","green");
	}else{
		e_div.find("span[rq='rq']").html("+"+rq+"&nbsp;").attr("class","red");
	}
	
	// 选中投注内容
	jczq.gameList.each(function(o,i){
		if(o.cnumber==ccnumber){
			for(var k=0;k<o.chks.length;k++){
				var cvalue = o.chks[k];
				if(cvalue.indexOf("9001")>-1 || cvalue.indexOf("9005")>-1){
					$(".table-select").find("i[name='click_tzb'][cvalue='"+o.chks[k]+"']").attr("class","tzb winselect");
				}else{
					$(".table-select").find("td[name='click_tzb'][cvalue='"+o.chks[k]+"']").attr("class","jczq winselect");
				}
			}
		}
	});
	//$("#extend_"+ccnumber).addClass("winselect");
	$("#showMoreOpt").attr("flag",flag);
	$("#showMoreOpt").attr("ccnumber",ccnumber);
	$("#showMoreOpt").show();
}

//  展开投注内容 - 确认投注信息
function confirmTouzhuInfo(){
	
	var _div = $("#showMoreOpt");
	var ccnumber = _div.attr("ccnumber");
	var flag = _div.attr("flag");
	var e_div = $("div[cnumber='"+ccnumber+"']");
	// 清除样式
	e_div.find("i[name='click_tzb']").attr("class","tzb");
	var select_i = $(".table-select").find("i[name='click_tzb'][class='tzb winselect']");
	var select_td = $(".table-select").find("td[name='click_tzb'][class='jczq winselect']");
	var select_info=[];
	// 删除对阵 然后重新添加
	for ( var i = 0, j = jczq.gameList.length; i < j; i++) {
		if (jczq.gameList[i].cnumber == ccnumber) {
			jczq.gameList.splice(i,1);
			break;
		}
	}
	var maxNum=0;
	// 选号
	select_i.each(function(i,o){
		var opt = $(o).attr("opt");
		var flag = checkChooseNumber(e_div);
		if(flag!=-1){
			updateChooseNumber(play_tpl[opt],o,flag);
		}else{
			if(jczq.gameList.length>=14){
				open_message("最多选择14场比赛");
				maxNum=14;
				return;
			}
			chooseNumber(e_div,o);
			maxNum=jczq.gameList.length;
		}
		var cvalue = $(o).attr("cvalue");
		var playid = cvalue.split("_")[0];
		e_div.find("i[name='click_tzb'][cvalue='"+cvalue+"']").addClass("winselect");
		select_info.push(play_text_tpl[playid][cvalue]);
	});
	select_td.each(function(i,o){
		var opt = $(o).attr("opt");
		var flag = checkChooseNumber(e_div);
		if(flag!=-1){
			updateChooseNumber(play_tpl[opt],o,flag);
		}else{
			if(jczq.gameList.length>=14){
				open_message("最多选择14场比赛");
				maxNum=14;
				return;
			}
			chooseNumber(e_div,o);
			maxNum=jczq.gameList.length;
		}
		var cvalue = $(o).attr("cvalue");
		var playid = cvalue.split("_")[0];
		select_info.push(play_text_tpl[playid][cvalue]);
	});
	
	// 判断是否是投注页面的点击事件 
	if(flag=="ht_bet"){
		
		if(select_td.length==0&&select_i.length==0){
			clearDan();
			$("#extend_bet_"+ccnumber).removeClass("winselect").html("点击展开投注选项");
		}else{
			var text = select_info.join(" ");
			var showtext = text.length>14?text.substr(0,14)+"...":text;
			$("#extend_bet_"+ccnumber).addClass("winselect").html(showtext);
		}
		// 修改过关方式
		changeGgType();
		updateBuyInfo();//更新投注信息
		
	}
	
	if(maxNum<=14){
		// 展开是否标红
		if(select_td.length>0){
			$("#extend_"+ccnumber).addClass("winselect");
		}else{
			$("#extend_"+ccnumber).removeClass("winselect");
		}
		
		if(jczq.gameList.length>1){
			$("#selcs").html("已选择"+jczq.gameList.length+"场比赛");
			$(".m-submit_box").removeClass("disabled");
		}else{
			$("#selcs").html("请至少选择1场比赛");
			$(".m-submit_box").addClass("disabled");
		}
	}
	$("#showMoreOpt").hide();
}

// 展开 选号事件
function selectMoreOpt(obj){
	var ccnumber = $("#showMoreOpt").attr("ccnumber");
	var e_obj = $(obj);
	var opt = e_obj.attr("opt");
	var odds = oddsData[ccnumber];
	// 检验开售
	var sale_spf = odds.ht_spf_sale;
	var sale_rqspf = odds.ht_rqspf_sale;
	var sale_bf = odds.ht_bf_sale;
	var sale_jqs = odds.ht_jqs_sale;
	var sale_bqc = odds.ht_bqc_sale;
	
	if(opt=="spf" && sale_spf==1){
		changeState(e_obj);
	}else if(opt=="rqspf" && sale_rqspf==1){
		changeState(e_obj);
	}else if(opt=="bf" && sale_bf==1){
		changeState(e_obj);
	}else if(opt=="jqs" && sale_jqs==1){
		changeState(e_obj);
	}else if(opt=="bqc" && sale_bqc==1){
		changeState(e_obj);
	}
}

// 改变 选择状态
function changeState(obj){
	if(obj.attr("class") == "jczq"){
		obj.attr("class","jczq winselect");
	} else if (obj.attr("class") == "tzb"){
		obj.attr("class","tzb winselect");
	}else{
		obj.removeClass("winselect");
	}
}


// 胜平负选号
function xuanhao(obj){
	var _obj = $(obj);
	var opt = _obj.attr("opt");
	if(_obj.attr("class")=="tzb winselect"){
		_obj.attr("class","tzb");
	}else{
		_obj.attr("class","tzb winselect");
	}
	var buy_parent = _obj.parent().parent().parent().parent();
	// 保存数据
	var flag = checkChooseNumber(buy_parent);
	
	if(flag!=-1){
		updateChooseNumber(play_tpl[opt],_obj,flag);
	}else{
		if(jczq.gameList.length>=14){
			open_message("最多选择14场比赛");
			maxNum=14;
			return;
		}
		chooseNumber(buy_parent,_obj);
		maxNum=jczq.gameList.length;
	}
	
	if(jczq.gameList.length>1){
		$("#selcs").html("已选择"+jczq.gameList.length+"场比赛");
		$(".m-submit_box").removeClass("disabled");
	}else{
		$("#selcs").html("请至少选择2场比赛");
		$(".m-submit_box").addClass("disabled");
	}
} 


function checkChooseNumber(obj){
	// 选中对阵cid
	var ccnumber = $(obj).attr("cnumber");
	var flag = -1;
	for ( var i = 0, j = jczq.gameList.length; i < j; i++) {
		if (jczq.gameList[i].cnumber == ccnumber) {
			flag = i;
		}
	}
	return flag;
}


/**
 * obj 对阵属性<div>
 * objele 选择的胜平负属性<i>
 * 添加选中对象
 */
function chooseNumber(obj,objele){
	var opt = $(objele).attr("opt");
	var paid = play_tpl[opt];
	var singleInfo = {
		suffix : obj.attr('suffix'),// 用来排序的下标 标示
		cid : obj.attr('cid'), // 赛事ID
		cnumber : obj.attr('cnumber'), // 完整编号 1001
		cname : getMatchName(obj.attr('cnumber')), // 周一001
		gname : obj.attr('gname'), // 完整名称
		gdate : obj.attr('gdate'), // 完整日期
		hometeam : obj.attr('hometeam'), // 主队
		guestteam : obj.attr('guestteam'), // 客队
		gendtime : obj.attr('gendtime'), // 截止时间
		rq : obj.attr('rq'), // 截止时间
		dan : "0", // 1为胆 0不为胆
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
			if ($(chks).attr("class")==="jczq winselect") {
				ret[d][paid] = $(chks).attr("pval");
			}else if($(chks).attr("class")==="tzb winselect"){
				ret[d][paid] = $(chks).attr("pval");
			}
			return ret;
		}(objele)),
		chks : (function(chks) {
			var ret = [];
			if ($(chks).attr("class")==="jczq winselect") {
				ret.push($.trim($(chks).attr("cvalue")));
			}else if($(chks).attr("class")==="tzb winselect"){
				ret.push($.trim($(chks).attr("cvalue")));
			}
			// 选择的投注内容数组
			return ret;
		})(objele),
		selectedSP : (function(chks) {
			var ret = [];
			if ($(chks).attr("class")==="jczq winselect") {
				ret.push($.trim($(chks).attr("odds")));
			}else if($(chks).attr("class")==="tzb winselect"){
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
		if ($(objele).attr("class")==="jczq winselect"){
			
			jczq.gameList[k].chks.push($.trim($(objele).attr("cvalue")));
			jczq.gameList[k].selectedSP.push($.trim($(objele).attr("odds")));
			chos.push($(objele).attr("pval"));
			
		}else if($(objele).attr("class")==="tzb winselect"){
			
			jczq.gameList[k].chks.push($.trim($(objele).attr("cvalue")));
			jczq.gameList[k].selectedSP.push($.trim($(objele).attr("odds")));
			chos.push($(objele).attr("pval"));
			
		}else{
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
	var s_danLen = $("ul[id='tobuy_matchList']").find("i[name='dan'][class='jczqsd-qrpage winselect']").length;
	
	// 设胆
	var dan_class =	$("#tobuy_match_"+cid).find("i[name='dan']");
	jczq.gameList.each(function(o,i){
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
			var ccnumber = jczq.gameList[i].cnumber;
			var parent = $("div[suffix='"+suffix+"'][cid='"+cid+"']") ;
			for(var a = 0 ; a < chks.length ; a++){
				if(chks[a]=="9005_3" || chks[a]=="9005_1" || chks[a]=="9005_0" ||
				    chks[a]=="9001_3" || chks[a]=="9001_1" ||chks[a]=="9001_0"){
					
					parent.find("i[cvalue='"+chks[a]+"']").attr("class" , "tzb winselect");
				}else{
					$("#extend_"+ccnumber).addClass("winselect");
				}
			}
		}
		$("#selcs").html("已选择"+jczq.gameList.length+"场比赛");
		$(".m-submit_box").removeClass("disabled");
		
		// 回显确认投注页面
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
	
	$("i[name='dan']").attr("class","jczqsd-qrpage");
	
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
				$("div[cid='"+cid+"']").find("i[cvalue='"+o.chks[k]+"']").removeClass("winselect");
			}
			$("#extend_"+o.cnumber).removeClass("winselect");
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
	
	if(jczq.gameList.length>1){
		$("#selcs").html("已选择"+jczq.gameList.length+"场比赛");
		$(".m-submit_box").removeClass("disabled");
	}else{
		$("#selcs").html("请至少选择2场比赛");
		$(".m-submit_box").addClass("disabled");
	}
	
	// 修改过关方式
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
	$("#maxjj").html("最大奖金："+Math.round(maxjj*parseInt(jczq.bs||1, 10)*100)/100+"元");
	$("#touzhu_money").html("共"+jczq.totalMoney+"元");
	
}

// 生成模板数据
function formatGameList(){
	for(var i=0;i<jczq.gameList.length;i++){
		var showText = [];
		var chks = jczq.gameList[i].chks;
		for(var k=0;k<chks.length;k++){
			var playid = chks[k].split("_");
			showText.push(play_text_tpl[playid[0]][chks[k]]);
		}
		var text = showText.join(" ");
		var stext = text.length>14?text.substr(0,14)+"...":text;
		jczq.gameList[i].showtext=stext;
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
		write_temp_login("ht_lotCode" , jczq.lotid) ;
		write_temp_login("ht_gameList" , getListStr(jczq.gameList)) ;
		write_temp_login("ht_ggType" , getListStr(jczq.ggType) ) ;
		write_temp_login("ht_bs" , jczq.bs ) ;
		//write_temp_login("ht_zs" , jczq.totalZs) ;
		var bakUrl = "/v3shtml/trade/jczq/ht.shtml" ;
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
