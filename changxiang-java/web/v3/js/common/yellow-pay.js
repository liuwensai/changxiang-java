/**黄页支付**/
// Helper method for call Yellowpage native methods by allex.
function callNative(fn) {
(function(e){var t="MiuiYellowPageApi",n=function(t){try{e(t)}catch(n){alert(n.message)}}
,r=window,i=r[t];i?n(i):document.addEventListener("yellowpageApiReady",
function(e){setTimeout(function(){n(r[t])},1)})})
(function(api) { fn(api); });
}

// Call api method example
callNative(function(api) {
  api.call('setTitle', '小米彩票-充值');
});