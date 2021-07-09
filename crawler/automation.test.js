const constants = require("./constants")
const puppeteer = require("puppeteer")

jest.setTimeout(20000)

const { actions, values, link }=constants

const { 
    clickStartButton,
    selectCity,
    fillForm,
} = require("./automation")

const init = async()=>{
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })

    const page = await browser.newPage()

    return { browser, page }
}

// test("it should click the start button", async() => {
//     const { browser, page }= await init()

//     await page.goto(link)

//     await clickStartButton(page)
//     const hiddenLoading = await page.$$('#loading-msg[hidden]')
//     expect(hiddenLoading.length).not.toBe(0)

//     await browser.close()
// })

// test("it should select the right city and add the corresponding attributes", async() => {
//     const { browser, page } = await init()

//     await page.goto(link)

//     await clickStartButton(page)
//     await selectCity(page)

//     // find the html element that has the attribute added to it
//     const selectedCity = await page.$$('span[nate-dict-key="London"]')
//     expect(selectedCity).not.toBe(null)

//     await browser.close()
// })

// test("it should select the corresponding city depending on the constants", async() => {
//     const { browser, page } = await init()

//     await page.goto(link)

//     await clickStartButton(page)

//     // altering the constants
//     values.city="Amsterdam"

//     await selectCity(page)

//     // find the html element that has the attribute added to it
//     let selectedCity = await page.$$('span[nate-dict-key="Amsterdam"]')
//     expect(selectedCity).not.toBe(null)

//     values.city="New York"

//     await selectCity(page)

//     // find the html element that has the attribute added to it
//     selectedCity = await page.$$('span[nate-dict-key="New York"]')
//     expect(selectedCity).not.toBe(null)

//     await browser.close()
// })

// test("it should not add an attribute if a city was not selected", async() => {
//     const { browser, page } = await init()

//     await page.goto(link)
//     await clickStartButton(page)

//     // find the html element that has the attribute added to it
//     const selectedCity = await page.$$('span[nate-dict-key="London"]')
//     expect(selectedCity.length).toBe(0)

//     await browser.close()
// })

// test("it should click on the select input and then click on the corresponding city, leaving the click attributes", async() => {
//     const { browser, page } = await init()

//     await page.goto(link)
//     await clickStartButton(page)
//     await selectCity(page)

//     // find the html element that has the attribute added to it
//     const clickedElements = await page.$$('span[nate-action-type="click"]')
//     expect(clickedElements.length).toBe(2)

//     await browser.close()
// })

// test("it should fill the form's inputs accordingly", async() => {
//     const { browser, page } = await init()

//     await page.goto(link)
//     await clickStartButton(page)
//     await selectCity(page)
//     // move to the next page
//     await page.click("#next-page-btn")

//     // initially, there are no completed inputs
//     let nameInput = await page.$$('#name[nate-action-type="input"]')
//     let pwdInput = await page.$$('#pwd[nate-action-type="input"]')
//     let emailInput = await page.$$('#email[nate-action-type="input"]')
//     expect(nameInput.length).toBe(0)
//     expect(pwdInput.length).toBe(0)
//     expect(emailInput.length).toBe(0)

//     await fillForm(page)

//     // find the html element that has the attribute added to it
//     nameInput = await page.$$('#name[nate-action-type="input"]')
//     pwdInput = await page.$$('#pwd[nate-action-type="input"]')
//     emailInput = await page.$$('#email[nate-action-type="input"]')
//     expect(nameInput.length).toBe(1)
//     expect(pwdInput.length).toBe(1)
//     expect(emailInput.length).toBe(1)

//     await browser.close()
// })

test("it should fill the form's gender select accordingly", async() => {
    const { browser, page } = await init()

    await page.goto(link)
    await clickStartButton(page)
    await selectCity(page)
    // move to the next page
    await page.click("#next-page-btn")

    // initially, there are no completed inputs
    let genderInput = await page.$$('input[type="checkbox"][checked]')
    expect(genderInput.length).toBe(0)

    await fillForm(page)

    // find the html element that has the attribute added to it
    genderInputs = await page.$$('input[type="checkbox"][nate-action-type="click"]')
    expect(genderInputs.length).toBe(1)

    let genderInputVal = await (await genderInputs[0].getProperty("value")).jsonValue()
    expect(genderInputVal).toBe("female")


    await browser.close()
})