package com.caipiao.servlet.my;

import com.caipiao.entity.Bc_user;
import com.caipiao.service.my.MyRedsService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.TimeUtil;
import com.caipiao.utils.TryStatic;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.PageUtils;
import com.sysbcjzh.utils.VelocityHelper;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Reds extends IndexAction
{
  private static final long serialVersionUID = -4305709666379462682L;
  MyRedsService service = new MyRedsService();

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String type = request.getParameter("type");
      String status = request.getParameter("status");
      String p = request.getParameter("p");
      String datestr = request.getParameter("date");
      int date = TryStatic.StrToInt(datestr, 0);
      String btime = TryStatic.getAgo(date);
      String etime = TimeUtil.getToday("yyyy-MM-dd");
      int userid = find.getUser_id();
      int page = TryStatic.StrToInt(p, 1);
      byte limit = 12;
      int types = TryStatic.StrToInt(type, -1);
      int statu = TryStatic.StrToInt(status, -1);
      int count = this.service.findRedcount(userid, btime, etime, types, statu);
      String ajaxPage = PageUtils.Page163(count, page, limit, "/my/Reds.jzh?status=" + statu + "&date=" + date + "&type=" + types + "&");
      List finds = this.service.findRed(userid, btime, etime, types, statu, (page - 1) * limit, limit);
      VelocityHelper velo = new VelocityHelper();
      velo.Put("user", find);
      velo.Put("find", finds);
      velo.Put("page", ajaxPage);
      velo.Put("date", Integer.valueOf(date));
      velo.Put("status", Integer.valueOf(statu));
      velo.Put("type", Integer.valueOf(types));
      velo.init("my/reds.vm", out);
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
  }
}