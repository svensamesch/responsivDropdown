/*
 * ResponsivDropdown
 *
 * Copyright (c) 2012  Sven Samesch, http://www.sven.samesch.de
 * Licensed under the MIT license.
 * https://github.com/svensamesch/responsivDropdown/blob/master/MIT-LICENSE.txt
 */

(function($) {
    $.fn.responsivDropdown = function(options) {
        var defaults = {
            secondMenu: 'none',
            menuID: '#nav',
            innerWrap: '.dropdown', 
            maxWith: 830,
            mobilNavi: 'Navigation',
            dropdownDelay: 800,
            slidedownSpeed: 500,
            slideUpSpeed: 500,
            backbutton: 'back'
        };
        /*
            #startmenu	options.secondMenu: 'none',			  is only used if you have a separat menu
            #nav		options.menuID: '#nav',				        ID of the outer navigation tag ( <navi> or <div> )
            ok .ym-hlist	options.innerWrap: '.ym-hlist'		ID or class of the inner navigation wrap
            ok maxWith		options.maxWith: 630,					  the size wher the dropdownmenu switcht in drillmenu
            ok			options.mobilNavi: 'Navigation' 		    name of the string of the mobil navigation button
            ok			options.dropdownDelay: 800  			      delay of slide up the dropdownmenu
            ok			options.slidedownSpeed: 800 			      slide the dropdownmenu down
            ok			options.slideUpSpeed: 500				      slide the drobdownmenu up
            zur&uuml;ck options.backbutton: 'back'         name of the back button of the drillmenu            
        */

        
        options = $.extend(defaults, options);
    
        return this.each(function(){
    
            // Vorbereitungen - script wird nur ausgeführt wenn javascript eingeschalten ist
            // preparing - the script only will execute if the javascript is switched on 
            function beforeNavi(drillmenu){
                if (!drillmenu.length) return;
  	            $('.use-hover').removeClass('use-hover');
                drillmenu.wrap('<div id="menu_wrap"></div>');
                var wrapper = drillmenu.parent();
                $(wrapper).find("div").wrapInner("<span />");
            }
      
            // Vorbereitung von Drobdownmenü (nur für resize)
            // preparing dropdownmenu  (only for resize)
            function beforeDropDownMenu(){
                $('.backlink').remove();
                $('.forward').remove();
                $('#drillmenu div').css('left',0);
                $('#drillmenu div div').css('left','177px');
                $('#drillmenu').find('div').css('display','none');
            }
      
            // Drobdownmenü
            // drobdownmenu
            function dropDownMenu(menu){
                var curMenu;
                if (!menu.length) return;
                $(menu).hover(function(){
                    // zum Prüfen ob Drill- oder Dropdownmenü vorliegt
                    // das drobdownmenü erkennt man an der Klasse .forward
                    curMenu = $('#drillmenu .forward').length;
                    $(this).siblings().find('div').css({"display": "none"});
                    $(this).find('div').first().stop(true, true).slideDown(options.slidedownSpeed,function(){
                        $(this).css({overflow: "visible"});        
                    }); 	  
                },function(){
                    if (curMenu == 0 ) {
                        $(this).find('div').first().stop(true, true).delay(options.dropdownDelay).slideUp(options.slideUpSpeed);
                    }
                });
            }
      
            // Vorbereitung von Drillmenü
            // preparing drillmenu
            function beforeDrillmenu(drillmenu) {
                if (!drillmenu.length) return;

                drillmenu.css('left','0px');
                drillmenu.find('div').stop();
                drillmenu.find('div').css('display','block');
                //fügt Backlink ein
                // insert backlink
                var str = '<p class="backlink"><a class="back" ' + 'href="javascript:;">&laquo; '+options.backbutton+'</a></p>';
                drillmenu.find("span").not(":eq(0)").prepend(str);
          
                // Baut einen Separaten Link ein, um in die nächste Hierarchieeben zu gelangen
                // bild a saparat link for comming in the next level 
                drillmenu.find('p').not('.backlink').prepend('<span class="forward">&raquo;</span>');
                var notfwd = $('.forward').parent().children('div');
                $('.forward').parent().not(':has(div)').addClass('fwd-hidden');
            }
      
            // Drillmenü
            // drillmenu
            function drillmenu(drillmenu) {
                if (!drillmenu.length) return;               
        
                $('#drillmenu div').css('left',234);	
                var distance = 0;
                drillmenu.find(".forward").click( function(e){
                    var parent = $(this).parent();
                    parent.siblings().find("div").hide();
                    parent.find("div:first").show().find("span").scrollTop(0);
                    // in die nächste Hierarchie
                    // into the next level
                    if (!$(this).parent().find("div").length) return;
                    distance += -234;		
                    drillmenu.animate({left: distance + "px"});
                });
        
                drillmenu.find("a").click( function(e){
                    var parent = $(this).parent();
                    // zurück
                    // back
                    if ($(this).parent().parent().parent().attr("id") == drillmenu.attr("id")) return;
                    distance += 234;
                    drillmenu.animate({left: distance + "px"});
                });
            }
      
            // Umschließt das Drillmenü, man kann so mit CSS das Drillmenü vertecken und mit einem Button Navigation öffnen
            // wrap the menu, so you can hide the drillmenu with css and opened it with a button called navigation
            function mobilemenu(mainnavi){
                var visible = 0;         
                $(options.menuID).prepend('<div class="mobilnavi">Navigation</div>');
                mainnavi.slideUp(0);

                $('.mobilnavi').click(function(){
                    if(visible == 0){
                        mainnavi.slideDown(options.dropdownSpeed);                     
                        visible = 1
                    }else{
                        mainnavi.slideUp(options.dropdownSpeed);                      
                        visible = 0;
                    }
                });
            }
      
            // Umschließt das Drillmenü
            // rmove the the wrap of drillmenu
            function pcmenu(){
                $('.mobilnavi').remove();
                $(options.innerWrap).css('display','block');
            }
            
            // +++ Zweitmenü +++ second menu +++ Zweitmenü +++ second menu +++ Zweitmenü +++ second menu +++ 
            // Vorbereitung für Zweitmenü
            // preparing for the second menu
            function beforeStartnav(beforeStartnav){
                beforeStartnav.find("div").wrapInner("<span />");
            }

            //Bettet die Zweitmenü in die Hauptnavi ein
            // embeting the second menu in the mainmenu
            function startnavi(){
                $(options.secondMenu+' div p:first').clone().prependTo('#drillmenu > span');
                $(options.secondMenu+' p:first').addClass('start');
                $(options.secondMenu).clone().appendTo('.start');
                $('.start div p:eq(0)').remove();
                $('.start div p:eq(3)').remove();
                $('.start div:not(div:first)').appendTo('.start div p:eq(2)');	
            }

            // Zeigt Zweitmenü am alten Platz an
            // appear the second menu on the original place
            function startnaviback(){
                $(options.secondMenu).show(0);
                $('.start').remove();
            }
            
            
            function DropdownDrill(){
            
                var mobilwidth = false;
                var drillnavi = $('#drillmenu');
                var startnav = $('#startnav');
            
                // diese Variablen müssen später beim resize des fensters neu ausgelesen werden
                // this vars neet to reload if the window will be resize
                var curWidth =	$(document).width();
                var nachLinks = drillnavi.width();
                //var mobilemenuWrap = '\''+options.menuID+' '+options.innerWrap+'\'';                
            
            
                // aufruf des PlugIn's replaceElements
                // using the plugin replaceElements		
                drillnavi.replaceElements({},function() {
                    beforeNavi($('#drillmenu'));
                });
            
                if ( options.secondMenu != 'none' ) {
                    startnav.replaceElements({},function() {
                        beforeStartnav($(options.secondMenu));
                    });
                }
                
                // fensterbreite beim START ermitteln: wenn schmaler als options.maxWith dann wird auf drillmenü umgeschalten
                // prof of windo with: if saller than options.maxWith the drillmenu apear
                if ( curWidth <= options.maxWith) {
                    
                    //drillmenu
                    if ( options.secondMenu != 'none' ) {
                        startnavi(); 
                    }
		                beforeDrillmenu($('#drillmenu'));
		                drillmenu($('#drillmenu'));
		                mobilemenu($(options.innerWrap));
                    mobilwidth = true;
                }else{
                    // dropdownmenu
                    dropDownMenu($('#drillmenu p'));
                    mobilwidth = false;
                }
            
                $(window).resize(function() {
                    curWidth =	$(document).width();
                    if ( curWidth <= options.maxWith) {
                        if (mobilwidth == false){
                            if ( options.secondMenu != 'none' ) {
                                startnavi(); 
                            }
                            beforeDrillmenu($('#drillmenu'));
                            drillmenu($('#drillmenu'));
                            mobilemenu($(options.innerWrap));
                            mobilwidth = true;
                        }
                    }else{
                        if (mobilwidth == true){
                            if ( options.secondMenu != 'none' ) {
                                startnaviback();
                            }
                            beforeDropDownMenu();
                            pcmenu();
                            dropDownMenu($('#drillmenu p'));
                            mobilwidth = false;
                        }
                    }
                });
            }
            DropdownDrill(); 
        });
    }
})(jQuery)