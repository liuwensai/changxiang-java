package com.caipiao.entity;

public class Bc_point {
	
	private int Point_id;
	private int User_id;
	private String User_name;
	private String Point_item;
	private int Point_type;
	private String Point_time;
	private String Point_desc;
	private int Point_have;
	private int Point_addsub;

	public String getUser_name() {
		return this.User_name;
	}

	public void setUser_name(String user_name) {
		this.User_name = user_name;
	}

	public int getPoint_id() {
		return this.Point_id;
	}

	public void setPoint_id(int point_id) {
		this.Point_id = point_id;
	}

	public int getUser_id() {
		return this.User_id;
	}

	public void setUser_id(int user_id) {
		this.User_id = user_id;
	}

	public String getPoint_item() {
		return this.Point_item;
	}

	public void setPoint_item(String point_item) {
		this.Point_item = point_item;
	}

	public int getPoint_type() {
		return this.Point_type;
	}

	public void setPoint_type(int point_type) {
		this.Point_type = point_type;
	}

	public String getPoint_time() {
		return this.Point_time;
	}

	public void setPoint_time(String point_time) {
		this.Point_time = point_time;
	}

	public String getPoint_desc() {
		return this.Point_desc;
	}

	public void setPoint_desc(String point_desc) {
		this.Point_desc = point_desc;
	}

	public int getPoint_have() {
		return this.Point_have;
	}

	public void setPoint_have(int point_have) {
		this.Point_have = point_have;
	}

	public int getPoint_addsub() {
		return this.Point_addsub;
	}

	public void setPoint_addsub(int point_addsub) {
		this.Point_addsub = point_addsub;
	}
}