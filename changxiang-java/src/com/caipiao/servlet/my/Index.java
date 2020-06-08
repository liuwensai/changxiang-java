package com.caipiao.servlet.my;

import com.caipiao.entity.Bc_phb;
import com.caipiao.entity.Bc_user;
import com.caipiao.service.my.MyBuyService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.LotEmun;
import com.caipiao.utils.TimeUtil;
import com.caipiao.utils.TryStatic;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.PageUtils;
import com.sysbcjzh.utils.StringUtils;
import com.sysbcjzh.utils.VelocityHelper;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Index extends IndexAction
{
  private static final long serialVersionUID = -844522539855716287L;
  MyBuyService service = new MyBuyService();

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      VelocityHelper velo = new VelocityHelper();
      Bc_phb findphb = this.service.findphb(find.getUser_id());
      velo.Put("user", find);
      velo.Put("newwin", Double.valueOf(findphb.getPhb_day() + findphb.getPhb_hmday()));
      velo.Put("newgou", Double.valueOf(findphb.getPhb_day_c() + findphb.getPhb_hmday_c()));
      velo.Put("list", this.service.findBuy(find.getUser_id()));
      velo.init("my/index.vm", out);
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void OutGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html");
    UserSession.userOut(request);
    response.sendRedirect("/");
  }

  public void DescGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String datestr = request.getParameter("date");
      String lot = request.getParameter("lot");
      String status = request.getParameter("status");
      String ishm = request.getParameter("ishm");
      String p = request.getParameter("p");
      int userid = find.getUser_id();
      int date = TryStatic.StrToInt(datestr, 0);
      String btime = TryStatic.getAgo(date);
      String etime = TimeUtil.getToday("yyyy-MM-dd");
      int page = TryStatic.StrToInt(p, 1);
      byte limit = 12;
      int statu = TryStatic.StrToInt(status, -2);
      int hm = TryStatic.StrToInt(ishm, -1);
      int count = this.service.findBuyCount(userid, btime, etime, lot, statu, hm);
      String url = "/my/Index!Desc.jzh?date=" + date + "&status=" + statu + "&ishm=" + hm;
      if (StringUtils.isNotBlank(lot)) {
        url = url + "&lot=" + lot;
      }

      String ajaxPage = PageUtils.Page163(count, page, limit, url + "&");
      List findBuy = this.service.findBuy(userid, btime, etime, lot, statu, hm, (page - 1) * limit, limit);
      VelocityHelper velo = new VelocityHelper();
      velo.Put("user", find);
      velo.Put("order", findBuy);
      velo.Put("page", ajaxPage);
      velo.Put("date", Integer.valueOf(date));
      if (StringUtils.isNotBlank(lot)) {
        velo.Put("lot", lot);
        velo.Put("lotname", LotEmun.valueOf(lot).namestr);
      }

      velo.Put("status", Integer.valueOf(statu));
      velo.Put("ishm", Integer.valueOf(hm));
      velo.init("my/order.vm", out);
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