function showIndex(){
	$("#top_head_index").show();
	$("#m_tabsbox_detail").show();
	$("#j-matches_selected_Id").show();
}

function hideIndex(){
	$("#top_head_index").hide();
	$("#m_tabsbox_detail").hide();
	$("#j-matches_selected_Id").hide();
}

function showBuy(){
	$("#top_head_buy").show();
	$("#p-com_cart_detail_Id").show();
}

function hideBuy(){
	$("#top_head_buy").hide();
	$("#p-com_cart_detail_Id").hide();
}

$(document).ready(function(){
	
	//进入购买页面
	$("#selected_match_num").click(function() {
		
		if(index.gameList.length < 2){
			$("#showbuy").html("");
			open_message("至少选择2场");
			return ;
		}
		
		buyDeal();//开始购买处理
		hideIndex();//隐藏选号页面
		showBuy();//显示购买页面
		
	});
	
});

//购买处理
function buyDeal(){
	
	var gameList = index.gameList ;
	var addDiv = "<ul class='j-ht lq'>";
	for(var i = 0 ; i < gameList.length ; i++){
		addDiv += getMatchMessge(gameList[i],i);
	}
	addDiv += "</ul>";
	
	addDiv += "<div class='u-argreement mt_10 mb_10'>";
	addDiv += "<i class='i-checked'  id='contract_check_id'  onclick='contrackButt()'></i>我已年满18岁并同意<a href='javascript:;'>《购彩协议》</a>";
	addDiv += "<span class='i-condel' onclick='toggle(\"s-sjgz\")'><i class='i-delback' onclick='allDelDeal()'></i></span>";
	addDiv += "</div>";

	
	$("#showbuy").html(addDiv);
	ggTypeShow();//过关方式的显示
	index.showDefGGType();//保存默认过关类型
	index.updateBs();//修改金额倍数
	$("#selected_ggtype_id").empty();
	$("#selected_ggtype_id").html(index.ggType.join(","));
}

//根据场次ccid获取数据
function getMatchByCcId(ccid){

	for(var i=0;i<matchDatas.length;i++){
		for(var j=0;j<matchDatas[i].length;j++){
			var cid = matchDatas[i][j][0][0] ;
			if(cid == ccid){
				return i+","+j;
			}
		}
	}
	
	return null;
}


//拼凑购买的对阵信息
function getMatchMessge(obj,n){
	
	var base = getDataMatchByCcid(obj.cid);
	var homeName = base[0][3];
	var guestName = base[0][4];
	var cn = getMatchByCcId(obj.cid);//获取对阵数据的下标
	var cns = cn.split(",");
	
	var val = "";
	val += "<li>";
	val += "<div class='j-htlistright listcart'>";
	val += "<div class='b-flex listboxr'>";
	val += "<div class='listboxcon_lq'>";
	val += "<em class='team_left'>"+guestName+"</em>";
	val += "<em class='team_center'>VS</em>";
	val += "<em class='team_right'>"+homeName+"</em>";
	val += "</div>";
	val += "<div class='listboxnum_lq'>";
	val += "<div class='btn_listboxlq on' onclick='showMatchChild(\"s-lqsel\","+cns[1]+","+cns[0]+")'>";
		var chks = obj.chks ;
	    for(var j = 0 ; j < chks.length ; j++){
	    	var v0 = parseInt(chks[j].split("_")[0]) ;
	    	var v1 = parseInt(chks[j].split("_")[1]) ;
	    	
        	if(v0 == 10001){
        		val += sfshow[v1];
        	}
        	
        	if(v0 == 10002){
        		val += rfsfshow[v1];
        	}
        	
        	if(v0 == 10003){
        		val += sfcshow[v1];
        	}
        	
        	if(v0 == 10004){
        		val += dxfshow[v1];
        	}

        	val += "&nbsp;";
	    }
	val += "</div>";
	val += "</div>";
	val += "</div>";
	val += "</div>";
	val += "<div class='matinfo_ltxtcart martpositon' >";
	val += "<i class='i-del' onclick='delDeal("+n+")'></i>";
	val += "</div>";
	val += "</li>";
	
	return val;
}

//情况选择的所有对阵信息
function allDelDeal(){
	open_confirm("您确认要清空所有投注？",function(){
		var gameList = index.gameList;
		index.gameList=[];//存放所有的选择对象
		buyDeal();//购买处理
		ggTypeShow();//过关方式的显示
		index.showDefGGType();//保存所有过关类型
		index.updateBs();//修改金额倍数
		$("#selected_ggtype_id").empty();
		$("#selected_ggtype_id").html(index.ggType.join(","));
		
		if(index.ggType.length <= 0 ){
			$("#selected_ggtype_id").html("请选择过关方式");
		}
		
		for(var i=0;i<gameList.length;i++){
			var ccid = gameList[i].cid;//获取删除的对阵id
			$("#match_child_id_"+ccid).attr("class", "btn_listboxlq");
			$("#match_child_id_"+ccid).html("展开选项");
		}
		
		 showIndex();//选号页面显示
		 hideBuy();//购彩页面隐藏
	} , null);
}

//删除购买对阵
function delDeal(val){
	var game = index.gameList[val];//获取删除的数据信息
	index.gameList.splice(val,1) ;//根据下标删除对阵信息
	buyDeal();//购买处理
	ggTypeShow();//过关方式的显示
	index.showDefGGType();//保存所有过关类型
	index.updateBs();//修改金额倍数
	$("#selected_ggtype_id").empty();
	$("#selected_ggtype_id").html(index.ggType.join(","));
	
	if(index.ggType.length <= 0 ){
		$("#selected_ggtype_id").html("请选择过关方式");
	}
	
	var ccid = game.cid;//获取删除的对阵id
	$("#match_child_id_"+ccid).attr("class", "btn_listboxlq");
	$("#match_child_id_"+ccid).html("展开选项");
}

//过关方式的显示
function ggTypeShow(){
	
	var val = "";
	$("#ggtype_id").empty();
	for(var i=1;i<index.gameList.length;i++){
		var n = i+1;
		if(n == index.gameList.length){
			val+="<li class='on' onclick='addGgType(this)'><div class='listbtn'>"+n+"串1</div></li>";
		}else{
			val+="<li class='' onclick='addGgType(this)'><div class='listbtn'>"+n+"串1</div></li>";
		}
	}
	
	$("#ggtype_id").html(val);
}

//添加过关方式,修改样式
function addGgType(obj){
	var gghtml =  $(obj).find("div").html();
	if($(obj).attr("class") == ""){
		$(obj).attr("class", "on");
		index.ggType.push(gghtml);
	}else if($(obj).attr("class") == "on"){
		
		for(var i=0;i<index.ggType.length;i++){
			if(index.ggType[i] == gghtml){
				index.ggType.splice(i,1);
			}
		}
		
		$(obj).attr("class", "");
	}
	
	$("#selected_ggtype_id").empty();
	$("#selected_ggtype_id").html(index.ggType.join(","));
	
	if(index.ggType.length < 1){
		$("#selected_ggtype_id").html("请选择过关方式");
	}
	
	index.updateBs();//重新统计注数，金额，最大预测中奖金额
}

//倍数处理
function modifyBieShu(){
	var beishu = $("#bei_shu_id").val();
	beishu = isNum(beishu,1);
	$("#bei_shu_id").val(beishu);
	
	index.updateBs();//重新统计注数，金额，最大预测中奖金额
}

//判断一个数据是不是数字;如果是则返回n参数
function isNum(val,n){
	var t = /^[0-9]*[1-9][0-9]*$/;
	if(t.test(val)){
		if(val > 99999){
			return n;
		}
		
		return val;
	}else{
		return n;
	}
}


//解析number_content购买数据
function showBuyNumber(numberContent,playId){
	var number = numberContent.split("/");
	for(var i=0;i<number.length;i++){
		
		var data = number[i].split("|");
		
		if(playId == 10005){
			var ch = data[2].split(";");
			for(var j=0;j<ch.length;j++){
				var ker = ch[j].split("@");
				
				index.gameList[i] ={
						  cid :	getCcid(data),
						gdate : data[0],
					   cnumbe : data[1],
					   choose : getChoose(ker,j,i),
					     chks : getChks(ker,j,i),
				   selectedSP : getSelectedSP(data,ker,j,i),
						   rq : getRq(data), // 让球
						   da : "0", // 1为胆
						  ysf : getYsf(data),//预设总分
						minSP : getMinSP(data,ker,j,i), // 最小赔率
						maxSP : getMaxSP(data,ker,j,i) // 最大赔率
				};
				
			}
			
		}
		
	}
	 
	buyDeal();//购买处理
	ggTypeShow();//过关方式的显示
	index.showDefGGType();//保存所有过关类型
	index.updateBs();//修改金额倍数
	hideIndex();//隐藏选号页面
	showBuy();//显示购买页面
	//alert(index.gameList.length);
}

function getYsf(data){
	var base = getDataMatchByCcid(getCcid(data));
	return base[0][7];
}
function getRq(data){
	
	var base = getDataMatchByCcid(getCcid(data));
	return base[1][1] ;
}

function getMinSP(data,ker,j,i){
	if(j == 0){
		return minSP = Math.min.apply(Math, getSelectedSP(data,ker,j,i)) || 1; // 最小赔率
	}else{
		index.gameList[i].minSP = Math.min.apply(Math,
				index.gameList[i].selectedSP) || 1; // 最小赔率
	}
	
	return index.gameList[i].minSP;
	
}

function getMaxSP(data,ker,j,i){
	if(j == 0){
		return minSP = Math.max.apply(Math, getSelectedSP(data,ker,j,i)) || 1; // 最大赔率
	}else{
		index.gameList[i].maxSP = Math.max.apply(Math,
				index.gameList[i].selectedSP) || 1; // 最大赔率
	}
	
	return index.gameList[i].maxSP;
	
}

function getSelectedSP(data,ker,j,i){
	var base = getDataMatchByCcid(getCcid(data));
	
	var sfv = base[1][0] ;
	var sf = sfv.split(",") ;
	
	var rfsfv = base[2][0] ;
	var rfsf = rfsfv.split(",") ;
	
	var dxfv = base[3][0] ;
	var dxf = dxfv.split(",") ;
	
	var sfcv = base[4][0] ;
	var sfc = sfcv.split(",") ;
	
	if(j == 0){
		if(ker[0] == 10001){
			var ret = [];
			var k = ker[1].split(",");
			for(var n=0;n<k.length;n++){
				if(k[n] == 1)ret.push(sf[1]);
				if(k[n] == 2)ret.push(sf[0]);
			}
			
			return ret;
		}
		
		if(ker[0] == 10002){
			var ret = [];
			var k = ker[1].split(",");
			for(var n=0;n<k.length;n++){
				if(k[n] == 1)ret.push(rfsf[1]);
				if(k[n] == 2)ret.push(rfsf[0]);
			}
			return ret;
		}
		
		if(ker[0] == 10003){
			var ret = [];
			var k = ker[1].split(",");
			for(var n=0;n<k.length;n++){
				if(k[n] == 1)ret.push(sfc[0]);
				if(k[n] == 2)ret.push(sfc[1]);
				if(k[n] == 4)ret.push(sfc[2]);
				if(k[n] == 5)ret.push(sfc[3]);
				if(k[n] == 6)ret.push(sfc[4]);
				if(k[n] == 11)ret.push(sfc[5]);
				if(k[n] == 12)ret.push(sfc[6]);
				if(k[n] == 13)ret.push(sfc[7]);
				if(k[n] == 14)ret.push(sfc[8]);
				if(k[n] == 15)ret.push(sfc[9]);
				if(k[n] == 16)ret.push(sfc[10]);
			}
			return ret;
		}
		
		if(ker[0] == 10004){
			var ret = [];
			var k = ker[1].split(",");
			for(var n=0;n<k.length;n++){
				if(k[n] == 1)ret.push(dxf[1]);
				if(k[n] == 2)ret.push(dxf[0]);
			}
			return ret;
		}
	}else{
		if(ker[0] == 10001){
			var k = ker[1].split(",");
			for(var n=0;n<k.length;n++){
				if(k[n] == 1)index.gameList[i].selectedSP.push(sf[1]);
				if(k[n] == 2)index.gameList[i].selectedSP.push(sf[0]);
			}
			
		}
		
		if(ker[0] == 10002){
			var k = ker[1].split(",");
			for(var n=0;n<k.length;n++){
				if(k[n] == 1)index.gameList[i].selectedSP.push(rfsf[1]);
				if(k[n] == 2)index.gameList[i].selectedSP.push(rfsf[0]);
			}
		}
		
		if(ker[0] == 10003){
			var k = ker[1].split(",");
			for(var n=0;n<k.length;n++){
				if(k[n] == 1)index.gameList[i].selectedSP.push(sfc[0]);
				if(k[n] == 2)index.gameList[i].selectedSP.push(sfc[1]);
				if(k[n] == 4)index.gameList[i].selectedSP.push(sfc[2]);
				if(k[n] == 5)index.gameList[i].selectedSP.push(sfc[3]);
				if(k[n] == 6)index.gameList[i].selectedSP.push(sfc[4]);
				if(k[n] == 11)index.gameList[i].selectedSP.push(sfc[5]);
				if(k[n] == 12)index.gameList[i].selectedSP.push(sfc[6]);
				if(k[n] == 13)index.gameList[i].selectedSP.push(sfc[7]);
				if(k[n] == 14)index.gameList[i].selectedSP.push(sfc[8]);
				if(k[n] == 15)index.gameList[i].selectedSP.push(sfc[9]);
				if(k[n] == 16)index.gameList[i].selectedSP.push(sfc[10]);
			}
		}
		
		if(ker[0] == 10004){
			var k = ker[1].split(",");
			for(var n=0;n<k.length;n++){
				if(k[n] == 1)index.gameList[i].selectedSP.push(dxf[1]);
				if(k[n] == 2)index.gameList[i].selectedSP.push(dxf[0]);
			}
		}
	}
	
	return index.gameList[i].selectedSP;
}

function getChks(ker,j,i){
	var ret = [];
	if(j == 0){
		var k = ker[1].split(",");
		for(var n=0;n<k.length;n++){
			ret.push(ker[0]+"_"+k[n]);
		}
		
		return ret;
	}else{
		var k = ker[1].split(",");
		for(var n=0;n<k.length;n++){
			index.gameList[i].chks.push(ker[0]+"_"+k[n]);
		}
	}
	
	return index.gameList[i].chks;
}


function getCcid(data){
	
	for (var cs = 0; cs < matchDatas.length; cs++) {
		var base = matchDatas[cs];
		for(var b = 0; b < base.length; b++){
			var matchs = base[b];
			
			var ccNumber = matchs[0][1] ;
			var gdate = matchs[0][6];
			if(ccNumber == data[1] && gdate == data[0]){
				return matchs[0][0];
			}
		}
	}
	
	return "";
}

//通过场次id获取选购的对阵信息
function getDataMatchByCcid(ccid){
	for (var cs = 0; cs < matchDatas.length; cs++) {
		var base = matchDatas[cs];
		for(var b = 0; b < base.length; b++){
			var matchs = base[b];
			
			if(matchs[0][0] == ccid){
				return matchs;
			}
		}
	}
}


function getChoose(ker,j,i){
	
	if(j == 0){
		var ret = [ {10001 : ""}, {10002 : ""}, {10003 : ""}, {10004 : ""}];
		
		ret[getDIndex(ker[0])][ker[0]] = ker[1];
		
		return ret;
	}else{
		index.gameList[i].choose[getDIndex(ker[0])][ker[0]] = ker[1];
	}
	
	return index.gameList[i].choose;
}

function getDIndex(playId){
	var d = -1;
	switch (playId * 1) {
	case 10001:d = 0;break;
	case 10002:d = 1;break;
	case 10003:d = 2;break;
	case 10004:d = 3;break;
	}
	
	return d;
}

function getBuyCode(){
	var dancodes=[];
	var tuocodes=[];
	var playId = 10005 ;
	if(playId==9006 ||playId==10005){
		index.gameList.each(function(o,i){
			var temp="";
			for ( var j= 0,ChooseLen=o.choose.length;j <ChooseLen;j++) {
						 for(var _o in o.choose[j]){
							 if(!o.choose[j][_o]==""){
								 temp += _o+"@"+o.choose[j][_o] +";";						 
							 }
						  }
				}
			var  tpl=temp.substring(0,temp.length-1);				
			
			if(o.dan=="1"){
				dancodes.push(o.gdate+"|"+o.cnumber+"|"+tpl);
			}else{
				tuocodes.push(o.gdate+"|"+o.cnumber+"|"+tpl);
			}
		});
	}else{
		index.gameList.each(function(o,i){
			if(o.dan=="1"){
				var choose ="" ;
				for(var j = 0 ; j < o.chks.length ; j++){
					choose = choose + o.chks[j].split("_")[1] ;
					if(j < o.chks.length-1){
						choose=choose+"," ;
					}
				}
				dancodes.push(o.gdate+"|"+o.cnumber+"|"+choose);
			}else{
				var choose ="" ;
				for(var j = 0 ; j < o.chks.length ; j++){
					choose = choose + o.chks[j].split("_")[1] ;
					if(j < o.chks.length-1){
						choose=choose+"," ;
					}
				}
				tuocodes.push(o.gdate+"|"+o.cnumber+"|"+choose);
			}
		});
	}
	if(dancodes.length>0)
		return dancodes.join("/")+"#"+tuocodes.join("/");
	else
		return tuocodes.join("/");
};