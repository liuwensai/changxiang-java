package com.pay;

import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import javax.net.ssl.X509TrustManager;

final class SSLClient$1
  implements X509TrustManager
{
  SSLClient$1(SSLClient paramSSLClient)
  {
  }

  public void checkClientTrusted(X509Certificate[] chain, String authType)
    throws CertificateException
  {
  }

  public void checkServerTrusted(X509Certificate[] chain, String authType)
    throws CertificateException
  {
  }

  public X509Certificate[] getAcceptedIssuers(){
    return null;
  }
}