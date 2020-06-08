package com.caipiao.entity;

public class Bc_phb {
	private int Phb_id;
	private int User_id;
	private String User_name;
	private double Phb_total;
	private double Phb_all;
	private double Phb_hmall;
	private double Phb_month;
	private double Phb_hmmonth;
	private double Phb_day;
	private double Phb_hmday;
	private double Phb_total_c;
	private double Phb_all_c;
	private double Phb_hmall_c;
	private double Phb_month_c;
	private double Phb_hmmonth_c;
	private double Phb_day_c;
	private double Phb_hmday_c;
	private String Phb_type;

	public void setAll(double phb) {
		this.Phb_total = (this.Phb_all = this.Phb_hmall = this.Phb_month = this.Phb_hmmonth = this.Phb_day = this.Phb_hmday = phb);
		this.Phb_total_c = (this.Phb_all_c = this.Phb_hmall_c = this.Phb_month_c = this.Phb_hmmonth_c = this.Phb_day_c = this.Phb_hmday_c = phb);
	}

	public double getPhb_total_c() {
		return this.Phb_total_c;
	}

	public void setPhb_total_c(double phb_total_c) {
		this.Phb_total_c = phb_total_c;
	}

	public double getPhb_all_c() {
		return this.Phb_all_c;
	}

	public void setPhb_all_c(double phb_all_c) {
		this.Phb_all_c = phb_all_c;
	}

	public double getPhb_hmall_c() {
		return this.Phb_hmall_c;
	}

	public void setPhb_hmall_c(double phb_hmall_c) {
		this.Phb_hmall_c = phb_hmall_c;
	}

	public double getPhb_month_c() {
		return this.Phb_month_c;
	}

	public void setPhb_month_c(double phb_month_c) {
		this.Phb_month_c = phb_month_c;
	}

	public double getPhb_hmmonth_c() {
		return this.Phb_hmmonth_c;
	}

	public void setPhb_hmmonth_c(double phb_hmmonth_c) {
		this.Phb_hmmonth_c = phb_hmmonth_c;
	}

	public double getPhb_day_c() {
		return this.Phb_day_c;
	}

	public void setPhb_day_c(double phb_day_c) {
		this.Phb_day_c = phb_day_c;
	}

	public double getPhb_hmday_c() {
		return this.Phb_hmday_c;
	}

	public void setPhb_hmday_c(double phb_hmday_c) {
		this.Phb_hmday_c = phb_hmday_c;
	}

	public double getPhb_total() {
		return (0.0D + (int) (this.Phb_total * 100.0D)) / 100.0D;
	}

	public void setPhb_total(double phb_total) {
		this.Phb_total = phb_total;
	}

	public double getPhb_hmall() {
		return (0.0D + (int) (this.Phb_hmall * 100.0D)) / 100.0D;
	}

	public void setPhb_hmall(double phb_hmall) {
		this.Phb_hmall = phb_hmall;
	}

	public double getPhb_hmmonth() {
		return (0.0D + (int) (this.Phb_hmmonth * 100.0D)) / 100.0D;
	}

	public void setPhb_hmmonth(double phb_hmmonth) {
		this.Phb_hmmonth = phb_hmmonth;
	}

	public double getPhb_hmday() {
		return (0.0D + (int) (this.Phb_hmday * 100.0D)) / 100.0D;
	}

	public void setPhb_hmday(double phb_hmday) {
		this.Phb_hmday = phb_hmday;
	}

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

	public void setUser_name(String user_name) {
		this.User_name = user_name;
	}

	public double getPhb_all() {
		return (0.0D + (int) (this.Phb_all * 100.0D)) / 100.0D;
	}

	public void setPhb_all(double phb_all) {
		this.Phb_all = phb_all;
	}

	public double getPhb_month() {
		return (0.0D + (int) (this.Phb_month * 100.0D)) / 100.0D;
	}

	public void setPhb_month(double phb_month) {
		this.Phb_month = phb_month;
	}

	public double getPhb_day() {
		return (0.0D + (int) (this.Phb_day * 100.0D)) / 100.0D;
	}

	public void setPhb_day(double phb_day) {
		this.Phb_day = phb_day;
	}

	public String getPhb_type() {
		return this.Phb_type;
	}

	public void setPhb_type(String phb_type) {
		this.Phb_type = phb_type;
	}
}