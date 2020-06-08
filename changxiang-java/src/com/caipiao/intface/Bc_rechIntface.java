package com.caipiao.intface;

import com.caipiao.entity.Bc_rech;
import java.util.List;
import java.util.Map;

public abstract interface Bc_rechIntface{
	
  public abstract boolean add(Bc_rech paramBc_rech);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_rech find(int paramInt);

  public abstract Bc_rech find(String paramString1, String paramString2);

  public abstract Bc_rech find(String paramString);

  @SuppressWarnings("unchecked")
  public abstract List finds(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3, int paramInt4, int paramInt5, int paramInt6);

  public abstract int findscount(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3, int paramInt4);

  @SuppressWarnings("unchecked")
  public abstract List finds(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3, int paramInt4, int paramInt5);

  public abstract int findscount(int paramInt1, String paramString1, String paramString2, int paramInt2, int paramInt3);

  public abstract int findsDayRechCount(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List findCpsRech(int paramInt1, String paramString1, String paramString2, String paramString3, int paramInt2, int paramInt3, int paramInt4);

  public abstract int findCpsRechcount(int paramInt1, String paramString1, String paramString2, String paramString3, int paramInt2);
}