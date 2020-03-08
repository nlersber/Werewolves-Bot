const Discord = require("discord.js"); //Load discord library
const bot = new Discord.Client(); //Loading bot itself

bot.on("message", message => {
  if (message.content == "ping") message.channel.send("pong");
});



bot.login("Njg2MzQ0MzIyMDg5NjE1Mzg3.XmV62Q.IjB8XDY6B6YEeygBKe8h1NM3gQQ");
