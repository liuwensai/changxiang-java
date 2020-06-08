(function(w,undefined){
	var loader = {};
	loader.pages = {};
	loader.home = new Page();

	function Page(o){
		o = o || {};
		this.name = o.name||"home";
		this.url = o.url||'index.html',
		this.init = typeof o.init == "function" ? o.init : function(){};
		this.reload = o.reload === true ? o.reload : false;
	}
	
	function query_url_param(search){
		var url = search || location.search;
		var q_param = new Object();
		if(url.indexOf("?") != -1){
			var strs = url.substr(1).split("&");
			for(var i = 0; i < strs.length; i++){
				q_param[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return q_param;
	}
	
	var pageloader = {
		addPage:function(page){
			if(page instanceof Page){
				loader.pages[page.name] = page;
			} else {
				console && console.error && console.error("the parme is not Page class");
			}
		},
		setHomePage:function(page){
			if(page instanceof Page){
				loader.home = page;
			} else {
				console && console.error && console.error("the parme is not Page class");
			}
		},
		getCurrentPage:function(){
			try{
				var hash = w.location.hash.substring(1);
				var maps = query_url_param(hash);
				return document.querySelector("[data-page='"+ maps.page +"']");
			}catch(e){
				return null;
			}
		},
		render:function(){
			_init();
		}
	};
	
	function $get(url,callback){
        var xhr = createXhrObject();
        callback = typeof callback != "function" ? function(){} : callback;
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState!=4) return;
            try{
                callback(xhr.responseText,xhr.status);
            }catch(e){
            	console && console.error && console.error(e);
            }
        };
        xhr.open("GET",url,true);
       
        xhr.send();
	}
	
	function hasScript(url){
		var scripts = document.querySelectorAll("script[src]");
		for(var i = 0; i < scripts.length; i++){
			if(url == scripts[i].src){
				return true;
			}
		}
		return false;
	}
	
	function createXhrObject(){
        var methods = [
            function(){ return new XMLHttpRequest();},
            function(){ return new ActiveXObject('Msxml2.XMLHTTP');},
            function(){ return new ActiveXObject('Microsoft.XMLHTTP');}
        ];
        for(var i=0;len=methods.length,i<len;i++){
            try{
                methods[i]();
            }catch(e){
                continue;
            }
            this.createXhrObject = methods[i];
            return methods[i]();
        }
        throw new Error('Could not create an XHR object.');
    }
	
	function scriptArrayLoad(srcipts){
		var re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;    
		var srcRe = /\ssrc=([\'\"])(.*?)([\'\"])/i;
		var attrRe = /\s([a-zA-Z_\-]+)=([\'\"])(.*?)([\'\"])/ig;
		if(!srcipts.length){
			return;
		}
		 var scriptStr = srcipts.shift();
		 var match = re.exec(scriptStr);
	     var attrs = match[1];
	     var srcMatch = attrs ? attrs.match(srcRe) : false;
	     if(srcMatch && srcMatch[2]){
	    	 var script = document.createElement("script");
	    	 script.src = srcMatch[2];
    		 if(script.src.indexOf("require.js") < 0 && hasScript(script.src)){
    			scriptArrayLoad(srcipts);
    			return;
    		 }
	    	 var attrMatch;
	    	 while(attrMatch = attrRe.exec(attrs)){
	    		 if(attrMatch && attrMatch[1] && attrMatch[1] != "src" && attrMatch[3]){
	    			 script.setAttribute(attrMatch[1], attrMatch[3]);
	    		 }
	    	 }
	    	 var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
	    	 head.insertBefore(script,head.firstChild);
	    	 script.onload = script.onreadystatechange = function() {
	 			if (script.readyState && /loaded|complete/.test(script.readyState)) {
	 				script.onreadystatechange = null;
	 			}
	 			scriptArrayLoad(srcipts);
	 		 };
	     }else if(match[2] && match[2].length > 0){
	    	 if(window.execScript) {
	        	  window.execScript(match[2]);
	          } else {
	        	  window.eval(match[2]);
	          }
	     }
	}
	
	function _loadPage(html,page,hash,maps){
		var re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;    
		var typeRe = /\stype=([\'\"])(.*?)([\'\"])/i;
		var match;
		
		var scripts = [];
		
		/*var divPage = $("<div/>",{
			"data-page":page.name,
			"html":html.replace(re,function(str,$one){
				var typeMatch = $one ? $one.match(typeRe) : false;
				if(typeMatch && typeMatch[2].indexOf("javascript") < 0){
					return str;
				}
				scripts.push(str);
				return "";
			})
		});*/
		
		var divPage = document.createElement("div");
		divPage.setAttribute("data-page", page.name);
		divPage.style.height = "100%";
		divPage.innerHTML = html = html.replace(re,function(str,$one){
			var typeMatch = $one ? $one.match(typeRe) : false;
			if(typeMatch && typeMatch[2].indexOf("javascript") < 0){
				return str;
			}
			scripts.push(str);
			return "";
		});
		
		document.body.appendChild(divPage);
		scriptArrayLoad(scripts);
		document.querySelector("[data-page='"+ page.name +"']").style.display = '';
		page.historyUrl = hash;
		page.html = html;
		try{
			page.init.call(divPage,maps);
		}catch(e){
			console && console.error && console.error(e);
		}
	}
	
	function _init(){
		var hash = w.location.hash.substring(1);
		var maps = query_url_param(hash);
		var pageName = maps["page"] || loader.home.name;
		var page = loader.pages[pageName];
		var $page = document.querySelector("[data-page='"+ pageName +"']");
		if(page && ((!$page || page.historyUrl != hash) || page.reload == true)){
			$page && document.body.removeChild($page);
			if(page.html){
				_loadPage(page.html,page,hash,maps);
			} else {
				$get(page.url,function(html){
					_loadPage(html,page,hash,maps);
				});
			}
		}
		if($page && current_huangye_parent_url){
			var backurl = $page.getAttribute("backurl");
			//var isHash = $page.getAttribute("ishash");
			if(backurl){current_huangye_parent_url = backurl;}
			//isHashBack = (isHash == "true");
		}
		var pages = document.querySelectorAll("[data-page]");
		for(var i = 0;pages && i < pages.length; i++){
			if(pages[i].getAttribute("data-page") == pageName){continue;}
			pages[i].style.display = 'none';
		}
		$page && ($page.style.display = '');
	}

	w.onhashchange = function(){
		document.body.scrollTop = 0;
		setTimeout(_init,100);
	};
	
	w.pageloader = pageloader;
	w.Page = Page;
	
})(window);