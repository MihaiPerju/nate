const fs = require('fs')

const captureHtml=async(page, title)=>{
    pageHtml = await page.content()
    fs.writeFileSync(`html-logs/${title}.html`, pageHtml)
}

module.exports={
    captureHtml,
}