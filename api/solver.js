export async function solver_uniq(page, delay) {  
    // первая картинка
    const img = await page.waitForXPath('/html/body/div[8]/div/div[2]/img[1]');
    var img1 = await img.getProperty('src');
    console.log(img1);
    const url1 = await img1.jsonValue();
    console.log(url1);
     // вторая картинка из капчи
    const img_small = await page.waitForXPath('/html/body/div[8]/div/div[2]/img[2]');
    const img2 = await img_small.getProperty('src');
    var url2 = await img2.jsonValue();
    //движок слайдера
    var slider = await page.waitForXPath('/html/body/div[8]/div/div[3]/div[2]/div[2]/div');
    var bounding_box = await slider.boundingBox();
    // длина всего слайдера
    var len = await page.waitForXPath('/html/body/div[8]/div/div[3]/div[1]');
    var len_box = await len.boundingBox();

    var data = {
        url1: url1,
        url2: url2
    };
    var url = 'http://85.193.89.12:6247/solve/cQIbNZIweBDe59q5';

    let response = await fetch(url=url, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(data)
    });

    var result = await response.json();
    // result = result.split(' ')
    // console.log(String(result['slider_pixs']))
    var res = String(result['slider_pixs']);
    console.log(res);
    console.log(len_box.width);
    var new_len = len_box.width - res;
    var new2 = len_box.width - new_len + 10;
    await page.mouse.move(bounding_box.x + bounding_box.width / 2, bounding_box.y + bounding_box.height / 2);
    await page.mouse.down();
    await delay(3000);
    await page.mouse.move(bounding_box.x + new2, bounding_box.y + bounding_box.height / 2, {steps: 10} );
    await page.mouse.up();
    await delay(3000);
}