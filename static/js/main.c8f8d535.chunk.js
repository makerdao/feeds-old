(this.webpackJsonpfeeds=this.webpackJsonpfeeds||[]).push([[0],{130:function(e,t){},132:function(e,t){},154:function(e){e.exports=JSON.parse('[{"constant":true,"inputs":[],"name":"read","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"peek","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"zzz","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"}]')},155:function(e){e.exports=JSON.parse('[{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"","type":"bytes32"}],"name":"poke","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"poke","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"compute","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wat","type":"address"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wat","type":"address"}],"name":"unset","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"indexes","outputs":[{"name":"","type":"bytes12"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"next","outputs":[{"name":"","type":"bytes12"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"read","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"peek","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes12"}],"name":"values","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"min_","type":"uint96"}],"name":"setMin","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"void","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pos","type":"bytes12"},{"name":"wat","type":"address"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pos","type":"bytes12"}],"name":"unset","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"next_","type":"bytes12"}],"name":"setNext","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"min","outputs":[{"name":"","type":"uint96"}],"payable":false,"type":"function"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"}]')},156:function(e,t,n){},157:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),r=n(61),o=n.n(r),i=(n(68),n(19)),u=n(20),p=n(22),c=n(21),d=n(23),l=n(40),f=n.n(l),y=new f.a,m=n(62),h=n(6),b=n.n(h),w=function(e){return s.a.createElement("a",{href:e.href,title:e.title||e.text||"",target:"_blank",rel:"noopener noreferrer"},e.text||e.href)},x=n(41),v=n.n(x),k=function(e){function t(){return Object(i.a)(this,t),Object(p.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=y.toBigNumber(this.props.value).toFixed(3),t=v.a.duration(this.props.expires,"seconds").humanize(!0),n=this.props.updated?v.a.unix(this.props.updated).fromNow():this.props.updated,a=this.props.expires<0?"red":this.props.expires<2700?"orange":"#444",r="mainnet"===this.props.network?"":"".concat(this.props.network,".");return s.a.createElement("div",null,s.a.createElement("p",{style:{color:a}},s.a.createElement("b",null,this.props.idx+1)," ",e," ",this.props.valid&&this.props.expires>0?"expires":"expired"," ",t,".",n&&"Updated ".concat(n,".")," ",s.a.createElement(w,{href:"https://".concat(r,"etherscan.io/address/").concat(this.props.address),text:this.props.address})))}}]),t}(a.Component),E=n(154),D=n(155),g=function(e,t,n){return function(e,t){return t>0?new Array(t+1).join(e):""}(t,n-e.length)+e},O=function(e){return"0x".concat(g(function(e){return new y.BigNumber(e.replace(".","")).toString(16)}("".concat(e)),"0",24))},S=function(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),s=2;s<n;s++)a[s-2]=arguments[s];return new Promise((function(n,s){e[t].apply(e,a.concat([function(e,t){e?s(e):n(t)}]))}))},j=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(p.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(s)))).state={value:null,valid:null,show:"hide",feeds:{}},n.loadMedianizer=function(e){var t,a,s,r,o;return b.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return n.updateMedianizer(e),i.next=3,b.a.awrap(S(e,"next"));case 3:for(t=i.sent,a=y.toDecimal(t),s=[],r=1;r<a;r++)s.push(S(e,"values",O(r)));return i.next=10,b.a.awrap(Promise.all(s));case 10:o=i.sent,Object.values(o).forEach((function(e,t){"0x0000000000000000000000000000000000000000"!==e&&(o[e]={idx:t})})),n.setState({feeds:o}),o.forEach((function(t){"0x0000000000000000000000000000000000000000"!==t&&(n.updateFeed(t,!1),y.infura||y.eth.filter({address:t,fromBlock:"latest"},(function(t,a){t||(n.updateFeed(a.address,!0),n.updateMedianizer(e))})))}));case 14:case"end":return i.stop()}}))},n.updateMedianizer=function(e){var t,a,s;return b.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,b.a.awrap(S(e,"peek"));case 2:t=r.sent,a=y.fromWei(t[0]),s=t[1],n.setState({value:a,valid:s});case 6:case"end":return r.stop()}}))},n.updateFeed=function(e,t){var a,s,r,o,i,u;return b.a.async((function(p){for(;;)switch(p.prev=p.next){case 0:return a=y.eth.contract(E),window.fab=a,s=a.at(e),p.next=5,b.a.awrap(S(s,"peek"));case 5:return r=p.sent,p.next=8,b.a.awrap(S(s,"zzz"));case 8:return o=p.sent,p.next=11,b.a.awrap(S(s,"owner"));case 11:i=p.sent,(u=Object(m.a)({},n.state.feeds))[e]={value:y.fromWei(r[0]),zzz:y.toDecimal(o),expires:y.toDecimal(o)-Math.floor(Date.now()/1e3),owner:i,valid:r[1],updated:t?Math.floor(Date.now()/1e3):null,idx:u[e].idx},n.setState({feeds:u});case 15:case"end":return p.stop()}}))},n.updateExpirations=function(){var e=n.state.feeds;Object.keys(e).forEach((function(t){e[t].expires=y.toDecimal(e[t].zzz)-Math.floor(Date.now()/1e3)})),n.setState({feeds:e})},n.toggle=function(){var e=n.state.show;e="show"===e?"hide":"show",n.setState({show:e})},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=y.eth.contract(D).at(this.props.address);this.loadMedianizer(e)}},{key:"render",value:function(){var e=this,t=y.toBigNumber(this.state.value).toFixed(3),n=this.state.feeds,a="mainnet"===this.props.network?"":"".concat(this.props.network,".");return this.state.value?s.a.createElement("div",null,s.a.createElement("h1",null,this.props.title," ",t),s.a.createElement("h3",null,s.a.createElement(w,{href:"https://".concat(a,"etherscan.io/address/").concat(this.props.address),text:this.props.address})),s.a.createElement("p",null,s.a.createElement("button",{onClick:this.toggle},"Click to ","show"===this.state.show?"hide":"show"," details")),s.a.createElement("div",{className:this.state.show},Object.keys(n).map((function(t,a){return n[t].value&&s.a.createElement(k,Object.assign({network:e.props.network,key:a,address:t},n[t]))})))):s.a.createElement("h1",null,"Loading...")}}]),t}(a.Component),F=(n(156),function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(p.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(s)))).data={mainnet:[{address:"0x729D19f657BD0614b4985Cf1D82531c67569197B",title:"ETH/USD"},{address:"0x99041F808D598B782D5a3e498681C2452A31da08",title:"MKR/USD"},{address:"0x23E2953aca3cc872c51d0d9e59DDC19d8F923F80",title:"BAT/USD"},{address:"0x6ADaDdA09EA70f82Cf6BBC4c890fD040F6Fb3d4b",title:"POLY/USD"}],kovan:[{address:"0xa5aA4e07F5255E14F02B385b1f04b35cC50bdb66",title:"ETH/USD"},{address:"0xeBaa5D5cfe7F1201bebC6fb88240bBef285b4Fee",title:"MKR/USD"},{address:"0xFeB7d3aC74CB3c6d8E6Ae8882394F0C68363b944",title:"REP/USD"},{address:"0x8323ddE7e886684923599De7B719C984b5Cbd75b",title:"POLY/USD"}],rinkeby:[{address:"0xE39451e34f8FB108a8F6d4cA6C68dd38f37d26E3",title:"REP/USD"}]},n.state={network:null},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e,t=this;e=y,window.web3?e.setProvider(window.web3.currentProvider):(e.setProvider(new f.a.providers.HttpProvider("https://mainnet.infura.io/")),e.infura=!0),window.web3=e,y.version.getNetwork((function(e,n){e||(y.reset(!0),"42"===n?t.setState({network:"kovan"}):"4"===n?t.setState({network:"rinkeby"}):t.setState({network:"mainnet"}))}))}},{key:"render",value:function(){var e=this.state.network;return s.a.createElement("div",null,s.a.createElement("p",null,"Official ",e," Maker Feeds used for the Dai Stablecoin System. For more info visit ",s.a.createElement(w,{href:"https://chat.makerdao.com/channel/feeds"})),this.state.network&&s.a.createElement("div",null,s.a.createElement(s.a.StrictMode,null,this.data[e].map((function(t,n){return s.a.createElement(j,{key:n,network:e,address:t.address,title:t.title})})))))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},63:function(e,t,n){e.exports=n(157)},68:function(e,t,n){}},[[63,1,2]]]);
//# sourceMappingURL=main.c8f8d535.chunk.js.map