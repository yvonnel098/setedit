//updated 8-2-15 to erase FCKG_USE cookie in specific namespace so
//that it will not overwrite the same cookie created in root path

function createCookie(name,value,days, cur_path) {
    //console.log("in create cookie "+name);

    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    //document.cookie = name+"="+value+expires+"; path=/"+cur_path;
    document.cookie = name+"="+value+expires+"; path="+cur_path;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name, path) {
    createCookie(name,"",-1, path);
}

function set_ckg_edit() {
    //expire setedit cookie, if any
    //create new setedit cookie with CKG edit as the preference
    
    //console.log("in set_ckg_edit");
    eraseCookie("setedit", "/");
    createCookie("setedit", 'CKG', '365', '/');


}

function set_dw_edit() {
   //expire setedit cookie, if any
   //create new setedit cookie with DW edit as the preference
  
   //console.log("in set_dw_edit");
   eraseCookie("setedit", "/");
   createCookie("setedit", 'DW', '365', '/');
}


jQuery(function() {
    
   
   //construct path
    var ns=readCookie("FCK_NmSp");
    var ns_arr=ns.split("%3A");
    var new_ns="/";
    for(var i=0;i < (ns_arr.length-1);i++) {
      new_ns+=ns_arr[i];
      if (i<(ns_arr.length-2)){
        new_ns+="/";
      }
    }
    //console.log("new_ns="+new_ns);

      
    var editor=readCookie("setedit");
    //console.log("editor="+editor);
    
    if (editor != null){
      //erase cookie in the current name space
     
      eraseCookie("FCKG_USE", "new_ns");
      eraseCookie("FCKG_USE", "/");
      if (editor=='DW') {
        createCookie("FCKG_USE", "_false_", 0, "/");
      } 

    }
    

    //CKG EDIT button clicked
    jQuery('#edbtn__edit').click(set_ckg_edit);

    //DW edit link when it is chrome
    

    jQuery('a').click(function (event) 
    { 
       var title = jQuery(this).attr("title");
       //alert(title);
       if (title.trim().localeCompare('DW Edit')==0) {
        
        set_dw_edit();
       }
     
       
      

     });

    

    //DW button clicked
    jQuery('#ebtn__dwedit').click(set_dw_edit);
        

   
});