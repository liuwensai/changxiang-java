var dlt={};

dlt.amtTotal=0;//总金额
dlt.zs=0;//总注数
dlt.playId=1004;//玩法id
dlt.lotId=1;//彩种id
dlt.numberList=[];//号码List
dlt.isZhuiJia=false;
dlt.bs=1;

dlt.lsredList=[];
dlt.lsbluList=[];

//胆拖
dlt.lsredListdt=[];
dlt.lsbluListdt=[];

$(document).ready(function(){
	dlt.initevent();
	dlt.initHTML();
	
	var missNumberMap = getJsonDataAndSetToVar("/data/trade/dlt/number_miss_1001.json",false,null );
	if(missNumberMap){
		
		$("#redBall td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.headMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		$("#redBalldt td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.headMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		
		$("#bluBall td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.backMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		$("#bluBalldt td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.backMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
	
	}
	
	$("#eachSure").click(function(){
		if($(this).attr("class")=="Lexanf"){
			//var eachzs=dlt.calZS(dlt.lsredList,dlt.lsbluList);
			var lsMoney=dlt.calZS(dlt.lsredList,dlt.lsredListdt,dlt.lsbluList,dlt.lsbluListdt)*2;
			//单注投注金额不能超过2w
			if(lsMoney>20000){
				open_message("单个方案投注金额不超过20,000");
			}else{
				var singleNumber={
						index:dlt.numberList.length,
						eachzs:dlt.calZS(dlt.lsredList,dlt.lsredListdt,dlt.lsbluList,dlt.lsbluListdt),
						eachmoney:lsMoney,
						eachrednumber:dlt.lsredList,
						eachblunumber:dlt.lsbluList
				};
				dlt.numberList.push(singleNumber);
				dlt.initNumber();
				dlt.lsredList=[];
				dlt.lsbluList=[];
				dlt.lsredList.length=0;
				dlt.lsbluList.length=0;
				//清空选号的样式
				dlt.clearBallClass();
				//刷新金额
				$("#ttmoney").html(dlt.claMoney());
				dlt.caltotalZSAndMoney();
			}
		}
	});
	
	//机选事件
	$("#randomSele").click(function(){
			var redBall=jixuanA(34,5);
			var bluBall=jixuanA(11,2);
			var singleNumber={
					index:dlt.numberList.length,
					eachzs:1,
					eachmoney:1*2,
					eachrednumber:redBall,
					eachblunumber:bluBall
			};
			dlt.numberList.push(singleNumber);
			dlt.initNumber();
			$("#ttmoney").html(dlt.claMoney());
			dlt.caltotalZSAndMoney();			

	});
	
});


//机选
function getRedRandom(){
	var startArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];//seed array  
	var N = 6;//随机数个数  
	var resultArray = new Array();//结果存放在里面  
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray[i] = startArray[seed];//赋值给结果数组  
	    startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	return resultArray ;
}
function getBlueRandom(){
	var startArray = [1,2,3,4,5,6,7,8,9,10,11,12];//seed array  
	var N = 3;//随机数个数  
	var resultArray = new Array();//结果存放在里面  
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray[i] = startArray[seed];//赋值给结果数组  
	    startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	return resultArray ;
}

function getRandomBall(){
	var red = getRedRandom() ;
	var blue = getBlueRandom() ;
	clearSelect();
	
	for (var i = 0; i < 5; i++) {
		var v = $("a[index='"+red[i]+"']");
		v.addClass("dlyuan dlredon");
		dlt.lsredList.push($.trim(v.html()));
	}
	for (var i = 0; i < 2; i++) {
		var v = $("a[blueindex='"+blue[i]+"']");
		v.addClass("dlyuan dlblueon");
		dlt.lsbluList.push($.trim(v.html()));
	}
	//dlt.lsredList.push($.trim(v.html()));
	//dlt.lsbluList.push($.trim($(this).html()));
	dlt.eachSureClass();
}



dlt.initevent=function(){
	//红区胆
	$("#redBall").find(".dlyuan").click(function(){
		if($(this).attr("class")=="dlyuan"){
			if(dlt.lsredListdt.length < 4){
				$(this).addClass("dlyuan dlredon");
				var value = $.trim($(this).html()) ;
				dlt.lsredListdt.push($.trim($(this).html()));
				dlt.lsredList.each(function(i,o){
					//去除该胆的拖
					if(value==i){
						var vu = parseInt(value) ;
						$("a[reddtindex="+vu+"]").removeClass("dlyuan dlredon");
						$("a[reddtindex="+vu+"]").addClass("dlyuan");
						dlt.lsredList.splice(o, 1);
					}
				}) ;
			}
			dlt.eachSureClass();
		}else{
			$(this).removeClass("dlredon");
			$(this).addClass("dlyuan");
			dlt.lsredListdt.remove($.trim($(this).html()));
			dlt.eachSureClass();
		}
	});
	//蓝区胆
	$("#bluBall").find(".dlyuan").click(function(){
		if($(this).attr("class")=="dlyuan"){
			if(dlt.lsbluListdt.length < 1){
				$(this).addClass("dlyuan dlblueon");
				var value = $.trim($(this).html());
				dlt.lsbluListdt.push($.trim($(this).html()));
				dlt.lsbluList.each(function(i,o){
					if(value==i){
						//去除该胆的拖
						var vu = parseInt(value) ;
						$("a[bluedtindex="+vu+"]").removeClass("dlyuan dlblueon");
						$("a[bluedtindex="+vu+"]").addClass("dlyuan");
						dlt.lsbluList.splice(o, 1);
					}
				}) ;
			}
			dlt.eachSureClass();
		}else{
			$(this).removeClass("dlyuan dlblueon");
			$(this).addClass("dlyuan");
			dlt.lsbluListdt.remove($.trim($(this).html()));
			dlt.eachSureClass();
		}
	});
	
	//红区拖
	$("#redBalldt").find(".dlyuan").click(function(){
		if($(this).attr("class")=="dlyuan"){
			$(this).addClass("dlyuan dlredon");
			
			var value = $.trim($(this).html()) ;
			dlt.lsredList.push($.trim($(this).html()));
			
			dlt.lsredListdt.each(function(i,o){
				if(value==i){
					//去除红区胆
					var vu = parseInt(value) ;
					$("a[redindex="+vu+"]").removeClass("dlyuan dlredon");
					$("a[redindex="+vu+"]").addClass("dlyuan");
					dlt.lsredListdt.splice(o, 1);
				}
			}) ;
			
			dlt.eachSureClass();
		}else{
			$(this).removeClass("dlredon");
			$(this).addClass("dlyuan");
			dlt.lsredList.remove($.trim($(this).html()));
			dlt.eachSureClass();
		}
	});
	
	//蓝区拖
	$("#bluBalldt").find(".dlyuan").click(function(){
		if($(this).attr("class")=="dlyuan"){
			$(this).addClass("dlyuan dlblueon");
			
			var value = $.trim($(this).html()) ;
			dlt.lsbluList.push($.trim($(this).html()));
			
			dlt.lsbluListdt.each(function(i,o){
				if(value==i){
					//去除该拖对应的胆
					var vu = parseInt(value) ;
					$("a[blueindex="+vu+"]").removeClass("dlyuan dlblueon");
					$("a[blueindex="+vu+"]").addClass("dlyuan");
					dlt.lsbluListdt.splice(o, 1);
				}
			}) ;
			
			dlt.eachSureClass();
		}else{
			$(this).removeClass("dlyuan dlblueon");
			$(this).addClass("dlyuan");
			dlt.lsbluList.remove($.trim($(this).html()));
			dlt.eachSureClass();
		}
	});
	
	
	$("#zhuijia").click(function(){
		if($("#zhuijia").is(":checked"))
			dlt.isZhuiJia=true;
		else
			dlt.isZhuiJia=false;
		dlt.caleachMoney();
		$("#ttmoney").html(dlt.claMoney());
	});
	$("#beishu").blur(function(){
		if($("#beishu").val()>1000){
			$("#beishu").val(1000);
			dlt.bs=1000;
		}else if($("#beishu").val()<1){
			$("#beishu").val(1);
			dlt.bs=1;
		}else{
			dlt.bs=$("#beishu").val();
		}
		$("#ttmoney").html(dlt.claMoney());
	});
	$("#confirmSure").click(function(){
		dlt.dobuy();
	});
	$("#commitData").click(function() {
		open_message("对不起,本期暂停购买");
		return;
	});
};
dlt.initHTML=function(){
	if(dlt.isZhuiJia){
		$("#zhuijia").attr("checked",true);
	}else{
		$("#zhuijia").attr("checked",false);
	}
	
};
//大乐透追加投注计算每个方案金额
dlt.caleachMoney=function(){
	dlt.numberList.each(function(o,i){
		if(dlt.isZhuiJia){
			o.eachmoney=o.eachzs*3;
		}else{
			o.eachmoney=o.eachzs*2;
		}
	});
};
//计算总金额,计算总注数
dlt.caltotalZSAndMoney=function(){
	dlt.zs=0;
	dlt.amtTotal=0;
	//eachzs:1,eachmoney:1*2,
	dlt.numberList.each(function(o,i){
		dlt.zs+=o.eachzs;
		dlt.amtTotal+=o.eachmoney;
	});
	$("#dlzs").html(dlt.zs) ;
	$("#dlAmt").html(dlt.amtTotal)
};
//大乐透计算注数
dlt.calZS=function(redBalls , redBallsdt , bluBalls , bluBallsdt){
	var redzs=Math.c(redBalls.length,5-redBallsdt.length,18);
	var bluzs=Math.c(bluBalls.length,2-bluBallsdt.length,18);
	return redzs*bluzs;
};
//给选好了添加样式
dlt.eachSureClass=function(){
	var redlen = dlt.lsredList.length + dlt.lsredListdt.length ;
	var bluelen = dlt.lsbluList.length + dlt.lsbluListdt.length ;
	
	//是否设胆 ，设胆红区 拖+胆大于五
	if(dlt.lsredListdt .length > 0){
		if(redlen <6){
			$("#eachSure").attr("class","LexanfW");
			$("#dlzs").html(0);
			$("#dlAmt").html(0);
			return ;
		}
	}
	//是否设胆，设胆蓝区 拖+胆大于二
	if(dlt.lsbluListdt.length > 0){
		if(bluelen < 3){
			$("#eachSure").attr("class","LexanfW");
			$("#dlzs").html(0);
			$("#dlAmt").html(0);
			return ;
		}
	}
	
	//没设胆红区大于4 蓝区大于1 可计算注数
	if(redlen>=5 && bluelen>=2){
		//计算注数  红拖  红胆  蓝拖  蓝胆
		var dls=dlt.calZS(dlt.lsredList , dlt.lsredListdt ,dlt.lsbluList , dlt.lsbluListdt);
		$("#dlzs").html(dls);
		$("#dlAmt").html(dls*2);
		$("#eachSure").attr("class","Lexanf");
	}else{
		$("#eachSure").attr("class","LexanfW");
		$("#dlzs").html(0);
		$("#dlAmt").html(0);
	}
};

dlt.clearBallClass=function(){
	$(".dlyuan").attr("class","dlyuan");
	$("#eachSure").attr("class","LexanfW");
};
dlt.initNumber=function(){
	var tpl=['<li index="{$index}"><span class="fl dianf" title="{$rednumber}|{$blunumber}">'+
	         '<em class="fontred">{$rednumber}</em> | <em class="fontblue">{$blunumber}</em></span>'+
	         '<span class="fr"><a href="javascript:deleteNumberList({$index})" class="del">删除</a>'+
	         '<a href="javascript:updateNumberList({$index})" index="{$index}" class="del">修改</a></span></li>'
	         ];
	var divhtml=[];
	dlt.numberList.each(function(o,i){
		var html=tpl[0];
		html=html.replace("{$rednumber}",o.eachrednumber.join(","));
		html=html.replace("{$blunumber}",o.eachblunumber.join(","));
		html=html.replace("{$rednumber}",o.eachrednumber.join(","));
		html=html.replace("{$blunumber}",o.eachblunumber.join(","));
		html=html.tpl(o);
		divhtml.push(html);
	});
	$("#confirmBox").html(divhtml.join(""));
};

//大乐透计算总金额
dlt.claMoney=function(){
	var totalMoney=function(obj){
		var lstotalMoney=0;
		obj.each(function(o,i){
			lstotalMoney+=o.eachmoney;
		});
		return lstotalMoney;
	}(dlt.numberList);
	return totalMoney*dlt.bs;
};

//删除选择的号码
function deleteNumberList(i){
	for(var j=0,k=dlt.numberList.length;j<k;j++){
		if(dlt.numberList[j].index==i){
			dlt.numberList.splice(j,1);
			break;
		}
	}
	dlt.initNumber();
	$("#ttmoney").html(dlt.claMoney());
}
//修改选择的号码
function updateNumberList(i){
	var redballs=$("#redBall").find(".dlyuan");
	var bluballs=$("#bluBall").find(".dlyuan");
	redballs.attr("class","dlyuan");
	bluballs.attr("class","dlyuan");
	dlt.lsredList=[];
	dlt.lsbluList=[];
	dlt.lsredList.length=0;
	dlt.lsbluList.length=0;
	dlt.numberList.each(function(o,z){
		//dlt.lsredList.length>=5 && dlt.lsbluList.length
		if(o.index==i){
			for(var j=0,k=o.eachrednumber.length;j<k;j++){
				redballs.each(function(){
					if($(this).html()==o.eachrednumber[j]){
						$(this).addClass("dlyuan dlredon");
						dlt.lsredList.push(o.eachrednumber[j]);
					}
				});
			}
			for(var j=0,k=o.eachblunumber.length;j<k;j++){
				bluballs.each(function(){
					if($(this).html()==o.eachblunumber[j]){
						$(this).addClass("dlyuan dlblueon");
						dlt.lsbluList.push(o.eachblunumber[j]);
					}
				});
			}
		}
	});
	dlt.eachSureClass();
}

dlt.dobuy=function(){
	if(dlt.claMoney()>600000){
		open_message("您好，单个方案最大金额为￥600,000.00元"); 
		return false;
	}
	if(dlt.numberList.length==0){
		open_message("至少选择一注号码才能投注");
		return;
	}
	if(!checkLoginByAjax()){
		return ;
	}
	$("#numberList").val(dlt.numberList.length);
	$("#lotId").val(dlt.lotId);
	$("#playId").val(dlt.playId);
	$("#zs").val(dlt.zs);
	$("#bs").val(dlt.bs);
	$("#totalAmt").val(dlt.amtTotal);
	$("#codes").val(dlt.getNumberCodes());
	$("#szcfrom").submit();

};
//把numberList组合成为列表形式的
dlt.getNumberCodes=function(){
	///约定注数|金额|红球|蓝球
	var tmp="{$redDtBall}{$redBall}|{$bluDtBall}{$bluBall}";
	/*index:dlt.numberList.length,eachzs:1,eachmoney:1*2,eachrednumber:redBall,eachblunumber:bluBall*/
	var codes=[];
	dlt.numberList.each(function(o,i){
		var lscode=tmp;
		if(o.eachreddtnumber.length >0){
			lscode=lscode.replace("{$redBall}","#"+o.eachrednumber.join(","));
		} else {
			lscode=lscode.replace("{$redBall}",o.eachrednumber.join(","));
		}
		lscode=lscode.replace("{$redDtBall}",o.eachreddtnumber.join(","));
		
		if(o.eachbludtnumber.length >0){
			lscode=lscode.replace("{$bluBall}","#"+o.eachblunumber.join(","));
		} else {
			lscode=lscode.replace("{$bluBall}",o.eachblunumber.join(","));
		}
		lscode=lscode.replace("{$bluDtBall}", o.eachbludtnumber.join(","));
		codes.push(lscode);
	});
	return codes.join("$");
};

//确定
function confirm(){
	if(!checkLoginByAjax()){
		return ;
	}
	var v = dlt.calZS(dlt.lsredList,dlt.lsredListdt,dlt.lsbluList,dlt.lsbluListdt) ;
	if(v > 0){
		//var eachzs=dlt.calZS(dlt.lsredList,dlt.lsbluList);
		var lsMoney=dlt.calZS(dlt.lsredList,dlt.lsredListdt,dlt.lsbluList,dlt.lsbluListdt)*2;
		//单注投注金额不能超过2w
		if(lsMoney>20000){
			open_message("单个方案投注金额不超过20,000");
		}else{
			var singleNumber={
					index:dlt.numberList.length,
					eachzs:dlt.calZS(dlt.lsredList,dlt.lsredListdt,dlt.lsbluList,dlt.lsbluListdt),
					eachmoney:lsMoney,
					eachrednumber:dlt.lsredList,
					eachblunumber:dlt.lsbluList,
					eachreddtnumber:dlt.lsredListdt,
					eachbludtnumber:dlt.lsbluListdt
			};
			dlt.numberList.push(singleNumber);
			dlt.initNumber();
			dlt.lsredList=[];
			dlt.lsbluList=[];
			dlt.lsredListdt=[];
			dlt.lsbluListdt=[];
			dlt.lsredList.length=0;
			dlt.lsbluList.length=0;
			dlt.lsredListdt.length=0;
			dlt.lsbluListdt.length=0;
			//清空选号的样式
			dlt.clearBallClass();
			//刷新金额
			$("#ttmoney").html(dlt.claMoney());
			dlt.caltotalZSAndMoney();
			
			dlt.dobuy();
		}
	} else {
		if(haveSaveData() == 1){
			$("#lotId").val(dlt.lotId);
			$("#playId").val(dlt.playId);
			$("#szcfrom").submit();
		} else {
			open_message("请选择投注的号码") ;
			return ;
		}
	}
}

function haveSaveData(){
	var va = $("#alcodes").val();
	if(va > 0){
		return 1;
	} else {
		return 0 ;
	}
}

function nosale(){
	open_message("对不起,本期暂停购买");
}
function clearSelect(){
	$(".dlyuan").attr("class","dlyuan");
	dlt.initNumber();
	dlt.numberList=[];
	dlt.lsredList=[];
	dlt.lsbluList=[];
	dlt.lsredList.length=0;
	dlt.lsbluList.length=0;
	dlt.lsreddtList=[];
	dlt.lsbludtList=[];
	dlt.lsreddtList.length=0;
	dlt.lsbludtList.length=0;
	dlt.clearBallClass();
	//$("#ttmoney").html(dlt.claMoney());
	dlt.caltotalZSAndMoney();
}