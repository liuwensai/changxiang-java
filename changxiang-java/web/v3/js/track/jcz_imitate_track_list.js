$(document).ready(function(){
	getTrackList(1);
	if(!checkLoginByAjax()){		
		//保存数据
		
		//登录
//		toAuthLogin();
		var bakUrl =  window.location.href ;
		to_login(bakUrl);
		return ;
	}
	
	var track_type_clike=0;
	var track_state_clike=0;
	$("#track_type").click(function(){
		if(track_type_clike==0){
			track_type_clike=1;
			$("#track_type").attr("class","onfocus");
			
		}else{
			track_type_clike=0;			
			$("#track_type").removeAttr("class");
		}
		$("#track_state").removeAttr("class");
		$("#track_state_option").hide();
		$("#track_type_option").toggle();
	});
	
	$("#track_state").click(function(){
		if(track_state_clike==0){
			track_state_clike=1;
			$("#track_state").attr("class","onfocus");
			
		}else{
			track_state_clike=0;			
			$("#track_state").removeAttr("class");
		}
		$("#track_type").removeAttr("class");
		$("#track_type_option").hide();
		$("#track_state_option").toggle();
	});
	
	
	$("#track_state_option_1").click(function(){		
			$("#track_state").removeAttr("class");	
			resettingClass("track_state_option_1");
			track_state_clike=0;			
			//$("#track_state").attr("class","onfocus");
			$("#track_state").html("全部<i class='i-arrowD ui-trans'>");
			$("#track_state_option").toggle();
			getTrackList(-1);
	});

	$("#track_state_option_2").click(function(){		
			$("#track_state").removeAttr("class");
			resettingClass("track_state_option_2");
			track_state_clike=0;			
			//$("#track_state").attr("class","onfocus");
			$("#track_state").html("进行中<i class='i-arrowD ui-trans'>");
			$("#track_state_option").toggle();
			getTrackList(1);
	});
	$("#track_state_option_3").click(function(){		
		$("#track_state").removeAttr("class");
		resettingClass("track_state_option_3");
		track_state_clike=0;			
		//$("#track_state").attr("class","onfocus");
		$("#track_state").html("已暂停<i class='i-arrowD ui-trans'>");
		$("#track_state_option").toggle();
		getTrackList(2);
	});
	$("#track_state_option_4").click(function(){		
		$("#track_state").removeAttr("class");
		resettingClass("track_state_option_4");
		track_state_clike=0;			
		//$("#track_state").attr("class","onfocus");
		$("#track_state").html("已停止<i class='i-arrowD ui-trans'>");
		$("#track_state_option").toggle();
		getTrackList(0);
	});
});
function resettingClass(calssName){
	$("#track_state_option_1").removeAttr("class");
	$("#track_state_option_2").removeAttr("class");
	$("#track_state_option_3").removeAttr("class");
	$("#track_state_option_4").removeAttr("class");
	$("#"+calssName).attr("class","activing2");
}
function getTrackList(para){
	/*
	if(para==-1){
		$("#my_title1").attr("class","activing");
		$("#my_title2").removeAttr("class");
		$("#my_title3").removeAttr("class");
		$("#my_title4").removeAttr("class");		
	}
	if(para==1){
		$("#my_title2").attr("class","activing");
		$("#my_title1").removeAttr("class");
		$("#my_title3").removeAttr("class");
		$("#my_title4").removeAttr("class");		
	}
	if(para==2){
		$("#my_title3").attr("class","activing");
		$("#my_title2").removeAttr("class");
		$("#my_title1").removeAttr("class");
		$("#my_title4").removeAttr("class");		
	}
	if(para==0){
		$("#my_title4").attr("class","activing");
		$("#my_title2").removeAttr("class");
		$("#my_title3").removeAttr("class");
		$("#my_title1").removeAttr("class");		
	}
	*/
	var url ="/user/user-jc-track!toImitateMain.action";
	var postData={};
	postData.trackState=para;
	$.post(url,postData,function(responseText){
		try {
			var json = eval('(' + responseText + ')');
			if (json && json.flag == 1) {
				
				var html = "";	
				 var obj = json.msg;
				for(var i =0;i<obj.length;i++){
					var stopTrack = obj[i].stopTrack;
					if(stopTrack==0)stopTrack="已停止";
					else if(stopTrack==1)stopTrack="进行中";
					else if(stopTrack ==2 )stopTrack="已暂停";
					else stopTrack="未定义的追号状态";
					var trackState = obj[i].trackState;
					if(trackState==0)trackState="待发起";
					else if(trackState==-200)trackState="已停止";
					else if(trackState == 200 || trackState == 300)trackState="已完成";
					else trackState="待结"+obj[i].currentTrackMoney+"元";
					html=html+"<li class=\"d-box\" onclick=\"window.location='/v3shtml/trade/jczq/track/jcz_imitate_track_detail.html?tm_id="+obj[i].tmId+"'\">"
					+"<div class=\"b-flex ui-avc\"><div><h4 class=\"redstrong\">"+obj[i].currentArg+"%</h4>\<span class=\"greypeilv\">回报率</span>\</div></div>"
					+"<div class=\"b-flex ui-avc\"><div class=\"text-l\"><h4>"+getGGType(obj[i].lotCode,obj[i].ggType)+"</h4><span>投注"+obj[i].passCount+"次</span></div></div>"
					+"<div class=\"b-flex ui-avc\"><div class=\"aligncenter-text ing\">"+stopTrack+"</div></div>"
					+"<div class=\"ui-avc b-flex\"><div class=\"text-r\"><h4>"+trackState+"</h4><span><span class=\"red\">中"+obj[i].allBonus+"元</span></span></div></div>"
					+"<i class=\"i-arrowR\"></i></li>";
				}
				$("#track_list").html(html);
			} else {
				$("#track_list").html("<div class=\"append-recordnone\" id=\"orderRecordNoData\" style=\"\">暂无追号记录<p style=\"line-height:26px;\"></p></div>");
			}
		} catch (err) {
			alert(err);
	
		}
	}, "text");
}
function getGGType(lot,type){
	if(lot ==9){
		if(type==0)return"单关配";
		if(type==1)return"单关";
		if(type==2)return"2串1";
		if(type==3)return"3串1";
		if(type==4)return"4串1";
	}else{
		return "2串1";
	}
}