const {Client, Message} = require('discord.js');
const axios = require('axios');
const Config = require('./config.json');

const bot = new Client()

bot.on('ready', ()=>{console.log(`${bot.user.tag} is ready.`)})
bot.on('disconnect', ()=>{console.log('Disconnected from discord...')})

bot.on('message', async (message)=>{
    let prefix = Config.prefix;
    if(!message.content.startsWith(prefix)) return
    if(message.author.bot) return
    let messageArray = message.content.split(new RegExp(/\s+/));
    let args = messageArray.splice(1);
    let cmd = messageArray[0];

    console.log(message.content)

    if(cmd === `${prefix}test`){
        message.reply(`${bot.user.tag} is up and running.`);
    }
    if(cmd === `${prefix}ping`){
        let msg = await message.channel.send('Ping chaaaaaaaaaaaaan!')
        msg.edit(`Latency: ${Math.floor(msg.createdAt - message.createdAt)}ms`)
    }
    if(cmd === `${prefix}clear`){
        message.delete()
        message.channel.bulkDelete(100, true)
        message.channel.send(`Channel Cleared by ${message.author}`).then(m => m.delete({timeout: 5000, reason: "Channel cleared."}))
    }
    if(cmd === `${prefix}invite`){
        message.channel.createInvite()
        .then(invite => message.channel.send(`Invite => ${invite}`))
    }
    if(cmd === `${prefix}botin`){
        if(args <= 0) return message.reply('You didnt send the bot id. => `\${prefix}botin [bot ID]`\ ')
        message.reply(`click! => <https://discord.com/oauth2/authorize?client_id=${args[0]}&scope=bot&guild_id=${message.guild.id}>`)
    }
})

bot.login(Config.token, console.log('Login on discord.'))