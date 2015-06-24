var app = require("app"),
    BrowserWindow = require("browser-window");

app.on("window-all-closed", function() {
    app.quit();
})

var browserWindows = [];
app.on("ready", function() {
  var WINDOW_NUM = 2;
  for (var i = 0; i < WINDOW_NUM; i++) {
    browserWindows[i] = new BrowserWindow({
      width: 800,
      height: 600,
      center: true,
      resizable: true,
      frame: true,
      transparent: false,
    });
    browserWindows[i].setMenu = (null);
    browserWindows[i].loadUrl("file://" + __dirname + "/index.html");
    browserWindows[i].openDevTools();
    browserWindows[i].on("closed", function() {
      browserWindows[i] = null;
    });
  }

  var broadcast = function(message) {
    browserWindows.forEach(function(browserWindow) {
      if (!browserWindow) return;
      browserWindow.webContents.send("broadcast", message);
    });
  };

  var ipc = require("ipc");
  ipc.on("broadcast", function(evt, args) {
    if (args.message) {
      broadcast(args.message);
    }
  });

  setInterval(broadcast.bind(null, "timer tick"), 10000);
});
