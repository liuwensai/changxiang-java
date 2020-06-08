function doTempBuy(argJSON){
	var callbackType = argJSON.callbackType;
	var userBalacne = argJSON.allMoney;
	 var numberObject = mcdlt.listCode.join("$");
     var multiple = $("#sbs").html(); // 倍数
     var trackCount = $("#sqs").html();
     var isStop=contractCheck('stop_track_img_id')==true?1:0;//追号是否停止
     var zhushu = mcdlt.totalzs;
     var issue = mcdlt.issuecode;
     var lotTypeCode = mcdlt.lotid;
     var lotTypeplay = mcdlt.playId;//玩法
     var temp = 2 ;
	 if(mcdlt.playId == 1002)temp = 3 ;
 	 var totalAmt = parseInt(zhushu) * multiple * temp * parseInt(trackCount);
     var stopMoney=0;
	 var investType = trackCount > 1 ? 2 : 1;
     var trackType = 0;	//追号类型
     var issueId = mcdlt.issueid;//期号ID
     var startIssueCode=mcdlt.issuecode;
     var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买

     var investType = trackCount > 1 ? 2 : 1;
     var inflowamt = totalAmt - userBalacne;
     var singleAmonut = parseInt(zhushu) * multiple * temp ;
     var postData = {
     		multiple:multiple,
     		numberObject:numberObject,
     		noteCount:zhushu,
     		totalAmt:totalAmt,
     		playId:lotTypeplay,
     		issueCode:issue,
     		lotTypeCode:lotTypeCode,
     		lotCode:lotTypeCode,
     		issueId:issueId,
     	 	startIssueId:issueId,
     		startIssueCode:startIssueCode,
     		investType:investType,
     		isZjStop:isStop,
     		stopMoney:1,
     		buySource:buySource,
     		isDongjie:100,
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
 
// function doTempTrackBuy(){
//	 $("#chargeAlertlightbox").hide();
//	 var numberObject = mcdlt.listCode.join("$");
//     var multiple = $("#sbs").html(); // 倍数
//     var zhushu = mcdlt.totalzs;
//     var issue = mcdlt.issuecode;
//     var lotTypeCode = mcdlt.lotid;
//     var lotTypeplay = mcdlt.playId;//玩法
//     var temp = 2 ;
//	 if(mcdlt.playId == 1002)temp = 3 ;
// 	 var totalAmt = parseInt(zhushu) * multiple * temp;
//     var stopMoney=0;
//     var trackCount = $("#sqs").html();
//     var trackType = 0;	//追号类型
//     var issueId = mcdlt.issueid;//期号ID
//     var startIssueCode=mcdlt.issuecode;
//     var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
//
//     var investType = trackCount > 1 ? 2 : 1;
//     var userBalacne = parseInt($("#balance_id").html());
//     var inflowamt = totalAmt*parseInt(trackCount) - userBalacne;
//	 var postData = {
//			 multiple:multiple,
//			 numberObject:numberObject,
//			 noteCount:zhushu,
//			 totalAmt:totalAmt*parseInt(trackCount),
//			 playId:lotTypeplay,
//			 issueCode:issue,
//			 lotTypeCode:lotTypeCode,
//			 lotCode:lotTypeCode,
//			 issueId:issueId,
//			 startIssueId:issueId,
//			 startIssueCode:startIssueCode,
//			 investType:investType,
//			 isZjStop:1,
//			 stopMoney:1,
//			 trackCount:trackCount,
//			 buySource:buySource,
//			 issueMultiple:multiple,
//			 isDongjie:100,
//			 singleAmonut:totalAmt,
//			 userBalance:userBalacne,
//			 inflowAmt:inflowamt,
//			 time:new Date().getTime()};
//	 
//	 var url='/ipub/trade/temp!tempTrack.action';
//	 $.post(url,postData,function post_Sucess(data){
//		 var returnObject = eval("("+data+")");
//		 if(returnObject.flag==1)
//			 location.href="/pay/alipay/ali-pay!charge.action?callbackType=2&callbackId="+returnObject.msg;
//		 else
//			 open_message(returnObject.msg);
//	 },'text');	
// };