package com.caipiao.admin;

import com.caipiao.admin.service.AdminCaiwuService;
import com.caipiao.admin.service.AdminUserService;
import com.caipiao.entity.Bc_user;
import com.caipiao.entity.out.Achievement;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.TryStatic;
import com.caipiao.utils.UserSession;
import com.caipiao.utils.XlsOutUtil;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.PageUtils;
import com.sysbcjzh.utils.StringUtils;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AdminCaiwu extends IndexAction
{
  private static final long serialVersionUID = -8927698946009358924L;
  AdminCaiwuService caiwu = new AdminCaiwuService();
  AdminUserService service = new AdminUserService();

  @SuppressWarnings("unchecked")
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String user = request.getParameter("user");
      String btime = request.getParameter("btime");
      String etime = request.getParameter("etime");
      String typestr = request.getParameter("type");
      String utstr = request.getParameter("ut");
      String statusstr = request.getParameter("status");
      String p = request.getParameter("p");
      int page = TryStatic.StrToInt(p, 1);
      byte limit = 30;
      int type = TryStatic.StrToInt(typestr, -1);
      int ut = TryStatic.StrToInt(utstr, -1);
      int status = TryStatic.StrToInt(statusstr, -1);
      int user_id = -1;
      String url = "/admin/AdminCaiwu.jzh?type=" + type + "&ut=" + ut + "&status=" + status + "&";
      request.setAttribute("status", Integer.valueOf(status));
      request.setAttribute("type", Integer.valueOf(type));
      request.setAttribute("ut", Integer.valueOf(ut));
      request.setAttribute("p", p);
      if (StringUtils.isNotBlank(user)) {
        Bc_user findscount = UserStatic.find(user);
        if (findscount != null) {
          user_id = findscount.getUser_id();
          url = url + "user=" + findscount.getUser_name() + "&";
          request.setAttribute("user", user);
        }
      }

      if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
        url = url + "btime=" + btime + "&etime=" + etime + "&";
        request.setAttribute("btime", btime);
        request.setAttribute("etime", etime);
      }

      int findscount1 = this.caiwu.findsRechcount(user_id, btime, etime, type, ut, status);
      String pagehtml = PageUtils.Page(findscount1, page, limit, url);
      List finds = this.caiwu.findsRech(user_id, btime, etime, type, ut, status, (page - 1) * limit, limit);
      if (finds != null) {
        request.setAttribute("list", finds);
        request.setAttribute("page", pagehtml);
      }

      request.getRequestDispatcher("/adminsqwe/CaiwuRechList.jsp").forward(request, response);
    } else {
      out.write(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void RechDownGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    int adminLevel = UserSession.getAdminLevel(request);
    if ((admin != null) && (adminLevel != 7)) {
      String user = request.getParameter("user");
      String btime = request.getParameter("btime");
      String etime = request.getParameter("etime");
      String typestr = request.getParameter("type");
      String utstr = request.getParameter("ut");
      String statusstr = request.getParameter("status");
      int type = TryStatic.StrToInt(typestr, -1);
      int ut = TryStatic.StrToInt(utstr, -1);
      int status = TryStatic.StrToInt(statusstr, -1);
      int user_id = -1;
      if (StringUtils.isNotBlank(user)) {
        Bc_user findscount = UserStatic.find(user);
        if (findscount != null) {
          user_id = findscount.getUser_id();
        }
      }

      int findscount1 = this.caiwu.findsRechcount(user_id, btime, etime, type, ut, status);
      List finds = this.caiwu.findsRech(user_id, btime, etime, type, ut, status, 0, findscount1 + 1);
      String filePath = XlsOutUtil.SaveRechXLS(finds);
      File f = new File(filePath);
      if (!f.exists()) {
        response.sendError(404, "File not found!");
        return;
      }

      BufferedInputStream br = new BufferedInputStream(new FileInputStream(f));
      byte[] buf = new byte[1024];
      boolean len = false;
      response.reset();
      URL u = new URL("file:///" + filePath);
      response.setContentType(u.openConnection().getContentType());
      response.setHeader("Content-Disposition", "inline; filename=" + f.getName());
      ServletOutputStream outf = response.getOutputStream();
      int len1;
      while ((len1 = br.read(buf)) > 0)
      {
        outf.write(buf, 0, len1);
      }

      br.close();
      outf.close();
    } else {
      out.write(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  public void DrawUpdateGet(HttpServletRequest request, HttpServletResponse response) throws Exception {
    PrintWriter out = response.getWriter();
    this.caiwu.updateDrawTishi();
    out.print("ok");
  }

  public void DrawNewGet(HttpServletRequest request, HttpServletResponse response) throws Exception {
    PrintWriter out = response.getWriter();
    int c = this.caiwu.findsDrawTishiCount();

    out.print(c);
  }

  @SuppressWarnings("unchecked")
  public void DrawGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String user = request.getParameter("user");
      String btime = request.getParameter("btime");
      String etime = request.getParameter("etime");
      String typestr = request.getParameter("type");
      String utstr = request.getParameter("ut");
      String statusstr = request.getParameter("status");
      String p = request.getParameter("p");
      int page = TryStatic.StrToInt(p, 1);
      byte limit = 30;
      int type = TryStatic.StrToInt(typestr, -1);
      int ut = TryStatic.StrToInt(utstr, -1);
      int status = TryStatic.StrToInt(statusstr, -1);
      int user_id = -1;
      String url = "/admin/AdminCaiwu!Draw.jzh?type=" + type + "&ut=" + ut + "&status=" + status + "&";
      request.setAttribute("status", Integer.valueOf(status));
      request.setAttribute("ut", Integer.valueOf(ut));
      request.setAttribute("type", Integer.valueOf(type));
      if (StringUtils.isNotBlank(user)) {
        Bc_user findscount = UserStatic.find(user);
        if (findscount != null) {
          user_id = findscount.getUser_id();
          url = url + "user=" + findscount.getUser_name() + "&";
          request.setAttribute("user", user);
        }
      }

      if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
        url = url + "btime=" + btime + "&etime=" + etime + "&";
        request.setAttribute("btime", btime);
        request.setAttribute("etime", etime);
      }

      int findscount1 = this.caiwu.findsDrawcount(user_id, btime, etime, type, ut, status);
      String pagehtml = PageUtils.Page(findscount1, page, limit, url);
      List finds = this.caiwu.findsDraw(user_id, btime, etime, type, ut, status, (page - 1) * limit, limit);
      if (finds != null) {
        request.setAttribute("list", finds);
        request.setAttribute("page", pagehtml);
      }

      request.getRequestDispatcher("/adminsqwe/CaiwuDrawList.jsp").forward(request, response);
    } else {
      out.print(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void DownDrawGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    int adminLevel = UserSession.getAdminLevel(request);
    if ((admin != null) && (adminLevel != 7)) {
      String user = request.getParameter("user");
      String btime = request.getParameter("btime");
      String etime = request.getParameter("etime");
      String typestr = request.getParameter("type");
      String utstr = request.getParameter("ut");
      String statusstr = request.getParameter("status");
      int type = TryStatic.StrToInt(typestr, -1);
      int ut = TryStatic.StrToInt(utstr, -1);
      int status = TryStatic.StrToInt(statusstr, -1);
      int user_id = -1;
      if (StringUtils.isNotBlank(user)) {
        Bc_user findscount = UserStatic.find(user);
        if (findscount != null) {
          user_id = findscount.getUser_id();
        }
      }

      int findscount1 = this.caiwu.findsDrawcount(user_id, btime, etime, type, ut, status);
      List finds = this.caiwu.findsDraw(user_id, btime, etime, type, ut, status, 0, findscount1 + 1);
      String filePath = XlsOutUtil.SaveDrawXLS(finds);
      File f = new File(filePath);
      if (!f.exists()) {
        response.sendError(404, "File not found!");
        return;
      }

      BufferedInputStream br = new BufferedInputStream(new FileInputStream(f));
      byte[] buf = new byte[1024];
      boolean len = false;
      response.reset();
      URL u = new URL("file:///" + filePath);
      response.setContentType(u.openConnection().getContentType());
      response.setHeader("Content-Disposition", "inline; filename=" + f.getName());
      ServletOutputStream outf = response.getOutputStream();
      int len1;
      while ((len1 = br.read(buf)) > 0)
      {
        outf.write(buf, 0, len1);
      }

      br.close();
      outf.close();
    } else {
      out.print(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    int adminLevel = UserSession.getAdminLevel(request);
    if ((admin != null) && (adminLevel != 7)) {
      String drawidstr = request.getParameter("drawid");
      String typestr = request.getParameter("type");
      String msgstr = request.getParameter("msg");
      int drawid = TryStatic.StrToInt(drawidstr, 0);
      int type = TryStatic.StrToInt(typestr, -1);
      if ((drawid != 0) && (-1 != type)) {
        boolean drawUpdate = this.caiwu.DrawUpdate(drawid, admin, type, msgstr);
        if (drawUpdate)
          out.write("0");
        else
          out.write("1");
      }
      else {
        out.write("err");
      }
    } else {
      out.write("nologin");
    }

    out.flush();
    out.close();
  }

  public void DrawCountPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      int findNowDraw = this.caiwu.findNowDraw();
      out.write(findNowDraw);
    } else {
      out.write("nologin");
    }

    out.flush();
    out.close();
  }

  public void FindYeJiPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String name = request.getParameter("name");
      StringUtils.isNotBlank(name);
      int findNowDraw = this.caiwu.findNowDraw();
      out.write(findNowDraw);
    } else {
      out.write("nologin");
    }

    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void achievementGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null)
      try {
        String e = request.getParameter("username");
        String agent = request.getParameter("agent");
        String btime = request.getParameter("btime");
        String etime = request.getParameter("etime");
        e = e == null ? "" : e;
        agent = agent == null ? "" : agent;
        btime = btime == null ? "" : btime;
        etime = etime == null ? "" : etime;
        String p = request.getParameter("p");
        int page = TryStatic.StrToInt(p, 1);
        byte limit = 30;
        String url = "/admin/AdminCaiwu!achievement.jzh?username=" + e + "&agent=" + agent + "&btime=" + btime + "&etime=" + etime + "&";
        int count = this.caiwu.findsDataCount(e, agent, btime, etime);
        List list = this.caiwu.findsData(e, agent, btime, etime, (page - 1) * limit, page * limit);
        Achievement achie = this.caiwu.findsDataTotal(e, agent, btime, etime);
        String pageHtml = PageUtils.Page(count, page, limit, url);
        request.setAttribute("page", pageHtml);
        request.setAttribute("list", list);
        request.setAttribute("achie", achie);
        request.setAttribute("username", e);
        request.setAttribute("agent", agent);
        request.setAttribute("btime", btime);
        request.setAttribute("etime", etime);
        request.getRequestDispatcher("/adminsqwe/achievement.jsp").forward(request, response);
      } catch (Exception var17) {
        out.print("系统出现未知错误, 请联系管理员!");
      }
    else {
      out.print(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }
}