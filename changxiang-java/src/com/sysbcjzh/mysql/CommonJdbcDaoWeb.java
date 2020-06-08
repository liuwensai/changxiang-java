package com.sysbcjzh.mysql;

import com.caipiao.utils.Log;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.apache.commons.beanutils.RowSetDynaClass;
import org.logicalcobwebs.proxool.ProxoolDataSource;
import org.logicalcobwebs.proxool.ProxoolException;
import org.logicalcobwebs.proxool.configuration.JAXPConfigurator;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementCreatorFactory;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.StatementCreatorUtils;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class CommonJdbcDaoWeb extends JdbcDaoSupport
  implements JdbcDaoInterface
{
  private static CommonJdbcDaoWeb INSTANCE = new CommonJdbcDaoWeb();

  public static CommonJdbcDaoWeb getInstance()
  {
    return INSTANCE;
  }

  private CommonJdbcDaoWeb() {
    try {
      Class.forName("org.logicalcobwebs.proxool.ProxoolDriver");
      String e = "mysql.xml";
      Object inputStream = CommonJdbcDaoWeb.class.getClassLoader().getResourceAsStream(e);
      if (inputStream == null) {
        inputStream = new FileInputStream(new File(e));
      }

      JAXPConfigurator.configure(new InputStreamReader((InputStream)inputStream), false);
      ProxoolDataSource proxoolDataSource = new ProxoolDataSource("dbname");
      setDataSource(proxoolDataSource);
    } catch (ProxoolException var4) {
      var4.printStackTrace();
    } catch (ClassNotFoundException var5) {
      var5.printStackTrace();
    } catch (FileNotFoundException var6) {
      var6.printStackTrace();
    }
  }

  @SuppressWarnings("unchecked")
  public List queryDynaBeans(String sql, Object[] args)
  {
    return (List)getJdbcTemplate().query(sql, args, new ResultSetExtractor() {
      public Object extractData(ResultSet rs) throws SQLException, DataAccessException {
        RowSetDynaClass rsdc = new RowSetDynaClass(rs);
        return rsdc.getRows();
      }
    });
  }

  public int execute(String sql, Object[] args) {
    return getJdbcTemplate().update(sql, args);
  }

  public Object query(String sql, ResultSetExtractor rch) {
    return getJdbcTemplate().query(sql, rch);
  }

  public void query(RowCallbackHandler rowCallbackHandler, int resultSetType, String sql, Object[] args) {
    PreparedStatementCreatorFactory factory = new PreparedStatementCreatorFactory(sql);
    factory.setResultSetType(resultSetType);
    PreparedStatementCreator creator = factory.newPreparedStatementCreator(sql, args);
    getJdbcTemplate().query(creator, rowCallbackHandler);
  }

  public void query(RowCallbackHandler rowCallbackHandler, String sql, Object[] args) {
    if (args == null)
      getJdbcTemplate().query(sql, rowCallbackHandler);
    else
      getJdbcTemplate().query(sql, args, rowCallbackHandler);
  }

  public void query(JDBCQueryBean queryBean, RowCallbackHandler rowCallbackHandler)
  {
    query(rowCallbackHandler, queryBean.getSql(), queryBean.getParameters());
  }

  public long queryForLong(String sql, Object[] args) {
    return getJdbcTemplate().queryForLong(sql, args);
  }

  public long getCount(String sql, Object[] args) {
    sql = "select count(*) from (" + sql + ")";
    long count = queryForLong(sql, args);
    return count;
  }

  public long getCount(JDBCQueryBean queryBean) {
    return getCount(queryBean.getSql(), queryBean.getParameters());
  }

  public int queryForInt(String sql, Object[] args) {
    return getJdbcTemplate().queryForInt(sql, args);
  }

  public List queryForList(String sql, Object[] args) {
    return getJdbcTemplate().queryForList(sql, args);
  }

  public Map queryForMap(String sql, Object[] args) {
    return getJdbcTemplate().queryForMap(sql, args);
  }

  @SuppressWarnings("unchecked")
  public void excuteBatch(String sql, final List updateParameters) {
    getJdbcTemplate().execute(sql, new PreparedStatementCallback() {
      public Object doInPreparedStatement(PreparedStatement ps) throws SQLException, DataAccessException {
        if (updateParameters != null) {
          Log.ShowInfo("更新数据量：" + updateParameters.size());
          Iterator var3 = updateParameters.iterator();

          while (var3.hasNext()) {
            Object[] objects = (Object[])var3.next();
            if (objects != null) {
              for (int i = 1; i < objects.length + 1; i++) {
                StatementCreatorUtils.setParameterValue(ps, i, -2147483648, objects[(i - 1)]);
              }

              ps.addBatch();
            }
          }

          ps.executeBatch();
        }

        return null;
      }
    });
  }

  public void excuteBatch(JDBCBatchBean batchbean) {
    excuteBatch(batchbean.getSql(), batchbean.getBatchParams());
  }

  public void excuteBatchs(Collection batchBeans) {
    Iterator iterator = batchBeans.iterator();

    while (iterator.hasNext()) {
      JDBCBatchBean jdbcBatchBean = (JDBCBatchBean)iterator.next();
      excuteBatch(jdbcBatchBean);
    }
  }

  public void excuteBatch(JDBCBatchUpdateBean bean)
  {
    Collection jdbcBatchs = bean.getJDBCBatchs();
    Iterator iterator = jdbcBatchs.iterator();

    while (iterator.hasNext()) {
      JDBCBatchBean jdbcBatchBean = (JDBCBatchBean)iterator.next();
      excuteBatch(jdbcBatchBean);
    }
  }
}