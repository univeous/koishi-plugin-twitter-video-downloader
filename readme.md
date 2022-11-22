# koishi-plugin-twitter-video-downloader

[![npm](https://img.shields.io/npm/v/koishi-plugin-twitter-video-downloader?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-twitter-video-downloader)

Twitter视频下载插件 For [Koishi](https://github.com/koishijs/koishi) v4。

**本插件所用到的api已失效。在找到其他合适的api之前暂时archive。**

请确保你的bot运行在一个适当的网络环境下。

## 配置项

### parseUrl

- 类型: `boolean`
- 默认值: `true`

是否解析Twitter链接。如果为否，则只能通过命令调用。

### showVideoUrl

- 类型: `boolean`
- 默认值: `true`

是否发送视频链接。

## 指令：twvd

- 基本语法：`twvd <url>`
