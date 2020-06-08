
var dlt_miss={};

dlt_miss.zst_detail={};
dlt_miss.zst_detail.section_open={};
dlt_miss.zst_detail.section_1={};
dlt_miss.zst_detail.section_2={};
dlt_miss.zst_detail.section_3={};
dlt_miss.zst_detail.section_blue={}; 

dlt_miss.zst_settings={};
dlt_miss.zst_settings.issue_count=50;
dlt_miss.zst_settings.show_omissions=1;
dlt_miss.zst_settings.show_statistics=1;

dlt_miss.selected_red=[];
dlt_miss.selected_blue=[];

dlt_miss.tab_params=['1','2','3','blue','open'];
$(document).ready(function (){
	
	initZstDetail();
	setZstPageTemplate();
	gp11x5Issue();	
	//Tab 切换
	$('#choose_tabs li').live('click',function(){
		var currentTab=$(this);
		var tabText=currentTab.text();
		if(tabText=='设置'){
			return;
		}else {
			$('#choose_tabs li').removeClass('on');
			currentTab.addClass('on');
			if(tabText=='开奖'){
				switchZstTab('1','2','3','blue','open');
			}else if(tabText=='1区'){
				switchZstTab('open','2','3','blue','1');
			}else if(tabText=='2区'){
				switchZstTab('open','3','blue','1','2');
			}else if(tabText=='3区'){
				switchZstTab('open','blue','1','2','3');
			}else if(tabText=='蓝球'){
				switchZstTab('open','1','2','3','blue');
			}
	 }
	});
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
		//$("#dlt_zst_explain_page #head").html(to_display_title("shopmicai/shoppage/dlt/mcdlt.html","大乐透",false,true));
	});
	
	$('#dlt_zst_explain_page_i_know').click(function(){
		$('#dlt_zst_explain_page').hide();
		$('#zst_page').show();
		//$("#zst_page #head").html(to_display_title("shopmicai/shoppage/dlt/mcdlt.html","大乐透",false,true));
	});
	
});

function clickBalls(){
	var selected_red=[];
	var selected_blue=[];
	switchPlay(1001);
	if($('#zst_page_finish').text()=='使用推荐号码'){
		selected_red=dlt_miss.zst_detail.section_open.recommended_codes_red;
		selected_blue=dlt_miss.zst_detail.section_open.recommended_codes_blue;		
	}else{
		selected_red=dlt_miss.selected_red;
		selected_blue=dlt_miss.selected_blue;	
	}
	var red_balls=$("[name='selRed']");
	red_balls.removeClass('checked');
	for(var i=0,length=selected_red.length;i<length;i++){
		red_balls[parseInt(selected_red[i])-1].click();
	}
	var blue_balls=$('[name="selBlue"]');
	blue_balls.removeClass('checked');
	for(var i=0,length=selected_blue.length;i<length;i++){
		blue_balls[parseInt(selected_blue[i])-1].click();
	}
}
//展开或关闭短走势图
function toggleZstSection(){
	var zst_section_short=$('#zst_section_short');
	if(zst_section_short.css('display')=='none'){
		$('#showHistory').html('<em class="i-slideDown fold"></em>点击收起');
		initZstDetail();
		setShortZstTemplate();
	//	$("#recommended_text_div").hide();
	}else{
		$('#showHistory').html('<em class="i-slideDown"></em>点此展开历史开奖');
	//	$("#recommended_text_div").show();
	}
	zst_section_short.toggle();
}

//短走势图，填模板
function setShortZstTemplate(){
   var zst_info_html=template('zst_info',dlt_miss.zst_detail);
   $('#zst_section_short').html(zst_info_html);
}
//走势图页，填模板
function setZstPageTemplate(){
	var zst_page_info_html=template('zst_page_info',dlt_miss.zst_detail);
	$('#zst_page_info_section').html(zst_page_info_html);
	//$('#zst_page_issue').html('第'+mcdlt.issuecode+'期  '); 
	//$('#zst_page_time').html(mcdlt.opentime.substring(5,mcdlt.opentime.length-3));
	$('#zst_page_finish').text("使用推荐号码");
	
	$('#select_section_balls').find('.zsballred').each(function(index,element){
		$(element).click(function(){
            toggleBall(element,'red');
            modifymodifySelectedCodeText();
		});
	});
	$('#select_section_balls').find('.zsbalblblue').each(function(index,element){
		$(element).click(function(){
            toggleBall(element,'blue');
            modifymodifySelectedCodeText();
		});
	});
}
function modifymodifySelectedCodeText(){
	$('#selected_red').text(dlt_miss.selected_red.join(' '));
	$('#selected_blue').text(dlt_miss.selected_blue.join(' '));
}
function toggleBall(element,color){
	var ball=$(element);
	var code=ball.text();
	if(ball.hasClass('on')){
		ball.removeClass('on');
		removeSelectedCode(code,color);
	}else{
		ball.addClass('on');
		addSelectedCode(code,color);
	}
}
//删除已选号码
function removeSelectedCode(code,color){
	if(color=='red'){
		for(var i=0,length=dlt_miss.selected_red.length;i<length;i++){
			if(dlt_miss.selected_red[i]==code){
				dlt_miss.selected_red.splice(i,1);
			}
		}
	}else{
		for(var i=0,length=dlt_miss.selected_blue.length;i<length;i++){
			if(dlt_miss.selected_blue[i]==code){
				dlt_miss.selected_blue.splice(i,1);
			}
		}		
	}
}
//添加已选号码
function addSelectedCode(code,color){
	if(color=='red'){
		dlt_miss.selected_red.push(code);
		dlt_miss.selected_red.sort();
	}else{
		dlt_miss.selected_blue.push(code);
		dlt_miss.selected_blue.sort();
	}
}

//打开走势图页
function showZstPage(){
	$('#zst_page').show();
	$('#selhm').hide();
};
//隐藏走势图页
function hideZstPage(){
	$('#zst_page').hide();
	$('#zst_section_short').hide();
	$('#showHistory').html('<em class="i-slideDown"></em>点此展开历史开奖');
	$('#selhm').show();	
	restoreZstData();
	restoreZstSettingsDialog();
}
//恢复数据
function restoreZstData(){
	dlt_miss.zst_settings.issue_count=50;
	dlt_miss.zst_settings.show_omissions=1;
	dlt_miss.zst_settings.show_statistics=1;

	dlt_miss.selected_red=[];
	dlt_miss.selected_blue=[];	
	
	$('#zst_page_finish').text("使用推荐号码");
}
//恢复走势图设置对话框
function restoreZstSettingsDialog(){
	$($('[name="issues"]')[1]).prop('checked',true);
	$($('[name="showOmissions"]')[0]).prop('checked',true);
	$($('[name="showStatistics"]')[0]).prop('checked',true);
	
	dlt_miss.zst_settings.issue_count=50;
	dlt_miss.zst_settings.show_omissions=1;
	dlt_miss.zst_settings.show_statistics=1;
}
//确定走势图设置
function confirmZstSettings(){
	var issue_count=parseInt($('[name="issues"]:checked').val());
	if(issue_count!=dlt_miss.zst_settings.issue_count){
		dlt_miss.zst_settings.issue_count=issue_count;
		var tabs_html=$('#choose_tabs').html();
		initZstDetail(issue_count);
		setZstPageTemplate();
		var id=dlt_miss.tab_params;
		switchZstTab(id[0],id[1],id[2],id[3],id[4]);
		$('#choose_tabs').html(tabs_html);
		$('[name="issue_count"]').text(issue_count);
		dlt_miss.selected_red=[];
		dlt_miss.selected_blue=[];
	}
	var show_omissions=$('[name="showOmissions"]:checked').val();
	if(show_omissions!=dlt_miss.zst_settings.show_omissions){
		dlt_miss.zst_settings.show_omissions=show_omissions;
		if(show_omissions==0){
			$('[name="omission"]').children().hide();
		}else{
			$('[name="omission"]').children().show();
		}
	}
	var show_statistics=$('[name="showStatistics"]:checked').val();
	if(show_statistics!=dlt_miss.zst_settings.show_statistics){
		dlt_miss.zst_settings.show_statistics=show_statistics;
		if(show_statistics==0){
			$(".tr.hot").hide();
		}else{
			$(".tr.hot").show();
		}
	}
}
//切换 开奖/1/2/3/蓝球  Tab
//最后一个参数为当前激活的tab
function switchZstTab(id0,id1,id2,id3,id4){
	document.getElementById('head_section_'+id0).style.display='none';
	document.getElementById('head_section_'+id1).style.display='none';
	document.getElementById('head_section_'+id2).style.display='none';
	document.getElementById('head_section_'+id3).style.display='none';
	document.getElementById('head_section_'+id4).style.display='';
	
	document.getElementById('table_section_'+id0).style.display='none';
	document.getElementById('table_section_'+id1).style.display='none';
	document.getElementById('table_section_'+id2).style.display='none';
	document.getElementById('table_section_'+id3).style.display='none';
	document.getElementById('table_section_'+id4).style.display='';
	
	if(id4=='open'){
		document.getElementById('select_section_open').style.display='';
		document.getElementById('select_section_balls').style.display='none';
		
		$('#zst_page_finish').text("使用推荐号码");
	}else{
		document.getElementById('select_section_open').style.display='none';
		document.getElementById('select_section_balls').style.display='';
		
		document.getElementById('select_balls_'+id1).style.display='none';
		document.getElementById('select_balls_'+id2).style.display='none';
		document.getElementById('select_balls_'+id3).style.display='none';
		document.getElementById('select_balls_'+id4).style.display='';
		
		$('#zst_page_finish').text("使用已选号码");
	}
	dlt_miss.tab_params=[id0,id1,id2,id3,id4];
}

//初始化走势图数据
function initZstDetail(count){
	api_url = base_url+"/trand/trand!dltZST.action?t="+new Date().getTime();
	var issue_count=count||50;//默认拉取50条
	var lot=1;	
	var zst_detail = getDataForAPI({
		"lot" : lot,
		"issueCount":issue_count
	});
	//zst_detail.data.reverse();//把data的顺序反过来
	
	var section_open={};
	var section_1={};
	var section_2={};
	var section_3={};
	var section_blue={};
	
	section_open.data=[];
	section_1.data=[];
	section_2.data=[];
	section_3.data=[];
	section_blue.data=[];
	
	for(var i=0,length=zst_detail.data.length;i<length;i++){
		var data=zst_detail.data[i];
		var child_issue_code=data.exnum;
        var omissions_red=data.omission1.split(',');
        var omissions_blue=data.omission2.split(',');
        var open_codes=data.opencode.split(/[,|]/);

		var data_open={};
		data_open.child_issue_code=child_issue_code;
		data_open.open_codes_red=open_codes.slice(0,5);
		data_open.open_codes_blue=open_codes.slice(5);
		data_open.ratio_big_small=data.ratio_big_small;
		data_open.ratio_ranges=data.ratio_ranges;
		data_open.ratio_odd_even=data.ratio_odd_even;
		section_open.data.push(data_open);
		
		var data_1={};
		data_1.child_issue_code=child_issue_code;
		data_1.omissions=omissions_red.slice(0,12);
		section_1.data.push(data_1);
		
		var data_2={};
		data_2.child_issue_code=child_issue_code;
		data_2.omissions=omissions_red.slice(12,24);
		section_2.data.push(data_2);
		
		var data_3={};
		data_3.child_issue_code=child_issue_code;
		data_3.omissions=omissions_red.slice(24);
		section_3.data.push(data_3);
		
		var data_blue={};
		data_blue.child_issue_code=child_issue_code;
		data_blue.omissions=omissions_blue;
		section_blue.data.push(data_blue);
	}
    var recommended_codes=zst_detail.recommended_code.split(/[,|]/);
    var recommended_codes_red=recommended_codes.slice(0,5);
    var recommended_codes_blue=recommended_codes.slice(5);
    
    section_open.recommended_codes_red=recommended_codes_red;
    section_open.recommended_codes_blue=recommended_codes_blue;
    
    var open_counts=zst_detail.open_count.split(/[,|]/);
    var open_counts_red=open_counts.slice(0,35);
    var open_counts_blue=open_counts.slice(35);
    var max_omissions=zst_detail.max_omission.split(/[,|]/);
    var max_omissions_red=max_omissions.slice(0,35);
    var max_omissions_blue=max_omissions.slice(35);
    var max_combos=zst_detail.max_combo.split(/[,|]/);
    var max_combos_red=max_combos.slice(0,35);
    var max_combos_blue=max_combos.slice(35);
    
    section_1.open_counts=open_counts_red.slice(0,12);
    section_1.max_omissions=max_omissions_red.slice(0,12);
    section_1.max_combos=max_combos_red.slice(0,12);
    
    section_2.open_counts=open_counts_red.slice(12,24);
    section_2.max_omissions=max_omissions_red.slice(12,24);
    section_2.max_combos=max_combos_red.slice(12,24);
    
    section_3.open_counts=open_counts_red.slice(24);
    section_3.max_omissions=max_omissions_red.slice(24);
    section_3.max_combos=max_combos_red.slice(24);
    
    section_blue.open_counts=open_counts_blue;
    section_blue.max_omissions=max_omissions_blue;
    section_blue.max_combos=max_combos_blue;
	
    dlt_miss.zst_detail.section_open=section_open;
    dlt_miss.zst_detail.section_1=section_1;
    dlt_miss.zst_detail.section_2=section_2;
    dlt_miss.zst_detail.section_3=section_3;
    dlt_miss.zst_detail.section_blue=section_blue;
}


/**
 * 全局变量说明
 */
var mcdlt ={};
mcdlt.lot_id  = 1;
mcdlt.play_id = 1001;
mcdlt.track_count = 1;
mcdlt.bs = 1;
mcdlt.issuecode="";

var listCode=[];
var redList=[];
var blueList=[];


var amt = 0;
var temp = 2;
var end_time = "";

var cur_game = {red_dan:[],red_tuo:[],blue_dan:[],blue_tuo:[],eachzs:0};
var cur_rand = {red_dan:4,red_tuo:5,blu_dan:1,blu_tuo:2};

function gp11x5Issue(){			
	dlttimeCounter("show_time" , false , function(){
		var tp_time =-1;
		var url = "/trade/num/dlt!activeIssue.action?t="+new Date().getTime() ;
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
	  	});
		return tp_time ;
	});
}