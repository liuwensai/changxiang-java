package com.caipiao.intface;

import com.caipiao.entity.Bc_buy;
import com.caipiao.entity.Bc_user;
import com.caipiao.entity.out.BuyOneOut;
import com.caipiao.entity.out.HemaiEntity;

import java.util.List;
import java.util.Map;

public abstract interface Bc_buyIntface
{
  public abstract boolean add(Bc_buy paramBc_buy);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  @SuppressWarnings("unchecked")
  public abstract boolean update(String paramString, Map paramMap);

  public abstract boolean itemadd(String paramString, double paramDouble);

  public abstract boolean updatehave(String paramString, double paramDouble);

  public abstract Bc_buy find(int paramInt);
  
  public abstract List<Bc_user> findCeshi(int User_type);

  public abstract Bc_buy find(int paramInt1, int paramInt2);

  public abstract BuyOneOut find(String paramString);

  public abstract Bc_buy findBuyOne(String paramString);

  @SuppressWarnings("unchecked")
  public abstract List findTheHemaiList(int paramInt, String paramString);

  public abstract HemaiEntity findTheHemai(String paramString);

  public abstract HemaiEntity findTheHemai(int paramInt);
  
  public abstract  List findTheGendanHemaiList(int status);//自动跟单的合买单子

  @SuppressWarnings("unchecked")
  public abstract List findBuy(int paramInt1, String paramString1, String paramString2, String paramString3, int paramInt2, int paramInt3, int paramInt4, int paramInt5);

  public abstract int findBuyCount(int paramInt1, String paramString1, String paramString2, String paramString3, int paramInt2, int paramInt3);

  @SuppressWarnings("unchecked")
  public abstract List findsBuy(String paramString1, String paramString2, String paramString3, int paramInt1, int paramInt2, String paramString4, String paramString5, String paramString6, int paramInt3, int paramInt4);

  public abstract int findsBuyCount(String paramString1, String paramString2, String paramString3, int paramInt1, int paramInt2, String paramString4, String paramString5, String paramString6);

  @SuppressWarnings("unchecked")
  public abstract List findsBuyForHM(String paramString1, String paramString2, int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5);

  public abstract int findsBuyForHMCount(String paramString1, String paramString2, int paramInt1, int paramInt2, int paramInt3);
  
  public void updateItem(String item,String buyCode);
  
}