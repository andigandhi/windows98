// Links to the different sub-sites of the page
// ['Name of the Link', 'link adress']
var siteLinks = [
	['Non Clickable Menu Point',''],
	['My First Page', 'content/index.html']
];


// The Icons on the desktop, images have to be deposited in /img/ico/
// ['Name / Name.png','link']
var icons = [
	['TestIcon', 'content/index.html'],
]


// ------ Methods for the window divs ------

// Adds a new window with a innerHtml to the document
function addWindow(title, innerHtml, w, h, left, top) {
	var id = Math.floor((Math.random() * 1000000) + 1000);
	
	var win = document.createElement('div');
	win.setAttribute('class', 'window');
	win.setAttribute('id', id);
	win.style = "position: absolute; width: "+w+"px; height: "+h+"px; left: "+left+"%; top: "+top+"%";
	
	var titleBar = document.createElement('div');
	titleBar.setAttribute('class', 'title-bar');
	
	var titleBarText = document.createElement('div');
	titleBarText.setAttribute('class', 'title-bar-text');
	titleBarText.innerHTML = title;
	titleBar.appendChild(titleBarText);
	
	var titleBarIcon = document.createElement('div');
	titleBarIcon.setAttribute('class', 'title-bar-controls');
	titleBarIcon.innerHTML = "<button aria-label=\"Close\" onClick=\"hideWindow("+id+")\"></button>";
	titleBar.appendChild(titleBarIcon);
	
	win.appendChild(titleBar);
	
	var winInnen = document.createElement('div');
	winInnen.setAttribute('class', 'window-body');
	winInnen.style = "position: relative; height: 450px; overflow: hidden;";
	winInnen.innerHTML = innerHtml;
	
	win.appendChild(winInnen);
	
	addMoveListeners(win, titleBar);
	
	document.body.appendChild(win);
}

// Creates the inner html for a Window and calls addWindow()
function fillWindow(no) {
	let title = "";
	let link = "";
	let innerHTML = "";
	if (typeof(no) === 'object') {
		title = no[0];
		link = no[1];
	} else {
		title = siteLinks[no][0];
		link = siteLinks[no][1];
	}
	
	if (link.startsWith("http")) {
		innerHTML='<iframe width="800" height="450" type="text/html" src="'+link+'" frameborder="0" allowfullscreen onmouseover = "mouseMove(\'event\')"></iframe>';
	} else {
		innerHTML='<object type="text/html" data="'+link+'" width="800px" height="450px" style="overflow-right: hidden;" onmouseover = "mouseMove(\'event\')"></object>';
		//innerHTML='<iframe width="800" height="450" type="text/html" src="'+link+'" frameborder="0" allowfullscreen onmouseover = "mouseMove(\'event\')"></iframe>';
	}
	
	var left = Math.floor((Math.random() * 20) + 30);
	var top = Math.floor((Math.random() * 15) + 1);
	
	addWindow(title, innerHTML, 816, 480, left, top);
}

// Creates the inner html for a popup window (smaller than a regular one) and calls addWindow()
function addPopup() {
	var left = Math.floor((Math.random() * 80) + 0);
	var top = Math.floor((Math.random() * 20) + 0);
	addWindow("Werbung", "<img alt='' src='img/corona-sticker-werbung.jpg' width=100% onclick='alert(\"Schreib mir einfach auf Instagram :)\")' style='cursor: pointer'>", 400, 300, left, top);
}

// Removes a window with a specific ID
function hideWindow(id) {
	document.body.removeChild(document.getElementById(id));
}




// ------ Functions for the bulding of the menu ------

// Builds the menu
function build_menu() {
	addMoveListeners(document.getElementById("menuWind"), document.getElementById("menuTit"));
	
	var ulRoot = document.getElementById('menuUL');
	ul = ulRoot;

	for (var i = 0;i < siteLinks.length; i++) {
		let li = document.createElement('li');
		li.innerHTML += siteLinks[i][0];
		
		if (siteLinks[i][1] === '') {
			ulRoot.appendChild(li);
			ul = document.createElement('ul');
			li.appendChild(ul);
		} else {
			ul.appendChild(li);
			li.setAttribute('onClick', 'fillWindow('+i+');');
		}
	}
}

// Creates a desktop icon
function createIcon(name, link) {
	var ico = document.createElement('div');
	ico.setAttribute('class', 'icon');
	ico.style.overflow = "hidden";
	ico.innerHTML = '<img alt="" src="img/ico/'+name+'.png" width="100%" style="cursor: pointer;" onClick="fillWindow([\''+name+'\', \''+link+'\']);">';
	ico.innerHTML += name;
	
	addMoveListeners(ico, ico);
	
	document.body.appendChild(ico);
}

// Creates all the icons of the array icon[] by calling createIcon()
function createIcons() {
	for (var i = 0; i < icons.length; i++) {
		createIcon(icons[i][0], icons[i][1]);
	}
}

// Creates all the Desctop Icons
createIcons();
// Builds the menu
build_menu();
// Opens first Window
fillWindow(1);
