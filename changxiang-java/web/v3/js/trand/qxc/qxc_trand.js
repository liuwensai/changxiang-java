var zst_detail;
$(document).ready(function (){
	activeIssue();
	initZstDetail();	

	//Tab 切换
	$('#a_click').click(function(){
		$("#a_click").attr("class","b-flex on");
		$("#b_click").attr("class","b-flex");
		$("#c_click").attr("class","b-flex");
		$("#d_click").attr("class","b-flex");
		$("#e_click").attr("class","b-flex");	
		$("#f_click").attr("class","b-flex");
		$("#g_click").attr("class","b-flex");
		
		$('#g_show').hide();
		$('#f_show').hide();
		$('#e_show').hide();
		$('#d_show').hide();
		$('#c_show').hide();
		$('#b_show').hide();
		$('#a_show').show();
	});
	$('#b_click').click(function(){
		$("#a_click").attr("class","b-flex");
		$("#b_click").attr("class","b-flex on");
		$("#c_click").attr("class","b-flex");
		$("#d_click").attr("class","b-flex");
		$("#e_click").attr("class","b-flex");	
		$("#f_click").attr("class","b-flex");
		$("#g_click").attr("class","b-flex");
		
		$('#g_show').hide();
		$('#f_show').hide();
		$('#e_show').hide();
		$('#d_show').hide();
		$('#c_show').hide();
		$('#b_show').show();
		$('#a_show').hide();
	});
	$('#c_click').click(function(){
		$("#a_click").attr("class","b-flex");
		$("#b_click").attr("class","b-flex");
		$("#c_click").attr("class","b-flex on");
		$("#d_click").attr("class","b-flex");
		$("#e_click").attr("class","b-flex");	
		$("#f_click").attr("class","b-flex");
		$("#g_click").attr("class","b-flex");
		
		$('#g_show').hide();
		$('#f_show').hide();
		$('#e_show').hide();
		$('#d_show').hide();
		$('#c_show').show();
		$('#b_show').hide();
		$('#a_show').hide();
	});
	$('#d_click').click(function(){
		$("#a_click").attr("class","b-flex");
		$("#b_click").attr("class","b-flex");
		$("#c_click").attr("class","b-flex");
		$("#d_click").attr("class","b-flex on");
		$("#e_click").attr("class","b-flex");	
		$("#f_click").attr("class","b-flex");
		$("#g_click").attr("class","b-flex");
		
		$('#g_show').hide();
		$('#f_show').hide();
		$('#e_show').hide();
		$('#d_show').show();
		$('#c_show').hide();
		$('#b_show').hide();
		$('#a_show').hide();
	});
	$('#e_click').click(function(){
		$("#a_click").attr("class","b-flex");
		$("#b_click").attr("class","b-flex");
		$("#c_click").attr("class","b-flex");
		$("#d_click").attr("class","b-flex");
		$("#e_click").attr("class","b-flex on");	
		$("#f_click").attr("class","b-flex");
		$("#g_click").attr("class","b-flex");
		
		$('#g_show').hide();
		$('#f_show').hide();
		$('#e_show').show();
		$('#d_show').hide();
		$('#c_show').hide();
		$('#b_show').hide();
		$('#a_show').hide();
	});
	
	$('#f_click').click(function(){
		$("#a_click").attr("class","b-flex");
		$("#b_click").attr("class","b-flex");
		$("#c_click").attr("class","b-flex");
		$("#d_click").attr("class","b-flex");
		$("#e_click").attr("class","b-flex");	
		$("#f_click").attr("class","b-flex on");
		$("#g_click").attr("class","b-flex");
		
		$('#g_show').hide();
		$('#f_show').show();
		$('#e_show').hide();
		$('#d_show').hide();
		$('#c_show').hide();
		$('#b_show').hide();
		$('#a_show').hide();
	});
	
	$('#g_click').click(function(){
		$("#a_click").attr("class","b-flex");
		$("#b_click").attr("class","b-flex");
		$("#c_click").attr("class","b-flex");
		$("#d_click").attr("class","b-flex");
		$("#e_click").attr("class","b-flex");	
		$("#f_click").attr("class","b-flex");
		$("#g_click").attr("class","b-flex on");
		
		$('#g_show').show();
		$('#f_show').hide();
		$('#e_show').hide();
		$('#d_show').hide();
		$('#c_show').hide();
		$('#b_show').hide();
		$('#a_show').hide();
	});
	
	
	//走势图设置
	$('#zst_settings').live('click',function(){
		$('#zst_settings_dialog').show();
	});
	//走势图页 返回
	$('#zst_page_return').live('click',function(){
		hideZstPage();
	});
	
	//走势图设置对话框  取消
	$('#zst_settings_dialog_cancel').click(function(){
		$('#zst_settings_dialog').hide();
		//restoreZstSettingsDialog();
	});
	//走势图设置对话框 确定
	$('#zst_settings_dialog_confirm').click(function(){
		$('#zst_settings_dialog').hide();
		confirmZstSettings();
	});
	
	
	$('#dlt_zst_explain').live('click',function(){
		$('#zst_page').hide();
		$('#dlt_zst_explain_page').show();
		//$("#dlt_zst_explain_page #head").html(to_display_title("shopmicai/shoppage/dlt/mcdlt.html","大乐透",false,true));
	});
	
	$('#dlt_zst_explain_page_i_know').click(function(){
		$('#dlt_zst_explain_page').hide();
		$('#zst_page').show();
		//$("#zst_page #head").html(to_display_title("shopmicai/shoppage/dlt/mcdlt.html","大乐透",false,true));
	});
	
});


function modifymodifySelectedCodeText(){
	$('#selected_red').text(pls_miss.selected_red.join(' '));
	$('#selected_blue').text(pls_miss.selected_blue.join(' '));
}

//确定走势图设置
function confirmZstSettings(){
	var issue_count=parseInt($('[name="issues"]:checked').val());
	if(issue_count!=zst_detail.data.length){
		
		initZstDetail(issue_count);
		
	}

}

//初始化走势图数据
function initZstDetail(count){
	api_url = base_url+"/trand/trand!qxcZST.action?t="+new Date().getTime();
	var issue_count=count||50;//默认拉取50条
	var lot=4;	
	zst_detail = getDataForAPI({
		"lot" : lot,
		"issueCount":issue_count
	});
	for(var i =0;i<zst_detail.data.length;i++){
		zst_detail.data[i].opencode=zst_detail.data[i].opencode.split(',');
		zst_detail.data[i].omission1=zst_detail.data[i].omission1.split(',');
		zst_detail.data[i].omission2=zst_detail.data[i].omission2.split(',');
		zst_detail.data[i].omission3=zst_detail.data[i].omission3.split(',');
		zst_detail.data[i].omission4=zst_detail.data[i].omission4.split(',');
		zst_detail.data[i].omission5=zst_detail.data[i].omission5.split(',');
		zst_detail.data[i].omission6=zst_detail.data[i].omission6.split(',');
		zst_detail.data[i].omission7=zst_detail.data[i].omission7.split(',');
	}
	
	var open_count = zst_detail.open_count.split('|');
	zst_detail.open_count1=open_count[0].split(',');
	zst_detail.open_count2=open_count[1].split(',');
	zst_detail.open_count3=open_count[2].split(',');
	zst_detail.open_count4=open_count[3].split(',');
	zst_detail.open_count5=open_count[4].split(',');
	zst_detail.open_count6=open_count[5].split(',');
	zst_detail.open_count7=open_count[6].split(',');
	
	var mox_omission = zst_detail.max_omission.split('|');
	zst_detail.max_omission1=mox_omission[0].split(',');
	zst_detail.max_omission2=mox_omission[1].split(',');
	zst_detail.max_omission3=mox_omission[2].split(',');
	zst_detail.max_omission4=mox_omission[3].split(',');
	zst_detail.max_omission5=mox_omission[4].split(',');
	zst_detail.max_omission6=mox_omission[5].split(',');
	zst_detail.max_omission7=mox_omission[6].split(',');
	
	var max_combo = zst_detail.max_combo.split('|');
	zst_detail.max_combo1=max_combo[0].split(',');
	zst_detail.max_combo2=max_combo[1].split(',');
	zst_detail.max_combo3=max_combo[2].split(',');
	zst_detail.max_combo4=max_combo[3].split(',');
	zst_detail.max_combo5=max_combo[4].split(',');
	zst_detail.max_combo6=max_combo[5].split(',');
	zst_detail.max_combo7=max_combo[6].split(',');
	
	//走势图期号显示
	$("#issue_count").html("近"+zst_detail.data.length+"期");
	
	var zst_page_info_html1=template('a_show_template',{"zst_detail":zst_detail});
	$('#a_show').html(zst_page_info_html1);
	
	var zst_page_info_html2=template('b_show_template',{"zst_detail":zst_detail});
	$('#b_show').html(zst_page_info_html2);
	
	var zst_page_info_html3=template('c_show_template',{"zst_detail":zst_detail});
	$('#c_show').html(zst_page_info_html3);
	
	var zst_page_info_html4=template('d_show_template',{"zst_detail":zst_detail});
	$('#d_show').html(zst_page_info_html4);
	
	var zst_page_info_html5=template('e_show_template',{"zst_detail":zst_detail});
	$('#e_show').html(zst_page_info_html5);
	
	var zst_page_info_html6=template('f_show_template',{"zst_detail":zst_detail});
	$('#f_show').html(zst_page_info_html6);
	
	var zst_page_info_html7=template('g_show_template',{"zst_detail":zst_detail});
	$('#g_show').html(zst_page_info_html7);
	
	//推荐号码
	var temp =zst_detail.recommended_code.split(',');	
	$('#tuijian_code').html(temp[0]+" "+temp[1]+" "+temp[2]+" "+temp[3]+" "+temp[4]+" "+temp[5]+" "+temp[6]);
}


//获取期号
function activeIssue(){
	dlttimeCounter("show_time" , false , function(){
		var tp_time =-1;
		var url = "/trade/num/qxc!activeIssue.action?t="+new Date().getTime() ;
		baseAjax("get",url,false,null,"text",function(data){
	  		var lot_state = eval("("+data+")");
			if(!(typeof lot_state=="undefined") && lot_state != null){
				 var issue = "距第"+lot_state.msg.issueCode+"期截止";
				 $('#issue_code').html(issue);    
				 tp_time = formatDate(lot_state.msg.officialEndTime , true) - formatDate(lot_state.msg.currentSysDate , true) ;
				 tp_time = tp_time / 1000 ;
			} else {
				tp_time =  -1 ;
			};
//			if(lot_state.msg.issueCode != qxc.issuecode){
//				qxc.issueid = lot_state.msg.issueId ;
//				qxc.issuecode = lot_state.msg.issueCode ;
//				var times = formatDate(lot_state.msg.officialEndTime) ;
//				qxc.cur_nex_his.endtime =  times.year +'-'+ times.month +'-'+ times.date+' '+times.hour+':'+times.minute+':'+times.second;
//				// var date= formatDate(lot_state.msg.officialOpenTime , true) ;
//				// var day = getTimeDiffer(date,new Date());
//				var dthtm="<strong>距"+qxc.issuecode+"期截止</strong><strong id=\"show_time\">00天00小时00分00秒</strong><span class=\"gray\">奖池</span><span class=\"red\"></span>" ;
//				$("#open_code_time_id").html(dthtm);
//			}	
	  	});
		return tp_time ;
	});
}