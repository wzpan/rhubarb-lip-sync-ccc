'use strict';

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'launch' () {
      // open entry panel registered in package.json
      Editor.Panel.open('lipsync');
    }
  },
};