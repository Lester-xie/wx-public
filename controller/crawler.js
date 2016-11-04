/**
 * Created by nali on 16/11/1.
 */
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const complete = require('url');

const Model = require("../models/crawlInfo");

// 设置需要爬取的网页信息
const urls = [];
[
    [1, "http://taobaofed.org", ".article-summary-inner a", p=>p.find("span").prop("alt")],//淘宝前端团队
    [2, "https://aotu.io/index.html", ".mod-post a", p=>p.prop("title")],//凹凸实验室
    [3, "http://fex.baidu.com", ".post-list a", p=>p.closest("li").prop("title")],//百度前端研发部
    [4, "http://www.75team.com", ".title a", p=> p[0].children[0].data],//奇舞团
    [5, "https://jdc.jd.com/archives/category/5-frontend", ".post a:nth-child(2)", p=> p.prop("title")],//京东设计中心
    [6, "http://www.ruanyifeng.com/blog/", ".entry-title a", p=>p.text()]//阮一峰Blog
].map(function (item) {
    urls.push({
        code: item[0],
        url: item[1],
        selector: item[2],
        getTitle: item[3]
    })
});


// 开始爬取
const ep = new eventproxy();
function crawl() {
    ep.after('newArticle', urls.length, function (urlInfo) {
        let data = urlInfo.map(function (item) {
            if (item[1] == null) {
                return;
            }
            let url = item[0].url;
            let html = item[1];
            let $ = cheerio.load(html);

            let saveData = {
                code: item[0].code,
                title: item[0].getTitle($(item[0].selector)),
                url: complete.resolve(url, $(item[0].selector).attr("href"))
            };

            // 和数据库已有数据进行差异判断
            Model.find({code: item[0].code}, function (err, data) {
                if (data.length == 0) {
                    // 保存数据
                    new Model(saveData).save();
                } else {
                    // 更新数据
                    Model.update({code: item[0].code}, {
                        $set: {
                            url: saveData.url,
                            title: saveData.title
                        }
                    }, function (err) {
                    });
                }
            });
            // return (saveData);
        });
        // console.log(data);
    });

    urls.forEach(function (urlInfo) {
        superagent.get(urlInfo.url)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                ep.emit('newArticle', [urlInfo, res && res.text]);
            });
    });
    // 爬取周期设置为1小时
    setTimeout(crawl, 3600 * 1000);
}

module.exports = crawl();