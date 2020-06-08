package com.caipiao.intface;

import com.caipiao.entity.Bc_msg;
import java.util.List;
import java.util.Map;

public abstract interface Bc_msgIntface{
	
  public abstract boolean add(Bc_msg paramBc_msg);

  public abstract boolean delete(int paramInt);

  public abstract boolean delete(int paramInt1, int paramInt2);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract boolean update(int paramInt1, int paramInt2);

  public abstract Bc_msg find(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List finds(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3, int paramInt4, int paramInt5);

  public abstract int findscount(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3);
}