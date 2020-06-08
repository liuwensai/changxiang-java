var sd = {};

sd.amtTotal = 0;// 总金额
sd.zs = 0;// 总注数
sd.playId = 51001;// 玩法id
sd.lotId = 51;// 彩种id
sd.numberList = [];// 号码List
sd.bs = 1;
sd.index = 0;

sd.lsoneList = [];
sd.lstwoList = [];
sd.lsthreeList = [];

var hzmap51005, hzmap51006, hzmap51007;

$(function(){	
	sd.index = 0;
	sd.playId = parseInt($.trim($("#playId").val()));

	if(sd.playId==51001){
		var missNumberMap = getJsonDataAndSetToVar("/data/trade/flc/number_miss_51001.json",false,null );
		if(missNumberMap){
				
				$("#baiweiNum td").find("a").each(function(){
					var key = parseInt($(this).text());
					var value = missNumberMap.baiMap[key];
					if(!value && value!=0){
						value = 0;
					}
					$(this).after("<br /><em class='gr9'>"+value+"</em>");
				});
				$("#shiweiNum td").find("a").each(function(){
					var key = parseInt($(this).text());
					var value = missNumberMap.shiMap[key];
					if(!value && value!=0){
						value = 0;
					}
					$(this).after("<br /><em class='gr9'>"+value+"</em>");
				});
				$("#geweiNum td").find("a").each(function(){
					var key = parseInt($(this).text());
					var value = missNumberMap.geMap[key];
					if(!value && value!=0){
						value = 0;
					}
					$(this).after("<br /><em class='gr9'>"+value+"</em>");
				});
			}
		
		}else if(sd.playId == 51005 || sd.playId == 51006 || sd.playId == 51007) {//直选和值和组选和值
			var missNumberMap = getJsonDataAndSetToVar("/data/trade/flc/number_miss_51005.json",false,null );
			if(missNumberMap){
				
				$("#hezhiTb td").find("a").each(function(){
					var key = parseInt($(this).text());
					var value = missNumberMap.map[key];
					if(!value && value!=0){
						value = 0;
					}
					$(this).after("<br /><em class='gr9'>"+value+"</em>");
				});
			}
		}
	
	switch(sd.playId){
		case 51001:
			sd.init_ZhiXuan();
			break;
		case 51002:
			sd.init_Zu3_Danshi();
			break;
		case 51003:
			sd.init_Zu3_Fushi();
			break;
		case 51004:
			sd.init_Zu6();
			break;
		case 51005:
			hzmap51005 = getJsonDataAndSetToVar("/data/trade/flc/he_zhi_51005.json",false,null);
			sd.init_ZhiXuan_Hezhi();
			break;
		case 51006:
			hzmap51006 = getJsonDataAndSetToVar("/data/trade/flc/he_zhi_51006.json",false,null);
			sd.init_Zu3_Hezhi();
			break;
		case 51007:
			hzmap51007 = getJsonDataAndSetToVar("/data/trade/flc/he_zhi_51007.json",false,null);
			sd.init_Zu6_Hezhi();
			break;
		default:
			break;
	}
	//
	$("#flc_head_title").click(function(){
		if($("#flc_head_title_choose").css("display") == "none"){
			$("#flc_head_title_choose").css("display", "");
		}else{
			$("#flc_head_title_choose").css("display", "none");
		}
	});
	//
	$("#fcsd_issuetop_title").click(function(){
		if($("#fcsd_issuetop_content").css("display") == "none"){
			$("#fcsd_issuetop_content").css("display", "");
			$(".dltinfo").css("padding-top",$("#fcsd_issuetop_content").find("tr").length*30+15);
		}else{
			$("#fcsd_issuetop_content").css("display", "none");
			$(".dltinfo").css("padding-top",0);
		}
	});

	$("#randomSele").click(function(){
		clearSelect();
		var randomBall = sd.randomSeleCreate();		
		var one = randomBall[0], two = randomBall[1], three = randomBall[2];
		if(sd.playId == 51001){
			$(".dltinfo").find(".dlyuan").each(function(){
				var place = $(this).parent().parent().parent().parent().attr('place');
				var numberCode = parseInt($.trim($(this).text()));
				if(place == 'baiwei' && numberCode == one || place == 'shiwei' && numberCode == two || place == 'gewei' && numberCode == three){
					$(this).click();
				}
			});
		}else if(sd.playId == 51002){
			$(".dltinfo").find(".dlyuan").each(function(){
				var place = $(this).parent().parent().parent().parent().attr('place');
				var numberCode = parseInt($.trim($(this).text()));
				if(place == 'chonghao' && numberCode == one || place == 'danhao' && numberCode == two){
					$(this).click();
				}
			});
		}else if(sd.playId == 51003){
			$(".dltinfo").find(".dlyuan").each(function(){
				var numberCode = parseInt($.trim($(this).text()));
				if(numberCode == one || numberCode == two){
					$(this).click();
				}
			});
		}else if(sd.playId == 51004){
			$(".dltinfo").find(".dlyuan").each(function(){
				var numberCode = parseInt($.trim($(this).text()));
				if(numberCode == one || numberCode == two || numberCode == three){
					$(this).click();
				}
			});
		}
		sd.caltotalZSAndMoney();
	});
	//	
	$("#flc_ggtype_" + sd.playId).attr("class", "gcmenu gcmenuon");
});

// 产生0-9 三位数
sd.randomSeleCreate = function(){
	var rdm = new Array();
	while(rdm.length < 3){
		var r = parseInt(Math.random() * 10);
		if(!rdm.contains(r)){
			rdm.push(r);
		}
	}
	return rdm;
};

// 直选
sd.init_ZhiXuan = function(){
	$(".dltinfo").find(".dlyuan").click(function(){
		var place = $(this).parent().parent().parent().parent().attr('place');
		var numberCode = parseInt($.trim($(this).text()));
		if($(this).attr("class") == "dlyuan"){
			$(this).removeClass("dlyuan");
			$(this).addClass("dlyuan dlredon");
			if(place == 'baiwei'){
				sd.lsoneList.push(numberCode);
			}else if(place == 'shiwei'){
				sd.lstwoList.push(numberCode);
			}else if(place == 'gewei'){
				sd.lsthreeList.push(numberCode);
			}
		}else{
			$(this).removeClass("dlyuan dlredon");
			$(this).addClass("dlyuan");
			if(place == 'baiwei'){
				sd.lsoneList.remove(numberCode);
			}else if(place == 'shiwei'){
				sd.lstwoList.remove(numberCode);
			}else if(place == 'gewei'){
				sd.lsthreeList.remove(numberCode);
			}
		}
		sd.eachZsMoney();
	});
};

// 组3单式
sd.init_Zu3_Danshi = function(){
	$(".dltinfo").find(".dlyuan").click(function(){
		var place = $(this).parent().parent().parent().parent().attr('place');
		var numberCode = parseInt($.trim($(this).text()));
		if($(this).attr("class") == "dlyuan"){
			$(this).removeClass("dlyuan");
			$(this).addClass("dlyuan dlredon");
			if(place == 'chonghao'){
				sd.lsoneList.push(numberCode);
			}else if(place == 'danhao'){
				sd.lstwoList.push(numberCode);
			}
		}else{
			$(this).removeClass("dlyuan dlredon");
			$(this).addClass("dlyuan");
			if(place == 'chonghao'){
				sd.lsoneList.remove(numberCode);
			}else if(place == 'danhao'){
				sd.lstwoList.remove(numberCode);
			}
		}
		sd.eachZsMoney();
	});
};
// 组3复试
sd.init_Zu3_Fushi = function(){
	$(".dltinfo").find(".dlyuan").click(function(){
		var numberCode = parseInt($.trim($(this).text()));
		if($(this).attr("class") == "dlyuan"){
			$(this).removeClass("dlyuan");
			$(this).addClass("dlyuan dlredon");
			sd.lsoneList.push(numberCode);
		}else{
			$(this).removeClass("dlyuan dlredon");
			$(this).addClass("dlyuan");
			sd.lsoneList.remove(numberCode);
		}
		sd.eachZsMoney();
	});
};
// 组6
sd.init_Zu6 = function(){
	$(".dltinfo").find(".dlyuan").click(function(){
		var numberCode = parseInt($.trim($(this).text()));
		if($(this).attr("class") == "dlyuan"){
			$(this).removeClass("dlyuan");
			$(this).addClass("dlyuan dlredon");
			sd.lsoneList.push(numberCode);
		}else{
			$(this).removeClass("dlyuan dlredon");
			$(this).addClass("dlyuan");
			sd.lsoneList.remove(numberCode);
		}
		sd.eachZsMoney();
	});
};
//直选和
sd.init_ZhiXuan_Hezhi = function(){
	$(".dltinfo").find(".dlyuan").click(function(){
		var numberCode = parseInt($.trim($(this).text()));
		if($(this).attr("class") == "dlyuan"){
			$(this).removeClass("dlyuan");
			$(this).addClass("dlyuan dlredon");
			sd.lsoneList.push(numberCode);
		}else{
			$(this).removeClass("dlyuan dlredon");
			$(this).addClass("dlyuan");
			sd.lsoneList.remove(numberCode);
		}
		sd.eachZsMoney();
	});
};
//组3和
sd.init_Zu3_Hezhi= function(){
	$(".dltinfo").find(".dlyuan").click(function(){
		var numberCode = parseInt($.trim($(this).text()));
		if($(this).attr("class") == "dlyuan"){
			$(this).removeClass("dlyuan");
			$(this).addClass("dlyuan dlredon");
			sd.lsoneList.push(numberCode);
		}else{
			$(this).removeClass("dlyuan dlredon");
			$(this).addClass("dlyuan");
			sd.lsoneList.remove(numberCode);
		}
		sd.eachZsMoney();
	});
};
//组6和
sd.init_Zu6_Hezhi= function(){
	$(".dltinfo").find(".dlyuan").click(function(){
		var numberCode = parseInt($.trim($(this).text()));
		if($(this).attr("class") == "dlyuan"){
			$(this).removeClass("dlyuan");
			$(this).addClass("dlyuan dlredon");
			sd.lsoneList.push(numberCode);
		}else{
			$(this).removeClass("dlyuan dlredon");
			$(this).addClass("dlyuan");
			sd.lsoneList.remove(numberCode);
		}
		sd.eachZsMoney();
	});
};

// 计算总金额,计算总注数
sd.caltotalZSAndMoney = function(){
	var beishu = $("#beishu").val();
	sd.bs = beishu;
	sd.zs = 0;
	sd.amtTotal = 0;
	// eachzs:1,eachmoney:1*2,
	sd.numberList.each(function(o, i){
		sd.zs += o.eachzs;
		sd.amtTotal += o.eachmoney * sd.bs;
	});
};
// 计算直选注数
sd.calZS_ZhiXuan = function(geweiBalls, shiweiBalls, baiweiBalls){
	return geweiBalls.length * shiweiBalls.length * baiweiBalls.length;
};
// 组三单
sd.calZS_Zu3_Danshi = function(chongBalls, danBalls){
	var icount = 0;
	for(var i = 0; i < chongBalls.length; i++){
		for(var j = 0; j < danBalls.length; j++){
			if(parseInt(chongBalls[i]) != parseInt(danBalls[j])){
				icount++;
			}
		}
	}
	return icount;
};
// 组三复
sd.calZS_Zu3_Fushi = function(balls){
	return balls.length * (balls.length - 1);
};
// 组6
sd.calZS_Zu6 = function(balls){
	return Cmn(balls.length, 3);
};
//直选和
sd.calZS_ZhiXuan_Hezhi = function(balls){
	var hz_note = 0;
	for(var i = 0,j=balls.length;i<j;i++) {				
		hz_note += eval(hzmap51005[parseInt(balls[i])]).noteCount;
	}
	return hz_note;
};
//组3和
sd.calZS_Zu3_Hezhi = function(balls){
	var hz_note = 0;
	for(var i = 0,j=balls.length;i<j;i++) {	;
		hz_note += eval(hzmap51006[parseInt(balls[i])]).noteCount;
	}
	return hz_note;
};
//组6和
sd.calZS_Zu6_Hezhi = function(balls){
	var hz_note = 0;
	for(var i = 0,j=balls.length;i<j;i++) {	
		hz_note += eval(hzmap51007[parseInt(balls[i])]).noteCount;
	}
	return hz_note;
};
//
sd.eachZsMoney = function(){
	var sdzs = 0;
	if(sd.playId == 51001){// 直选
		if(sd.lsoneList.length >= 1 && sd.lstwoList.length >= 1 && sd.lsthreeList.length >= 1){
			sdzs = sd.calZS_ZhiXuan(sd.lsthreeList, sd.lstwoList, sd.lsoneList);
		}
	}else if(sd.playId == 51002){
		if(sd.lsoneList.length >= 1 && sd.lstwoList.length >= 1){
			sdzs = sd.calZS_Zu3_Danshi(sd.lsoneList, sd.lstwoList);
		}
	}else if(sd.playId == 51003){
		if(sd.lsoneList.length >= 2){
			sdzs = sd.calZS_Zu3_Fushi(sd.lsoneList);
		}
	}else if(sd.playId == 51004){
		if(sd.lsoneList.length >= 3){
			sdzs = sd.calZS_Zu6(sd.lsoneList);
		}
	}else if(sd.playId == 51005){
		if(sd.lsoneList.length >=1){
			sdzs = sd.calZS_ZhiXuan_Hezhi(sd.lsoneList);
		}
	}else if(sd.playId == 51006){
		if(sd.lsoneList.length>=1){
			sdzs = sd.calZS_Zu3_Hezhi(sd.lsoneList);
		}
	}else if(sd.playId == 51007){
		if(sd.lsoneList.length>=1){
			sdzs = sd.calZS_Zu6_Hezhi(sd.lsoneList);
		}
	}
	$("#flczs").html(sdzs);
	$("#flcAmt").html(sdzs * 2);
};

sd.clearBallClass = function(){
	$(".dlyuan").attr("class", "dlyuan");
};

sd.dobuy = function(){
	if(sd.amtTotal > 600000){
		open_message("您好，单个方案最大金额为￥600,000.00元");
		return;
	}
	if(!checkLoginByAjax()){ return; }
	if(sd.numberList.length == 0){
		open_message("至少选择一注号码才能投注");
		return;
	}
	$("#lotId").val(sd.lotId);
	$("#playId").val(parseInt(sd.playId));
	$("#zs").val(sd.zs);
	$("#bs").val(sd.bs);
	$("#totalAmt").val(sd.amtTotal);
	switch(sd.playId){
		case 51001:
			$("#codes").val(sd.getCodes_ZhiXuan());
			break;
		case 51002:
			$("#codes").val(sd.getCodes_Zu3_Danshi());
			break;
		case 51003:
			$("#codes").val(sd.getCodes_Zu3_Fushi());
			break;
		case 51004:
			$("#codes").val(sd.getCodes_Zu6());
			break;
		case 51005:
			$("#codes").val(sd.getCodes_ZhiXuan_Hezhi());
			break;
		case 51006:
			$("#codes").val(sd.getCodes_Zu3_Hezhi());
			break;
		case 51007:
			$("#codes").val(sd.getCodes_Zu6_Hezhi());
			break;
		default:
			open_message("未知的玩法");
			return;
			break;
	}
	$("#flcconfirm").submit();
};
// 把numberList组合成为列表形式的
sd.getCodes_ZhiXuan = function(){
	var tmp = "{$baiweiBall}|{$shiweiBall}|{$geweiBall}";
	var codes = [];
	sd.numberList.each(function(o, i){
		var lscode = tmp;
		lscode = lscode.replace("{$baiweiBall}", o.eachbaiweinumber.join(","));
		lscode = lscode.replace("{$shiweiBall}", o.eachshiweinumber.join(","));
		lscode = lscode.replace("{$geweiBall}", o.eachgeweinumber.join(","));
		codes.push(lscode);
	});
	return codes.join("$");
};
sd.getCodes_Zu3_Danshi = function(){
	var tmp = "{$chonghao}|{$danhao}";
	var codes = [];
	sd.numberList.each(function(o, i){
		var lstcode = tmp;
		lstcode = lstcode.replace("{$chonghao}", o.eachchongnumber.join(","));
		lstcode = lstcode.replace("{$danhao}", o.eachdannumber.join(","));
		codes.push(lstcode);
	});
	return codes.join("$");
};
sd.getCodes_Zu3_Fushi = function(){
	var codes = [];
	sd.numberList.each(function(o, i){
		codes.push(o.eachnumber.join(","));
	});
	return codes.join("$");
};
sd.getCodes_Zu6 = function(){
	var codes = [];
	sd.numberList.each(function(o, i){
		codes.push(o.eachnumber.join(","));
	});
	return codes.join("$");
};
sd.getCodes_ZhiXuan_Hezhi = function(){
	var codes = [];
	sd.numberList.each(function(o, i){
		codes.push(o.eachnumber.join(","));
	});
	return codes.join("$");
};
sd.getCodes_Zu3_Hezhi = function(){
	var codes = [];
	sd.numberList.each(function(o, i){
		codes.push(o.eachnumber.join(","));
	});
	return codes.join("$");
};
sd.getCodes_Zu6_Hezhi = function(){
	var codes = [];
	sd.numberList.each(function(o, i){
		codes.push(o.eachnumber.join(","));
	});
	return codes.join("$");
};

// 确定
function confirm(){
	if(!checkLoginByAjax()){ return; }
	if(sd.playId == 51001){// 直选
		if(sd.lsoneList.length >= 1 && sd.lstwoList.length >= 1 && sd.lsthreeList.length >= 1){
			var zhuShu = sd.calZS_ZhiXuan(sd.lsoneList, sd.lstwoList, sd.lsthreeList);
			var lsMoney = zhuShu * 2;
			// 单注投注金额不能超过2w
			if(lsMoney > 20000){
				open_message("单个方案投注金额不超过20,000");
			}else{
				sd.lsthreeList.sort(function(a, b){
					return a - b;
				});
				sd.lstwoList.sort(function(a, b){
					return a - b;
				});
				sd.lsoneList.sort(function(a, b){
					return a - b;
				});
				var singleNumber = {
					index : sd.index,
					eachzs : zhuShu,
					eachmoney : lsMoney,
					eachgeweinumber : sd.lsthreeList,
					eachshiweinumber : sd.lstwoList,
					eachbaiweinumber : sd.lsoneList
				};
				sd.numberList.push(singleNumber);
				sd.index++;
				sd.lsoneList = [];
				sd.lstwoList = [];
				sd.lsthreeList = [];
				sd.lsoneList.length = 0;
				sd.lstwoList.length = 0;
				sd.lsthreeList.length = 0;
				// 清空选号的样式
				sd.clearBallClass();
				sd.caltotalZSAndMoney();
				sd.dobuy();
			}
		}else{
			if(haveSaveData() == 1){
				$("#lotId").val(sd.lotId);
				$("#playId").val(sd.playId);
				$("#flcconfirm").submit();
			}else{
				open_message("请选择投注的号码");
				return;
			}
		}
	}else if(sd.playId == 51002){
		if(sd.lsoneList.length >= 1 && sd.lstwoList.length >= 1){
			var zhuShu = sd.calZS_Zu3_Danshi(sd.lsoneList, sd.lstwoList);
			var lsMoney = zhuShu * 2;
			// 单注投注金额不能超过2w
			if(lsMoney > 20000){
				open_message("单个方案投注金额不超过20,000");
			}else{
				sd.lsoneList.sort(function(a, b){
					return a - b;
				});
				sd.lstwoList.sort(function(a, b){
					return a - b;
				});
				var singleNumber = {
					index : sd.numberList.length,
					eachzs : zhuShu,
					eachmoney : lsMoney,
					eachchongnumber : sd.lsoneList,
					eachdannumber : sd.lstwoList
				};
				sd.numberList.push(singleNumber);
				sd.lsoneList = [];
				sd.lstwoList = [];
				sd.lsoneList.length = 0;
				sd.lstwoList.length = 0;
				// 清空选号的样式
				sd.clearBallClass();
				sd.caltotalZSAndMoney();
				sd.dobuy();
			}
		}else{
			if(haveSaveData() == 1){
				$("#lotId").val(sd.lotId);
				$("#playId").val(sd.playId);
				$("#flcconfirm").submit();
			}else{
				open_message("请选择投注的号码");
				return;
			}
		}
	}else if(sd.playId == 51003){
		if(sd.lsoneList.length >= 2){
			var zhuShu = sd.calZS_Zu3_Fushi(sd.lsoneList);
			var lsMoney = zhuShu * 2;
			// 单注投注金额不能超过2w
			if(lsMoney > 20000){
				open_message("单个方案投注金额不超过20,000");
			}else{
				sd.lsoneList.sort(function(a, b){
					return a - b;
				});
				var singleNumber = {
					index : sd.numberList.length,
					eachzs : zhuShu,
					eachmoney : lsMoney,
					eachnumber : sd.lsoneList
				};
				sd.numberList.push(singleNumber);
				sd.lsoneList = [];
				sd.lsoneList.length = 0;
				// 清空选号的样式
				sd.clearBallClass();
				sd.caltotalZSAndMoney();
				sd.dobuy();
			}
		}else{
			if(haveSaveData() == 1){
				$("#lotId").val(sd.lotId);
				$("#playId").val(sd.playId);
				$("#flcconfirm").submit();
			}else{
				open_message("请选择投注的号码");
				return;
			}
		}
	}else if(sd.playId == 51004){
		if(sd.lsoneList.length >= 3){
			var zhuShu = sd.calZS_Zu6(sd.lsoneList);
			var lsMoney = zhuShu * 2;
			// 单注投注金额不能超过2w
			if(lsMoney > 20000){
				open_message("单个方案投注金额不超过20,000");
			}else{
				sd.lsoneList.sort(function(a, b){
					return a - b;
				});
				var singleNumber = {
					index : sd.numberList.length,
					eachzs : zhuShu,
					eachmoney : lsMoney,
					eachnumber : sd.lsoneList
				};
				sd.numberList.push(singleNumber);
				sd.lsoneList = [];
				sd.lsoneList.length = 0;
				// 清空选号的样式
				sd.clearBallClass();
				sd.caltotalZSAndMoney();
				sd.dobuy();
			}
		}else{
			if(haveSaveData() == 1){
				$("#lotId").val(sd.lotId);
				$("#playId").val(sd.playId);
				$("#flcconfirm").submit();
			}else{
				open_message("请选择投注的号码");
				return;
			}
		}
	}else if(sd.playId == 51005){
		if(sd.lsoneList.length >= 1){
			var zhuShu = sd.calZS_ZhiXuan_Hezhi(sd.lsoneList);
			var lsMoney = zhuShu * 2;
			// 单注投注金额不能超过2w
			if(lsMoney > 20000){
				open_message("单个方案投注金额不超过20,000");
			}else{
				sd.lsoneList.sort(function(a, b){
					return a - b;
				});
				var singleNumber = {
					index : sd.numberList.length,
					eachzs : zhuShu,
					eachmoney : lsMoney,
					eachnumber : sd.lsoneList
				};
				sd.numberList.push(singleNumber);
				sd.lsoneList = [];
				sd.lsoneList.length = 0;
				// 清空选号的样式
				sd.clearBallClass();
				sd.caltotalZSAndMoney();
				sd.dobuy();
			}
		}else{
			if(haveSaveData() == 1){
				$("#lotId").val(sd.lotId);
				$("#playId").val(sd.playId);
				$("#flcconfirm").submit();
			}else{
				open_message("请选择投注的号码");
				return;
			}
		}
	}else if(sd.playId == 51006){
		if(sd.lsoneList.length >= 1){
			var zhuShu = sd.calZS_Zu3_Hezhi(sd.lsoneList);
			var lsMoney = zhuShu * 2;
			// 单注投注金额不能超过2w
			if(lsMoney > 20000){
				open_message("单个方案投注金额不超过20,000");
			}else{
				sd.lsoneList.sort(function(a, b){
					return a - b;
				});
				var singleNumber = {
					index : sd.numberList.length,
					eachzs : zhuShu,
					eachmoney : lsMoney,
					eachnumber : sd.lsoneList
				};
				sd.numberList.push(singleNumber);
				sd.lsoneList = [];
				sd.lsoneList.length = 0;
				// 清空选号的样式
				sd.clearBallClass();
				sd.caltotalZSAndMoney();
				sd.dobuy();
			}
		}else{
			if(haveSaveData() == 1){
				$("#lotId").val(sd.lotId);
				$("#playId").val(sd.playId);
				$("#flcconfirm").submit();
			}else{
				open_message("请选择投注的号码");
				return;
			}
		}
	}else if(sd.playId == 51007){
		if(sd.lsoneList.length >= 1){
			var zhuShu = sd.calZS_Zu6_Hezhi(sd.lsoneList);
			var lsMoney = zhuShu * 2;
			// 单注投注金额不能超过2w
			if(lsMoney > 20000){
				open_message("单个方案投注金额不超过20,000");
			}else{
				sd.lsoneList.sort(function(a, b){
					return a - b;
				});
				var singleNumber = {
					index : sd.numberList.length,
					eachzs : zhuShu,
					eachmoney : lsMoney,
					eachnumber : sd.lsoneList
				};
				sd.numberList.push(singleNumber);
				sd.lsoneList = [];
				sd.lsoneList.length = 0;
				// 清空选号的样式
				sd.clearBallClass();
				sd.caltotalZSAndMoney();
				sd.dobuy();
			}
		}else{
			if(haveSaveData() == 1){
				$("#lotId").val(sd.lotId);
				$("#playId").val(sd.playId);
				$("#flcconfirm").submit();
			}else{
				open_message("请选择投注的号码");
				return;
			}
		}
	}
}

function haveSaveData(){
	var va = $("#alcodes").val();
	if(va > 0){
		return 1;
	}else{
		return 0;
	}
}

function nosale(){
	open_message("对不起,本期暂停购买");
}
function clearSelect(){
	$(".dlyuan").attr("class", "dlyuan");
	sd.numberList = [];
	sd.lsoneList = [];
	sd.lstwoList = [];
	sd.lsthreeList = [];
	sd.lsoneList.length = 0;
	sd.lstwoList.length = 0;
	sd.lsthreeList.length = 0;
	sd.clearBallClass();
	sd.caltotalZSAndMoney();
}