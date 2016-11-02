/**
 * Created by nali on 16/11/1.
 */
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const complete = require('url');

const Model = require("../models/crawlInfo");

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

const ep = new eventproxy();
ep.after('newArticle', urls.length, function (urlInfo) {

    let data = urlInfo.map(function (item) {
        let url = item[0].url;
        let html = item[1];
        let $ = cheerio.load(html);

        let saveData = {
            code: item[0].code,
            title: item[0].getTitle($(item[0].selector)),
            url: complete.resolve(url, $(item[0].selector).attr("href"))
        };

        new Model(saveData).save(function (err) {
            if (err) {
                console.log("保存失败");
                return err;
            }
        });

        return (saveData);
    });
    console.log(data);
});

urls.forEach(function (urlInfo) {
    superagent.get(urlInfo.url)
        .end(function (err, res) {
            ep.emit('newArticle', [urlInfo, res.text]);
        });
});