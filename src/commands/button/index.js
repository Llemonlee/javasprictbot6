import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
  .setName("button")
  .setDescription("顯示一個按鈕");

export const createButton = () => {
  const button = new ButtonBuilder()
    .setCustomId('myButton')
    .setLabel('點擊我!')
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder()
    .addComponents(button);

  return { content: '這是一個按鈕:', components: [row] };
};

export const action = async (ctx) => {
  await ctx.reply(createButton());
};

export const buttonAction = async (interaction) => {
  if (interaction.customId === 'myButton') {
    await interaction.reply({ content: '你按了按鈕!', ephemeral: true });
  }
};
