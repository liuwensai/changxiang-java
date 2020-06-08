package com.caipiao.servlet.my;

import com.caipiao.entity.Bc_banks;
import com.caipiao.entity.Bc_pay;
import com.caipiao.entity.Bc_user;
import com.caipiao.service.my.MyRechangeService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.SystemSet;
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
import java.util.Properties;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Rechange extends IndexAction
{
  private static final long serialVersionUID = -8508286590870312359L;
  MyRechangeService service = new MyRechangeService();

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      String pay = request.getParameter("pay");
      pay = pay == null ? "xbei" : pay;
      String alipay = SystemSet.paytype.getProperty("alipay_on");
      String tenpay = SystemSet.paytype.getProperty("tenpay_on");
      String chinabank = SystemSet.paytype.getProperty("chinabank_on");
      String yeepay = SystemSet.paytype.getProperty("yeepay_on");
      String hnapay = SystemSet.paytype.getProperty("hnapay_on");
      String huichao = SystemSet.paytype.getProperty("huichao_on");
      String xbei = SystemSet.paytype.getProperty("xbei_on");
      String ips = SystemSet.paytype.getProperty("ips_on");
      String vm = "my/rechXbei.vm";
      if (("alipay".equals(pay)) && (alipay.equals("0")))
        vm = "my/rechAliPay.vm";
      else if (("tenpay".equals(pay)) && (tenpay.equals("0")))
        vm = "my/rechTenPay.vm";
      else if (("chinabank".equals(pay)) && (chinabank.equals("0")))
        vm = "my/rechChinabank.vm";
      else if (("yeepay".equals(pay)) && (yeepay.equals("0")))
        vm = "my/rechYeePay.vm";
      else if (("hnapay".equals(pay)) && (hnapay.equals("0")))
        vm = "my/rechHnapay.vm";
      else if (("huichao".equals(pay)) && (huichao.equals("0")))
        vm = "my/rechHuichao.vm";
      else if (("xbei".equals(pay)) && ("0".equals(xbei)))
        vm = "my/rechXbei.vm";
      else if (("ips".equals(pay)) && ("0".equals(ips))) {
        vm = "my/rechIps.vm";
      }

      VelocityHelper velo = new VelocityHelper();
      Bc_user find = UserStatic.find(user);
      velo.Put("alipay", alipay);
      velo.Put("tenpay", tenpay);
      velo.Put("chinabank", chinabank);
      velo.Put("yeepay", yeepay);
      velo.Put("hnapay", hnapay);
      velo.Put("huichao", huichao);
      velo.Put("xbei", xbei);
      velo.Put("ips", ips);
      velo.Put("pay", pay);
      velo.Put("user", find);
      velo.init(vm, out);
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void DrawGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String user_realname = find.getUser_realname();
      if (StringUtils.isNotBlank(user_realname)) {
        int user_id = find.getUser_id();
        List findBanks = this.service.findBanks(user_id);
        int findUserDrawCount = this.service.findUserDrawCount(user_id);
        VelocityHelper velo = new VelocityHelper();
        velo.Put("user", find);
        velo.Put("drawcount", Integer.valueOf(findUserDrawCount));
        velo.Put("bank", findBanks);
        velo.init("my/rechdraw.vm", out);
      } else {
        out.print("<script>alert('您还未填写真实姓名。');location.href='/my/BaseInfo.jzh';</script>");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void DrawPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      String bankid = request.getParameter("bankid");
      String money = request.getParameter("money");
      String paypass = request.getParameter("paypass");
      if (StringUtils.isNotEmptyAll(new String[] { bankid, money, paypass })) {
        int ids = TryStatic.StrToInt(bankid, -1);
        if (-1 != ids) {
          Bc_banks banks = this.service.findBank(ids);
          double mon = TryStatic.StrToDoubleABS(money, 0.0D);
          if (banks != null) {
            String adds = banks.getBanks_add() + " | " + banks.getBanks_name();
            String addDraw = this.service.AddDraw(UserStatic.find(user), ids, banks.getBanks_bank(), banks.getBanks_card(), adds, 0, mon, Double.valueOf(0.0D), "申请提款", paypass);
            out.print(addDraw);
          } else {
            out.print("-1");
          }
        } else {
          out.print("-1");
        }
      } else {
        out.print("-1");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void Draw2Get(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String user_realname = find.getUser_realname();
      if (StringUtils.isNotBlank(user_realname)) {
        List findPays = this.service.findPays(find.getUser_id());
        VelocityHelper velo = new VelocityHelper();
        velo.Put("user", find);
        velo.Put("pay", findPays);
        velo.init("my/rechdraw2.vm", out);
      } else {
        out.print("<script>alert('您还未填写真实姓名。');location.href='/my/BaseInfo.jzh';</script>");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void Draw2Post(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      String payid = request.getParameter("payid");
      String money = request.getParameter("money");
      String paypass = request.getParameter("paypass");
      if (StringUtils.isNotEmptyAll(new String[] { payid, money, paypass })) {
        int ids = TryStatic.StrToInt(payid, -1);
        if (-1 != ids) {
          Bc_pay pays = this.service.findPay(ids);
          double mon = TryStatic.StrToDoubleABS(money, 0.0D);
          if (pays != null) {
            String addDraw = this.service.AddDraw(UserStatic.find(user), ids, pays.getPayName(), pays.getPay_user(), "--", 1, mon, Double.valueOf(0.0D), "申请提款", paypass);
            out.print(addDraw);
          } else {
            out.print("-1");
          }
        } else {
          out.print("-1");
        }
      } else {
        out.print("-1");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void BindCardGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String user_realname = find.getUser_realname();
      if (StringUtils.isNotBlank(user_realname)) {
        VelocityHelper velo = new VelocityHelper();
        velo.Put("user", find);
        velo.init("my/rechbindcard.vm", out);
      } else {
        out.print("<script>alert('您还未填写真实姓名。');location.href='/my/BaseInfo.jzh';</script>");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void BindCard2Get(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String user_realname = find.getUser_realname();
      if (StringUtils.isNotBlank(user_realname)) {
        VelocityHelper velo = new VelocityHelper();
        velo.Put("user", find);
        velo.init("my/rechbindpay.vm", out);
      } else {
        out.print("<script>alert('您还未填写真实姓名。');location.href='/my/BaseInfo.jzh';</script>");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void BindCardPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      int user_id = find.getUser_id();
      int findBankCount = this.service.findBankCount(user_id);
      if (findBankCount <= 5) {
        String bankse = request.getParameter("bankse");
        String province = request.getParameter("province");
        String city = request.getParameter("city");
        String cardadd = request.getParameter("cardadd");
        String card = request.getParameter("card");
        String password = request.getParameter("paypass");
        if (StringUtils.isNotEmptyAll(new String[] { bankse, card, password, cardadd })) {
          if (StringUtils.md5String(password).equals(find.getUser_paypass())) {
            this.service.AddBanks(user_id, find.getUser_phone(), bankse, card, province + city, cardadd);
            out.print("<script>alert('绑定成功。');location.href='/my/Rechange!Draw.jzh';</script>");
          } else {
            out.print("<script>alert('支付密码错误。');location.href='/my/Rechange!BindCard.jzh';</script>");
          }
        }
        else out.print("<script>alert('请填写完整。');location.href='/my/Rechange!BindCard.jzh';</script>"); 
      }
      else
      {
        out.print("<script>alert('您绑定的银行卡已经达到上线。');location.href='/my/Rechange!Draw.jzh';</script>");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void BindCard2Post(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      int user_id = find.getUser_id();
      int findPayCount = this.service.findPayCount(user_id);
      if (findPayCount <= 5) {
        String payse = request.getParameter("payse");
        String pays = request.getParameter("pays");
        String password = request.getParameter("paypass");
        if (StringUtils.isNotEmptyAll(new String[] { payse, pays, password })) {
          if (StringUtils.md5String(password).equals(find.getUser_paypass())) {
            this.service.AddPays(user_id, pays, payse, find.getUser_realname());
            out.print("<script>alert('绑定成功。');location.href='/my/Rechange!Draw2.jzh';</script>");
          } else {
            out.print("<script>alert('支付密码错误。');location.href='/my/Rechange!BindCard2.jzh';</script>");
          }
        }
        else out.print("<script>alert('请填写完整。');location.href='/my/Rechange!BindCard2.jzh';</script>"); 
      }
      else
      {
        out.print("<script>alert('您绑定的支付账户已经达到上线。');location.href='/my/Rechange!Draw2.jzh';</script>");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void RechDescGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String datestr = request.getParameter("date");
      String status = request.getParameter("status");
      String p = request.getParameter("p");
      int userid = find.getUser_id();
      int date = TryStatic.StrToInt(datestr, 0);
      String btime = TryStatic.getAgo(date);
      String etime = TimeUtil.getToday("yyyy-MM-dd");
      int page = TryStatic.StrToInt(p, 1);
      byte limit = 12;
      int statu = TryStatic.StrToInt(status, -1);
      int count = this.service.findsRechcount(userid, btime, etime, statu);
      String ajaxPage = PageUtils.Page163(count, page, limit, "/my/Rechange!RechDesc.jzh?status=" + statu + "&date=" + date + "&");
      List finds = this.service.findsRech(userid, btime, etime, statu, (page - 1) * limit, limit);
      VelocityHelper velo = new VelocityHelper();
      velo.Put("user", find);
      velo.Put("find", finds);
      velo.Put("page", ajaxPage);
      velo.Put("date", Integer.valueOf(date));
      velo.Put("status", Integer.valueOf(statu));
      velo.init("my/desrech.vm", out);
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void DrawDescGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String status = request.getParameter("status");
      String p = request.getParameter("p");
      String datestr = request.getParameter("date");
      int date = TryStatic.StrToInt(datestr, 0);
      String btime = TryStatic.getAgo(date);
      String etime = TimeUtil.getToday("yyyy-MM-dd");
      int userid = find.getUser_id();
      int page = TryStatic.StrToInt(p, 1);
      byte limit = 12;
      int statu = TryStatic.StrToInt(status, -1);
      int count = this.service.findDrawcount(userid, btime, etime, statu);
      String ajaxPage = PageUtils.Page163(count, page, limit, "/my/Rechange!DrawDesc.jzh?status=" + statu + "&date=" + date + "&");
      List finds = this.service.findDraw(userid, btime, etime, statu, (page - 1) * limit, limit);
      VelocityHelper velo = new VelocityHelper();
      velo.Put("user", find);
      velo.Put("find", finds);
      velo.Put("page", ajaxPage);
      velo.Put("date", Integer.valueOf(date));
      velo.Put("status", Integer.valueOf(statu));
      velo.init("my/desdraw.vm", out);
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String idsstr = request.getParameter("ids");
      int id = TryStatic.StrToInt(idsstr);
      if (id > 0) {
        String drawQuxiao = this.service.DrawQuxiao(find, id);
        out.print(drawQuxiao);
      } else {
        out.print("err");
      }
    } else {
      out.print("nologin");
    }

    out.flush();
    out.close();
  }
}