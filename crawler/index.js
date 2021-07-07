const constants = require("./constants")
const puppeteer = require("puppeteer")

const crawl=async()=>{
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();

    await page.goto(constants.link);
    await page.click('[value="Start"]')
    await page.waitForSelector('#loading-msg[hidden]',{ timeout:0 })

    await page.screenshot({ path: '1.png' })

    await page.waitForTimeout(2000)

    const spans = await page.$$('span.custom-option');

    const citySpan = spans.find(
        async(item)=>{
            const itemInnerText =await (await item.getProperty("innerText")).jsonValue()
            return itemInnerText.toLowerCase()===constants.city.toLowerCase()
        }
    )

    // const citySpanValue = await (await citySpan.getProperty("innerText")).jsonValue()
    // console.log({citySpanValue})
    await page.screenshot({ path: '2.png' })

    await citySpan.click()
    await page.screenshot({ path: '3.png' })

    await page.click("#next-page-btn")
    await page.screenshot({ path: '4.png' })

    await page.focus('#name')
    await page.keyboard.type(constants.name)

    await page.focus('#pwd')
    await page.keyboard.type(constants.password)
    
    await page.focus('#email')
    await page.keyboard.type(constants.email)
    // await page.focus('#email')
    // await page.keyboard.type(constants.email)

    await page.screenshot({ path: '5.png' })
    
    const selectInputs = await page.$$('input[type="checkbox"]');

    const selectInput = await selectInputs.find(
        async(item)=>{
            const itemValue =await (await item.getProperty("value")).jsonValue()
            return itemValue.toLowerCase()===constants.gender.toLowerCase()
        }
    )

    await selectInput.click()
    await page.screenshot({ path: '6.png' })

    
    await browser.close()

    // await page.evaluate(() => {
    //     const targetNode = document.querySelector("#popup");
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


crawl()