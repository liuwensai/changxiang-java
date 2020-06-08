package com.sysbcjzh.mysql;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowCallbackHandler;

public abstract interface JdbcDaoInterface
{
  public abstract List queryDynaBeans(String paramString, Object[] paramArrayOfObject);

  public abstract int execute(String paramString, Object[] paramArrayOfObject);

  public abstract Object query(String paramString, ResultSetExtractor paramResultSetExtractor);

  public abstract void query(RowCallbackHandler paramRowCallbackHandler, int paramInt, String paramString, Object[] paramArrayOfObject);

  public abstract void query(RowCallbackHandler paramRowCallbackHandler, String paramString, Object[] paramArrayOfObject);

  public abstract long queryForLong(String paramString, Object[] paramArrayOfObject);

  public abstract int queryForInt(String paramString, Object[] paramArrayOfObject);

  public abstract List queryForList(String paramString, Object[] paramArrayOfObject);

  public abstract Map queryForMap(String paramString, Object[] paramArrayOfObject);

  public abstract long getCount(String paramString, Object[] paramArrayOfObject);

  public abstract long getCount(JDBCQueryBean paramJDBCQueryBean);

  public abstract void excuteBatch(String paramString, List paramList);

  public abstract void excuteBatch(JDBCBatchBean paramJDBCBatchBean);

  public abstract void query(JDBCQueryBean paramJDBCQueryBean, RowCallbackHandler paramRowCallbackHandler);

  public abstract void excuteBatchs(Collection paramCollection);

  public abstract void excuteBatch(JDBCBatchUpdateBean paramJDBCBatchUpdateBean);
}