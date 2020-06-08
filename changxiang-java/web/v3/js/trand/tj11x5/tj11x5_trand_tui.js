

$(document).ready(function (){
	gp11x5Issue();	
});
//初始化走势图数据
function initZstDetail(count){
	api_url = base_url+"/trand/trand!tj11x5.action?t="+new Date().getTime();
	var issue_count=count||50;//默认拉取50条
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
	
	var strs= new Array(); //定义一数组
	strs=temp.split(","); //字符分割
	
	//数组的百分比
	var percArray=new Array();
	var openCount=new Array();
	openCount=zst_detail.open_count;
	var allCount=issue_count;
	for(var k=0;k<openCount.length;k++){
		var code=openCount[k];
		var percentage=(code/allCount)*100;
		percArray[k]=percentage;
	}
	
	var openCodeArray=new Array();
	for(var s=0;s<openCount.length;s++){
		openCodeArray[s]=new Item(s+1,openCount[s]);
	}
	openCodeArray.sort(function(a,b){
		return a.itemId-b.itemId;
	});
	openCount.sort(function(a,b){
		return a-b;
	});
	for(var k=0;k<openCount.length;k++){
		for(var h=0;h<openCodeArray.length;h++){
			if(openCount[k]==openCodeArray[h].itemName){
				if(k>=8){
					openCodeArray[h].itemColor="red";
				}else if(k>=4){
					openCodeArray[h].itemColor="gre";
				}else{
					openCodeArray[h].itemColor="gry";
				}
			}
		}
	}
	
	var flagCount=issue_count;
	for(var i=0;i<zst_detail.data.length;i++){
		var flagAll=0;
		var code=new Array();
		code=zst_detail.data[i].opencode.split(",");
		var tuijian=strs;
		for(var c=0;c<code.length;c++){
			var cc=code[c];
			for(var d=0;d<tuijian.length;d++){
				var tt=tuijian[d];
				if(cc==tt){
					flagAll+=1;
				}
			}
		}
		if(flagAll==code.length){
			flagCount=flagCount-(i+1);
		}
	}
	
	var openPro=(flagCount/allCount)*100;
	
	var zst_perc_info_html=template('lrh_info_script',{"lrh_code_detail":openCodeArray,"lrh_perc_detail":percArray});
	$('#lrh_info').html(zst_perc_info_html);
	
	var zst_page_info_html=template('tuijian_code_script',{"tuijian_code_detail":strs});
	$('#tuijian_code').html(zst_page_info_html);
	
	var zst_wmfb_info_html=template('zstd_info_script',{"zstd_detail":zst_detail});
	$('#zstd_info').html(zst_wmfb_info_html);
	
	$('#issues_exnum').html(flagCount);
	
	/*$("#issues_probability").html(openPro+"%");*/
	
}

function Item(iId, iName,color) {
    this.itemId = iId;
    this.itemName = iName;
    this.itemColor=color;
}

function recommCode(){
	//返回一个期号和当前期号的开奖号码
	baseAjax("get","/trand/trand!recom11x5.action?lot=21",false,null,"text",function(data){
		var lot_state = eval("("+data+")");
		if(!(typeof lot_state=="undefined") && lot_state != null){
			var codes=new Array();
			codes=lot_state.OpenCode.split(',');
			
			$('#tj11x5_issue').html(lot_state.IssueCode);
			
			var zst_page_info_html=template('kjh_info_script',{"zst_code_detail":codes});
			$('#kjh_info').html(zst_page_info_html);
		}
	});
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
					recommCode();
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
					recommCode();
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

