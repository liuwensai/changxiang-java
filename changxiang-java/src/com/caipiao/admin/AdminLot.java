package com.caipiao.admin;

import com.caipiao.admin.service.AdminLotService;
import com.caipiao.data.open.MethodHemai;
import com.caipiao.data.open.MethodOpen;
import com.caipiao.data.open.MethodOut;
import com.caipiao.data.open.OpenThread;
import com.caipiao.entity.Bc_buy;
import com.caipiao.entity.Bc_lottery;
import com.caipiao.entity.Bc_user;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.LotEmun;
import com.caipiao.utils.TimeUtil;
import com.caipiao.utils.TryStatic;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.PageUtils;
import com.sysbcjzh.utils.StringUtils;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AdminLot extends IndexAction
{
  private static final long serialVersionUID = 1L;
  AdminLotService service = new AdminLotService();

  @SuppressWarnings("unchecked")
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String name = request.getParameter("name");
      String item = request.getParameter("item");
      String lot = request.getParameter("lot");
      String statusstr = request.getParameter("status");
      String ishmstr = request.getParameter("ishm");
      String btime = request.getParameter("btime");
      String etime = request.getParameter("etime");
      String fqh = request.getParameter("fqh");
      String pstr = request.getParameter("p");
      int status = TryStatic.StrToInt(statusstr, -2);
      int ishm = TryStatic.StrToInt(ishmstr, -1);
      int page = TryStatic.StrToInt(pstr, 1);
      byte limit = 30;
      int count = this.service.findsBuyCount(name, item, lot, status, ishm, fqh, btime, etime);
      String url = "/admin/AdminLot.jzh?status=" + status + "&ishm=" + ishm + "&";
      if (StringUtils.isNotBlank(name)) {
        url = url + "name=" + name + "&";
        request.setAttribute("name", name);
      }

      if (StringUtils.isNotBlank(lot)) {
        url = url + "lot=" + lot + "&";
        request.setAttribute("lot", lot);
      }

      if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
        url = url + "btime=" + btime + "&etime=" + etime + "&";
        request.setAttribute("btime", btime);
        request.setAttribute("etime", etime);
      }

      if (StringUtils.isNotBlank(fqh)) {
        url = url + "fqh=" + fqh + "&";
        request.setAttribute("fqh", fqh);
      }

      String pagehtml = PageUtils.Page(count, page, limit, url);
      List findsBuy = this.service.findsBuy(name, item, lot, status, ishm, fqh, btime, etime, limit * (page - 1), limit);
      if (findsBuy != null) {
        request.setAttribute("find", findsBuy);
        request.setAttribute("page", pagehtml);
      }

      request.setAttribute("status", Integer.valueOf(status));
      request.setAttribute("ishm", Integer.valueOf(ishm));
      request.getRequestDispatcher("/adminsqwe/LotBuyList.jsp").forward(request, response);
    } else {
      out.write(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String i = request.getParameter("i");
      int ids = TryStatic.StrToInt(i);
      if (ids > 0) {
        Bc_lottery f = this.service.findLot(ids);
        if (f.getLot_isopen() == 0) {
          OpenThread openThread = new OpenThread(f.getLot_name(), f.getLot_qihao(), f.getLot_haoma());
          openThread.start();
          out.write("0");
        } else {
          out.write("1");
        }
      } else {
        out.write("err");
      }
    } else {
      out.write("nologin");
    }

    out.flush();
    out.close();
  }

  public void LotPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String i = request.getParameter("i");
      String haoma = request.getParameter("h");
      int ids = TryStatic.StrToInt(i);
      if ((ids > 0) && (StringUtils.isNotBlank(haoma))) {
        boolean upHmLot = this.service.UpHmLot(ids, haoma);
        if (upHmLot)
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

  public void PeopleDoPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String _ids = request.getParameter("ids");
      String mt = request.getParameter("mt");
      int ids = TryStatic.StrToInt(_ids);
      boolean dos = false;
      if (ids > 0) {
        if ("kaij".equals(mt)) {
          dos = new MethodOpen().Open(ids);
        } else if ("chup".equals(mt)) {
          dos = new MethodOut().OutOne(ids);
        } else if ("oneche".equals(mt)) {
          dos = new MethodOut().CheOen(ids);
        } else if ("allche".equals(mt)) {
          new MethodOut().AllChe(ids);
          dos = true;
        } else if ("isOk".equals(mt)) {
          dos = new MethodHemai().HeimaiOne(ids);
        }

        if (dos)
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

  @SuppressWarnings("unchecked")
  public void ItemGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String i = request.getParameter("i");
      String t = request.getParameter("t");
      Bc_buy find = null;
      int id = TryStatic.StrToInt(i);
      if (id > 0)
        find = this.service.find(id);
      else {
        find = this.service.find(t);
      }

      if (find != null) {
        String buy_item = find.getBuy_item();
        List findItemLot = this.service.findItemLot(buy_item);
        List findItemUser = this.service.findItemUser(buy_item);
        request.setAttribute("buy", find);
        request.setAttribute("blot", findItemLot);
        request.setAttribute("buser", findItemUser);
        request.getRequestDispatcher("/adminsqwe/LotItem.jsp").forward(request, response);
      } else {
        response.sendRedirect("/errorPage.html");
      }
    } else {
      out.write(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void QihaoGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String lot = request.getParameter("l");
    String p = request.getParameter("p");
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String lotstr = lot != null ? lot : "Cqssc";
      int page = TryStatic.StrToInt(p, 1);
      byte limit = 30;
      int count = this.service.findsLotCount(lotstr);
      String pagehtml = PageUtils.Page(count, page, limit, "/admin/AdminLot!Qihao.jzh?l=" + lotstr + "&");
      List findsLot = this.service.findsLot(lotstr, limit * (page - 1), limit);
      request.setAttribute("find", findsLot);
      request.setAttribute("page", pagehtml);
      request.setAttribute("lot", lotstr);
      request.getRequestDispatcher("/adminsqwe/LotAddQihao.jsp").forward(request, response);
    } else {
      out.write(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  public void QihaoPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String lots = request.getParameter("lot");
    String riqi = request.getParameter("riqi");
    String nums = request.getParameter("num");
    String qihaos = request.getParameter("qihao");
    PrintWriter out = response.getWriter();
    String systemAdmin = UserSession.getAdmin(request);
    int adminLevel = UserSession.getAdminLevel(request);
    if ((systemAdmin != null) && (adminLevel != 7)) {
      if ((StringUtils.isNotBlank(lots)) && (StringUtils.isNotBlank(riqi)))
        try {
          lots = LotEmun.valueOf(lots).name;
          int e = TryStatic.StrToInt(nums, 10);
          this.service.AddQihao(lots, e, riqi, qihaos);
          out.print("0");
        } catch (Exception var11) {
          out.print("err");
        }
      else
        out.print("err");
    }
    else {
      out.print(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  public void UpQihaoGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String lot = request.getParameter("lot");
    String id = request.getParameter("id");
    String systemAdmin = UserSession.getAdmin(request);
    if (systemAdmin != null) {
      int ids = TryStatic.StrToInt(id, 0);
      if ((StringUtils.isNotBlank(lot)) && (ids != 0)) {
        Bc_lottery findLot = this.service.findLot(ids);
        if (findLot != null) {
          request.setAttribute("find", findLot);
          request.setAttribute("lot", lot);
          request.getRequestDispatcher("/adminsqwe/LotUpQihao.jsp").forward(request, response);
        } else {
          out.write("<script>alert('该期号不存在!');history.back();</script>");
        }
      } else {
        out.write("<script>alert('参数错误!');history.back();</script>");
      }
    } else {
      out.write(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  public void UpQihaoPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String ids = request.getParameter("ids");
    String btime = request.getParameter("btime");
    String etime = request.getParameter("etime");
    PrintWriter out = response.getWriter();
    String systemAdmin = UserSession.getAdmin(request);
    if (systemAdmin != null) {
      int id = TryStatic.StrToInt(ids, 0);
      if ((StringUtils.isNotEmptyAll(new String[] { btime, etime })) && (id != 0)) {
        boolean upLot = this.service.UpLot(id, btime, etime);
        if (upLot)
          out.print("0");
        else
          out.print("1");
      }
      else {
        out.print("err");
      }
    } else {
      out.print(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void BuyLotGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String item = request.getParameter("item");
      String lot = request.getParameter("lot");
      String qihao = request.getParameter("qihao");
      String statusstr = request.getParameter("status");
      String pstr = request.getParameter("p");
      int status = TryStatic.StrToInt(statusstr, -2);
      int page = TryStatic.StrToInt(pstr, 1);
      byte limit = 30;
      int count = this.service.findsBuyLotCount(item, lot, qihao, status);
      String url = "/admin/AdminLot!BuyLot.jzh?status=" + status + "&";
      request.setAttribute("status", Integer.valueOf(status));
      if (StringUtils.isNotBlank(item)) {
        url = url + "item=" + item + "&";
        request.setAttribute("item", item);
      }

      if (StringUtils.isNotBlank(lot)) {
        url = url + "lot=" + lot + "&";
        request.setAttribute("lot", lot);
      }

      if (StringUtils.isNotBlank(qihao)) {
        url = url + "qihao=" + qihao + "&";
        request.setAttribute("qihao", qihao);
      }

      String pagehtml = PageUtils.Page(count, page, limit, url);
      List finds = this.service.findsBuyLot(item, lot, qihao, status, limit * (page - 1), limit);
      if (finds != null) {
        request.setAttribute("find", finds);
        request.setAttribute("page", pagehtml);
      }

      request.getRequestDispatcher("/adminsqwe/LotBuyLotList.jsp").forward(request, response);
    } else {
      out.write(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void LotListGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String lot = request.getParameter("lot");
      String qihao = request.getParameter("qihao");
      String havehmstr = request.getParameter("havehm");
      String isopenstr = request.getParameter("isopen");
      String pstr = request.getParameter("p");
      int havehm = TryStatic.StrToInt(havehmstr, -1);
      int isopen = TryStatic.StrToInt(isopenstr, -1);
      int page = TryStatic.StrToInt(pstr, 1);
      byte limit = 30;
      String nowtime = TimeUtil.getToday("yyyy-MM-dd HH:mm:ss");
      int count = this.service.findsLotCount(lot, qihao, havehm, isopen, nowtime);
      String url = "/admin/AdminLot!LotList.jzh?havehm=" + havehm + "&isopen=" + isopen + "&";
      request.setAttribute("havehm", Integer.valueOf(havehm));
      request.setAttribute("isopen", Integer.valueOf(isopen));
      if (StringUtils.isNotBlank(lot)) {
        url = url + "lot=" + lot + "&";
        request.setAttribute("lot", lot);
      }

      if (StringUtils.isNotBlank(qihao)) {
        url = url + "qihao=" + qihao + "&";
        request.setAttribute("qihao", qihao);
      }

      String pagehtml = PageUtils.Page(count, page, limit, url);
      List finds = this.service.findsLot(lot, qihao, havehm, isopen, nowtime, limit * (page - 1), limit);
      if (finds != null) {
        request.setAttribute("find", finds);
        request.setAttribute("page", pagehtml);
      }

      request.getRequestDispatcher("/adminsqwe/LotList.jsp").forward(request, response);
    } else {
      out.write(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void UserBuyGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String admin = UserSession.getAdmin(request);
    if (admin != null) {
      String user = request.getParameter("user");
      String lot = request.getParameter("lot");
      String statusstr = request.getParameter("status");
      String ishmstr = request.getParameter("ishm");
      String btime = request.getParameter("btime");
      String etime = request.getParameter("etime");
      String pstr = request.getParameter("p");
      int status = TryStatic.StrToInt(statusstr, -2);
      int ishm = TryStatic.StrToInt(ishmstr, -1);
      int page = TryStatic.StrToInt(pstr, 1);
      byte limit = 30;
      int userid = -1;
      String url = "/admin/AdminLot!UserBuy.jzh?status=" + status + "&ishm=" + ishm + "&";
      request.setAttribute("status", Integer.valueOf(status));
      request.setAttribute("ishm", Integer.valueOf(ishm));
      if (StringUtils.isNotBlank(user)) {
        Bc_user count = UserStatic.find(user);
        if (count != null) {
          userid = count.getUser_id();
          request.setAttribute("user", user);
          url = url + "user=" + user + "&";
        }
      }

      if (StringUtils.isNotBlank(lot)) {
        url = url + "lot=" + lot + "&";
        request.setAttribute("lot", lot);
      }

      if (StringUtils.isNotEmptyAll(new String[] { btime, etime })) {
        url = url + "btime=" + btime + "&etime=" + etime + "&";
        request.setAttribute("btime", btime);
        request.setAttribute("etime", etime);
      }

      int count1 = this.service.findBuyCount(userid, btime, etime, lot, status, ishm);
      String pagehtml = PageUtils.Page(count1, page, limit, url);
      List list = this.service.findBuy(userid, btime, etime, lot, status, ishm, limit * (page - 1), limit);
      if (list != null) {
        request.setAttribute("find", list);
        request.setAttribute("page", pagehtml);
      }

      request.getRequestDispatcher("/adminsqwe/LotUserBuy.jsp").forward(request, response);
    } else {
      out.write(UserSession.loginadminstr);
    }

    out.flush();
    out.close();
  }
  
  
  /**
   * 修改购买号码
   * @param request
   * @param response
   * @throws ServletException
   * @throws IOException
   */
  public void updateItemPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	  PrintWriter out = response.getWriter();
	    String admin = UserSession.getAdmin(request);
	    if (admin != null) {
	    	String buyCode = request.getParameter("buycode");
	        String item = request.getParameter("item");
	      if (item != null && !item.equals("") && buyCode != null && !buyCode.equals("")) {
	    	  this.service.updateItem(item, buyCode);
	          out.write("1");
	      }else {
	        out.write("err");
	      }
	    } else {
	      out.write("nologin");
	    }
	    out.flush();
	    out.close();
	  }
  
  
}