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
import java.math.BigDecimal;
import java.util.Enumeration;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

/**
 * 渠道查询
 * Created by Mattew on 2017/3/4 0016.
 */
@Controller
@RequestMapping("/orderStatus")
public class OrderStatusQueryController {
    private static final long serialVersionUID = 6105929450972175984L;

    /**
     * 支付平台提供给商户的服务接入网关URL
     */
    private static final String PAY_GATEWAY = "／payment/OrderStatusQuery.do";

   // private static final String PAY_GATEWAY = "/payment/OrderStatusQuery.do";

    @RequestMapping("/query")
    public void query(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
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
            String prdordno = (String) retmap.get("prdordno");
            String prdordtype = (String) retmap.get("prdordtype");
            String orderstatus = (String) retmap.get("orderstatus");
            String ordamt = (String) retmap.get("ordamt");

            StringBuilder html = new StringBuilder();
            if(!"1".equals(retCode)){
                html.append("<script language=\"javascript\">window.onload=function(){alert(\"" + "交易返回码:" + retCode + "\\n交易返回信息:" + retMsg + "\")}</script>\n");
            }else{
                if("MD5".equalsIgnoreCase(signType)){
                    map = new TreeMap<String, String>();
                    map.put("orderstatus", orderstatus);
                    map.put("prdordtype", prdordtype);
                    map.put("ordamt", ordamt);
                    map.put("retCode", retCode);
                    map.put("retMsg", retMsg);

                    //#.md5编码并转成大写 签名：
                    String sign = Signature.createSign(map,PayConfig.key);

                    String signData = (String) retmap.get("signData");
                    if (!signData.equalsIgnoreCase(sign)) {
                        retMsg = "支付平台MD5验签失败……";
                        retCode = "09997";
                        html.append("<script language=\"javascript\">window.onload=function(){alert(\"" + "交易返回码:" + retCode + "\\n交易返回信息:" + retMsg + "\")}</script>\n");
                    }else{
                        //订单状态:00:未支付,01:支付成功,02:支付处理中,11:订单作废,14:冻结, 19:待处理  20 待打款
                        if("00".equals(orderstatus)){
                            orderstatus = "未支付";
                        }else if("01".equals(orderstatus)){
                            orderstatus = "支付成功";
                        }else if("02".equals(orderstatus)){
                            orderstatus = "支付处理中";
                        }else if("11".equals(orderstatus)){
                            orderstatus = "订单作废";
                        }else if("14".equals(orderstatus)){
                            orderstatus = "冻结";
                        }else if("19".equals(orderstatus)){
                            orderstatus = "待处理";
                        }else if("20".equals(orderstatus)){
                            orderstatus = "待打款";
                        }

                        if("12".equals(prdordtype) || "13".equals(prdordtype)){
                            if("00".equals(orderstatus)){
                                orderstatus = "待处理";
                            }else if("01".equals(orderstatus)){
                                orderstatus = "已完成";
                            }else if("02".equals(orderstatus)){
                                orderstatus = "复核中";
                            }else if("14".equals(orderstatus)){
                                orderstatus = "冻结中";
                            }else if("20".equals(orderstatus)){
                                orderstatus = "待跑批";
                            }else if("21".equals(orderstatus)){
                                orderstatus = "银行处理中";
                            }
                        }

                        //商品类型   0-消费;11-消费冲正 1-充值; 2-担保支付; 3-商户充值; 5-保证金充值; 6-保证金解冻; 7-预充保证金提现服务费; 8-充值消费组合之消费; 9-充值消费组合之充值 10-授信账户还款订单; 12:商户提现；13代理商提现
                        if("0".equals(prdordtype)){
                            prdordtype = "消费订单";
                        }else if("12".equals(prdordtype)){
                            prdordtype = "商户提现订单";
                        }else if("13".equals(prdordtype)){
                            prdordtype = "代理商提现订单";
                        }

                        if(ordamt != null){
                            ordamt = new BigDecimal(ordamt).divide(new BigDecimal(100)).toPlainString();
                        }

                        html.append("<script language=\"javascript\">window.onload=function(){alert(\"" + "订单号:" + prdordno + "\\n订单类型:" + prdordtype + "\\n订单状态:" + orderstatus+ "\\n订单金额:" + ordamt + "\")}</script>\n");
                    }
                }
            }

            response.setCharacterEncoding("utf-8");
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().append(html).close();
        } catch (Exception e1) {
            e1.printStackTrace();
        }
    }
}
