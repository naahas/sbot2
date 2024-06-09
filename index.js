const { Client, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const client = new Client({
    checkUpdate: false,
});
const client2 = new Client({
    checkUpdate: false,
});

// const config = require('./config.json');

const token = process.env.TOKEN1;
const token2 = process.env.TOKEN2;



client.on('ready', () => {
    console.log(`${client.user.username} is running.`);
    launch()
})



setTimeout(() => {
    client2.on('ready', () => {
        console.log(`${client2.user.username} is running.`);
        launch2()
    })
    client2.login(token2)
}, 120000);




function launch() {
    
    const channel = client.channels.cache.get('785917648693100605');    
    var rdimg;
    var val = 0

    var summon = setInterval(() => {
        rdimg = Math.floor(Math.random() * 30) + 1;
        channel.send(`$ma`)

        setTimeout(() => {
            channel.messages.fetch({ limit: 1 }).then(messages => {
                const last = messages.first();
                // console.log(last)

                if(last.embeds.length > 0 && last.author.username == 'Mudae' && last.components[0].components.length > 0) {
                    const btn = last.components[0].components[0]
                    var found = checkWish(last.embeds[0].author.name)

                    found.then(result => {
                        setTimeout(() => {
                            if(result == true) {
                                btn.click(last)
                            }
                        }, 700);});

                    
                }
            }).catch(console.error);
        }, 1000);
        val++
        if(val == 10) clearInterval(summon)

    }, 3000);


    setInterval(() => {
        resetSummon()
    }, 3600000);
    

}

function resetSummon() {
    
    const channel = client.channels.cache.get('785917648693100605');    
    var val = 0
    
    var summon = setInterval(() => {
        rdimg = Math.floor(Math.random() * 30) + 1;
        channel.send(`$ma`)

        setTimeout(() => {
            channel.messages.fetch({ limit: 1 }).then(messages => {
                const last = messages.first();
                // console.log(last)

                if(last.embeds.length > 0 && last.author.username == 'Mudae' && last.components[0].components.length > 0) {
                    const btn = last.components[0].components[0]
                    var found = checkWish(last.embeds[0].author.name)
                   
                    if(found == true) {
                        setTimeout(() => {
                            btn.click(last)
                        }, 800);
                    }

                    
                }
            }).catch(console.error);
        }, 500);
        val++
        if(val == 10) clearInterval(summon)

    }, 3000);

}

function launch2() {
    
    const channel = client2.channels.cache.get('785917648693100605');    
    var rdimg;
    var val = 0

    var summon = setInterval(() => {
        rdimg = Math.floor(Math.random() * 30) + 1;
        channel.send(`$ma`)

        setTimeout(() => {
            channel.messages.fetch({ limit: 1 }).then(messages => {
                const last = messages.first();
                // console.log(last)

                if(last.embeds.length > 0 && last.author.username == 'Mudae' && last.components[0].components.length > 0) {
                    const btn = last.components[0].components[0]
                    var found = checkWish(last.embeds[0].author.name)

                    found.then(result => {
                        setTimeout(() => {
                            if(result == true) {
                                btn.click(last)
                            }
                        }, 700);});

                    
                }
            }).catch(console.error);
        }, 1000);
        val++
        if(val == 10) clearInterval(summon)

    }, 3000);

    
    setInterval(() => {
        resetSummon2()
    }, 3660000);
    

}

function resetSummon2() {
    
    const channel = client2.channels.cache.get('785917648693100605');    
    var val = 0
    
    var summon = setInterval(() => {
        rdimg = Math.floor(Math.random() * 30) + 1;
        channel.send(`$ma`)

        setTimeout(() => {
            channel.messages.fetch({ limit: 1 }).then(messages => {
                const last = messages.first();
                // console.log(last)

                if(last.embeds.length > 0 && last.author.username == 'Mudae' && last.components[0].components.length > 0) {
                    const btn = last.components[0].components[0]
                    var found = checkWish(last.embeds[0].author.name)
                   
                    if(found == true) {
                        setTimeout(() => {
                            btn.click(last)
                        }, 800);
                    }

                    
                }
            }).catch(console.error);
        }, 500);
        val++
        if(val == 10) clearInterval(summon)

    }, 3000);

}


function checkWishPro(character) {
    return new Promise((resolve, reject) => {
        fs.readFile('wish.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur de lecture du fichier :', err);
                reject(err);
                return;
            }

            const lines = data.split('\n');
            const found = lines.some(line => line.trim() === character);
            resolve(found);
        });
    });
}

async function checkWish(character) {
    try {
        const found = await checkWishPro(character);
        return found
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
}




client.login(token)