

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
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

function eraseCookie(name) {
    createCookie(name,"",-1, "/dokuwiki");
}

function set_ckg_edit() {
    //expire setedit cookie, if any
    //create new setedit cookie with CKG edit as the preference
    
    eraseCookie("setedit");
    createCookie("setedit", 'CKG', '365');


}

function set_dw_edit() {
   //expire setedit cookie, if any
   //create new setedit cookie with DW edit as the preference
  
   eraseCookie("setedit");
   createCookie("setedit", 'DW', '365');
}


jQuery(function() {
    
    var editor=readCookie("setedit");
    
    if (editor != null){
      eraseCookie("FCKG_USE");
      if (editor=='DW') {
        createCookie("FCKG_USE", "_false_", 0);
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