<%@ page language="java" pageEncoding="UTF-8"%><%@ page import="com.caipiao.pay.huichao.MD5" %>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.utils.StaticItem"%>
<%@page import="com.caipiao.utils.TimeUtil"%>
<%@ page import="com.pay.*"%>
<%@ page import="java.util.*"%>
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
    
    <meta http-equiv="pragma" content="no-cache"> 
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate"> 
	<meta http-equiv="expires" content="0">
    <title>微信收银台</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- browser processor,it can be aimed at a particular browser to do something stuff. -->
    <meta name="keywords" content="">
    <meta name="description" content="">
       <script src="js/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
     <script src="js/jquery/jquery.qrcode.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/card.css">
    <link rel="stylesheet" href="css/ball-clip-rotate.css">
    <link rel="stylesheet" href="css/mbaccpay.css">
</head>
<body>

<div class="g-head f-shadow">
    <div class="g-hd-c f-hc">
        <span class="m-logo"></span><span class="m-title">微信收银台</span>
        <span class="m-top-nav"><a target="_blank">常见问题</a><s>|</s> </span>
    </div>
</div>
<%
	request.setCharacterEncoding("utf-8");
    String BillNo = StaticItem.GetRechitem();//订单编号
    String Amount = formatString(request.getParameter("p3_Amt"));  //支付金额
	System.out.println("amt:"+Amount);
	String pa_MP = formatString(request.getParameter("pa_MP")); //用户
		System.out.println("pa_MP:"+pa_MP);
	String AdviceURL ="http://520babe.com/pay/newzhifu/notifywx.jsp";   //[必填]异步通知地址
	double money = TryStatic.StrToInt(Amount);
	JSONObject retJson = null;
	if (money>=50&&null!=pa_MP){
	    Bc_user find = UserStatic.find(pa_MP);
	    if (null!=find){
	     int uid = find.getUser_id();
	    	MyRechangeService dao = new MyRechangeService();
	    	dao.Rech(find.getUser_name(), uid, BillNo, money, 0, 5, pa_MP);
	        String charset = "utf-8";  
            HttpClientUtil httpClientUtil = new HttpClientUtil(); 
			String key ="21sWvG3AzTXM"; //商户秘钥
			String postUrl = "http://838pay.com/payment/ScanPayApply.do"; //平台post地址
			String versionId = "1.0";//版本号 
			String orderAmount = Integer.parseInt(Amount)*100+"";//交易金额,分 （M）
			//jsonObject.put("transAmt",Integer.parseInt(Amount)*100);//金额
			//jsonObject.put("transAmt","100");//金额 先写死一分
			String orderDate = Signature.formateDateToString(new Date(), "yyyyMMddHHmmss");//订单日期（M）
			String currency = "RMB";//货币类型：RMB（M）
			String transType = "0008";//默认填写：0008（M）
			//String AdviceURL ="http://www.520babe.com/pay/newzhifu/notifywx.jsp";   //[必填]异步通知地址
			String asynNotifyUrl = "http://www.520babe.com/pay/newzhifu/notifywx.jsp";//支付异步返回地址
			String synNotifyUrl = "http://www.520babe.com/pay/newzhifu/notifywx.jsp";//支付同步返回地址
			String signType = "MD5";//默认填写：0008（M）
			String merId =  "00000000518765";//商户ID
			String prdOrdNo =  BillNo;//  商品订单号（M） 
			String payMode =  "00022";//支付方式， 00022-微信扫码(固定值)（M）
			String receivableType = "D00";//到账类型（M）
			String prdName = "在线充值";//商品名称（M）
			String prdDesc =  "在线充值";//商品描述（M）
			SortedMap<String,String> nvps = new TreeMap<String, String>();
			nvps.put("versionId", versionId);
			nvps.put("transType", transType);
			nvps.put("payMode", payMode);
			nvps.put("orderAmount", orderAmount);
			nvps.put("orderDate", orderDate);
			nvps.put("currency", currency);
			nvps.put("asynNotifyUrl", asynNotifyUrl);
			nvps.put("synNotifyUrl", synNotifyUrl);
			nvps.put("signType", signType);
			nvps.put("merId", merId);
			nvps.put("prdOrdNo", prdOrdNo);
			nvps.put("receivableType", receivableType);
			nvps.put("prdName", prdName);
			nvps.put("prdDesc", prdDesc);
			String sign = Signature.createSign(nvps,key);
			nvps.put("signData", sign);
			String retStr = httpClientUtil.post(postUrl, nvps);
			String codeUrl="";
			retJson = JSONObject.fromObject(retStr);
			String retCode = retJson.getString("retCode");
			if("1".equals(retCode)){//说明是下单成功
				if("1".equals(retCode)){//说明是下单成功
					codeUrl = retJson.getString("qrcode");
					retJson.put("orderNo", BillNo);
               %>
			   <div class="g-body">
    <div class="g-main f-hc">
        
<div class="m-order-info">
    <ul>
        <li><label>充值编号：</label><%=BillNo%></li>
        <li><label>收款方：</label>鼎盛公司</li>
         
    </ul>
    <span><strong class="f-c-orange"><%=money%></strong> 元</span>
</div> 
<div class="m-pay-way" id="otherPayTypeDiv">
                <div class="m-pay-wrap m-pay-wrap-fix sel">
    <div class="m-pay-t wechatpay">
        
        <input name="payMethod" value="weChatPay" checked="" type="radio">
        <span class="m-pay-name">微信扫码支付</span>
        <span class="m-pay-info">扫一扫二维码即可完成支付</span>
    </div>

    <div class="m-pay-mn" style="display: block;">
         
        <div class="m-box" id="wechatPayWrap">
            <div id="qrCode"></div>
            <div class="m-bl">
                <div class="m-wechat-pay f-shadow-02" id="img-ewm"></div>
                <p class="u-wechat-p" id="wechatBtn">微信扫码支付</p>
                
            </div>
            <div class="m-br" style="float: right;">
                <div class="m-wechat-pay-desc"></div>
            </div>
        </div>
    </div>

</div>    
        
                
        </div>
 

    </div>
</div>
<div class="g-foot">
    <div class="g-ft-c f-hc">
        <div class="copyright">
            <p>©版权所有 2015-2016</p>
        </div>
    </div>
</div>
<script type="text/javascript">
        	var qrcode = '<%=codeUrl%>';
			$(document).ready(function(){
			    if(qrcode==''){
			    	alert("二维码生成失败");
			    	return;
			    }
			    $('#img-ewm').qrcode({width:165,height:165,correctLevel:0,text:qrcode,render:"canvas"});
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