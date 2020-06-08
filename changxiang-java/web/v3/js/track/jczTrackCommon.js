var jctrack = {};
jctrack.initData = function() {
	//单关配平均SP值为1.74,最小SP值为1.2,最大SP值为3.5
	jctrack.dgpAvgSp = 1.74;
	jctrack.spMin = 1.1;
	jctrack.spMax = 3.5;
	/*<span class="showHelp"> <img src="/v2/images/icon/icon_bzt.png"><div class="Rulepost">'+
	'<div class="fonttext" style="display:none;">'+
		'理论奖金计算公式：<br />'+
    	'单关配奖金 = 投注金额 × 第1场最低SP × 竞彩2选1平均返还率 (87%)<br />'+
    	'2串1 奖金 = 投注金额 × 第1场最低SP × 第2场最低SP<br />'+
    	'3串1 奖金 = 投注金额 × 第1场最低SP × 第2场最低SP × 第3场最低SP<br />'+
    	'4串1 奖金 = 投注金额 × 第1场最低SP × 第2场最低SP × 第3场最低SP × 第4场最低SP'+
'</div>'+	
'</div></span>
*/	/*jctrack.moneyDetailTheader = ['<tr style="background:#e4fbe8;">', 
									  '<td style="background:#e4fbe8;">序号</td>', 
									  '<td style="background:#e4fbe8;">单次投注</td>', 
									  '<td style="background:#e4fbe8;">投注总额</td>',
									  '<td style="background:#e4fbe8;">理论奖金</td>', 
									  '<td style="background:#e4fbe8;">盈利金额</td>',
									  '<td style="background:#e4fbe8;">盈利率</td>',
									  '</tr>' ];*/
	jctrack.moneyDetailTpl = ['<tr>', 
								  '<td>{$issueSeq}</td>', 
								  '<td>{$buyMoney}</td>', 
								  '<td>{$allMoney}</td>', 
								  '<td>{$theoryMoney}</td>',
								  '<td>{$winMoney}</td>',
								  '<td>{$winRate}</td>',
								  '</tr>' ];
	/*jctrack.footDetailTpl = ['<tr>',
	                         '<td colspan="5" style="line-height:22px; text-align:left; padding:5px 0px 0 0px; border-right:none;">'+ 
                   				' 每一行的数据表示前几次都没，本次中奖时，会员的盈利情况。<br />'+
                    			' 如果连续<em class="c_red"> {$maxCount} </em>次不中，第<em class="c_red"> {$maxCounts} </em>次将按初始金额<em class="c_red"> {$initMoney} </em>元重新追号。</em></td>',
                    		 '<td style=" border-left:none;"><a href="javascript:void(0)" id="closeTab">关闭</a></td>',
	                         '</tr>'];*/
};

jctrack.checkTrackValue = function() {
	var tzIssue = Number($.trim($('#tzIssue').val()));
	var firstIssue = Number($.trim($('#initMoney').val()));
	var spMin = parseFloat($.trim($('#spMin').val()));
	var spMax = parseFloat($.trim($('#spMax').val()));
	var _spMin = parseFloat(jctrack.spMin);
	var _spMax = parseFloat(jctrack.spMax);
	var ggType = $("#ggType").val();
	var lotCode=$('#lotCode').val();
	
	var regx = /^\d{1,10}$/;
	var regxMoney = /^\d+(.\d{0,2})?$/;
	var regxProfit = /^(-)?\d+(.\d{0,2})?$/;
	//投注的期数
	if($.trim($('#tzIssue').val()).length == 0) {
//		$('#showMsg').html("提示：最大不中奖次数不能为空");
		open_message("最大不中奖次数不能为空");
		return false;
	}
	
	if(!regx.test(tzIssue)) {
//		$('#showMsg').html("提示：请输入正确的最大不中奖次数,最大不中奖次数必须是整数");
		open_message("最大不中奖次数必须是整数");
		return  false;
	}
	
	if(tzIssue < 2 || tzIssue >20) {
//		$('#showMsg').html("提示：最大不中奖次数范围必须在2~20");
		open_message("最大不中奖次数范围必须在2~20");
		return  false;
	}
	
	//首次投注的金额
	if($.trim($('#initMoney').val()).length == 0) {
//		$('#showMsg').html("提示：首次投注的金额不能为空");
		open_message("首次投注的金额不能为空");
		return  false;
	}
	
	if(!regx.test(firstIssue)) {
//		$('#showMsg').html("提示：请输入正确的首次投注的金额,金额必须是整数");
		open_message("首次投注金额必须是整数");
		return  false;
	}
	
	if(ggType == 0) {
		if(firstIssue < 4) {
//			$('#showMsg').html("提示：首次投注的金额不能低于4元钱");
			open_message("首次投注的金额不能低于4元钱");
			return  false;
		}
	} else {
		if(firstIssue < 2) {
//			$('#showMsg').html("提示：首次投注的金额不能低于2元钱");
			open_message("首次投注的金额不能低于2元钱");
			return  false;
		}
	}
	
	
	var firstAmount=Number($('#initMoney').val());
	if(firstAmount%2){
//		$('#showMsg').html('提示：首次投注的金额必须为偶数!');
		open_message("首次投注的金额必须为偶数");
		return false;
	}
	
	if(lotCode == 9) {
		//最小SP值
		if($.trim($('#spMin').val()).length == 0) {
//			$('#showMsg').html("提示：第一场最小SP值不能为空");
			open_message("第一场最小SP值不能为空");
			return  false;
		}
		
		if(!regxMoney.test(spMin)) {
			$('#showMsg').html("提示：第一场最小SP值格式不正确");
			open_message("");
			return  false;
		}
		
		if(spMin < _spMin) {
			$('#showMsg').html("提示：第一场SP最小值不能小于" + _spMin);
			open_message("");
			return  false;
		}
		//最大SP值
		if($.trim($('#spMax').val()).length == 0) {
			$('#showMsg').html("提示：第一场最大SP值不能为空");
			open_message("");
			return  false;
		}
		
		if(!regxMoney.test(spMax)) {
			$('#showMsg').html("提示：第一场最大SP值格式不正确");
			open_message("");
			return  false;
		}
		
		if(spMax > _spMax) {
			$('#showMsg').html("提示：第一场SP最大值不能大于" + _spMax);
			open_message("");
			return  false;
		}
		
		if(spMin >= spMax) {
			$('#showMsg').html("提示：第一场最小SP值不能大于等于第一场最大SP值");
			open_message("");
			return  false;
		}
		
		if(ggType == 2 || ggType == 3 || ggType == 4) {
			//第二场sp检测
			var twoSpMin = parseFloat($.trim($('#twoSpMin').val()));
			var twoSpMax = parseFloat($.trim($('#twoSpMax').val()));
			//最小SP值
			if($.trim($('#twoSpMin').val()).length == 0) {
				$('#showMsg').html("提示：第二场最小SP值不能为空");
				open_message("");
				return  false;
			}
			
			if(!regxMoney.test(twoSpMin)) {
				$('#showMsg').html("提示：第二场最小SP值格式不正确");
				open_message("");
				return  false;
			}
			
			if(twoSpMin < _spMin) {
				$('#showMsg').html("提示：第二场SP最小值不能小于" + _spMin);
				open_message("");
				return  false;
			}
			//最大SP值
			if($.trim($('#twoSpMax').val()).length == 0) {
				$('#showMsg').html("提示：第二场最大SP值不能为空");
				open_message("");
				return  false;
			}
			
			if(!regxMoney.test(twoSpMax)) {
				$('#showMsg').html("提示：第二场最大SP值格式不正确");
				open_message("");
				return  false;
			}
			
			if(twoSpMax > _spMax) {
				$('#showMsg').html("提示：第二场SP最大值不能大于" + _spMax);
				open_message("");
				return  false;
			}
			
			if(twoSpMin >= twoSpMax) {
				$('#showMsg').html("提示：第二场最小SP值不能大于等于第二场最大SP值");
				open_message("");
				return  false;
			}
		}
		if(ggType == 3 || ggType == 4) {
			//第三场sp检测
			var threeSpMin = parseFloat($.trim($('#threeSpMin').val()));
			var threeSpMax = parseFloat($.trim($('#threeSpMax').val()));
			//最小SP值
			if($.trim($('#threeSpMin').val()).length == 0) {
				$('#showMsg').html("提示：第三场最小SP值不能为空");
				open_message("");
				return  false;
			}
			
			if(!regxMoney.test(threeSpMin)) {
				$('#showMsg').html("提示：第三场最小SP值格式不正确");
				open_message("");
				return  false;
			}
			
			if(threeSpMin < _spMin) {
				$('#showMsg').html("提示：第三场SP最小值不能小于" + _spMin);
				open_message("");
				return  false;
			}
			//最大SP值
			if($.trim($('#threeSpMax').val()).length == 0) {
				$('#showMsg').html("提示：第三场最大SP值不能为空");
				open_message("");
				return  false;
			}
			
			if(!regxMoney.test(threeSpMax)) {
				$('#showMsg').html("提示：第三场最大SP值格式不正确");
				open_message("");
				return  false;
			}
			
			if(threeSpMax > _spMax) {
				$('#showMsg').html("提示：第三场SP最大值不能大于" + _spMax);
				open_message("");
				return  false;
			}
			
			if(threeSpMin >= threeSpMax) {
				$('#showMsg').html("提示：第三场最小SP值不能大于等于第三场最大SP值");
				open_message("");
				return  false;
			}
		}
		if(ggType == 4) {
			//第四场sp检测
			var fourSpMin = parseFloat($.trim($('#fourSpMin').val()));
			var fourSpMax = parseFloat($.trim($('#fourSpMax').val()));
			//最小SP值
			if($.trim($('#fourSpMin').val()).length == 0) {
				$('#showMsg').html("提示：第四场最小SP值不能为空");
				open_message("");
				return  false;
			}
			
			if(!regxMoney.test(fourSpMin)) {
				$('#showMsg').html("提示：第四场最小SP值格式不正确");
				open_message("");
				return  false;
			}
			
			if(fourSpMin < _spMin) {
				$('#showMsg').html("提示：第四场SP最小值不能小于" + _spMin);
				open_message("");
				return  false;
			}
			//最大SP值
			if($.trim($('#fourSpMax').val()).length == 0) {
				$('#showMsg').html("提示：第四场最大SP值不能为空");
				open_message("");
				return  false;
			}
			
			if(!regxMoney.test(fourSpMax)) {
				$('#showMsg').html("提示：第四场最大SP值格式不正确");
				open_message("");
				return  false;
			}
			
			if(fourSpMax > _spMax) {
				$('#showMsg').html("提示：第四场SP最大值不能大于" + _spMax);
				open_message("");
				return  false;
			}
			
			if(fourSpMin >= fourSpMax) {
				$('#showMsg').html("提示：第四场最小SP值不能大于等于第四场最大SP值");
				open_message("");
				return  false;
			}
		}	
	}
	
	var trackType = $("#trackType").val();
	if(trackType == 100) {//固定盈利率
		//期望盈利率
		var expectProfit = parseFloat($.trim($('#expectProfit').val()));
		if($.trim($('#expectProfit').val()).length == 0) {
			$('#showMsg').html("提示：期望盈利率不能为空");
			open_message("");
			return  false;
		}
		
		if(!regxProfit.test(expectProfit)) {
			$('#showMsg').html("提示：期望盈利率格式不正确");
			open_message("");
			return  false;
		}
		
		if(lotCode==9) {
			var spMins = parseFloat($.trim($('#spMin').val()));//最小SP值
			var twoSpMins = parseFloat($.trim($('#twoSpMin').val()));//第二场最小SP值
			var threeSpMins = parseFloat($.trim($('#threeSpMin').val()));//第三场最小SP值
			var fourSpMins = parseFloat($.trim($('#fourSpMin').val()));//第四场最小SP值
			var firstProfit = 0;
			if(ggType == 0) {//单关配
				var avgSp = parseFloat(jctrack.dgpAvgSp);//单关配平均SP值
				//单倍奖金
				var oneBonus = parseFloat((spMins * avgSp * 2).toFixed(2));
				firstProfit = ((oneBonus/4 - 1)*100).toFixed(2);
			} else if(ggType == 2) {//2串1
				firstProfit = ((spMins * twoSpMins - 1)*100).toFixed(2);
			} else if(ggType == 3) {//3串1
				firstProfit = ((spMins * twoSpMins*threeSpMins - 1)*100).toFixed(2);
			} else if(ggType == 4) {//4串1
				firstProfit = ((spMins * twoSpMins*threeSpMins*fourSpMins - 1)*100).toFixed(2);
			}
			
			
			if(parseFloat(firstProfit) <= expectProfit) {
//				$('#showMsg').html("提示：您的期望盈利率不超过"+firstProfit+"%。");
				open_message("您的期望盈利率不超过"+firstProfit+"%。");
				return  false;
			}
		} else {
			if(180 <= expectProfit) {
//				$('#showMsg').html("提示：您的期望盈利率不超过"+180+"%。");
				open_message("您的期望盈利率不超过"+180+"%。");
				return  false;
			}
		}
		
	} else if(trackType == 200) {//固定步长
		var fixedStep = parseFloat($.trim($('#expectProfit').val()));
		if($.trim($('#expectProfit').val()).length == 0) {
//			$('#showMsg').html("提示：固定步长不能为空");
			open_message("固定步长不能为空");
			return  false;
		}
		
		if(!regx.test(fixedStep)) {
//			$('#showMsg').html("提示：固定步长格式不正确");
			open_message("固定步长格式不正确");
			return  false;
		}
		
		if(fixedStep%2) {
//			$('#showMsg').html('提示：固定步长必须为偶数!');
			open_message("固定步长必须为偶数");
			return false;
		}
		
		if(fixedStep > 20000) {
//			$('#showMsg').html('提示：固定步长不能大于20000元!');
			open_message("固定步长不能大于20000元");
			return false;
		}
	} else {//固定比例
		var expectProfit = parseFloat($.trim($('#expectProfit').val()));
		if($.trim($('#expectProfit').val()).length == 0) {
//			$('#showMsg').html("提示：固定比例不能为空");
			open_message("固定比例不能为空");
			return  false;
		}
		
		if(!regxMoney.test(expectProfit)) {
//			$('#showMsg').html("提示：固定比例格式不正确");
			open_message("固定比例格式不正确");
			return  false;
		}
	}
	
	return true;
}

jctrack.calTouZhuDist = function() {
	//计倍数公式 bs = 购买累计金额 * (1 + 期望盈利率 %)/(单倍奖金 - (1 + 期望盈利率 %)*4)
	var tzIssue = Number($.trim($('#tzIssue').val()));//最大不中奖次数
	var firstMoney = Number($.trim($('#initMoney').val()));//首期投注金额
	var spMin = parseFloat($.trim($('#spMin').val()));//第一场最小SP值
	var twoSpMins = parseFloat($.trim($('#twoSpMin').val()));//第二场最小SP值
	var threeSpMins = parseFloat($.trim($('#threeSpMin').val()));//第三场最小SP值
	var fourSpMins = parseFloat($.trim($('#fourSpMin').val()));//第四场最小SP值
	var ggType = $("#ggType").val();
	var lotCode = $('#lotCode').val();
	
	var avgSp = parseFloat(jctrack.dgpAvgSp);//单关配平均SP值
//	var header = jctrack.moneyDetailTheader;
	var tpl = jctrack.moneyDetailTpl;
	//var foot = jctrack.footDetailTpl.join('').replace('{$maxCount}',tzIssue).replace('{$maxCounts}',tzIssue + 1).replace('{$initMoney}',firstMoney);
	
	var trackType = $("#trackType").val();
	//单倍奖金
	var oneBonus = 0;
	//第一次追号的盈利率
	var firstProfit = 0;
	
	if(lotCode==9) {
		if(ggType == 0) {//单关配
			//单倍奖金
			oneBonus = parseFloat((spMin * avgSp * 2).toFixed(2));
			//第一次追号的盈利率
			firstProfit = ((oneBonus/4 - 1)*100).toFixed(2);
		} else if(ggType == 2) {//2串1
			oneBonus = parseFloat((spMin * twoSpMins * 2).toFixed(2));
			firstProfit = ((spMin * twoSpMins - 1)*100).toFixed(2);
		} else if(ggType == 3) {//3串1
			oneBonus = parseFloat((spMin * twoSpMins*threeSpMins * 2).toFixed(2));
			firstProfit = ((spMin * twoSpMins*threeSpMins - 1)*100).toFixed(2);
		} else if(ggType == 4) {//4串1
			oneBonus = parseFloat((spMin * twoSpMins*threeSpMins*fourSpMins * 2).toFixed(2));
			firstProfit = ((spMin * twoSpMins*threeSpMins*fourSpMins - 1)*100).toFixed(2);
		}
	} else {
		oneBonus = 6;
		firstProfit = 200;
	}
	
	
	if(trackType == 100) {//固定盈利率
		var expectProfit = parseFloat($.trim($('#expectProfit').val()));//期望盈利率
		
		if(ggType == 0) {//单关配
			
			var beiShu =[];
			var totalMoney = [];
			//计算第一次追号的盈利率
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					beiShu[i]=firstMoney/4;
					totalMoney[i] = firstMoney;
				} else {
					beiShu[i]=Math.round(totalMoney[i-1]*(1+expectProfit/100)/(oneBonus-(1+expectProfit/100)*4));
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]+beiShu[i]*4)).toFixed(2));
				}
			}
		
			var todayContent = [];
			for(var j = 0; j < tzIssue; j++) {
				todayContent[j] = tpl.join('').replace('{$issueSeq}',(j + 1)).
				replace('{$buyMoney}',beiShu[j] * 4).replace('{$allMoney}',totalMoney[j]).replace('{$theoryMoney}',(beiShu[j] * oneBonus).toFixed(2)).
				replace('{$winMoney}',((beiShu[j] * oneBonus).toFixed(2) - totalMoney[j]).toFixed(2)).replace('{$winRate}',j == 0 ? firstProfit + "%" : expectProfit + "%");
			}
			$('#trackTbody').empty().append(todayContent.join(''));//.append(foot);
		} else {//2串1,3串1,4串1
			
			var beiShu =[];
			var totalMoney = [];
			//计算第一次追号的盈利率
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					beiShu[i]=firstMoney/2;
					totalMoney[i] = firstMoney;
				} else {
					beiShu[i]=Math.round(totalMoney[i-1]*(1+expectProfit/100)/(oneBonus-(1+expectProfit/100)*2));
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]+beiShu[i]*2)).toFixed(2));
				}
			}
		
			var todayContent = [];
			for(var j = 0; j < tzIssue; j++) {
				todayContent[j] = tpl.join('').replace('{$issueSeq}',(j + 1)).
				replace('{$buyMoney}',beiShu[j] * 2).replace('{$allMoney}',totalMoney[j]).replace('{$theoryMoney}',(beiShu[j] * oneBonus).toFixed(2)).
				replace('{$winMoney}',((beiShu[j] * oneBonus).toFixed(2) - totalMoney[j]).toFixed(2)).replace('{$winRate}',j == 0 ? firstProfit + "%" : expectProfit + "%");
			}
			$('#trackTbody').empty().append(todayContent.join(''));//.append(foot);
		}
	} else if(trackType == 200) {//固定步长
		var fixedStep = parseFloat($.trim($('#expectProfit').val()));//固定步长
		var totalMoney = [];
		var currentMoney = [];
		var profit = [];
		
		if(ggType == 0) {//单关配
			//计算投注金额
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					currentMoney[i]=firstMoney;
					totalMoney[i] = firstMoney;
					profit[i] = parseFloat((parseFloat((firstMoney/2 * oneBonus/2)/firstMoney -1) * 100).toFixed(2));
				} else {
					currentMoney[i] = parseFloat((parseFloat(currentMoney[i-1] + fixedStep)).toFixed(2));
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]+currentMoney[i])).toFixed(2));
					profit[i] = parseFloat((parseFloat((currentMoney[i]/2 * oneBonus/2)/totalMoney[i] -1) * 100).toFixed(2));
				}
			}
			
			var todayContent = [];
			for(var j = 0; j < tzIssue; j++) {
				todayContent[j] = tpl.join('').replace('{$issueSeq}',(j + 1)).
				replace('{$buyMoney}',currentMoney[j]).replace('{$allMoney}',totalMoney[j]).replace('{$theoryMoney}',(currentMoney[j]/2 * oneBonus/2).toFixed(2)).
				replace('{$winMoney}',((currentMoney[j]/2 * oneBonus/2).toFixed(2) - totalMoney[j]).toFixed(2)).replace('{$winRate}',profit[j] + "%");
			}
			$('#trackTbody').empty().append(todayContent.join(''));//.append(foot);
		} else {//2串1,3串1,4串1
			//计算投注金额
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					currentMoney[i]=firstMoney;
					totalMoney[i] = firstMoney;
					profit[i] = parseFloat((parseFloat((firstMoney * oneBonus/2)/firstMoney -1) * 100).toFixed(2));
				} else {
					currentMoney[i] = parseFloat((parseFloat(currentMoney[i-1] + fixedStep)).toFixed(2));
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]+currentMoney[i])).toFixed(2));
					profit[i] = parseFloat((parseFloat((currentMoney[i] * oneBonus/2)/totalMoney[i] -1) * 100).toFixed(2));
				}
			}
			
			var todayContent = [];
			for(var j = 0; j < tzIssue; j++) {
				todayContent[j] = tpl.join('').replace('{$issueSeq}',(j + 1)).
				replace('{$buyMoney}',currentMoney[j]).replace('{$allMoney}',totalMoney[j]).replace('{$theoryMoney}',(currentMoney[j] * oneBonus/2).toFixed(2)).
				replace('{$winMoney}',((currentMoney[j] * oneBonus/2).toFixed(2) - totalMoney[j]).toFixed(2)).replace('{$winRate}',profit[j] + "%");
			}
			$('#trackTbody').empty().append(todayContent.join(''));//.append(foot);
		}
	} else {//固定比例
		var fixedStep = parseFloat($.trim($('#expectProfit').val()));//固定比例
		var totalMoney = [];
		var currentMoney = [];
		var profit = [];
		
		if(ggType == 0) {//单关配
			//计算投注金额
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					currentMoney[i]=firstMoney;
					totalMoney[i] = firstMoney;
					profit[i] = parseFloat((parseFloat((firstMoney/2 * oneBonus/2)/firstMoney -1) * 100).toFixed(2));
				} else {
					currentMoney[i] = parseFloat(Math.round(currentMoney[i-1]*(1 + fixedStep/100)/2) * 2);
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]+currentMoney[i])).toFixed(2));
					profit[i] = parseFloat((parseFloat((currentMoney[i]/2 * oneBonus/2)/totalMoney[i] -1) * 100).toFixed(2));
				}
			}
			
			var todayContent = [];
			for(var j = 0; j < tzIssue; j++) {
				todayContent[j] = tpl.join('').replace('{$issueSeq}',(j + 1)).
				replace('{$buyMoney}',currentMoney[j]).replace('{$allMoney}',totalMoney[j]).replace('{$theoryMoney}',(currentMoney[j]/2 * oneBonus/2).toFixed(2)).
				replace('{$winMoney}',((currentMoney[j]/2 * oneBonus/2).toFixed(2) - totalMoney[j]).toFixed(2)).replace('{$winRate}',profit[j] + "%");
			}
			$('#trackTbody').empty().append(todayContent.join(''));//.append(foot);
		} else {//2串1,3串1,4串1
			//计算投注金额
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					currentMoney[i]=firstMoney;
					totalMoney[i] = firstMoney;
					profit[i] = parseFloat((parseFloat((firstMoney * oneBonus/2)/firstMoney -1) * 100).toFixed(2));
				} else {
					currentMoney[i] = parseFloat(Math.round(currentMoney[i-1]*(1 + fixedStep/100)/2) * 2);
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]+currentMoney[i])).toFixed(2));
					profit[i] = parseFloat((parseFloat((currentMoney[i] * oneBonus/2)/totalMoney[i] -1) * 100).toFixed(2));
				}
			}
			
			var todayContent = [];
			for(var j = 0; j < tzIssue; j++) {
				todayContent[j] = tpl.join('').replace('{$issueSeq}',(j + 1)).
				replace('{$buyMoney}',currentMoney[j]).replace('{$allMoney}',totalMoney[j]).replace('{$theoryMoney}',(currentMoney[j] * oneBonus/2).toFixed(2)).
				replace('{$winMoney}',((currentMoney[j] * oneBonus/2).toFixed(2) - totalMoney[j]).toFixed(2)).replace('{$winRate}',profit[j] + "%");
			}
			$('#trackTbody').empty().append(todayContent.join(''));//.append(foot);
		}
	}
}