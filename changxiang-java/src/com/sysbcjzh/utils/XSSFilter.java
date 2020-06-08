package com.sysbcjzh.utils;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class XSSFilter
  implements Filter
{
  public void destroy()
  {
  }

  public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
    throws IOException, ServletException
  {
    arg2.doFilter(new XSSRequestWrapper((HttpServletRequest)arg0), arg1);
  }

  public void init(FilterConfig filterconfig)
    throws ServletException
  {
  }
}