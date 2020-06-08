package com.caipiao.service;

import com.caipiao.entity.Bc_comm;
import com.caipiao.entity.Bc_phb;
import com.caipiao.entity.Bc_user;
import com.caipiao.intface.Bc_userIntface;
import com.caipiao.intfaceImpl.UserIntfaceImpl;
import com.caipiao.utils.LotEmun;
import com.caipiao.utils.TimeUtil;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.EmailUtils;
import com.sysbcjzh.utils.IPUtils;
import com.sysbcjzh.utils.StringUtils;
import javax.servlet.http.HttpServletRequest;

public class UserRegLoginService{
	
  Bc_userIntface dao = new UserIntfaceImpl();

  public boolean IsEmailExist(String email)
  {
    return this.dao.EmailIsExist(email);
  }

  public boolean IsNameExist(String name) {
    return this.dao.NameIsExist(name);
  }

  public void SendEmail(String email, int up, String code) {
    EmailUtils.SendEmail(email, "测试标题", "<a href='http://127.0.0.1/RegAction.jzh?name=" + email + "&up=" + up + "&code=" + code + "'>正文内容验证</a>");
  }

  public boolean Reg(int type, String name, String pass, String qq, int upid, HttpServletRequest request) {
    String md5String = StringUtils.md5String(pass);
    String time = TimeUtil.getToday("yyyy-MM-dd HH:mm:ss");
    Bc_user en = new Bc_user();
    en.setUser_name(name);
    en.setUser_pass(md5String);
    en.setUser_paypass(md5String);
    en.setUser_dong(0.0D);
    en.setUser_money(0.0D);
    en.setUser_red(0.0D);
    en.setUser_point(0);
    en.setUser_level(0);
    en.setUser_regtime(time);
    en.setUser_lgtime(time);
    en.setUser_lgip(IPUtils.GetIP(request));
    en.setUser_phonecheck(0);
    en.setUser_zipcheck(0);
    en.setUser_qq(qq);
    if (1 == type) {
      en.setUser_email(name);
      en.setUser_emailcheck(1);
    } else {
      en.setUser_emailcheck(0);
    }

    en.setUser_type(0);
    en.setUser_status(0);
    if (upid > 0) {
      en.setUser_upid(upid);
    }

    boolean add = this.dao.add(en);
    if (add) {
      Bc_user find = this.dao.find(name);
      if (find != null) {
        int user_id = find.getUser_id();
        String user_name = find.getUser_name();
        Bc_comm comm = new Bc_comm();
        comm.setAll(0.0D);
        comm.setUser_id(user_id);
        comm.setUser_name(user_name);
        this.dao.add(comm);
        Bc_phb phb = new Bc_phb();
        phb.setAll(0.0D);
        phb.setUser_id(user_id);
        phb.setUser_name(user_name);
        phb.setPhb_type("all");
        this.dao.add(phb);
        LotEmun[] var19;
        int var18 = (var19 = LotEmun.values()).length;

        for (int var17 = 0; var17 < var18; var17++) {
          LotEmun l = var19[var17];
          Bc_phb p = new Bc_phb();
          p.setAll(0.0D);
          p.setUser_id(user_id);
          p.setUser_name(user_name);
          p.setPhb_type(l.name);
          this.dao.add(p);
        }
      }

      UserSession.userLogin(en, pass, request);
    }

    return add;
  }
}