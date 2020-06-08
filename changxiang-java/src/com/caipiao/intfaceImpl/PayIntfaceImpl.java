package com.caipiao.intfaceImpl;

import com.caipiao.entity.Bc_pay;
import com.caipiao.intface.Bc_payIntface;
import com.sysbcjzh.mysql.Mysql;
import java.util.List;
import java.util.Map;

public class PayIntfaceImpl
  implements Bc_payIntface
{
  Mysql dao = Mysql.getInstance();

  public boolean add(Bc_pay en)
  {
    return this.dao.add(en);
  }

  public boolean delete(int Pay_id) {
    return this.dao.delete("delete from Bc_pay where Pay_id=?", new Object[] { Integer.valueOf(Pay_id) });
  }

  public Bc_pay find(int Pay_id) {
    return (Bc_pay)this.dao.find("select * from Bc_pay where Pay_id=?", Bc_pay.class, new Object[] { Integer.valueOf(Pay_id) });
  }
  @SuppressWarnings("unchecked")
  public boolean update(int Pay_id, Map map) {
    return this.dao.updateMap("update Bc_pay set ", " where Pay_id=?", map, new Object[] { Integer.valueOf(Pay_id) });
  }

  @SuppressWarnings("unchecked")
  public List finds(int User_id) {
    return this.dao.finds("select * from Bc_pay where User_id=?", Bc_pay.class, new Object[] { Integer.valueOf(User_id) });
  }

  public int findCountByUser(int User_id) {
    return this.dao.getCount("select count(Pay_id) from Bc_pay where User_id=?", new Object[] { Integer.valueOf(User_id) });
  }
}