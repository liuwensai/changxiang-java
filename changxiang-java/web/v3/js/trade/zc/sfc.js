var sfc={};
sfc.issueId ;
sfc.issueCode ;
sfc.lotId= 6;
sfc.playId = 6001;
sfc.stopDate ;
sfc.openDate ;
sfc.opentime ;
sfc.zs=0 ;
sfc.amt= 0 ;
sfc.bs=1;
sfc.tempData = "";

//修改过倍数标记
sfc.updateBs = 0 ;
sfc.buycode="";
sfc.code={
		"1":[],
		"2":[],
		"3":[],
		"4":[],
		"5":[],
		"6":[],
		"7":[],
		"8":[],
		"9":[],
		"10":[],
		"11":[],
		"12":[],
		"13":[],
		"14":[]
		};

$(document).ready(function(){
	/**
	 * 页面托管出票或投注站出票的显示
	 */
	printTicketWay();
	if(print_ticket_way==1){//投注站出票			
		$("#show_button").html("<a class=\"btn_red b-flex\" id=\"toOfflineBuy\">免费保存</a>");
	}
	
	//判断是否是登陆后返回
	if(temp_login_exist("sfc_lotCode")){
		sfc.tempData = read_temp_login("sfc_numberContent") ;
	} else {
		sfc.tempData = "" ;
	}
	
	//加载出售期号
	sfc.saleIssue();
	sfc.showOrHide("activeIssue","issueShow");
	//倍数
	$("#selBs").keyup(function(){
		var bs = $(this).val();
		if(isNaN(bs) || bs <= 0){
			bs = 1 ;
			sfc.updateBs = 0 ;
		}
		if(sfc.updateBs==0){
			if(bs.length > 1){
				bs = bs.substring(1) ;
				sfc.updateBs = 1 ;
			}
		}
		if(bs > 99)bs = 99;
		$(this).val('');
		$(this).val(bs);
		sfc.bs = bs ;
		sfc.zsbsshow();
	});
	
	//立即支付
	$("#totouzhu").one('click' , toDoBuy) ;
	$("#toOfflineBuy").one('click' , toOfflineDoBuy) ;
});

//登陆后显示
sfc.loginBack=(function(){
	return function(data){
		var tempDate = data.split("|");
		for(var v = 1 ; v < 15 ; v++){
			if(tempDate[v-1].indexOf("-")==-1){
				if(tempDate[v-1].indexOf(",") != -1){
					var va = tempDate[v-1].split(",") ;
					for(var a = 0 ; a < va.length ; a++){
						$("i[matchidx="+v+"][v="+va[a]+"]").attr("class","tzb winselect") ;
						sfc.code[v].push(va[a]);
					}
				} else {
					$("i[matchidx="+v+"][v="+tempDate[v-1]+"]").attr("class","tzb winselect") ;
					sfc.code[v].push(tempDate[v-1]);
				}
			}
		}
	} ;
})();
//显示或隐藏
sfc.showOrHide=(function(){
	return function(elementId , optElementId){
		$("#"+elementId).click(function(){
			$("#"+optElementId).toggle();
		}) ;
	} ;
})();

//获取出售期号
sfc.saleIssue = (function(){
	return function(){
		baseAjax("get" , "/trade/zc/sfc!saleIssue.action?t="+new Date().getTime() , true , null , "json" , function(data){
			var issueData = data;
			var v = 0 ;
			var htm="";
			while(true){
				if(issueData[v] =="undefined" || typeof issueData[v] =="undefined"){
					break ;
				}
				if(v == 0){
					sfc.issueCode = issueData[v].issueCode ;
					sfc.issueId = issueData[v].issueId;
					sfc.opentime = $.trim(issueData[v].officialOpenTime) ;
					$("#activeIssue").html(sfc.issueCode+"期");
					
					sfc.openDate = $.trim(issueData[v].officialStartTime);
					sfc.stopDate = $.trim(issueData[v].officialEndTime);
					var ftd = formatDate(issueData[v].officialEndTime , false);
					var open = formatDate(issueData[v].officialOpenTime , false);
					sfc.opentime= open.year + "-"+ftd.month+"-"+ftd.date+" "+ftd.hour+":"+ftd.minute ;
					$("#stopDate").html("停售："+ftd.month+"-"+ftd.date+" "+ftd.hour+":"+ftd.minute);
					sfc.saleMatch(sfc.issueCode);
				}
				htm+="<a href='javascript:;'>预售<span onclick='sfc.selectIssue(this)' class='left10' issueId='"+issueData[v].issueId+"' issueCode='"+issueData[v].issueCode+"' stopDate='"+issueData[v].officialEndTime+"' opentime='"+issueData[v].officialOpenTime+"' openDate='"+issueData[v].officialStartTime+"'>"+issueData[v].issueCode+"期</span></a>";
				v = v + 1 ;
			}
			$("#saleIssue").html(htm);
		});
	} ;
})();

//选择期号
sfc.selectIssue=(function(){
	return function(ths){
		var th = $(ths) ;
		sfc.issueId = th.attr("issueId");
		sfc.issueCode = th.attr("issueCode");
		sfc.stopDate = th.attr("stopDate");
		var opentime = th.attr("opentime") ;
		$("#activeIssue").html(sfc.issueCode+"期");
		var ftd = formatDate(sfc.stopDate , false);
		var open = formatDate(opentime, false);
		sfc.opentime= open.year + "-"+ftd.month+"-"+ftd.date+" "+ftd.hour+":"+ftd.minute ;
		
		$("#stopDate").html("停售："+ftd.month+"-"+ftd.date+" "+ftd.hour+":"+ftd.minute);
		sfc.saleMatch(sfc.issueCode);
		$("#issueShow").hide();
	};
})();

//显示该期的对阵
sfc.saleMatch=(function(){
	return function(issueCode){
		baseAjax("get" , "/trade/zc/sfc!saleMatch.action?t="+new Date().getTime() , true , null , "text" , function(data){
			var mathData_t = eval("("+data+")") ;
			var mathData = mathData_t[issueCode];
			if(mathData == null || mathData =="" || typeof(mathData) == "undefined"){
				$("#matchshow").html("");
				return ;
			}
			var htm="";
			for(var v = 0 ; v < mathData.length ; v++){
				htm += sfc.saleMatchDiv(mathData[v] , v+1) ;
			}
			$("#matchshow").html(htm);
			if(sfc.tempData != null &&  sfc.tempData != ""){
				sfc.loginBack(sfc.tempData);
				var dat = sfc.calCount(sfc.code);
				sfc.zs=dat.zs ;
				sfc.amt=dat.amt ;
				sfc.zsbsshow();
			}
		});
	};
})();

//拼对阵模板
sfc.saleMatchDiv=(function(){
	return function(data , index){
		var ftd = formatDate(data.matchDate , false);
		var htm ="";
		htm+="<ul class=\"game_ul\">";
		htm+="<li class=\"game_item\">";
		htm+="<div class=\"sum d-box\">";
		htm+="<div class=\"gameinfo\">";
		htm+="<div class=\"t\">"+index+"</div>";
		htm+="<div class=\"l\">"+data.league+"</div>";
		htm+="<div class=\"t font1rem\">"+ftd.month+"-"+ftd.date+" "+ftd.hour+":"+ftd.minute+"</div>";
		htm+="<i class=\"ui-trans\"></i>";
		htm+="</div>";
		htm+="<div class=\"b-flex\">";
		htm+="<div class=\"teams d-box\">";
		htm+="<div class=\"home b-flex\">"+data.homeTeam+"</div>";
		htm+="<div class=\"vs\">VS</div>";
		htm+="<div class=\"away b-flex\">"+data.guestTeam+"</div>";
		htm+="</div>";
		htm+="<div class=\"teams d-box\">";
		var win = "-" ;
		var draw = "-" ;
		var lost = "-" ;
		if(data.win != -1){
			win = data.win ;
		}
		if(data.draw != -1){
			draw = data.draw ;
		}
		if(data.lost != -1){
			lost = data.lost ;
		}
		htm+="<div class=\"home b-flex1\">"+win+"</div>";
		htm+="<div class=\"vs1\">"+draw+"</div>";
		htm+="<div class=\"away b-flex1\">"+lost+"</div>";
		htm+="</div>";
		htm+="<div class=\"jctz d-box disun\">";
		htm+="<label class=\"b-flex\"><i onclick=\"sfc.selectValue(this)\" class=\"tzb\" matchidx=\""+index+"\" v=\"3\">胜</i></label>";
		htm+="<label class=\"b-flex\"><i onclick=\"sfc.selectValue(this)\" class=\"tzb\" matchidx=\""+index+"\" v=\"1\">平</i></label>";
		htm+="<label class=\"b-flex\"><i onclick=\"sfc.selectValue(this)\" class=\"tzb\" matchidx=\""+index+"\" v=\"0\">负</i></label>";
		htm+="</div>";
		htm+="</div>";
		htm+="<div class=\"ylpositon\"></div>";
		htm+="</div>";
		htm+="</li>";
		htm+="</ul>";
		return htm ;
	};
})();

//保存选择的值
sfc.selectValue=(function(){
	return function(ths){
		var selMatch = $(ths) ;
		var indexMatch = selMatch.attr("matchidx");
		var selectv = selMatch.attr("v");
		if(selMatch.attr("class") =="tzb"){ 
			selMatch.attr("class","tzb winselect") ;
			sfc.code[indexMatch].push(selectv);
		} else {
			selMatch.attr("class","tzb") ;
			for(var v = 0 ; v<sfc.code[indexMatch].length ; v++){
				sfc.code[indexMatch].splice(v,1);
				break ;
			}
		}
		var data = sfc.calCount(sfc.code);
		sfc.zs=data.zs ;
		sfc.amt=data.amt ;
		sfc.zsbsshow();
	};
})();

//注数倍数显示
sfc.zsbsshow=(function(){
	return function(){
		if(sfc.zs>0){
			$("#payable").attr("class","m-submit_box");
		} else {
			$("#payable").attr("class","m-submit_box disabled");
		}
		sfc.amt = sfc.bs* sfc.zs*2 ;
		$("#zs").html(sfc.zs);
		$("#bs").html(sfc.bs);
		$("#amt").html(sfc.amt);
	} ;
})();

//获得注数，场数，金额
sfc.calCount=(function(){
	return function(selArrays){
		var data = {};
		data.amt = 0;
		data.zs = 1;
		data.cs = 0;
		sfc.buycode = "" ;
		var buycode ="";
		for(var v = 1 ; v<15 ; v++){
			data.zs*=selArrays[v].length ;
			if(selArrays[v].length != 0){
				data.cs +=1 ;
			}
			if(v == 1){
				buycode+=""+selArrays[v].join("") ;
			} else {
				buycode+=","+selArrays[v].join("") ;
			}
		}
		if(data.cs != 14){
			data.zs = 0 ;
			$("#selectinfo").show();
			$("#selectbuy").hide();
		} else {
			$("#selectinfo").hide();
			$("#selectbuy").show();
		}
		$("#selectcc").html(data.cs);
		sfc.buycode = buycode ;
		data.amt=data.zs*2*sfc.bs ;
		return data ;
	};
})();

function toDoBuy(){
	confirmBuy(false);
	$("#totouzhu").one('click' , toDoBuy) ;
}

//线下订单
function toOfflineDoBuy(){
	confirmBuy(true);
	$("#toOfflineBuy").one('click' , toOfflineDoBuy) ;
}

//确定投注
function confirmBuy(isOffline){
	var cur_stop_time = formatDate(sfc.stopDate , true);
	var cur_open_time = formatDate(sfc.openDate , true);
	//type,url,async,data,dataType,callBack
	var curTime=null ;
	baseAjax("get" , "/ipub/trade/issue!getCurrentTime.action?t="+new Date().getTime() , false , null , "json" ,function(data){
		if(data.flag==1)
			curTime = data.msg.replace(/-/g,"/");
		else
			curTime = null;
	});
	var cur_time = new Date(curTime);
	if(cur_time < cur_open_time){
		open_message("未到开售时间");
		return;
	}
	if(cur_time>=cur_stop_time){
		open_message("当前期已停止购买");
		return;
	}
	
	sfc.calCount(sfc.code) ;
	
	var totalAmt =  sfc.amt;
	
	var numberContent = sfc.buycode ;
	if(numberContent == null || numberContent == ""){
		open_message("请选择号码");		
		return ;
	}
	if(sfc.zs < 1){
		open_message("请选择号码");		
		return ;
	}
	if(sfc.amt>20000){
		open_message("单笔投注金额不能超过20000元!");		
		return;
	}
	if(numberContent == null || numberContent == ""){
		open_message("没有选码投注号码，请添加号码");		
		return;
	}
	
	if(!checkLoginByAjax()){		
		//保存数据
		var multiple = parseInt($("#bs").html()); // 倍数
		var trackCount = 1;
		//toWriteTempData("dlt_number_content",numberContent);
		//toWriteTempData("dlt_play_id",mcdlt.playId);
		//toWriteTempData("dlt_bs_id",multiple);
		//toWriteTempData("dlt_qs_id",trackCount);
		var tempData ="" ;
		for(var v = 1 ; v<15 ; v++){
			if(v == 1){
				if(sfc.code[v].length < 1){
					tempData += "-";
				} else {
					tempData += sfc.code[v].join(",");
				}
			} else {
				if(sfc.code[v].length < 1){
					tempData = tempData + "|" + "-";
				} else {
					tempData = tempData + "|" + sfc.code[v].join(",");
				}
			}
			
		}
		
		write_temp_login("sfc_lotCode" , "6" , 1) ;
		write_temp_login("sfc_numberContent" , tempData , 1) ;
		write_temp_login("sfc_play" , sfc.playId , 1) ;
		write_temp_login("sfc_bs" , multiple , 1) ;
		write_temp_login("sfc_qs" , trackCount , 1) ;
		//登录
//		toAuthLogin();
		var bakUrl = "/v3shtml/trade/zc/sfc.shtml" ;
		to_login(bakUrl);
		return ;
	}
	var trackCount = 1;
	var investType = trackCount > 1 ? 2 : 1;
	var callbackType = 0;
	if(investType == 2 || investType == 3){
		callbackType = 2;
	}else{
		callbackType = 1;
	}
	//金额审核
	if(!isOffline) {
		same.hasEnoughMoney(sfc.playId,sfc.lotId,trackCount,totalAmt,sfc.lotId,sfc.issueCode,callbackType , sfc.buycode);
	} else {
		same.offlineConfirmHtml(sfc.playId,sfc.lotId,trackCount,totalAmt,sfc.lotId,sfc.issueCode,callbackType , sfc.buycode);//线下订单直接购买
	}
}

function dobuy(){
	var numberContent = sfc.buycode;
	var noteCount = sfc.zs;// 注数
	var multiple = sfc.bs; // 倍数
	var trackCount = 1;
	var totalAmt = noteCount * multiple * 2;
	var isStop=1;//追号是否停止
	var playId = sfc.playId;//玩法
	var lotCode = sfc.lotId;
	var issueId = sfc.issueId;//期号ID
	var issueCode = sfc.issueCode;
	var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
	var investType = trackCount > 1 ? 2 : 1;
	
	var singleAmonut = totalAmt / trackCount ;
	var postData = {
			multiple : multiple,
			numberContent : numberContent,
			noteCount : noteCount,
			totalAmt : totalAmt,
			lotPlayType : playId,//
			issueCode : issueCode,//期号//
			lotTypeCode : playId,//
			lotCode : lotCode,//
			issueId : issueId,//
			startIssueId : issueId,
			startIssueCode : issueCode,
			investType : investType,//1当前值是代购 , 2追号
			stop:isStop,
			trackCount : trackCount,//追号期数
			buySource : buySource,//购买来源
			isdongjie:0, //不冻结
			singleAmonut:singleAmonut,
			time : new Date().getTime()//当前时间
		};
		same.buySubmit(postData,$.trim(sfc.opentime));
}

//线下订单购买
function doOfflineBuy(){
	
	var numberContent = sfc.buycode;
	var noteCount = sfc.zs;// 注数
	var multiple = sfc.bs; // 倍数
	var trackCount = 1;
	var totalAmt = noteCount * multiple * 2;
	var isStop=1;//追号是否停止
	var playId = sfc.playId;//玩法
	var lotCode = sfc.lotId;
	var issueId = sfc.issueId;//期号ID
	var issueCode = sfc.issueCode;
	var buySource = 10;//购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
	var investType = trackCount > 1 ? 2 : 1;
	
	var singleAmonut = totalAmt / trackCount ;
	var postData = {
			multiple : multiple,
			numberContent : numberContent,
			noteCount : noteCount,
			totalAmt : totalAmt,
			lotPlayType : playId,//
			issueCode : issueCode,//期号//
			lotTypeCode : playId,//
			lotCode : lotCode,//
			issueId : issueId,//
			startIssueId : issueId,
			startIssueCode : issueCode,
			investType : investType,//1当前值是代购 , 2追号
			stop:isStop,
			trackCount : trackCount,//追号期数
			buySource : buySource,//购买来源
			isdongjie:0, //不冻结
			singleAmonut:singleAmonut,
			time : new Date().getTime(),//当前时间
			payType:100,//付款方式：线下付款
         	isTicket:0//是否取票：0未取票
		};
		same.buySubmit(postData,$.trim(sfc.opentime));
}

function doTempBuy(argJSON){
	var callbackType = argJSON.callbackType;
	var userBalacne = argJSON.allMoney;
	 var numberObject = sfc.buycode;
     var multiple = sfc.bs; // 倍数
     var trackCount = 1;
     var isStop=1;//追号是否停止
     var zhushu = sfc.zs;
     var issue = sfc.issueCode;
     var lotTypeCode = sfc.lotId;
     var lotTypeplay = sfc.playId;//玩法
     var temp = 2 ;
 	 var totalAmt = parseInt(zhushu) * multiple * temp ;//* parseInt(trackCount);
     var stopMoney=0;
	 var investType = trackCount > 1 ? 2 : 1;
     var trackType = 0;	//追号类型
     var issueId = sfc.issueId;//期号ID
     var startIssueCode=sfc.issueCode;
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
     		isDongjie:0,
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