//照单追号
var para={};
$(document).ready(function(){
	getTrackList();
});
function dobuy(){
	var back_para={
			lotCode : para.lotCode,
			playId : para.playId,
			gg_type  : para.ggType,
			spMin : para.spMin,
			spMax : para.spMax,//
			spTwoMin  : para.twoSpMin,//
			spTwoMax  : para.twoSpMax,//
			spThreeMin  : para.threeSpMin,//
			spThreeMax  : para.threeSpMax,//
			spFoueMin  : para.fourSpMin,
			spFoueMax  : para.fourSpMax,
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
			
			init_money  : para.initMoney,//初始购买金
			allCount : para.allCount,//连续多少期不中奖，就重新追号
			selectNum : para.selectNum,//篮球选号,1,2/1,2表示301+302/大分,小分
			dgSpf : para.dgSpf,//是否指定胜平负玩法 1是，-1 不是
			dgType : para.dgType,//单关类型，3、1、0对应 胜、平、负 或 大、中、小
			offKuisun : para.offKuisun,//无效场次整体不亏处理方式100：下期投相同金额；200：按初始金额重新追号；300：停止追号
			onKuisun : para.onKuisun,//无效场次整体亏损处理方式
			dgTrackplay : para.dgTrackplay
	};
	
	if(back_para.gg_type==1){
		window.location.href='jcz_track_dg.html?get_back=1&para='+JSON.stringify(back_para);
	}else{
		window.location.href='jcz_track_gg.html?get_back=2&para='+JSON.stringify(back_para);
	}
	/*
	var url ="/ipub/trade/track/jc-track!toMain.action";
	if(para){
		$.post(url,para,function(responseText) {
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
	}*/
}
function getTrackList(){
	
	var url ="/user/user-jc-track!getOtherUserTrackDetail.action";
	var postData={};
	postData.tmId=getQueryString("tmId");
	postData.userId=getQueryString("userId");
	$.post(url,postData,function(responseText){
		try {
			var json = eval('(' + responseText + ')');
			var html="";
			if (json && json.flag == 1) {
				
					var tm=json.msg.jctrackMain;
					var ch=json.msg.child;
					para=tm;
					$("#user_name").html(tm.userName+"的追号记录");
					 var zjl=0;
					 if(tm.passCount!=0)
						 zjl=(tm.winCount/tm.passCount*100).toFixed(2);
					html=html+ "<div  class=\"d-box\"><div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\">" +							
							"<h4 class=\"redstrong\">"+tm.winCount+"次</h4><span class=\"greypeilv\">中奖</span></div></div>" +
							"<div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\"><h4 class=\"redstrong\">"+zjl+"%</h4>" +
							"<span class=\"greypeilv\">中奖率</span></div></div><div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\">" +
							"<h4 class=\"redstrong\">"+tm.currentArg+"%</h4><span class=\"greypeilv\">回报率</span></div></div>" +
							"<div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\"><h4 class=\"redstrong\">"+tm.argMoney+"元</h4><span class=\"greypeilv\">盈利</span>" +
							"</div></div></div><div  class=\"d-box top-dis\" ><div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\">" +
							" <h4 class=\"black\">"+tm.passCount+"次</h4><span class=\"greypeilv\">投注次数</span></div></div>" +
							"<div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\"><h4 class=\"black\">最高"+tm.realCount+"次</h4><span class=\"greypeilv\">连续不中</span>" +
							"</div></div><div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\"><h4 class=\"black\">"+tm.maxTrackMoney+"元</h4>" +
							"<span class=\"greypeilv\">最大投注</span></div></div><div class=\"b-flex ui-avc\">" +
							"<div class=\"aligncenter-text\"><h4 class=\"black\">"+tm.settleTrackMoney+"元</h4><span class=\"greypeilv\">已结金额</span></div></div></div>";
					$("#track_main").html(html);
					
					var html2="<ul class=\"first-list\">";
					for(var i =0;i<ch.length;i++){						
							var pzt = "待发起";
							if(ch[i].isValid != -100){
								if(ch[i].tcState==0)
									pzt="待发起";
								else if(ch[i].tcState==100)
									pzt="已发起";
								else if(ch[i].tcState==200 || ch[i].tcState==300)
									pzt="待开奖";
								else if(ch[i].tcState==400 || ch[i].tcState==500){
									if(ch[i].tcBonus>0){
										pzt="<span class=\"red\">中奖"+ch[i].tcBonus+"元</span>";
									}else									
										pzt="未中奖";
								}
								//else if(ch[i].tcState==500)
								//	pzt="已完成";
							}else{
								pzt="失败";
							}
						var show_num = betNumber(ch[i].lotCode,ch[i].betNumber);
						html2=html2+"<li onclick=\"showTicket(this);\"><div class=\"d-box phvalue\"><div class=\"b-flex \" >"+getLocalTime(ch[i].trackDate)+"</div>" +
								"<div class=\"b-flex aligncenter-text\">"+ch[i].tcMoney+"元</div><div class=\"b-flex moneywidth\" >"+pzt+"</div>" +
								"<div class=\" iconwidth\">" +
								
								"<i class=\"i-arrowD ui-trans iconposition\" ></i>" +
								
								"</div></div>" +
								
								"<ul class=\"second-list\" style=\"display:none;\"><li class=\"detaillist \"><div class=\"phvalue\"><div class=\"d-box\" >" +
								"<div class=\"jztitle\">"+show_num[0][0]+">"+show_num[0][1]+"</div><div class=\"b-flex aligncenter-text\">"+getGGType(ch[i].lotCode,ch[i].ggType)+"</div>" +
								"<div class=\"b-flex aligncenter-text\">"+ch[i].tcZhushu+"倍</div><div class=\"b-flex aligncenter-text\">" +
								"</div></div><div class=\"d-box lineheight2\" >";
								for(var j=1;j<show_num.length;j++){
								 html2=html2+"<div class=\"jztitle tismall\">"+show_num[j][0]+">"+show_num[j][1]+"</div>";
								}
								html2=html2+"<div class=\"b-flex aligncenter-text \">" +
								"</div><div class=\"b-flex aligncenter-text\"></div></div></div></li>" +
								"</ul>" +
								"</li>";
					}
					 html2=html2+"</ul>";
					 $("#track_child").html(html2);
					 /*
					var html1="";
					for(var j = 0 ;j<tc.length;j++){
						
						html1=html1+"<li><div class=\"d-box phvalue\"><div class=\"b-flex \">2015-03-12</div><div class=\"b-flex aligncenter-text\">2元</div>" +
						"<div class=\"b-flex\">待开奖</div><div class=\"b-flex \"><i class=\"i-arrowD ui-trans iconposition foldjt\" ></i></div>" +
						"</div><ul class=\"second-list\"><li class=\"detaillist\"><div class=\"phvalue\"><div class=\"d-box\">" +
						"<div class=\"jztitle\">周三001>胜(1.3)</div><div class=\"b-flex aligncenter-text\">单关</div>" +
						"<div class=\"b-flex aligncenter-text\">2倍</div></div><div class=\"d-box lineheight2\">" +
						"<div class=\"jztitle tismall\">周三001克拉雷镇 VS 谢菲联(1.3)</div><div class=\"b-flex aligncenter-text\"></div>" +
						"<div class=\"b-flex aligncenter-text\"></div></div></div></li></ul></li>";
						
					}
					html=html+"<div class=\"clearfix\"></div> </ul><div class=\"jiantoubox\"><div class=\"shuanjiatou\"></div></div><div class=\"clearfix\"></div></div></li>";
				*/
			} else {
				$("#track_info").html("<div class=\"append-recordnone\" id=\"orderRecordNoData\" style=\"\">暂无追号记录<p style=\"line-height:26px;\"></p></div>");
			}
			$("#show_charts").html(html);
		} catch (err) {
			alert(err);
		}
	}, "text");
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
function betNumber(lotCode,bn){
	var betNumber = bn;
	var betArr = betNumber.split('/');
	var showNum = [];
	
	if(lotCode==9) {//竞彩足球
		for(var i = 0; i<betArr.length; i++) {
			var number = betArr[i].split('|');
			var _bet = number[3];
			var _betNum = number[1];
			var _playIdNum = number[2];
			var playArr = _playIdNum.split(';');
			var content = '';
			for(var j = 0; j<playArr.length; j++) {
				var _playId = playArr[j].split('@')[0];
				var num = playArr[j].split('@')[1];
				if(_playId == 9001 || _playId == 10002) {
					content += "["+_bet+"]" +dic[_playId][num];
				} else {
					content += dic[_playId][num];
				}
				
				if(j != playArr.length -1) {
					content += ',';
				}
			}
			var num = [getMatchName(_betNum),content];
			showNum.push(num);
		}
	} else {
		var playId=$(this).attr('playId');
		for(var i = 0; i<betArr.length; i++) {
			var number = betArr[i].split('|');
			
			var _betNum = number[1];
			var _num = number[2];
			var content = dic[playId][_num];;
			
			var num = [getMatchName(_betNum),content];
			showNum.push(num);
		}
	}
	return showNum;
}
var getMatchName=function(num){
	var dic={1:'周一',2:'周二',3:'周三',4:'周四',5:'周五',6:'周六',7:'周日'};
	//竞彩
	if(num&&num.length==4){
		return num.replace(/([1-7])\d{3}/gi,function(match){
			return dic[match.charAt(0)]+match.substring(1);
		});
	}
	return num;
};
var dic={
		11001:{
			'3':'胜',
			'1':'平',
			'0':'负'
		},
		9001:{
			'3':'胜',
			'1':'平',
			'0':'负'
		},
		9005:{
			'3':'胜',
			'1':'平',
			'0':'负'
		},
		9002:{
			'0':'0',
			'1':'1',
			'2':'2',
			'3':'3',
			'4':'4',
			'5':'5',
			'6':'6',
			'7':'7+'
		},
		11003:{
			'1':'上单',
			'2':'上双',
			'3':'下单',
			'4':'下双'
		},
		11002:{
			'0':'0',
			'1':'1',
			'2':'2',
			'3':'3',
			'4':'4',
			'5':'5',
			'6':'6',
			'7':'7+'
		},
		9003:{
			'90':'胜其它',
			'99':'平其它',
			'09':'负其它',
			'10':'1:0',
			'20':'2:0',
			'21':'2:1',
			'30':'3:0',
			'31':'3:1',
			'32':'3:2',
			'40':'4:0',
			'41':'4:1',
			'42':'4:2',
			'50':'5:0',
			'51':'5:1',
			'52':'5:2',
			'00':'0:0',
			'11':'1:1',
			'22':'2:2',
			'33':'3:3',
			'01':'0:1',
			'02':'0:2',
			'12':'1:2',
			'03':'0:3',
			'13':'1:3',
			'23':'2:3',
			'04':'0:4',
			'14':'1:4',
			'24':'2:4',
			'05':'0:5',
			'15':'1:5',
			'25':'2:5'
		},
		11004:{
			'90':'胜其它',
			'99':'平其它',
			'09':'负其它',
			'10':'1:0',
			'20':'2:0',
			'21':'2:1',
			'30':'3:0',
			'31':'3:1',
			'32':'3:2',
			'40':'4:0',
			'41':'4:1',
			'42':'4:2',
			'50':'5:0',
			'51':'5:1',
			'52':'5:2',
			'00':'0:0',
			'11':'1:1',
			'22':'2:2',
			'33':'3:3',
			'01':'0:1',
			'02':'0:2',
			'12':'1:2',
			'03':'0:3',
			'13':'1:3',
			'23':'2:3',
			'04':'0:4',
			'14':'1:4',
			'24':'2:4',
			'05':'0:5',
			'15':'1:5',
			'25':'2:5'
		},
		9004:{
			'33':'胜-胜','31':'胜-平','30':'胜-负','13':'平-胜','11':'平-平','10':'平-负','03':'负-胜','01':'负-平','00':'负-负'
		},
		11005:{
			'33':'胜-胜','31':'胜-平','30':'胜-负','13':'平-胜','11':'平-平','10':'平-负','03':'负-胜','01':'负-平','00':'负-负'
		},
		10001:{
			'2':'主负','1':'主胜'
		},
		10002:{
			'2':'主负','1':'主胜'
		},
		10003:{
			'11':'客胜1-5','12':'客胜6-10','13':'客胜11-15','14':'客胜16-20','15':'客胜21-25','16':'客胜26+',
			'01':'主胜1-5','02':'主胜6-10','03':'主胜11-15','04':'主胜16-20','05':'主胜21-25','06':'主胜26+'
		},
		10004:{
			'1':'大分','2':'小分'
		}
};
var show_i=0;
function showTicket(obj){
	$(obj).children("ul").toggle();
	
	if(show_i==0){
		$(obj).find('i').removeAttr("class");
		$(obj).find('i').attr("class","i-arrowD ui-trans iconposition foldjt");
		show_i=1;
	}else{
		show_i=0;
		$(obj).find('i').removeAttr("class");
		$(obj).find('i').attr("class","i-arrowD ui-trans iconposition");
	}
}
function getLocalTime(nS) {     
	var now =new   Date(nS);
    var   year=now.getFullYear();   
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    var   second=now.getSeconds();     
    return   year+"-"+(month>9 ? month: "0"+month)+"-"+(date>9 ? date: "0"+date);// +"+hour+":"+minute+":"+second;      
   
}  
function getGGType(lot,type){
	if(lot ==9){
		if(type==0)return"足球-单关配";
		if(type==1)return"足球-单关";
		if(type==2)return"足球-2串1";
		if(type==3)return"足球-3串1";
		if(type==4)return"足球-4串1";
	}else{
		return "篮球-2串1";
	}
}