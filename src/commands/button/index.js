import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const command = new SlashCommandBuilder()
  .setName("button")
  .setDescription("顯示一個「接收禮物」按鈕");

export const action = async (interaction) => {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('receive_gift')
        .setLabel('接收禮物')
        .setStyle(ButtonStyle.Primary),
    );

  await interaction.reply({
    content: '點擊下方按鈕來接收禮物：',
    components: [row],
  });
};