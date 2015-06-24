var app = require("app"),
    Tray = require("tray"),
    Menu = require("menu"),
    globalShortcut = require("global-shortcut"),
    BrowserWindow = require("browser-window");
var path = require("path");

// app.on("window-all-closed", function() {
//     app.quit();
// })

var mainWindow = null;
app.on("ready", function() {
  mainWindow = new BrowserWindow({show: false});
  var iconAbspath = path.join(__dirname, "icon.png");
  appIcon = new Tray(iconAbspath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Item1',
      type: 'radio',
      icon: iconAbspath
    },
    {
      label: 'Item2',
      submenu: [
        { label: 'submenu1' },
        { label: 'submenu2' }
      ]
    },
    {
      label: 'Item3',
      type: 'radio',
      checked: true
    },
    {
      label: 'Toggle DevTools',
      accelerator: 'Alt+Ctrl+I',
      click: function() {
        mainWindow.show();
        mainWindow.toggleDevTools();
      }
    },
    { label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
    }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
  globalShortcut.register("Ctrl+T", function() {
    mainWindow.show();
  });
});
