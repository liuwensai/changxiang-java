/*
 * 通用代码实现。
 */
(function ($) {
    $.extend($, {
        cssPrefix: (function () {                                   //用户获取当前浏览器CSS3支持的前缀，如：$.cssPrefix.animationPrefix。
            var domStyle = document.createElement("div").style,
                animPrefix = ['a', "webkitA", "mozA", "OA", "msA"],
                tranPrefix = ['t', "webkitT", "mozT", "OT", "msT"],
                prefix = {};

            for (var i = 0; i < animPrefix.length; i++) {
                if (animPrefix[i] + "nimation" in domStyle) {
                    prefix.animationPrefix = animPrefix[i].substr(1);

                    break;
                }
            }

            for (var i = 0; i < tranPrefix.length; i++) {
                if (tranPrefix[i] + "ransition" in domStyle) {
                    prefix.transitionPrefix = tranPrefix[i].substr(1);

                    break;
                }
            }

            for (var i = 0; i < tranPrefix.length; i++) {
                if (tranPrefix[i] + "ransform" in domStyle) {
                    prefix.transformPrefix = tranPrefix[i].substr(1);

                    break;
                }
            }

            return prefix;
        })(),
        query: function () {                                        //实现jQuery能一次查询多个对象，如：$("body", "div")
            if (arguments.length) {
                var result = $(arguments[0]);

                for (var i = 1; i < arguments.length; i++) {
                    $.merge(result, $(arguments[i]));
                }

                return result;
            }

            return $();
        },
        zerofill: function (number, len) {                                     //对数字进行补零操作，如：$.zerofill(1, 4)返回"0001"
            len = len || 2;

            number = parseInt(number).toString();

            if (number.length < len) {
                for (var i = number.length; i < len; i++) {
                    number = "0" + number;
                }
            }

            return number;
        },
        limitNumber: function (tag, max, min) {
            min = min || 1;

            var val = tag.value,
                oldVal = $(tag).attr("data-old") || "";

            if (!val)
                return;

            if (!/^\d+$/.test(val)) {
                tag.value = oldVal;
            } else {
                val = parseInt(val);

                if (val > max)
                    val = max;
                else if (val < min)
                    val = min;

                $(tag).attr("data-old", val);

                tag.value = val;
            }
        },
        checkForm: function (containerID, promptFunction) {
            promptFunction = promptFunction || $.alert;

            var result = {};

            $("#" + containerID).find("*[data-regex]").each(function () {
                var tag = $(this),
                    regexsStr = tag.attr("data-regex"),
                    allowEmpty = tag.attr("data-empty") == "true",
                    isTrim = tag.attr("data-trim"),
                    val = tag.val();

                isTrim = isTrim == null || isTrim == undefined ? true : isTrim !== "false";

                if (isTrim)
                    val = $.trim(val);

                if (regexsStr && (!allowEmpty || val)) {
                    var regexs = eval("(" + tag.attr("data-regex") + ")"),
                        prompts = eval("(" + tag.attr("data-prompt") + ")");

                    if (regexs && prompts && prompts.length === regexs.length) {
                        var isPrompt = false;

                        for (var i = 0; i < regexs.length; i++) {
                            if ($.type(regexs[i]) === "string")
                                isPrompt = $("#" + regexs[i]).val() != val;
                            else
                                isPrompt = !regexs[i].test(val);

                            if (isPrompt) {
                                promptFunction(prompts[i], function () {
                                    tag.focus();
                                });

                                result = null;

                                return false;
                            } else {
                                result[tag.attr("name")] = val;
                            }
                        }
                    }
                } else {
                    result[tag.attr("name")] = val;
                }
            });

            return result;
        },
        getProductResult: function (startNumber, stopNumber) {
            var result = stopNumber;

            while (stopNumber > startNumber) {
                result = result * (--stopNumber);
            }

            return result;
        }
    });
    $.extend($.fn, {
        animationEnd: function (callback, isUnbind) {
            if (!$.isFunction(callback))
                return this;

            isUnbind = arguments.length === 1 ? true : isUnbind;

            if (isUnbind) {
                var temp = callback;

                callback = function (e) {
                    $(this).unAnimationEnd(callback);

                    temp.call(this, e);
                };
            }

            return this.bind(!$.cssPrefix.animationPrefix ? "animationend" : $.cssPrefix.animationPrefix + "AnimationEnd", callback);
        },
        unAnimationEnd: function (callback) {
            if (!$.isFunction(callback))
                return this;

            return this.unbind(!$.cssPrefix.animationPrefix ? "animationend" : $.cssPrefix.animationPrefix + "AnimationEnd", callback);
        },
        transitionEnd: function (callback, isUnbind) {
            if (!$.isFunction(callback))
                return this;

            isUnbind = arguments.length === 1 ? true : isUnbind;

            if (isUnbind) {
                var temp = callback;

                callback = function (e) {
                    $(this).unTransitionEnd(callback);

                    temp.call(this, e);
                };
            }

            return this.bind(!$.cssPrefix.transitionPrefix ? "transitionend" : $.cssPrefix.transitionPrefix + "TransitionEnd", callback);
        },
        unTransitionEnd: function (callback) {
            if (!$.isFunction(callback))
                return this;

            return this.unbind(!$.cssPrefix.transitionPrefix ? "transitionend" : $.cssPrefix.transitionPrefix + "TransitionEnd", callback);
        },
        css3: function (name, value) {
            if (arguments.length === 1) {
                if ($.cssPrefix.animationPrefix && name.indexOf("animation") === 0)
                    return this.css($.cssPrefix.animationPrefix + name.replace("animation", $.cssPrefix.animationPrefix + "Animation"));
                else if ($.cssPrefix.transitionPrefix && name.indexOf("transition") === 0)
                    return this.css($.cssPrefix.transitionPrefix + name.replace("transition", $.cssPrefix.transitionPrefix + "Transition"));
                else if ($.cssPrefix.transformPrefix && name.indexOf("transform") === 0)
                    return this.css($.cssPrefix.transformPrefix + name.replace("transform", $.cssPrefix.transformPrefix + "Transform"));

                return this.css(name);
            } else {
                if ($.type(name) !== "string") {
                    for (var key in name) {
                        this.css3(key, name[key]);
                    }
                } else {
                    if ($.cssPrefix.animationPrefix && name.indexOf("animation") === 0)
                        return this.css($.cssPrefix.animationPrefix + name.replace("animation", $.cssPrefix.animationPrefix + "Animation"), value);
                    else if ($.cssPrefix.transitionPrefix && name.indexOf("transition") === 0)
                        return this.css($.cssPrefix.transitionPrefix + name.replace("transition", $.cssPrefix.transitionPrefix + "Transition"), value);
                    else if ($.cssPrefix.transformPrefix && name.indexOf("transform") === 0)
                        return this.css($.cssPrefix.transformPrefix + name.replace("transform", $.cssPrefix.transformPrefix + "Transform"), value);
                    else
                        return this.css(name, value);
                }
            }
        }
    });
})(jQuery);