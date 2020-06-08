package com.chinaxzr.test.controller;

import com.alibaba.fastjson.JSON;
import com.chinaxzr.test.config.PayConfig;
import com.chinaxzr.test.util.HttpClientNewUtil;
import com.chinaxzr.test.util.Signature;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

/**
 * Created by Administrator on 2017/3/4 0004.
 */

@Controller
@RequestMapping("/withdrawApply")
public class WithdrawApplyController {

    private static final String PAY_GATEWAY = "/payment/WithdrawApply.do";

    @RequestMapping("/pay")
    public void withdrawApply(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

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
            String sign = Signature.createSign(map,PayConfig.key);
            map.put("signData",sign);
        }

        try {
            String resData = HttpClientNewUtil.post(PayConfig.trans_url+PAY_GATEWAY, map);//提交到支付系统
            Map<String, String> retmap = (Map<String, String>) JSON.parse(resData);
            String retCode = (String) retmap.get("retCode");
            String retMsg = (String) retmap.get("retMsg");
            String signType = (String) retmap.get("signType");
            String prdOrdNo = (String) retmap.get("prdOrdNo");


            if("1".equals(retCode)){
                if("MD5".equalsIgnoreCase(signType)){
                    map = new TreeMap<String, String>();
                    map.put("prdOrdNo", prdOrdNo);
                    map.put("retCode", retCode);
                    map.put("retMsg", retMsg);

                    //#.md5编码并转成大写 签名：
                    String sign = Signature.createSign(map,PayConfig.key);

                    String signData = (String) retmap.get("signData");
                    if (!signData.equalsIgnoreCase(sign)) {
                        retMsg = "支付平台MD5验签失败……";
                        retCode = "09997";
                        prdOrdNo = "";
                    }
                }
            }


            StringBuilder html = new StringBuilder();
            html.append("<script language=\"javascript\">window.onload=function(){alert(\"" + "交易返回码:" + retCode + "\\n交易返回信息:" + retMsg + "\\n订单号:" + prdOrdNo + "\")}</script>\n");
            response.setCharacterEncoding("utf-8");
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().append(html).close();
        } catch (Exception e1) {
            e1.printStackTrace();
        }
    }
}
