

$(document).ready(function (){
	initZstDetail();
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

	var size=new Array();
	var parity=new Array();
	
	for(var i=0;i<zst_detail.data.length;i++){
		var data_temp=zst_detail.data[i];
		var exnum=data_temp.issuc+""+data_temp.exnum;
		for(var key in zst_detail.sizeMaps){
			if(key==exnum){
				size[i]=zst_detail.sizeMaps[key];
				break;
			}
		}
		
		for(var key2 in zst_detail.parityMaps){
			if(key2==exnum){
				parity[i]=zst_detail.parityMaps[key2];
				break;
			}
		}
	}
	
	var zst_sp_info_html=template('dxqo_info_script',{"dxqo_size":size,"dxqo_parity":parity,"zstd_detail":zst_detail});
	$('#dxqo_info').html(zst_sp_info_html);
}

