import { start_spam as start } from '../tiktok/main.js';

export async function followers(user_id, login, pass) {
    const count ='200';
    // const user_id = '7180023994677724165';

    const url = 'https://scraptik.p.rapidapi.com/list-followers?user_id='+String(user_id)+'&count='+count+'&max_time=0';
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd0e8d34358msh4d8f0797ea76e16p14ca4ejsndd5c90516902',
        'X-RapidAPI-Host': 'scraptik.p.rapidapi.com'
    }
    };
    let users = []
    var response = await fetch(url, options);
    var resp = await response.json()
    let i = 0;
    console.log(resp)
    while (i < await resp['followers'].length) { // выводит 0, затем 1, затем 2
        console.log( await resp['followers'][i]['unique_id'])
        users.push( await resp['followers'][i]['unique_id'])
        i++;
    }
    console.log(users)
    await start(users=users, login=login, pass=pass)
}