package com.caipiao.servlet;

import com.caipiao.entity.Bc_user;
import com.caipiao.service.GroupBuyService;
import com.caipiao.service.systeminit.UserStatic;
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
import net.sf.json.JSONObject;

public class Groupbuy extends IndexAction
{
  private static final long serialVersionUID = 1L;
  GroupBuyService service = new GroupBuyService();

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    VelocityHelper velo = new VelocityHelper();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user name = UserStatic.find(user);
      velo.Put("user", name);
    }

    String name1 = request.getParameter("name");
    String lot = request.getParameter("lot");
    if ("all".equals(lot)) {
      lot = null;
    }

    String isbao = request.getParameter("isbao");
    String istake = request.getParameter("istake");
    String statusstr = request.getParameter("status");
    String p = request.getParameter("p");
    int page = TryStatic.StrToInt(p, 1);
    byte limit = 25;
    int bao = TryStatic.StrToInt(isbao, -1);
    int take = TryStatic.StrToInt(istake, -1);
    int status = TryStatic.StrToInt(statusstr, -2);
    int count = this.service.findsHMCount(name1, lot, bao, take, status);
    String url = "/Groupbuy.jzh?isbao=" + bao + "&istake=" + take + "&status=" + status + "&";
    if (StringUtils.isNotBlank(name1)) {
      url = url + "name=" + name1 + "&";
      velo.Put("name", name1);
    }

    if (StringUtils.isNotBlank(lot)) {
      url = url + "lot=" + lot + "&";
      velo.Put("lot", lot);
    }

    String pagehtml = PageUtils.Page163(count, page, limit, url);
    List list = this.service.findsHM(name1, lot, bao, take, status, (page - 1) * limit, limit);
    velo.Put("list", list);
    velo.Put("page", pagehtml);
    velo.Put("isbao", Integer.valueOf(bao));
    velo.Put("istake", Integer.valueOf(take));
    velo.Put("status", Integer.valueOf(status));
    velo.init("groupbuy.vm", out);
    out.flush();
    out.close();
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String lot = request.getParameter("lot");
    if ("all".equals(lot)) {
      lot = null;
    }

    PrintWriter out = response.getWriter();
    JSONObject json = new JSONObject();
    List findsHM = this.service.findsHM(null, lot, -1, -1, -2, 0, 20);
    if (findsHM != null)
      json.put("msg", findsHM);
    else {
      json.put("msg", "no");
    }

    out.print(json.toString());
    out.flush();
    out.close();
  }
}