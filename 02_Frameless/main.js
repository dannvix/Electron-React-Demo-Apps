var app = require("app"),
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
    frame: false,
    transparent: false
  });
  mainWindow.setMenu(null);

  var homepageUrl = "file://" + __dirname + "/index.html";
  mainWindow.loadUrl(homepageUrl);

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});
