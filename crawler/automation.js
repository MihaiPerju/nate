const constants = require("./constants")
const puppeteer = require("puppeteer")
const { exit } = require("process")

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
    page.on('console', (log) => console.log(log._text))
      
    await page.goto(link)

    await clickStartButton(page)
    await selectCity(page)

    // move to the next page
    await page.click("#next-page-btn")
    await page.screenshot({ path: 'image-logs/6 - moving to page 3.png' })

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
    // wait 2 seconds for the animation
    await page.waitForTimeout(2000)

    await page.screenshot({ path: 'image-logs/4 - city select options appeared.png' })

    // adding the attributes to the selected city
    await page.evaluate(({ actionAttr, actionVal, dictAttr, dictVal })=>{
        const items = document.querySelectorAll("span.custom-option")
        items.forEach(item=>{

            if(item.innerHTML.toLowerCase()===dictVal.toLowerCase()){
                item.setAttribute(actionAttr, actionVal)
                item.setAttribute(dictAttr, dictVal)
            }
        })
    },{
        actionAttr: constants.ACTION_ATTR, 
        actionVal: actions.CLICK,
        dictAttr: constants.DICT_ATTR,
        dictVal: values.city
    })

    captureHtml(page, "5 - added html attribute to desired city option")

    // find the correct city from the options
    const spans = await page.$$('span.custom-option')
    const citySpan = await spans.find(
        async(item)=>{
            const itemInnerText = await (await item.getProperty("innerText")).jsonValue()
            return itemInnerText.toLowerCase()===values.city.toLowerCase()
        }
    )
    await citySpan.click()
    await page.screenshot({ path: 'image-logs/5 - clicked the desired city option.png' })

    // wait 2 seconds for the animation
    await page.waitForTimeout(2000)

    await page.screenshot({ path: 'image-logs/5 - dropdown closed.png' })
}

const clickStartButton=async(page)=>{

    // capture initial page state
    captureHtml(page, "0 - initial page")

    // add the action attribute
    await page.$eval('[value="Start"]', (e, attr, val) => { 
        e.setAttribute(attr, val)
    }, constants.ACTION_ATTR, actions.CLICK)

    captureHtml(page, "0 - add html attribute to start button")

    await page.click('[value="Start"]')

    captureHtml(page, "1 - clicked start button")
    await page.screenshot({ path: 'image-logs/1 - clicked start button.png' })

    // wait for the loading text to disappear
    await page.waitForSelector('#loading-msg[hidden]',{ timeout:0 })

    captureHtml(page, "2 - wait for loading to disappear")
    await page.screenshot({ path: 'image-logs/2 - wait for loading to disappear.png' })
}

module.exports={
    crawl,
    clickStartButton,
    selectCity,

}