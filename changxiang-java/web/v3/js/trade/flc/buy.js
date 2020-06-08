function doTempBuy(){
    $("#chargeAlertlightbox").hide();
 	var numberObject = mcssq.listCode.join("$");
    var multiple = $("#sbs").html(); // 倍数
    var zhushu = mcssq.totalzs;
    var issue = mcssq.issuecode;
    var lotTypeCode = mcssq.lotid;
    var lotTypeplay = 50001;
    var totalAmt = parseInt(zhushu) * parseInt(multiple) * 2;
    var stopMoney=0;
    var trackCount = $("#sqs").html();
	var investType = trackCount > 1 ? 2 : 1;
    var trackType = 0;	//追号类型
    var issueId = mcssq.issueid;
    var startIssueCode=mcssq.issuecode;
    var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买

 var userBalacne = parseInt($("#balance_id").html());
 var inflowamt = totalAmt - userBalacne;
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
 		isZjStop:1,
 		stopMoney:1,
 		buySource:buySource,
 		isDongjie:100,
 		userBalance:userBalacne,
 		inflowAmt:inflowamt,
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
		 window.location.href ="/pay/alipay/ali-pay!charge.action?callbackType=1&callbackId="+returnObject.msg;
	 else
		 open_message(returnObject.msg);
 },'text');	
};

function doTempTrackBuy(){
    $("#chargeAlertlightbox").hide();
    var numberObject = mcssq.listCode.join("$");
    var multiple = $("#sbs").html(); // 倍数
    var zhushu = mcssq.totalzs;
    var issue = mcssq.issuecode;
    var lotTypeCode = mcssq.lotid;
    var lotTypeplay = 50001;
    var totalAmt = parseInt(zhushu) * parseInt(multiple) * 2;
    var stopMoney=0;
    var trackCount = $("#sqs").html();
	var investType = trackCount > 1 ? 2 : 1;
    var trackType = 0;	//追号类型
    var issueId = mcssq.issueid;
    var startIssueCode=mcssq.issuecode;
    var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
    var userBalacne = parseInt($("#balance_id").html());
    var inflowamt = totalAmt - userBalacne;
 var postData = {
		 multiple:multiple,
		 numberObject:numberObject,
		 noteCount:zhushu,
		 totalAmt:totalAmt*parseInt(trackCount),
		 playId:lotTypeplay,
		 issueCode:issue,
		 lotTypeCode:lotTypeCode,
		 lotCode:lotTypeCode,
		 issueId:issueId,
		 startIssueId:issueId,
		 startIssueCode:startIssueCode,
		 investType:investType,
		 isZjStop:1,
		 stopMoney:1,
		 trackCount:trackCount,
		 buySource:buySource,
		 issueMultiple:multiple,
		 isDongjie:100,
		 singleAmonut:totalAmt,
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