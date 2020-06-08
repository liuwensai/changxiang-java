<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.caipiao.service.my.MyRechangeService"%>
<%@page import="com.caipiao.entity.Bc_rech"%>
<%@page import="com.caipiao.utils.TryStatic"%>
<%@page import="com.caipiao.entity.Bc_user"%>
<%@page import="com.caipiao.service.systeminit.UserStatic"%>
<%@page import="com.caipiao.utils.SystemSet"%>
<%@page import="com.sysbcjzh.utils.StringUtils"%>

<% 
 //字符编码
    String characterEncoding = "UTF-8";
	request.setCharacterEncoding(characterEncoding);
	//String s = "<Ips><GateWayRsp><head><ReferenceID></ReferenceID><RspCode>000000</RspCode><RspMsg><![CDATA[交易成功！]]></RspMsg><ReqDate>20160728190208</ReqDate><RspDate>20160728190503</RspDate><Signature>e7f8470d93f2d1ed0f9d2826c17073e7</Signature></head><body><MerBillNo>C0728190221003</MerBillNo><CurrencyType>156</CurrencyType><Amount>0.02</Amount><Date>20160728</Date><Status>Y</Status><Msg><![CDATA[支付成功！]]></Msg><Attach><![CDATA[test88]]></Attach><IpsBillNo>BO2016072819020819362</IpsBillNo><IpsTradeNo>20160728070708290</IpsTradeNo><RetEncodeType>17</RetEncodeType><BankBillNo>710016774688</BankBillNo><ResultType>0</ResultType><IpsBillTime>20160728190312</IpsBillTime></body></GateWayRsp></Ips>";
    String resultXml = request.getParameter("paymentResult");
    //System.out.println(resultXml);
    String md5Key = SystemSet.paytype.getProperty("ips_md5Key");
    String merNo = SystemSet.paytype.getProperty("ips_merchCode");
    
    String resultMessage = "";
    
    if (resultXml == null || "".equals(resultXml))
    {
    	resultMessage = "交易失败, 非法请求!";
    } else
    {
    	String body = null;
        String signature = null;
        String rspCode = null;
        String message = null;
        String orderId = null;
        String amount = null;
        try
        {
        	signature = resultXml.substring(resultXml.indexOf("<Signature>") + 11, resultXml.indexOf("</Signature>"));
        	message = resultXml.substring(resultXml.indexOf("<RspMsg><![CDATA[") + 17, resultXml.indexOf("]]></RspMsg>"));
        	rspCode = resultXml.substring(resultXml.indexOf("<RspCode>") + 9, resultXml.indexOf("</RspCode>"));
        	body = resultXml.substring(resultXml.indexOf("<body>") , resultXml.indexOf("</body>") + 7);
        	orderId = resultXml.substring(resultXml.indexOf("<MerBillNo>") + 11, resultXml.indexOf("</MerBillNo>"));
        	amount = resultXml.substring(resultXml.indexOf("<Amount>") + 8, resultXml.indexOf("</Amount>"));
        	
        	String signSrc = body + merNo + md5Key;
         	String src = StringUtils.md5String(signSrc);
         	if (src.equals(signature))
         	{
         		if ("000000".equals(rspCode))
         		{
         			MyRechangeService dao =new MyRechangeService();
         			Bc_rech en= dao.find(orderId);
         			double rechmoney = TryStatic.StrToDouble(amount);
         			if( null != en )
         			{
         				int sta = en.getRech_status();
         				double money = en.getRech_money();
         				if(0 == sta && rechmoney == money)
         				{
         					double newgive = 0;
         					double xf = 1;
         					
         					int tk=0;
         					try{
         						tk = dao.findUserDrawCount(en.getUser_id());
         					}finally{}
         					
         					if (tk == 0)
         					{
         						newgive = money * 0.1;
         						newgive = newgive>= 6000 ? 6000 : newgive;//赠送金额最高6000
         					}
         					
         					//+++++++++++++++++++++++++++++++添加新的充值规则
         					boolean up = dao.updateRech(en.getRech_id(), 1, newgive);
         					if(up){
         						Bc_user uen = UserStatic.find(en.getUser_id());
         						double cm =  money + newgive;
         						UserStatic.AddMoney(uen, cm, 0, orderId, 2, "网银在线", cm * xf);
         						resultMessage = "充值已成功, 充值金额" + money + "元!";
         						out.print("OK");
         					} else 
         					{
         						resultMessage = "充值失败, 充值信息已过期!";
         					}
         				} else if (1 == sta && rechmoney == money)
         				{
         					resultMessage = "充值已成功, 充值金额" + money + "元!";
         				} else 
         				{
         					resultMessage = "充值失败, 无法找到充值信息!";
         				}
         			} else
         			{
         				resultMessage = "充值失败, 无法找到充值信息!";
         			}
         		} else 
         		{
         			resultMessage = "充值失败, " + message;
         		} 
         	} else 
         	{
         		resultMessage = "充值失败, 非法交易！";
             }
        } catch(Exception e)
        {
        	resultMessage = "交易失败, 非法请求!";
        }
    }
%>
<!DOCTYPE HTML>
<html>
<head>
<link rel="shortcut icon" href="/favicon.ico"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="application-name" content=""/>
<meta name="keywords" content=""/>
<meta name="description" content=""/>
<title>充值结果提示页</title>
<link rel="stylesheet" href="/css/global.css"/>
<link rel="stylesheet" href="/css/skin.css"/>
<style type="text/css">
.m-box .boxBd form,.m-box .boxBd .statusBox{margin:40px auto 0 200px}.m-sel,.m-ipt{margin-bottom:20px}.m-sel{*float:left;*margin-right:30px}.checkQtnList li,.setSafePhoneList li,.statusBox .u-btn2{margin-bottom:30px}.checkQtnList li h3{margin-bottom:20px;font-weight:normal;font-size:20px;color:#333}.statusBox .u-tips2,.statusBox .accountInforList{margin-bottom:30px}.statusBox .accountInforList li{margin-bottom:15px;color:#979798}.statusBox .accountInforList li span,.statusBox .accountInforList li strong{display:inline-block;*display:inline;*zoom:1;float:left}.statusBox .accountInforList li span{width:94px;font-size:12px}.statusBox .accountInforList li strong{font-size:14px}.u-tips2 i{font-size:12px;color:#949494}.noticeBox{width:100%;margin-top:40px;padding-top:40px;border-top:1px dotted #c7c8c8}.noticeBox h3,.noticeBox ol li{margin-bottom:17px;color:#949494}.noticeBox h3{font-size:14px}#leftSec{display:inline-block;*display:inline;*zoom:1;width:2em;text-align:center}
</style>
</head>
<body class="s-caipiao">
<noscript><div id="noScript"><div><h2>请开启浏览器的Javascript功能</h2><p>亲，没它我们玩不转啊！求您了，开启Javascript吧！<br/>不知道怎么开启Javascript？那就请<a href="http://www.baidu.com/s?wd=%E5%A6%82%E4%BD%95%E6%89%93%E5%BC%80Javascript%E5%8A%9F%E8%83%BD" rel="nofollow" target="_blank">猛击这里</a>！</p></div></div></noscript>
<div class="g-doc">
	<div class="g-hd" style="height: 70px;"><div class="g-in">
<div class="m-logobar">
	<h1 style="height: 70px; overflow: hidden; "><a href="/" target="_blank"><em>荣亨彩票网</em><img src="/20150926_files/logo.png" alt="荣亨彩票网" title="荣亨彩票网" /></a></h1>
	<div class="pdtLogo">&nbsp;</div>
	<span>&nbsp;</span>
</div>
    </div></div>
    <div class="g-bd">
    	<div class="g-in">
        
            <div class="m-box">
            	<h1 class="boxHd">系统消息提示：</h1>
                <div class="boxBd">
                    <div class="statusBox">
                        <p class="u-tips2 u-tips2-okEmail">
                            <span><font color="green"><%=resultMessage %></font>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/my/Rechange.jzh">继续充值</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/my/Rechange!RechDesc.jzh">充值记录</a></span>
                        </p>
                    </div>
                    <div class="noticeBox">
                    	
                    </div>
                </div>
                <div class="ieAlpha"></div>
            </div>
        </div>
	</div>
    <div class="g-ft"><div class="g-in">
<div class="m-cp"><p><a href="javascript:">About NetEase</a>-<a href="javascript:">公司简介</a>-<a href="javascript:">联系方式</a>-<a href="javascript:">OAuth2.0认证</a>-<a href="javascript:">招聘信息</a>-<a href="javascript:">客户服务</a>-<a href="javascript:">相关法律</a>-<a href="javascript:">网络营销</a></p><p>荣亨彩票公司版权所有 &copy;1997-2014</p></div>
    </div></div>
</div>
</body>
</html>

