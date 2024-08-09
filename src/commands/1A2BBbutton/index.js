import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
  .setName("play")
  .setDescription("進行一場2A1B");

  export const action = async(ctx) =>{
    await ctx.reply('我設定好數字了，一起猜猜看')
   }