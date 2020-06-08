package com.caipiao.service.my;

import com.caipiao.intface.Bc_userIntface;
import com.caipiao.intfaceImpl.UserIntfaceImpl;
import java.util.HashMap;

public class MyBaseInfoService
{
  Bc_userIntface dao = new UserIntfaceImpl();

  @SuppressWarnings("unchecked")
  public boolean SetPass(int user_id, String newpass)
  {
    HashMap map = new HashMap();
    map.put("User_pass", newpass);
    return this.dao.update(user_id, map);
  }

  @SuppressWarnings("unchecked")
  public boolean SetPayPass(int user_id, String paypass) {
    HashMap map = new HashMap();
    map.put("User_paypass", paypass);
    return this.dao.update(user_id, map);
  }

  @SuppressWarnings("unchecked")
  public boolean UpdateInfo(int user_id, String realname, String realzip, String birth, String add, String qq, String ask, String ans, String word) {
    HashMap map = new HashMap();
    map.put("User_realname", realname);
    map.put("User_zip", realzip);
    map.put("User_zipcheck", Integer.valueOf(1));
    map.put("User_birth", birth);
    map.put("User_liveadd", add);
    map.put("User_qq", qq);
    map.put("User_aqasking", ask);
    map.put("User_aqanswer", ans);
    map.put("User_word", word);
    return this.dao.update(user_id, map);
  }

  public boolean CheckEmail(String email) {
    return this.dao.EmailIsExist(email);
  }

  @SuppressWarnings("unchecked")
  public boolean UpdateEmail(int User_id, String email) {
    HashMap map = new HashMap();
    map.put("User_email", email);
    map.put("User_emailcheck", Integer.valueOf(1));
    return this.dao.update(User_id, map);
  }
}