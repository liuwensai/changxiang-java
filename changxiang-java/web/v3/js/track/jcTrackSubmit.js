/**
 
  			trackMain.setLotCode(check_Int(request.getParameter("lotCode"), -1));
			trackMain.setPlayId(check_Int(request.getParameter("playId"), -1));
			trackMain.setGgType(check_Int(request.getParameter("ggType"), -1));
			trackMain.setSpMin(new BigDecimal(request.getParameter("spMin")));
			trackMain.setSpMax(new BigDecimal(request.getParameter("spMax")));
			trackMain.setTwoSpMin(new BigDecimal(request.getParameter("twoSmMin")));
			trackMain.setTwoSpMax(new BigDecimal(request.getParameter("twoSpMax")));
			trackMain.setThreeSpMin(new BigDecimal(request.getParameter("threeSpMin")));
			trackMain.setThreeSpMax(new BigDecimal(request.getParameter("threeSpMax")));
			trackMain.setFourSpMin(new BigDecimal(request.getParameter("fourSpMin")));
			trackMain.setFourSpMax(new BigDecimal(request.getParameter("fourSpMax")));
			trackMain.setTrackType(check_Int(request.getParameter("trackType"), -1));
			trackMain.setTrackArg(new BigDecimal(request.getParameter("trackArg")));
			trackMain.setZjAct(check_Int(request.getParameter("zjAct"), -1));
			trackMain.setStopOnemoney(new BigDecimal(request.getParameter("stopOnemoney")));
			trackMain.setStopAllmoney(new BigDecimal(request.getParameter("stopAllmoney")));
			trackMain.setStopMaxbonus(new BigDecimal(request.getParameter("stopMaxbonus")));
			trackMain.setStopAllbonus(new BigDecimal(request.getParameter("stopAllbonus")));
			trackMain.setStopLose(new BigDecimal(request.getParameter("stopLose")));
			trackMain.setInitMoney(new BigDecimal(request.getParameter("initMoney")));
			trackMain.setCkTrackMoney(new BigDecimal("0.00"));
			trackMain.setAllTrackMoney(new BigDecimal("0.00"));
			trackMain.setAllBonus(new BigDecimal("0.00"));
			trackMain.setTrackState(JCTrackMain.TRACK_STATE_WAIT_CONFIRM);
			trackMain.setUserId(userinfo.getUserId());
			trackMain.setAllCount(check_Int(request.getParameter("allCount"), 0));
			trackMain.setAddDate(new Date());
			trackMain.setLastDate(new Date());
			trackMain.setIsAuto(JCTrackMain.IS_AUTO_YES);
			trackMain.setStopTrack(JCTrackMain.STOP_TRACK_FALSE);
			trackMain.setStopProfit(JCTrackMain.STOP_PROFIT_NO);
			trackMain.setMaxTrackMoney(new BigDecimal("0.00"));
			trackMain.setMaxBonus(new BigDecimal("0.00"));
			trackMain.setSettleTrackMoney(new BigDecimal("0.00"));
			trackMain.setCurrentTrackMoney(new BigDecimal("0.00"));
			trackMain.setSelectNum(request.getParameter("selectNum"));
			trackMain.setIsDgSpf(check_Int(request.getParameter("dgSpf"), -1));
			trackMain.setDgType(check_Int(request.getParameter("dgType"), -1));
			trackMain.setOffKuisun(check_Int(request.getParameter("offKuisun"), -1));
			trackMain.setOnKuisun(check_Int(request.getParameter("onKuisun"), -1));
			trackMain.setDgTrackplay(check_Int(request.getParameter("dgTrackplay"), -1));
			
			 ckAllMaxMoney = Integer.parseInt(request.getParameter("ckAllMaxMoney"));
			 ckLoseMaxMoney = Integer.parseInt(request.getParameter("ckLoseMaxMoney"));
			 ckOneMaxBonus = Integer.parseInt(request.getParameter("ckOneMaxBonus"));//单次最大中奖金额checkbox
			 ckAllBonus = Integer.parseInt(request.getParameter("ckAllBonus"));
  
 **/

function dobuy(para){
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

	var url ="/ipub/trade/track/jc-track!toMain.action";
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
					window.location.href = "/mcpay/mc-pay!buyjcfinish.action?lotid="+ lot + "&projectId=" + 0 + "&totalAmt=" + 0 + "&investType="
						+ 2+ "&playId="+ 0+ "&tmId="+tm_Id;
				}
			} else {
				showMsg(json.msg);
		
			}
		} catch (err) {
			open_message(err);
	
		}
	}, "text");
	
}