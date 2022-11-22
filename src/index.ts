import {Context, Schema, segment} from 'koishi'

export const name = 'twitter-video-downloader'

//const urlValidation = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
const ApiEndpoint = 'https://mp3downy.com/Home/StartProgressTwitterDownload'

export interface Config {
  //showWarning?: boolean
  parseUrl?: boolean
  showVideoUrl?: boolean
}

export const Config: Schema<Config> = Schema.object({
  //showWarning: Schema.boolean().default(false).description('解析失败时是否发送提示。'),
  parseUrl: Schema.boolean().default(true).description('是否解析Twitter链接。如果为否，则只能通过命令调用。'),
  showVideoUrl: Schema.boolean().default(true).description('是否发送视频链接。'),
})

//let dispose: () => boolean | void

export function apply(ctx: Context, config: Config) {
  const {parseUrl, showVideoUrl} = config

  //if(parseUrl){
  ctx.middleware(async (session, next) => {
    if (!parseUrl) return next()
    if (!session.content.includes('twitter.com')) return next()
    const result = await handleUrl(session.content)
    if (result === 'Error (or) no supported video found.' || result.result.VideosInfo.length === 0) return next()
    const {VideosInfo} = result.result
    if(showVideoUrl) await session.sendQueued(VideosInfo[VideosInfo.length - 1].Url)
    await session.sendQueued(segment.video(VideosInfo[VideosInfo.length - 1].Url))
    return next()
  })
  //} else if (dispose) dispose();

  ctx.command('twvd <url:text>', 'Twitter视频下载')
    .action(async ({session}, url) => {
      if (!url) return '请提供url。'
      //const match = url.match(urlValidation)
      if (!url.includes('twitter.com')) return '无效的url。'
      const result = await handleUrl(url)
      if (result === 'Error (or) no supported video found.') return '无效的url。'
      if (result.result.VideosInfo.length === 0) return '未找到视频。'
      const {VideosInfo} = result.result
      const bestQualityVideo = VideosInfo[VideosInfo.length - 1]
      if(showVideoUrl) await session.sendQueued(bestQualityVideo.Url)
      return segment.video(bestQualityVideo.Url)
    })

  function handleUrl(url: string) {
    return ctx.http.post(ApiEndpoint, {
      Quantity: 'MP4',
      Type: 'MP4',
      Url: url
    })
  }
}
