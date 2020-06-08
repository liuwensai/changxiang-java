
function imitate(para){
	/*
	
	lotCode : 9,
			playId : 9006,
			ggType : 1,
			spMin : 1.8,
			spMax : 2.5,//
			twoSmMin : 0,//
			twoSpMax : 0,//
			threeSpMin : 0,//
			threeSpMax : 0,//
			fourSpMin : 0,
			fourSpMax : 0,
			trackType : 200,//按固定步长200、固定比例100、固定盈利率300  追号
			trackArg : 10,//追号初始金额
			//zjAct : ,//
			stopOnemoney : 20000,// 单次投注≥停止追号    必须条件

			ckAllMaxMoney : null,//是否盈利停止
			stopAllmoney : 100, //盈利总额停止线  ≥  n  停止追号，前提是勾选盈利后停止	
			
			ckLoseMaxMoney : null,//是否亏损停止			
			stopLose : '',//亏损停止金额
			
			ckOneMaxBonus : null,//单次最大中奖金额checkbox
			stopMaxbonus : null,//			
			ckAllBonus : null,
			stopAllbonus : null,
			
			initMoney : 10,//初始购买金
			allCount : 5,//连续多少期不中奖，就重新追号
			selectNum : '',//篮球选号,1,2/1,2表示301+302/大分,小分
			dgSpf : -1,//是否指定胜平负玩法 1是，-1 不是
			dgType : 3,//单关类型，3、1、0对应 胜、平、负 或 大、中、小
			offKuisun : 100,//无效场次整体不亏处理方式100：下期投相同金额；200：按初始金额重新追号；300：停止追号
			onKuisun : 100,//无效场次整体亏损处理方式
			dgTrackplay : 9006,//竟足是否知道让球或不让球，9006：全选；9005:不让球；9001：让球	
	*
	*/
	
	
	var postData = {
			lotCode : para.lotCode,
			playId : para.playId,
			ggType : para.gg_type,
			spMin : para.spMin,
			spMax : para.spMax,//
			twoSpMin : para.spTwoMin,//
			twoSpMax : para.spTwoMax,//
			threeSpMin : para.spThreeMin,//
			threeSpMax : para.spThreeMax,//
			fourSpMin : para.spFoueMin,
			fourSpMax : para.spFoueMax,
			trackType : para.trackType,//按固定步长200、固定比例100、固定盈利率300  追号
			trackArg : para.trackArg,//追号方式值
			//zjAct : ,//
			stopOnemoney : para.stopOnemoney,// 单次投注≥停止追号    必须条件

			ckAllMaxMoney : para.ckAllMaxMoney,//是否盈利停止
			stopAllmoney : para.stopAllmoney, //盈利总额停止线  ≥  n  停止追号，前提是勾选盈利后停止	
			
			ckLoseMaxMoney : para.ckLoseMaxMoney,//是否亏损停止			
			stopLose : para.stopLose,//亏损停止金额
			
			ckOneMaxBonus : null,//单次最大中奖金额checkbox
			stopMaxbonus : null,//			
			ckAllBonus : null,
			stopAllbonus : null,
			
			initMoney : para.init_money,//初始购买金
			allCount : para.allCount,//连续多少期不中奖，就重新追号
			selectNum : para.selectNum,//篮球选号,1,2/1,2表示301+302/大分,小分
			dgSpf : para.dgSpf,//是否指定胜平负玩法 1是，-1 不是
			dgType : para.dgType,//单关类型，3、1、0对应 胜、平、负 或 大、中、小
			offKuisun : para.offKuisun,//无效场次整体不亏处理方式100：下期投相同金额；200：按初始金额重新追号；300：停止追号
			onKuisun : para.onKuisun,//无效场次整体亏损处理方式
			dgTrackplay : para.dgTrackplay,//竟足是否知道让球或不让球，9006：全选；9005:不让球；9001：让球					
			
			
			time : new Date().getTime()//当前时间
		};

	var url ="/ipub/trade/track/jcz-imitate-track!toMain.action";
	$.post(url,postData,function(responseText) {
		try {
			var json = eval('(' + responseText + ')');
			if (json && json.flag == 1) {
				var returnMsg = eval("(" + json.msg + ")");
				var lot = returnMsg.lotId;
				var tm_Id = returnMsg.tmId;
				if(lot == 9 || lot == 10){
					//var paym = param.totalAmt;
					//var projectId = returnMsg.betProjectId;
					window.location.href = "/mcpay/mc-pay!buyjcfinish.action?lotid="+ lot + "&projectId=" + -999 + "&totalAmt=" + 0 + "&investType="
					+ 2+ "&playId="+ 0+ "&tmId="+tm_Id;
				}
			} else {
				$("#showMsg").html("提示："+json.msg);
			}
		} catch (err) {
			$("#showMsg").html("提示："+err);
		}
	}, "text");
	
}