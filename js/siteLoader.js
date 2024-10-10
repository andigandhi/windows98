// Links to the different sub-sites of the page
// ['Name of the Link', 'link adress']
var menu_icons = [
	['Non Clickable Menu Point','',''],
	['My First Page', 'content/index.html','TestIcon.png']
];

// The Icons on the desktop, images have to be deposited in /img/ico/
// ['Name / Name.png','link']
var desktop_icons = [
	['TestIcon', 'content-markdown/index.html?site=example','TestIcon.png'],
]


// ------ Methods for the window divs ------

// Adds a new window with a innerHtml to the document
function addWindow(title, icon, innerHtml, w, h, left, top) {
	// Create a random ID
	var window_id = Math.floor((Math.random() * 1000000) + 1000);
	// Create the window div and add attributes
	var new_window = document.createElement('div');
	new_window.setAttribute('class', 'window');
	new_window.setAttribute('id', window_id);
	new_window.style = "position: absolute; width: "+w+"px; height: "+h+"px; left: "+left+"%; top: "+top+"%";
	
	// Create the title bar of the window
	var title_bar = document.createElement('div');
	title_bar.setAttribute('class', 'title-bar');
	
	// Create the text of the tile bar and add it to the title bar itself
	var title_bar_text = document.createElement('div');
	title_bar_text.setAttribute('class', 'title-bar-text');
	title_bar_text.innerHTML = '<img alt="" src="/img/ico/'+icon+'" style="height: 11px; margin-right: 5px; float:left;">'
	title_bar_text.innerHTML += title;
	title_bar.appendChild(title_bar_text);
	
	// Create the icons for the title bar and add them
	var title_bar_item = document.createElement('div');
	title_bar_item.setAttribute('class', 'title-bar-controls');
	title_bar_item.innerHTML = "<button aria-label=\"Minimize\" onClick=\"toggleWindow("+window_id+")\"></button>";
	title_bar_item.innerHTML += "<button aria-label=\"Maximize\" onClick=\"maximizeWindow("+window_id+")\"></button>";
	title_bar_item.innerHTML += "<button aria-label=\"Close\" onClick=\"removeWindow("+window_id+")\"></button>";
	title_bar.appendChild(title_bar_item);
	
	// Add the title bar to the window
	new_window.appendChild(title_bar);
	
	// Create the content of the window
	var window_content = document.createElement('div');
	window_content.setAttribute('class', 'window-body');
	window_content.style = "position: relative; height: "+h+"px; overflow: hidden;";
	window_content.innerHTML = innerHtml;
	new_window.appendChild(window_content);
	
	// Add the listeners for dragging the window
	addMoveListeners(new_window, title_bar);
	
	// Append the window to the DOM
	document.body.appendChild(new_window);
	
	// Add the taskbar item
	var taskbar_item = document.createElement('button');
	taskbar_item.setAttribute('id', window_id+'t');
	taskbar_item.setAttribute('class', 'taskElement active');
	taskbar_item.setAttribute('onClick', 'toggleWindow('+window_id+')');
	taskbar_item.innerHTML = "<b>"+title+"</b>";
	document.getElementById("taskbar").appendChild(taskbar_item);
}

function maximizeWindow(id) {
	var window_div = document.getElementById(id);
	
	w = "100%";
	h = "100%";
	
	if (window_div.style.width == "100%") {
		w = "816px";
		h = "480px"
	} else {
		window_div.style.top = "0";
		window_div.style.left = "0";
	}
	
	window_div.style.width = w;
	window_div.style.height = h;
}

// Creates the inner html for a Window and calls addWindow()
function fillWindow(no, w, h) {
	let title = "";
	let icon = "";
	let link = "";
	let innerHTML = "";
	if (typeof(no) === 'object') {
		title = no[0];
		link = no[1];
		icon = no[2];
	} else {
		title = menu_icons[no][0];
		link = menu_icons[no][1];
		icon = menu_icons[no][2];
		w = menu_icons[no][3];
		h = menu_icons[no][4];
	}
	
	var left = Math.floor(Math.random() * 20);
	var top = Math.floor((Math.random() * 15) + 1);
	
	if (typeof(w) === 'undefined') {
		w = 816;
		h = 480;
	}
	
	if (link.startsWith("http")) {
		// IFrame for external links
		innerHTML='<iframe width="'+(w-16)+'px" height="'+(h-30)+'px" type="text/html" src="'+link+'" frameborder="0" allowfullscreen onmouseover = "mouseMove(\'event\')"></iframe>';
	} else {
		// Object for internal links
		innerHTML='<object type="text/html" data="'+link+'" width="'+(w-16)+'px" height="'+(h-30)+'px" style="overflow-right: hidden;" onmouseover = "mouseMove(\'event\')"></object>';
	}
	
	addWindow(title, icon, innerHTML, w, h, left, top);
}

// Removes a window with a specific ID
function removeWindow(id) {
	document.body.removeChild(document.getElementById(id));
	document.getElementById("taskbar").removeChild(document.getElementById(id+'t'));
}

// Removes a window with a specific ID
function toggleWindow(id) {
	var window_div = document.getElementById(id);
	var taskbar_button = document.getElementById(id+'t');
	
	if (window_div.style.visibility == "hidden") {
		window_div.style.visibility = "";
		taskbar_button.classList.add("active");
		focus_window(window_div);
	} else {
		window_div.style.visibility = "hidden";
		taskbar_button.classList.remove("active");
	}
}


// ------ Functions for the bulding of the menu ------

// Builds the menu
function build_menu() {	
	var menu_div = document.getElementById('menu_content');

	menu_div.innerHTML = '<img alt="" src="img/andigandhi98.png" style="width: 150px; margin-top: 5px;">'

	for (var i = 0;i < menu_icons.length; i++) {
		if (menu_icons[i][1] === '') {
			menu_div.appendChild(document.createElement("hr"))
			let label = document.createElement('label');
			label.innerHTML += menu_icons[i][0];
			label.className = "menuText";
			menu_div.appendChild(label);
		} else {
			menu_div.appendChild(document.createElement("br"))
			let menu_item = document.createElement('button');
			menu_item.style.height = "30px";
			if (menu_icons[i][2] != '') menu_item.innerHTML = '<img alt="" src="img/ico/'+menu_icons[i][2]+'" style="width: 20px; margin: 5px; float:left;">'
			menu_item.innerHTML += '<div style="height: 20px;line-height: 20px;margin: 5px;"><b>'+menu_icons[i][0]+'</b></div>';
			menu_item.className = "menuButton";
			menu_div.appendChild(menu_item);
			menu_item.setAttribute('onClick', 'fillWindow('+i+');');
		}
	}
	menu_div.appendChild(document.createElement("hr"))

	positionTaskbar();
}

// Position the taskbar on the bottom
function positionTaskbar() {
	// don't show taskbar on mobile devices
	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		isMobile = true;
	}
	if (isMobile) {
		document.getElementById("mainMenu").style.width = "75%";
	}

	var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
	
	document.getElementById("taskbar").style.marginTop = (h - 50)+"px";

	var menuHeight = document.getElementById("mainMenu").offsetHeight;
	document.getElementById("mainMenu").style.marginTop = (h - 50 - menuHeight)+"px";
	document.getElementById("mainMenuSideBar").style.height = menuHeight+"px";
}

// Toggles the visibility of the menu
function toggleMenu() {
	var menu_div = document.getElementById("mainMenu");
	var menu_button = document.getElementById("taskMenBtn");
	
	if (menu_div.style.visibility == "hidden") {
		menu_div.style.visibility = "";
		menu_button.classList.add("active");
	} else {
		menu_div.style.visibility = "hidden";
		menu_button.classList.remove("active");
	}
}

// Creates a desktop icon
function createIcon(name, link, iconImage, w, h) {
	var desktop_icon = document.createElement('div');
	desktop_icon.setAttribute('class', 'icon');
	desktop_icon.innerHTML = '<img alt="" src="img/ico/'+iconImage+'" width="100%" style="cursor: pointer;" onClick="fillWindow([\''+name+'\', \''+link+'\', \''+iconImage+'\'], '+w+', '+h+');">';
	desktop_icon.innerHTML += name;
	
	addMoveListeners(desktop_icon, desktop_icon);
	
	document.body.appendChild(desktop_icon);
}

// Creates all the icons of the array icon[] by calling createIcon()
function createIcons() {
	for (var i = 0; i < desktop_icons.length; i++) {
		createIcon(desktop_icons[i][0], desktop_icons[i][1], desktop_icons[i][2], desktop_icons[i][3], desktop_icons[i][4]);
	}
}

// Allows to open Windows using direct links
function openLinkedWindow() {
	let window_no = window.location.search.substr(1);
	if (window_no === "") {
		fillWindow(1);
		return;
	}
	window_no = parseInt(window_no);
	if (window_no>=menu_icons.length) {
		fillWindow(desktop_icons[window_no-menu_icons.length])
	} else {
		fillWindow(window_no);
	}
}

// Creates all the Desktop Icons
createIcons();
// Builds the menu
build_menu();

openLinkedWindow();