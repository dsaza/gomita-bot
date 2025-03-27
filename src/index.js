import 'dotenv/config'
import { createServer } from 'node:http';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const botToken = process.env.BOT_TOKEN;
const port = process.env.PORT || 3000;

console.log('Starting bot on port', port);

const bot = new Telegraf(botToken)

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

const server = createServer((req, res) => {
	res.end('Bot is alive');
})

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'));
