package com.sysbcjzh.utils;

import java.net.InetAddress;
import java.net.UnknownHostException;
import javax.servlet.http.HttpServletRequest;

public class IPUtils
{
  public static String GetIP(HttpServletRequest req)
  {
    String ipAddress = null;
    ipAddress = req.getHeader("x-forwarded-for");
    if ((ipAddress == null) || (ipAddress.length() == 0) || ("unknown".equalsIgnoreCase(ipAddress))) {
      ipAddress = req.getHeader("Proxy-Client-IP");
    }

    if ((ipAddress == null) || (ipAddress.length() == 0) || ("unknown".equalsIgnoreCase(ipAddress))) {
      ipAddress = req.getHeader("WL-Proxy-Client-IP");
    }

    if ((ipAddress == null) || (ipAddress.length() == 0) || ("unknown".equalsIgnoreCase(ipAddress))) {
      ipAddress = req.getRemoteAddr();
      if (ipAddress.equals("127.0.0.1")) {
        InetAddress inet = null;
        try
        {
          inet = InetAddress.getLocalHost();
        } catch (UnknownHostException var4) {
          var4.printStackTrace();
        }

        ipAddress = inet.getHostAddress();
      }
    }

    if ((ipAddress != null) && (ipAddress.length() > 15) && (ipAddress.indexOf(",") > 0)) {
      ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
    }

    return ipAddress;
  }
}