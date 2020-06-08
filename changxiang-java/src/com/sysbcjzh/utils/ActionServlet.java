package com.sysbcjzh.utils;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public final class ActionServlet extends HttpServlet
{
  private static final long serialVersionUID = 1L;
  private static final HashMap methods = new HashMap();
  private static final HashMap actions = new HashMap();

  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
  {
    resp.setContentType("text/html");
    req.setCharacterEncoding("utf-8");
    resp.setCharacterEncoding("utf-8");
    try
    {
      inits(req.getRequestURI(), "Get", new XSSRequestWrapper(req), resp);
    }
    catch (Exception localException)
    {
    }
  }

  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    resp.setContentType("text/html");
    req.setCharacterEncoding("utf-8");
    resp.setCharacterEncoding("utf-8");
    try
    {
      inits(req.getRequestURI(), "Post", new XSSRequestWrapper(req), resp);
    }
    catch (Exception localException)
    {
    }
  }

  protected Object _LoadAction(String act_name) throws InstantiationException, IllegalAccessException {
    Object action = actions.get(act_name);
    if (action == null) {
      try {
        int indexOf = act_name.lastIndexOf("/");
        String pack = "/";
        String name = act_name;
        if (indexOf > 0) {
          pack = act_name.substring(0, indexOf);
          name = act_name.substring(indexOf + 1);
        }

        action = Class.forName(getInitParameter(pack) + "." + name).newInstance();
        if (!actions.containsKey(act_name)) {
          HashMap var6 = actions;
          synchronized (actions) {
            actions.put(act_name, action);
          }
        }
      }
      catch (Exception localException)
      {
      }
    }
    return action;
  }

  @SuppressWarnings("unchecked")
  private Method _GetActionMethod(Object action, String method) {
    String key = action.getClass().getName().replace("com.caipiao.servlet.", "") + '.' + method;
    Method m = (Method)methods.get(key);
    if (m == null)
    {
      Method[] var8;
      int var7 = (var8 = action.getClass().getMethods()).length;

      for (int var6 = 0; var6 < var7; var6++) {
        Method m1 = var8[var6];
        if ((m1.getModifiers() == 1) && (m1.getName().equals(method))) {
          HashMap var9 = methods;
          synchronized (methods) {
            methods.put(key, m1);
          }

          m = m1;
        }
      }
    }

    return m;
  }

  protected void inits(String url, String type, HttpServletRequest req, HttpServletResponse resp) throws IOException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
    String method = null;
    Matcher ma = Pattern.compile("[^/].+.jzh").matcher(url);
    if (ma.find()) {
      method = ma.group().replace(".jzh", "");
    }

    if (method != null) {
      String[] split = method.split("!");
      if (split.length == 2)
        method = split[1] + type;
      else {
        method = "do" + type;
      }

      Object loadAction = _LoadAction(split[0]);
      Method getActionMethod = _GetActionMethod(loadAction, method);
      getActionMethod.invoke(loadAction, new Object[] { req, resp });
    } else {
      resp.sendRedirect(getInitParameter("404"));
    }
  }

  public void init() throws ServletException
  {
  }

  public void destroy() {
    if (actions != null) {
      try {
        Method dm = actions.getClass().getMethod("destroy", new Class[0]);
        if (dm != null) {
          dm.invoke(actions, new Object[0]);
        }
      }
      catch (Exception localException)
      {
      }
    }
    super.destroy();
  }
}