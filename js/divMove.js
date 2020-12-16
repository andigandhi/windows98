var mousePosition;
var isDown = false;

var div;
var titleBar;
var offset;
var zMax = 1;

function addMoveListeners(div1, titleBar1) {
	div = div1;
	titleBar = titleBar1;
	
	titleBar.addEventListener('mousedown', function(event) {mousedown(event);}, true);
	titleBar.addEventListener('touchstart', function(event) {mousedown(event);}, true);
	
	inForground(div)
}

function documentMouseTrackStart() {
	document.addEventListener('mouseup', function() { isDown = false;}, true);
	document.addEventListener('touchend', function() { isDown = false;}, true);

	document.addEventListener('mousemove', function(event) {mouseMove(event);}, true);
	document.addEventListener('touchmove', function(event) {mouseMove(event);}, true);
}

function mousedown(e) {
	div = e.target.parentElement;
	
	if (div === null) {
		return;
	}
	
	if (typeof(e) === 'undefined') {
		return;
	}
	
	offset = [div.offsetLeft, div.offsetTop];
	isDown = true;
	offset = [
		div.offsetLeft - e.clientX,
		div.offsetTop - e.clientY
	];
	
	if (isNaN(offset[0])) {
		offset = [
			div.offsetLeft - e.touches[0].clientX,
			div.offsetTop - e.touches[0].clientY
		];
	}
	
	inForground(div)
}

function inForground(div) {
	div.style.zIndex = zMax;
	zMax++;
}

function mouseMove(e) {
	event.preventDefault();
	if (isDown) {
		mousePosition = { x : event.clientX, y : event.clientY };
		if (typeof(mousePosition.x) === 'undefined') {
			mousePosition = { x : e.changedTouches[0].clientX, y : e.changedTouches[0].clientY };
		}
		
		div.style.left = (mousePosition.x + offset[0]) + 'px';
		div.style.top  = (mousePosition.y + offset[1]) + 'px';
	}
}

documentMouseTrackStart();
