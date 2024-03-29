const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
function createWindow () {
  // Create the browser window.
console.log(__dirname);
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      
    }


  })

  app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
      app.quit();
    }
  });
  // and load the index.html of the app.
  win.loadURL(`file:///${__dirname}/static/index.html`);
//win.loadFile(`${__dirname}/static/index.html`);
	

  // win.openDevTools();
  

  // let db = require('dbService.js')

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
	
  }
})
