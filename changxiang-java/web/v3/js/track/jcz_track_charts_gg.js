var track = {};//全局变量，追号详情
$(document).ready(function(){
	getTrackList(2);
	$("#ghb").click(function(){
		$("#ghb").attr("class","activing");

		$("#yld").removeAttr("class");
		$("#jjd").removeAttr("class");
		$("#csd").removeAttr("class");
		getTrackList(1);
	});
	$("#yld").click(function(){
		$("#yld").attr("class","activing");

		$("#ghb").removeAttr("class");
		$("#jjd").removeAttr("class");
		$("#csd").removeAttr("class");
		getTrackList(2);
	});
	$("#jjd").click(function(){
		$("#jjd").attr("class","activing");

		$("#ghb").removeAttr("class");
		$("#yld").removeAttr("class");
		$("#csd").removeAttr("class");
		getTrackList(3);
	});
	$("#csd").click(function(){
		$("#csd").attr("class","activing");

		$("#ghb").removeAttr("class");
		$("#yld").removeAttr("class");
		$("#jjd").removeAttr("class");
		getTrackList(4);
	});
	if(!checkLoginByAjax()){		
		//保存数据
		
		//登录
//		toAuthLogin();
		var bakUrl = "/v3shtml/trade/jczq/track/jcz_track_charts_gg.html" ;
		to_login(bakUrl);
		return ;
	}
});
function getTrackList(orderType){
	
	var url ="/user/user-jc-track!getOtherUserTrack.action";
	var postData={};
	postData.orderType=orderType;
	$.post(url,postData,function(responseText){
		try {
			var json = eval('(' + responseText + ')');
			var html="";
			if (json && json.flag == 1) {
				for(var i=0;i<json.msg.length;i++){
					var tm=json.msg[i].jctrackMain;
					var tc=json.msg[i].child;
					/*                       
	                  
					 */
					
					html=html+ "<li onclick=\"window.location='jcz_track_otherUserTrackGg.html?tmId="+tm.tmId+"&userId="+tm.userId+"'\"><div class=\"d-box\">" +
							"<div class=\"b-flex ui-avc\"><div><h4 class=\"redstrong\">"+tm.currentArg+"%</h4><span class=\"greypeilv\">回报率</span>" +
							"</div></div><div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\"><h4 class=\"lightorange\">"+tm.argMoney+"元</h4>" +
							"<span class=\"greypeilv\">盈利</span></div></div><div class=\"b-flex ui-avc\"><div class=\"aligncenter-text\">" +
							"<h4 class=\"lightorange\">"+tm.allBonus+"元</h4><span class=\"greypeilv\">中奖</span></div></div>" +
							"<div class=\"b-flex ui-avc\"><div class=\"text-r\" ><h4 class=\"greypeilv\"><span class=\"loginicon\"></span>"+tm.userName+"</h4>" +
							"<span>"+tm.passCount+"次投注</span></span></div></div><i class=\"i-arrowR\" style=\"display:none;\"></i></div>" +
							"<div class=\"mt_10 d-box\"><ul class=\"paihanglist b-flex\">";
					for(var j = 0 ;j<tc.length;j++){
						if(tc[j]>0){
							html=html+"<li><span class=\"cirball_orange\"></span></li>";
						}else{
							html=html+"<li><span class=\"cirball_grey\"></span></li>";
						}
					}
					html=html+"<div class=\"clearfix\"></div> </ul><div class=\"jiantoubox\"><div class=\"shuanjiatou\"></div></div><div class=\"clearfix\"></div></div></li>";
				}
			} else {
				$("#track_info").html("<div class=\"append-recordnone\" id=\"orderRecordNoData\" style=\"\">暂无追号记录<p style=\"line-height:26px;\"></p></div>");
			}
			$("#show_charts").html(html);
		} catch (err) {
			alert(err);
	
		}
	}, "text");
}