package com.caipiao.entity;

public class Bc_reds {
	private int Reds_id;
	private int User_id;
	private String User_name;
	private int Reds_type;
	private double Reds_have;
	private double Reds_addsub;
	private String Reds_time;
	private String Reds_item;
	private String Reds_desc;

	public double getReds_addsub() {
		return this.Reds_addsub;
	}

	public void setReds_addsub(double reds_addsub) {
		this.Reds_addsub = reds_addsub;
	}

	public String getUser_name() {
		return this.User_name;
	}

	public void setUser_name(String user_name) {
		this.User_name = user_name;
	}

	public int getReds_id() {
		return this.Reds_id;
	}

	public void setReds_id(int reds_id) {
		this.Reds_id = reds_id;
	}

	public int getUser_id() {
		return this.User_id;
	}

	public void setUser_id(int user_id) {
		this.User_id = user_id;
	}

	public int getReds_type() {
		return this.Reds_type;
	}

	public void setReds_type(int reds_type) {
		this.Reds_type = reds_type;
	}

	public double getReds_have() {
		return this.Reds_have;
	}

	public void setReds_have(double reds_have) {
		this.Reds_have = reds_have;
	}

	public String getReds_time() {
		return this.Reds_time;
	}

	public void setReds_time(String reds_time) {
		this.Reds_time = reds_time;
	}

	public String getReds_item() {
		return this.Reds_item;
	}

	public void setReds_item(String reds_item) {
		this.Reds_item = reds_item;
	}

	public String getReds_desc() {
		return this.Reds_desc;
	}

	public void setReds_desc(String reds_desc) {
		this.Reds_desc = reds_desc;
	}
}