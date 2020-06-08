package com.sysbcjzh.mysql;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.apache.commons.beanutils.RowSetDynaClass;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

final class CommonJdbcDaoWeb$1 implements ResultSetExtractor {
	CommonJdbcDaoWeb$1(CommonJdbcDaoWeb paramCommonJdbcDaoWeb) {
	}

	public Object extractData(ResultSet rs) throws SQLException,
			DataAccessException {
		RowSetDynaClass rsdc = new RowSetDynaClass(rs);
		return rsdc.getRows();
	}
}