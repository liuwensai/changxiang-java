package com.caipiao.intface;

import com.caipiao.entity.Bc_point;
import java.util.List;
import java.util.Map;

public abstract interface Bc_pointIntface
{
  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_point find(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List finds(int paramInt1, String paramString1, String paramString2, int paramInt2,
		  int paramInt3, int paramInt4, int paramInt5);

  public abstract int findscount(int paramInt1, String paramString1, String paramString2, 
		  int paramInt2, int paramInt3);
}