package com.caipiao.intface;

import com.caipiao.entity.Bc_comm;
import com.caipiao.entity.Bc_detail;
import com.caipiao.entity.Bc_phb;
import com.caipiao.entity.Bc_point;
import com.caipiao.entity.Bc_user;
import java.util.List;
import java.util.Map;

public abstract interface Bc_userIntface
{
  public abstract boolean updatetimeip(int paramInt, String paramString1, String paramString2);

  public abstract boolean updateUserPass(int paramInt, String paramString);

  public abstract boolean add(Bc_user paramBc_user);

  public abstract boolean add(Bc_detail paramBc_detail);

  public abstract boolean add(Bc_point paramBc_point);

  public abstract boolean add(Bc_comm paramBc_comm);

  public abstract boolean add(Bc_phb paramBc_phb);

  public abstract boolean delete(int paramInt);

  public abstract boolean delete(String paramString);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  @SuppressWarnings("unchecked")
  public abstract boolean update(String paramString, Map paramMap);

  public abstract Bc_user find(String paramString);

  public abstract Bc_user find(int paramInt);

  public abstract boolean EmailIsExist(String paramString);

  public abstract boolean NameIsExist(String paramString);

  public abstract boolean addMoney(int paramInt1, double paramDouble1, int paramInt2, int paramInt3, double paramDouble2);

  public abstract boolean addMoney(int paramInt1, double paramDouble, int paramInt2);

  public abstract boolean MoneyToDongjie(int paramInt, double paramDouble);

  public abstract boolean DongToMoney(int paramInt, double paramDouble);

  public abstract boolean DongSub(int paramInt, double paramDouble);

  @SuppressWarnings("unchecked")
  public abstract List findlist(String paramString1, String paramString2, double paramDouble, int paramInt1, 
		  int paramInt2, int paramInt3, String paramString3, String paramString4, int paramInt4, int paramInt5);

  public abstract int findlistCount(String paramString1, String paramString2, double paramDouble, 
		  int paramInt1, int paramInt2, int paramInt3, String paramString3, String paramString4);

  @SuppressWarnings("unchecked")
  public abstract List findInlist(int paramInt1, int paramInt2, String paramString1, 
		  String paramString2, int paramInt3, int paramInt4);

  public abstract int findInlistCount(int paramInt1, int paramInt2, String paramString1, String paramString2);
  
  @SuppressWarnings("unchecked")
  public abstract List findByUser_type(String User_type);
  
  //随机取一个某种类型的用户
  public abstract Bc_user findRandByUser_type(String User_type);
  
}