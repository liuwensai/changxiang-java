package com.caipiao.intface;

import com.caipiao.entity.Bc_auto;
import java.util.List;
import java.util.Map;

public abstract interface Bc_autoIntface{
	
  public abstract boolean add(Bc_auto paramBc_auto);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_auto find(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List finds(String paramString1, String paramString2, int paramInt1, String paramString3, String paramString4, int paramInt2, int paramInt3);

  public abstract int findsCount(String paramString1, String paramString2, int paramInt, String paramString3, String paramString4);
}