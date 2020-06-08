package com.caipiao.servlet;

import com.caipiao.entity.Bc_user;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.VelocityHelper;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Index extends IndexAction
{
  private static final long serialVersionUID = -8392279409754849759L;

  public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    VelocityHelper velo = new VelocityHelper();
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      velo.Put("user", find);
    }

    velo.init("index.vm", out);
    out.flush();
    out.close();
  }

  public void BuyHomeGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    VelocityHelper velo = new VelocityHelper();
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      velo.Put("user", find);
    }

    velo.Put("ind", Integer.valueOf(1));
    velo.init("buyhome.vm", out);
    out.flush();
    out.close();
  }

  public void AwardGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    VelocityHelper velo = new VelocityHelper();
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      velo.Put("user", find);
    }

    velo.Put("ind", Integer.valueOf(3));
    velo.init("buyaward.vm", out);
    out.flush();
    out.close();
  }

  public void TrendGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    VelocityHelper velo = new VelocityHelper();
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      velo.Put("user", find);
    }

    velo.init("zx.vm", out);
    out.flush();
    out.close();
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
  }
}