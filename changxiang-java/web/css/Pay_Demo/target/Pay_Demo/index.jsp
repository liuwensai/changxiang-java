<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

    <title>首页</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">

    <style type="text/css">
        span{
            font-family:  Verdana, Arial,'宋体';
            font-size: 12pt;
        }
    </style>

    <script src="/Pay_Demo/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script src="/Pay_Demo/jquery/jquery.qrcode.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function(){
            $('#img-ewm').qrcode({width:260,height:260,text:"ddsfsfasfsafsdfsadf",render:"table"});
        });
    </script>
</head>

<body>
<table width="30%" border="1" cellpadding="1" cellspacing="0" bgColor="#E9F4F9" class="tb26" align="center">
    <tr height="35">
        <td width="100%" colspan="3" align="center" class="tb28">
            <a href="<%=request.getContextPath() %>/payApplyPage.jsp"><span>网关支付（支付的主流程，包含支付渠道查询接口、网银支付接口）</span></a>
        </td>
    </tr>
    <tr height="35">
        <td width="100%" colspan="3" align="center" class="tb28">
            <a href="<%=request.getContextPath() %>/scanPayApplyPage.jsp"><span>扫码支付申请</span></a>
        </td>
    </tr>
    <tr height="35">
        <td width="100%" colspan="3" align="center" class="tb28">
            <a href="<%=request.getContextPath() %>/withdrawApplyPage.jsp"><span>提现申请</span></a>
        </td>
    </tr>

    <tr height="35">
        <td width="100%" colspan="3" align="center" class="tb28">
            <a href="<%=request.getContextPath() %>/orderStatusQueryPage.jsp"><span>订单状态查询</span></a>
        </td>
    </tr>
    <tr height="35">
        <td width="100%" colspan="3" align="center" class="tb28">
            <a href="<%=request.getContextPath() %>/merBalanceQuery.jsp"><span>商户余额查询</span></a>
        </td>
    </tr>
    <tr height="35">
        <td width="100%" colspan="3" align="center" class="tb28">
            <a href="<%=request.getContextPath() %>/asynNotifyPage.jsp"><span>支付成功异步通知</span></a>
        </td>
    </tr>
</table>
</body>
</html>
