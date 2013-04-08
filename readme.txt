ResponsivDropdown is a small dropdown menu with two faces once is the dropdown menu for screen layou and the other face is for a small screen like a mobile phone then automaticly a drillmenu is dispalyed on the small screen. Furter more a second menu like a service menu can involved in the drillmenu.

Administration:
Import the extension.
Import the extension jquery.replace
Set the CSS file <link href="css.css" rel="stylesheet" type="text/css"></link>
Set the jquery.min.js - <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
Set the jquery.replace-1.0.js - <script src="jquery.replace-1.0.js"></script>
Set the jquery.responsivDropdown-1.0.js - <script src="responsivDropDown-1.0.js"></script>
Initialice responsivDropDown-1.0
<script text/javascript>
	$(document).ready(function(){ 
		$('body').responsivDropdown();
	})
</script>