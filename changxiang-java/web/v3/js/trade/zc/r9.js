var sfc={};
sfc.issueId ;
sfc.issueCode ;
sfc.lotId= 6;
sfc.playId = 6002;
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

sfc.dan={
		"1胆":0,
		"2胆":0,
		"3胆":0,
		"4胆":0,
		"5胆":0,
		"6胆":0,
		"7胆":0,
		"8胆":0,
		"9胆":0,
		"10胆":0,
		"11胆":0,
		"12胆":0,
		"13胆":0,
		"14胆":0
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
	if(temp_login_exist("r9_lotCode")){
		sfc.tempData = read_temp_login("r9_numberContent") ;
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
		var dan = 0 ;
		for(var v = 1 ; v < 15 ; v++){
			if(tempDate[v-1].indexOf("-")==-1){
				if(tempDate[v-1].indexOf(",") != -1){
					var va = "" ;
					if(tempDate[v-1].indexOf("#") != -1){
						dan = 1 ;
						$("span[danidx="+v+"胆"+"]").attr("class","dan winselect") ;
						va = tempDate[v-1].replace(/#/g,"").split(",") ;
					} else {
						dan = 0 ;
						va = tempDate[v-1].split(",") ;
					}
					sfc.dan[v+"胆"] = dan ;
					
					for(var a = 0 ; a < va.length ; a++){
						$("i[matchidx="+v+"][v="+va[a]+"]").attr("class","tzb winselect") ;
						sfc.code[v].push(va[a]);
					}
				} else {
					var va ="";
					if(tempDate[v-1].indexOf("#") != -1){
						dan = 1 ;
						$("span[danidx="+v+"胆"+"]").attr("class","dan winselect") ;
						va = tempDate[v-1].replace(/#/g,"") ;
					} else {
						dan = 0 ;
						va = tempDate[v-1].replace(/#/g,"") ;
					}
					sfc.dan[v+"胆"] = dan ;
					$("i[matchidx="+v+"][v="+va+"]").attr("class","tzb winselect") ;
					sfc.code[v].push(va);
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
				htm+="<a href='javascript:;'>预售<span onclick='sfc.selectIssue(this)' class='left10' issueId='"+issueData[v].issueId+"' issueCode='"+issueData[v].issueCode+"' stopDate='"+issueData[v].officialEndTime+"' opentime='"+issueData[v].officialOpenTime+"' openDate='"+issueData[v].officialStartTime+"'  >"+issueData[v].issueCode+"期</span></a>";
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
			var mathData = mathData_t[issueCode] ;
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
				var dat = sfc.calCount(sfc.code , sfc.dan);
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
		htm+="<div class=\"ylpositon\"><span onclick=\"sfc.selectDan(this)\" mt=\""+index+"\" danidx=\""+index+"胆\"class=\"dan\">胆</span></div>";
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
		var data = sfc.calCount(sfc.code , sfc.dan);
		sfc.zs=data.zs ;
		sfc.amt=data.amt ;
		sfc.zsbsshow();
	};
})();

sfc.selectDan=(function(){
	return function(ths){
		var selMatch = $(ths) ;
		var indexMatch = selMatch.attr("danidx");
		var mt = selMatch.attr("mt");
		if(sfc.code[mt].length < 1){
			return ;
		}
		var danc = 0 ;
		for(var v = 1 ; v<15 ; v++){
			if(sfc.dan[v+"胆"] == 1){
				danc += 1 ;
			}
		}
		if(selMatch.attr("class") =="dan"){ 
			if(danc >= 8){
				open_message("最多能设8个胆");
				return ;
			}
			selMatch.attr("class","dan winselect") ;
			sfc.dan[indexMatch]=1;
		} else {
			selMatch.attr("class","dan") ;
			sfc.dan[indexMatch]=0 ;
		}
		var data = sfc.calCount(sfc.code , sfc.dan);
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
	var Cmn = function (n,m){
		var n1=1, n2=1;
		for (var i=n,j=1; j<=m; n1*=i--,n2*=j++);
		return n1/n2;
		};
    var X_y = function(x,y){
		 var result = 1;
		 for(var i=0;i<y;i++)
		 	result *=x;
		 return result;
		};
	
	return function(selArrays , seldans){
		var codes = new Array();
		var cs = 0 ;
		for(var v = 1 ; v<15 ; v++){
			if(selArrays[v].length < 1){
				codes.push("-");
			} else {
				if(seldans[v+"胆"] == 1){
					codes.push(selArrays[v].join("#")+"#");
				} else {
					codes.push(selArrays[v].join(""));
				}
				cs = cs + 1 ;
			}
		}
		var m1=0,m2=0,m3=0;
		var danm1=0,danm2=0,danm3=0;
		var n = 0 ;
		codes.each(function(o,i){
			var l=o.replace('-','').length;
			if(o.replace('-','').indexOf('#') >= 0){
				n = n + 1 ;
				if(l == 2){
					danm1 = danm1 + 1 ;
				} else if(l == 4){
					danm2 = danm2 + 1 ;
				} else if(l == 6){
					danm3 = danm3 + 1 ;
				}
			} else {
				switch(l){
					case 1:m1+=1;break;
					case 2:m2+=1;break;
					case 3:m3+=1;break;
					default:0;break;
				}
			}
		});
		var result = 0;
		for(var i=0;i<=m3;i++){
			for(var j=0;j<=m2;j++){
				for(var k=0;k<=m1;k++){
					if(i+j+k == (9- n)){
						result += Cmn(m3,i)*Cmn(m2,j)*Cmn(m1,k)* X_y(3,i)*X_y(2,j);
					}
				}
			}
		}
		
		var result1 = 0;
		for(var i=0;i<=danm3;i++){
			for(var j=0;j<=danm2;j++){
				for(var k=0;k<=danm1;k++){
					if(i+j+k == n){
						result1 += Cmn(danm3,i)*Cmn(danm2,j)*Cmn(danm1,k)* X_y(3,i)*X_y(2,j);
					}
				}
			}
		}
		
		var data = {};
		data.amt = 0;
		if(result1 == 0){
			result1 = 1 ;
		}
		data.zs = result*result1 ;;
		sfc.buycode = "" ;
		if(data.zs > 0){
			sfc.buycode = codes.join(",");
			if(sfc.buycode.indexOf("#") != -1){
				sfc.playId=6003 ;
			} else {
				sfc.playId=6002;
			}
			$("#selectinfo").hide();
			$("#selectbuy").show();
		} else {
			$("#selectinfo").show();
			$("#selectbuy").hide();
		}
		$("#selectcc").html(cs);
		
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
	
	sfc.calCount(sfc.code , sfc.dan) ;
	
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
		var dan = "" ;
		for(var v = 1 ; v<15 ; v++){
			if(sfc.dan[v+"胆"] == 1){
				dan="#" ;
			}else {
				dan="";
			}
			if(v == 1){
				if(sfc.code[v].length < 1){
					tempData += "-";
				} else {
					tempData += dan+sfc.code[v].join(",");
				}
			} else {
				if(sfc.code[v].length < 1){
					tempData = tempData + "|" + "-";
				} else {
					tempData = tempData + "|" + dan+sfc.code[v].join(",");
				}
			}
			
		}
		write_temp_login("r9_lotCode" , "6" , 1) ;
		write_temp_login("r9_numberContent" , tempData , 1) ;
		write_temp_login("r9_play" , sfc.playId , 1) ;
		write_temp_login("r9_bs" , multiple , 1) ;
		write_temp_login("r9_qs" , trackCount , 1) ;
		//登录
//		toAuthLogin();
		var bakUrl = "/v3shtml/trade/zc/r9.shtml" ;
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