package com.sysbcjzh.mysql;

import java.util.ArrayList;
import java.util.List;

public class JDBCBatchBean
{
  private final String sql;
  private final List batchParams = new ArrayList();

  public JDBCBatchBean(String sql)
  {
    this.sql = sql;
  }

  public void addBatchParameter(Object[] params) {
    this.batchParams.add(params);
  }

  public String getSql() {
    return this.sql;
  }

  public List getBatchParams() {
    return this.batchParams;
  }
}