

$(document).ready(function (){
	gp11x5Issue();	
	//setZstPageTemplate();
	
	//走势图设置
	$('#zst_settings').live('click',function(){
		$('#zst_settings_dialog').show();
	});
	//走势图页 返回
	$('#zst_page_return').live('click',function(){
		hideZstPage();
	});
	//走势图页 使用推荐号码 or 使用已选号码
	$('#zst_page_finish').live('click',function(){
		clickBalls();
		hideZstPage();
	});
	//走势图设置对话框  取消
	$('#zst_settings_dialog_cancel').click(function(){
		$('#zst_settings_dialog').hide();
		restoreZstSettingsDialog();
	});
	//走势图设置对话框 确定
	$('#zst_settings_dialog_confirm').click(function(){
		$('#zst_settings_dialog').hide();
		confirmZstSettings();
	});
	
	
	$('#dlt_zst_explain').live('click',function(){
		$('#zst_page').hide();
		$('#dlt_zst_explain_page').show();
	});
	
	$('#dlt_zst_explain_page_i_know').click(function(){
		$('#dlt_zst_explain_page').hide();
		$('#zst_page').show();
	});
	
});
//初始化走势图数据
function initZstDetail(count){
	api_url = base_url+"/trand/trand!tj11x5.action?t="+new Date().getTime();
	var issue_count=count||30;//默认拉取50条
	var lot=21;	
	var zst_detail = getDataForAPI({
		"lot" : lot,
		"issueCount":issue_count
	});

	
	for(var i=0,length=zst_detail.data.length;i<length;i++){
		zst_detail.data[i].omission1=zst_detail.data[i].omission1.split(',');

	}
	
	zst_detail.open_count=zst_detail.open_count.split(',');
	zst_detail.max_omission=zst_detail.max_omission.split(',');
	zst_detail.max_combo=zst_detail.max_combo.split(',');
	var temp =zst_detail.recommended_code;
	zst_detail.recommended_code=temp.replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ');
	
	
	var zst_page_info_html=template('zst_info_script',{"zst_detail":zst_detail});
	$('#zst_info').html(zst_page_info_html);
	
	var zst_page_info_html=template('tuijian_code_script',{"zst_detail":zst_detail});
	$('#tuijian_code').html(zst_page_info_html);

}
function gp11x5Issue(){
	if(false){//proName =="hb"
		//timeCounter("11x5_time" , "/trade/gpc/hb11x5!getNowIssue.action");
		//timeCounter("tj11x5_time" , "//trade/gpc/tj/tj11x5!getNowIssue.action");
		 timeCounter("11x5_time" , false , function(){
			var tp_time =-1;
			baseAjax("get","/trade/gpc/hb11x5!getNowIssue.action?t="+new Date().getTime(),false,null,"text",function(data){
		  		var lot_state = eval("("+data+")");
				if(!(typeof lot_state=="undefined") && lot_state != null){
					initZstDetail(); 
					var issue = "距第"+lot_state.IssueCode+"期截止";
					$('#issue_code').html(issue);
					tp_time = formatDate(lot_state.hct_stop , true) - formatDate(lot_state.currentSysDate , true) ;
					 tp_time = tp_time / 1000 ;
				} else {
					tp_time =  -1 ;
				};
		  	});
			return tp_time ;
		}); 
	} else {
		timeCounter("tj11x5_time" , false , function(){
			
			var tp_time =-1;
			baseAjax("get","/trade/gpc/tj/tj11x5!getNowIssue.action?t="+new Date().getTime(),false,null,"text",function(data){
		  		var lot_state = eval("("+data+")");
				if(!(typeof lot_state=="undefined") && lot_state != null){
					initZstDetail(); 
					var issue = "距第"+lot_state.IssueCode+"期截止";
					$('#issue_code').html(issue);
					tp_time = formatDate(lot_state.hct_stop , true) - formatDate(lot_state.currentSysDate , true) ;
					 tp_time = tp_time / 1000 ;
					 
				} else {
					tp_time =  -1 ;
				};
		  	});
			return tp_time ;
		});
	}
}
