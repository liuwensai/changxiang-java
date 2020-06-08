var data=getQueryString("para");
var para = eval('(' + data + ')');
//para = $.cookie('para');
$(document).ready(function(){
	if(!checkLoginByAjax()){		
		
		//登录
//		toAuthLogin();
		var bakUrl =  window.location.href;
		to_login(bakUrl);
		return ;
	}
	
	createTrack();
	/**
	 * 发起追号
	 */
	$("#findcc").one("click",function(){
			dobuy(para);
	});
	
	/**
	 * 模拟追号
	 */
	$("#free_imitate").one("click",function(){
		imitate(para);
	});
});
function get_back(){
	if(para.gg_type==1){
		window.location.href='jcz_track_dg.html?get_back=1&para='+data;
	}else{
		window.location.href='jcz_track_gg.html?get_back=2&para='+data;
	}
}
//生成追号计划 start
function createTrack(){
	
	//赔率是否达到盈利目标
	var obj =calTouZhuDist(para.allCount,para.init_money,para.spMin,para.spTwoMin,para.spThreeMin,para.spFoueMin,para.gg_type,para.trackType,para.trackArg);
	if(!obj[1])return;//达不到期望盈利率
	
	$("#show_track_plan").html(obj[0]);
	$("#count1").html(para.allCount);
	$("#count2").html(parseInt(para.allCount)+1);
	$("#start_money").html(para.init_money);
	
	//$("#to_track").show();
}
//生成追号计划 end
//计算自动投注分配
 function calTouZhuDist(tzIssue,firstMoney,sp1,sp2,sp3,sp4,ggType,trackType,trackArg) {
	//计倍数公式 bs = 购买累计金额 * (1 + 期望盈利率 %)/(单倍奖金 - (1 + 期望盈利率 %)*4)
	var avgSp = parseFloat(1.74);//单关配平均SP值
	
	//单倍奖金
	var oneBonus = 0;
	//第一次追号的盈利率
	var firstProfit = 0;
	var bl=true;
	var html="<Tr> <th>序号</th><th>单次投注</th><th>累计投注</th><th>理论盈利</th><th>盈利率</th></Tr>";
	if(ggType == 0) {//单关配
		//单倍奖金
		oneBonus = parseFloat((sp1 * avgSp * 2).toFixed(2));
		//第一次追号的盈利率
		firstProfit = ((oneBonus/4 - 1)*100).toFixed(2);
		
		theoryPrize = (100/sp1).toFixed(2); 
		theoryProfit = ((sp1-1)*100).toFixed(2);
	}else if(ggType == 1) {//单关配
		//单倍奖金
		oneBonus = parseFloat((sp1  * 2).toFixed(2));
		//第一次追号的盈利率
		firstProfit = ((sp1 - 1)*100).toFixed(2);
		
		theoryPrize = (100/sp1).toFixed(2); 
		theoryProfit = ((sp1-1)*100).toFixed(2);
	}  else if(ggType == 2) {//2串1
		oneBonus = parseFloat((sp1 * sp2 * 2).toFixed(2));
		firstProfit = ((sp1 * sp2 - 1)*100).toFixed(2);
		
		theoryPrize = (100/parseFloat(sp1*sp2)).toFixed(2); 
		theoryProfit = ((parseFloat(sp1*sp2)-1)*100).toFixed(2);
	} else if(ggType == 3) {//3串1
		oneBonus = parseFloat((sp1 * sp2*sp3 * 2).toFixed(2));
		firstProfit = ((sp1 * sp2*sp3 - 1)*100).toFixed(2);
		
		theoryPrize = (100/parseFloat(sp1*sp2*sp3)).toFixed(2); 
		theoryProfit = ((parseFloat(sp1*sp2*sp3)-1)*100).toFixed(2);
	} else if(ggType == 4) {//4串1
		oneBonus = parseFloat((sp1 * sp2*sp3*sp4 * 2).toFixed(2));
		firstProfit = ((sp1 * sp2*sp3*sp4 - 1)*100).toFixed(2);
		
		theoryPrize = (100/parseFloat(sp1 * sp2*sp3*sp4)).toFixed(2); 
		theoryProfit = ((parseFloat(sp1 * sp2*sp3*sp4)-1)*100).toFixed(2);
	}
	if(trackType == 100) {//固定盈利率
		var expectProfit = parseFloat($.trim(trackArg));//期望盈利率
		if(expectProfit>firstProfit){
			showMsg("提示：该区间的赔率达不到您期望的盈利率");//达不到期望盈利率
			bl=false;
		}
		if(ggType == 0) {//单关配
			
			var beiShu =[];
			var totalMoney = [];
			//计算第一次追号的盈利率
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					beiShu[i]=firstMoney/4;
					totalMoney[i] = firstMoney;
				} else {
					beiShu[i]=Math.round(totalMoney[i-1]*(1+expectProfit/100)/(oneBonus-(1+expectProfit/100)*4));
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]*1+beiShu[i]*4)).toFixed(2));
				}
			}
			
			for(var j = 0; j < tzIssue; j++) {
				html =html+"<Tr><td>"+(j+1)+"</td><td>"+(beiShu[j] * 4)+"</td><td>"+totalMoney[j]+"</td><td>"
				+(((beiShu[j] * oneBonus).toFixed(2) - totalMoney[j]).toFixed(2))+"</td><td>"
				+((j == 0 ? firstProfit  : expectProfit)) + "%</td></Tr>";
				
			}
			
		} else {//2串1,3串1,4串1
			
			var beiShu =[];
			var totalMoney = [];
			//计算第一次追号的盈利率
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					beiShu[i]=firstMoney/2;
					totalMoney[i] = firstMoney;
				} else {
					beiShu[i]=Math.round(totalMoney[i-1]*(1+expectProfit/100)/(oneBonus-(1+expectProfit/100)*2));
					
					totalMoney[i]= parseFloat((parseFloat((totalMoney[i-1]*1)+beiShu[i]*2)).toFixed(2));
				}
			}

			for(var j = 0; j < tzIssue; j++) {
				html =html+"<Tr><td>"+(j+1)+"</td><td>"+(beiShu[j] * 2)+"</td><td>"+totalMoney[j]+"</td><td>"
				+((beiShu[j] * oneBonus).toFixed(2))+"</td><td>"
				+(j == 0 ? (firstProfit + "%") : expectProfit) + "%</td></Tr>";
				
			}
			
		}
	} else if(trackType == 200) {//固定步长
		var fixedStep = parseFloat($.trim(trackArg));//固定步长
		var totalMoney = [];
		var currentMoney = [];
		var profit = [];
		
		if(ggType == 0) {//单关配
			//计算投注金额
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					currentMoney[i]=firstMoney;
					totalMoney[i] = firstMoney;
					profit[i] = parseFloat((parseFloat((firstMoney/2 * oneBonus/2)/firstMoney -1) * 100).toFixed(2));
				} else {
					currentMoney[i] = parseFloat((parseFloat(currentMoney[i-1]*1 + fixedStep)).toFixed(2));
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]*1+currentMoney[i]*1)).toFixed(2));
					profit[i] = parseFloat((parseFloat((currentMoney[i]/2 * oneBonus/2)/totalMoney[i] -1) * 100).toFixed(2));
				}
			}

			for(var j = 0; j < tzIssue; j++) {
				html =html+"<Tr><td>"+(j+1)+"</td><td>"+currentMoney[j]+"</td><td>"+totalMoney[j]+"</td><td>"
				+(((currentMoney[j]/2 * oneBonus/2).toFixed(2) - totalMoney[j]).toFixed(2))+"</td><td>"
				+profit[j] + "%</td></Tr>";
				
				}
			
		} else {//2串1,3串1,4串1
			//计算投注金额
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					currentMoney[i]=firstMoney;
					totalMoney[i] = firstMoney;
					profit[i] = parseFloat((parseFloat((firstMoney * oneBonus/2)/firstMoney -1) * 100).toFixed(2));
				} else {
					currentMoney[i] = parseFloat((parseFloat(currentMoney[i-1]*1 + fixedStep)).toFixed(2));
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]*1+currentMoney[i]*1)).toFixed(2));
					profit[i] = parseFloat((parseFloat((currentMoney[i] * oneBonus/2)/totalMoney[i] -1) * 100).toFixed(2));
				}
			}			
		
			for(var j = 0; j < tzIssue; j++) {
				html =html+"<Tr><td>"+(j+1)+"</td><td>"+currentMoney[j]+"</td><td>"+totalMoney[j]+"</td><td>"
				+(((currentMoney[j] * oneBonus/2).toFixed(2) - totalMoney[j]).toFixed(2))+"</td><td>"
				+profit[j] + "%</td></Tr>";
			}
			
		}
	} else {//固定比例
		var fixedStep = parseFloat($.trim(trackArg));//固定比例
		var totalMoney = [];
		var currentMoney = [];
		var profit = [];
		
		if(ggType == 0) {//单关配
			//计算投注金额
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					currentMoney[i]=firstMoney;
					totalMoney[i] = firstMoney;
					profit[i] = parseFloat((parseFloat((firstMoney/2 * oneBonus/2)/firstMoney -1) * 100).toFixed(2));
				} else {
					currentMoney[i] = parseFloat(Math.round(currentMoney[i-1]*(1 + fixedStep/100)/2) * 2);
					totalMoney[i]= parseFloat((parseFloat(totalMoney[i-1]*1+currentMoney[i])*1).toFixed(2));
					profit[i] = parseFloat((parseFloat((currentMoney[i]/2 * oneBonus/2)/totalMoney[i] -1) * 100).toFixed(2));
				}
			}
			
			
			for(var j = 0; j < tzIssue; j++) {
				html =html+"<Tr><td>"+(j+1)+"</td><td>"+currentMoney[j]+"</td><td>"+totalMoney[j]+"</td><td>"
				+(((currentMoney[j]/2 * oneBonus/2).toFixed(2) - totalMoney[j]).toFixed(2))+"</td><td>"
				+profit[j] + "%</td></Tr>";
				
			}
			
		} else {//2串1,3串1,4串1
			//计算投注金额
			for(var i = 0; i < tzIssue; i++) {
				if(i==0){
					currentMoney[i]=firstMoney;
					totalMoney[i] = firstMoney;
					profit[i] = parseFloat((parseFloat((firstMoney * oneBonus/2)/firstMoney -1) * 100).toFixed(2));
				} else {
					currentMoney[i] = parseFloat(Math.round((currentMoney[i-1]*1)*(1 + fixedStep/100)/2) * 2);
					totalMoney[i]= parseFloat((parseFloat((totalMoney[i-1]*1)+(currentMoney[i]*1))).toFixed(2));
					profit[i] = parseFloat((parseFloat(((currentMoney[i]*1) * oneBonus/2)/(totalMoney[i]*1) -1) * 100).toFixed(2));
				}
			}
			
			
			for(var j = 0; j < tzIssue; j++) {
				html =html+"<Tr><td>"+(j+1)+"</td><td>"+currentMoney[j]+"</td><td>"+totalMoney[j]+"</td><td>"
				+(((currentMoney[j] * oneBonus/2).toFixed(2) - totalMoney[j]).toFixed(2))+"</td><td>"
				+profit[j] + "%</td></Tr>";
				
			}
			
		}
	}
	
	return [html,bl];
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }