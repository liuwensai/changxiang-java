package com.sysbcjzh.mysql;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class Mysql
{
  CommonJdbcDaoWeb daos = CommonJdbcDaoWeb.getInstance();

  public static Mysql getInstance()
  {
    return new Mysql();
  }

  public boolean add(Object en) {
    try {
      int e = MysqlReflect.executeInsertQuery(this.daos, en);
      if (e == 1)
        return true;
    }
    catch (Exception var3) {
      var3.printStackTrace();
    }

    return false;
  }

  public boolean delete(String sql, Object[] args) {
    return this.daos.execute(sql, args) > 0;
  }

  public Object find(String sql, Class c, Object[] args) {
    try {
      List e = MysqlReflect.fromList(c, this.daos.queryForList(sql, args));
      if ((e != null) && (e.size() > 0))
        return e.get(0);
    }
    catch (Exception var5) {
      var5.printStackTrace();
    }

    return null;
  }

  public List finds(String sql, Class c, Object[] args) {
    try {
      List e = this.daos.queryForList(sql, args);
      if (e != null)
        return MysqlReflect.fromList(c, this.daos.queryForList(sql, args));
    }
    catch (Exception var5) {
      var5.printStackTrace();
    }

    return null;
  }

  public int getCount(String sql, Object[] args) {
    try {
      return this.daos.queryForInt(sql, args);
    } catch (Exception var4) {
      var4.printStackTrace();
    }return 0;
  }

  public boolean updateMap(String sqltable, String sqlwhere, Map map, Object[] arg)
  {
    StringBuilder sb = new StringBuilder(sqltable);
    ArrayList param = new ArrayList();
    Set entrySet = map.entrySet();
    Iterator e = entrySet.iterator();

    while (e.hasNext()) {
      Map.Entry sql = (Map.Entry)e.next();
      String key = (String)sql.getKey();
      sb.append(key + "=?,");
      Object value = sql.getValue();
      param.add(value);
    }

    String var13 = sb.toString();
    if (var13.endsWith(",")) {
      var13 = var13.substring(0, var13.length() - 1);
    }

    var13 = var13.concat(sqlwhere);

    for (int var14 = 0; var14 < arg.length; var14++) {
      param.add(arg[var14]);
    }
    try
    {
      int var14 = this.daos.execute(var13, param.toArray());
      return var14 > 0;
    } catch (Exception var12) {
      var12.printStackTrace();
    }return false;
  }

  public boolean update(String sql, Object[] args)
  {
    try {
      int e = this.daos.execute(sql, args);
      return e > 0;
    } catch (Exception var4) {
      var4.printStackTrace();
    }return false;
  }

  public boolean isExist(String sql, Object[] args)
  {
    try {
      int e = this.daos.queryForInt(sql, args);
      return e > 0;
    } catch (Exception var4) {
      var4.printStackTrace();
    }return false;
  }

  public void excuteBatchs(Collection batchBeans)
  {
    this.daos.excuteBatchs(batchBeans);
  }
}