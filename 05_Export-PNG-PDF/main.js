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

  ipc.on("export-to-pdf", function(e, props) {
    var pathname = props.pathname;
    mainWindow.printToPDF({}, function(error, data){
      if (error) throw error;
      require("fs").writeFile(pathname, data, function() {
        require("dialog").showMessageBox(mainWindow, {
          message: pathname + " saved",
          buttons: ["OK"]
        });
      })
    });
  });
});
