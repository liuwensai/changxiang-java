package com.caipiao.entity.out;

import com.caipiao.utils.UserSession;

public class Phb {
	
	private int Phb_id;
	private int User_id;
	private String User_name;
	private double Phb_value;

	public int getPhb_id() {
		return this.Phb_id;
	}

	public void setPhb_id(int phb_id) {
		this.Phb_id = phb_id;
	}

	public int getUser_id() {
		return this.User_id;
	}

	public void setUser_id(int user_id) {
		this.User_id = user_id;
	}

	public String getUser_name() {
		return this.User_name;
	}

	public String getUser_nameDis() {
		return UserSession.DisUser(this.User_name);
	}

	public void setUser_name(String user_name) {
		this.User_name = user_name;
	}

	public double getPhb_value() {
		return (0.0D + (int) (this.Phb_value * 100.0D)) / 100.0D;
	}

	public void setPhb_value(double phb_value) {
		this.Phb_value = phb_value;
	}
}