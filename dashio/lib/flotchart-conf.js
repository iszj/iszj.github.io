var Script=function(){var a;$((function(){for(var t=[],e=[],i=0;i<14;i+=.1)t.push([i,Math.sin(i)]),e.push([i,Math.cos(i)]);a=$.plot($("#chart-1"),[{data:t,label:"sin(x) = -0.00"},{data:e,label:"cos(x) = -0.00"}],{series:{lines:{show:!0}},crosshair:{mode:"x"},grid:{hoverable:!0,autoHighlight:!1},yaxis:{min:-1.2,max:1.2}});var n=$("#chart-1 .legendLabel");n.each((function(){$(this).css("width",$(this).width())}));var s=null,o=null;function r(){s=null;var t=o,e=a.getAxes();if(!(t.x<e.xaxis.min||t.x>e.xaxis.max||t.y<e.yaxis.min||t.y>e.yaxis.max)){var i,r,l=a.getData();for(i=0;i<l.length;++i){var h=l[i];for(r=0;r<h.data.length&&!(h.data[r][0]>t.x);++r);var d,c=h.data[r-1],u=h.data[r];d=null==c?u[1]:null==u?c[1]:c[1]+(u[1]-c[1])*(t.x-c[0])/(u[0]-c[0]),n.eq(i).text(h.label.replace(/=.*/,"= "+d.toFixed(2)))}}}$("#chart-1").bind("plothover",(function(a,t,e){o=t,s||(s=setTimeout(r,50))}))})),$((function(){var a=[{label:"United States",data:[[1990,18.9],[1991,18.7],[1992,18.4],[1993,19.3],[1994,19.5],[1995,19.3],[1996,19.4],[1997,20.2],[1998,19.8],[1999,19.9],[2e3,20.4],[2001,20.1],[2002,20],[2003,19.8],[2004,20.4]]},{label:"Russia",data:[[1992,13.4],[1993,12.2],[1994,10.6],[1995,10.2],[1996,10.1],[1997,9.7],[1998,9.5],[1999,9.7],[2e3,9.9],[2001,9.9],[2002,9.9],[2003,10.3],[2004,10.5]]},{label:"United Kingdom",data:[[1990,10],[1991,11.3],[1992,9.9],[1993,9.6],[1994,9.5],[1995,9.5],[1996,9.9],[1997,9.3],[1998,9.2],[1999,9.2],[2e3,9.5],[2001,9.6],[2002,9.3],[2003,9.4],[2004,9.79]]},{label:"Germany",data:[[1990,12.4],[1991,11.2],[1992,10.8],[1993,10.5],[1994,10.4],[1995,10.2],[1996,10.5],[1997,10.2],[1998,10.1],[1999,9.6],[2e3,9.7],[2001,10],[2002,9.7],[2003,9.8],[2004,9.79]]},{label:"Denmark",data:[[1990,9.7],[1991,12.1],[1992,10.3],[1993,11.3],[1994,11.7],[1995,10.6],[1996,12.8],[1997,10.8],[1998,10.3],[1999,9.4],[2e3,8.7],[2001,9],[2002,8.9],[2003,10.1],[2004,9.8]]},{label:"Sweden",data:[[1990,5.8],[1991,6],[1992,5.9],[1993,5.5],[1994,5.7],[1995,5.3],[1996,6.1],[1997,5.4],[1998,5.4],[1999,5.1],[2e3,5.2],[2001,5.4],[2002,6.2],[2003,5.9],[2004,5.89]]},{label:"Norway",data:[[1990,8.3],[1991,8.3],[1992,7.8],[1993,8.3],[1994,8.4],[1995,5.9],[1996,6.4],[1997,6.7],[1998,6.9],[1999,7.6],[2e3,7.4],[2001,8.1],[2002,12.5],[2003,9.9],[2004,19]]}],t={series:{lines:{show:!0},points:{show:!0}},legend:{noColumns:2},xaxis:{tickDecimals:0},yaxis:{min:0},selection:{mode:"x"}},e=$("#chart-2");e.bind("plotselected",(function(n,s){$("#selection").text(s.xaxis.from.toFixed(1)+" to "+s.xaxis.to.toFixed(1)),$("#zoom").attr("checked")&&(i=$.plot(e,a,$.extend(!0,{},t,{xaxis:{min:s.xaxis.from,max:s.xaxis.to}})))})),e.bind("plotunselected",(function(a){$("#selection").text("")}));var i=$.plot(e,a,t);$("#clearSelection").click((function(){i.clearSelection()})),$("#setSelection").click((function(){i.setSelection({xaxis:{from:1994,to:1995}})}))})),$((function(){var a=[];function t(){for(a.length>0&&(a=a.slice(1));a.length<300;){var t=(a.length>0?a[a.length-1]:50)+10*Math.random()-5;t<0&&(t=0),t>100&&(t=100),a.push(t)}for(var e=[],i=0;i<a.length;++i)e.push([i,a[i]]);return e}var e=30;$("#updateInterval").val(e).change((function(){var a=$(this).val();a&&!isNaN(+a)&&((e=+a)<1&&(e=1),e>2e3&&(e=2e3),$(this).val(""+e))}));var i=$.plot($("#chart-3"),[t()],{series:{shadowSize:0},yaxis:{min:0,max:100},xaxis:{show:!1}});!function a(){i.setData([t()]),i.draw(),setTimeout(a,e)}()})),$((function(){for(var a=[],t=0;t<14;t+=.5)a.push([t,Math.sin(t)]);var e=[];for(t=0;t<14;t+=.5)e.push([t,Math.cos(t)]);var i=[];for(t=0;t<14;t+=.1)i.push([t,Math.sqrt(10*t)]);var n=[];for(t=0;t<14;t+=.5)n.push([t,Math.sqrt(t)]);var s=[];for(t=0;t<14;t+=.5+Math.random())s.push([t,Math.sqrt(2*t+Math.sin(t)+5)]);$.plot($("#chart-4"),[{data:a,lines:{show:!0,fill:!0}},{data:[[0,3],[4,8],[8,5],[9,13]],bars:{show:!0}},{data:e,points:{show:!0}},{data:i,lines:{show:!0}},{data:n,lines:{show:!0},points:{show:!0}},{data:s,lines:{show:!0,steps:!0}}])})),$((function(){for(var a=[],t=0;t<=10;t+=1)a.push([t,parseInt(30*Math.random())]);var e=[];for(t=0;t<=10;t+=1)e.push([t,parseInt(30*Math.random())]);var i=[];for(t=0;t<=10;t+=1)i.push([t,parseInt(30*Math.random())]);var n=0,s=!0,o=!1,r=!1;function l(){$.plot($("#chart-5"),[a,e,i],{series:{stack:n,lines:{show:o,fill:!0,steps:r},bars:{show:s,barWidth:.6}}})}l(),$(".stackControls input").click((function(a){a.preventDefault(),n="With stacking"==$(this).val()||null,l()})),$(".graphControls input").click((function(a){a.preventDefault(),s=-1!=$(this).val().indexOf("Bars"),o=-1!=$(this).val().indexOf("Lines"),r=-1!=$(this).val().indexOf("steps"),l()}))})),$((function(){for(var a=[],t=Math.floor(10*Math.random())+1,e=0;e<t;e++)a[e]={label:"Series"+(e+1),data:Math.floor(100*Math.random())+1};$.plot($("#graph1"),a,{series:{pie:{show:!0}},legend:{show:!1}}),$.plot($("#graph2"),a,{series:{pie:{show:!0,radius:1,label:{show:!0,radius:1,formatter:function(a,t){return'<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+a+"<br/>"+Math.round(t.percent)+"%</div>"},background:{opacity:.8}}}},legend:{show:!1}}),$.plot($("#graph3"),a,{series:{pie:{show:!0,radius:1,label:{show:!0,radius:3/4,formatter:function(a,t){return'<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+a+"<br/>"+Math.round(t.percent)+"%</div>"},background:{opacity:.5}}}},legend:{show:!1}}),$.plot($("#donut"),a,{series:{pie:{innerRadius:.5,show:!0}}})}))}();