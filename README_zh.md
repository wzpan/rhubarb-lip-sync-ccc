# rhubarb-lip-sync-ccc

rhubarb-lip-sync-ccc (简称 lipsync) 是一款专用于 Cocos Creator 的嘴型动画生成插件，它可以根据一段语音生成嘴型动画的 Animation Clip 。适合用于制作游戏角色的说话动画。支持中英文语言。

rhubarb-lip-sync-ccc 基于 [DanielSWolf /rhubarb-lip-sync](https://github.com/DanielSWolf/rhubarb-lip-sync)，在他的基础上添加了对自动生成 Cocos Creator 的 Animation Clip 的支持。

## Demo

* demo 视频：<https://www.bilibili.com/video/BV1V5411G7cm/>
* 相关的示例仓库代码在：<https://github.com/wzpan/lipsync-demo>

## 使用方法

1. 在 Cocos Creator 主菜单中，打开 【extensions】菜单 -> 【lipsync】-> 【launch】。开启 lipsync 的面板。
2. 将嘴型图拖拽到对应的嘴型槽中，完成嘴型绑定。其中，6种嘴型（A, B, C, D, E, F）是必须的；而 G，H，X 嘴型则为可选。但推荐都提供，这样最终生成的结果会更为自然。
3. 从本地选择一个录音文件。如果是非英文语言，建议取消勾选【是英文音频？】的选项。（这个选项将决定使用不同的识别器。对于英文录音，我们使用 PocketSphinx ；而对于其他语音的录音，我们使用 Phonetic。）
4. 创建一个空的 Animation Clip ，并拖入目标 Animation Clip 槽位中。

完成以上四步之后，点击 【生成】 按钮，即开始生成动画。可以打开 Cocos Creator 的控制台面板，查看控制台日志：

```
isEnglish: true
extendedShapes: GHX
识别中...
f5e3f311-875c-4fba-a235-173a82141735
{"__type__":"cc.AnimationClip","_name":"happy_birthday","_objFlags":0,"_duration":1.32,"sample":100,"curveData":{"comps":{"cc.Sprite":{"spriteFrame":[{"frame":0,"value":{"__uuid__":"ac9ba9a0-efb8-4576-8d8a-6e9c4a178d2e"}},{"frame":0.04,"value":{"__uuid__":"a3aec0dc-fca3-4d4a-a93a-7e49a6f062a1"}},{"frame":0.22,"value":{"__uuid__":"d0778f9c-6403-42b6-9170-50783cdb777a"}},{"frame":0.3,"value":{"__uuid__":"e8474869-278a-4198-b6b9-3512bad62d54"}},{"frame":0.47,"value":{"__uuid__":"d0778f9c-6403-42b6-9170-50783cdb777a"}},{"frame":0.55,"value":{"__uuid__":"31364f93-705e-4cdb-b126-5acc5a5fd1c9"}},{"frame":0.79,"value":{"__uuid__":"dadaffea-9cc3-4082-b1b2-02d84200792b"}},{"frame":0.93,"value":{"__uuid__":"e8474869-278a-4198-b6b9-3512bad62d54"}},{"frame":1.21,"value":{"__uuid__":"ac9ba9a0-efb8-4576-8d8a-6e9c4a178d2e"}}]}}},"events":[],"speed":1,"wrapMode":1}
生成成功！
```

如果出现 “生成成功！” 的消息，说明生成已经成功。此时可以将该 Animation Clip 拖动到嘴巴节点的 Animation 组件上，看看效果。

> 温馨提示：如果发现虽然动画生成成功，但是该动画没有任何帧，可以重启 Cocos Creator 看看问题是否解决。

## 如何获取帮助

目前只在 Mac 上测试过， Windows 上理论上也可以支持。

如果使用上遇到问题，请在 [demo](https://github.com/wzpan/lipsync-demo/issues) 仓库上提 issue 反馈。建议带上你的测试工程，方便我定位问题。