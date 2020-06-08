<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!--以下信息为标准的 HTML 格式 + JAVA 语言 拼凑而成的 网银在线 支付接口标准演示页面 -->
<html>
<body onLoad="javascript:document.E_FORM.submit()">
<form action="https://pay3.chinabank.com.cn/PayGate?encoding=UTF-8" method="POST" name="E_FORM">
  <!--以下几项为网上支付重要信息，信息必须正确无误，信息会影响支付进行！-->
  <input type="hidden" name="v_md5info"    value="${v_md5info}" size="100">
  <input type="hidden" name="v_mid"        value="${v_mid}">
  <input type="hidden" name="v_oid"        value="${v_oid}">
  <input type="hidden" name="v_amount"     value="${v_amount}">
  <input type="hidden" name="v_moneytype"  value="${v_moneytype}">
  <input type="hidden" name="v_url"        value="${v_url}">
  <input type="hidden" name="pmode_id"        value="${v_pmode}">
  <input type="hidden" name="remark1"        value="${remark1}">
</form>
</body>
</html>
