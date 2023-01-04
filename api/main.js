import Puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import { solver_uniq } from './solver.js';

var delay = ( milliseconds ) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function start_spam(users, login, pass) {
        const browser = await Puppeteer.launch( {
            headless: false, 
            slowMo: 50, 
            } );

        var page = await browser.newPage();
        const cookiesstring = await fs.readFile('./cookies1.json');
        const cookies1 = JSON.parse(cookiesstring);
        await page.setCookie(...cookies1);
        await page.goto('https://www.tiktok.com/');
        await delay(5000);
        await page.reload();
        let i = 0;
        while (i < users.length) {
            //запрос в поиске
            await delay(5000)
            var search = await page.waitForXPath('/html/body/div[2]/div[1]/div/div[1]/div/form/input')
            await search.click({ clickCount: 2 })
            await search.type(users[i]);
            var submit = await page.waitForXPath('/html/body/div[2]/div[1]/div/div[1]/div/form/button');
            await submit.click(); //подтверждение запроса
            // открытие первого аккаунта
            var accounts = await page.waitForXPath('/html/body/div[2]/div[2]/div[2]/div[1]/div/div[1]/div[1]/div[2]');
            await accounts.click();
            var user_uniq = await page.waitForXPath('/html/body/div[2]/div[2]/div[2]/div[2]/div[1]/a[2]/p[1]');
            await user_uniq.click();
            // капча с крутилкой, появляется не всегда
            try  {
                await page.$x('/html/body/div[8]/div/div[2]/img[1]');
                await solver_uniq(page=page, delay=delay);
            } catch {
                console.log('No captcha');
            }
            console.log('Переход');
            delay(10000);
            try {
                // открываем первое видео
                var video1 = await page.waitForXPath('/html/body/div[2]/div[2]/div[2]/div/div[2]/div[2]/div/div[1]/div[1]/div/div/a');
                video1.click();
                // оставляем комментарий
                var comm = await page.waitForXPath('/html/body/div[2]/div[2]/div[3]/div[2]/div[4]/div/div[1]/div/div[1]/div/div/div[1]/div');
                await comm.click();
                await comm.type('Comment');
                page.keyboard.press('Enter');
            } catch {
                console.log('Видео у пользователя нету');
            };
            await page.goBack();
            await page.goBack();
            i++;
    }
}