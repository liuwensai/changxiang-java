package com.caipiao.intface;

import com.caipiao.entity.Bc_phb;
import java.util.List;
import java.util.Map;

public abstract interface Bc_phbIntface{
	
  public abstract boolean add(Bc_phb paramBc_phb);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_phb find(int paramInt);

  public abstract Bc_phb findByUser(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List finds(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3);

  public abstract boolean update(int paramInt1, String paramString, double paramDouble1, double paramDouble2, int paramInt2);

  @SuppressWarnings("unchecked")
  public abstract List findsPHB(int paramInt1, String paramString, int paramInt2, int paramInt3);

  public abstract int findsPHBCount(int paramInt, String paramString);

  public abstract boolean updateinit(int paramInt);
}