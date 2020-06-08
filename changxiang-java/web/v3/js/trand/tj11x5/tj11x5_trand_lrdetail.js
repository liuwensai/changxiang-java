

$(document).ready(function (){
	initZstDetail1(30);
	initZstDetail2(50);
	initZstDetail3(100);
});
//初始化走势图数据
function initZstDetail1(count){
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
	
	var allCount=issue_count;
	
	//数组的百分比
	var percArray=new Array();
	var openCount=new Array();
	openCount=zst_detail.open_count;
	var openSum=0;
	
	for(var q=0;q<openCount.length;q++){
		var code=openCount[q];
		openSum=parseInt(openSum)+parseInt(code);
		var percentage=(code/allCount)*100;
		percArray[q]=percentage;
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
	
	var avgTime=Math.round(openSum/11);
	
	var zst_perc_info_html=template('lrh_info_30_script',{"tuijian_code_detail":openCodeArray,"tuijian_perc_detail":percArray});
	$('#lrh_info_30').html(zst_perc_info_html);
	$("#avg_30_times").html("平均出现"+avgTime+"次");
}

function Item(iId, iName,color) {
    this.itemId = iId;
    this.itemName = iName;
    this.itemColor=color;
}

function initZstDetail2(count){
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
	
	
	//数组的百分比
	var percArray2=new Array();
	var openCount2=new Array();
	openCount2=zst_detail.open_count;
	var allCount2=50;
	var openSum=0;
	
	for(var k=0;k<openCount2.length;k++){
		var code=openCount2[k];
		openSum=parseInt(openSum)+parseInt(code);
		var percentage=(code/allCount2)*100;
		percArray2[k]=percentage;
	}
	var openCodeArray=new Array();
	for(var s=0;s<openCount2.length;s++){
		openCodeArray[s]=new Item(s+1,openCount2[s]);
	}
	openCodeArray.sort(function(a,b){
		return a.itemId-b.itemId;
	});
	openCount2.sort(function(a,b){
		return a-b;
	});
	for(var k=0;k<openCount2.length;k++){
		for(var h=0;h<openCodeArray.length;h++){
			if(openCount2[k]==openCodeArray[h].itemName){
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
	var avgTime=Math.round(openSum/11);
	var zst_perc_info_html=template('lrh_info_50_script',{"tuijian_code_detail":openCodeArray,"tuijian_perc_detail":percArray2});
	$('#lrh_info_50').html(zst_perc_info_html);
	$("#avg_50_times").html("平均出现"+avgTime+"次");
}

function initZstDetail3(count){
	api_url = base_url+"/trand/trand!tj11x5.action?t="+new Date().getTime();
	var issue_count=count||100;//默认拉取50条
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
	
	
	//数组的百分比
	var percArray3=new Array();
	var openCount3=new Array();
	openCount3=zst_detail.open_count;
	var allCount3=100;
	var openSum=0;
	
	for(var k=0;k<openCount3.length;k++){
		var code=openCount3[k];
		openSum=parseInt(openSum)+parseInt(code);
		var percentage=(code/allCount3)*100;
		percArray3[k]=percentage;
	}
	
	var openCodeArray=new Array();
	for(var s=0;s<openCount3.length;s++){
		openCodeArray[s]=new Item(s+1,openCount3[s]);
	}
	openCodeArray.sort(function(a,b){
		return a.itemId-b.itemId;
	});
	openCount3.sort(function(a,b){
		return a-b;
	});
	for(var k=0;k<openCount3.length;k++){
		for(var h=0;h<openCodeArray.length;h++){
			if(openCount3[k]==openCodeArray[h].itemName){
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
	
	var avgTime=Math.round(openSum/11);
	var zst_perc_info_html=template('lrh_info_100_script',{"tuijian_code_detail":openCodeArray,"tuijian_perc_detail":percArray3});
	$('#lrh_info_100').html(zst_perc_info_html);
	$("#avg_100_times").html("平均出现"+avgTime+"次");
}

