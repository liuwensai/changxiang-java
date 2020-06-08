var dg_play=9006;
var check_ks = 0;//零     未点击
var check_yl = 0;
//按钮事件、页面渲染
$(document).ready(function(){
	if(!checkLoginByAjax()){		
		//保存数据
		
		//登录
//		toAuthLogin();
		var bakUrl =  window.location.href ;
		to_login(bakUrl);
		return ;
	}
	
	//发起追号
	$("#findcc").one("click",function(){
		dobuy(para);
	});
	//消息提示窗
	$("#v_open_message_btn").click(function(){$("#v_open_message_msg").hide();});
	//玩法选择(胜平负、让球胜平负)
	var bu_rq = 9005;
	var rq = 9001;
	
	$('#spf_play').click(function() {
		if($("#spf_play").attr("class")=="on" && $("#rqspf_play").attr("class")=="on"){
			$("#spf_play").removeAttr("class");
			dg_play=9001;
		}else if($("#spf_play").attr("class")=="on" && $("#rqspf_play").attr("class")!="on"){
			$("#spf_play").attr("class","on");
			$("#rqspf_play").attr("class","on");
			dg_play=9006;
		}else if($("#spf_play").attr("class")!="on" && $("#rqspf_play").attr("class")=="on"){
			$("#spf_play").attr("class","on");
			dg_play=9006;
		}
	});
	$('#rqspf_play').click(function() {
		if($("#spf_play").attr("class")=="on" && $("#rqspf_play").attr("class")=="on"){
			$("#rqspf_play").removeAttr("class");
			dg_play=9005;
		}else if($("#spf_play").attr("class")!="on" && $("#rqspf_play").attr("class")=="on"){
			$("#spf_play").attr("class","on");
			$("#rqspf_play").attr("class","on");
			dg_play=9006;
		}else if($("#spf_play").attr("class")=="on" && $("#rqspf_play").attr("class")!="on"){
			$("#rqspf_play").attr("class","on");
			dg_play=9006;
		}
	});
	//追号固定步长、固定比例、固定盈利率 事件 start	
	$('#gd_bc').click(function() {
		$("#bc_value").val($("#bc_value").val()==""?10:$("#bc_value").val());
		$("#bl_value").val("");
		$("#yl_value").val("");
		
		$("#bc_value").removeAttr("class disabled");
		//$("#bc_value").removeAttr("disabled");
		$("#gd_bc").attr("class","i-checked");
		$("#bc_value").attr("class","Taipt");
		
		$("#gd_bl").removeAttr("clss");
		$("#gd_yl").removeAttr("class");
		$("#gd_bl").attr("class","i-check");
		$("#gd_yl").attr("class","i-check");
		
		$("#bl_value").attr({"class":"Taipt","disabled":"disabled"});
		$("#yl_value").attr({"class":"Taipt","disabled":"disabled"});
	});
	$('#gd_bl').click(function() {
		$("#bc_value").val("");
		$("#bl_value").val($("#bl_value").val()==""?100:$("#bl_value").val());
		$("#yl_value").val("");
		
		$("#bl_value").removeAttr("class disabled");
		//$("#bl_value").removeAttr("disabled");
		$("#gd_bl").attr("class","i-checked");
		$("#bl_value").attr("class","Taipt");
		
		$("#gd_bc").removeAttr("clss");
		$("#gd_yl").removeAttr("class");
		$("#gd_bc").attr("class","i-check");
		$("#gd_yl").attr("class","i-check");
		
		$("#bc_value").attr({"class":"Taipt","disabled":"disabled"});
		$("#yl_value").attr({"class":"Taipt","disabled":"disabled"});
	});
	$('#gd_yl').click(function() {
		$("#bc_value").val("");
		$("#bl_value").val("");
		$("#yl_value").val($("#yl_value").val()==""?30:$("#yl_value").val());
		
		$("#yl_value").removeAttr("class disabled");
		//$("#yl_value").removeAttr("disabled");
		$("#gd_yl").attr("class","i-checked");
		$("#yl_value").attr("class","Taipt");
		
		$("#gd_bl").removeAttr("clss");
		$("#gd_bc").removeAttr("class");
		$("#gd_bl").attr("class","i-check");
		$("#gd_bc").attr("class","i-check");
		
		$("#bl_value").attr({"class":"Taipt","disabled":"disabled"});
		$("#bc_value").attr({"class":"Taipt","disabled":"disabled"});
	});
	//追号固定步长、固定比例、固定盈利率 事件 end
	
	//追号 选择过关方式 事件start
	$('#gg_type').change(function() {
		
		var gg_type = $(this).val();
		if(gg_type==0){
			
			$("#sp_0").show();
			
			$('#sp_2').hide();
			$('#sp_3').hide();
			$('#sp_4').hide();
		}else if(gg_type==2){
			$("#sp_2").show();
			
			$('#sp_0').hide();
			$('#sp_3').hide();
			$('#sp_4').hide();
		}else if(gg_type==3){
			$("#sp_2").show();			
			$('#sp_3').show();
			
			$('#sp_0').hide();
			$('#sp_4').hide();
		}else if(gg_type==4){
			$("#sp_0").hide();
			
			$('#sp_2').show();
			$('#sp_3').show();
			$('#sp_4').show();
		}		
	
	});
	//追号选择过关方式事件 end
	
	//停止条件 事件start
	
	$('#check_ks').click(function() {
		if(check_ks == 0 ){
			check_ks =1;
			//$("#ks_money").val("");
			
			$("#ks_money").removeAttr("class disabled");
			//$("#yl_value").removeAttr("disabled");
			//$("#ks_money").attr("class","i-checked");
			$("#ks_money").attr("class","Taipt");
			
			$("#check_ks").removeAttr("class");
			$("#check_ks").attr("class","i-check checkboxtxted");
		}else{
			check_ks=0;
			$("#check_ks").removeAttr("class");
			$("#check_ks").attr("class","i-check checkboxtxt");
			
			$("#ks_money").attr({"class":"Taipt Taipts","disabled":"disabled"});
			//$("#ks_money").val("");
		}
	});
	$('#check_yl').click(function() {
		if(check_yl == 0 ){
			check_yl =1;
			$("#yl_money").removeAttr("class disabled");
			$("#yl_money").attr("class","Taipt");
			
			$("#check_yl").removeAttr("class");
			$("#check_yl").attr("class","i-check checkboxtxted");
		}else{
			check_yl=0;
			$("#check_yl").removeAttr("class");
			$("#check_yl").attr("class","i-check checkboxtxt");
			
			$("#yl_money").attr({"class":"Taipt Taipts","disabled":"disabled"});
		}
	});
	//停止条件事件end
	/**数据校验**/
	//输入框校验
	
	//追号方式校验（固定步长、固定比例、固定盈利） start
	$("#bc_value").focus(function() {
	}).blur(function() {		
		var bc_value = $(this).val();
		//if(bc_value > 500)qs = 500;
		if(isNaN(bc_value) || bc_value <= 0)bc_value = 10 ;		
		$(this).val('');
		$(this).val(bc_value);
	});

	$("#bc_value").keydown(function() {
		}).keyup(function(e) {
			var bc_value = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(bc_value) || bc_value <= 0)bc_value = 10 ;		
			//$(this).val('');
			//$(this).val(bc_value);
	}) ;
	
	$("#bl_value").focus(function() {
	}).blur(function() {		
		var bl_value = $(this).val();
		//if(bl_value > 100)qs = 100;
		if(isNaN(bl_value) || bl_value <= 0)bl_value = 100 ;		
		$(this).val('');
		$(this).val(bl_value);
	});

	$("#bl_value").keydown(function() {
		}).keyup(function(e) {
			var bl_value = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(bl_value) || bl_value <= 0)bl_value = 100 ;		
			//$(this).val('');
			//$(this).val(bl_value);
	});
	
	$("#yl_value").focus(function() {
	}).blur(function() {		
		var yl_value = $(this).val();
		//if(bl_value > 100)qs = 100;
		if(isNaN(yl_value) || yl_value <= 0)yl_value = 30 ;		
		$(this).val('');
		$(this).val(yl_value);
	});

	$("#yl_value").keydown(function() {
		}).keyup(function(e) {
			var yl_value = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(yl_value) || yl_value <= 0)yl_value = 30 ;		
			//$(this).val('');
			//$(this).val(yl_value);
	});
	//追号方式校验（固定步长、固定比例、固定盈利） end
	
	//追号赔率校验（第一场赔率、第二场、第三场、第四场） start
	$("#sp_min").focus(function() {
	}).blur(function() {		
		var sp = $(this).val();
		//if(bc_value > 500)qs = 500;
		if(isNaN(sp) || sp <= 1)sp = 1.4 ;		
		$(this).val('');
		$(this).val(sp);
	});
	$("#sp_min").keydown(function() {
		}).keyup(function(e) {
			var sp = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(sp) || sp <= 1)sp = 1.4 ;		
			//$(this).val('');
			//$(this).val(sp);
	});
	
	$("#sp_max").focus(function() {
	}).blur(function() {		
		var sp = $(this).val();
		//if(bc_value > 500)qs = 500;
		if(isNaN(sp) || sp <= 1)sp = 1.6 ;		
		$(this).val('');
		$(this).val(sp);
	});
	$("#sp_max").keydown(function() {
		}).keyup(function(e) {
			var sp = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(sp) || sp <= 1)sp = 1.6 ;		
			//$(this).val('');
			//$(this).val(sp);
	});
	
	$("#spTwo_min").focus(function() {
	}).blur(function() {		
		var sp = $(this).val();
		//if(bc_value > 500)qs = 500;
		if(isNaN(sp) || sp <= 1)sp = 1.5 ;		
		$(this).val('');
		$(this).val(sp);
	});
	$("#spTwo_min").keydown(function() {
		}).keyup(function(e) {
			var sp = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(sp) || sp <= 1)sp = 1.5 ;		
			//$(this).val('');
			//$(this).val(sp);
	});
	
	$("#spTwo_max").focus(function() {
	}).blur(function() {		
		var sp = $(this).val();
		//if(bc_value > 500)qs = 500;
		if(isNaN(sp) || sp <= 1)sp = 1.6 ;		
		$(this).val('');
		$(this).val(sp);
	});
	$("#spTwo_max").keydown(function() {
		}).keyup(function(e) {
			var sp = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(sp) || sp <= 1)sp = 1.6 ;		
			//$(this).val('');
			//$(this).val(sp);
	});
	
	$("#spThree_min").focus(function() {
	}).blur(function() {		
		var sp = $(this).val();
		//if(bc_value > 500)qs = 500;
		if(isNaN(sp) || sp <= 1)sp = 1.5 ;		
		$(this).val('');
		$(this).val(sp);
	});
	$("#spThree_min").keydown(function() {
		}).keyup(function(e) {
			var sp = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(sp) || sp <= 1)sp = 1.5 ;		
			//$(this).val('');
			//$(this).val(sp);
	});
	
	$("#spThree_max").focus(function() {
	}).blur(function() {		
		var sp = $(this).val();
		//if(bc_value > 500)qs = 500;
		if(isNaN(sp) || sp <= 1)sp = 1.6 ;		
		$(this).val('');
		$(this).val(sp);
	});
	$("#spThree_max").keydown(function() {
		}).keyup(function(e) {
			var sp = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(sp) || sp <= 1)sp = 1.6 ;		
			//$(this).val('');
			//$(this).val(sp);
	});
	
	$("#spFoue_min").focus(function() {
	}).blur(function() {		
		var sp = $(this).val();
		//if(bc_value > 500)qs = 500;
		if(isNaN(sp) || sp <= 1)sp = 1.5 ;		
		$(this).val('');
		$(this).val(sp);
	});
	$("#spFoue_min").keydown(function() {
		}).keyup(function(e) {
			var sp = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(sp) || sp <= 1)sp = 1.5 ;		
			//$(this).val('');
			//$(this).val(sp);
	});
	$("#spFoue_max").focus(function() {
	}).blur(function() {		
		var sp = $(this).val();
		//if(bc_value > 500)qs = 500;
		if(isNaN(sp) || sp <= 1)sp = 1.6 ;		
		$(this).val('');
		$(this).val(sp);
	});
	$("#spFoue_max").keydown(function() {
		}).keyup(function(e) {
			var sp = $(this).val();
			//if(bc_value > 500)qs = 500;
			//if(isNaN(sp) || sp <= 1)sp = 1.6 ;		
			//$(this).val('');
			//$(this).val(sp);
	});
	

	//追号赔率校验（第一场赔率、第二场、第三场、第四场） end
	
	//追号初始金额、连续不中重新追号场次校验 start
	$("#init_money").focus(function() {
	}).blur(function() {		
		var money = $(this).val();
		if(money%2 !=0){ 
			alert("初始投注金额要为偶数!");
			money = 2;
		}
		if(isNaN(money) || money <= 2)money = 2 ;		
		$(this).val('');
		$(this).val(money);
	});
	$("#init_money").keydown(function() {
		}).keyup(function(e) {
			var money = $(this).val();
//			if(money%2 !=0){ 
//				alert("初始投注金额要为偶数!");
//				money = 2;
//			}
//			if(isNaN(money) || money <= 2)money = 2 ;		
			$(this).val('');
			$(this).val(money);
	});
	$("#count_stop").focus(function() {
	}).blur(function() {
		var money = $(this).val();
		
		if(isNaN(money) || money <= 2)money = 2 ;			
		$(this).val('');
		$(this).val(money);		
	});

	$("#count_stop").keydown(function() {
		}).keyup(function(e) {
			var money = $(this).val();
			
			//if(isNaN(money) || money <= 2)money = 2 ;		
			$(this).val('');
			$(this).val(money);
	}) ;
	/*
	$("#count_stop").focus(function() {
	}).blur(function() {		
		var money = $(this).val();
		
		if(isNaN(money) || money <= 2)money = 2 ;		
		$(this).val('');
		$(this).val(money);
	});
	$("#count_stop").keydown(function() {
		}).keyup(function(e) {
			var money = $(this).val();
			
			if(isNaN(money) || money <= 2)money = 2 ;		
			$(this).val('');
			$(this).val(money);
	});	
*/
	//追号初始金额、连续不中重新追号场次校验  end
	
	//追号停止条件 start
	$("#dctz_money").focus(function() {
	}).blur(function() {		
		var money = $(this).val();
		
		if(isNaN(money) || money <= 4)money = 4 ;		
		$(this).val('');
		$(this).val(money);
	});
	$("#dctz_money").keydown(function() {
		}).keyup(function(e) {
			//var money = $(this).val();
			
			//if(isNaN(money) || money <= 4)money = 4 ;		
			//$(this).val('');
			//$(this).val(money);
	});
	$("#ks_money").focus(function() {
	}).blur(function() {		
		var money = $(this).val();
		
		if(isNaN(money) || money <= 2)money = 2 ;		
		$(this).val('');
		$(this).val(money);
	});
	$("#ks_money").keydown(function() {
		}).keyup(function(e) {
			//var money = $(this).val();
			
			//if(isNaN(money) || money <= 2)money = 2 ;		
			//$(this).val('');
			//$(this).val(money);
	});
	$("#yl_money").focus(function() {
	}).blur(function() {		
		var money = $(this).val();
		
		if(isNaN(money) || money <= 2)money = 2 ;		
		$(this).val('');
		$(this).val(money);
	});
	$("#yl_money").keydown(function() {
		}).keyup(function(e) {
			//var money = $(this).val();
			
			//if(isNaN(money) || money <= 2)money = 2 ;		
			//$(this).val('');
			//$(this).val(money);
	});
	//追号停止条件 end
	
	//初始化页面，用户参数初始化   在页面加载完，事件初始化完才能初始化页面
	init_page();
});

var para = {};
//生成追号计划 start
function createTrack(){
	para.selectNum="";//篮球选号
	para.dgSpf = -1,//是否指定胜平负玩法 1是，-1 不是
	para.dgType = -1,//单关类型，3、1、0对应 胜、平、负 或 大、中、小     -1是不分玩法，完全用赔率去匹配
	para.offKuisun = 100,//无效场次整体不亏处理方式100：下期投相同金额；200：按初始金额重新追号；300：停止追号
	para.onKuisun = 100,//无效场次整体亏损处理方式
	para.dgTrackplay = dg_play;
	para.lotCode=9;
	para.playId=9006;
	para.stopOnemoney=$("#dctz_money").val();
	if(check_yl==1){
		para.ckAllMaxMoney=3;
		para.stopAllmoney=$("#yl_money").val();
	}else {
		para.ckAllMaxMoney=null;
		para.stopAllmoney=0;
	}
	if(check_ks==1){
		para.ckLoseMaxMoney=3;
		para.stopLose=$("#ks_money").val();
	}else{
		para.ckLoseMaxMoney=null;
		para.stopLose=0;
	}
	
	para.allCount = $("#count_stop").val();//连续不中停止次数
	para.init_money = $("#init_money").val();//初始投注金额
	
	para.gg_type = 1;//  单关追号      $("#gg_type option:selected").val();//追号类型
	
	//追号赔率
	para.spMin = $("#sp_min").val();
	para.spMax = $("#sp_max").val();
	
	para.spTwoMin = $("#spTwo_min").val();
	para.spTwoMax = $("#spTwo_max").val();
	
	para.spThreeMin = $("#spThree_min").val();
	para.spThreeMax = $("#spThree_max").val();
	
	para.spFoueMin = $("#spFoue_min").val();
	para.spFoueMax = $("#spFoue_max").val();
	
	//投注计划
	if($("#gd_yl").attr("class")=="i-checked"){
		para.trackType=100;
		para.trackArg=$("#yl_value").val();
	}
	if($("#gd_bc").attr("class")=="i-checked"){
		para.trackType=200;
		para.trackArg=$("#bc_value").val();
	}
	if($("#gd_bl").attr("class")=="i-checked"){
		para.trackType=300;
		para.trackArg=$("#bl_value").val();
	}
	//var bl = false;
	if(para.spMin>=para.spMax){
		showMsg("提示：赔率区间的第一个赔率不能等于、大于第二给赔率！");
		return;
	}
	if(para.gg_type==0){
		
	}
	if(para.gg_type==2){
		if(para.spTwoMin>=para.spTwoMax){
			showMsg("提示：赔率区间的第一个赔率不能等于、大于第二给赔率！");
			return;//bl = false;
		}
		para.spThreeMin=0;
		para.spThreeMax=0;
		para.spFoueMin=0;
		para.spFoueMax=0;
	}else if(para.gg_type==3){
		if(para.spTwoMin>=para.spTwoMax || para.spThreeMin>=para.spThreeMax){
			showMsg("提示：赔率区间的第一个赔率不能等于、大于第二给赔率！");	
			return;//bl = false;
		}
		para.spFoueMin=0;
		para.spFoueMax=0;
	}else if(para.gg_type==4){
		if(para.spTwoMin>=para.spTwoMax || para.spThreeMin>=para.spThreeMax || para.spFoueMin>=para.spFoueMax){
			showMsg("提示：赔率区间的第一个赔率不能等于、大于第二给赔率！");
			return;//bl = false;
		}
	}	
	//赔率是否达到盈利目标
	var obj =calTouZhuDist(para.allCount,para.init_money,para.spMin,para.spTwoMin,para.spThreeMin,para.spFoueMin,para.gg_type,para.trackType,para.trackArg);
	if(!obj[1]){
		showMsg("提示：达不到期望盈利率！");
		return;//达不到期望盈利率
	}
	$.cookie('para',JSON.stringify(para));	
	
	window.location.href="jcz_track_plan.html?para="+JSON.stringify(para);
//	$("#show_track_plan").html(obj[0]);
//	$("#show_issue").html(para.allCount);
//	$("#show_init_money").html(para.init_money);
//	
//	$("#to_track").show();
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
				+((j == 0 ? firstProfit + "%" : expectProfit)) + "%</td></Tr>";
				
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
//消息提示窗口 start
function showMsg(msg){
	$("#v_open_message_content").html(msg);
	$("#v_open_message_msg").show();
}

//页面初始化
function init_page(){
	var type = getQueryString("get_back");
	if(type && type==1){
		para=eval('(' + getQueryString("para") + ')');
		if(para){
			//模拟点击 $("#a").trigger("click")
			if(para.trackType==100){
				$("#yl_value").val(para.trackArg);
			    $("#gd_yl").trigger("click");
			}else	if(para.trackType==200){
				$("#bc_value").val(para.trackArg);
			    $("#gd_bc").trigger("click");
			}else if(para.trackType==300){
				$("#bl_value").val(para.trackArg);
			    $("#gd_bl").trigger("click");
			}
			//第一场
			$("#sp_min").val(para.spMin);
			$("#sp_max").val(para.spMax);
			//
			if(para.dgTrackplay==9005){
				$("#rqspf_play").trigger("click");
			}else if(para.dgTrackplay==9001){
				$("#spf_play").trigger("click");
			}
			
			$("#init_money").val(para.init_money);
			$("#count_stop").val(para.allCount);
			$("#dctz_money").val(para.stopOnemoney);
			if(para.stopAllmoney && para.stopAllmoney>0){
				$("#yl_money").val(para.stopAllmoney);
			    $("#check_yl").trigger("click");
			}
			if(para.stopLose && para.stopLose>0){
				$("#ks_money").val(para.stopLose);
			    $("#check_ks").trigger("click");
			}
		}else return;
	}
}
//
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }