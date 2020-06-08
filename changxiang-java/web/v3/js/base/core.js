//扩展javascript原生类型开始
Array.prototype.filter = function(fn, thisp) {
	return (function(len, res, arr, val) {
		for ( var i = 0; i < len; i++) {
			if (i in arr) {
				val = arr[i];
				if (fn.call(thisp, val, i, arr)) {
					res[res.length] = val;
				}
			}
		}
		return res;
	})(this.length, [], this);
};

Array.prototype.indexOf = function(el, start) {
	var len = this.length;
	start = isNaN(start) ? 0 : (start < 0 ? (start + len) : start);
	for (; start < len; start++) {
		if (start in this && this[start] === el) {
			return start;
		}
	}
	return -1;
};

Array.prototype.unique = function() {
    var res = [], hash = {};
    for(var i=0, elem; (elem = this[i]) != null; i++)  {
        if (!hash[elem])
        {
            res.push(elem);
            hash[elem] = true;
        }
    }
    return res;
}

Array.prototype.map = function(fn, thisp) {
	return (function(arr, len, res) {
		for ( var i = 0; i < len; i++) {
			if (i in arr) {
				res[i] = fn.call(thisp, arr[i], i, this.arr);
			}
		}
		return res;
	})(this, this.length, new Array(this.length));
};

Array.prototype.foreach = function(cb, r) {// map
	var a = this;
	if (r) {
		for ( var i = 0, t, l = a.length; i < l; i++) {
			if ((t = cb(a[i], i)) != undefined) {
				r.push(t);// 复制到
			} else {
				for ( var i = a.length - 1; i >= 0; i--) {
					if ((a[i] = cb(a[i], i)) == undefined) {
						a.splice(i, 1);// 剪切出来
					}
				}
			}
			return r || a;
		}
	}
};

Array.prototype.remove = function(obj) {
	for ( var i = 0; i < this.length; ++i) {
		if (this[i] == obj) {
			this.splice(i, 1);
			break;
		}
	}
	return this;
};

Array.prototype.each = function(fn, thisp) {
	thisp = thisp || this;
	for ( var i = 0, j = thisp.length; i < j; i++) {
		if (fn.call(thisp, thisp[i], i, thisp) === false) {
			break;
		}
	}
	return thisp;
};

Array.prototype.reduce = function(fn) {
	return (function(A, arr, len, k, init) {
		if (A.length > 1) {
			init = A[1];
		} else {
			do {
				if (k in arr) {
					init = arr[k++];
					break;
				}
				if (++k >= len) {
					throw new TypeError();
				}
			} while (true)
		}
		while (k < len) {
			if (k in arr) {
				init = fn.call(null, init, arr[k], k, arr);
			}
			k++;
		}
		return init;
	})(arguments, this, this.length, 0);
};

Array.up = new Function('a, b',
'return parseFloat(a) - parseFloat(b) > 0 ? 1 : -1');

/*
 * 将数字转换为RMB @param prevfix 是否显示￥ @param n 保留小数点后面的位数
 */
Number.prototype.toRMB = function(prevfix, n) {
	return (prevfix === false ? '' : '\uffe5')
			+ this.toFixed(n === void 0 ? 2 : n).toString().replace(
					/(\d)(?=(\d{3})+($|\.))/g, '$1,');
};

Array.prototype.random = function() {
	var n, t, i, L = this.length, R = Math.random;
	for (i = L; i--;) {
		n = parseInt(R() * L);
		t = this[i];
		this[i] = this[n];
		this[n] = t;
	}
	return Array.prototype.slice.apply(this, arguments);
};
// 获取数组中每个元素出现的次数
// 返回格式：[["a",1]["b",2]]
Array.prototype.getByFrequency = function() {
	var a = this;
	var r = [], o = {};
	for ( var i = 0, l = a.length; i < l; i++) {
		o[a[i]] ? o[a[i]]++ : o[a[i]] = 1;
	}
	for ( var j in o)
		r.push([ j, o[j] ]);
	return r;
};
// 将数组元素累加
Array.prototype.sum = function() {
	var a = this;
	var n = 0;
	for ( var i = 0, l = a.length; i < l; i++)
		n += a[i];
	return n;
};

Array.prototype.multiple = function() {// 求积
	var a = this;
	var n = 1;
	for ( var i = 0, l = a.length; i < l; i++)
		n *= a[i];
	return n;
};
//过滤随机数中重复的数
Array.prototype.contains = function(obj) { 
	var i = this.length; 
	while (i--) { 
		if (this[i] === obj) { 
		return true; 
		} 
	} 
	return false; 
};

/*******************************************************************************
 * 扩展math方法
 ******************************************************************************/
// 求组合
Math.c = function(len, m) {
	return (function(n1, n2, j, i, n) {
		for (; j <= m;) {
			n2 *= j++;
			n1 *= i--;
		}
		return n1 / n2;
	})(1, 1, 1, len, len);
};
Math.cl = function(arr, n, z) { // z is max count
	var r = [];
	fn([], arr, n);
	return r;
	function fn(t, a, n) {
		if (n === 0 || z && r.length == z) {
			return r[r.length] = t;
		}
		for ( var i = 0, l = a.length - n; i <= l; i++) {
			if (!z || r.length < z) {
				fn(t.concat(a[i]), a.slice(i + 1), n - 1);
			}
		}
	}
};
Math.ck = function(arr, n, z) { // z is max count
	var r = [];
	fn([], arr, n);
	return r;
	function fn(t, a, n) {
		if (n === 0 || z && r.length == z) {
			return r[r.length] = t;
		}
		for ( var i = 0, l = a.length - n; i <= l; i++) {
			if (!z || r.length < z) {
				fn(t.concat([a[i]]), a.slice(i + 1), n - 1);
			}
		}
	}
};
Math.cm = function(arr, n, z) { // z is max count
	var r = [];
	for(var i=0,j=arr.length;i<j;i++){
	fn([], arr[i], n);
	}
	return r;
	function fn(t, a, n) {
		if (n === 0 || z && r.length == z) {
			return r[r.length] = t;
		}
		for ( var i = 0, l = a.length - n; i <= l; i++) {
			if (!z || r.length < z) {
				fn(t.concat(a[i]), a.slice(i + 1), n - 1);
			}
		}
	}
};
Math.p = function(n, m) {
	for ( var i = n - m, c = 1; i < n;) {
		c *= ++i;
	}
	return c;
};
Math.pl = function(arr, n, z) {
	var r = [];
	fn([], arr, n);
	return r;
	function fn(t, a, n) {
		if (n === 0 || z && r.length == z) {
			return r[r.length] = t;
		}
		for ( var i = 0, l = a.length; i < l; i++) {
			if (!z || r.length < z) {
				fn(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
			}
		}
	}
};
// 拆成x个n串m
Math.dt = function(d, t, m) {
	return d >= m ? 0 : Math.c(t, m - d);
};
// 拆成x个n串m
Math.dtl = function(d, t, n, z) {
	var r = [];
	if (d.length <= n) {
		r = Math.cl(t, n - d.length, z);
		for ( var i = r.length; i--;) {
			r[i] = d.concat(r[i]);
		}
	}
	return r;
};

//二维数组的定位组合
Math.al = function (A2, fn){
	var n = 0,
		codes = [],
		code = [],
		isTest = typeof fn == 'function',
		stop;	
	each(A2, n);
	function each(A2, n){
		if (stop || n >= A2.length) {
			if (isTest && false === fn(code)) {
				stop = true;
			}else{
				codes.push(code.slice());
				var len=code.length
				len= n - 1;				
			}
		}else{
			var cur = A2[n];
			for (var i = 0, j = cur.length; i < j; i++) {
				code.push(cur[i]);
				each(A2, n+1);
			}
			if (n) {
				code.length = n - 1;
			}
		}
	}
	return codes;
};

/*
 * 扩展String原型
 * */

/*
 * 替换字符串的占位符
 * */
String.prototype.tpl= function(o, def) {
	var ns, prop;
	def = def === void(0) ? '': def;
	return this.replace(/\{\$([^$\}]+?)\}/g, function(all, ns) {
			ns = ns.split('.');
		prop = o;
		try {
			while (ns.length) {
				prop = prop[ns.shift()];
			}
		} catch(e) {
			prop = def;
		}
		return prop === void(0) ? def: prop;
	});
};

Date.prototype.format=function(tpl, fn) {
	var strs, w, keys, year, val;
	strs = [];
	tpl = tpl || 'YY\u5e74MM\u6708DD\u65e5 \u661f\u671fdd';
	w = 'FullYear,Month,Date,Hours,Minutes,Seconds,Day'.split(',');
	keys = [/YY/g, /Y/g, /MM/g, /M/g, /DD/g, /D/g, /hh/g, /h/g, /mm/g, /m/g, /ss/g, /s/g, /dd/g, /d/g];
	for (var i = 0; i < 7; i++) {
		val = this['get' + w[i]]() + (w[i] === 'Month' ? 1 : 0);
		strs.push(('0' + val).slice( - 2), val);
	}
	year = [strs[1], strs[0]].concat(strs.slice(2, -2));
	year.push('\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d'.substr(strs.slice( - 1), 1), strs.slice( - 1));
	for (var i = 0; i < 14; i++) {
		tpl = tpl.replace(keys[i], year[i]);
	}
	return fn ? fn(tpl) : tpl;
};







var core={};


core.arrayEach=function(a, cb, r){
	if(r) for(var i=0,t,l=a.length;i<l;i++)(t=cb(a[i],i))!=undefined&&r.push(t);
	else for(var i=a.length-1;i>=0;i--)(a[i]=cb(a[i],i))==undefined&&a.splice(i,1);
	return r||a;
};

//数组相加
core.arrayAdd=function(a){
	var n = 0;
	for (var i=0,l=a.length;i<l;i++) n+=a[i];
	return n;
};

//数组相乘
core.arrayMultiple=function(a){
	var n = 1;
	for (var i=0,l=a.length;i<l;i++) n*=a[i];
	return n;
};

//获取索引号
core.arrayGetIdx=function(a, v){
	for (var i=0,l=a.length;i<l&&a[i]!=v;i++);
	return i<l ? i : -1;
};

//组合结果
core.mathCR=function (arr, num){
	var r = [];
	(function f(t,a,n,r){
		if(n==0) return r.push(t);
		for(var i=0,l=a.length-n; i<=l; i++){
			f(t.concat(a[i]), a.slice(i+1), n-1,r);
		}
	})([],arr,num,r);
	return r;
};

/*
 * 获取数组中每个元素的长度
 * */
core.arrayGetNum=function (a){
	var r = [], o = {};
	for (var i=0,l=a.length; i<l; i++){
		o[a[i]] ? o[a[i]]++ : o[a[i]]=1;
	}
	for (var j in o) r.push([j,o[j]]);
	return r;
};

/*
 * 将一组投注按投注方式拆分并返回为一个数组
 * @param:a [3,3,2] 选的场次的个数相同的个数 
 * @param:num 几串1. 如[3,2]表示3串1和2串1
 * */
core.esunjsC=function (a, num) {
	if (typeof(a[0])=="number") a=core.arrayGetNum(a);
	if (typeof(num)=="number") num=[num];
	var r = 0;
	var n = a.length;
	var ff = function (n,i){ return Math.pow(a[i][0],n) * Math.c(a[i][1],n); };
	(function f(t,i){
		if(i==n){
			if (core.arrayGetIdx(num, core.arrayAdd(t))>-1) r +=core. arrayMultiple(core.arrayEach(t,ff,[]));
			return;
		}
		for(var j=0; j<=a[i][1]; j++) f(t.concat(j), i+1);
	})([], 0);
	return r;
};