var track = {};//全局变量，追号详情
$(document).ready(function(){
	getTrackList();
	$("#ls_zh").click(function(){
		$("#ls_zh").attr("class","on");
		$("#zh_sz").removeAttr("class");
		$("#track_info").toggle();
		$("#track_child").toggle();
		$("#track_setting").toggle();
		$("#to_track").toggle();
	});
	$("#zh_sz").click(function(){
		$("#zh_sz").attr("class","on");
		$("#ls_zh").removeAttr("class");
		$("#track_info").toggle();
		$("#track_child").toggle();
		$("#track_setting").toggle();
		$("#to_track").toggle();
	});
	if(!checkLoginByAjax()){		
		
		//登录
//		toAuthLogin();
		var bakUrl = window.location.href;
		to_login(bakUrl);
		return ;
	}
});

function getTrackList(){
	
	var url ="/user/user-jc-track!toDetails.action";
	var postData={};
	postData.tmId=getQueryString("tm_id");
	$.post(url,postData,function(responseText){
		try {
			var json = eval('(' + responseText + ')');
			if (json && json.flag == 1) {				
				var html1 = "<ul class=\"order_list recordszh\"><li><div class=\"d-box\"><div class=\"b-flex ui-avc\">" +
						"<div class=\"aligncenter-text\">";	
				var html2="<ul class=\"first-list\">";
				var html3="<div class=\"mlr_16\" style=\"line-height:2.5rem;\">";
				
				 var tm = json.msg.trackMain;
				 var ch = json.msg.trackChild;
				 
				 var zjl=0;
				 var zhzt="进行中";
				 if(tm.passCount!=0)
					 zjl=(tm.winCount/tm.passCount*100).toFixed(2);
				 if(tm.stopTrack==0){
					 zhzt="已停止";
				 }else if(tm.stopTrack==1){
					 zhzt="进行中";
				 }else if(tm.stopTrack==2){
					 zhzt="已暂停";
				 }
				 var para = 0;
				 var txt = "暂停追号";
				 
				 html1=html1+"<h4 class=\"redstrong\">"+tm.winCount+"次</h4><span class=\"greypeilv\">中奖</span></div></div>" +
				 		"<div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\"><h4 class=\"redstrong\">"+zjl+"%</h4>" +
				 		"<span class=\"greypeilv\">中奖率</span></div></div><div class=\"b-flex ui-avc\">" +
				 		"<div class=\"aligncenter-text\"><h4 class=\"redstrong\">"+tm.currentArg+"%</h4>" +
				 		"<span class=\"greypeilv\">回报率</span></div></div><div class=\"b-flex ui-avc\">" +
				 		"<div class=\"aligncenter-text\"><h4 class=\"redstrong\">"+tm.argMoney+"元</h4><span class=\"greypeilv\">盈利</span>" +
				 		"</div></div></div><div class=\"d-box top-dis\" ><div class=\"b-flex ui-avc\">" +
				 		"<div class=\"aligncenter-text\"><h4 class=\"black\">"+tm.passCount+"次</h4><span class=\"greypeilv\">投注次数</span>" +
				 		"</div></div><div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\"><h4 class=\"black\">最高"+tm.realCount+"次</h4>" +
				 		"<span class=\"greypeilv\">连续不中</span></div></div><div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\">" +
				 		"<h4 class=\"black\">"+tm.maxTrackMoney+"元</h4><span class=\"greypeilv\">最大投注</span></div></div><div class=\"b-flex ui-avc\">" +
				 		"<div class=\"aligncenter-text\"><h4 class=\"black\">"+tm.settleTrackMoney+"元</h4><span class=\"greypeilv\">已结金额</span>" +
				 		"</div></div></div></li><li ><div class=\"d-box\"><div class=\" ui-avc zhuangtai\">" +
				 		"<span class=\"fontlightblue\">"+zhzt+"</span></div><div class=\"b-flex ui-avc\" id=\"pause\" style=\"display:;\">";
				 		if(tm.stopTrack == 1){
					 		html1=html1+"<span class=\"Zuibo zbob\" ><a href=\"javascript:updateStopTrack("+tm.tmId+",2)\">暂停追号</a></span></div>" +
					 				"<div class=\"b-flex ui-avc \" style=\"display:;\">" +
					 				"<span class=\"Zuibo zboc \"><a href=\"javascript:updateStopTrack("+tm.tmId+",0)\">停止追号</a></span></div>" +
					 				"<div class=\"b-flex ui-avc\" style=\"display:;\"></div></div></li></ul>";
				 		}else if(tm.stopTrack == 2){
					 		html1=html1+"<span class=\"Zuibo zboa\" ><a href=\"javascript:updateStopTrack("+tm.tmId+",1)\">继续追号</a></span></div>" +
			 				"<div class=\"b-flex ui-avc \" style=\"display:;\">" +
			 				"<span class=\"Zuibo zboc \"><a href=\"javascript:updateStopTrack("+tm.tmId+",0)\">停止追号</a></span></div>" +
			 				"<div class=\"b-flex ui-avc\" style=\"display:;\"></div></div></li></ul>";
				 		}else if(tm.stopTrack == 0){
				 			
					 		//html1=html1+"<span class=\"Zuibo zbob\" ><a href=\"javascript:updateStopTrack("+tm.tmId+",1)\">继续追号</a></span></div>" +
			 				//"<div class=\"b-flex ui-avc \" style=\"display:;\"></div>" +
			 				//"<div class=\"b-flex ui-avc\" style=\"display:;\"></div></div></li></ul>";
				 		}
				if(ch && ch.length>0){ 
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
									pzt="<span class=\"red\">中"+ch[i].tcBonus+"元</span>";
								}else									
									pzt="未中奖";
							}
							//else if(ch[i].tcState==500)
							//	pzt="已完成";
						}else{
							pzt="失败";
						}
						var show_num = betNumber(ch[i].lotCode,ch[i].betNumber);
						var show_match = ch[i].backNumber.split('/');
						html2=html2+"<li onclick=\"showTicket(this);\"><div class=\"d-box phvalue\"><div class=\"b-flex \" >"+getLocalTime(ch[i].trackDate)+"</div>" +
								"<div class=\"b-flex aligncenter-text\">"+ch[i].tcMoney+"元</div><div class=\"b-flex moneywidth\" >"+pzt+"</div>" +
								"<div class=\" iconwidth\">" +
								
								"<i class=\"i-arrowD ui-trans iconposition\" ></i>" +
								
								"</div></div>" +
								
								"<ul class=\"second-list\" style=\"display:none;\"><li class=\"detaillist \"><div class=\"phvalue\"><div class=\"d-box\" >" +
								"<div class=\"jztitle"+(ch[i].tcBonus>0?" red":"")+"\">";
								for(var j=0;j<show_num.length;j++){
									if(j==0)
										html2=html2+show_num[j][0]+">"+show_num[j][1];
									else
										html2=html2+"<p>"+show_num[j][0]+">"+show_num[j][1]+"</p>";
								}	
							
								html2=html2+"<p></p></div><div class=\"b-flex aligncenter-text\">"+getGGType(ch[i].lotCode,ch[i].ggType)+"</div>" +
								"<div class=\"b-flex aligncenter-text\">"+ch[i].tcZhushu+"倍</div><div class=\"b-flex aligncenter-text\">" ;
								//"<a href=\"/user/user-lot-buy!jcCaiDetails.action?projectId="+ch[i].projectId+"&lotCode="+ch[i].lotCode+"\">详情</a></div></div><div class=\"d-box lineheight2\" >";
								//for(var j=1;j<show_num.length;j++){
								// html2=html2+"<div class=\"jztitle tismall\">"+show_num[j][0]+">"+show_num[j][1]+"</div>";
								//}								
								html2=html2+"<div class=\"b-flex aligncenter-text \">" +
								"</div><div class=\"b-flex aligncenter-text\"></div></div></div>";
								html2=html2+"<div class=\"d-box top-dis\">   <div class=\"jztitle tismall\">";
								
								for(var j=0;j<show_num.length;j++){
									 html2=html2+show_num[j][0]+show_match[j];//"<div class=\"jztitle tismall\">"+show_num[j][0]+">"+show_num[j][1]+"</div>";
									 if(j!=show_num.length-1){
										 html2=html2+"<br>";
									 }
								}
                               
								html2=html2+"</div>  <div class=\"b-flex aligncenter-text \"></div>"+
                                  "<div class=\"b-flex aligncenter-text\"></div>";
								html2=html2+"</div></li>" +
								"</ul>" +
								"</li>";
					}
				}
				 html2=html2+"</ul>";
				 var zhfs="";
				 if(tm.trackType==100)
					 zhfs="固定盈利" +tm.trackArg+"%";
				 if(tm.trackType==200)
					 zhfs="固定步长"+tm.trackArg+"元";
				 if(tm.trackType==300)
					 zhfs="固定比例"+tm.trackArg+"%";
				 html3=html3+"<div><span>追号方式：</span> "+zhfs+"<br/></div><div><span>过关方式：</span>"+getGGType(tm.lotCode,tm.ggType)+"<br/></div>" +
				 		"<div ><span class=\"zhkeywords\">SP区间：</span> <span class=\"nummvalue\">"+tm.spMin+"</span> ~ <span class=\"nummvalue\">"+tm.spMax+"</span><br/>" ;
				 if(tm.ggType==0){
					 html3=html3+"<span class=\"zhkeywords\"></span> <span class=\"nummvalue\"></span> 系统匹配 <span class=\"nummvalue\"></span><br/>";
				 }
				 if(tm.ggType==2){
					 html3=html3+"<span class=\"zhkeywords\"></span> <span class=\"nummvalue\">"+tm.twoSpMin+"</span>  ~ <span class=\"nummvalue\">"+tm.twoSpMax+"</span><br/>";
				 }
				 if(tm.ggType==3){
					 html3=html3+"<span class=\"zhkeywords\"></span> <span class=\"nummvalue\">"+tm.twoSpMin+"</span>  ~ <span class=\"nummvalue\">"+tm.twoSpMax+"</span><br/>" +
					 		"<span class=\"zhkeywords\"></span> <span class=\"nummvalue\">"+tm.threeSpMin+"</span>  ~ <span class=\"nummvalue\">"+tm.threeSpMax+"</span><br/>";
				 }
				 if(tm.ggType==4){
					 html3=html3+"<span class=\"zhkeywords\"></span> <span class=\"nummvalue\">"+tm.twoSpMin+"</span> ~ <span class=\"nummvalue\">"+tm.twoSpMax+"</span><br/>" +
					 "<span class=\"zhkeywords\"></span> <span class=\"nummvalue\">"+tm.threeSpMin+"</span>  ~ <span class=\"nummvalue\">"+tm.threeSpMax+"</span><br/>" +
					 "<span class=\"zhkeywords\"></span> <span class=\"nummvalue\">"+tm.fourSpMin+"</span>  ~ <span class=\"nummvalue\">"+tm.fourSpMax+"</span><br/>";
				 }
				 		
				 html3=html3+"</div><Div><span>初始投注金额</span><span class=\"nummoney\">"+tm.initMoney+"</span>元，最多连续不中<span class=\"nummoney\">"+tm.allCount+"</span>次</Div>" +
				 		"<div class=\"stopconditions weightbold\" ><span>停止条件（满足任意勾选条件时停止）</span> </div>" +
				 		"<div><span>单次投注≥</span> <span class=\"nummvalue \">"+tm.stopOnemoney+" </span>元</div>";
				 		if(tm.stopLose>0){
				 			html3=html3+"<div><span>亏损总额≥</span> <span class=\"nummvalue \">"+tm.stopLose+" </span>元</div>";
				 		}
				 		if(tm.stopAllmoney>0){
				 			html3=html3+"<div><span>盈利总额≥</span> <span class=\"nummvalue \">"+tm.stopAllmoney+" </span>元</div>";
				 		}
				 		
				 		html3=html3+"</div>";
				
				$("#track_info").html(html1);
				$("#track_child").html(html2);
				$("#track_setting").html(html3);
			} else {
				$("#track_info").html("<div class=\"append-recordnone\" id=\"orderRecordNoData\" style=\"\">暂无追号记录<p style=\"line-height:26px;\"></p></div>");
			}
		} catch (err) {
			//alert(err);
	
		}
	}, "text");
}
function getGGType(lot,type){
	if(lot ==9){
		if(type==0)return"单关配";
		if(type==1)return"单关";
		if(type==2)return"2串1";
		if(type==3)return"3串1";
		if(type==4)return"4串1";
	}else{
		return "篮球-2串1";
	}
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
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
function updateStopTrack(tmId,stopTrack) {
	var msg = "";
	if(stopTrack ==0) {
		msg = "确定停止追号吗?";
	} else if(stopTrack ==1) {
		msg = "确定继续追号吗?";
	} else if(stopTrack ==2) {
		msg = "确定暂停追号吗?";
	} 
		confirm(msg,tmId,stopTrack);	
}
function confirm(msg,tmId,stopTrack){
		$("#shwo_msg").html(msg);
		$("#alertjzzh").show();
		$("#findcc").click(function(){
			//$("#alertjzzh2").show();
			$.ajax({
				url:'/user/user-jc-track!updateStopTrack.action?tmId=' + tmId +"&trackMain.stopTrack=" + stopTrack +"&t=" + new Date().getTime(),
				success:function(data){
					try{
						var json=eval('('+data+')');
						if(parseInt(json.flag)==1){
							//$("#alertjzzh2").show();			
							//setTimeout($("#alertjzzh2").hide(),5000);
							location.href=location.href;
						}else{
							alert(json.msg);
						}
					}catch(err){
						alert('ajax请求异常:无法解析返回的数据');
					}
					}
				},'html');
			$("#alertjzzh").hide();
			return true;
		});
		$("#closesscc").click(function(){
			$("#alertjzzh").hide();
			return false;
		});
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