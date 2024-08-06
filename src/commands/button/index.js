import {SlashCommandBuilder} from 'discord.js'


export const command = new SlashCommandBuilder()
 .setName("button")
 .setDescription("button command")

export const action = async(ctx) =>{
 await ctx.reply('你按了按鈕!')
}