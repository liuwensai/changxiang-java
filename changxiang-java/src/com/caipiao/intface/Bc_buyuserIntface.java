package com.caipiao.intface;

import com.caipiao.entity.Bc_buyuser;
import java.util.List;

public abstract interface Bc_buyuserIntface{

  public abstract boolean add(Bc_buyuser paramBc_buyuser);

  @SuppressWarnings("unchecked")
  public abstract List findBuy(int paramInt1, String paramString1, String paramString2, String paramString3, int paramInt2, int paramInt3, int paramInt4, int paramInt5);

  public abstract int findBuyCount(int paramInt1, String paramString1, String paramString2, String paramString3, int paramInt2, int paramInt3);

  @SuppressWarnings("unchecked")
  public abstract List findNewWin(String paramString, int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List findNewWin(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List findByItem(String paramString);

  @SuppressWarnings("unchecked")
  public abstract List findByItem(String paramString, int paramInt1, int paramInt2);

  public abstract int findByItemCount(String paramString);

  public abstract boolean addWin(int paramInt, double paramDouble);
  
}