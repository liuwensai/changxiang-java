var qxc={};

qxc.amtTotal=0;//总金额
qxc.zs=0;//总注数
qxc.playId=4001;//玩法id
qxc.lotId=4;//彩种id
qxc.numberList=[];//号码List
qxc.bs=1;
var eachobj={};

//用来判断是否可以确定 1为可以确定
var tijiao = 0 ;

$(document).ready(function(){
	qxc.initevent();
	qxc.index=0;
	
	var missNumberMap = getJsonDataAndSetToVar("/data/trade/qxc/number_miss_4001.json",false,null );
	if(missNumberMap){
		
		$("#oneNumber td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.baiwanMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		$("#twoNumber td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.shiwanMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		$("#threeNumber td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.wanMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		$("#fourNumber td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.qianMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		$("#fiveNumber td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.baiMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		$("#sixNumber td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.shiMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		$("#sevenNumber td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.geMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
	
	}
	
	$("#eachSure").click(function(){
		if($(this).attr("class")=="Lexanf"){
			var lsMoney=qxc.calZS()*2;
			//单注投注金额不能超过2w
			if(lsMoney>20000){
				open_message("单个方案投注金额不超过20,000");
			}else{
				eachobj.oneNumber.sort(function(a,b){
					return a-b;
				});
				eachobj.twoNumber.sort(function(a,b){
					return a-b;
				});
				eachobj.threeNumber.sort(function(a,b){
					return a-b;
				});
				eachobj.fourNumber.sort(function(a,b){
					return a-b;
				});
				eachobj.fiveNumber.sort(function(a,b){
					return a-b;
				});
				eachobj.sixNumber.sort(function(a,b){
					return a-b;
				});
				eachobj.sevenNumber.sort(function(a,b){
					return a-b;
				});
				
				var singleNumber={
						index:qxc.index,
						eachzs:qxc.calZS(),
						eachmoney:lsMoney,
						eachobj:eachobj
				};
				qxc.numberList.push(singleNumber);
				qxc.index++;
				qxc.initNumber();
				eachobj = {};
				
				//清空选号的样式
				qxc.clearBallClass();
				//刷新金额
				$("#ttmoney").html(qxc.claMoney());
				qxc.caltotalZSAndMoney();
			}
		}
	});
	//机选事件
	$("#randomSele").click(function(){
		var randomBall=randomWithRepeat(9,7);//从0~9中随机取7个
		eachobj = {};
		eachobj.oneNumber=[];
		eachobj.twoNumber=[];
		eachobj.threeNumber=[];
		eachobj.fourNumber=[];
		eachobj.fiveNumber=[];
		eachobj.sixNumber=[];
		eachobj.sevenNumber=[];
		eachobj.oneNumber.push(randomBall[0]);
		eachobj.twoNumber.push(randomBall[1]);
		eachobj.threeNumber.push(randomBall[2]);
		eachobj.fourNumber.push(randomBall[3]);
		eachobj.fiveNumber.push(randomBall[4]);
		eachobj.sixNumber.push(randomBall[5]);
		eachobj.sevenNumber.push(randomBall[6]);
		
		var singleNumber={
				index:qxc.numberList.length,
				eachzs:1,
				eachmoney:1*2,
				eachobj:eachobj
		};
		qxc.numberList.push(singleNumber);
		qxc.initNumber();
		$("#ttmoney").html(qxc.claMoney());
		qxc.caltotalZSAndMoney();
	});
});

function getRedRandom(){
	var startArray = [1,2,3,4,5,6,7,8,9];//seed array  
	var N = 2;//随机数个数  
	var resultArray = new Array();//结果存放在里面  
	for(var i = 0; i < N; i++){  
	    var seed = Math.floor(Math.random()*(startArray.length-i)) ;//Math.random(0, startArray.length - i);//从剩下的随机数里生成  
	    resultArray[i] = startArray[seed];//赋值给结果数组  
	    startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。  
	}
	return resultArray ;
}

function getRandomNum(){
	qxclearSelect();
	
	var v1 = getRedRandom();
	var v2 = getRedRandom();
	var v3 = getRedRandom();
	var v4 = getRedRandom();
	var v5 = getRedRandom();
	var v6 = getRedRandom();
	var v7 = getRedRandom();
	
	var s1 = $("a[index1='"+v1[0]+"']");
	var s2 = $("a[index2='"+v2[0]+"']");
	var s3 = $("a[index3='"+v3[0]+"']");
	var s4 = $("a[index4='"+v4[0]+"']");
	var s5 = $("a[index5='"+v5[0]+"']");
	var s6 = $("a[index6='"+v6[0]+"']");
	var s7 = $("a[index7='"+v7[0]+"']");
	
	s1.addClass("dlyuan dlredon");
	s2.addClass("dlyuan dlredon");
	s3.addClass("dlyuan dlredon");
	s4.addClass("dlyuan dlredon");
	s5.addClass("dlyuan dlredon");
	s6.addClass("dlyuan dlredon");
	s7.addClass("dlyuan dlredon");
	
	eachobj.oneNumber=[];
	eachobj.twoNumber=[];
	eachobj.threeNumber=[];
	eachobj.fourNumber=[];
	eachobj.fiveNumber=[];
	eachobj.sixNumber=[];
	eachobj.sevenNumber=[];
	
	eachobj.oneNumber.push($.trim(s1.html()));
	eachobj.twoNumber.push($.trim(s2.html()));
	eachobj.threeNumber.push($.trim(s3.html()));
	eachobj.fourNumber.push($.trim(s4.html()));
	eachobj.fiveNumber.push($.trim(s5.html()));
	eachobj.sixNumber.push($.trim(s6.html()));
	eachobj.sevenNumber.push($.trim(s7.html()));
	qxc.eachSureClass();
}

qxc.initevent=function(){
	//七星彩直选复式添加点击事件
	$("#qxinf").find(".dlyuan").click(function(){
		var place = $(this).parent().parent().parent().parent().attr('place');
		var numberCode = $.trim($(this).html());
		if($(this).attr("class")=="dlyuan"){
			$(this).addClass("dlyuan dlredon");
			if(place=='oneNumber') {
				eachobj.oneNumber=typeof eachobj.oneNumber==='undefined'?[]:eachobj.oneNumber;
				eachobj.oneNumber.push(numberCode);
			} else if(place=='twoNumber') {
				eachobj.twoNumber = typeof eachobj.twoNumber==='undefined'?[]:eachobj.twoNumber;
				eachobj.twoNumber.push(numberCode);
			} else if(place=='threeNumber') {
				eachobj.threeNumber = typeof eachobj.threeNumber==='undefined'?[]:eachobj.threeNumber;
				eachobj.threeNumber.push(numberCode);
			} else if(place=='fourNumber') {
				eachobj.fourNumber = typeof eachobj.fourNumber==='undefined'?[]:eachobj.fourNumber;
				eachobj.fourNumber.push(numberCode);
			} else if(place=='fiveNumber') {
				eachobj.fiveNumber = typeof eachobj.fiveNumber==='undefined'?[]:eachobj.fiveNumber;
				eachobj.fiveNumber.push(numberCode);
			} else if(place=='sixNumber') {
				eachobj.sixNumber = typeof eachobj.sixNumber==='undefined'?[]:eachobj.sixNumber;
				eachobj.sixNumber.push(numberCode);
			} else if(place=='sevenNumber') {
				eachobj.sevenNumber = typeof eachobj.sevenNumber==='undefined'?[]:eachobj.sevenNumber;
				eachobj.sevenNumber.push(numberCode);
			} 
			qxc.eachSureClass();
		}else{
			$(this).removeClass("dlredon");
			$(this).addClass("dlyuan");
			if(place=='oneNumber') {
				eachobj.oneNumber.remove(numberCode);
			} else if(place=='twoNumber') {
				eachobj.twoNumber.remove(numberCode);
			} else if(place=='threeNumber') {
				eachobj.threeNumber.remove(numberCode);
			} else if(place=='fourNumber') {
				eachobj.fourNumber.remove(numberCode);
			} else if(place=='fiveNumber') {
				eachobj.fiveNumber.remove(numberCode);
			} else if(place=='sixNumber') {
				eachobj.sixNumber.remove(numberCode);
			} else if(place=='sevenNumber') {
				eachobj.sevenNumber.remove(numberCode);
			} 
			qxc.eachSureClass();
		}
	});
	
	$("#beishu").blur(function(){
		if($("#beishu").val()>1000){
			$("#beishu").val(1000);
			qxc.bs=1000;
		}else if($("#beishu").val()<1){
			$("#beishu").val(1);
			qxc.bs=1;
		}else{
			qxc.bs=$("#beishu").val();
		}
		
		if(qxc.claMoney()>600000){
			open_message("您好，单个方案最大金额为￥600,000.00元"); 
			return false;
		}
		
		$("#ttmoney").html(qxc.claMoney());
		qxc.caltotalZSAndMoney();
	});
	$("#confirmSure").click(function(){
		qxc.dobuy();
	});
	
	$("#commitData").click(function() {
		open_message("对不起,本期暂停购买");
		return;
	});
};

//计算总金额,计算总注数
qxc.caltotalZSAndMoney=function(){
	var beishu = $("#beishu").val();
	qxc.bs = beishu;
	qxc.zs=0;
	qxc.amtTotal=0;
	//eachzs:1,eachmoney:1*2,
	qxc.numberList.each(function(o,i){
		qxc.zs+=o.eachzs;
		qxc.amtTotal+=o.eachmoney*qxc.bs;
	});
};
//计算排列三直选注数
qxc.calZS=function(){
	return eachobj.oneNumber.length*eachobj.twoNumber.length*eachobj.threeNumber.length*eachobj.fourNumber.length*eachobj.fiveNumber.length*eachobj.sixNumber.length*eachobj.sevenNumber.length;
};

//给选好了添加样式
qxc.eachSureClass=function(){
	if(eachobj.oneNumber.length*eachobj.twoNumber.length*eachobj.threeNumber.length*eachobj.fourNumber.length*eachobj.fiveNumber.length*eachobj.sixNumber.length*eachobj.sevenNumber.length != 'undefined' &&
	   eachobj.oneNumber.length*eachobj.twoNumber.length*eachobj.threeNumber.length*eachobj.fourNumber.length*eachobj.fiveNumber.length*eachobj.sixNumber.length*eachobj.sevenNumber.length	>=1){
		$("#eachSure").attr("class","Lexanf");
		tijiao = 1 ;
		var qxs=qxc.calZS();
		$("#qxzs").html(qxs);
		$("#qxAmt").html(qxs*2);
	}else{
		$("#eachSure").attr("class","LexanfW");
		tijiao = 0 ;
		$("#qxzs").html(0);
		$("#qxAmt").html(0);
	}
};

qxc.clearBallClass=function(){
	$(".dlyuan").attr("class","dlyuan");
	$("#eachSure").attr("class","LexanfW");
};

qxc.initNumber=function(){
	var tpl=['<li index="{$index}"><span class="fl" title="{$numbercode}" style="width: 160px; overflow: hidden;">{$numbercode}</span>'+
	         '<span class="fr"><a href="javascript:deleteNumberList({$index})" class="del">删除</a>'
	         ];//+    '<a href="javascript:updateNumberList({$index})" index="{$index}" class="del">修改</a></span></li>'
	var divhtml=[];
	
	qxc.numberList.each(function(o,i){
		var html=tpl[0];
		html=html.replace("{$numbercode}",o.eachobj.oneNumber.join("")+","+o.eachobj.twoNumber.join("")+","+o.eachobj.threeNumber.join("")+","+
				o.eachobj.fourNumber.join("")+","+o.eachobj.fiveNumber.join("")+","+o.eachobj.sixNumber.join("")+","+o.eachobj.sevenNumber.join(""));
		html=html.replace("{$numbercode}",o.eachobj.oneNumber.join("")+","+o.eachobj.twoNumber.join("")+","+o.eachobj.threeNumber.join("")+","+
				o.eachobj.fourNumber.join("")+","+o.eachobj.fiveNumber.join("")+","+o.eachobj.sixNumber.join("")+","+o.eachobj.sevenNumber.join(""));
		html=html.tpl(o);
		divhtml.push(html);
	});
	
	$("#confirmBox").html(divhtml.join(""));
};

//排列三计算总金额
qxc.claMoney=function(){
	var beishu = $("#beishu").val();
	qxc.bs = beishu;
	
	var totalMoney=function(obj){
		var lstotalMoney=0;
		obj.each(function(o,i){
			lstotalMoney+=o.eachmoney;
		});
		return lstotalMoney;
	}(qxc.numberList);
	return totalMoney*qxc.bs;
};

//删除选择的号码
function deleteNumberList(i){
	for(var j=0,k=qxc.numberList.length;j<k;j++){
		if(qxc.numberList[j].index==i){
			qxc.numberList.splice(j,1);
			break;
		}
	}
	qxc.initNumber();
	$("#ttmoney").html(qxc.claMoney());
}
//修改选择的号码
function updateNumberList(i){
	var oneNumber = $("#oneNumber").find(".dlyuan");
	var twoNumber = $("#twoNumber").find(".dlyuan");
	var threeNumber = $("#threeNumber").find(".dlyuan");
	var fourNumber = $("#fourNumber").find(".dlyuan");
	var fiveNumber = $("#fiveNumber").find(".dlyuan");
	var sixNumber = $("#sixNumber").find(".dlyuan");
	var sevenNumber = $("#sevenNumber").find(".dlyuan");
	oneNumber.attr("class","dlyuan");
	twoNumber.attr("class","dlyuan");
	threeNumber.attr("class","dlyuan");
	fourNumber.attr("class","dlyuan");
	fiveNumber.attr("class","dlyuan");
	sixNumber.attr("class","dlyuan");
	sevenNumber.attr("class","dlyuan");

	eachobj = {};
	qxc.numberList.each(function(o,z){
		if(o.index==i){
			for(var j=0,k=o.eachobj.oneNumber.length;j<k;j++){
				oneNumber.each(function(){
					if($(this).html()==o.eachobj.oneNumber[j]){
						$(this).addClass("dlyuan dlredon");
						eachobj.oneNumber=typeof eachobj.oneNumber==='undefined'?[]:eachobj.oneNumber;
						eachobj.oneNumber.push(o.eachobj.oneNumber[j]);
					}
				});
			}
			for(var j=0,k=o.eachobj.twoNumber.length;j<k;j++){
				twoNumber.each(function(){
					if($(this).html()==o.eachobj.twoNumber[j]){
						$(this).addClass("dlyuan dlredon");
						eachobj.twoNumber=typeof eachobj.twoNumber==='undefined'?[]:eachobj.twoNumber;
						eachobj.twoNumber.push(o.eachobj.twoNumber[j]);
					}
				});
			}
			for(var j=0,k=o.eachobj.threeNumber.length;j<k;j++){
				threeNumber.each(function(){
					if($(this).html()==o.eachobj.threeNumber[j]){
						$(this).addClass("dlyuan dlredon");
						eachobj.threeNumber=typeof eachobj.threeNumber==='undefined'?[]:eachobj.threeNumber;
						eachobj.threeNumber.push(o.eachobj.threeNumber[j]);
					}
				});
			}
			for(var j=0,k=o.eachobj.fourNumber.length;j<k;j++){
				fourNumber.each(function(){
					if($(this).html()==o.eachobj.fourNumber[j]){
						$(this).addClass("dlyuan dlredon");
						eachobj.fourNumber=typeof eachobj.fourNumber==='undefined'?[]:eachobj.fourNumber;
						eachobj.fourNumber.push(o.eachobj.fourNumber[j]);
					}
				});
			}
			for(var j=0,k=o.eachobj.fiveNumber.length;j<k;j++){
				fiveNumber.each(function(){
					if($(this).html()==o.eachobj.fiveNumber[j]){
						$(this).addClass("dlyuan dlredon");
						eachobj.fiveNumber=typeof eachobj.fiveNumber==='undefined'?[]:eachobj.fiveNumber;
						eachobj.fiveNumber.push(o.eachobj.fiveNumber[j]);
					}
				});
			}
			for(var j=0,k=o.eachobj.sixNumber.length;j<k;j++){
				sixNumber.each(function(){
					if($(this).html()==o.eachobj.sixNumber[j]){
						$(this).addClass("dlyuan dlredon");
						eachobj.sixNumber=typeof eachobj.sixNumber==='undefined'?[]:eachobj.sixNumber;
						eachobj.sixNumber.push(o.eachobj.sixNumber[j]);
					}
				});
			}
			for(var j=0,k=o.eachobj.sevenNumber.length;j<k;j++){
				sevenNumber.each(function(){
					if($(this).html()==o.eachobj.sevenNumber[j]){
						$(this).addClass("dlyuan dlredon");
						eachobj.sevenNumber=typeof eachobj.sevenNumber==='undefined'?[]:eachobj.sevenNumber;
						eachobj.sevenNumber.push(o.eachobj.sevenNumber[j]);
					}
				});
			}
		}
	});
	
	qxc.eachSureClass();
}

qxc.dobuy=function(){
	if(qxc.amtTotal > 600000) {
		open_message("您好，单个方案最大金额为￥600,000.00元"); 
		return;
	}
	if(!checkLoginByAjax()){
		return ;
	}
	
	if(qxc.numberList.length==0) {
		open_message("至少选择一注号码才能投注");
		return;
	}
	$("#lotId").val(qxc.lotId);
	$("#playId").val(parseInt(qxc.playId));
	$("#zs").val(qxc.zs);
	$("#bs").val(qxc.bs);
	$("#totalAmt").val(qxc.amtTotal);
	$("#codes").val(qxc.getNumberCodes());
	$("#szcfrom").submit();
};
//把numberList组合成为列表形式的
qxc.getNumberCodes=function(){
	//一位|二位|三位...七位$一位|二位|三位...七位
	var tmp="{$oneNumber},{$twoNumber},{$threeNumber},{$fourNumber},{$fiveNumber},{$sixNumber},{$sevenNumber}";
	var codes=[];
	qxc.numberList.each(function(o,i){
		var lscode=tmp;
		lscode=lscode.replace("{$oneNumber}",o.eachobj.oneNumber.join(""));
		lscode=lscode.replace("{$twoNumber}",o.eachobj.twoNumber.join(""));
		lscode=lscode.replace("{$threeNumber}",o.eachobj.threeNumber.join(""));
		lscode=lscode.replace("{$fourNumber}",o.eachobj.fourNumber.join(""));
		lscode=lscode.replace("{$fiveNumber}",o.eachobj.fiveNumber.join(""));
		lscode=lscode.replace("{$sixNumber}",o.eachobj.sixNumber.join(""));
		lscode=lscode.replace("{$sevenNumber}",o.eachobj.sevenNumber.join(""));
		codes.push(lscode);
	});
	return codes.join("$");
};

function qxconfirm(){
	if(!checkLoginByAjax()){
		return ;
	}
	if(tijiao == 1){
		var lsMoney=qxc.calZS()*2;
		//单注投注金额不能超过2w
		if(lsMoney>20000){
			open_message("单个方案投注金额不超过20,000");
		}else{
			eachobj.oneNumber.sort(function(a,b){
				return a-b;
			});
			eachobj.twoNumber.sort(function(a,b){
				return a-b;
			});
			eachobj.threeNumber.sort(function(a,b){
				return a-b;
			});
			eachobj.fourNumber.sort(function(a,b){
				return a-b;
			});
			eachobj.fiveNumber.sort(function(a,b){
				return a-b;
			});
			eachobj.sixNumber.sort(function(a,b){
				return a-b;
			});
			eachobj.sevenNumber.sort(function(a,b){
				return a-b;
			});
			
			var singleNumber={
					index:qxc.index,
					eachzs:qxc.calZS(),
					eachmoney:lsMoney,
					eachobj:eachobj
			};
			qxc.numberList.push(singleNumber);
			qxc.index++;
			qxc.initNumber();
			eachobj = {};
			
			//清空选号的样式
			qxc.clearBallClass();
			//刷新金额
			$("#ttmoney").html(qxc.claMoney());
			qxc.caltotalZSAndMoney();
			
			qxc.dobuy();
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


function qxclearSelect(){
	//清空选号的样式
	qxc.clearBallClass();
	
	qxc.numberList=[];
	qxc.index=0;
	qxc.initNumber();
	eachobj = {};

	//刷新金额
	$("#ttmoney").html(qxc.claMoney());
	qxc.caltotalZSAndMoney();
}
function qxnosale(){
	open_message("对不起,本期暂停购买");
}