package com.caipiao.activity;

import com.sysbcjzh.mysql.Mysql;
import java.util.ArrayList;
import java.util.List;

public class IActivityImpl
  implements IActivity
{
  Mysql dao = Mysql.getInstance();

  public List finds(int status)
  {
    String sql = "select * from Activity";
    ArrayList list = new ArrayList();
    if (-1 != status) {
      sql = sql + " where Act_status=?";
      list.add(Integer.valueOf(status));
    }

    return this.dao.finds(sql, Activity.class, list.toArray());
  }

  public Activity find(String activity) {
    return (Activity)this.dao.find("select * from Activity where Acr_type=?", Activity.class, new Object[] { activity });
  }
}