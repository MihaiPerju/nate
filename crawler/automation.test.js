const constants = require("./constants")
const puppeteer = require("puppeteer")

jest.setTimeout(20000)

const { actions, values, link }=constants

const { clickStartButton } = require("./automation")

const init = async()=>{
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();

    return { browser, page }
}

// const clickStartButton=async(page)=>{

//     // capture initial page state
//     await page.screenshot({ path: '0 - initial page.png' })

//     // add the action attribute
//     await page.$eval('[value="Start"]', (e, attr, val) => { 
//         e.setAttribute(attr, val)
//     }, constants.ACTION_ATTR, actions.CLICK)

//     await page.click('[value="Start"]')

//     await page.screenshot({ path: '1 - clicked start button.png' })

//     // wait for the loading text to disappear
//     await page.waitForSelector('#loading-msg[hidden]',{ timeout:0 })

//     await page.screenshot({ path: '2 - wait for loading to disappear.png' })

// }

test("it should click the start button", async() => {
    const { browser, page }= await init()

    await page.goto(link);

    await clickStartButton(page)
    const hiddenLoading = await page.$$('#loading-msg[hidden]')
    expect(hiddenLoading.length).not.toBe(0)

    await browser.close()
})