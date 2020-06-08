package com.caipiao.intface;

import com.caipiao.entity.Bc_buylot;
import com.caipiao.entity.out.OpenEntity;
import com.caipiao.entity.out.OutEntity;
import java.util.List;
import java.util.Map;

public abstract interface Bc_buylotIntface
{
  public abstract boolean add(Bc_buylot paramBc_buylot);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  @SuppressWarnings("unchecked")
  public abstract boolean update(String paramString, Map paramMap);

  public abstract Bc_buylot findByItemqh(String paramString1, String paramString2);

  @SuppressWarnings("unchecked")
  public abstract List findByItem(String paramString);

  @SuppressWarnings("unchecked")
  public abstract List findEntityList(String paramString1, String paramString2, int paramInt);

  public abstract OpenEntity findEntityOne(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List findOutList(int paramInt, String paramString);

  @SuppressWarnings("unchecked")
  public abstract List findOutList(String paramString, int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List findOutList(int paramInt1, int paramInt2);

  public abstract OutEntity findEntityOne(String paramString1, String paramString2);

  public abstract OutEntity findOutEntityOne(int paramInt);

  public abstract int findItemNotOpen(String paramString);

  public abstract int findItemOpenNum(String paramString);

  @SuppressWarnings("unchecked")
  public abstract List finds(String paramString1, String paramString2, String paramString3, int paramInt1, int paramInt2, int paramInt3);

  public abstract int findsCount(String paramString1, String paramString2, String paramString3, int paramInt);
}