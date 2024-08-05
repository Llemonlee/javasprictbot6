import {SlashCommandBuilder} from 'discord.js'


export const command = new SlashCommandBuilder()
 .setName("hi")
 .setDescription("hi command")

export const action = async(ctx) =>{
 await ctx.reply('hi!')
}