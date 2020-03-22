const got = require('@/utils/got');
const cheerio = require('cheerio');
const host = 'http://www.njau.edu.cn';
const link = host + '/579/listm.htm';
module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: link,
        headers: {
            Referer: host,
        },
    });
    const data = response.data;
    const $ = cheerio.load(data);
    const list = $('span[class="Article_Title"]');
    ctx.state.data = {
    title: '南京农业大学通知公告',
    link: 'http://www.njau.edu.cn/579/listm.htm',
    item:list
            .map((index, item) => {
                item = $(item);
                return {
                    title: item
                        .find('a')
                        .attr('title'),
                    link: item.find('a').attr('href'),
                };
            })
            .get(),
    };
};