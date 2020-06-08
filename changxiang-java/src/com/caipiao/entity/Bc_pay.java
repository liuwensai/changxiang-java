package com.caipiao.entity;

import com.caipiao.utils.ShowStatic;

public class Bc_pay {
	private int Pay_id;
	private int User_id;
	private String Pay_name;
	private String Pay_user;
	private String Pay_type;

	public int getPay_id() {
		return this.Pay_id;
	}

	public void setPay_id(int pay_id) {
		this.Pay_id = pay_id;
	}

	public int getUser_id() {
		return this.User_id;
	}

	public void setUser_id(int user_id) {
		this.User_id = user_id;
	}

	public String getPay_name() {
		return this.Pay_name;
	}

	public void setPay_name(String pay_name) {
		this.Pay_name = pay_name;
	}

	public String getPay_user() {
		return this.Pay_user;
	}

	public void setPay_user(String pay_user) {
		this.Pay_user = pay_user;
	}

	public String getPay_type() {
		return this.Pay_type;
	}

	public String getPay_class() {
		return ShowStatic.BankLogoClass(this.Pay_type);
	}

	public void setPay_type(String pay_type) {
		this.Pay_type = pay_type;
	}

	public String getPayName() {
		String re = "--";
		if ("0".equals(this.Pay_type))
			re = "֧����";
		else if ("1".equals(this.Pay_type)) {
			re = "�Ƹ�ͨ";
		}

		return re;
	}
}