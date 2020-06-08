package com.caipiao.activity;

import java.util.HashMap;

public class SignEntityService {
  ISignEntity dao = new ISignEntityImpl();

  public String SignService(int userid, String today) {
    String result = "1";
    SignEntity find = this.dao.find(userid, today);
    if (find == null) {
      int findsur = this.dao.findsur(userid);
      if (findsur >= 999)
        result = "0";
      else {
        result = "-1";
      }
    }

    return result;
  }

  public SignEntity find(int userid, String today) {
    return this.dao.find(userid, today);
  }

  public boolean addData(int userid, String date, int number) {
    SignEntity en = new SignEntity();
    en.setTime(date);
    en.setUser_id(userid);
    en.setSignAll(number);
    byte big = 0;
    if ((number == 7) || (number == 15)) {
      big = 1;
    }
    en.setBigSign(big);
    return this.dao.add(en);
  }

  public boolean updateBig(int signid) {
    HashMap map = new HashMap();
    map.put("BigSign", Integer.valueOf(2));
    return this.dao.update(signid, map);
  }
  
}