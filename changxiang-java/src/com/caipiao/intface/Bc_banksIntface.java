package com.caipiao.intface;

import com.caipiao.entity.Bc_banks;
import java.util.List;
import java.util.Map;

public abstract interface Bc_banksIntface{
	
  public abstract boolean add(Bc_banks paramBc_banks);

  public abstract boolean delete(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract boolean update(int paramInt, Map paramMap);

  public abstract Bc_banks find(int paramInt);

  @SuppressWarnings("unchecked")
  public abstract List finds(int paramInt);

  public abstract int findCountByUser(int paramInt);
}