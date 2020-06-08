package com.caipiao.intface;

import com.caipiao.entity.Bc_comm;
import java.util.List;
import java.util.Map;

public abstract interface Bc_commIntface{
	
  public abstract boolean add(Bc_comm paramBc_comm);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_comm find(int paramInt);

  public abstract Bc_comm findById(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List finds(String paramString, int paramInt1, int paramInt2);

  public abstract int findsCount(String paramString);
}