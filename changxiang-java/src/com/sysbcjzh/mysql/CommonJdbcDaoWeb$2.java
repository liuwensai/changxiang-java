package com.sysbcjzh.mysql;

import com.caipiao.utils.Log;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.StatementCreatorUtils;

final class CommonJdbcDaoWeb$2 implements PreparedStatementCallback {
	CommonJdbcDaoWeb$2(CommonJdbcDaoWeb paramCommonJdbcDaoWeb, List paramList) {
	}

	public Object doInPreparedStatement(PreparedStatement ps) throws SQLException, DataAccessException {
//		if (this.val$updateParameters != null) {
//			Log.ShowInfo("更新数据量：" + this.val$updateParameters.size());
//			Iterator var3 = this.val$updateParameters.iterator();
//
//			while (var3.hasNext()) {
//				Object[] objects = (Object[]) var3.next();
//				if (objects != null) {
//					for (int i = 1; i < objects.length + 1; i++) {
//						StatementCreatorUtils.setParameterValue(ps, i,
//								-2147483648, objects[(i - 1)]);
//					}
//
//					ps.addBatch();
//				}
//			}
//
//			ps.executeBatch();
//		}

		return null;
	}
}