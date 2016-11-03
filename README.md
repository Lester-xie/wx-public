# wx-public
微信公众号开发

在拜读了[@alsotang](https://github.com/alsotang)的[《node包教不包会》](https://github.com/alsotang/node-lessons)和
[@i5ting](https://github.com/i5ting)狼叔的[《node.js微信开发》](https://github.com/i5ting/wechat-dev-with-nodejs)后，
决定用公众号开发来练下手。感谢狼叔的node基础讲解和alsotang的爬虫教程。

![](https://mmbiz.qlogo.cn/mmbiz_png/iczytd49VDfPal9nsMLTibyKaNzmL3KcsTSUiaIhcIgaVL47P5E1TTicJOfxD3lopwmGF6jrNwQ3Bziccr2xjLya8UQ/0?wx_fmt=png)
![](https://mmbiz.qlogo.cn/mmbiz_png/iczytd49VDfPal9nsMLTibyKaNzmL3KcsTHeZqGJlib4f7lmAasOd7PzHJ2TmEu9DYovKyuF6An2tusOadf5ak7yA/0?wx_fmt=png)
![](https://mmbiz.qlogo.cn/mmbiz_jpg/iczytd49VDfPal9nsMLTibyKaNzmL3KcsTmbqr1jiaBibQxDH5tvozKicEVku35W7b5W8bxIVaJ2hHoBAZX3HJfJp4w/0?wx_fmt=jpeg)

## 项目描述

该项目仅用于个人学习，爬取了自己平时浏览的博客里的最新文章，通过微信公众号的消息回复形式，返回链接，方便自己浏览。

项目使用了阿里云服务器，express+mongodb和一堆node中间件。

先爬虫获取数据，利用公众号的消息回复功能按照用户的输入来获取返回信息。一小时爬取一次数据，所以会跟最新的博客文章存在最多1小时误差。

##所需技能

1.mongodb+mongoose配置，存取数据

2.express构建服务

3.eventproxy并发编程

4.cheerio(类似于Jquery)dom操作

##可拓展点
可以在菜单栏增加订阅功能，微信用户可以点击订阅，在匹配到数据和上一次不相同时，将会向用户推送该文章链接。

增加留言收集功能。
