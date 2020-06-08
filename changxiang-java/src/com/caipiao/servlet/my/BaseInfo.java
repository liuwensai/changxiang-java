package com.caipiao.servlet.my;

import com.caipiao.entity.Bc_user;
import com.caipiao.service.my.MyBaseInfoService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.EmailUtils;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.StringUtils;
import com.sysbcjzh.utils.VelocityHelper;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class BaseInfo extends IndexAction{
	
  private static final long serialVersionUID = 3322191421792769888L;
  MyBaseInfoService service = new MyBaseInfoService();

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      VelocityHelper velo = new VelocityHelper();
      velo.Put("user", find);
      velo.init("my/infobase.vm", out);
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void SetPwdGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      VelocityHelper velo = new VelocityHelper();
      velo.Put("user", find);
      velo.init("my/infosetpwd.vm", out);
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void SetPwdPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String op = request.getParameter("op");
      String np = request.getParameter("np");
      String user_pass = find.getUser_pass();
      if (StringUtils.isNotEmptyAll(new String[] { op, np })) {
        if (user_pass.equals(StringUtils.md5String(op))) {
          boolean setPass = this.service.SetPass(find.getUser_id(), StringUtils.md5String(np));
          if (setPass)
            out.print("0");
          else
            out.print("2");
        }
        else {
          out.print("1");
        }
      }
      else out.print("-1"); 
    }
    else
    {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void SetPayPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String op = request.getParameter("op");
      String np = request.getParameter("np");
      String user_paypass = find.getUser_paypass();
      if (StringUtils.isNotEmptyAll(new String[] { op, np })) {
        if (user_paypass.equals(StringUtils.md5String(op))) {
          boolean setPayPass = this.service.SetPayPass(find.getUser_id(), StringUtils.md5String(np));
          if (setPayPass)
            out.print("0");
          else
            out.print("2");
        }
        else {
          out.print("1");
        }
      }
      else out.print("-1"); 
    }
    else
    {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void SetPhoneGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      VelocityHelper velo = new VelocityHelper();
      velo.Put("user", find);
      velo.init("my/infosetphone.vm", out);
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void SetEmailGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      VelocityHelper velo = new VelocityHelper();
      velo.Put("user", find);
      velo.init("my/infosetemail.vm", out);
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void BanEmailGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      String ban_email = request.getParameter("ban_email");
      if (StringUtils.isNotBlank(ban_email)) {
        boolean checkEmail = this.service.CheckEmail(ban_email);
        if (checkEmail) {
          out.print("1");
        } else {
          request.getSession().setAttribute("banmail", ban_email);
          EmailUtils.SendEmail(ban_email, "绑定邮箱标题", "<a href='http://127.0.0.1:8080/my/BaseInfo!BanEmailOK.jzh?email=" + ban_email + "'>绑定邮箱验证</a>");
          out.print("0");
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

  public void BanEmailOKGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      String email = request.getParameter("email");
      Object attribute = request.getSession().getAttribute("banmail");
      if ((StringUtils.isNotBlank(email)) && (attribute.toString().equals(email))) {
        boolean checkEmail = this.service.CheckEmail(email);
        if (checkEmail) {
          out.print("1");
          out.print("<script>alert('邮箱" + email + "已绑定，请更换邮箱！');location.href='/my/Index.jzh';</script>");
        } else {
          this.service.UpdateEmail(find.getUser_id(), email);
          out.print("<script>alert('邮箱绑定验证成功！');location.href='/my/Index.jzh';</script>");
        }
      } else {
        out.print("<script>alert('邮箱绑定验证错误！');location.href='/my/Index.jzh';</script>");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void SettingGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      VelocityHelper velo = new VelocityHelper();
      velo.Put("user", find);
      velo.init("my/infosetting.vm", out);
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
      String realname = request.getParameter("realname");
      String realzip = request.getParameter("realzip");
      String birth = request.getParameter("birth");
      String address = request.getParameter("address");
      String qq = request.getParameter("qq");
      String ask = request.getParameter("ask");
      String ans = request.getParameter("ans");
      String word = request.getParameter("word");
      if (StringUtils.isNotEmptyAll(new String[] { realname, realzip })) {
        boolean updateInfo = this.service.UpdateInfo(find.getUser_id(), realname, realzip, birth, address, qq, ask, ans, word);
        if (updateInfo)
          out.print("0");
        else
          out.print("1");
      }
      else {
        out.print("-1");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }
}