const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const fs = require("fs")
const path = require('path')
const url = require('url')

const Menu = electron.Menu;
const appName = app.getName();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 930,
    height: 670,
    //resizable: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    backgroundColor: '#1b3244'
  })

  var appstate = fs.existsSync(path.join(app.getPath('appData'), '/PostParrot/login.json'));
  if(appstate) {
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'app/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'app/login.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  /*
  const template = [
	{
		label: appName,
    submenu: [
      {
				role: 'about'
      },
      {
				role: 'quit'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {role: 'toggledevtools'},
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://github.com/emmaarfelt/PostParrot') }
      }
    ]
  }
]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)*/

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
