const { Client, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const client = new Client({
    checkUpdate: false,
});

// const config = require('./config.json');

const token = process.env.TOKEN2


client.on('ready', () => {
    console.log(`${client.user.username} is running.`);
    launch()
})



function launch() {
   
    summonTask()


    setInterval(() => {
        console.log('alive')
    }, 600000);


    setInterval(() => {
        summonTask()
    }, 3600000);
    

}

function summonTask() {
    var val = 0
      const channel = client.channels.cache.get('785917648693100605');    
    
    var summon = setInterval(() => {
        channel.send(`$ma`)

        setTimeout(() => {
            channel.messages.fetch({ limit: 1 }).then(messages => {
                const last = messages.first();
                // console.log(last)

                if(last.embeds.length > 0 && last.author.username == 'Mudae' && last.components[0].components.length > 0) {
                    const btn = last.components[0].components[0]
                    checkWish(last.embeds[0].author.name)
                    .then(found => {
                        if (found == true) {
                            setTimeout(() => {
                                btn.click(last);
                            }, 700);
                        }
                    })
                    .catch(error => {
                        console.error('Une erreur est survenue lors de la vérification du souhait :', error);
                    });
                }

            }).catch(console.error);
        }, 800);
        val++
        if(val == 10) clearInterval(summon)

    }, 3500);

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
