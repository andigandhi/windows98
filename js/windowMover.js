var mouse_position;
var mouse_is_down = false;

var window_div;
var title_bar;
var window_mouse_offset = [0, 0];
var highest_z_value = 1;

// Adds the listener to the title bar of a window
function addMoveListeners(window_div, title_bar) {
  title_bar.addEventListener(
    "mousedown",
    function (event) {
      mousedown(event);
    },
    true,
  );
  title_bar.addEventListener(
    "touchstart",
    function (event) {
      mousedown(event);
    },
    true,
  );

  focus_window(window_div);
}

// Starts the mouse tracking
function addDocumentTracker() {
  document.addEventListener("mousemove", mouseMove, true);
  document.addEventListener("touchmove", touchMove, true);
}

// Calculates initial cursor offset for mouse movement
function mousedown(e) {
  window_div = e.target.parentElement;

  if (window_div === null) {
    return;
  }

  if (typeof e === "undefined") {
    return;
  }

  window_mouse_offset = [window_div.offsetLeft, window_div.offsetTop];
  mouse_is_down = true;
  window_mouse_offset = [
    window_div.offsetLeft - e.clientX,
    window_div.offsetTop - e.clientY,
  ];

  if (isNaN(window_mouse_offset[0])) {
    window_mouse_offset = [
      window_div.offsetLeft - e.touches[0].clientX,
      window_div.offsetTop - e.touches[0].clientY,
    ];
  }

  addDocumentTracker();

  focus_window(window_div);
}

// Stops the mouse tracking
function documentMouseTrackStart() {
  document.addEventListener(
    "mouseup",
    function () {
      mouse_is_down = false;
      remDocumentTracker();
    },
    true,
  );
  document.addEventListener(
    "touchend",
    function () {
      mouse_is_down = false;
      remDocumentTracker();
    },
    true,
  );
}

function remDocumentTracker() {
  document.removeEventListener("mousemove", mouseMove, true);
  document.removeEventListener("touchmove", touchMove, true);
}

// Move window to the front
function focus_window(div) {
  div.style.zIndex = highest_z_value;
  highest_z_value++;
}

// Movement listener for mobile phones
function touchMove(e) {
  event.preventDefault();

  if (mouse_is_down) {
    touchPosition = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    if (
      touchPosition.x + offset[0] + div.clientWidth - 15 <=
      document.body.clientWidth
    ) {
      window_div.style.left = touchPosition.x + window_mouse_offset[0] + "px";
    }
    window_div.style.top = touchPosition.y + window_mouse_offset[1] + "px";
  }
}

// Movement listener for PCs
function mouseMove(e) {
  event.preventDefault();

  if (mouse_is_down) {
    mouse_position = {
      x: event.clientX,
      y: event.clientY,
    };

    window_div.style.left = mouse_position.x + window_mouse_offset[0] + "px";
    window_div.style.top = mouse_position.y + window_mouse_offset[1] + "px";
  }
}

documentMouseTrackStart();
