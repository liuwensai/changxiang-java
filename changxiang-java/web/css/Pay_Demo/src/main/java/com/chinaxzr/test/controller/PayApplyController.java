package com.chinaxzr.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.SortedMap;
import java.util.TreeMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chinaxzr.test.config.PayConfig;
import com.chinaxzr.test.util.PaySubmit;
import com.chinaxzr.test.util.Signature;

/**
 * Created by Administrator on 2017/3/4 0004.
 */
@Controller
@RequestMapping("/payApply")
public class PayApplyController {

    private static final String PAY_GATEWAY = "/payment/PayApply.do";


    @RequestMapping("/pay")
    public void pay(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        // 把request请求的参数放到Map中
        Enumeration e = request.getParameterNames();
        SortedMap<String, String> map = new TreeMap<String, String>();
        while (e.hasMoreElements()) {
            String param = (String) e.nextElement();
            map.put(param, request.getParameter(param));
        }

        if ("MD5".equalsIgnoreCase(map.get("signType").toString())) {
            //#.md5编码并转成大写 签名：
            String sign = Signature.createSign(map, PayConfig.key);
            map.put("signData", sign);
        }

        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        try {
            response.getWriter().append(PaySubmit.buildRequest(PayConfig.trans_url + PAY_GATEWAY, map)).close();
        } catch (Exception e1) {
            e1.printStackTrace();
        }
    }

}

