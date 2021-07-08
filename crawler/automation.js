const constants = require("./constants")
const puppeteer = require("puppeteer")
const { exit } = require("process")
const fs = require("fs")

const{ actions, values, link }=constants
const { captureHtml }= require("./helpers")

const crawl=async()=>{
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })

    const page = await browser.newPage()
    await page.goto(link)

    await clickStartButton(page)
    await selectCity(page)
    exit(0)


    await page.focus('#name')
    await page.keyboard.type(values.name)

    await page.focus('#pwd')
    await page.keyboard.type(values.password)
    
    await page.focus('#email')
    await page.keyboard.type(values.email)
    // await page.focus('#email')
    // await page.keyboard.type(values.email)

    await page.screenshot({ path: '5.png' })
    
    const selectInputs = await page.$$('input[type="checkbox"]')

    const selectInput = await selectInputs.find(
        async(item)=>{
            const itemValue =await (await item.getProperty("value")).jsonValue()
            return itemValue.toLowerCase()===values.gender.toLowerCase()
        }
    )

    await selectInput.click()
    await page.screenshot({ path: '6.png' })

    
    await browser.close()

    // await page.evaluate(() => {
    //     const targetNode = document.querySelector("#popup")
    //     console.log(targetNode)

    //     // const observer = new MutationObserver(
    //     // function() {
    //     //   // communicate with node through console.log method
    //     //   console.log('__mutation')
    //     //  }
    //     // )
    //     // const config = {
    //     //   attributes: true,
    //     //   childList: true,
    //     //   characterData: true,
    //     //   subtree: true
    //     // }
    //     // observer.observe(target, config)
    //  })

    // await page.waitForSelector('#popup[hidden]', {timeout: 0})

    // await page.click('#popup input')
    // await page.screenshot({ path: '6.png' })


}

const selectCity = async(page)=>{

    await page.$eval('span.custom-select-trigger', (e, attr, val) => { 
        e.setAttribute(attr, val)
    }, constants.ACTION_ATTR, actions.CLICK)
    captureHtml(page, "3 - added html attribute to city select input")

    await page.click('span.custom-select-trigger')
    await page.screenshot({ path: '2.png' })

    const spans = await page.$$('span.custom-option')
    const citySpan = spans.find(
        async(item)=>{
            const itemInnerText = await (await item.getProperty("innerText")).jsonValue()
            return itemInnerText.toLowerCase()===values.city.toLowerCase()
        }
    )
        
    // const citySpanValue = await (await citySpan.getProperty("innerText")).jsonValue()
    // console.log({citySpanValue})
    await citySpan.evaluate((node, attr, val) => {
        console.log(node)
        node.setAttribute(attr, val)
    },constants.ACTION_ATTR, actions.CLICK)
    
    // captureHtml(page, "3 - added html attribute to desired city option")

    // await citySpan.click()
    // await page.screenshot({ path: '3 - clicked the desired city option.png' })

    // await page.click("#next-page-btn")
    // await page.screenshot({ path: '4.png' })

}

const clickStartButton=async(page)=>{

    // capture initial page state
    await page.screenshot({ path: '0 - initial page.png' })
    captureHtml(page, "0 - initial page")

    // add the action attribute
    await page.$eval('[value="Start"]', (e, attr, val) => { 
        e.setAttribute(attr, val)
    }, constants.ACTION_ATTR, actions.CLICK)

    captureHtml(page, "0 - add html attribute to start button")

    await page.click('[value="Start"]')

    captureHtml(page, "1 - clicked start button")
    await page.screenshot({ path: '1 - clicked start button.png' })

    // wait for the loading text to disappear
    await page.waitForSelector('#loading-msg[hidden]',{ timeout:0 })

    captureHtml(page, "2 - wait for loading to disappear")
    await page.screenshot({ path: '2 - wait for loading to disappear.png' })
}

module.exports={
    crawl,
    clickStartButton
}