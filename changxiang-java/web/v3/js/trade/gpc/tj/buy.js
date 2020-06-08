function doTempBuy(){
	    $("#chargeAlertlightbox").hide();
	 	var numberObject = getBuyCodes();
	    var multiple = beishu; // 倍数
	    var issue = $("#issuecode").val();
	    var lotTypeCode = 21;
	    var lotTypeplay = playId;
	    var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
	    var stopMoney=0;
	    var trackCount = issueTotal;
	    var trackType = 0;	//追号类型
	    var trackArg = 30;		//追号类型停止条件
	    var issueId = $("#issueid").val();
	    var startIssueCode=$("#issuecode").val();
	    var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
	    if(!isCheckHhtz()){//如果是混合投注则修改玩法和购买号码参数
	    	lotTypeplay = 21030;
	    	numberObject = getBuyCodeStr();
	    }  

     var userBalacne = parseInt($("#balance_id").html());
     var inflowamt = totalAmount/issueTotal - userBalacne;
     var postData = {
     		multiple:multiple,
     		numberObject:numberObject,
     		noteCount:zhushu,
     		totalAmt:totalAmount/issueTotal,
     		playId:playId,
     		issueCode:issue,
     		lotTypeCode:lotTypeCode,
     		lotCode:lotTypeCode,
     		issueId:issueId,
     	 	startIssueId:issueId,
     		startIssueCode:startIssueCode,
     		investType:BUY_TYPE,
     		isZjStop:isStop,
     		stopMoney:stopMoney,
     		buySource:buySource,
     		isDongjie:isdongjie,
     		userBalance:userBalacne,
     		inflowAmt:inflowamt,
     		time:new Date().getTime()};
     
    var url = '';
    if(BUY_TYPE == 2 || BUY_TYPE == 3) {
    	url='/ipub/trade/temp!tempTrack.action';
    }else {
 	   url='/ipub/trade/temp!tempProject.action';
    }
     $.post(url,postData,function post_Sucess(data){
    	 var returnObject = eval("("+data+")");
    	 if(returnObject.flag==1)
    		 window.location.href ="/pay/alipay/ali-pay!charge.action?callbackType=1&callbackId="+returnObject.msg;
    	 else
    		 open_message(returnObject.msg);
     },'text');	
 };
 
 function doTempTrackBuy(){
	    $("#chargeAlertlightbox").hide();
	 	var numberObject = getBuyCodes();
	    var multiple = beishu; // 倍数
	    var issue = $("#issuecode").val();
	    var lotTypeCode = 21;
	    var lotTypeplay = playId;
	    var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
	    var stopMoney=0;
	    var trackCount = issueTotal;
	    var trackType = 0;	//追号类型
	    var trackArg = 30;		//追号类型停止条件
	    var issueId = $("#issueid").val();
	    var startIssueCode=$("#issuecode").val();
	    var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
	    if(!isCheckHhtz()){//如果是混合投注则修改玩法和购买号码参数
	    	lotTypeplay = 21030;
	    	numberObject = getBuyCodeStr();
	    }  
	    var userBalacne = parseInt($("#balance_id").html());
	    var inflowamt = totalAmount/issueTotal - userBalacne;
	 var postData = {
			 multiple:multiple,
			 numberObject:numberObject,
			 noteCount:zhushu,
			 totalAmt:totalAmount,
			 playId:playId,
			 issueCode:issue,
			 lotTypeCode:lotTypeCode,
			 lotCode:lotTypeCode,
			 issueId:issueId,
			 startIssueId:issueId,
			 startIssueCode:startIssueCode,
			 investType:BUY_TYPE,
			 isZjStop:isStop,
			 stopMoney:stopMoney,
			 trackCount:trackCount,
			 buySource:buySource,
			 issueMultiple:multiple,
			 isDongjie:isdongjie,
			 singleAmonut:totalAmount/issueTotal,
			 userBalance:userBalacne,
			 inflowAmt:inflowamt,
			 time:new Date().getTime()};
	 
	 var url='/ipub/trade/temp!tempTrack.action';
	 $.post(url,postData,function post_Sucess(data){
		 var returnObject = eval("("+data+")");
		 if(returnObject.flag==1)
			 location.href="/pay/alipay/ali-pay!charge.action?callbackType=2&callbackId="+returnObject.msg;
		 else
			 open_message(returnObject.msg);
	 },'text');	
 };