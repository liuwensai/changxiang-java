/* 奖金范围计算 */

var playId;
index.refreshPrice=function(p){
	// 玩法
	playId=p;
	// 计算奖金用
	var chooseL = new Array();
	var polyGoalArray=new Array(),zfArray=new Array();
	var danLens=0;
	index.gameList.each(function(o,j){
		var chks = o.chks;
		var selectedSP = o.selectedSP;
		var subHunheType = new Array();
		for(var i=0;i<chks.length;i++){
			if(chks[i].indexOf("10001")!=-1)subHunheType.push(1);
			else if(chks[i].indexOf("10002")!=-1)subHunheType.push(2);
			else if(chks[i].indexOf("10003")!=-1)subHunheType.push(3);
			else if(chks[i].indexOf("10004")!=-1)subHunheType.push(4);
		}
		if(o.dan==1)danLens++;
		if(playId==10005 || playId==9006)
			polyGoalArray.push(parseFloat(o.rq));
		if(playId==10005)
			zfArray.push(parseFloat(o.zf));
		chooseL.push(new Array(o.cid,o.dan,chks.join(","),selectedSP.join(","),subHunheType));
		subHunheType = new Array();
	});
	
	return ChooseNoteCount(danLens, index.ggType, chooseL,polyGoalArray,zfArray);
	
};

// 竞彩篮球单关 奖金范围
index.jldg_refreshPrice=function(p){
	var min = 0, max = 0;
	playId=p;
	//计算奖金用
	var subLot = new Array(), chooseL = new Array();
	var polyGoalArray=new Array(),zfArray=new Array();
	index.gameList.each(function(o,j){
		var chks = o.chks;
		var selectedSP = o.selectedSP;
		var subHunheType = new Array();
		for(var i=0;i<chks.length;i++){
			if(chks[i].indexOf("10001")!=-1)subHunheType.push(1);
			else if(chks[i].indexOf("10002")!=-1)subHunheType.push(2);
			else if(chks[i].indexOf("10003")!=-1)subHunheType.push(3);
			else if(chks[i].indexOf("10004")!=-1)subHunheType.push(4);
		}
		subLot.push(j);
		polyGoalArray.push(parseFloat(o.rq));
		zfArray.push(parseFloat(o.zf));
		chooseL.push(new Array(o.cid,0,chks.join(","),selectedSP.join(","),subHunheType));
		subHunheType = new Array();
	});
	
	if (playId == 10005) {   // 竞彩篮球 单关混投
        var minmaxArray = hunhePrize(subLot, chooseL,polyGoalArray,zfArray);
        var minArray = minmaxArray[0];//每场比赛一个Array，每个array里面保存五个玩法，记录每个玩法允许的最小奖金
        var maxArray = minmaxArray[1];//最大奖金组合
        
        for (var i = 0; i < minArray.length; i++) {
            for (var k = 0; k < minArray[i].length; k++) {
                min += minArray[i][k];
                max += maxArray[i][k];
            }
        }
    }else{   // 竞彩篮球 单个玩法 [ 页面暂时无单关单个玩法 保留方法2015-04-08]
        for (var i = 0; i < chooseL.length; i++) {
            var curMin = 0, curMax = 0;
            var tmpL = chooseL[i][3].split(",");
            for (var k = 0; k < tmpL.length; k++) {
                if (curMin == 0) curMin = new Number(tmpL[k]);
                curMin = Math.min(curMin, new Number(tmpL[k]));
                curMax = Math.max(curMax, new Number(tmpL[k]));
            }
            min += curMin;
            max += curMax;
        }
    }
	// 竞彩篮球单关奖金范围
	return [rundFunc(min*2,1),rundFunc(max*2,1)];
};

//【设胆个数，选择的过关方式，选好列表,让分集合,预售总分集合】
function ChooseNoteCount(allDan, ptypeList,chooseL,rfarr,zfarr) {
    
	var lotList = new Array(); //拆成小复式，仅保存场次
    var danIndex = new Array();
    var noDanList = new Array(); //非胆部分
    var danIndexL = new Array();
    // 胆
    for (var i = 0; i < chooseL.length; i++) {
        if (chooseL[i][1] == "1") danIndexL.push(i);
        else noDanList.push(i);
    }
    allDan>0&&danIndex.push(danIndexL);
    if (danIndex.length == 0) {
        danIndex.push(new Array());
    }
    // 过关方式
    var ptList = new Array();
    for (var i = 0; i < ptypeList.length; i++) {
    	ptList = comm.ggm2num[ptypeList[i].key];
    }
    // 组合 lotList 保存的是 对阵 索引组合
    for (var i = 0; i < danIndex.length; i++) {
        var danLen = danIndex[i].length; //有多少个胆
        for (var k = 0; k < ptList.length; k++) {
            var noDanLen = ptList[k] - danLen;
            if (noDanLen == 0)//设三个胆，三串一
            {
                var subLotList = new Array();
                for (var n = 0; n < danLen; n++) {
                    subLotList.push(parseInt(danIndex[i][n]));
                }
                lotList.push(subLotList);
            }
            else  if(noDanLen>0) //设3个胆，5串1
            {
                fonL_ = new Array();
                FastGroupNums("", 1, 1, noDanLen, noDanList.length);
                for (var m = 0; m < fonL_.length; m++) {
                    var changciList = fonL_[m].split(',');
                    var subLotList = new Array();
                    for (var n = 0; n < danLen; n++)
                        subLotList.push(parseInt(danIndex[i][n]));
                    for (var n = 0; n < changciList.length; n++)
                        subLotList.push(parseInt(noDanList[parseInt(changciList[n], 10) - 1]));
                    lotList.push(subLotList);
                }
            }
        }
    }
	// 赔率集合
    var oddList = new Array();
    for (var i = 0; i < chooseL.length; i++) {
        var oList = chooseL[i][3].split(',');
        var oFloatList = new Array();
        for (var k = 0; k < oList.length; k++) {
            if (oList[k] == "" || isNaN(oList[k])) oFloatList.push(0);
            else oFloatList.push(parseFloat(oList[k]));
        }
        oddList.push(oFloatList);
    }
    
	//页面上是否有去除单一玩法串且选中
	var hunheQcdy = false;
    var minJi = 0;
    var maxJi = 0;
    var allNoteCount = 0;
	
	//混合过关
	if(index.GuoGuanType==3 && ptList.length>0)  // 多串过关
	{
		//组合每个混合过关玩法
		var superOriCombine = new Array();
		//1,2
		for(var k = 0; k < chooseL.length; k++) 
		{
			superOriCombine.push(chooseL[k][4]);
		}
		var superTT = Combin(superOriCombine);// 里面记录没一个串关拆分的结果，如第一场选了2种玩法，第二场选了3种玩法，则这里去除前就有6中选择
		var superLotList = new Array();
		for(var k=0;k<superTT.length;k++)
		{
			var curArray = superTT[k].split(',');
			if(hunheQcdy)
			{
				for(var m=0;m<curArray.length-1;m++)
				{
					if(curArray[m] != curArray[m+1])
					{
						superLotList.push(curArray);//要去重复
						break;
					}
				}
			}
			else
				superLotList.push(curArray);
		}
		superLotList = superLotList.distinct();

		for(var superIndex=0; superIndex< superLotList.length; superIndex++) 
		{
			var curLot = superLotList[superIndex];
			for (var i = 0; i < lotList.length; i++) 
			{
				var subLot = lotList[i];//1,2就是表示计算第二场和第三场组成
				//组合每个混合过关玩法
				var oriCombineList = new Array();
				//1,2
				for(var k = 0; k < subLot.length; k++) 
				{
					oriCombineList.push(chooseL[subLot[k]][4]);
				}
				var tt = Combin(oriCombineList);//里面记录没一个串关拆分的结果，如第一场选了2种玩法，第二场选了3种玩法，则这里去除前就有6中选择
				var lotHunheSplitList = new Array();
				for(var k=0;k<tt.length;k++)
				{
					var curArray = tt[k].split(',');
					//上面已经过滤了去除单一
					lotHunheSplitList.push(curArray);//要去重复
				}
				lotHunheSplitList = lotHunheSplitList.distinct();

				//计算出这场比赛可能出现的最小值、最大值组合（如果一场比赛选择多种玩法）
				//各个玩法先从大到小排好序然后从大到小获取值，如果互斥就删小的~如果小的玩法还有其他选项，就继续用其他选项比较
				var minmaxArray=hunhePrize(subLot,chooseL,rfarr,zfarr);
				var minArray = minmaxArray[0];//每场比赛一个Array，每个array里面保存五个玩法，记录每个玩法允许的最小奖金
				var maxArray = minmaxArray[1];//最大奖金组合
				
				var minJiTmp=0;
				//var tmpTotal1="",tmpTotal2="";
				for(var h=0;h<lotHunheSplitList.length;h++)
				{
					var isValid = true;
					for (var k = 0; k < subLot.length; k++) 
					{
						if(curLot[subLot[k]] != lotHunheSplitList[h][k])
						{
							isValid = false;
							break;
						}
					}
					if(!isValid)
					{
						continue;
					}
					//alert("curLot:"+curLot+"\r\nlotHunheSplitList[h]:"+lotHunheSplitList[h].join("#")+"\r\n:subLot:"+subLot);
					
					var subLotCount = 1;
					var minSubJi = 1;
					var maxSubJi = 1;
					for (var k = 0; k < subLot.length; k++) 
					{
						var subValidCount = 0;
						//subLot[k]某一场比赛的index
						//计算某场比赛的最大和最小赔率
						for (var m = 0; m < oddList[subLot[k]].length; m++) {
							if(lotHunheSplitList[h][k] != chooseL[subLot[k]][4][m]) continue;
							subValidCount++;
						}
						minSubJi *= minArray[k][lotHunheSplitList[h][k]-1];
						maxSubJi *= maxArray[k][lotHunheSplitList[h][k]-1];
						subLotCount *= subValidCount; //注数
					}
					if(subLotCount>0)
					{
						minJiTmp += rundFunc(minSubJi*2,1);
						maxJi += rundFunc(maxSubJi*2,1);
						
						allNoteCount += subLotCount;
					}
				}
				//minJi += minJiTmp;
				if (minJi == 0) 
					minJi = minJiTmp;
				else if(minJiTmp>0)
					minJi = Math.min(minJi, minJiTmp);
				//console.log("minJiTmp:"+minJiTmp);
			}
		}
	}
	else if(playId == 10005 || playId == 9006 ) // 混合过关计算赔率
	{
		for (var i = 0; i < lotList.length; i++) 
		{
			var subLot = lotList[i];//1,2就是表示计算第二场和第三场组成
			//组合每个混合过关玩法
			var oriCombineList = new Array();
			//1,2
			for(var k = 0; k < subLot.length; k++) 
			{
				oriCombineList.push(chooseL[subLot[k]][4]);
			}
			var tt = Combin(oriCombineList);//里面记录没一个串关拆分的结果，如第一场选了2种玩法，第二场选了3种玩法，则这里去除前就有6中选择
			var lotHunheSplitList = new Array();
			for(var k=0;k<tt.length;k++)
			{
				var curArray = tt[k].split(',');
				for(var m=0;m<curArray.length-1;m++)
				{
					if(curArray[m] != curArray[m+1] || !hunheQcdy)
					{
						lotHunheSplitList.push(curArray);//要去重复
						break;
					}
				}
			}
			lotHunheSplitList = lotHunheSplitList.distinct();
			
			//计算出这场比赛可能出现的最小值、最大值组合（如果一场比赛选择多种玩法）
			//各个玩法先从大到小排好序然后从大到小获取值，如果互斥就删小的~如果小的玩法还有其他选项，就继续用其他选项比较
			var minmaxArray = hunhePrize(subLot,chooseL,rfarr,zfarr);
			var minArray = minmaxArray[0];//每场比赛一个Array，每个array里面保存五个玩法，记录每个玩法允许的最小奖金
			var maxArray = minmaxArray[1];//最大奖金组合

			var minJiTmp=0;
			for(var h=0;h<lotHunheSplitList.length;h++)
			{
				var subLotCount = 1;
				var minSubJi = 1;
				var maxSubJi = 1;
				for (var k = 0; k < subLot.length; k++) 
				{
					var subValidCount = 0;
					//subLot[k]某一场比赛的index
					//计算某场比赛的最大和最小赔率
					for (var m = 0; m < oddList[subLot[k]].length; m++) {
						if(lotHunheSplitList[h][k] != chooseL[subLot[k]][4][m]) continue;
						subValidCount++;
					}

					minSubJi *= minArray[k][lotHunheSplitList[h][k]-1];
					maxSubJi *= maxArray[k][lotHunheSplitList[h][k]-1];
					subLotCount *= subValidCount; //注数
				}
				if(subLotCount>0)
				{
					//把round改为floor，预测的奖金不能高于开出的奖金
					minJiTmp += rundFunc(minSubJi*2,1);
					maxJi += rundFunc(maxSubJi*2,1);
					
					allNoteCount += subLotCount;
				}
			}

			if (minJi == 0) 
				minJi = minJiTmp;
			else
				minJi = Math.min(minJi, minJiTmp);
		}
	}
	else
	{
		//每一个小复式，里面保存场次的index
		for (var i = 0; i < lotList.length; i++) 
		{
			var subLot = lotList[i];
			var subLotCount = 1;
			var minSubJi = 1;
			var maxSubJi = 1;
			//每一个小复式
			for (var k = 0; k < subLot.length; k++) 
			{
				var maxSubOdds = 0;
				var minSubOdds = 0;
				//subLot[k]某一场比赛的index
				//计算某场比赛的最大和最小赔率
				for (var m = 0; m < oddList[subLot[k]].length; m++) {
					if (minSubOdds == 0) minSubOdds = oddList[subLot[k]][m];
					minSubOdds = Math.min(minSubOdds, oddList[subLot[k]][m]);
					if (maxSubOdds == 0) maxSubOdds = oddList[subLot[k]][m];
					maxSubOdds = Math.max(maxSubOdds, oddList[subLot[k]][m]);
				}
				minSubJi *= minSubOdds;
				maxSubJi *= maxSubOdds;
				subLotCount *= oddList[subLot[k]].length; //注数
			}
			// 把round改为floor，预测的奖金不能高于开出的奖金
			if (minJi == 0) 
				minJi = rundFunc(minSubJi*2,1);
			else
				minJi = Math.min(minJi, rundFunc(minSubJi*2,1));
			maxJi += rundFunc(maxSubJi*2,1);
			
			allNoteCount += subLotCount;
		}
	}
	return [rundFunc(minJi,1),rundFunc(maxJi,1)]; // 奖金范围
}


/****************奖金计算******************/
//tmpArray保存着每一场比赛的赔率，排序是从大到小
/*
[
	[['让球平_1.5'],['2:0_10','2:1_18.5'],['1_4.1'],['胜负_56'],['胜_1.1']],//第一场比赛
	[['让球平_1.5'],['2:0_10','2:1_18.5'],['1_4.1'],['胜负_56'],['胜_1.1']],//第二场比赛
	[['让球平_1.5'],['2:0_10','2:1_18.5'],['1_4.1'],['胜负_56'],['胜_1.1']] //第三场比赛
]
*/
function hunhePrize(subLot,chooseL,polyGoalArray,zfArray)
{
	var tmpArray = new Array();
	for (var k = 0; k < subLot.length; k++) 
	{
		tmpArray.push([[],[],[],[],[]]);//每场比赛记录一批
		var siList = chooseL[subLot[k]][2].split(',');
		var soList = chooseL[subLot[k]][3].split(',');
		var stList = chooseL[subLot[k]][4];

		for(var ki = 0;ki<stList.length;ki++){
			tmpArray[k][parseInt(stList[ki])-1].push(siList[ki]+"|"+soList[ki]);
		}

		for(var m=0;m<tmpArray[k].length;m++){
			if(tmpArray[k][m].length>0){
				tmpArray[k][m].sort(function(a,b){
					return new Number(b.split("|")[1]) - new Number(a.split("|")[1]);
				});
			}
		}
	}
	
	var rfArray = polyGoalArray;
	var minArray = new Array();//每场比赛一个Array，每个array里面保存五个玩法，记录每个玩法允许的最小奖金
	var maxArray = new Array();//最大奖金组合

	if(playId == 10005){
		for (var k = 0; k < tmpArray.length; k++) 
		{
			minArray.push([0,0,0,0]);//每场比赛记录 没种玩法的最小赔率
			maxArray.push([0,0,0,0]);//每场比赛记录 没种玩法的最大赔率
			//找出哪种玩法的奖金最小，然后顺着往下剔除
			var maxSmallScore=0,maxBigScore=0;
			var rf = Math.floor(rfArray[k]+(rfArray[k]<0?-2:2));
			var averageScore = Math.round(zfArray[k]/2);
			
			if(tmpArray[k][2].length>0){
				maxSmallScore = Math.min(-13,-Math.abs(rf));
				maxBigScore = Math.max(13,Math.abs(rf));
			}
			else if(tmpArray[k][1].length>0){
				maxSmallScore = -Math.abs(rf);
				maxBigScore = Math.abs(rf);
			}
			else {
				maxSmallScore = -2;
				maxBigScore = 2;
			}
			
			//alert("maxSmallScore:"+maxSmallScore+"\r\nmaxBigScore:"+maxBigScore+"\r\naverageScore:"+averageScore);
			
			var minOddsPlus=0,maxOddsPlus=0;//本场比赛最小赔率之和、最大赔率之和 不同玩法和其他场次配对后是相加，不是相乘
			for(var home=maxSmallScore+averageScore;home<=maxBigScore+averageScore;home++)
			{
				for(var guest=maxSmallScore+averageScore;guest<=maxBigScore+averageScore;guest++)
				{
					var resultList = ["","","",""];
					
					if(tmpArray[k][0].length>0){//胜负
						resultList[0] = (home>guest?"10001_1":"10001_2");
					}
					
					if(tmpArray[k][1].length>0){//让球胜负
						resultList[1] = (home+rfArray[k]>guest?"10002_1":"10002_2");
					}
					
					if(tmpArray[k][2].length>0){//胜分差
						if (home > guest)
                        {
                            if (home - guest <= 5) resultList[2] = "10003_01";
                            else if (home - guest <= 10) resultList[2] = "10003_02";
                            else if (home - guest <= 15) resultList[2] = "10003_03";
                            else if (home - guest <= 20) resultList[2] = "10003_04";
                            else if (home - guest <= 25) resultList[2] = "10003_05";
                            else resultList[2] = "10003_06";
                        }
                        else
                        {
                            if (guest - home <= 5) resultList[2] = "10003_11";
                            else if (guest - home <= 10) resultList[2] = "10003_12";
                            else if (guest - home <= 15) resultList[2] = "10003_13";
                            else if (guest - home <= 20) resultList[2] = "10003_14";
                            else if (guest - home <= 25) resultList[2] = "10003_15";
                            else resultList[2] = "10003_16";
                        }
					}
					
					if(tmpArray[k][3].length>0){//大小分
						resultList[3] = (home+guest>zfArray[k]?"10004_1":"10004_2");
					}
					
					//保留本场比赛的最大、最小组合
					var curMinOdds = 0,curMaxOdds = 0;
					var tmpMinArray = [0,0,0,0],tmpMaxArray = [0,0,0,0];
					for(var m1=0;m1<resultList.length;m1++){
						if(resultList[m1]!=""){
							var sList = resultList[m1].split(',');
							var subMinO = 0,subMaxO=0;//当前玩法的最大赔率，最小赔率
							for(var s1=0;s1<tmpArray[k][m1].length;s1++){
								var o1=0,o2=0;
								for(var s2=0;s2<sList.length;s2++){
									if(tmpArray[k][m1][s1].indexOf(sList[s2]+"|")!=-1){
										if(o1 == 0) o1 = new Number(tmpArray[k][m1][s1].split('|')[1]);
										else o1 = Math.min(o1,new Number(tmpArray[k][m1][s1].split('|')[1]));
										o2 = Math.max(o2,new Number(tmpArray[k][m1][s1].split('|')[1]));
									}
								}
								
								subMinO+=o1;//如果玩法只有一个最大可能奖金，加上就可以
								subMaxO+=o2;
								//if(o1>0 && subMinO>0) subMinO = Math.min(subMinO,o1);
								//else if(o1>0) subMinO = o1;
								subMaxO = Math.max(subMaxO,o2);
							}
							tmpMinArray[m1] = subMinO;
							tmpMaxArray[m1] = subMaxO;
							
							curMinOdds += subMinO;
							curMaxOdds += subMaxO;
						}
					}
					
					if(curMinOdds >0 && curMaxOdds >0){
						//把当前替换入当前场次的最小组合
						if(minOddsPlus == 0 || curMinOdds < minOddsPlus){
							minArray[k] = tmpMinArray;
							minOddsPlus = curMinOdds;
						}
						
						if(curMaxOdds > maxOddsPlus){
							maxArray[k] = tmpMaxArray;
							maxOddsPlus = curMaxOdds;
						}
					}
				}
			}
		}
	}
	else {
		for (var k = 0; k < tmpArray.length; k++) 
		{
			minArray.push([0,0,0,0,0]);//每场比赛记录 没种玩法的最小赔率
			maxArray.push([0,0,0,0,0]);//每场比赛记录 没种玩法的最大赔率
			//找出哪种玩法的奖金最小，然后顺着往下剔除
			var maxScore=(tmpArray[k][2].length>0?7:tmpArray[k][1].length>0?6:Math.abs(polyGoalArray[k])+1);//定义一个最大主客进球，循环
			var minOddsPlus=0,maxOddsPlus=0;//本场比赛最小赔率之和、最大赔率之和 不同玩法和其他场次配对后是相加，不是相乘
			for(var home=0;home<=maxScore;home++)
			{
				for(var guest=0;guest<=maxScore;guest++)
				{
					var resultList = ["","","","",""];
					
					if(tmpArray[k][0].length>0){//让球胜平负
						resultList[0] = (home+polyGoalArray[k]>guest?"让球胜":home+polyGoalArray[k]==guest?"让球平":"让球负");
					}
					
					if(tmpArray[k][1].length>0){//比分
						if ((home+guest) < 8 && home < 6 && guest < 6 && !(home == 4 && guest == 3 || home == 3 && guest == 4))
						{
							resultList[1] = home + ":" + guest;
						}
						else
						{
							if (home > guest) resultList[1] = "胜其他";
							else if (home == guest) resultList[1] = "平其他";
							else resultList[1] = "负其他";
						}
					}
					
					if(tmpArray[k][2].length>0){//入球数
						resultList[2] = ((home+guest) > 6 ? "7+" : ""+(home+guest));
					}
					
					if(tmpArray[k][3].length>0){//半全场
						var bqcStr1= new Array(),bqcStr2 = (home>guest?"胜":home==guest?"平":"负");;
						if(home!=0) bqcStr1.push("胜"+bqcStr2);
						bqcStr1.push("平"+bqcStr2);
						if(guest!=0) bqcStr1.push("负"+bqcStr2);
						resultList[3] = bqcStr1.join(",");
					}
					
					if(tmpArray[k][4].length>0){//胜平负
						resultList[4] = (home>guest?"胜":home==guest?"平":"负");
					}
					
					//保留本场比赛的最大、最小组合
					var curMinOdds = 0,curMaxOdds = 0;
					var tmpMinArray = [0,0,0,0,0],tmpMaxArray = [0,0,0,0,0];
					for(var m1=0;m1<resultList.length;m1++){
						if(resultList[m1]!=""){
							var sList = resultList[m1].split(',');
							var subMinO = 0,subMaxO=0;//当前玩法的最大赔率，最小赔率
							for(var s1=0;s1<tmpArray[k][m1].length;s1++){
								var o1=0,o2=0;
								for(var s2=0;s2<sList.length;s2++){
									if(tmpArray[k][m1][s1].indexOf(sList[s2]+"|")!=-1){
										if(o1 == 0) o1 = new Number(tmpArray[k][m1][s1].split('|')[1]);
										else o1 = Math.min(o1,new Number(tmpArray[k][m1][s1].split('|')[1]));
										o2 = Math.max(o2,new Number(tmpArray[k][m1][s1].split('|')[1]));
									}
								}
								
								/*subMinO+=o1;
								subMaxO+=o2;*/
								
								if(o1>0 && subMinO>0) subMinO = Math.min(subMinO,o1);
								else if(o1>0) subMinO = o1;
								subMaxO = Math.max(subMaxO,o2);
								//if(subMinO>0 || subMaxO>0) console.log("subMinO:"+subMinO+"  o1:"+o1+"  subMaxO:"+subMaxO+"  o2:"+o2+"  sList:"+sList.join("&"));
							}
							tmpMinArray[m1] = subMinO;
							tmpMaxArray[m1] = subMaxO;
							
							curMinOdds += subMinO;
							curMaxOdds += subMaxO;
						}
					}
					
					if(curMinOdds >0 && curMaxOdds >0){
						//把当前替换入当前场次的最小组合
						if(minOddsPlus == 0 || curMinOdds < minOddsPlus){
							minArray[k] = tmpMinArray;
							minOddsPlus = curMinOdds;
						}
						
						if(curMaxOdds > maxOddsPlus){
							maxArray[k] = tmpMaxArray;
							maxOddsPlus = curMaxOdds;
						}
					}
				}
			}
		}
	}
	return [minArray,maxArray];
}

var fonL_ = new Array();
//组合算法
function FastGroupNums( s , i , d , NumberLen , Numbers)
{
  for ( var n = i ; n < Numbers - NumberLen + d + 1 ; n++ ) {
      if (d == NumberLen) {
          fonL_.push(s + n);
      }
      else {
          FastGroupNums( s + n + "," , n + 1 , d + 1 , NumberLen , Numbers);
      }
  }
}

function Combin( s )
{
	var temp = s[0];
	for ( var i = 1 ; i < s.length ; i++ )
	{
		temp = Multiplication( temp , s[i] );
	}
	return temp;
}

function Multiplication( a , b )
{
	var result = new Array();
	for ( var i = 0 ; i < a.length ; i++ )
	{
		for ( var j = 0 ; j < b.length ; j++ )
		{
			result.push( a[i] + "," + b[j] );
		}
	}
	return result;
}

//第三种方法加强版
Array.prototype.distinct = function () {
	var sameObj = function (a, b) {
		var tag = true;
		if (!a || !b)
			return false;
		for (var x in a) {
			if (!b[x])
				return false;
			if (typeof(a[x]) === 'object') {
				tag = sameObj(a[x], b[x]);
			} else {
				if (a[x] !== b[x])
					return false;
			}
		}
		return tag;
	};
	var newArr = [],
	obj = {};
	for (var i = 0, len = this.length; i < len; i++) {
		if (!sameObj(obj[typeof(this[i]) + this[i]], this[i])) {
			newArr.push(this[i]);
			obj[typeof(this[i]) + this[i]] = this[i];
		}
	}
	return newArr;
};

/*四舍六入五成双*/
function rundFunc(data, m) {
    var dt = data.toFixed(8).toString();
    var pos = dt.indexOf('.') + 3;
    var key = parseInt(dt.charAt(pos));
    var vals = '';
    if (key < 5) {
        vals = dt.substr(0, pos);
    } else if (key > 5) {
        vals = (parseFloat(dt.substr(0, pos)) + 0.01).toString();
    } else {
        if (parseInt(dt.charAt(pos - 1)) % 2) {
            vals = (parseFloat(dt.substr(0, pos)) + 0.01).toString();
        } else {
            vals = parseFloat(dt.substr(0, pos)).toString();
        }
    }
    return new Number((Number(vals) * m).toFixed(2));	
}