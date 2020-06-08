package com.caipiao.activity.servlet;

import com.caipiao.activity.ActivityService;
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

public class ActivityServlet extends IndexAction
{
  private static final long serialVersionUID = 2L;
  ActivityService service = new ActivityService();

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    byte status = -1;
    String user = UserSession.getUser(request);
    VelocityHelper velo = new VelocityHelper();
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      velo.Put("user", find);
    }

    velo.Put("act", this.service.finds(status));
    velo.init("activity.vm", out);
    out.flush();
    out.close();
  }

  public void doPost(HttpServletRequest httpservletrequest, HttpServletResponse httpservletresponse)
    throws ServletException, IOException
  {
  }
}