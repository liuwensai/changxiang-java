package com.pay;

import java.io.PrintStream;
import net.sf.json.JSONObject;

public class MemberTransaction
{
  private String url = "https://15702710yt.51mypc.cn:8443/index.unifypay?version=2&action=MemberTransaction";
  private String charset = "utf-8";
  private HttpClientUtil httpClientUtil = null;

  public MemberTransaction()
  {
    this.httpClientUtil = new HttpClientUtil();
  }

  public void test() {
    String httpOrgCreateTest = this.url;
    String Secret = "80313E3BF507495761D721C6AE4CBCA9";
    String PartnerCode = "TEST1115";
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("orderNo", "T4565799969360");
    jsonObject.put("notifyUrl", "http://www.520babe.com/path");
    jsonObject.put("bizcode", "1003");
    jsonObject.put("memberNo", "834755073990014");
    jsonObject.put("transAmt", "1100");
    byte[] result = base64.encode(jsonObject.toString().getBytes());
    String encryptData = new String(result);
    String signData = md5.md5(jsonObject.toString() + Secret);
    String PostEntity = "partnerCode=TEST1115&encryptData=" + encryptData + "&" + "signData" + "=" + signData;
    String httpOrgCreateTestRtn = this.httpClientUtil.doPost(httpOrgCreateTest, PostEntity, this.charset);
    System.out.println("result:" + httpOrgCreateTestRtn);
    System.out.println("Response Parameter Json data !");
    int a1 = httpOrgCreateTestRtn.indexOf("&encryptData=");
    int a2 = httpOrgCreateTestRtn.indexOf("&signData=");
    String resEncryptData = httpOrgCreateTestRtn.substring(a1 + 13, a2);
    String ResSignData1 = httpOrgCreateTestRtn.substring(a2 + 10);
    String ResDataCheck = new String(base64.decode(new String(resEncryptData))) + Secret;
    System.out.println(new String(base64.decode(new String(resEncryptData))));
    System.out.print("The Response data check is:" + md5.md5(ResDataCheck));
    if (md5.md5(ResDataCheck).toUpperCase().equals(ResSignData1))
      System.out.println("\r\nData checking Success !");
    else
      System.out.println("Data checking Fail !");
  }

  public static void main(String[] args)
  {
    MemberTransaction main = new MemberTransaction();
    main.test();
  }
}