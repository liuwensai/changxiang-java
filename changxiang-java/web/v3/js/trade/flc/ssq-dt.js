var ssq={};

ssq.amtTotal=0;//总金额
ssq.zs=0;//总注数
ssq.playId=50002;//玩法id
ssq.lotId=50;//彩种id
ssq.numberList=[];//号码List
ssq.isZhuiJia=false;
ssq.bs=1;

ssq.lsredList=[];
ssq.lsredList_2=[];
ssq.lsbluList=[];


$(document).ready(function(){

	var missNumberMap = getJsonDataAndSetToVar("/data/trade/flc/number_miss_50001.json",false,null );
	if(missNumberMap){
		
		$("#redBall td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.headMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
		
		$("#redBall_2 td").find("a").each(function(){
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
	
	}
	
	$("#redBall a,#redBall_2 a").each(function (){
		$(this).attr("onclick","clickRedBall(this)");
	});
	
	$("#bluBall a").each(function (){
		$(this).attr("onclick","clickBlueBall(this)");
	});
	
	$("#selectPlayWay").blur(function(){
		$("#selectPlayWay").hide();
	  });

	$("#confirmSure").click(function(){
		dobuy();
	});
});


//红球点击事件
function clickRedBall(obj){
	
	var val = $(obj).text().trim();
	var parentsCls = $(obj).parents("table").attr("id");
	if($(obj).attr("class")=="dlyuan"){
		if(ssq.lsredList.length>4 && parentsCls=="redBall"){
			open_message("红球胆码只能是1~5个!");
			return;
		}
		
		if(ssq.lsredList_2.contains(val) && ssq.lsredList_2.length>0){
			open_message("胆码和拖码不能相同，请重新选择胆码");
			return;
		}
		
		if(ssq.lsredList.contains(val) && ssq.lsredList.length>0){
			open_message("胆码和拖码不能相同，请重新选择拖码");
			return;
		}
		
		$(obj).addClass("dlyuan dlredon");
		if(parentsCls == "redBall"){
			ssq.lsredList.push(val);
		}else if(parentsCls == "redBall_2"){
			ssq.lsredList_2.push(val);
		}

	}else{
		$(obj).removeClass("dlyuan dlredon");
		$(obj).addClass("dlyuan");
		var parentsCls = $(obj).parents("table").attr("id");
		
		if(parentsCls == "redBall"){
			var subscript = ssq.lsredList.indexOf(val);
			ssq.lsredList.splice(subscript,1);
		}else if(parentsCls == "redBall_2"){
			var subscript_2 = ssq.lsredList_2.indexOf(val);
			ssq.lsredList_2.splice(subscript_2,1);
		}
	}
	
	pandanzs();
}

//篮球点击事件
function clickBlueBall(obj){
	var val = $(obj).text().trim();
	if($(obj).attr("class")=="dlyuan"){
		$(obj).addClass("dlyuan dlblueon");
		ssq.lsbluList.push(val);	
	}else{
		$(obj).removeClass("dlyuan dlblueon");
		$(obj).addClass("dlyuan");
		var subscript = ssq.lsbluList.indexOf(val);
		if(subscript>-1){
			ssq.lsbluList.splice(subscript,1);
		}
	}
	pandanzs();
}

//判断红球、篮球是否大于或等于一注
function pandanzs(){
	if((ssq.lsredList.length+ssq.lsredList_2.length)>=6 && ssq.lsredList.length>1 && ssq.lsredList.length<=5 && ssq.lsredList_2.length>=2 && ssq.lsbluList.length>=1){
		countZS_2();
	}else{
		$("#ttrecord").text("共0注");
		$("#ttmoney").text("0元");
	}
}

//胆拖投注计算总注数，总金额
function countZS_2(){
	if((ssq.lsredList.length+ssq.lsredList_2.length)>=6 && ssq.lsredList.length>1 && ssq.lsredList.length<=5 && ssq.lsredList_2.length>=2 && ssq.lsbluList.length>=1){
		ssq.numberList = ssq.lsredList +"#"+ssq.lsredList_2+"|"+ ssq.lsbluList;
	}
	
	if((ssq.lsredList.length+ssq.lsredList_2.length)>=6 && ssq.lsredList.length>1 && ssq.lsredList.length<=5 && ssq.lsredList_2.length>=2 && ssq.lsbluList.length>=1){
		
		var redzs = Math.c(ssq.lsredList_2.length,6-ssq.lsredList.length);
		
		var bluzs = Math.c(ssq.lsbluList.length,1);
		ssq.zs = redzs*bluzs;
		
	}else{
		ssq.zs = 0;
	}
	
	ssq.amtTotal = (ssq.zs) * 2;
	$("#ttrecord").text("共"+ssq.zs+"注");
	$("#ttmoney").text(ssq.amtTotal+"元");
}

//双色球计算注数
ssq.calZS=function(redBalls,bluBalls){
	redzs=Math.c(redBalls.length,2);
	bluzs=Math.c(bluBalls.length,1);
	return redzs*bluzs;
};

function dobuy(){
	
	if(!checkLoginByAjax()){
		return ;
	}
	
	if(ssq.amtTotal>20000){
		open_message("您好，单个方案最大金额为￥20,000.00元"); 
		return;
	}
	
	ssq.lsredList=[];
	ssq.lsbluList=[];
	ssq.lsredList_2=[];
	ssq.lsredList_2.length=0;
	ssq.lsredList.length=0;
	ssq.lsbluList.length=0;
	
	$("#lotId").val(ssq.lotId);
	$("#playId").val(ssq.playId);
	$("#zs").val(ssq.zs);
	$("#bs").val(ssq.bs);
	$("#totalAmt").val(ssq.amtTotal);
	$("#codes").val(ssq.numberList);
	$("#szcfrom").submit();

};

//确定
function confirm(){
	
	if(!checkLoginByAjax()){
		return ;
	}

	if((ssq.lsredList.length+ssq.lsredList_2.length)>=6 && ssq.lsbluList.length>=1){
		
		if(ssq.lsredList.length<1 || ssq.lsredList.length>5){
			open_message("胆码必须是1到5个!");
			return ;
		}
		if(ssq.lsredList_2.length<2){
			open_message("托码不能少于2个!");
			return ;
		}
		if((ssq.lsredList.length+ssq.lsredList_2.length)<6){
			open_message("至少选择一注号码才能投注") ;
			return ;
		}
		var lsMoney=ssq.calZS(ssq.lsredList_2,ssq.lsbluList)*2;
		//单注投注金额不能超过2w
		if(lsMoney>20000){
			open_message("单个方案投注金额不超过20,000");
			return;
		}else{

			dobuy();
		}
	} else {
		
		var va = haveSaveData();
		if(va == 1 && ssq.lsredList.length==0 && ssq.lsbluList.length==0 && ssq.lsredList_2.length==0){
			dobuy();
		} else {
			open_message("至少选择一注号码才能投注") ;
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
	//ssq.initNumber();
	ssq.numberList=[];
	ssq.lsredList=[];
	ssq.lsbluList=[];
	ssq.lsredList_2=[];
	ssq.lsredList.length=0;
	ssq.lsbluList.length=0;
	ssq.lsredList_2.length=0;
	$("#ttrecord").text("共0注");
	$("#ttmoney").text("0元");
  /*ssq.clearBallClass();*/
	//$("#ttmoney").html(ssq.claMoney());
	//ssq.caltotalZSAndMoney();
}

function playWays(){
	
	if($("#selectPlayWay").is(":hidden")==true){
		$("#selectPlayWay").show();
	}else if($("#selectPlayWay").is(":visible")==true){
		$("#selectPlayWay").hide();
	}
}

function guncunClick(){
	if($("#lotIssueShoeOrHidden").is(":hidden")==true){
		$("#lotIssueShoeOrHidden").show();
		$(".dltinfo").css("padding-top",($(".ssqtoptr").length+1)*31+10);
	}else if($("#lotIssueShoeOrHidden").is(":visible")==true){
		$("#lotIssueShoeOrHidden").hide();
		$(".dltinfo").css("padding-top",0);
	}
}
