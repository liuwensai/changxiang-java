<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.chinaxzr.test.config.PayConfig"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

<style>
table{ width:60%; border-collapse: collapse; }
table tr td{
	border: #DDD solid 1px;
	line-height: 30px;
}
table td div{display:-moz-inline-box;display:inline-block;width:100px;margin:0;padding:0;border:1px solid #ddd;}
</style>
	<script type="text/javascript">
		function check(fileName,alertText){
			with(fileName){
				if(value==null || value==""){
					alert(alertText);
					return false;
				}else{
					return true;
				}
			}
		}
		function checks(thisForm){
			with(thisForm){
				if(check(merId,"请输入商户编号")==false){
					merId.focus();
					return false;
				}
				if(check(signType,"加密方式")==false){
					signType.focus();
					return false;
				}
			}
			return true;
		}
	</script>
  </head>
  
<body> 
    <form action="/channelQuery/query" method="post" onsubmit="return checks(this)">
    	<table class="table_ui" align="center">
        	<tr>
                <td colspan="5" align="center">支付渠道查询</td>
            </tr>
             <tr>
             	<td align="right">商户编号:</td>
                <td colspan="4"> 
                <input style="width:300px" name="custId" type="text" value="<%=PayConfig.merId%>">
						  <font color="#FF0000">*</font>必填项</td>
            </tr>
           <tr>
             	<td align="right">加密方式:</td>
                <td colspan="4"> 
                <input style="width:300px" name="signType" type="text" value="MD5" >
						  <font color="#FF0000">*</font>必填项</td>
            </tr>
            <input type="hidden" name="svcName" value="paygate.tranChannelQry">
             <tr>
                <td colspan="5" align="center">
                <input type="submit" id="submit" name="submit" value="查询">
                <input type="reset" name="reset" class="btn_2" value="&nbsp;返  回&nbsp;" onClick="javascript:window.location='<%=request.getContextPath()%>/index.jsp'">
                </td>
            </tr>
        </table>
    </form>
</body>
