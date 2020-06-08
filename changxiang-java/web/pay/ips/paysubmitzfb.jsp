<%@ page language="java" pageEncoding="UTF-8"%><%@ page import="com.caipiao.pay.huichao.MD5" %>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.utils.StaticItem"%>
<%@page import="com.caipiao.utils.TimeUtil"%>
<%@ page import="com.pay.*"%>
<%@ page import="org.apache.commons.codec.binary.Base64"%>
<%@ page import="net.sf.json.JSONObject"%>
<%!	String formatString(String text){ 
			if(text == null) {
				return ""; 
			}
			return text;
		}
%>

<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 
<meta charset="gb2312">
<meta name="keywords" content="">
<meta name="description" content="">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>支付宝 - 网上支付 安全快速！</title>


  

<!-- FD:106:alipay/tracker/tracker_time.vm:784:tracker_time.schema:全站 tracker 开关:END -->
<!-- FD:106:alipay/tracker/tracker_time.vm:END -->
<link charset="utf-8" rel="stylesheet" href="css/front-old.css" media="all">
<link charset="utf-8" rel="stylesheet" href="css/alice.css" media="all">
   <script src="js/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
     <script src="js/jquery/jquery.qrcode.min.js" type="text/javascript"></script>


	
<style>
    #header {
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #d9d9d9;
        margin-top: 0px;
    }
    #header .header-title {
        width: 250px;
        height: 60px;
        float: left;
    }
    #header .logo {
        float: left;
        height: 31px;
        width: 95px;
        margin-top: 14px;
        text-indent: -9999px;
        background: none; !important
    }
    #header .logo-title {
        font-size: 16px;
        font-weight: normal;
        font-family: "Microsoft YaHei",微软雅黑,"宋体";
        border-left: 1px solid #676d70;
        color: #676d70;
        height: 20px;
        float: left;
        margin-top: 15px;
        margin-left: 10px;
        padding-top: 10px;
        padding-left: 10px;
    }
    .header-container {
        width: 950px;
        margin: 0 auto;
    }

    body,
    #footer{
        background-color: #eff0f1;
    }

    #footer #ServerNum {
        color: #eff0f1;
    }
    .login-switchable-container {
        background-color: #fff;
    }

    #order.order-bow .orderDetail-base,
    #order.order-bow .ui-detail {
        border-bottom: 3px solid #bbb;
        background: #eff0f1;
        color: #000;
    }

    .order-ext-trigger {
        position: absolute;
        right: 20px;
        bottom: 0;
        height: 22px;
        padding: 2px 8px 1px;
        font-weight: 700;
        border-top: 0;
        background: #b3b3b3;
        z-index: 100;
        color: #fff;
    }

    #partner {
        margin-top: 0;
        padding-top: 0;
        background-color: #eff0f1;
    }

    #order.order-bow .orderDetail-base, #order.order-bow .ui-detail {
        border-bottom: 3px solid #b3b3b3;
    }

    .payAmount-area {
        bottom: 36px;
    }

    .alipay-logo {
        display: block;
        width: 114px;
        position: relative;
        left: 0;
        top: 10px;
        float: left;
        height: 40px;
        background-position: 0 0;
        background-repeat: no-repeat;
        background-image: url(https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png);
    }
</style>
<!-- CMS:外部商户匿名收银台cms/日志入口/全局日志入口开始:excashier/globalLog/log.vm -->  <style>body #onlineService{display:none}</style>

 <!-- CMS:外部商户匿名收银台cms/日志入口/全局日志入口结束:excashier/globalLog/log.vm --><style>.arale-tip-1_2_2 .ui-poptip{color:#DB7C22;z-index:101;font-size:12px;line-height:1.5;zoom:1}.arale-tip-1_2_2 .ui-poptip-shadow{background-color:rgba(229,169,107,.15);FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#26e5a96b, endColorstr=#26e5a96b);border-radius:2px;padding:2px;zoom:1;_display:inline}.arale-tip-1_2_2 .ui-poptip-container{position:relative;background-color:#FFFCEF;border:1px solid #ffbb76;border-radius:2px;padding:5px 15px;zoom:1;_display:inline}.arale-tip-1_2_2 .ui-poptip:after,.arale-tip-1_2_2 .ui-poptip-shadow:after,.arale-tip-1_2_2 .ui-poptip-container:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}.arale-tip-1_2_2 a.ui-poptip-close{position:absolute;right:3px;top:3px;border:1px solid #ffc891;text-decoration:none;border-radius:3px;width:12px;height:12px;font-family:tahoma;color:#dd7e00;line-height:10px;*line-height:12px;text-align:center;font-size:14px;background:#ffd7af;background:-webkit-gradient(linear,left top,left bottom,from(#FFF0E1),to(#FFE7CD));background:-moz-linear-gradient(top,#FFF0E1,#FFE7CD);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFF0E1', endColorstr='#FFE7CD');background:-o-linear-gradient(top,#FFF0E1,#FFE7CD);background:linear-gradient(top,#FFF0E1,#FFE7CD);overflow:hidden}.arale-tip-1_2_2 a.ui-poptip-close:hover{border:1px solid #ffb24c;text-decoration:none;color:#dd7e00;background:#ffd7af;background:-webkit-gradient(linear,left top,left bottom,from(#FFE5CA),to(#FFCC98));background:-moz-linear-gradient(top,#FFE5CA,#FFCC98);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFE5CA', endColorstr='#FFCC98');background:-o-linear-gradient(top,#FFE5CA,#FFCC98);background:linear-gradient(top,#FFE5CA,#FFCC98)}.arale-tip-1_2_2 .ui-poptip-arrow{position:absolute;z-index:10;*zoom:1}.arale-tip-1_2_2 .ui-poptip-arrow em,.arale-tip-1_2_2 .ui-poptip-arrow span{position:absolute;*zoom:1;width:0;height:0;border-color:rgba(255,255,255,0);border-color:transparent\0;*border-color:transparent;_border-color:tomato;_filter:chroma(color=tomato);border-style:solid;overflow:hidden;top:0;left:0}.arale-tip-1_2_2 .ui-poptip-arrow-10{left:-6px;top:10px}.arale-tip-1_2_2 .ui-poptip-arrow-10 em{top:0;left:-1px;border-right-color:#ffbb76;border-width:6px 6px 6px 0}.arale-tip-1_2_2 .ui-poptip-arrow-10 span{border-right-color:#FFFCEF;border-width:6px 6px 6px 0}.arale-tip-1_2_2 .ui-poptip-arrow-9{left:-6px;top:50%}.arale-tip-1_2_2 .ui-poptip-arrow-9 em{top:-6px;left:-1px;border-right-color:#ffbb76;border-width:6px 6px 6px 0}.arale-tip-1_2_2 .ui-poptip-arrow-9 span{top:-6px;border-right-color:#FFFCEF;border-width:6px 6px 6px 0}.arale-tip-1_2_2 .ui-poptip-arrow-2{top:10px;right:0}.arale-tip-1_2_2 .ui-poptip-arrow-2 em{top:0;left:1px;border-left-color:#ffbb76;border-width:6px 0 6px 6px}.arale-tip-1_2_2 .ui-poptip-arrow-2 span{border-left-color:#FFFCEF;border-width:6px 0 6px 6px}.arale-tip-1_2_2 .ui-poptip-arrow-3{top:50%;right:0}.arale-tip-1_2_2 .ui-poptip-arrow-3 em{top:-6px;left:1px;border-left-color:#ffbb76;border-width:6px 0 6px 6px}.arale-tip-1_2_2 .ui-poptip-arrow-3 span{top:-6px;border-left-color:#FFFCEF;border-width:6px 0 6px 6px}.arale-tip-1_2_2 .ui-poptip-arrow-11 em,.arale-tip-1_2_2 .ui-poptip-arrow-12 em,.arale-tip-1_2_2 .ui-poptip-arrow-1 em{border-width:0 6px 6px;border-bottom-color:#ffbb76;top:-1px;left:0}.arale-tip-1_2_2 .ui-poptip-arrow-11 span,.arale-tip-1_2_2 .ui-poptip-arrow-12 span,.arale-tip-1_2_2 .ui-poptip-arrow-1 span{border-width:0 6px 6px;border-bottom-color:#FFFCEF}.arale-tip-1_2_2 .ui-poptip-arrow-11{left:14px;top:-6px}.arale-tip-1_2_2 .ui-poptip-arrow-1{right:28px;top:-6px}.arale-tip-1_2_2 .ui-poptip-arrow-12{left:50%;top:-6px}.arale-tip-1_2_2 .ui-poptip-arrow-12 em,.arale-tip-1_2_2 .ui-poptip-arrow-12 span{left:-6px}.arale-tip-1_2_2 .ui-poptip-arrow-5 em,.arale-tip-1_2_2 .ui-poptip-arrow-6 em,.arale-tip-1_2_2 .ui-poptip-arrow-7 em{border-width:6px 6px 0;border-top-color:#ffbb76;top:1px;left:0}.arale-tip-1_2_2 .ui-poptip-arrow-5 span,.arale-tip-1_2_2 .ui-poptip-arrow-6 span,.arale-tip-1_2_2 .ui-poptip-arrow-7 span{border-width:6px 6px 0;border-top-color:#FFFCEF}.arale-tip-1_2_2 .ui-poptip-arrow-5{right:28px;bottom:0}.arale-tip-1_2_2 .ui-poptip-arrow-6{left:50%;bottom:0}.arale-tip-1_2_2 .ui-poptip-arrow-7{left:14px;bottom:0}.arale-tip-1_2_2 .ui-poptip-arrow-6 em,.arale-tip-1_2_2 .ui-poptip-arrow-6 span{left:-6px}:root .arale-tip-1_2_2 .ui-poptip-shadow{FILTER:none\9}.arale-tip-1_2_2 .ui-poptip-blue{color:#4d4d4d}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-shadow{background-color:rgba(0,0,0,.05);FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#0c000000, endColorstr=#0c000000)}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-container{background-color:#F8FCFF;border:1px solid #B9C8D3}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-10 em,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-9 em{border-right-color:#B9C8D3}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-11 em,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-12 em,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-1 em{border-bottom-color:#B9C8D3}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-2 em,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-3 em{border-left-color:#B9C8D3}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-5 em,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-6 em,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-7 em{border-top-color:#B9C8D3}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-10 span,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-9 span{border-right-color:#F8FCFF}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-11 span,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-12 span,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-1 span{border-bottom-color:#F8FCFF}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-2 span,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-3 span{border-left-color:#F8FCFF}.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-5 span,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-6 span,.arale-tip-1_2_2 .ui-poptip-blue .ui-poptip-arrow-7 span{border-top-color:#F8FCFF}.arale-tip-1_2_2 .ui-poptip-white{color:#333}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-shadow{background-color:rgba(0,0,0,.05);FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#0c000000, endColorstr=#0c000000)}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-container{background-color:#fff;border:1px solid #b1b1b1}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-10 em,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-9 em{border-right-color:#b1b1b1}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-11 em,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-12 em,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-1 em{border-bottom-color:#b1b1b1}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-2 em,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-3 em{border-left-color:#b1b1b1}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-5 em,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-6 em,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-7 em{border-top-color:#b1b1b1}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-10 span,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-9 span{border-right-color:#fff}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-11 span,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-12 span,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-1 span{border-bottom-color:#fff}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-2 span,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-3 span{border-left-color:#fff}.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-5 span,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-6 span,.arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-7 span{border-top-color:#fff}.arale-tip-1_2_2 .ui-poptip{top:0;left:0}.ibox{position:absolute;display:none;background-color:rgba(0,0,0,.5);border:0;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#88000000, endColorstr=#88000000);padding:6px}:root .ibox{FILTER:none\9}.ibox-close{color:#999;cursor:pointer;display:block;font-family:tahoma;font-size:24px;font-weight:700;height:18px;line-height:14px;position:absolute;right:16px;text-decoration:none;top:16px;z-index:10}.ibox-close:hover{color:#666;text-shadow:0 0 2px #aaa}.ibox-title{height:45px;font-size:16px;font-family:\5FAE\8F6F\96C5\9ED1,\9ED1\4F53,\5B8B\4F53;font-weight:700;line-height:46px;border-bottom:1px solid #E1E1E1;color:#4d4d4d;text-indent:20px;background:-webkit-gradient(linear,left top,left bottom,from(#fcfcfc),to(#f9f9f9));background:-moz-linear-gradient(top,#fcfcfc,#f9f9f9);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#fcfcfc", endColorstr="#f9f9f9");background:-o-linear-gradient(top,#fcfcfc,#f9f9f9);background:linear-gradient(top,#fcfcfc,#f9f9f9)}.quick-empty-parent{position:relative;zoom:1}.quick-empty{display:none;cursor:pointer;position:absolute;top:30px;right:12px;font-size:24px}.quick-empty:hover{color:#666;text-shadow:0 0 2px #aaa}.email-suggest-out{border:1px solid #ccc;background:#fff;font:12px/20px Tahoma}.email-suggest-list{padding:2px 10px;cursor:pointer;color:#4D4D4D;z-index:1;position:relative;font-size:14px}.email-suggest-focus{background:#f0f3f9}.email-suggest-mark{color:#f60}</style><style></style>
 <link charset="utf-8" crossorigin="anonymous" rel="stylesheet" href="css/2ACTshL8Vh.css"></head>
<body style="min-width: 990px;">

<div class="topbar">
    <div class="topbar-wrap fn-clear">
        <a class="topbar-link-last" target="_blank" seed="goToHelp">常见问题</a>
        		<span class="topbar-link-first">你好，欢迎使用支付宝付款！</span>
		    </div>
</div>

<div id="header">
    <div class="header-container fn-clear">
        <div class="header-title">
            <div class="alipay-logo"></div>
            <span class="logo-title">我的收银台</span>
        </div>
    </div>
</div>
<%
	request.setCharacterEncoding("utf-8");
    String BillNo = StaticItem.GetRechitem();//订单编号
    String Amount = formatString(request.getParameter("p3_Amt"));  //支付金额
	System.out.println("amt:"+Amount);
	String pa_MP = formatString(request.getParameter("pa_MP")); //用户
		System.out.println("pa_MP:"+pa_MP);
	String AdviceURL ="http://dingSheng.dingSheng17.com:8080/pay/newzhifu/notifyzfb.jsp";   //[必填]异步通知地址
	double money = TryStatic.StrToInt(Amount);
	JSONObject retJson = null;
	if (money>=50&&null!=pa_MP){
	    Bc_user find = UserStatic.find(pa_MP);
	    if (null!=find){
	     int uid = find.getUser_id();
	    	MyRechangeService dao = new MyRechangeService();
	    	dao.Rech(find.getUser_name(), uid, BillNo, money, 0, 5, pa_MP);
			String url = "https://app.chinaxzf.com:8670/index.unifypay?version=2&action=MemberTransaction";
	        String charset = "utf-8";  
            HttpClientUtil httpClientUtil = new HttpClientUtil();  
	  	      String httpOrgCreateTest = url + "";
			String Secret = "5A4E83405A57948D7F3E0DD57D22A5B6"; //密钥
			String PartnerCode="PT1133"; //机构号
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("orderNo", BillNo);//订单号        
			jsonObject.put("notifyUrl", AdviceURL); //异步通知地址
			jsonObject.put("bizcode", "2003"); //微信扫码
			jsonObject.put("memberNo", "834755073990171"); //商户号        
			jsonObject.put("transAmt",Integer.parseInt(Amount)*100);//金额
			//jsonObject.put("transAmt","100");//金额 先写死一分
			byte[] result = base64.encode((jsonObject.toString()).getBytes());
			String encryptData= new String(result);
			String signData = md5.md5(jsonObject.toString() + Secret);
			String PostEntity = "partnerCode=PT1133" + "&" + "encryptData" + "=" + encryptData + "&" +"signData" + "=" + signData ;
			String httpOrgCreateTestRtn = httpClientUtil.doPost(httpOrgCreateTest,PostEntity,charset);  
			System.out.println("result:"+httpOrgCreateTestRtn);
			System.out.println("Response Parameter Json data !");
			int a1 = httpOrgCreateTestRtn.indexOf("&encryptData=");
			int a2 = httpOrgCreateTestRtn.indexOf("&signData=");
			String resEncryptData = httpOrgCreateTestRtn.substring(a1+13 , a2);
			String ResSignData1 = httpOrgCreateTestRtn.substring(a2+10);
			        System.out.println(new String(base64.decode(new String(resEncryptData)),"UTF-8"));
			 String ResDataCheck = new String(base64.decode(new String(resEncryptData)),"UTF-8") + Secret ; 
            String retStr = new String(base64.decode(new String(resEncryptData)),"UTF-8");
			String codeUrl="";
			if(md5.md5(ResDataCheck).toUpperCase().equals(ResSignData1))
			{
				System.out.println("\r\n" + "Data checking Success !");
				retJson = JSONObject.fromObject(retStr);
				String respCode = retJson.getString("respCode");
				if("MCA00000".equals(respCode)){//说明是下单成功
					codeUrl = retJson.getString("codeUrl");
					retJson.put("orderNo", BillNo);
               %>
			<div id="container">



<style>

.ui-securitycore .ui-label, .mi-label {
    text-align: left;
    height: auto;
    line-height: 18px;
    padding: 0;
    display: block;
    padding-bottom: 8px;
    margin: 0;
    width: auto;
    float: none;
    font:14px/1.5 tahoma,arial,\5b8b\4f53;
}

.ui-securitycore .ui-form-item {
    position: relative;
    padding: 0 0 10px 0;
    width: 350px;

}

.ui-securitycore .ui-form-explain {
    height: 18px;
    /*display: block;*/
    font-family:tahoma,arial,\5b8b\4f53;
}

.ui-securitycore .edit-link {
    position: absolute;
    top: -3px;
    right: 0;
}

.ui-securitycore .ui-input {
    height: 28px;
    font-size: 14px;
}

.ui-securitycore .standardPwdContainer .ui-input {
    width: 340px;
}

.ui-securitycore .mobile-section.checkcode-section {
    margin-top: 10px;
}

/*安全服务化必将覆盖的样式*/
.mobile-form .ui-securitycore .ui-form-item-mobile {
    display: none;
}

.mobile-form .ui-securitycore .ui-form-item-mobile .ui-label {

}

.mobile-form .ui-securitycore .ui-form-item-mobile .ui-form-text {
    display: none;
}

.mobile-form .ui-securitycore .ui-form-item-counter {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
    position: relative;
    height: 87px;
}

.mobile-form .ui-securitycore .ui-form-item-counter .ui-label {
    display: block;
    float: none;
    margin-left: 0;
    text-align: left;
    line-height: 18px !important;
    padding: 0 0 8px 0;
}
.mobile-form .ui-securitycore .ui-form-item-counter .ui-form-field {
    /*display: block;*/
    zoom: 1;
}
.mobile-form .ui-securitycore .ui-form-item-counter .ui-form-field:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
.mobile-form .ui-securitycore .ui-form-item-counter .ui-checkcode-input {
    height: 24px;
    line-height: 24px;
    width: 148px;
    border: 1px solid #ccc;
    padding: 7px 10px;
    float: left;
    display: block;
    font-size: 14px;
}
.mobile-form .ui-securitycore .ui-form-item-counter .ui-checkcode-input:focus {
    color: #4d4d4d;
    border-color: #07f;
    outline: 1px solid #8cddff;
}
.mobile-form .ui-securitycore .ui-form-item-counter .eSend-btn {
    float: left;
    color: #08c;
}

#mobileSend {
    position: absolute;
    right: 0;
    top: 26px;
}
.mobile-form .ui-securitycore .ui-form-item-counter .ui-checkcode-messagecode-btn {
    float: left;
    width: 178px;
    height: 40px;
    _height: 38px;
    line-height: 38px;
    _line-height: 35px;
    color: #676d70;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 1px;
    background: #f3f3f3;
    margin-left: 2px;
    padding-left: 0;
    padding-right: 0;

}
.mobile-form .ui-securitycore .ui-form-item-counter .ui-checkcode-messagecode-disabled-btn {
    background: #cacccd;
    border: 1px solid #cacccd;
    color: #aeb1b3;
    font-weight: normal;
    cursor: default;
}

.mobile-form .ui-securitycore .ui-form-item-counter .reSend-btn {
    float: left;
    margin-top: 10px;
    color: #08c;
}

.ui-checkcode-messagecode-disabled-btn {

}
.mobile-form .ui-securitycore .ui-form-item-counter .ui-form-field {
    display: block;
}
.mobile-form .ui-securitycore .ui-form-item-counter .ui-form-field .fn-hide,
.mobile-form .ui-securitycore .ui-form-item-counter .fn-hide .reSend-btn {
    display: none;
}

/*安全服务化必将覆盖的样式*/


.alieditContainer object {
    width: 348px;
    height:38px;
}

#container .alieditContainer {
    width: 348px;
    height: 38px;
}

#container .alieditContainer a.aliedit-install {
    line-height: 38px;
}

/* 安全服务化去控件升级 特木 temu.psc@alipay.com */
#container .alieditContainer .ui-input {
    width:324px;
    padding:7px 10px;
    font-size:14px;
    height: 20px;
    line-height: 24px;
}

#container .alieditContainer .ui-input:focus {
    color:#4D4D4D;
    border-color:#07F;
    outline:1px solid #8CDDFF;
    *padding:7px 3px 4px;
    *border:2px solid #07F;
}


.teBox {
    height: auto;
}

#J_loginPwdMemberT {
    padding: 20px 0 60px 0;
}

#J_loginPwdMemberT #teLogin {
    height: auto;
}

#J_loginPwdMemberT .mi-form-item{
    padding: 0 0 10px 0;
}

#J_loginPwdMemberT .teBox-in {
    padding: 0;
    width: 350px;
    margin: 0 auto;
}

.t-contract-container {
    width: 76%;
}

.contract-container {
    width: 450px;
    margin: 0 auto;
    text-align: left;
    position: relative;
}
.contract-container .contract-container-label {
    width: 450px;
}

.mb-text {
    font-size: 14px;
    padding-top: 10px;
}

.ml5 {
    margin-left: 5px;
}

.user-login-account {
    font-size: 16px;
}

.mi-mobile-button {
    font-weight: bold;
}

.alipay-agreement-link {
    margin-left: 5px;
    color: #999;
}

.alipay-agreement {
    width: 600px;
    height: 270px;
    padding: 10px;
    text-align: center;
}

.alipay-agreement-content {
    height: 230px;
    width: 600px;
    margin-bottom: 5px;
}

#container .order-timeout-notice {
    margin-top: 30px;
    display: none;
}

.login-panel .fn-mb8{
    margin-bottom: 8px;
}

.login-panel .fn-mt8{
    margin-top: 8px;
}

/* 新版扫码页面样式 */


.order-area {
    position: relative;
    z-index: 10;
}

.cashier-center-container {
    overflow: hidden;
    position: relative;
    z-index: 1;
    width: 950px;
    min-height: 460px;
    background-color: #fff;

    border-bottom: 3px solid #b3b3b3;
}

.cashiser-switch-wrapper {
    width: 1800px;
}

.cashier-center-view {
    position: relative;
    width: 803px;
}

.cashier-center-view.view-pc {
    display: block;
}

.cashier-center-view.view-pc .loginBox {
    padding: 60px 0 20px 238px;
    width: 350px;
    margin: 0;
}

.loginBox .login-title-area {
    margin: 0;
    margin-bottom: 30px;
}

.login-title .rt-text {
    font-size: 14px;
}

.teForm {
    padding: 0;
}

.mi-form-item {
    padding: 0 0 12px 0;
}

.submitContainer {
    margin-top: 6px;
}

/* 切换按钮 */
.view-switch {
    width: 146px;
    height: 400px;
    padding-top: 126px;
    background-color: #e6e6e6;
    cursor: pointer;

    /* 禁止选中 */
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    user-select: none;
}

.view-switch.qrcode-show {
    border-left: 1px solid #d9d9d9;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.view-switch.qrcode-hide {
    border-right: 1px solid #d9d9d9;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.switch-tip {
    text-align: center;
}

.switch-tip-font {
    font-size: 16px;
    font-family: tahoma, arial, '\5FAE\8F6F\96C5\9ED1', '\5B8B\4F53';
}

.switch-tip-icon {
    position: relative;
    z-index: 10;
    display: block;
    margin-top: 4px;
    font-size: 78px;
    color: #a6a6a6;
    cursor: pointer;
}

.switch-tip-btn {
    display: block;
    width: 106px;
    height: 36px;
    margin: 6px auto 0;
    border: 1px solid #0fa4db;
    background-color: #00aeef;
    border-radius: 5px;

    font-size: 12px;
    font-weight: 400;
    line-height: 36px;
    text-align: center;
    color: #fff;
    text-decoration: none;
}

.switch-tip-btn:hover {
    color: #fff;
    text-decoration: none;
}

.view-switch.qrcode-hide .view-switch-content {
    height: 334px;
    padding-top: 126px;
}

.switch-pc-tip .switch-tip-icon {
    position: relative;
    z-index: 10;
    margin-top: 4px;
    font-size: 78px;
}

.switch-tip-icon-wrapper {
    position: relative;
}

.switch-tip-icon-wrapper:before {
    content: '';
    position: absolute;
    left: 47px;
    top: 24px;
    z-index: 0;
    width: 50px;
    height: 70px;
    background-color: #fff;
}

.switch-qrcode-tip .switch-tip-icon-wrapper:before {
    left: 38px;
    top: 25px;
    width: 70px;
    height: 47px;
}

.switch-tip-icon-img {
    position: absolute;
    left: 58px;
    top: 35px;
    z-index: 11;
}

.switch-qrcode-tip .switch-tip-icon-img {
    left: 48px;
    top: 39px;
}

.standardPwdContainer object {
    width: 348px;
    height:38px;
}

#container .standardPwdContainer {
    width: 348px;
    height: 38px;
}

#container .standardPwdContainer a.aliedit-install {
    line-height: 38px;
}

#container .standardPwdContainer .ui-input {
    width:324px;
    padding:7px 10px;
    font-size:14px;
    height: 20px;
    line-height: 24px;
}

#container .standardPwdContainer .ui-input:focus {
    color:#4D4D4D;
    border-color:#07F;
    outline:1px solid #8CDDFF;
    *padding:7px 3px 4px;
    *border:2px solid #07F;
}</style>





<!-- CMS:全站公共 cms/tracker/um.vm开始:tracker/um.vm -->



<style type="text/css">
.umidWrapper{display:block; height:1px;}
</style>
<span style="display:inline;width:1px;height:1px;overflow:hidden">






</span>
<!-- CMS:全站公共 cms/tracker/um.vm结束:tracker/um.vm -->

<!-- 页面主体 -->
<div id="content" class="fn-clear">
        
<div id="J_order" class="order-area" data-module="excashier/login/2015.08.01/orderDetail">


        
        
                
        <div id="order" data-role="order" class="order order-bow">
                        <div class="orderDetail-base" data-role="J_orderDetailBase">
                <div class="order-extand-explain fn-clear">
            <span class="fn-left explain-trigger-area order-type-navigator" style="cursor: auto" data-role="J_orderTypeQuestion">

            <span>正在使用即时到账交易</span>
    
    <span data-role="J_questionIcon" seed="order-type-detail" style="cursor: pointer;color: #08c;">[?]</span>
            </span>
                                    </div>
                <div class="commodity-message-row">
            <span class="first long-content">
                C0208103915101
            </span>
                                            <span class="second short-content">
                                                                    收款方：鼎盛公司
                            </span>
                                    </div>
                                                <span class="payAmount-area" id="J_basePriceArea">
                                                     <strong class=" amount-font-22 "><%=money%></strong> 元
                
        </span>
            </div>
            
<div class="ui-tip ui-question-tip fn-hide" seed="question-tip" data-role="J_orderTypeTip">
    <div class="ui-dialog-container">
        <div class="ui-dialog-head-text">
            <span>付款后资金直接进入对方账户</span>
        </div>

        <ul class="ui-dialog-content">
            <li>
                若发生退款需联系收款方协商，如付款给陌生人，请谨慎操作。
            </li>
        </ul>
    </div>
    <div class="ui-icon-dialog-arrow">
        ↓
    </div>
</div>


<div class="ui-tip ui-question-tip fn-hide" data-role="J_exchangeTip">
    <div class="ui-dialog-container" style="width: 280px;">
        <ul class="ui-dialog-content">
            <li>
                1、支付宝不收取任何货币兑换手续费。
            </li>
            <li>
                2、最终支付金额为人民币金额，非外币金额。
            </li>
			        </ul>
    </div>
    <div class="ui-icon-dialog-arrow">
        ↓
    </div>
</div>

            
            <a id="J_OrderExtTrigger" class="order-ext-trigger" seed="order-detail-more" data-role="J_oderDetailMore">
                订单详情
            </a>
            

                <div class="ui-detail fn-hide" data-role="J_orderDetailCnt" id="J-orderDetail" style="display: none;">
                    <div class="ajax-Account od-more-cnt fn-clear">
                        <div class="first  long-content"> C0208103915101</div>
                        <ul class="order-detail-container">
                            <li class="order-item">
                                                                                                             <table>
    <tbody>
                <tr>
            <th class="sub-th">收款方：</th>
            <td>
                                    鼎盛公司
                                            </td>
        </tr>
                        <tr>
            <th class="sub-th">订单号：</th>
            <td> <%=money%></td>
        </tr>
                        <tr>
            <th class="sub-th">商品名称：</th>
            <td>
                                    <a target="_blank" seed="orderItem- C0208103915101" smartracker="on"><%=BillNo%></a>
                            </td>
        </tr>
                     
                        <tr>
            <th class="sub-th">交易金额：</th>
            <td><%=money%></td>
        </tr>
                            </tbody>
</table>

                                                                    
                            </li>
                        </ul>
                    </div>
        <span class="payAmount-area payAmount-area-expand">
                <strong class=" amount-font-22 "><%=money%></strong> 元
        </span>
                    <iframe src="javascript:''" class="ui-detail-iframe-fix" data-role="J_orderDetailFrameFix"></iframe>
                </div>

            <a id="J_OrderExtTrigger" class="order-ext-trigger fn-hide" style="display: none;">
                订单详情
            </a>
		        </div>
        
        
        
        
        
        
        

</div>




    <!-- 操作区 -->
    <div class="cashier-center-container">
        
        <div data-module="excashier/login/2016.08.01/loginPwdMemberT" id="J_loginPwdMemberTModule" class="cashiser-switch-wrapper fn-clear">

            <!-- 扫码支付页面 -->
            <div class="cashier-center-view view-qrcode fn-left" id="J_view_qr">
                                
<style type="text/css">
.qrcode-area {
    margin: 0 auto;
    position: relative;
}

/* 扫码头部信息 */
.qrcode-integration .qrcode-header {
    display: block;
    width: auto;
    margin: 0;
    padding: 0;
    margin-top: 75px;
    margin-bottom: 16px;
}

.qrcode-header-money {
    font-size: 26px;
    font-weight: 700;
    color: #f60;
}

.qrcode-integration .qrcode-img-area {
    width: 168px;
    height: 168px;
    text-align: center;
}

.qrcode-img-area.qrcode-img-crash {
    height: 220px;
}

.qrcode-reward-wrapper {
    text-align: center;
}

.qrcode-reward {
    display: inline-block;
    margin: 0;
    padding: 2px 5px;
    background-color: #0188cd;
    border-radius: 0;

    font-size: 12px;
    line-height: 16px;
    color: #fff;
}

.qrcode-reward-question {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 0;
}

.qrcode-integration .qrcode-loading {
    top: 70px;
    left: 60px;
}

.qrcode-integration .qrcode-img {
    top: 70px;
    left: 70px;
}

.qrcode-integration .qrcode-img-wrapper {
    position: relative;
    width: 168px;
    height: auto;
    min-height: 168px;
    margin: 0 auto;
    padding: 6px;

    border: 1px solid #d3d3d3;
    -webkit-box-shadow: 1px 1px 1px #ccc;
    box-shadow: 1px 1px 1px #ccc;
}

.qrcode-img-area .qrcode-busy-icon {
    padding-top: 15px;
}

.qrcode-img-area .qrcode-busy-text {
    margin-top: 20px;
}

a.mi-button-lwhite .mi-button-text {
    padding: 8px 39px 4px 36px;
}

.qrcode-img-area .mi-button {
    margin-top: 40px;
}

/* 扫码图片下方提示 */
.qrcode-img-explain {
    padding: 10px 0 6px;
}

.qrcode-img-explain img {
    margin-left: 20px;
    margin-top: 5px;
}

.qrcode-img-explain div {
    margin-left: 10px;
}




.qrcode-foot {
    text-align: center;
}

.qrcode-downloadApp,
.qrcode-downloadApp:hover,
.qrcode-downloadApp:active,
.qrcode-explain a.qrcode-downloadApp:hover {
    font-size: 12px;
    color: #a6a6a6;
    text-decoration: underline;
}

.area-split {
    margin-top: 156px;
    width: 10px;
    height: 300px;

    background-image: url(https://t.alipayobjects.com/images/T1PspfXixsXXXXXXXX.png);
    background-repeat: no-repeat;
}

.qrguide-area {
    position: absolute;
    top: 62px;
    left: 505px;
    width: 204px;
    height: 183px;
    cursor: pointer;
}

.qrguide-area .qrguide-area-img {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
}

.qrguide-area .qrguide-area-img.active {
     z-index: 10;
}

.qrguide-area .qrguide-area-img.background {
     z-index: 9;
}

.qrcode-notice .qrcode-notice-title {
    padding: 10px 10px 11px 63px;
}</style>
<!-- 扫码区域 -->


<div data-role="qrPayArea" class="qrcode-integration qrcode-area" id="J_qrPayArea">
        <div class="qrcode-header">
        <div class="ft-center">扫一扫付款（元）</div>
        <div class="ft-center qrcode-header-money"><%=money%></div>
    </div>

	    	
        

        <div class="qrcode-img-wrapper" data-role="qrPayImgWrapper" style="width: 188px; height: 260px;">
        <div data-role="qrPayImg" class="qrcode-img-area" style="width: 188px;  height: 188px;">
            <div class="ui-loading qrcode-loading" data-role="qrPayImgLoading" style="display: none;">加载中</div>
        <div style="position: relative;display: inline-block;" id="img-ewm">
       </div></div>

        <div class="qrcode-img-explain fn-clear">
            <img class="fn-left" src="images/T1bdtfXfdiXXXXXXXX.png" alt="扫一扫标识" seed="qrcodeImgExplain-tImagesT1bdtfXfdiXXXXXXXX" smartracker="on">
            <div class="fn-left">打开手机支付宝<br>扫一扫继续付款</div>
        </div>
    </div>

        <div class="qrcode-foot" data-role="qrPayFoot" style="display: block;">
        <div data-role="qrPayExplain" class="qrcode-explain fn-hide" style="display: block;">
            <a class="qrcode-downloadApp" data-boxurl="https://cmspromo.alipay.com/down/new.htm" data-role="dl-app" target="_blank" seed="NewQr_qr-pay-download">首次使用请下载手机支付宝</a>
        </div>

        
    </div>

    <!-- 优惠 TIP -->
    

</div>

<style>
    .ad-wrap {
        width: 260px;
    }

    .ad-title {
        background-color: #f5f5f5;
        padding: 10px;
        line-height: 12px;
        font-size: 12px;
        color: #1a1a1a;
        font-family: Heiti SC;
        text-align: left;
        font-weight: 700;
    }

    .ad-cnt {
        padding: 10px;
        font-size:12px;
        color:#1a1a1a;
        font-family:Heiti SC;
    }

    .arale-tip-1_2_2 .ui-poptip-white .ui-poptip-container {
        padding: 0;
    }

    .arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-2 span,
    .arale-tip-1_2_2 .ui-poptip-white .ui-poptip-arrow-3 span {
        border-left-color: #f5f5f5;
    }
</style>

<!-- 指引区域 -->
<div class="qrguide-area" id="J_qrguideArea" seed="NewQr_animationClick">
    <img src="images/T13CpgXf8mXXXXXXXX.png" class="qrguide-area-img background" seed="J_qrguideArea-qrguideAreaImg" smartracker="on">
    <img src="images/T1ASFgXdtnXXXXXXXX.png" class="qrguide-area-img active" seed="J_qrguideArea-qrguideAreaImgT1" smartracker="on" style="display: block;">
</div>
	 
            </div>

                        
<!-- 点击切换区域 -->



        </div>
    </div>
    <!-- 操作区 结束 -->

</div>
<!-- 页面主体 结束 -->

 
    
  
  


<!-- CMS:全站公共 cms/安全cms/外部收银台信息采集结束:security/sensorSdk.vm -->

<!--防止钓鱼确认-->








<!--[if lt IE 10]>
<script src="https://as.alipayobjects.com/component/??console-polyfill/0.2.2/index.js,es5-shim/4.1.14/es5-shim.js,es5-shim/4.1.14/es5-sham.js,html5shiv/3.7.2/html5shiv.js"></script>
<![endif]-->

<!-- FD:174:alipay/foot/cliveService.vm:START --><!-- FD:174:alipay/foot/cliveService.vm:1261:cliveService.schema:在线客服配置:START -->
    
  
<!-- FD:174:alipay/foot/cliveService.vm:1261:cliveService.schema:在线客服配置:END -->

<!-- FD:174:alipay/foot/cliveService.vm:END --> 


<div id="footer">
    <!-- CMS:全站公共 cms/foot/copyright.vm开始:foot/copyright.vm --><style>
.copyright,.copyright a,.copyright a:hover{color:#808080;}
</style>
<div class="copyright">
      支付宝版权所有 2004-2016 <a target="_blank" seed="copyright-link" smartracker="on">ICP证：沪B2-20150087</a>
  </div>
<div class="server" id="ServerNum">
  excashier-30-11 &nbsp; 0a3727c714791231717464941166468_0
</div><!-- CMS:全站公共 cms/foot/copyright.vm结束:foot/copyright.vm --></div>
</div><!-- /container -->
<div id="partner"><img alt="合作机构" src="images/2R3cKfrKqS.png" seed="partner-iE2013032R3cKfrKqS" smartracker="on"></div>
<script type="text/javascript">
        	var qrcode = '<%=codeUrl%>';
			$(document).ready(function(){
			    if(qrcode==''){
			    	alert("二维码生成失败");
			    	return;
			    }
			    $('#img-ewm').qrcode({width:188,height:188,correctLevel:0,text:qrcode,render:"canvas"});
			});
			
			function convertCanvasToImage(canvas) {
				var image = new Image();
				image.src = canvas.toDataURL("image/png");
				return image;
			}
var timer1 = null;
		/*检查订单状态是否支付成功*/
function changeOrder(orderNo){

		$.ajax({
		    url: '/pay/newzhifu/orderStatus.jsp?number='
				+ Math.random(),    //请求的url地址
		    dataType: "json",   //返回格式为json
		    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
		    data: { "orderNo": orderNo },    //参数值
		    type: "POST",   //请求方式
		    success: function(data) {
		    	 var respCode =  data.respCode;
			 if(respCode=="1"){
				var status = data.status;
				if(status=="1"){
				  window.location.href="/my/Rechange.jzh";
				}
			 }
		    },
		    error: function() {
		    }
		});
}
		$(function(){
		  timer1 = setInterval("changeOrder('<%=BillNo%>')",5000);
		})
		</script>

				<%}
			}
			else
			{
				System.out.println("Data checking Fail !");
        		out.print("下单验证签名失败");
			}
	  		
	    }else{
        		out.print("用户不存在");
	    }
	}%><%else{
		out.print("用户名或者金额（最小50）错误");

	}
%>

 	
</body>
</html>