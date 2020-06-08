/* 竞彩足球 */
jczq.ggm2num={"单关":[1],"2串1":[2],"2串3":[2,1],"3串1":[3],"3串3":[2],"3串4":[3,2],"3串7":[3,2,1],"4串1":[4],"4串4":[3],"4串5":[4,3],"4串6":[2],"4串11":[4,3,2],"4串15":[4,3,2,1],"5串1":[5],"5串5":[4],"5串6":[5,4],"5串10":[2],"5串16":[5,4,3],"5串20":[3,2],"5串26":[5,4,3,2],"5串31":[5,4,3,2,1],"6串1":[6],"6串6":[5],"6串7":[6,5],"6串15":[2],"6串20":[3],"6串22":[6,5,4],"6串35":[3,2],"6串42":[6,5,4,3],"6串50":[4,3,2],"6串57":[6,5,4,3,2],"6串63":[6,5,4,3,2,1],"7串1":[7],"8串1":[8],"9串1":[9],"10串1":[10],"11串1":[11],"12串1":[12],"13串1":[13],"14串1":[14],"15串1":[15],"7串7":[6],"7串8":[7,6],"7串21":[5],"7串35":[4],"7串120":[7,6,5,4,3,2],"8串8":[7],"8串9":[8,7],"8串28":[6],"8串56":[5],"8串70":[4],"8串247":[8,7,6,5,4,3,2]};
jczq.type2nm={"单关":{"n":1,"m":1},"2串1":{"n":2,"m":1},"3串1":{"n":3,"m":1},"4串1":{"n":4,"m":1},"5串1":{"n":5,"m":1},"6串1":{"n":6,"m":1},"7串1":{"n":7,"m":1},"8串1":{"n":8,"m":1},"3串3":{"n":3,"m":3},"3串4":{"n":3,"m":4},"4串6":{"n":4,"m":6},"4串11":{"n":4,"m":11},"5串10":{"n":5,"m":10},"5串20":{"n":5,"m":20},"5串26":{"n":5,"m":26},"6串15":{"n":6,"m":15},"6串35":{"n":6,"m":35},"6串50":{"n":6,"m":50},"6串57":{"n":6,"m":57},"4串4":{"n":4,"m":4},"4串5":{"n":4,"m":5},"5串16":{"n":5,"m":16},"6串20":{"n":6,"m":20},"6串42":{"n":6,"m":42},"5串5":{"n":5,"m":5},"5串6":{"n":5,"m":6},"6串22":{"n":6,"m":22},"6串6":{"n":6,"m":6},"6串7":{"n":6,"m":7},"7串7":{"n":7,"m":7},"7串8":{"n":7,"m":8},"7串21":{"n":7,"m":21},"7串35":{"n":7,"m":35},"7串120":{"n":7,"m":120},"8串8":{"n":8,"m":8},"8串9":{"n":8,"m":9},"8串28":{"n":8,"m":28},"8串56":{"n":8,"m":56},"8串70":{"n":8,"m":70},"8串247":{"n":8,"m":247}};
// 继续添加赛事
function showChooseBall(){
	$("#chooseBall").show();
	$("#toBuyDiv").hide();
}

//赛事隐藏和显示
function shopMatchList(o){
	$(o).toggleClass('fold');
}

// list to 字符串
function getListStr(list){
	var str = "";
	for (var i = 0; i < list.length; i++) {
		str += JSON.stringify(list[i]);
		if(i!=list.length-1)
			str += "/";
	}
	return str;
}

//字符串 to list
function getStrList(str,list){
	var number = str.split("/");
	for(var i=0;i<number.length;i++){
		var singleInfo = $.parseJSON(number[i]);
		list.push(singleInfo);
	}
}

//格式化时间
function dateFMT(date){
	var nian = date.substring(0,4);
	var yue = date.substring(4,6);
	var ri = date.substring(6,8);
	var newdate = new Date(nian,yue-1,ri);
	
	return nian+"-"+yue+"-"+ri+" "+daytpl[newdate.getDay()];
}

//格式化时间
function getMatchName(num) {
	var dic = {
		1 : '周一',
		2 : '周二',
		3 : '周三',
		4 : '周四',
		5 : '周五',
		6 : '周六',
		7 : '周日'
	};
	if (num && num.length == 4) {
		return num.replace(/([1-7])\d{3}/gi, function(match) {
			return dic[match.charAt(0)] + match.substring(1);
		});
	}
	return num;
};

// 格式化时间 2015-04-24 23:50:00 -->> 2015/04/24 23:50:00
function formatDate(str){
	if(str){
		return new Date(Date.parse(str.replace(/-/g,"/")));
	}else{
		return new Date();
	}
}

/**
 *  购买彩票
 */ 
function dobuy(){
	
	var ggType=[];
	for(var i=0;i<jczq.ggType.length;i++){
		ggType.push(jczq.ggType[i].key);
	}
	
	var postData={
			lotPlayType:jczq.playId,
			ggType:jczq.GuoGuanType,
			ggId:ggType,
			noteCount:jczq.totalZs,
			multiple:jczq.bs,
			numberContent:getBuyCode(),
			totalAmt:jczq.totalMoney,
			firstChangic:jczq.gameList[0].cnumber,
			lastChangic:jczq.gameList[jczq.gameList.length-1].cnumber,
			firstDate:jczq.gameList[0].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
			lastDate:jczq.gameList[jczq.gameList.length-1].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
			lotTypeCode:9,
			lotCode:9,
			ggName: ggType.join(","),
			singlePlay:0,  // 单一
			buySource:10   //购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
	};
	same.buySubmit(postData,"");
}

//线下订单购买
function doOfflineBuy(){
	
	var ggType=[];
	for(var i=0;i<jczq.ggType.length;i++){
		ggType.push(jczq.ggType[i].key);
	}
	
	var postData={
			lotPlayType:jczq.playId,
			ggType:jczq.GuoGuanType,
			ggId:ggType,
			noteCount:jczq.totalZs,
			multiple:jczq.bs,
			numberContent:getBuyCode(),
			totalAmt:jczq.totalMoney,
			firstChangic:jczq.gameList[0].cnumber,
			lastChangic:jczq.gameList[jczq.gameList.length-1].cnumber,
			firstDate:jczq.gameList[0].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
			lastDate:jczq.gameList[jczq.gameList.length-1].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
			lotTypeCode:9,
			lotCode:9,
			ggName: ggType.join(","),
			singlePlay:0,  // 单一
			buySource:10,   //购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
			payType:100,//付款方式：线下付款
         	isTicket:0//是否取票：0未取票
	};
	same.buySubmit(postData,"");
}

/**
 * 临时订单支付 - 差额支付
 * 如果没有值 默认为1
 */ 
function doTempBuy(argJSON){
	
	var ggType=[];
	for(var i=0;i<jczq.ggType.length;i++){
		ggType.push(jczq.ggType[i].key);
	}
	
	var returnArr ;
	var numberObject ;   //投注号码
	var lotTypeplay ;    //玩法
	
	if(jczq.playId==9006){  // 混投单一玩法 按照单一玩法格式投注
		returnArr = same.getPlayIdAndBetNumber(jczq.playId,getBuyCode());
		lotTypeplay = returnArr[0];  //格式化后的玩法
		numberObject = returnArr[1]; //格式化后的投注号码
	}else{
		lotTypeplay = jczq.playId;  //玩法
		numberObject = getBuyCode();
	}
	 var callbackType = argJSON.callbackType;
	 var userBalacne = argJSON.allMoney;
     var multiple = jczq.bs; // 倍数
     var trackCount = 1;    // 竞彩 没有期数 默认1
     var isStop=0;			 //追号是否停止 竞彩 没有追号
     var zhushu = jczq.totalZs;
     var lotTypeCode = jczq.lotid;
     var temp = 2 ;
 	 var totalAmt = jczq.totalMoney;//* parseInt(trackCount);
     var buySource = 10; //购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
     var investType = 1;
     var inflowamt = totalAmt - userBalacne;
     var singleAmonut = parseInt(zhushu) * multiple * temp ;
     var postData = {
 			ggType:jczq.GuoGuanType,
 			firstChangic:jczq.gameList[0].cnumber,
 			lastChangic:jczq.gameList[jczq.gameList.length-1].cnumber,
 			firstDate:jczq.gameList[0].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
 			lastDate:jczq.gameList[jczq.gameList.length-1].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
 			ggName: ggType.join(","),
 			singlePlay:0,  // 单一
     		multiple:multiple,
     		numberObject:numberObject,
     		noteCount:zhushu,
     		totalAmt:totalAmt,
     		playId:lotTypeplay,
     		lotCode:lotTypeCode,
     		investType:investType,
     		isZjStop:isStop,
     		buySource:buySource,
     		userBalance:userBalacne,
     		inflowAmt:inflowamt,
     		singleAmonut:singleAmonut,
     		trackCount:trackCount,
     		time:new Date().getTime()};
    var url = '';
    if(investType == 2 || investType == 3) {
    	url='/ipub/trade/temp!tempTrack.action';
    }else {
 	   url='/ipub/trade/temp!tempProject.action';
    }
     $.post(url,postData,function post_Sucess(data){
    	 var returnObject = eval("("+data+")");
    	 if(returnObject.flag==1)
    		 window.location.href ="/pay/alipay/ali-pay!charge.action?callbackType="+callbackType+"&callbackId="+returnObject.msg;
    	 else
    		 open_message(returnObject.msg);
     },'text');	
 };


/**
 *   拼装投注号码
 */
function getBuyCode(){
	var dancodes=[];
	var tuocodes=[];
	// 竞彩足球 混投玩法
	if(jczq.playId == 9006){
		jczq.gameList.each(function(o,i){
			var temp="";
			for ( var j= 0,len=o.choose.length;j <len;j++) {
				 for(var _o in o.choose[j]){
					 if(!o.choose[j][_o]==""){
						 temp += _o+"@"+o.choose[j][_o] +";";						 
					 }
				  }
			}
			var tpl=temp.substring(0,temp.length-1);				
			if(o.dan=="1"){
				dancodes.push(o.gdate+"|"+o.cnumber+"|"+tpl);
			}else{
				tuocodes.push(o.gdate+"|"+o.cnumber+"|"+tpl);
			}
		});
	}else{  // 竞彩足球 非混投玩法
		jczq.gameList.each(function(o,i){
			var choose ="" ;
			for(var j = 0 ; j < o.chks.length ; j++){
				choose = choose + o.chks[j].split("_")[1] ;
				if(j < o.chks.length-1){
					choose=choose+"," ;
				}
			}
			if(o.dan=="1"){
				dancodes.push(o.gdate+"|"+o.cnumber+"|"+choose);
			}else{
				tuocodes.push(o.gdate+"|"+o.cnumber+"|"+choose);
			}
		});
	}
	
	if(dancodes.length>0){
		return dancodes.join("/")+"#"+tuocodes.join("/");
	}else{
		return tuocodes.join("/");
	}
};


/* 赛事筛选 开始*/

// 保存筛选值
jczq.ssData=new Array();

// 赛事赛选 确认
function doSelect(){
	
	var clen = $("#sslist").find("input:checked").length;
	if(clen<=0){
		alert("请至少保留一个筛选项");
		return;
	}
	// 重新添加筛选信息
	jczq.ssData=new Array();
	$("#sslist").find("input").each(function(){
		var legName = $.trim($(this).next().html());
		if($(this).is(":checked")){
			$("div[name='"+legName+"']").each(function(i,o){
				$(o).parent().parent().parent().css("display","");
			});
			// 保存筛选信息
			jczq.ssData.push(legName);
		}else{
			$("div[name='"+legName+"']").each(function(i,o){
				$(o).parent().parent().parent().css("display","none");
			});
			// 删除投注信息
			var tempList = [];
			var deleteList =[];
			jczq.gameList.each(function(o,i){
				if(o.gname==legName){
					deleteList.push(o);
				}else{
					tempList.push(o);
				}
			});
			// 删除选中样式
			deleteList.each(function(o,i){
				if(jczq.playId==9002){ // 进球数
					$("div[cnumber='"+o.cnumber+"']").find("label").removeClass("winselect");
				}else if(jczq.playId==9003 || jczq.playId==9004){
					$("div[cnumber='"+o.cnumber+"']").find("i").removeClass("winselect").html("点击展开投注选项");
				}else if(jczq.playId==9006){
					$("div[cnumber='"+o.cnumber+"']").find("i").removeClass("winselect");
					$("#extend_"+o.cnumber).removeClass("winselect");
				}else{
					$("div[cnumber='"+o.cnumber+"']").find("i").removeClass("winselect");
				}
			});
			// 删除对阵信息
			jczq.gameList=tempList;
			
			if(jczq.gameList.length>1){
				$("#selcs").html("已选择"+jczq.gameList.length+"场比赛");
				$(".m-submit_box").removeClass("disabled");
			}else{
				$("#selcs").html("请至少选择2场比赛");
				$(".m-submit_box").addClass("disabled");
			}
		}
	});
	$(".g-dialog_boxnew").hide();
}


//赛事筛选
function openFilterDiv(){
	
	if(jczq.ssData.length==0){
		jczq.ssData=jczq.sslist;
	}
	var ss = $("#sslist");
	for(var i=0; i<jczq.ssData.length;i++){
		// 选中筛选项
		ss.find("label[legname='"+jczq.ssData[i]+"']").find("input").attr("checked",true);
		// 显示投注项
		$("div[name='"+jczq.ssData[i]+"']").css("display","");
	}
	
	$(".g-dialog_boxnew").show();
}

// 取消按钮
function closeFilterDiv(){
	$(".g-dialog_boxnew").hide();
}

// 五大联赛
function fiveLeagueMatches(){
	
	var league = ["英超","意甲","德甲","西甲","法甲"];
	$("#sslist").find("label[name='ccsel']").each(function(){
		$.inArray($(this).attr("legname"),league)==-1?$(this).find("input").attr("checked",false): $(this).find("input").attr("checked",true);
	});
}

//全选
function selectAll(){
	
	$("#sslist").find("input").each(function(){
		$(this).attr("checked",true);
	});
	
}

//返选
function unselect(){
	
	$("#sslist").find("input").each(function(){
		if($(this).is(":checked")){
			$(this).attr("checked",false);
		}else{
			$(this).attr("checked",true);
		}
	});
}

/* 赛事筛选 结束*/

/* 过关方式 开始 */

function showZyGG(){
	$("#zy_gg").addClass("tab_methodhover");
	$("#dc_gg").removeClass("tab_methodhover");
	$("#zy_gg_tab").show();
	$("#dc_gg_tab").hide();
}

function showDcGG(){
	$("#dc_gg").addClass("tab_methodhover");
	$("#zy_gg").removeClass("tab_methodhover");
	$("#dc_gg_tab").show();
	$("#zy_gg_tab").hide();
}

// 过关方式取消
function hideGuogfsArticle(){
	$("#guogfs_article").hide();
}

// 过关方式确认
function queRenGuofs(){
	if($("#zy_gg_tab").is(':visible')){
		jczq.GuoGuanType=2;
	}else{
		jczq.GuoGuanType=3;
	}
	clearDan();
	getGgTypeByCss();
	// 计算注数、奖金、购买金额
	updateBuyInfo();
	$("#default_ggtype").html(getGgTypeStr());
	$("#guogfs_article").hide();
}

// 取得最大 过关类型
function getMaxGGType(){
	jczq.maxGGType = 99;
	for(var i=0;i<jczq.gameList.length;i++){
		var choose = jczq.gameList[i].choose;
		var spf_cho = choose[0]["9005"];  // 8
		var rqspf_cho = choose[1]["9001"];  // 8
		var bqc_cho = choose[2]["9004"];  // 4
		var jqs_cho = choose[3]["9002"];  // 6
		var bf_cho = choose[4]["9003"];  // 4
		var maxGGtype = (bf_cho&&4)|| (bqc_cho&&4) || (jqs_cho&&6)|| (spf_cho&&8) || (rqspf_cho&&8);
		if(maxGGtype<jczq.maxGGType){
			jczq.maxGGType=maxGGtype;
			if(maxGGtype==4)break;
		}
	}
}

// 过关方式字符串显示
function getGgTypeStr(){
	var ggList = jczq.ggType;
	var ggstr="";
	for(var i=0;i<ggList.length;i++){
		if(ggList.length-1==i){
			ggstr+=ggList[i].key;
		}else{
			ggstr+=ggList[i].key+",";
		}
	}
	return ggstr===""?"请选择过关方式":ggstr;
}

function clearZyGgType(){
	$("i[name='gg_type']").each(function(){
		$(this).attr("class","i-chkbox"); 
	});
}

function clearDcGgType(){
	$("i[name='dc_gg_type']").each(function(){
		$(this).attr("class","i-chkbox"); 
	});
}

// 默认过关方式
function initGgType(){
	jczq.GuoGuanType==2;
	jczq.ggType=[];
	showCanSelectGgType();
	var v = (jczq.gameList.length<jczq.maxGGType?jczq.gameList.length:jczq.maxGGType);
	var type={};
	type.key = (v==1&&"单关") || (v+"串1");
	type.val = v+"_1";
	jczq.ggType.push(type);
	$("#default_ggtype").html(type.key);
}

// 显示可选过关方式
function showCanSelectGgType(){
	
	getMaxGGType();
	var ggtype_max = (jczq.gameList.length<jczq.maxGGType?jczq.gameList.length:jczq.maxGGType);
	// 自由过关 取消标红并且显示可选过关方式
	$("i[name='gg_type']").each(function(){
		if(parseInt($(this).attr("val"))<=ggtype_max){
			$(this).attr("class","i-chkbox"); 
			$(this).parent().show(); 
		}else{
			$(this).attr("class","i-chkbox");
			$(this).parent().hide();
		}
	});
	// 多串过关 取消标红并且显示可选过关方式
	for(var i=3;i<=8;i++){
		if(i<=ggtype_max){
			$("#dc_"+i).show();
			$("#dc_"+i).find("i").removeClass("winselect");
		}else{
			$("#dc_"+i).hide();
			$("#dc_"+i).find("i").removeClass("winselect");
		}
	}
}

// 修改过关方式
function changeGgType(){
	
	showCanSelectGgType();
	var ggtype_max = (jczq.gameList.length<jczq.maxGGType?jczq.gameList.length:jczq.maxGGType);
	// 删除已选过关方式中的数据
	for(var i=0;i<jczq.ggType.length;i++){
		var gg_val = parseInt(jczq.ggType[i].val,10);
		if(gg_val>ggtype_max){
			jczq.ggType.splice(i,1);
			break;
		}
	}
	if(jczq.ggType.length==0){
		jczq.GuoGuanType=2;
	}
}


// 根据选项获取过关方式
function getGgTypeByCss(){
	
	jczq.ggType.length=0;
	
	if(jczq.GuoGuanType==2){
		$("i[name='gg_type']").each(function(){
			if($(this).hasClass("winselect")){
				var type={};
				type.key=$.trim($(this).text());
				type.val=$(this).attr("val");
				jczq.ggType.push(type);
			}
		});
	}else if(jczq.GuoGuanType==3){
		// 显示可选过关方式
		for(var i=3;i<=8;i++){
			if(i<=jczq.maxGGType){
				$("#dc_"+i).find("i").each(function(){
					if($(this).hasClass("winselect")){
						var type={};
						type.key=$.trim($(this).text());
						type.val=$(this).attr("val");
						jczq.ggType.push(type);
						return false; // 跳出循环
					}
				});
			}
		}
	}
}

// 过关方式按钮绑定事件
function bindGgButton(){
	// 绑定自由过关按钮 点击事件
	$("i[name=\"gg_type\"]").click(function(){
		// 选中 or 取消
		if($(this).attr("class")=="i-chkbox"){
			$(this).attr("class","i-chkbox winselect");
		}else{
			$(this).attr("class","i-chkbox");
		}
	});
	
	// 绑定自由过关按钮 点击事件
	$("i[name=\"dc_gg_type\"]").click(function(){
		$("i[name=\"dc_gg_type\"]").removeClass("winselect");
		if($(this).attr("class")=="i-chkbox"){
			$(this).attr("class","i-chkbox winselect");
		}else{
			$(this).attr("class","i-chkbox");
		}
	});
	
	// 过关方式
	$('#guogfs').on('click', function(e){ 
		
		$("i[name='gg_type']").attr("class","i-chkbox");
		$("i[name='dc_gg_type']").attr("class","i-chkbox");
		
		if(jczq.GuoGuanType==2){  // 自由过关
			showZyGG();
			for(var i=0;i<jczq.ggType.length;i++){
				$("i[name='gg_type'][val='"+jczq.ggType[i].val+"']").addClass("winselect");
			}
		}else if(jczq.GuoGuanType==3){  // 多串过关
			showDcGG();
			for(var i=0;i<jczq.ggType.length;i++){
				for(var i=0;i<jczq.ggType.length;i++){
					$("i[name='dc_gg_type'][val='"+jczq.ggType[i].val+"']").addClass("winselect");
				}
			}
		}
		// 显示弹窗
		$("#guogfs_article").show();
	});
	
	$("#zy_gg").on("click",function(){
		var __this = $(this);
		if(!__this.hasClass("tab_methodhover")){
			clearDcGgType();
			showZyGG();
			//jczq.GuoGuanType=3;
		}
	});
	
	$("#dc_gg").on("click",function(){
		var __this = $(this);
		if(!__this.hasClass("tab_methodhover")){
			clearZyGgType();
			showDcGG();
			//jczq.GuoGuanType=3;
		}
	});
	
}


/* 过关方式 结束 */

/* 计算注数 开始 */

/*
 * 获取注数
 * */
jczq.getZhushu = function() {
	
	var zs = 0,dywf=0;
	
	zs = jczq.calcZhushu(jczq.gameList,jczq.GuoGuanType,jczq.ggType);
	
	// 是否去除单一玩法 3G无此功能
	//if(false){  
	//	dywf=index.calDanyi(index.GuoGuanType, index.ggType);
	//}
	return zs-dywf;
};

/*
 * 计算注数
 *  @param codes:赛果个数
 *  @ggmlist:数组，如['2串1','3串1']
 *  @param isSplit:待定
 */

jczq.calcZhushu = function(codes,guoguanType,ggmlist) {
  
  var t,t2 = [],base_count = 0;
  
  var d,d2 = [];
  
  if (ggmlist) {
	// 多串过关拆分注数
	if(guoguanType==3){
		return jczq.splitToNx1(codes,ggmlist);
	}
    var ar = [];
    // 储存'n串m'中的n
    ggmlist.each(function(o, i) {
      ar.push(parseInt(o.val, 10));
    });
    // t2存储每场选了胜平负的个数，如选了310,则为3。选了1或者3或者0，则为1
    codes.each(function(o){
    
      o.chks.length > 0 && (o.dan && o.dan == "1" ? d2 : t2).push(o.chks.length);
    	
    });
    // t表示在t2中每场比赛投注的个数，格式为：[['3':1],['2':3]] 表示投了3注的有一个，投了2注的有两个
    t = t2.getByFrequency();
    d = d2.getByFrequency();
    //base_count = jczq.esunjsC(t, ar);
    base_count = d.length == 0 ? jczq.esunjsC(t, ar) : jczq.calCount(t, d, ar);
  }
  return base_count;
  
};

/*
 * 计算注数，基于自由过关的，也就是n串1的注数
 * @param:a 格式：[['3':1],['2':1],['1':1]]
 * @param:num
 * 储存'n串m'中的n,格式：[2,3]
 */
jczq.esunjsC = function(a, num) {
  if (typeof(a[0]) == "number") a = a.getByFrequency();
  if (typeof(num) == "number") num = [num];
  var r = 0;
  var n = a.length;
  // ff方法的作用：
  var ff = function(n, i) {
    return Math.pow(a[i][0], n) * Math.c(a[i][1], n);
  };
  (function f(t, i) {
    if (i == n) { // 如果
      if (core.arrayGetIdx(num, core.arrayAdd(t)) > -1) r += core.arrayMultiple(core.arrayEach(t, ff, []));
      return;
    }
    for (var j = 0; j <= a[i][1]; j++) {
      f(t.concat(j), i + 1);
    }
  })([], 0);
  return r;
};

//计算注数(去重复有胆)
jczq.calCount = function(t, d, ar) {
  var dn = 0,
    mp = 1;
  for (var i = 0, l = d.length; i < l; i++) {
    dn += d[i][1];
    mp *= Math.pow(d[i][0], d[i][1]);
  }
  var n = 0;
  ar.each(function(m) {
    n += m > dn ? jczq.esunjsC(t, m - dn) * mp : jczq.esunjsC(d, m);
  });
  return n;
};

/*
 * 计算N串1的注数
 * 仅支持自由过关与组合过关
 * @param {[object]} codes 保存投注号码的对象数组
 * @param {string} gggroup 表明是几串几，如'2串1‘，’4串11‘
 * @return {int} 返回计算的结果
 * */
jczq.splitToNx1 = function(codes, gggroup) {
  
	if (gggroup.length == 0) return 0;
	var sum = 0;
	//d,t分别保存胆码投注和拖码投注的个数，如一场拖码投注为[3,1]，那d[i]=2
	var d = [],
    t = [];
	codes.each(function(item) {
		var v = item.chks.length;
		if (item.chks.length > 0) {
			if (item.dan == "1") {
				d.push(v);
			} else {
				t.push(v);
			}
		}
	});
  /*
   * 根据gggroup获取要NxM拆成什么样的Nx1的组合，以数组返回.
   * 如是组合过关，例如gggroup='4串11',在拆分成自由过关时为1个4串、4个3串1、6个2串1，那么ggmlist则是保存的[4,3,2]
   * 如是自由过关，例如gggroup='2串1，3串1‘，则返回[3，2]
   */
  var ggmlist = jczq.GuoGuanType == "2" ? core.arrayEach(gggroup.split(","),function(s) {
	  return jczq.type2nm[s].n;
  }).reverse() : jczq.ggm2num[gggroup[0].key];

  var r = jczq.splitCodes(d,t,ggmlist);
  r.each(function(o, i) {
    sum += core.arrayMultiple(o);
  });
  return sum;
};

jczq.splitCodes = function(d,t,ggmlist) {
  var a = [];
  var _d = [];
  ggmlist.each(function(n) {
    a = a.concat(n > d.length ? core.arrayEach(core.mathCR(t, n - d.length), function(o, i) {
      return _d.concat(o);
    }) : core.mathCR(d.length, n));
  });
  return a;
};


/* 计算注数 结束 */


/* 计算最大奖金范围 开始 */

/*
 * 计算最大预测奖金
 * @param:maxSp ,array,存放每场投注的最大赔率
 * @param:ggNam,string,"N串M"
 * @param:danSp,array,胆码的最大赔率
 * @param String new_round 是否采用4舍6入5进双规则
 * @return Number 最大奖金
 * */
jczq.predictMaxPrize=function(data){
	 
	var max_pl=[];
	var d = [];
	var gg_name="";
	
	for(var i=0;i<jczq.ggType.length;i++){
		gg_name+=jczq.ggType[i].key;
		if(i!=jczq.ggType.length-1){gg_name+=",";}
	}
	
	data.each(function (o){
		if (o.dan&&o.dan==1){
			d.push(+o.maxSP);//胆pl
		}else{
			max_pl.push(+o.maxSP);
		}
	});
	
    if (!max_pl.length || !gg_name) {
		 return 0;
	} else {
		var pz = _predictMaxPrize(max_pl, gg_name,d);
		return pz;
	} 
};

/*
* 计算最大预测奖金
* @param:maxSp ,array,存放每场投注的最大赔率
* @param:ggNam,string,"N串M"
* @param:danSp,array,胆码的最大赔率
* @param String new_round 是否采用4舍6入5进双规则
* @return Number 最大奖金
* */
function _predictMaxPrize(maxSp, ggName, danSp, new_round) {
	var maxPprize = 0;
	//var hasDan = danSp && danSp.length > 0;
	if(ggName=="单关"){
		maxPprize = maxSp.reduce(function(a, b) {
			return a + b;
		});
	}else if(/串1$/.test(ggName)){
		ggName = ggName.split(',');
		ggName.each( function(_ggName) {
			var _n = parseInt(_ggName)||1;
			var maxSps=maxGroupSP(jczq.gameList);
			var maxDanSPs=[];
			var maxTuoSPs=[];
			for(var i=0,j=jczq.gameList.length;i<j;i++){
				if(jczq.gameList[i].dan=="1"){
					maxDanSPs.push(maxSps[i]);
				}else{
					maxTuoSPs.push(maxSps[i]);
				}
			}
			Math.ck(maxTuoSPs, _n-maxDanSPs.length).each( function(sp){
				var lsSums=[];
				sp=maxDanSPs.concat(sp);
				for(var kk=0,jjjj=sp.length;kk<jjjj;kk++){
					var lssum=0;
					for(var iii=0,jjj=sp[kk].length;iii<jjj;iii++){
						lssum+=sp[kk][iii]*1;
					}
					lsSums.push(lssum);
				}
			maxPprize += parseFloat(lsSums.reduce( function(a,b){return (a*10000)*(b*10000)/100000000;}));
			});
		});
	}else{  // 多串过关
		var mz = jczq.ggm2num[ggName].map(function(x) {
			return parseInt(x);
		});
		mz.each(function(_ggName) {
			var _n = parseInt(_ggName) || 1;
			var maxSps = maxGroupSP(jczq.gameList);
			Math.ck(maxSps, _n).each(function(sp) {
				var lsSums = [];
				for (var kk = 0, jj = sp.length; kk < jj; kk++) {
					var lssum = 0;
					for (var iii = 0, jjj = sp[kk].length; iii < jjj; iii++) {
						lssum += sp[kk][iii] * 1;
					}
					lsSums.push(lssum);
				}
				maxPprize += parseFloat(lsSums.reduce(function(a, b) {
					return (a * 10000) * (b * 10000) / 100000000;
				}));
			});
		});
	}
	maxPprize*= 2;
	return Math.round(maxPprize*100)/100;
};

function maxGroupSP(gameList){
	var maxSPs=[];
	for(var i=0,j=gameList.length;i<j;i++){
		var realstr=[];
		var spfstr=[];
		var rqspfstr=[];
		var bqcstr=[];
		var jqsstr=[];
		var bfstr=[];
		for(var k=0,l=gameList[i].chks.length;k<l;k++){
			var lschks=gameList[i].chks[k];
			if(lschks.indexOf("9001")!=-1){
			spfstr.push(gameList[i].chks[k]+"#"+gameList[i].selectedSP[k]);
			}else if(lschks.indexOf("9005")!=-1){
			rqspfstr.push("nspf-"+lschks.substring(lschks.length-1,lschks.length)+"#"+gameList[i].selectedSP[k]);
			}else if(lschks.indexOf("9004")!=-1){
			bqcstr.push(gameList[i].chks[k]+"#"+gameList[i].selectedSP[k]);
			}else if(lschks.indexOf("9003")!=-1){
			bfstr.push(gameList[i].chks[k]+"#"+gameList[i].selectedSP[k]);
			}else if(lschks.indexOf("9002")!=-1){
			jqsstr.push(gameList[i].chks[k]+"#"+gameList[i].selectedSP[k]);
			}
		}
		
		if(spfstr.length>0){realstr.push(spfstr);}
		if(rqspfstr.length>0){realstr.push(rqspfstr);}
		if(bqcstr.length>0){realstr.push(bqcstr);}
		if(bfstr.length>0){realstr.push(bfstr);}
		if(jqsstr.length>0){realstr.push(jqsstr);}
		var lsrealstr=realstr.join("|");
		var realSP = getSgBound(lsrealstr,gameList[i].rq);
		realstr.length=0;
		maxSPs.push(realSP);
	}
	return maxSPs;
}

function forEach(o,f,z){
	if(o){
	for(var i=0,j=o.length;i<j;i++){
	if(false===f.call(z||o[i],o[i],i,o,j)){
	break;}}}
	return z||o;
}

function getSgBound(str,rq){
	var single = str.split('|'),  maxSum=-1, maxOpts, maxBf;
		forEach(allBf,function (bf){
			var optsAl = Math.al(filterInvalidOpts(single, bf,rq)), hits, sum = 0;
			for (var i = 0, j = optsAl.length; i < j; i++) {
				hits = optsAl[i];
				for (var k =  hits.length; k--;) {
					hits[k] = parseFloat(hits[k].split('#')[1]);
					sum += hits[k];
				}
				if (sum > maxSum) {
					maxSum = sum;
					maxOpts=hits;maxBf = bf.name;
				}
			}
		});
	maxOpts.sum = maxSum;
	maxOpts.bf = maxBf;
	return maxOpts;
}

function filterInvalidOpts(single, bf,rq){
	var ret  = [], len = 0, filter=bfCheckMap[bf.name];
	function test(str){
		if (str.indexOf('9001') === 0) {return testRqSpfByBf(str, bf,rq);}
		return str.split('#')[0] in filter;
	}
	for (var i = 0, j = single.length; i < j; i++) {
		var types = single[i].split(',').filter(test);
		
		var tylen=types.length;
		if(tylen>1){
			types.sort(function(a,b){
				  return parseInt(a.split("#")[1])-parseInt(b.split("#")[1]);
			});
			types=[types[tylen-1]];
		}
		if (tylen) {ret[len++] = types;}
	}
	return ret;
}

//混合投注计算理论最大奖金代码开始
var allBf=[
{name:"00",sum:0,diff:0,_spf:1},
{name:"01",sum:1,diff:1,_spf:0},
{name:"02",sum:2,diff:2,_spf:0},
{name:"03",sum:3,diff:3,_spf:0},
{name:"04",sum:4,diff:4,_spf:0},
{name:"05",sum:5,diff:5,_spf:0},
{name:"10",sum:1,diff:1,_spf:3},
{name:"11",sum:2,diff:0,_spf:1},
{name:"12",sum:3,diff:1,_spf:0},
{name:"13",sum:4,diff:2,_spf:0},
{name:"14",sum:5,diff:3,_spf:0},
{name:"15",sum:6,diff:4,_spf:0},
{name:"20",sum:2,diff:2,_spf:3},
{name:"21",sum:3,diff:1,_spf:3},
{name:"22",sum:4,diff:0,_spf:1},
{name:"23",sum:5,diff:1,_spf:0},
{name:"24",sum:6,diff:2,_spf:0},
{name:"25",sum:7,diff:3,_spf:0},
{name:"30",sum:3,diff:3,_spf:3},
{name:"31",sum:4,diff:2,_spf:3},
{name:"32",sum:5,diff:1,_spf:3},
{name:"33",sum:6,diff:0,_spf:1},
{name:"40",sum:4,diff:4,_spf:3},
{name:"41",sum:5,diff:3,_spf:3},
{name:"42",sum:6,diff:2,_spf:3},
{name:"50",sum:5,diff:5,_spf:3},
{name:"51",sum:6,diff:4,_spf:3},
{name:"52",sum:7,diff:3,_spf:3},
{name:"09",sum:7,_spf:0},
{name:"90",sum:7,_spf:3},
{name:"99",sum:7,_spf:1}
];

var bfCheckMap={};
for (var i=allBf.length-1;i>=0; i--) {
	var conf = allBf[i], item = {}, jqs = conf.sum;
	var _spf = conf._spf;
	item['9003_'+conf.name] = 1;
	item['9002_'+jqs]=1;
	item['nspf-'+_spf]=1;
	var bfNames=conf.name.split("");
	if (_spf === 3) {
		if (jqs>2 && bfNames[1]*1!=0) {item['9004_03']=1;}
		item['9004_13']=1;
		item['9004_33']=1;
	}else if(_spf===1){
		if (jqs>1) {
			item['9004_01']=1;
			item['9004_31']=1;
		}
		item['9004_11']=1;			
	}else if(_spf===0){
		item['9004_00']=1;
		item['9004_10']=1;
		if (jqs>2 && bfNames[0]*1!=0) {item['9004_30']=1;}		
	}
	bfCheckMap[conf.name] = item;
}

function testRqSpfByBf(str, bf,rq){
	var rq1=parseInt(rq, 10);
	if (rq1 > 0) {
		if(bf.name == '09'){
			if (rq1 === 1) {
				return str.indexOf('9001_0') === 0 || str.indexOf('9001_1') === 0;
			}
			return str.indexOf('9001_') === 0;
		}
		if (bf._spf < 1) {
			if (rq1 < bf.diff) {
				return str.indexOf('9001_0') === 0;
			}else if(rq1 === bf.diff){
				return str.indexOf('9001_1') === 0;
			}
		}
		return str.indexOf('9001_3') === 0;
	}else{
		rq1 = Math.abs(rq1);
		if(bf.name == '90'){
			if (rq1 === 1) {
				return str.indexOf('9001_3') === 0 || str.indexOf('9001_1') === 0;
			}
			return str.indexOf('9001_') === 0;
		}
		if (bf._spf>0) {
			if (bf.diff > rq1) {
				return str.indexOf('9001_3') === 0;
			}else if(bf.diff === rq1){
				return str.indexOf('9001_1') === 0;
			}
		}
		return str.indexOf('9001_0') === 0;
	}
}

/* 计算最大奖金范围 结束 */


