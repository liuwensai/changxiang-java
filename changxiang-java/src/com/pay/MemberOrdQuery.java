package com.pay;

import java.io.PrintStream;
import net.sf.json.JSONObject;

public class MemberOrdQuery
{
  private String url = "https://15702710yt.51mypc.cn:8443/index.unifypay?version=2&action=MemberOrdQuery";
  private String charset = "utf-8";
  private HttpClientUtil httpClientUtil = null;

  public MemberOrdQuery()
  {
    this.httpClientUtil = new HttpClientUtil();
  }

  public void test() {
    String httpOrgCreateTest = this.url;
    String Secret = "80313E3BF507495761D721C6AE4CBCA9";
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("startDate", "20161226");
    jsonObject.put("endDate", "20161226");
    jsonObject.put("memberNo", "834755073990014");
    byte[] result = base64.encode(jsonObject.toString().getBytes());
    String encryptData = new String(result);
    String signData = md5.md5(jsonObject.toString() + Secret);
    String PostEntity = "partnerCode=TEST1115&encryptData=" + encryptData + "&" + "signData" + "=" + signData;
    String httpOrgCreateTestRtn = this.httpClientUtil.doPost(httpOrgCreateTest, PostEntity, this.charset);
    System.out.println("result:" + httpOrgCreateTestRtn);
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
    MemberOrdQuery main = new MemberOrdQuery();
    main.test();
  }
}