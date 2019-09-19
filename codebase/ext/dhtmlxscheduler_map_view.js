/*

@license
dhtmlxScheduler v.5.2.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){e.xy.map_date_width=188,e.xy.map_icon_width=25,e.xy.map_description_width=400,e.config.map_resolve_event_location=!0,e.config.map_resolve_user_location=!0,e.config.map_initial_position=new google.maps.LatLng(48.724,8.215),e.config.map_error_position=new google.maps.LatLng(15,15),e.config.map_infowindow_max_width=300,e.config.map_type=google.maps.MapTypeId.ROADMAP,e.config.map_zoom_after_resolve=15,e.locale.labels.marker_geo_success="It seems you are here.",
e.locale.labels.marker_geo_fail="Sorry, could not get your current position using geolocation.",e.templates.marker_date=e.date.date_to_str("%Y-%m-%d %H:%i"),e.templates.marker_text=function(t,a,i){return"<div><b>"+i.text+"</b><br/><br/>"+(i.event_location||"")+"<br/><br/>"+e.templates.marker_date(t)+" - "+e.templates.marker_date(a)+"</div>"},e.dblclick_dhx_map_area=function(){!this.config.readonly&&this.config.dblclick_create&&this.addEventNow({start_date:e._date,
end_date:e.date.add(e._date,e.config.time_step,"minute")})},e.templates.map_time=function(t,a,i){return i._timed?this.day_date(i.start_date,i.end_date,i)+" "+this.event_date(t):e.templates.day_date(t)+" &ndash; "+e.templates.day_date(a)},e.templates.map_text=function(e,t,a){return a.text},e.date.map_start=function(e){return e},e.date.add_map=function(e,t,a){return new Date(e.valueOf())},e.templates.map_date=function(e,t,a){return""},e._latLngUpdate=!1,e.attachEvent("onSchedulerReady",function(){
function t(t){if(t){var a=e.locale.labels;e._els.dhx_cal_header[0].innerHTML="<div class='dhx_map_line' style='width: "+(e.xy.map_date_width+e.xy.map_description_width+2)+"px;' ><div class='headline_date' style='width: "+e.xy.map_date_width+"px;'>"+a.date+"</div><div class='headline_description' style='width: "+e.xy.map_description_width+"px;'>"+a.description+"</div></div>",e._table_view=!0,e.set_sizes()}}function a(){e._selected_event_id=null,e.map._infowindow.close();var t=e.map._markers
;for(var a in t)t.hasOwnProperty(a)&&(t[a].setMap(null),delete e.map._markers[a],e.map._infowindows_content[a]&&delete e.map._infowindows_content[a])}function i(){var t=e.get_visible_events();t.sort(function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1});for(var a=e._waiAria.mapAttrString(),i="<div "+a+" class='dhx_map_area'>",n=0;n<t.length;n++){
var r=t[n],o=r.id==e._selected_event_id?"dhx_map_line highlight":"dhx_map_line",d=r.color?"background:"+r.color+";":"",l=r.textColor?"color:"+r.textColor+";":"",a=e._waiAria.mapRowAttrString(r),s=e._waiAria.mapDetailsBtnString()
;i+="<div "+a+" class='"+o+"' event_id='"+r.id+"' style='"+d+l+(r._text_style||"")+" width: "+(e.xy.map_date_width+e.xy.map_description_width+2)+"px;'><div class='dhx_map_event_time' style='width: "+e.xy.map_date_width+"px;' >"+e.templates.map_time(r.start_date,r.end_date,r)+"</div>",i+="<div "+s+" class='dhx_event_icon icon_details'>&nbsp;</div>",
i+="<div class='line_description' style='width:"+(e.xy.map_description_width-e.xy.map_icon_width)+"px;'>"+e.templates.map_text(r.start_date,r.end_date,r)+"</div></div>"}i+="<div class='dhx_v_border' style='left: "+(e.xy.map_date_width-2)+"px;'></div><div class='dhx_v_border_description'></div></div>",e._els.dhx_cal_data[0].scrollTop=0,e._els.dhx_cal_data[0].innerHTML=i,e._els.dhx_cal_data[0].style.width=e.xy.map_date_width+e.xy.map_description_width+1+"px"
;var _=e._els.dhx_cal_data[0].firstChild.childNodes;e._els.dhx_cal_date[0].innerHTML=e.templates[e._mode+"_date"](e._min_date,e._max_date,e._mode),e._rendered=[];for(var n=0;n<_.length-2;n++)e._rendered[n]=_[n]}function n(t){var a=document.getElementById(t),i=e._y-e.xy.nav_height;i<0&&(i=0);var n=e._x-e.xy.map_date_width-e.xy.map_description_width-1;n<0&&(n=0),a.style.height=i+"px",a.style.width=n+"px",a.style.marginLeft=e.xy.map_date_width+e.xy.map_description_width+1+"px",
a.style.marginTop=e.xy.nav_height+2+"px"}e._isMapPositionSet=!1;var r=document.createElement("div");r.className="dhx_map",r.id="dhx_gmap",r.style.dispay="none",e._obj.appendChild(r),e._els.dhx_gmap=[],e._els.dhx_gmap.push(r),n("dhx_gmap");var o={zoom:e.config.map_inital_zoom||10,center:e.config.map_initial_position,mapTypeId:e.config.map_type||google.maps.MapTypeId.ROADMAP},d=new google.maps.Map(document.getElementById("dhx_gmap"),o);d.disableDefaultUI=!1,
d.disableDoubleClickZoom=!e.config.readonly,google.maps.event.addListener(d,"dblclick",function(t){if(!e.config.readonly&&e.config.dblclick_create){var a=t.latLng;geocoder.geocode({latLng:a},function(t,i){i==google.maps.GeocoderStatus.OK&&(a=t[0].geometry.location,e.addEventNow({lat:a.lat(),lng:a.lng(),event_location:t[0].formatted_address,start_date:e._date,end_date:e.date.add(e._date,e.config.time_step,"minute")}))})}});var l={content:""}
;e.config.map_infowindow_max_width&&(l.maxWidth=e.config.map_infowindow_max_width),e.map={_points:[],_markers:[],_infowindow:new google.maps.InfoWindow(l),_infowindows_content:[],_initialization_count:-1,_obj:d},geocoder=new google.maps.Geocoder,e.config.map_resolve_user_location&&navigator.geolocation&&(e._isMapPositionSet||navigator.geolocation.getCurrentPosition(function(t){var a=new google.maps.LatLng(t.coords.latitude,t.coords.longitude);d.setCenter(a),
d.setZoom(e.config.map_zoom_after_resolve||10),e.map._infowindow.setContent(e.locale.labels.marker_geo_success),e.map._infowindow.position=d.getCenter(),e.map._infowindow.open(d),e._isMapPositionSet=!0},function(){e.map._infowindow.setContent(e.locale.labels.marker_geo_fail),e.map._infowindow.setPosition(d.getCenter()),e.map._infowindow.open(d),e._isMapPositionSet=!0})),google.maps.event.addListener(d,"resize",function(e){r.style.zIndex="5",d.setZoom(d.getZoom())}),
google.maps.event.addListener(d,"tilesloaded",function(e){r.style.zIndex="5"}),r.style.display="none";var s=e.render_data;e.render_data=function(t,a){if("map"!=this._mode)return s.apply(this,arguments);i();for(var n=e.get_visible_events(),r=0;r<n.length;r++)e.map._markers[n[r].id]||c(n[r],!1,!1)},e.map_view=function(r){e.map._initialization_count++;var o,d=e._els.dhx_gmap[0];if(e._els.dhx_cal_data[0].style.width=e.xy.map_date_width+e.xy.map_description_width+1+"px",
e._min_date=e.config.map_start||e._currentDate(),e._max_date=e.config.map_end||e.date.add(e._currentDate(),1,"year"),e._table_view=!0,t(r),r){a(),i(),d.style.display="block",n("dhx_gmap"),o=e.map._obj.getCenter();for(var l=e.get_visible_events(),s=0;s<l.length;s++)e.map._markers[l[s].id]||c(l[s])}else d.style.display="none";google.maps.event.trigger(e.map._obj,"resize"),0===e.map._initialization_count&&o&&e.map._obj.setCenter(o),e._selected_event_id&&_(e._selected_event_id)};var _=function(t){
e.map._obj.setCenter(e.map._points[t]),e.callEvent("onClick",[t])},c=function(t,a,i){var n=e.config.map_error_position;t.lat&&t.lng&&(n=new google.maps.LatLng(t.lat,t.lng));var r=e.templates.marker_text(t.start_date,t.end_date,t);e._new_event||(e.map._infowindows_content[t.id]=r,e.map._markers[t.id]&&e.map._markers[t.id].setMap(null),e.map._markers[t.id]=new google.maps.Marker({position:n,map:e.map._obj}),google.maps.event.addListener(e.map._markers[t.id],"click",function(){
e.map._infowindow.setContent(e.map._infowindows_content[t.id]),e.map._infowindow.open(e.map._obj,e.map._markers[t.id]),e._selected_event_id=t.id,e.render_data()}),e.map._points[t.id]=n,a&&e.map._obj.setCenter(e.map._points[t.id]),i&&e.callEvent("onClick",[t.id]))};e.attachEvent("onClick",function(t,a){if("map"==this._mode){e._selected_event_id=t;for(var i=0;i<e._rendered.length;i++)e._rendered[i].className="dhx_map_line",
e._rendered[i].getAttribute("event_id")==t&&(e._rendered[i].className+=" highlight");e.map._points[t]&&e.map._markers[t]&&(e.map._obj.setCenter(e.map._points[t]),google.maps.event.trigger(e.map._markers[t],"click"))}return!0});var u=function(t){t.event_location&&geocoder?geocoder.geocode({address:t.event_location,language:e.uid().toString()},function(a,i){var n={}
;i!=google.maps.GeocoderStatus.OK?(n=e.callEvent("onLocationError",[t.id]))&&!0!==n||(n=e.config.map_error_position):n=a[0].geometry.location,t.lat=n.lat(),t.lng=n.lng(),e._selected_event_id=t.id,e._latLngUpdate=!0,e.callEvent("onEventChanged",[t.id,t]),c(t,!0,!0)}):c(t,!0,!0)},h=function(t){t.event_location&&geocoder&&geocoder.geocode({address:t.event_location,language:e.uid().toString()},function(a,i){var n={}
;i!=google.maps.GeocoderStatus.OK?(n=e.callEvent("onLocationError",[t.id]))&&!0!==n||(n=e.config.map_error_position):n=a[0].geometry.location,t.lat=n.lat(),t.lng=n.lng(),e._latLngUpdate=!0,e.callEvent("onEventChanged",[t.id,t])})},p=function(e,t,a,i){setTimeout(function(){var i=e.apply(t,a);return e=t=a=null,i},i||1)};e.attachEvent("onEventChanged",function(t,a){if(this._latLngUpdate)this._latLngUpdate=!1;else{var i=e.getEvent(t)
;i.start_date<e._min_date&&i.end_date>e._min_date||i.start_date<e._max_date&&i.end_date>e._max_date||i.start_date.valueOf()>=e._min_date&&i.end_date.valueOf()<=e._max_date?(e.map._markers[t]&&e.map._markers[t].setMap(null),u(i)):(e._selected_event_id=null,e.map._infowindow.close(),e.map._markers[t]&&e.map._markers[t].setMap(null))}return!0}),e.attachEvent("onEventIdChange",function(t,a){var i=e.getEvent(a)
;return(i.start_date<e._min_date&&i.end_date>e._min_date||i.start_date<e._max_date&&i.end_date>e._max_date||i.start_date.valueOf()>=e._min_date&&i.end_date.valueOf()<=e._max_date)&&(e.map._markers[t]&&(e.map._markers[t].setMap(null),delete e.map._markers[t]),e.map._infowindows_content[t]&&delete e.map._infowindows_content[t],u(i)),!0}),e.attachEvent("onEventAdded",function(t,a){
return e._dataprocessor||(a.start_date<e._min_date&&a.end_date>e._min_date||a.start_date<e._max_date&&a.end_date>e._max_date||a.start_date.valueOf()>=e._min_date&&a.end_date.valueOf()<=e._max_date)&&(e.map._markers[t]&&e.map._markers[t].setMap(null),u(a)),!0}),e.attachEvent("onBeforeEventDelete",function(t,a){return e.map._markers[t]&&e.map._markers[t].setMap(null),e._selected_event_id=null,e.map._infowindow.close(),!0}),e._event_resolve_delay=1500,e.attachEvent("onEventLoading",function(t){
return e.config.map_resolve_event_location&&t.event_location&&!t.lat&&!t.lng&&(e._event_resolve_delay+=1500,p(h,this,[t],e._event_resolve_delay)),!0}),e.attachEvent("onEventCancel",function(t,a){return a&&(e.map._markers[t]&&e.map._markers[t].setMap(null),e.map._infowindow.close()),!0})})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_map_view.js.map