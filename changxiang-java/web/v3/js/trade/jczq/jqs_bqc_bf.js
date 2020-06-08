var singleInfoIndex="a";
$(document).ready(function(){
	$("#lgList").html($("#lsDiv").html());
	
	index.seleA=$("#bifensele").find(".clickMcfa");
	index.seleA.sort(function(a,b){
		return $(a).attr("index")*1-$(b).attr("index")*1;
	});
	
	$("div[name='showxuanxiang']").click(function(){
		var odds=$(this).find("input[name='BFodds']").eq(0).val();
		var Arrodds=odds.split(",");
		var obj=$(this).parent().parent();
		index.seleA.attr("class","clickMcfa");
		var isexit=index.isExitsGameList(obj);
		if(isexit){
			index.seleA.each(function(i,o){
				$(o).find("span[name='pl']").html(Arrodds[i]);
				if(index.singleInfo.chks.contains($(o).attr("cvalue"))){
					$(o).addClass("clickMcb");
				}
			});
		}else{
			index.seleA.each(function(i,o){
				$(o).find("span[name='pl']").html(Arrodds[i]);
				$(o).removeClass("clickMcb");
			});
		}
		selecount=index.singleInfo.chks.length;
		$("#bfseleDiv").show();
		$("#hometeamtext").html(obj.attr('hometeam'));
		$("#rqtext").html(obj.attr('rq'));
		$("#guestteam").html(obj.attr('guestteam'));
		$("#eachseleSize").html(selecount);
	});
	var selecount=0;
	index.seleA.click(function(){
		if($(this).attr("class")=="clickMcfa"){
			$(this).addClass("clickMcb");
			selecount++;
			$("#eachseleSize").html(selecount);
		}else{
			$(this).removeClass("clickMcb");
			selecount--;
			$("#eachseleSize").html(selecount);
		}
	});
	$("#sure").click(function(){
		var pa_id=$(this).parent().parent().parent().attr("paid");
		var seleArr=$("#bifensele").find(".clickMcfa");
		index.sureClick(pa_id,seleArr);
		index.updateSelectedDIV();
		index.ggTypeShow();
		index.showDefGGType();
		//刷新金额 获取倍数  刷新注数
		index.updateBs();
		$("#bfseleDiv").css("display","none");
	});
});

/**选好了之后的确定选号的事件*/
index.sureClick=function(pa_id,objs){
	var chos=[];
	index.singleInfo.chks=[];
	index.singleInfo.selectedSP=[];
	index.singleInfo.choose=[ {9005 : ""}, {9001 : ""}, {9004 : ""}, {9002 : ""}, {9003 : ""}];
	objs.each(function(i,o){
		if($(o).attr("class")=="clickMcfa"){
			
		}else{
			index.singleInfo.chks.push($.trim($(o).attr("cvalue")));
			index.singleInfo.selectedSP.push($.trim($(o).find("span[name='pl']").html()));
			chos.push($.trim($(o).attr("pval")));
		}
	});
	if(index.singleInfo.chks.length>0){
		var indexchoose=4;
		switch(index.playId*1){case 9003:indexchoose=4;break;case 9002:indexchoose=3;break;case 9004:indexchoose=2;break;};
		index.singleInfo.choose[indexchoose][pa_id]=chos.join(",");
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
				index.seleA.each(function(k,m){
					for(var h=0,y=index.gameList[i].chks.length;h<y;h++){
						if(index.gameList[i].chks[h]==$(m).attr("cvalue")){
							$(m).addClass("clickMcb");
						}
					}
				});
				index.singleInfo=index.gameList[i];
				singleInfoIndex=i;
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