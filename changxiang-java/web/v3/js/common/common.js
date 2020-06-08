/**
 * @param url:
 *            页面跳转到URL
 */
function to_page(url){
	if(!url){
		url = "/";
	}
	document.location.href = url;
}

// 确认弹出框
var v_open_confirm_html_value = "<article class=\"g-dialog_box masked ui-avc\" style=\"display:none;\" id=\"v_open_confirm_msg\"><div class=\"g-dialog_body padding flex1\" style=\"text-align:left;\"><div id=\"v_open_confirm_message_content\" class=\"mb_25 mt_10\" style=\" font-size:1.33rem;\"></div><section class=\"m-dialog_submit ui-avc\"><a id=\"v_confirm_message_cancel\" href=\"javascript:;\" class=\"btn_white fullbtn flex1 mr_6\">取消</a><a id=\"v_confirm_message_confirm\" href=\"javascript:;\" class=\"btn_red fullbtn flex1 ml_6\">确认</a></section></div></article>";
document.write(v_open_confirm_html_value);
/**
 * @param msg:
 *            确认消息
 * @param tfun:
 *            用户确认后执行的函数，可以为空
 * @param ffun:
 *            用户取消后执行的函数，可以为空
 */
function open_confirm(msg, tfun, ffun){
	$("#v_confirm_message_confirm").one('click', function(){
		if(tfun){
			tfun();
		}
		$("#v_open_confirm_msg").hide();
	});
	$("#v_confirm_message_cancel").one('click', function(){
		if(ffun){
			ffun();
		}
		$("#v_open_confirm_msg").hide();
	});
	$("#v_open_confirm_message_content").html(msg);
	$("#v_open_confirm_msg").show();
}

//提示框
var v_open_message_html_value ="<article id=\"v_open_message_msg\" class=\"g-dialog_box masked ui-avc\" style=\"display:none;\"><div class=\"g-dialog_body padding flex1\" style=\"text-align:center; min-height:2rem; line-height:2rem; font-size:1.16rem;\"><div id=\"v_open_message_content\" class=\"mb_10 text mt_10\"></div><div id=\"v_open_message_btn\" class=\"btn_red fullbtn flex1\" style=\"display:none;\">知道了</div></div></article>";
document.write(v_open_message_html_value);
/**
 * @param msg:
 *            提示消息
 * @param t：
 *            提示消息持续的时间，可以为空
 */
function open_message(msg, t){
	$("#v_open_message_btn").one('click', function(){
		$("#v_open_message_msg").hide();
	});
	$("#v_open_message_content").html(msg);
	$("#v_open_message_msg").show();
	var d = parseInt(t);
	if(isNaN(d)){
		d = 1500;
	}
	setTimeout('$("#v_open_message_btn").click();', d);
}

//展示框
var v_open_dialog_html_value ="<article id=\"v_open_dialog_msg\" class=\"g-dialog_box masked ui-avc\" style=\"display:none;\"><div class=\"g-dialog_body padding flex1\" style=\"min-height:5rem;\"><div id=\"v_open_dialog_content\" class=\"mb_10 text mt_10\"></div><div id=\"v_open_dialog_btn\" class=\"btn_red fullbtn flex1\">知道了</div></div></article>";
document.write(v_open_dialog_html_value);
/**
 * @param msg:
 *            提示消息
 * 需要用户点击知道了，才会关闭
 */
function open_dialog(msg){
	$("#v_open_dialog_btn").one('click', function(){
		$("#v_open_dialog_msg").hide();
	});
	$("#v_open_dialog_content").html(msg);
	$("#v_open_dialog_msg").show();
}

//购彩协议
function open_agreementDialog(){
	$.ajax({
		type : "get",
		url : '/common/agreement.shtml',
		async : false,
		dataType : "text",
		timeout : 5000,
		success : function(a){
			if (a) {
				open_dialog(a);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
}

/***
 * 根据彩种获取json文件的链接
 * @param lotCode
 * @returns {String}
 */
function switchUrlByLotCode(lotCode){
	var url = "";
	switch(lotCode){
	case 9 :
		url = "/data/trade/jcz/jcz_match.json";
		break;
	case 10 :
		url =  "/data/trade/jcl/jcl_match.json";
		break;
	case 21:
		url =  "/data/trade/gpc/gpc_opencode.json";
		break;
	case 50:
		url =  "/data/trade/ssq/ssq_opencode.json";
		break;
	}
	return url;
}

/***
 * 
 * 获取系统当前时间的函数 
 */
function getCurrentTimeAjax(){
	var curTime = null;
	$.ajax({
		type : "post",
		url : '/ipub/trade/issue!getCurrentTime.action',
		async:false,
		cache : false,
		dataType : "json",
		success : function(data) {
			if(data.flag==1)
				curTime = data.msg.replace(/-/g,"/");
			else
				curTime = null;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
	return curTime;
}


