var singleInfoIndex="a";
var selecountspf=0;
var selecountrqspf=0;
var selecountjqs=0;
var selecountbqc=0;
var selecountbf=0;

index.initDisPlay=function(){
	$("#spfseleDiv").css("display","");
	$("#rqspfseleDiv").css("display","");
	$("#jqsseleDiv").css("display","");
	$("#bqcseleDiv").css("display","");
	$("#bfseleDiv").css("display","");
	$("#spfsm").css("display","none");
	$("#rqspfsm").css("display","none");
	$("#jqssm").css("display","none");
	$("#bqcsm").css("display","none");
	$("#bfsm").css("display","none");
};
$(document).ready(function(){
	$("#lgList").html($("#lsDiv").html());
	
	index.seleSpf=$("#spfseleDiv").find(".clickMcfa");
	index.seleRqSpf=$("#rqspfseleDiv").find(".clickMcfa");
	index.seleJqs=$("#jqsseleDiv").find(".clickMcfa");
	index.seleBqc=$("#bqcseleDiv").find(".clickMcfa");
	index.seleBf=$("#bfseleDiv").find(".clickMcfa");
	index.seleJqs.sort(function(a,b){
		return $(a).attr("index")*1-$(b).attr("index")*1;
	});
	index.seleSpf.sort(function(a,b){
		return $(a).attr("index")*1-$(b).attr("index")*1;
	});
	index.seleRqSpf.sort(function(a,b){
		return $(a).attr("index")*1-$(b).attr("index")*1;
	});
	index.seleBqc.sort(function(a,b){
		return $(a).attr("index")*1-$(b).attr("index")*1;
	});
	index.seleBf.sort(function(a,b){
		return $(a).attr("index")*1-$(b).attr("index")*1;
	});
	$("a[name='seleHead']").click(function(){
		$("a[name='seleHead']").removeClass("cbmenu_fox");
		$(this).addClass("cbmenu_fox");
		var divId=$(this).attr("id");
		$("div[name='seleDiv']").each(function(i,o){
			if($(o).attr("attval")==divId){
				$(o).css("display","");
			}else{
				$(o).css("display","none");
			}
		});
	});
	
	$("div[name='showxuanxiang']").click(function(){
		var bfodds=$(this).find("input[name='bfodds']").eq(0).val();
		var spfodds=$(this).find("input[name='spfodds']").eq(0).val();
		var rqspfodds=$(this).find("input[name='rqspfodds']").eq(0).val();
		var bqcodds=$(this).find("input[name='bqcodds']").eq(0).val();
		var jqsodds=$(this).find("input[name='jqsodds']").eq(0).val();
		var bfArrodds=bfodds.split(",");
		var spfArrodds=spfodds.split(",");
		var rqspfArrodds=rqspfodds.split(",");
		var bqcArrodds=bqcodds.split(",");
		var jqsArrodds=jqsodds.split(",");
		index.seleSpf.attr("class","clickMcfa");
		index.seleJqs.attr("class","clickMcfa");
		index.seleBqc.attr("class","clickMcfa");
		index.seleBf.attr("class","clickMcfa");
		index.seleRqSpf.attr("class","clickMcfa");
		//初始化所有的层的显示
		index.initDisPlay();
		var obj=$(this).parent().parent();
		var isexit=index.isExitsGameList(obj);
		if(isexit){
			//胜平负
			if($(this).find("input[name='spfodds']").eq(0).attr("blend")!=1){
				$("#spfseleDiv").css("display","none");
				$("#spfsm").css("display","");
			}else{
				index.seleSpf.each(function(i,o){
					$(o).find("span[name='pl']").html(spfArrodds[i]);
					if(index.singleInfo.chks.contains($(o).attr("cvalue"))){
						$(o).addClass("clickMcb");
					}
				});
			}
			//让球胜平负
			if($(this).find("input[name='rqspfodds']").eq(0).attr("blend")!=1){
				$("#rqspfseleDiv").css("display","none");
				$("#rqspfsm").css("display","");
			}else{
				index.seleRqSpf.each(function(i,o){
					$(o).find("span[name='pl']").html(rqspfArrodds[i]);
					if(index.singleInfo.chks.contains($(o).attr("cvalue"))){
						$(o).addClass("clickMcb");
					}
				});
			}
			//半全场
			if($(this).find("input[name='bqcodds']").eq(0).attr("blend")!=1){
				$("#bqcseleDiv").css("display","none");
				$("#bqcsm").css("display","");
			}else{
				index.seleBqc.each(function(i,o){
					$(o).find("span[name='pl']").html(bqcArrodds[i]);
					if(index.singleInfo.chks.contains($(o).attr("cvalue"))){
						$(o).addClass("clickMcb");
					}
				});
			}
			//进球数
			if($(this).find("input[name='jqsodds']").eq(0).attr("blend")!=1){
				$("#jqsseleDiv").css("display","none");
				$("#jqssm").css("display","");
			}else{
				index.seleJqs.each(function(i,o){
					$(o).find("span[name='pl']").html(jqsArrodds[i]);
					if(index.singleInfo.chks.contains($(o).attr("cvalue"))){
						$(o).addClass("clickMcb");
					}
				});
			}
			//比分
			if($(this).find("input[name='bfodds']").eq(0).attr("blend")!=1){
				$("#bfseleDiv").css("display","none");
				$("#bfsm").css("display","");
			}else{
				index.seleBf.each(function(i,o){
					$(o).find("span[name='pl']").html(bfArrodds[i]);
					if(index.singleInfo.chks.contains($(o).attr("cvalue"))){
						$(o).addClass("clickMcb");
					}
				});
			}
		}else{
			if($(this).find("input[name='spfodds']").eq(0).attr("blend")!=1){
				$("#spfseleDiv").css("display","none");
				$("#spfsm").css("display","");
			}else{
				index.seleSpf.each(function(i,o){
					$(o).find("span[name='pl']").html(spfArrodds[i]);
					$(o).removeClass("clickMcb");
				});
			}
			if($(this).find("input[name='rqspfodds']").eq(0).attr("blend")!=1){
				$("#rqspfseleDiv").css("display","none");
				$("#rqspfsm").css("display","");
			}else{
				index.seleRqSpf.each(function(i,o){
					$(o).find("span[name='pl']").html(rqspfArrodds[i]);
					$(o).removeClass("clickMcb");
				});
			}
			if($(this).find("input[name='bqcodds']").eq(0).attr("blend")!=1){
				$("#bqcseleDiv").css("display","none");
				$("#bqcsm").css("display","");
			}else{
				index.seleBqc.each(function(i,o){
					$(o).find("span[name='pl']").html(bqcArrodds[i]);
					$(o).removeClass("clickMcb");
				});
			}
			if($(this).find("input[name='jqsodds']").eq(0).attr("blend")!=1){
				$("#jqsseleDiv").css("display","none");
				$("#jqssm").css("display","");
			}else{
				index.seleJqs.each(function(i,o){
					$(o).find("span[name='pl']").html(jqsArrodds[i]);
					$(o).removeClass("clickMcb");
				});
			}
			if($(this).find("input[name='bfodds']").eq(0).attr("blend")!=1){
				$("#bfseleDiv").css("display","none");
				$("#bfsm").css("display","");
			}else{
				index.seleBf.each(function(i,o){
					$(o).find("span[name='pl']").html(bfArrodds[i]);
					$(o).removeClass("clickMcb");
				});
			}
		}
		selecount=index.singleInfo.chks.length;
		$("#spf_rq_bqc_jqs_bf").show();
		$("#hometeamtext").html(obj.attr('hometeam'));
		$("#rqtext").html(obj.attr('rq'));
		$("#guestteam").html(obj.attr('guestteam'));
		$("#eachseleSize").html(selecount);
		$("#eachseleSizebf").html(selecountbf);
		$("#eachseleSizespf").html(selecountspf);
		$("#eachseleSizejqs").html(selecountjqs);
		$("#eachseleSizebqc").html(selecountbqc);
		$("#eachseleSizerqspf").html(selecountrqspf);
	});
	
	index.seleSpf.click(function(){
		if($(this).attr("class")=="clickMcfa"){
			$(this).addClass("clickMcb");
			selecountspf++;
			$("#eachseleSizespf").html(selecountspf);
		}else{
			$(this).removeClass("clickMcb");
			selecountspf--;
			$("#eachseleSizespf").html(selecountspf);
		}
	});
	index.seleBf.click(function(){
		if($(this).attr("class")=="clickMcfa"){
			$(this).addClass("clickMcb");
			selecountbf++;
			$("#eachseleSizebf").html(selecountbf);
		}else{
			$(this).removeClass("clickMcb");
			selecountbf--;
			$("#eachseleSizebf").html(selecountbf);
		}
	});
	index.seleJqs.click(function(){
		if($(this).attr("class")=="clickMcfa"){
			$(this).addClass("clickMcb");
			selecountjqs++;
			$("#eachseleSizejqs").html(selecountjqs);
		}else{
			$(this).removeClass("clickMcb");
			selecountjqs--;
			$("#eachseleSizejqs").html(selecountjqs);
		}
	});
	index.seleBqc.click(function(){
		if($(this).attr("class")=="clickMcfa"){
			$(this).addClass("clickMcb");
			selecountbqc++;
			$("#eachseleSizebqc").html(selecountbqc);
		}else{
			$(this).removeClass("clickMcb");
			selecountbqc--;
			$("#eachseleSizebqc").html(selecountbqc);
		}
	});
	index.seleRqSpf.click(function(){
		if($(this).attr("class")=="clickMcfa"){
			$(this).addClass("clickMcb");
			selecountrqspf++;
			$("#eachseleSizerqspf").html(selecountrqspf);
		}else{
			$(this).removeClass("clickMcb");
			selecountrqspf--;
			$("#eachseleSizerqspf").html(selecountrqspf);
		}
	});
	$("#sure").click(function(){
		var seleArr=$("#spf_rq_bqc_jqs_bf").find(".cbosbox");
		index.sureClick(seleArr);
		index.updateSelectedDIV();
		index.ggTypeShow();
		index.showDefGGType();
		//刷新金额 获取倍数  刷新注数
		index.updateBs();
		$("#spf_rq_bqc_jqs_bf").css("display","none");
	});
});

/**选好了之后的确定选号的事件*/
index.sureClick=function(objs){
	index.singleInfo.chks=[];
	index.singleInfo.selectedSP=[];
	index.singleInfo.choose=[ {9005 : ""}, {9001 : ""}, {9004 : ""}, {9002 : ""}, {9003 : ""}];
	objs.each(function(i,o){
		if($(o).attr("paid")*1!=0){
			var lschoosearr=[];
			$(o).find(".clickMcfa").each(function(k,m){
				if($(m).attr("class")=="clickMcfa"){
					
				}else{
					index.singleInfo.chks.push($.trim($(m).attr("cvalue")));
					index.singleInfo.selectedSP.push($.trim($(m).find("span[name='pl']").html()));
					lschoosearr.push($.trim($(m).attr("pval")));
				}
			});
			var indexchoose=-1;
			var eachplayId=$(o).attr("paid")*1;
			switch(eachplayId){case 9001:indexchoose=1;break;case 9005:indexchoose=0;break;
			case 9003:indexchoose=4;if(index.maxGuoguanType>4)index.maxGuoguanType=4;break;
			case 9002:indexchoose=3;if(index.maxGuoguanType>6)index.maxGuoguanType=6;break;
			case 9004:indexchoose=2;if(index.maxGuoguanType>4)index.maxGuoguanType=4;break;};
			index.singleInfo.choose[indexchoose][eachplayId]=lschoosearr.join(",");
			lschoosearr=[];
			lschoosearr.length=0;
		}
	});
	if(index.singleInfo.chks.length>0){
		index.singleInfo.minSP = Math.min.apply(Math, index.singleInfo.selectedSP) || 1; // 最小赔率
		index.singleInfo.maxSP = Math.max.apply(Math, index.singleInfo.selectedSP) || 1; // 最大赔率
		if(singleInfoIndex=="a")
			index.gameList.push(index.singleInfo);
		else
			index.gameList.splice(singleInfoIndex,1,index.singleInfo);
		index.gameList.sort(function(a,b){
			  return a.suffix-b.suffix;
		});
		var htmlSele=' 已选{$len}个选项'.replace("{$len}",index.singleInfo.chks.length);
		singleInfoIndex="a";
		$("#selectSize"+index.singleInfo.cnumber).html(htmlSele);
		$("#setSelect"+index.singleInfo.cnumber).addClass("ifHbdC");
	}else{
		index.gameList.splice(singleInfoIndex,1);
		var htmlSele='请设置选项';
		$("#selectSize"+index.singleInfo.cnumber).html(htmlSele);
		$("#setSelect"+index.singleInfo.cnumber).removeClass("ifHbdC");
	}
};
/**判断对阵是否存在gamelist里面*/
index.isExitsGameList=function(obj){
	var con=false;
	selecountspf=0;
	selecountrqspf=0;
	selecountjqs=0;
	selecountbqc=0;
	selecountbf=0;
	if(index.gameList.length==0){
		index.singleInfo={
				choose:[ {9005 : ""}, {9001 : ""}, {9004 : ""}, {9002 : ""}, {9003 : ""}],
				selectedSP:[],
				chks:[],
				suffix : obj.attr('suffix'),// 用来排序的下标 标示
				cid : obj.attr('cid'), // 赛事ID
				cnumber : obj.attr('cnumber'), // 完整编号 1001
				cname : comm.getMatchName(obj.attr('cnumber')), // 周一001
				gname : obj.attr('gname'), // 完整名称
				gtype : obj.attr('gtype'), // 赛事类型
				gdate : obj.attr('gdate'), // 完整日期
				hometeam : obj.attr('hometeam'), // 主队
				guestteam : obj.attr('guestteam'), // 客队
				rq : obj.attr('rq'), // 让球
				win : obj.attr('win'), // 胜的赔率
				draw : obj.attr('draw'), // 平的赔率
				lost : obj.attr('lost'), // 负的赔率
				gendtime : obj.attr('gendtime'), // 截止时间
				dan : "0" // 1为胆
		};
	}else{
		for(var i=0,j=index.gameList.length;i<j;i++){
			if(index.gameList[i].cnumber==obj.attr('cnumber')){
//				index.seleA.each(function(k,m){
//					for(var h=0,y=index.gameList[i].chks.length;h<y;h++){
//						if(index.gameList[i].chks[h]==$(m).attr("cvalue")){
//							$(m).addClass("clickMcb");
//						}
//					}
//				});
				index.singleInfo=index.gameList[i];
				singleInfoIndex=i;
				selecountspf=index.singleInfo.choose[0][9005].split(",").length;
				selecountrqspf=index.singleInfo.choose[1][9001].split(",").length;
				selecountjqs=index.singleInfo.choose[3][9002].split(",").length;
				selecountbqc=index.singleInfo.choose[2][9004].split(",").length;
				selecountbf=index.singleInfo.choose[4][9003].split(",").length;
				con= true;
				break;
			}else{
				index.singleInfo={
						choose:[ {9005 : ""}, {9001 : ""}, {9004 : ""}, {9002 : ""}, {9003 : ""}],
						selectedSP:[],
						chks:[],
						suffix : obj.attr('suffix'),// 用来排序的下标 标示
						cid : obj.attr('cid'), // 赛事ID
						cnumber : obj.attr('cnumber'), // 完整编号 1001
						cname : comm.getMatchName(obj.attr('cnumber')), // 周一001
						gname : obj.attr('gname'), // 完整名称
						gtype : obj.attr('gtype'), // 赛事类型
						gdate : obj.attr('gdate'), // 完整日期
						hometeam : obj.attr('hometeam'), // 主队
						guestteam : obj.attr('guestteam'), // 客队
						rq : obj.attr('rq'), // 让球
						win : obj.attr('win'), // 胜的赔率
						draw : obj.attr('draw'), // 平的赔率
						lost : obj.attr('lost'), // 负的赔率
						gendtime : obj.attr('gendtime'), // 截止时间
						dan : "0" // 1为胆
				};
			}
		}
		//index.gameList.each(function(o,i){
		//});
	}
	return con;
};