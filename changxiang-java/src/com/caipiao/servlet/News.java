package com.caipiao.servlet;

import com.caipiao.entity.Bc_news;
import com.caipiao.entity.Bc_user;
import com.caipiao.service.NewsService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.TryStatic;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.VelocityHelper;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;

public class News extends IndexAction
{
  private static final long serialVersionUID = 1L;
  NewsService service = new NewsService();

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    VelocityHelper velo = new VelocityHelper();
    if (user != null) {
      Bc_user findAll = UserStatic.find(user);
      velo.Put("user", findAll);
    }

    List findAll1 = this.service.findAll();
    velo.Put("find", findAll1);
    velo.init("zx.vm", out);
    out.flush();
    out.close();
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  }

  public void LotGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String types = request.getParameter("type");
    int type = TryStatic.StrToInt(types);
    PrintWriter out = response.getWriter();
    JSONObject json = new JSONObject();
    List finds = this.service.finds(type);
    if (finds != null)
      json.put("msg", finds);
    else {
      json.put("msg", "no");
    }

    out.print(json.toString());
    out.flush();
    out.close();
  }

  public void NewsGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String id = request.getParameter("id");
    String user = UserSession.getUser(request);
    VelocityHelper velo = new VelocityHelper();
    if (user != null) {
      Bc_user ids = UserStatic.find(user);
      velo.Put("user", ids);
    }

    velo.Put("ind", Integer.valueOf(6));
    int ids1 = TryStatic.StrToInt(id, -1);
    if (-1 != ids1) {
      Bc_news find = this.service.find(ids1);
      if (find != null) {
        velo.Put("new", find);
        velo.init("news.vm", out);
      } else {
        velo.init("404news.vm", out);
      }
    } else {
      velo.init("404news.vm", out);
    }

    out.flush();
    out.close();
  }
}