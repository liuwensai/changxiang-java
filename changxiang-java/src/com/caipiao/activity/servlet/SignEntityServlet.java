package com.caipiao.activity.servlet;

import com.caipiao.activity.Activity;
import com.caipiao.activity.ActivityService;
import com.caipiao.activity.SignEntity;
import com.caipiao.activity.SignEntityService;
import com.caipiao.entity.Bc_user;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.TimeUtil;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.IndexAction;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SignEntityServlet extends IndexAction
{
  private static final long serialVersionUID = 2L;
  SignEntityService service = new SignEntityService();
  ActivityService services = new ActivityService();

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    String today = TimeUtil.getToday("yyyy-MM-dd");
    if (user != null) {
      Activity activity = this.services.find("SignEntity");
      if (1 == activity.getAct_status()) {
        Bc_user find = UserStatic.find(user);
        int user_id = find.getUser_id();
        String signService = this.service.SignService(user_id, today);
        if ("-1".equals(signService)) {
          out.print("<script>alert('未达到投注金额！');location.href='/activity/sigin.jsp';</script>");
        } else if ("0".equals(signService)) {
          int[] moneys = { 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 10 };
          int number = new Random().nextInt(10) + 1;
          int money = moneys[number];
          int muber = 1;
          SignEntity sign = this.service.find(user_id, TimeUtil.getYesterday("yyyy-MM-dd"));
          if (sign != null) {
            int addData = sign.getSignAll();
            if (15 == addData)
              muber = 1;
            else {
              muber = sign.getSignAll() + 1;
            }
          }

          boolean addData1 = this.service.addData(find.getUser_id(), today, muber);
          if (addData1) {
            UserStatic.AddMoney(find, money, 0, user, 10, today + "签到赠送", 0.0D);
            out.print("<script>alert('签到成功！领取" + money + "元。');location.href='/activity/sigin.jsp';</script>");
          } else {
            out.print("<script>alert('签到错误！');location.href='/activity/sigin.jsp';</script>");
          }
        } else if ("1".equals(signService)) {
          out.print("<script>alert('您已签到！');location.href='/activity/sigin.jsp';</script>");
        } else {
          out.print("<script>alert('签到错误！');location.href='/activity/sigin.jsp';</script>");
        }
      } else {
        out.print("<script>alert('签到活动未开启！');location.href='/activity/sigin.jsp';</script>");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }

  public void doPost(HttpServletRequest httpservletrequest, HttpServletResponse httpservletresponse) throws ServletException, IOException {
  }

  public void BigGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    String today = TimeUtil.getToday("yyyy-MM-dd");
    if (user != null) {
      Activity activity = this.services.find("SignEntity");
      if (1 == activity.getAct_status()) {
        Bc_user find = UserStatic.find(user);
        int user_id = find.getUser_id();
        SignEntity findsign = this.service.find(user_id, today);
        if (findsign != null) {
          int bigSign = findsign.getBigSign();
          if (bigSign == 0) {
            out.print("<script>alert('您签到未满7天或者15天！');location.href='/activity/sigin.jsp';</script>");
          } else if (2 == bigSign) {
            out.print("<script>alert('您已领取过大礼包！');location.href='/activity/sigin.jsp';</script>");
          } else if (1 == bigSign) {
            boolean updateBig = this.service.updateBig(findsign.getId());
            int signAll = findsign.getSignAll();
            if (updateBig) {
              byte mon = 0;
              if (signAll == 7)
                mon = 38;
              else if (signAll == 15) {
                mon = 58;
              }

              UserStatic.AddMoney(find, mon, 0, user, 10, today + "签到大礼包赠送", 0.0D);
              out.print("<script>alert('签到成功！领取" + mon + "元大礼包。');location.href='/activity/sigin.jsp';</script>");
            }
          } else {
            out.print("<script>alert('领取大礼包错误！');location.href='/activity/sigin.jsp';</script>");
          }
        } else {
          out.print("<script>alert('您今日还未签到！');location.href='/activity/sigin.jsp';</script>");
        }
      } else {
        out.print("<script>alert('签到活动未开启！');location.href='/activity/sigin.jsp';</script>");
      }
    } else {
      out.print(UserSession.loginstr);
    }

    out.flush();
    out.close();
  }
}