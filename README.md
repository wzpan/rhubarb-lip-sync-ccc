# rhubarb-lip-sync-ccc

![](https://forum.cocos.org/uploads/default/optimized/3X/0/a/0a7f636acdc06f1c07b6bd2f55ce83dee06a3b9f_2_1380x698.jpeg)

[中文说明](./README_zh.md)

rhubarb-lip-sync-ccc (short for lipsync) is a Cocos Creator extension for quickly generating 2D mouth animation from voice recordings, based on [DanielSWolf/rhubarb-lip-sync](https://github.com/DanielSWolf/rhubarb-lip-sync). It analyzes your audio files, recognizes what is being said, then automatically generates lip sync information into Cocos Creator Animation Clip. Supports any kind of languages.

## Demo

* Demo tutorial video: <https://www.bilibili.com/video/BV1V5411G7cm/>
* For releated code, please visit [lipsync-demo](https://github.com/wzpan/lipsync-demo).

## How to use

1. From the main menu of Cocos Creator, click【extensions】menu -> 【lipsync】-> 【launch】. Launch the panel of lipsync.
2. Drag all the mouth shape images into the corresponding slot. Among these 9 mouth shapes, 6 of them (A, B, C, D, E, F) are necessary, while the others (G, H, X) are optional. But it's recommend to offer them so as to make the result more natural.
3. Select a local recording file. If it is recorded in another language rather than English, it's better to un-select the checkbox【Is English recording？】. (This will results in the recognizer we choose. For English recordings, we use PocketSphinx, while for other languages we use Phonetic.)
4. Create an empty Animation Clip, and drag into the 【Target Animation Clip】slot.

After finishing the above 4 steps, click【Generate】button and the magic will begins. Now you can open the terminal panel of Cocos Creator and you will see the following logs:

```
isEnglish: true
extendedShapes: GHX
Recognizing...
f5e3f311-875c-4fba-a235-173a82141735
{"__type__":"cc.AnimationClip","_name":"happy_birthday","_objFlags":0,"_duration":1.32,"sample":100,"curveData":{"comps":{"cc.Sprite":{"spriteFrame":[{"frame":0,"value":{"__uuid__":"ac9ba9a0-efb8-4576-8d8a-6e9c4a178d2e"}},{"frame":0.04,"value":{"__uuid__":"a3aec0dc-fca3-4d4a-a93a-7e49a6f062a1"}},{"frame":0.22,"value":{"__uuid__":"d0778f9c-6403-42b6-9170-50783cdb777a"}},{"frame":0.3,"value":{"__uuid__":"e8474869-278a-4198-b6b9-3512bad62d54"}},{"frame":0.47,"value":{"__uuid__":"d0778f9c-6403-42b6-9170-50783cdb777a"}},{"frame":0.55,"value":{"__uuid__":"31364f93-705e-4cdb-b126-5acc5a5fd1c9"}},{"frame":0.79,"value":{"__uuid__":"dadaffea-9cc3-4082-b1b2-02d84200792b"}},{"frame":0.93,"value":{"__uuid__":"e8474869-278a-4198-b6b9-3512bad62d54"}},{"frame":1.21,"value":{"__uuid__":"ac9ba9a0-efb8-4576-8d8a-6e9c4a178d2e"}}]}}},"events":[],"speed":1,"wrapMode":1}
Generation completed!
```

Once you see the "Generation completed!" message, it means that the generation has been done. Now drag the overwritten Animation Clip file to the Animation component of the mouth node and see whether it works.

> Tips: if you find the ouput animation clip contains no frames, try restarting Cocos Creator and it should work.

## How to get help

rhubarb-lip-sync-ccc is only tested on Mac OSX. I haven't try it on Windows but it should work.

If you come across any question, welcome to submit an issue to the [demo](https://github.com/wzpan/lipsync-demo/issues) project. It's suggested to also attach you demo project files so that I can analyze your problem.
