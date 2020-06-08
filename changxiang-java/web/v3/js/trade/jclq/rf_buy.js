function showIndex(){
	$("#index_page").show();
}

function hideIndex(){
	$("#index_page").hide();
}

function showBuy(){
	$("#buy_page").show();
}

function hideBuy(){
	$("#buy_page").hide();
}

$(document).ready(function(){
	
	//进入购买页面
	$("#selected_match_num").click(function() {
		
		buyDeal();//开始购买处理
		
	});
	
});

//购买处理
function buyDeal(){
	
	if(index.gameList.length < 2){
		var addDiv = "<div class='u-argreement mt_10 mb_10 save_password'>";
		addDiv += "<i class='i-check i-checked'id='contract_check_id'  onclick='contrackButt()'></i>我已年满18岁并同意<a href='javascript:;'>《购彩协议》</a>";
		addDiv += "</div>";
	
		$("#showbuy").html(addDiv);
		open_message("至少选择2场");
		return ;
	} else {
		hideIndex();//隐藏选号页面
		showBuy();//显示购买页面
		var gameList = index.gameList ;
		var addDiv = "<ul class='u-num_list'>";
		for(var i = 0 ; i < gameList.length ; i++){
			addDiv = addDiv +getMatchMessge(gameList[i],i);
		}
		addDiv += "</ul>";
	    
		addDiv += "<div class='u-argreement mt_10 mb_10 save_password'>";
		addDiv += "<i class='i-check i-checked'id='contract_check_id'  onclick='contrackButt()'></i>我已年满18岁并同意<a href='javascript:;'>《购彩协议》</a>";
		addDiv += "</div>";
		
		$("#showbuy").html(addDiv);
		ggTypeShow();//过关方式的显示
		index.showDefGGType();//保存默认过关类型
		index.updateBs();//修改金额倍数
		$("#selected_ggtype_id").empty();
		$("#selected_ggtype_id").html(index.ggType.join(","));
	}
	
}

//判断选号点击事件
function matinBoxClick(obj){
	if($(obj).attr("class")=="matinfo_boxi"){
		$(obj).attr("class", "matinfo_boxi on");
	}else{
		$(obj).attr("class", "matinfo_boxi");
	}
	
	//选号统计
	comm.chooseNumber($(obj).parent(),$(obj));
	
	index.updateBs();//重新统计注数，金额，最大预测中奖金额
	
	//显示选中场数
	$("#selected_match_num").html("已选择"+index.gameList.length+"场");
}

//根据场次ccid获取数据
function getMatchByCcId(ccid){

	for(var i=0;i<matchDatas.length;i++){
		for(var j=0;j<matchDatas[i].length;j++){
			var cid = matchDatas[i][j][0][0] ;
			if(cid == ccid){
				return matchDatas[i][j];
			}
		}
	}
	
	return null;
}
//拼凑购买的对阵信息
function getMatchMessge(obj,n){
	
	var val = "";
	var ccid = obj.cid;
	var base =	getMatchByCcId(obj.cid);
	var spv = base[0][8] ;
	var rq = base[1][1] ;
	var sp = spv.split(",") ;
	var tm = formatdates(base[0][5]) ;
	var ccNumber = base[0][1] ;
	var leagueName = base[0][2] ;
	var homeName = base[0][3] ;
	var guestName = base[0][4] ;
	var gdate = base[0][6];
	var gyushe = base[0][7];
	var sfOdds = base[0][8];
	var gendtime = base[0][5] ;
	var suff = tm.year.toString()+tm.month.toString()+tm.date.toString()+ccNumber+"" ;
	
	
	val += "<li class='ssq'>";
	val += "<i class='i-del'onclick='delDeal("+n+")' ></i>";
	val += "<div class='teams d-box'>";
	val += "<div class='home b-flex'>"+obj.guestteam+"<span class='"+(obj.rq>0?"red rf":"green rf")+"'>("+(obj.rq>0?"+"+obj.rq:obj.rq)+")</span></div>";
	val += "<div class='vs'>VS</div>";
	val += "<div class='away b-flex'>"+obj.hometeam+"</div>";
	val += "</div>";
	val += "<div class='jctz d-box' rq="+rq+" paid='10001' gtype='' gyushe="+gyushe+"  ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val += "<label class='b-flex'><input type='checkbox' onclick='buySelClick(this)' "+isPlayChecked(ccid,'10001_1')+" pl='"+sp[1]+"' cvalue='10001_1' pval='1' disabled='disabled' class='hide3'><i class='tzb'>客胜 "+sp[1]+"</i></label>";
	val += "<label class='b-flex'><input type='checkbox' onclick='buySelClick(this)' "+isPlayChecked(ccid,'10001_2')+" pl='"+sp[0]+"' cvalue='10001_2' pval='2'  disabled='disabled' class='hide3'><i class='tzb'>主胜 "+sp[0]+"</i></label>";
	val += "</div>";
	val += "</li>";
	
	
	
	/*val += "<li class='b-flex' rq="+rq+" paid='10002' gtype='' gyushe="+gyushe+" ccid="+ccid+" sfOdds="+sfOdds+"  gyushe="+gyushe+" gdate="+gdate+" ccNumber="+ccNumber+" leagueName="+leagueName+" homeName="+homeName+" guestName="+guestName+" gendtime="+gendtime+" suff="+suff+">";
	val += "<div class='"+(isPlayChecked(ccid,'10002_1')==true?"matinfo_boxi on":"matinfo_boxi")+"' pl='"+sp[1]+"' cvalue='10002_1' pval='1'  onclick='matinBoxClick(this)'>";
	val += "<span class='pitch'>";
	val += "<em class='"+(obj.guestteam.length>5?"f12 fon":"f12")+"'>"+obj.guestteam+"<i class="+(obj.rq>0?"red fz_12":"green fz_12")+">("+(obj.rq>0?"+"+obj.rq:obj.rq)+")</i></em>";
	val +="<p>客胜"+sp[1]+" </p>" ;
	val += "</span>";
	val += "</div>";
	val += "<div class='"+(isPlayChecked(ccid,'10002_2')==true?"matinfo_boxi on":"matinfo_boxi")+"' pl='"+sp[0]+"' cvalue='10002_2' pval='2'  onclick='matinBoxClick(this)'>";
	val += "<span class='pitch'>";
	val += "<em class='"+(obj.hometeam.length>5?"f12 fon":"f12")+"'>"+obj.hometeam+"</em>";
	val +="<p>主胜"+sp[0]+" </p>" ;
	val += "</span>";
	val += "</div>";
	val += "<div class='matinfo_ltxtcart martpositon'>";
	val += "<i class='i-del' onclick='delDeal("+n+")'></i>";
	val += "</div>";
	val += "</li>";*/
	
	return val;
}

//购买页面再次选好事件
function buySelClick(obj){
	sfClick(obj);
	
	buyDeal();//购买处理
	ggTypeShow();//过关方式的显示
	index.showDefGGType();//保存所有过关类型
	index.updateBs();//修改金额倍数
	$("#selected_ggtype_id").empty();
	$("#selected_ggtype_id").html("<span>"+index.ggType.join(",")+"</span>");
	
	if(index.ggType.length <= 0 ){
		$("#selected_ggtype_id").html("<span>请选择过关方式</span>");
	}
	
	if(index.gameList.length >= 2){
		$('.m-submit_box').removeClass("disabled");
		
		//显示选中场数
		$("#selected_num_id").html("已选"+index.gameList.length+"场比赛");
	}else{
		$('.m-submit_box').addClass("disabled");
		$("#selected_num_id").html("请至少选择2场比赛");
	}
	
}

//情况选择的所有对阵信息
function allDelDeal(){
	open_confirm("您确认要清空所有投注？",function(){
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
		
		showIndex();//选号页面显示
		hideBuy();//购彩页面隐藏
		 
	} , null);
}

//删除购买对阵
function delDeal(val){
	index.gameList.splice(val,1) ;//根据下标删除对阵信息
	buyDeal();//购买处理
	ggTypeShow();//过关方式的显示
	index.showDefGGType();//保存所有过关类型
	index.updateBs();//修改金额倍数
	$("#selected_ggtype_id").empty();
	$("#selected_ggtype_id").html("<span>"+index.ggType.join(",")+"</span>");
	
	if(index.ggType.length <= 0 ){
		$("#selected_ggtype_id").html("<span>请选择过关方式</span>");
	}
	
	if(index.gameList.length >= 2){
		$('.m-submit_box').removeClass("disabled");
		
		//显示选中场数
		$("#selected_num_id").html("已选"+index.gameList.length+"场比赛");
	}else{
		$("#selected_num_id").html("请至少选择2场比赛");
	}
}

//修改过关显示方式
function ggTypeShowAndHid(){
	
	$("#selected_ggtype_id").html("<span>"+index.ggType.join(",")+"</span>");
	$('#ggtype_id').toggle();
}

//过关方式的显示
function ggTypeShow(){
	
	var val = "";
	$("#ggtype_id").empty();
	for(var i=1;i<index.gameList.length;i++){
		var n = i+1;
		if(n == index.gameList.length){
			val+="<label><input type='checkbox' checked onclick='addGgType(this)' class='hide3'><i class='i-chkbox'>"+n+"串1</i></label>";
		}else{
			val+="<label><input type='checkbox' onclick='addGgType(this)' class='hide3'><i class='i-chkbox'>"+n+"串1</i></label>";
		}
	}
	
	
	$("#ggtype_id").html(val);
}

//添加过关方式,修改样式
function addGgType(obj){
	var gghtml =  $(obj).parent().find("i").html();
	if(obj.checked == true){
		index.ggType.push(gghtml);
	}else{
		
		for(var i=0;i<index.ggType.length;i++){
			if(index.ggType[i] == gghtml){
				index.ggType.splice(i,1);
			}
		}
	}
	
	$("#selected_ggtype_id").empty();
	$("#selected_ggtype_id").html("<span>"+index.ggType.join(",")+"</span>");
	
	if(index.ggType.length < 1){
		$("#selected_ggtype_id").html("<span>请选择过关方式</span>");
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

function getBuyCode(){
	var dancodes=[];
	var tuocodes=[];
	var playId = 10002;
	if(playId==9006 ||playId==10005){
		index.gameList.each(function(o,i){
			if(o.dan=="1"){
				dancodes.push(o.gdate+"|"+o.cnumber+"|"+o.choose);
			}else{
				tuocodes.push(o.gdate+"|"+o.cnumber+"|"+o.choose);
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