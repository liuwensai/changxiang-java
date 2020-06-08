package com.chinaxzr.test.controller;

import com.alibaba.fastjson.JSONObject;
import com.chinaxzr.test.config.PayConfig;
import com.chinaxzr.test.util.HttpClientNewUtil;
import com.chinaxzr.test.util.Signature;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.SortedMap;
import java.util.TreeMap;

/**
 * Created by Administrator on 2017/3/4 0004.
 */
@Controller
@RequestMapping("/merBalanceQuery")
public class MerBalanceQueryController {

    private static final String PAY_GATEWAY = "／payment/QueryMerBalance.do";

    @RequestMapping("/merBalance")
    public void merbalance(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        // 把request请求的参数放到Map中
        Enumeration e = request.getParameterNames();
        SortedMap<String, String> map = new TreeMap<String, String>();
        while (e.hasMoreElements()) {
            String param = (String) e.nextElement();
            map.put(param, request.getParameter(param));
        }

        if("MD5".equalsIgnoreCase(map.get("signType").toString())){
            //#.md5编码并转成大写 签名：
            String sign = Signature.createSign(map, PayConfig.key);
            map.put("signData",sign);
        }

        try {
            String resData = HttpClientNewUtil.post(PayConfig.trans_url+PAY_GATEWAY, map);//提交到支付系统

            JSONObject retJson = JSONObject.parseObject(resData);
            String pay_ac_no = retJson.getString("pay_ac_no");
            String ac_type = retJson.getString("ac_type");
            String cash_ac_bal = retJson.getString("cash_ac_bal");
            String froz_balance = retJson.getString("froz_balance");

            if (retJson.getString("code").equals("1")) {
                if("MD5".equalsIgnoreCase(map.get("signType").toString())){
                    map = new TreeMap<String, String>();
                    map.put("pay_ac_no", pay_ac_no);
                    map.put("ac_type", ac_type);
                    map.put("cash_ac_bal", cash_ac_bal);
                    map.put("froz_balance", froz_balance);

                    //#.md5编码并转成大写 签名：
                    String sign = Signature.createSign(map,PayConfig.key);

                    String signData = (String) retJson.get("signData");
                    if (!signData.equalsIgnoreCase(sign)) {
                        String retMsg = "支付平台MD5验签失败……";
                        String retCode = "09997";
                        StringBuilder html = new StringBuilder();
                        html.append("<script language=\"javascript\">window.onload=function(){alert(\"" + "交易返回码:" + retCode + "\\n交易返回信息:" + retMsg + "\")}</script>\n");
                        response.setCharacterEncoding("utf-8");
                        response.setContentType("text/html;charset=utf-8");
                        response.getWriter().append(html).close();
                    }
                }

                StringBuilder html = new StringBuilder();
                html.append("<script language=\"javascript\">window.onload=function(){alert(\"" + "支付账号:" + pay_ac_no + "\\n账户类型:" + ac_type + "\\n可提现金额:" + cash_ac_bal + "\\n待结算金额:" + froz_balance + "\")}</script>\n");
                response.setCharacterEncoding("utf-8");
                response.setContentType("text/html;charset=utf-8");
                response.getWriter().append(html).close();
            } else {
                String code = (String) retJson.get("code");
                String desc = (String) retJson.get("desc");
                StringBuilder html = new StringBuilder();
                html.append("<script language=\"javascript\">window.onload=function(){alert(\"" + "返回错误码:" + code + "\\n返回错误信息:" + desc + "\")}</script>\n");
                response.setCharacterEncoding("utf-8");
                response.setContentType("text/html;charset=utf-8");
                response.getWriter().append(html).close();
            }
        } catch (Exception e1) {
            e1.printStackTrace();
        }
    }
}
