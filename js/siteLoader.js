// Links to the different sub-sites of the page
// ['Name of the Link', 'link adress']
var siteLinks = [
	['Non Clickable Menu Point',''],
	['My First Page', 'content/index.html']
];

// The Icons on the desktop, images have to be deposited in /img/ico/
// ['Name / Name.png','link']
var icons = [
	['TestIcon', 'content-markdown/index.html?site=example'],
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
	titleBarIcon.innerHTML = "<button aria-label=\"Minimize\" onClick=\"toggleWindow("+id+")\"></button>";
	//titleBarIcon.innerHTML += "<button aria-label=\"Maximize\" onClick=\"maximizeWindow("+id+")\"></button>";
	titleBarIcon.innerHTML += "<button aria-label=\"Close\" onClick=\"removeWindow("+id+")\"></button>";
	titleBar.appendChild(titleBarIcon);
	
	win.appendChild(titleBar);
	
	var winInnen = document.createElement('div');
	winInnen.setAttribute('class', 'window-body');
	winInnen.style = "position: relative; height: "+h+"px; overflow: hidden;";
	winInnen.innerHTML = innerHtml;
	
	win.appendChild(winInnen);
	
	addMoveListeners(win, titleBar);
	
	document.body.appendChild(win);
	
	
	var task = document.createElement('button');
	task.setAttribute('id', id+'t');
	task.setAttribute('class', 'taskElement active');
	task.setAttribute('onClick', 'toggleWindow('+id+')');
	task.innerHTML = "<b>"+title+"</b>";
	document.getElementById("taskbar").appendChild(task);
}

function maximizeWindow(id) {
	var win = document.getElementById(id);
	
	w = "100%";
	h = "100%";
	
	if (win.style.width == "100%") {
		w = "816px";
		h = "480px"
	} else {
		win.style.top = "0";
		win.style.left = "0";
	}
	
	win.style.width = w;
	win.style.height = h;
}

// Creates the inner html for a Window and calls addWindow()
function fillWindow(no, w, h) {
	let title = "";
	let link = "";
	let innerHTML = "";
	if (typeof(no) === 'object') {
		title = no[0];
		link = no[1];
	} else {
		title = siteLinks[no][0];
		link = siteLinks[no][1];
		
		w = siteLinks[no][2];
		h = siteLinks[no][3];
	}
	
	var left = Math.floor(Math.random() * 20);
	var top = Math.floor((Math.random() * 15) + 1);
	
	if (typeof(w) === 'undefined') {
		w = 816;
		h = 480;
	}
	
	if (link.startsWith("http")) {
		innerHTML='<iframe width="'+(w-16)+'px" height="'+(h-30)+'px" type="text/html" src="'+link+'" frameborder="0" allowfullscreen onmouseover = "mouseMove(\'event\')"></iframe>';
	} else {
		innerHTML='<object type="text/html" data="'+link+'" width="'+(w-16)+'px" height="'+(h-30)+'px" style="overflow-right: hidden;" onmouseover = "mouseMove(\'event\')"></object>';
		//innerHTML='<iframe width="800" height="450" type="text/html" src="'+link+'" frameborder="0" allowfullscreen onmouseover = "mouseMove(\'event\')"></iframe>';
	}
	
	addWindow(title, innerHTML, w, h, left, top);
}

// Creates the inner html for a popup window (smaller than a regular one) and calls addWindow()
function addPopup() {
	var left = Math.floor((Math.random() * 80) + 0);
	var top = Math.floor((Math.random() * 20) + 0);
	//addWindow("Werbung", "<img alt='' src='img/corona-sticker-werbung.jpg' width=100% onclick='alert(\"Schreib mir einfach auf Instagram :)\")' style='cursor: pointer'>", 400, 300, left, top);
	addWindow("Liebe Grüße", '<object type="text/html" data="/content/boomer-bild/index.html" width=500px height=400px style="overflow-right: hidden;" onmouseover = "mouseMove(\'event\')"></object>', 520, 430, left, top);
}

// Removes a window with a specific ID
function removeWindow(id) {
	document.body.removeChild(document.getElementById(id));
	document.getElementById("taskbar").removeChild(document.getElementById(id+'t'));
}

// Removes a window with a specific ID
function toggleWindow(id) {
	var win = document.getElementById(id);
	var btn = document.getElementById(id+'t');
	
	if (win.style.visibility == "hidden") {
		win.style.visibility = "";
		btn.classList.add("active");
		inForground(win);
	} else {
		win.style.visibility = "hidden";
		btn.classList.remove("active");
	}
	//document.getElementById("taskbar").removeChild(document.getElementById(id+'t'));
}


// ------ Functions for the bulding of the menu ------
function build_menu() {	
	var ulRoot = document.getElementById('menuUL');
	ul = ulRoot;

	for (var i = 0;i < siteLinks.length; i++) {
		if (siteLinks[i][1] === '') {
			ulRoot.appendChild(document.createElement("hr"))
			let label = document.createElement('label');
			label.innerHTML += siteLinks[i][0];
			label.className = "menuText";
			ulRoot.appendChild(label);
		} else {
			ulRoot.appendChild(document.createElement("br"))
			let li = document.createElement('button');
			li.style.height = "30px";
			li.innerHTML = '<img alt="" src="/img/ico/'+siteLinks[i][0]+'.png" style="width: 20px; margin: 5px; float:left;">'
			li.innerHTML += '<div style="height: 20px;line-height: 20px;margin: 5px;"><b>'+siteLinks[i][0]+'</b></div>';
			li.className = "menuButton";
			ul.appendChild(li);
			li.setAttribute('onClick', 'fillWindow('+i+');');
		}
	}
	ulRoot.appendChild(document.createElement("hr"))

	positionTaskbar();
}

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
	var men = document.getElementById("mainMenu");
	var btn = document.getElementById("taskMenBtn");
	
	if (men.style.visibility == "hidden") {
		men.style.visibility = "";
		btn.classList.add("active");
	} else {
		men.style.visibility = "hidden";
		btn.classList.remove("active");
	}
}

// Creates a desktop icon
function createIcon(name, link, w, h) {
	var ico = document.createElement('div');
	ico.setAttribute('class', 'icon');
	ico.innerHTML = '<img alt="" src="img/ico/'+name+'.png" width="100%" style="cursor: pointer;" onClick="fillWindow([\''+name+'\', \''+link+'\'], '+w+', '+h+');">';
	ico.innerHTML += name;
	
	addMoveListeners(ico, ico);
	
	document.body.appendChild(ico);
}

// Creates all the icons of the array icon[] by calling createIcon()
function createIcons() {
	for (var i = 0; i < icons.length; i++) {
		createIcon(icons[i][0], icons[i][1], icons[i][2], icons[i][3]);
	}
}





// Menu Actions

function einstellungen() {
	let eDiv = document.getElementById("einstellungen");
	if (eDiv.style.display == "inline") {
		eDiv.style.display = "none";
		document.getElementById("einstellungBtn").innerHTML = "Einstellungen öffnen";
	} else {
		eDiv.style.display = "inline";
		document.getElementById("einstellungBtn").innerHTML = "Einstellungen schließen";
	}
}

function randomBackgroundColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	document.body.style.backgroundColor = color;
	if (document.body.style.backgroundImage !== "") {
		addAesthetics();	
	}
}

function addAesthetics() {
	if (document.body.style.backgroundImage === "") {
		document.body.style.backgroundImage = "url('/img/bg.jpg')";
		document.getElementById("aestheticBtn").innerHTML = "wieder der einfarbige Hintergrund";
		var audio = new Audio('https://www.winhistory.de/more/winstart/mp3/win95.mp3');
		audio.play();
	} else {
		document.body.style.backgroundImage = "";
		document.getElementById("aestheticBtn").innerHTML = "wieder den Wolkenhintergrund";
	}
}



// Ermöglicht Links zu Unterseiten
function openLinkedWindow() {
	let no = window.location.search.substr(1);
	if (no === "") {
		fillWindow(1);
		return;
	}
	no = parseInt(no);
	if (no>=siteLinks.length) {
		fillWindow(icons[no-siteLinks.length])
	} else {
		fillWindow(no);
	}
}

// Creates all the Desktop Icons
createIcons();
// Builds the menu
build_menu();

openLinkedWindow();