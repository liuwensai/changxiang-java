package com.chinaxzr.test.controller;

import com.alibaba.fastjson.JSON;
import com.chinaxzr.test.config.PayConfig;
import com.chinaxzr.test.util.HttpClientNewUtil;
import com.chinaxzr.test.util.Signature;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * Created by Administrator on 2017/3/4 0004.
 */
@Controller
@RequestMapping("/scanPay")
public class ScanPayApplyController {

    private static final String PAY_GATEWAY = "/payment/ScanPayApply.do";

    @RequestMapping("/pay")
    public void scanPay(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
    // 把request请求的参数放到Map中
String flag=request.getParameter("flag");


    if(flag!=null&&"1".equals(flag))
    {
        //daying
        Enumeration e = request.getParameterNames();
        SortedMap<String, String> map = new TreeMap<String, String>();
        while (e.hasMoreElements()) {
            String param = (String) e.nextElement();
            map.put(param, request.getParameter(param));
        }

        if("MD5".equalsIgnoreCase(map.get("signType").toString())) {
            //#.md5编码并转成大写 签名：
            String sign = Signature.createSign(map, PayConfig.key);
            map.put("signData", sign);
            request.getSession().setAttribute("signData",sign);

        }
        try {
            String resData = HttpClientNewUtil.post(PayConfig.trans_url+PAY_GATEWAY, map);//提交到支付系统

            Map<String, String> retmap = (Map<String, String>) JSON.parse(resData);
            String retCode = (String) retmap.get("retCode");
            String retMsg = (String) retmap.get("retMsg");
            String qrcode = (String) retmap.get("qrcode");
            String platmerord = (String) retmap.get("platmerord");
            String signType = (String) retmap.get("signType");
            String signData = (String) retmap.get("signData");

            if("1".equals(retCode)){
                if("MD5".equalsIgnoreCase(signType)){
                    String sign = "";
                    SortedMap<String, String> nMap = new TreeMap<String, String>();
                    nMap.put("platmerord", platmerord);
                    nMap.put("qrcode", qrcode);
                    nMap.put("retCode", retCode);
                    nMap.put("retMsg", retMsg);
                    sign = Signature.createSign(nMap, PayConfig.key);

                    if(!sign.equals(signData)){
                        retCode = "-40";
                        retMsg = "验签失败!";
                    }
                }
            }


            request.getSession().setAttribute("retCode", retCode);
            request.getSession().setAttribute("retMsg", retMsg);
            request.getSession().setAttribute("qrcode", qrcode);
            request.getRequestDispatcher("/qrcode.jsp").forward(request, response);

        } catch (Exception e1) {
            e1.printStackTrace();
        }

    }
    else
    {
        //不打印
        Enumeration e = request.getParameterNames();
        SortedMap<String, String> map = new TreeMap<String, String>();
        while (e.hasMoreElements()) {
            String param = (String) e.nextElement();
            map.put(param, request.getParameter(param));
        }

        if("MD5".equalsIgnoreCase(map.get("signType").toString())) {
            //#.md5编码并转成大写 签名：
            String sign = Signature.createSign(map, PayConfig.key);
            map.put("signData", sign);
            try {
                request.getSession().setAttribute("signData",sign);
                request.getRequestDispatcher("/lianjie.jsp").forward(request, response);
            }catch (Exception e2){

            }


        }
    }


}

}
