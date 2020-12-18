let packageName = 'lipsync';
let os = require('os');
let fs = require('fire-fs');
let path = require('path');
let exec = require('child_process').exec;

Editor.Panel.extend({
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
    ui-prop { padding-top: 10px;}
  `,

  template: `
    <h2>LipSync</h2>
    <hr />
    <ui-section>
      <div class="header">${Editor.T('lipsync.mouthshapes')}</div>
      <ui-prop name="A" tooltip="${Editor.T('lipsync.mouthA')}">
        v<ui-asset class="flex-1" v-value="mouthA" type="cc.SpriteFrame" droppable="asset"></ui-asset>
      </ui-prop>
      <ui-prop name="B" tooltip="${Editor.T('lipsync.mouthB')}">
        <ui-asset class="flex-1" v-value="mouthB" type="cc.SpriteFrame" droppable="asset"></ui-asset>
      </ui-prop>
      <ui-prop name="C" tooltip="${Editor.T('lipsync.mouthC')}">
        <ui-asset class="flex-1" v-value="mouthC" type="cc.SpriteFrame" droppable="asset"></ui-asset>
      </ui-prop>
      <ui-prop name="D" tooltip="${Editor.T('lipsync.mouthD')}">
        <ui-asset class="flex-1" v-value="mouthD" type="cc.SpriteFrame" droppable="asset"></ui-asset>
      </ui-prop>
      <ui-prop name="E" tooltip="${Editor.T('lipsync.mouthE')}">
        <ui-asset class="flex-1" v-value="mouthE" type="cc.SpriteFrame" droppable="asset"></ui-asset>
      </ui-prop>
      <ui-prop name="F" tooltip="${Editor.T('lipsync.mouthF')}">
        <ui-asset class="flex-1" v-value="mouthF" type="cc.SpriteFrame" droppable="asset"></ui-asset>
      </ui-prop>
      <ui-prop name="G(${Editor.T('lipsync.optional')})" tooltip="${Editor.T('lipsync.mouthG')}">
        <ui-asset class="flex-1" v-value="mouthG" type="cc.SpriteFrame" droppable="asset"></ui-asset>
      </ui-prop>
      <ui-prop name="H(${Editor.T('lipsync.optional')})" tooltip="${Editor.T('lipsync.mouthH')}">
        <ui-asset class="flex-1" v-value="mouthH" type="cc.SpriteFrame" droppable="asset"></ui-asset>
      </ui-prop>
      <ui-prop name="X(${Editor.T('lipsync.optional')})" tooltip="${Editor.T('lipsync.mouthX')}">
        <ui-asset class="flex-1" v-value="mouthX" type="cc.SpriteFrame" droppable="asset"></ui-asset>
      </ui-prop>
    </ui-section>
    <ui-section>
      <div class="header">${Editor.T('lipsync.recording')}</div>
      <ui-prop name="${Editor.T('lipsync.recording')}" tooltip="${Editor.T('lipsync.recordingTips')}">
        <ui-input class="flex-1" placeholder="${Editor.T('lipsync.recordingHolder')}" disabled v-value="recordingFile"></ui-input>
        <ui-button class="blue" id="open" @confirm="onClickOpenFile">${Editor.T('lipsync.openFile')}</ui-button>
      </ui-prop>
      <ui-prop name="${Editor.T('lipsync.isEnglish')}" tooltip="${Editor.T('lipsync.languageTips')}">
        <ui-checkbox v-bind:checked="isEnglish" v-on:change="onCheckIsEnglish"></ui-checkbox>
      </ui-prop>
    </ui-section>
    <ui-section>
      <div class="header">${Editor.T('lipsync.clip')}</div>
      <ui-prop name="${Editor.T('lipsync.clip')}" tooltip="${Editor.T('lipsync.clipTips')}">
        <ui-asset class="flex-1" v-value="animationClip" type="cc.AnimationClip" droppable="asset"></ui-asset>
      </ui-prop>
    </ui-section>
    <hr />
    <ui-button class="green" id="generate" @confirm="onClickGenerate">${Editor.T('lipsync.generate')}</ui-button>
  `,

  ready() {

    new window.Vue({

      el: this.shadowRoot,

      data: {
        recordingFile: null,
        mouthA: null,
        mouthB: null,
        mouthC: null,
        mouthD: null,
        mouthE: null,
        mouthF: null,
        mouthG: null,
        mouthH: null,
        mouthX: null,
        animationClip: null,
        isEnglish: true
      },

      methods: {

        onClickGenerate() {
          Editor.log('isEnglish: ' + this.isEnglish);
          if (!(this.mouthA && this.mouthB && this.mouthC && this.mouthD && this.mouthE &&
              this.mouthF)) {
            Editor.error(Editor.T('lipsync.errorMissingMouth'));
            return;
          }
          if (!this.animationClip) {
            Editor.error(Editor.T('lipsync.errorMissingClip'));
            return;
          }
          if (!this.recordingFile) {
            Editor.error(Editor.T('lipsync.errorMissingAudio'));
            return;
          }
          this._rhubarb();
        },

        onCheckIsEnglish() {
          this.isEnglish = !this.isEnglish;
        },

        onClickOpenFile() {
          let res = Editor.Dialog.openFile({
            title: Editor.T('lipsync.openFile'),
            defaultPath: Editor.Project.path,
            properties: ['openFile'],
            filters: [{
              name: 'Audios',
              extensions: ['wav', 'ogg']
            }],
            multiSelections: false
          });
          if (res !== -1) {
            this.recordingFile = res[0];
            Editor.log(Editor.T('lipsync.selected') + res[0]);
          }
        },

        _getUuidByValue(value) {
          switch (value) {
            case 'A':
              return this.mouthA;
            case 'B':
              return this.mouthB;
            case 'C':
              return this.mouthC;
            case 'D':
              return this.mouthD;
            case 'E':
              return this.mouthE;
            case 'F':
              return this.mouthF;
            case 'G':
              return this.mouthG;
            case 'H':
              return this.mouthH;
            case 'X':
              return this.mouthX;
            default:
              return null;
          }
        },

        _rhubarb() {
          let extendedShapes = '';
          if (this.mouthG) {
            extendedShapes += 'G';
          }
          if (this.mouthH) {
            extendedShapes += 'H';
          }
          if (this.mouthX) {
            extendedShapes += 'X';
          }
          Editor.log('extendedShapes: ' + extendedShapes);
          let cmd = '';
          let recognizer = 'pocketSphinx';
          if (!this.isEnglish) {
            recognizer = 'phonetic';
          }
          if (os.platform() == 'darwin') {
            cmd = `${Editor.url('packages://lipsync/lib/rhubarb')} --extendedShapes "${extendedShapes}" -f json -r ${recognizer} ${this.recordingFile}`;
          } else {
            cmd = `${Editor.url('packages://lipsync/lib/rhubarb.exe')} --extendedShapes "${extendedShapes}" -f json -r ${recognizer} ${this.recordingFile} `;
          }
          Editor.log(Editor.T('lipsync.recognizing'));
          exec(cmd, (error, stdout, stderr) => {
            if (error) {
              Editor.error(stderr);
              return;
            } else {
              try {
                res = JSON.parse(stdout);
                let mouthCues = res.mouthCues;
                // read the source animation clip file
                Editor.log(this.animationClip);
                Editor.assetdb.queryPathByUuid(this.animationClip, (error, filepath) => {
                  try {
                    let content = fs.readFileSync(filepath, 'utf8');
                    anim = JSON.parse(content);
                    anim.sample = 100;
                    anim.speed = 1;
                    anim._name = path.basename(filepath, '.anim');
                    anim._duration = res.metadata.duration;
                    anim.wrapMode = 1;
                    anim.curveData = {
                      'comps': {
                        "cc.Sprite": {
                          "spriteFrame": []
                        }
                      }
                    };
                    let spriteFrame = anim.curveData.comps["cc.Sprite"].spriteFrame;
                    for (let i = 0; i < mouthCues.length; i++) {
                      let mouthCue = mouthCues[i];
                      spriteFrame.push({
                        "frame": mouthCue.start,
                        "value": {
                          "__uuid__": this._getUuidByValue(mouthCue.value)
                        }
                      });
                    }
                    Editor.log(JSON.stringify(anim));
                    // overwrite the animation clip file
                    fs.writeFileSync(filepath, JSON.stringify(anim));
                    Editor.log(Editor.T('lipsync.completed'));
                  } catch (error) {
                    Editor.error(Editor.T('lipsync.failed') + ': ' + JSON.stringify(error.message));
                  }
                });
              } catch (error) {
                Editor.error(Editor.T('lipsync.failed') + ': ' + JSON.stringify(error.message));
              }
            }
          });
        }
      }
    });

  },

  messages: {
    'lipsync:hello'(event) {

    }
  }
});