# Code Citations

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/WindzCUHK/a-video-explorer/blob/d56787f789d3e0444d0ced90be9ec51e2be5eaec/app/app.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/WindzCUHK/a-video-explorer/blob/d56787f789d3e0444d0ced90be9ec51e2be5eaec/app/app.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/WindzCUHK/a-video-explorer/blob/d56787f789d3e0444d0ced90be9ec51e2be5eaec/app/app.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/WindzCUHK/a-video-explorer/blob/d56787f789d3e0444d0ced90be9ec51e2be5eaec/app/app.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/WindzCUHK/a-video-explorer/blob/d56787f789d3e0444d0ced90be9ec51e2be5eaec/app/app.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/WindzCUHK/a-video-explorer/blob/d56787f789d3e0444d0ced90be9ec51e2be5eaec/app/app.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template =
````

## License: unknown

https://github.com/WindzCUHK/a-video-explorer/blob/d56787f789d3e0444d0ced90be9ec51e2be5eaec/app/app.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: unknown

https://github.com/WindzCUHK/a-video-explorer/blob/d56787f789d3e0444d0ced90be9ec51e2be5eaec/app/app.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: MIT

https://github.com/nasser/zajal/blob/e8c6427078ae23efe7862c6665871ce873f78bba/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: unknown

https://github.com/sowcow/prank-player/blob/c0572b1a0737f2ff5cc36efcfe58145335be630f/electron-app/public/electron.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: unknown

https://github.com/WindzCUHK/a-video-explorer/blob/d56787f789d3e0444d0ced90be9ec51e2be5eaec/app/app.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: unknown

https://github.com/HelloHowAreYouHaveANiceDay/cloudrunner/blob/d399d578572338201e8f46820741a4d7a8faea51/src/main/index.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu
````

## License: AGPL-3.0

https://github.com/automeris-io/WebPlotDigitizer/blob/8f4d759e8c4b5bae0107235de5071409b8c2d887/electron/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: unknown

https://github.com/geoctrl/nemesis-builder/blob/f0885ef5f46c6130a9fe15f19493ece32e535730/src/main/main-menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: AGPL-3.0

https://github.com/automeris-io/WebPlotDigitizer/blob/8f4d759e8c4b5bae0107235de5071409b8c2d887/electron/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: unknown

https://github.com/geoctrl/nemesis-builder/blob/f0885ef5f46c6130a9fe15f19493ece32e535730/src/main/main-menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: MIT

https://github.com/dgeibi/p2p-chat/blob/4384ef0fde494c9b0826aa486626dd87bd5d1738/packages/p2p-chat/main/menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReloa
````

## License: AGPL-3.0

https://github.com/automeris-io/WebPlotDigitizer/blob/8f4d759e8c4b5bae0107235de5071409b8c2d887/electron/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: unknown

https://github.com/geoctrl/nemesis-builder/blob/f0885ef5f46c6130a9fe15f19493ece32e535730/src/main/main-menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: MIT

https://github.com/dgeibi/p2p-chat/blob/4384ef0fde494c9b0826aa486626dd87bd5d1738/packages/p2p-chat/main/menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReloa
````

## License: AGPL-3.0

https://github.com/automeris-io/WebPlotDigitizer/blob/8f4d759e8c4b5bae0107235de5071409b8c2d887/electron/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: unknown

https://github.com/geoctrl/nemesis-builder/blob/f0885ef5f46c6130a9fe15f19493ece32e535730/src/main/main-menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: MIT

https://github.com/dgeibi/p2p-chat/blob/4384ef0fde494c9b0826aa486626dd87bd5d1738/packages/p2p-chat/main/menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReloa
````

## License: MIT

https://github.com/pwbrown/exec/blob/bf81ea5e88402b4460837fecdc60585aba2173c5/app/main/utils/applicationMenu.ts

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },

````

## License: MIT

https://github.com/ringcentral/ringcentral-community-app/blob/e3187a56cb76234a69dff11fd10e90cf0cba66c1/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
````

## License: AGPL-3.0

https://github.com/automeris-io/WebPlotDigitizer/blob/8f4d759e8c4b5bae0107235de5071409b8c2d887/electron/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: unknown

https://github.com/geoctrl/nemesis-builder/blob/f0885ef5f46c6130a9fe15f19493ece32e535730/src/main/main-menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: MIT

https://github.com/dgeibi/p2p-chat/blob/4384ef0fde494c9b0826aa486626dd87bd5d1738/packages/p2p-chat/main/menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReloa
````

## License: MIT

https://github.com/pwbrown/exec/blob/bf81ea5e88402b4460837fecdc60585aba2173c5/app/main/utils/applicationMenu.ts

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },

````

## License: MIT

https://github.com/ringcentral/ringcentral-community-app/blob/e3187a56cb76234a69dff11fd10e90cf0cba66c1/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
````

## License: AGPL-3.0

https://github.com/automeris-io/WebPlotDigitizer/blob/8f4d759e8c4b5bae0107235de5071409b8c2d887/electron/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: unknown

https://github.com/geoctrl/nemesis-builder/blob/f0885ef5f46c6130a9fe15f19493ece32e535730/src/main/main-menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label
````

## License: MIT

https://github.com/dgeibi/p2p-chat/blob/4384ef0fde494c9b0826aa486626dd87bd5d1738/packages/p2p-chat/main/menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReloa
````

## License: MIT

https://github.com/pwbrown/exec/blob/bf81ea5e88402b4460837fecdc60585aba2173c5/app/main/utils/applicationMenu.ts

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },

````

## License: MIT

https://github.com/ringcentral/ringcentral-community-app/blob/e3187a56cb76234a69dff11fd10e90cf0cba66c1/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
````

## License: AGPL-3.0

https://github.com/automeris-io/WebPlotDigitizer/blob/8f4d759e8c4b5bae0107235de5071409b8c2d887/electron/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReloa
````

## License: MIT

https://github.com/dgeibi/p2p-chat/blob/4384ef0fde494c9b0826aa486626dd87bd5d1738/packages/p2p-chat/main/menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReloa
````

## License: unknown

https://github.com/geoctrl/nemesis-builder/blob/f0885ef5f46c6130a9fe15f19493ece32e535730/src/main/main-menu.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReloa
````

## License: MIT

https://github.com/pwbrown/exec/blob/bf81ea5e88402b4460837fecdc60585aba2173c5/app/main/utils/applicationMenu.ts

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },

````

## License: MIT

https://github.com/ringcentral/ringcentral-community-app/blob/e3187a56cb76234a69dff11fd10e90cf0cba66c1/main.js

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
````

## License: MIT

https://github.com/electron/electron/blob/42164d70813b32390426e372003f9f144a811593/lib/browser/api/menu-item-roles.ts

````
```js
// filepath: c:\Users\Admin\Downloads\POS System Design for Bampadde (1)\electron.js
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync } = require('fs');

let mainWindow;
let app;
let BrowserWindow;
let Menu;

async function loadElectron() {
  if (!app) {
    const electron = await import('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    Menu = electron.Menu;
  }
  return { app, BrowserWindow, Menu };
}

function getStartUrl() {
  if (isDev) {
    return 'http://localhost:3000';
  }

  // In production, the build folder should be at the same level as app.asar in resources
  let buildPath = path.join(__dirname, 'build', 'index.html');

  // Try alternative paths
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../build/index.html');
  }
  if (!existsSync(buildPath)) {
    buildPath = path.join(__dirname, '../../build/index.html');
  }

  console.log('Loading build from:', buildPath);
  return `file://${buildPath}`;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  const startUrl = getStartUrl();
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function init() {
  await loadElectron();

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // Menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type
````
