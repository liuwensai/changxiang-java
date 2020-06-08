var ssq={};

ssq.amtTotal=0;//总金额
ssq.zs=0;//总注数
ssq.playId=50001;//玩法id
ssq.lotId=50;//彩种id
ssq.numberList=[];//号码List
ssq.isZhuiJia=false;
ssq.bs=1;

ssq.lsredList=[];
ssq.lsbluList=[];

function jixuan(m,n){
	var rdm = new Array();
	while(rdm.length < n){
		var r = parseInt(Math.random() * m);
		if(!rdm.contains(r) && r>=1 && r<=33){
			rdm.push(r);
		}
	}
	return rdm;
};

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
		
		$("#bluBall td").find("a").each(function(){
			var key = parseInt($(this).text());
			var value = missNumberMap.backMap[key];
			if(!value && value!=0){
				value = 0;
			}
			$(this).after("<br /><em class='gr9'>"+value+"</em>");
		});
	
	}

	$("#redBall a").each(function (){
		$(this).attr("onclick","clickRedBall(this)");
	});
	
	$("#bluBall a").each(function (){
		$(this).attr("onclick","clickBlueBall(this)");
	});
	
	//机选事件
	$("#randomSele").click(function(){
		$("#redBall a,#bluBall a").each(function (){
			$(this).attr("class","dlyuan");
		});
		ssq.lsbluList = [];
		ssq.lsredList = [];
	
		var redBall=jixuan(34,6);
		var bluBall=jixuan(17,1);
				
		$(redBall).each(function (i,j){
			$("#redBall td").find("a").each(function (){
				if(redBall[i] == $(this).text()){
					//$(this).attr("class","dlyuan dlredon");
					$(this).click();
				}
			});
		});
	
		$(bluBall).each(function (i,j){
			$("#bluBall a").each(function (){
				if(bluBall[i] == $(this).text()){
					//$(this).attr("class","dlyuan dlblueon");
					$(this).click();
				}
			});
		});
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
	if($(obj).attr("class")=="dlyuan"){
		$(obj).addClass("dlyuan dlredon");
		ssq.lsredList.push(val);

	}else{
		$(obj).removeClass("dlyuan dlredon");
		$(obj).addClass("dlyuan");
		var subscript = ssq.lsredList.indexOf(val);
		if(subscript>-1){
			ssq.lsredList.splice(subscript,1);
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
	if(ssq.lsredList.length>=6 && ssq.lsbluList.length>=1){
		countZS();
	}else{
		$("#ttrecord").text("共0注");
		$("#ttmoney").text("0元");
	}
}

//普通投注计算总注数，总金额
function countZS(){
	
	if(ssq.lsredList.length>5 && ssq.lsbluList.length>0){
		ssq.numberList = ssq.lsredList +"|"+ ssq.lsbluList;
	}
	
	if(ssq.lsredList.length>=6 && ssq.lsbluList.length>=1){
		var redzs = Math.c(ssq.lsredList.length,6);
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
	redzs=Math.c(redBalls.length,6);
	bluzs=Math.c(bluBalls.length,1);
	return redzs*bluzs;
};

function dobuy(){
	
	if(ssq.amtTotal>600000){
		//open_message("您好，单个方案最大金额为￥600,000.00元");
		open_message("您好，单个方案最大金额为￥600,000.00元"); 
		return;
	}
	
	if(!checkLoginByAjax()){
		return ;
	}
		
	ssq.lsredList=[];
	ssq.lsbluList=[];
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
	
	if(ssq.lsredList.length>=6 && ssq.lsbluList.length>=1){
		var lsMoney=ssq.calZS(ssq.lsredList,ssq.lsbluList)*2;
		//单注投注金额不能超过2w
		if(lsMoney>20000){
			open_message("单个方案投注金额不超过20,000");
		}else{

			dobuy();
		}
	} else {
		if(haveSaveData() == 1 && ssq.lsredList.length==0 && ssq.lsbluList.length==0){
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
	ssq.lsredList.length=0;
	ssq.lsbluList.length=0;
	$("#ttrecord").text("共0注");
	$("#ttmoney").text("0元");
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

