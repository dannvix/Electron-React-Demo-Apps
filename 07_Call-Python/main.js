var app = require("app"),
    ipc = require("ipc"),
    BrowserWindow = require("browser-window");

app.on("window-all-closed", function() {
  app.quit();
})

var mainWindow = null;
app.on("ready", function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    resizable: true,
    frame: true,
    transparent: false,
  });
  mainWindow.setMenu(null);

  var homepageUrl = "file://" + __dirname + "/index.html";
  mainWindow.loadUrl(homepageUrl);

  mainWindow.openDevTools();
  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  ipc.on("call-python", function(event, props) {
    var sys = require("sys"),
        path = require("path"),
        child_process = require("child_process");
    var script_abspath = path.join(__dirname, "test.py");
    var proc = child_process.spawn("python", [script_abspath]);
    proc.stdout.on("data", function(data) {
      event.sender.send("python-stdout", {
        stdout: data.toString()
      });
    });
  });
});
