import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

const CHANNEL_ID = '1257348357148508210';

export const sendAutoMessage = async (client) => {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
      console.error('找不到指定的頻道');
      return;
    }

    const button = new ButtonBuilder()
      .setCustomId('autoButton')
      .setLabel('點擊我!')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
      .addComponents(button);

    await channel.send({ content: '這是一個自動發送的訊息，帶有一個按鈕:', components: [row] });
    console.log('自動訊息已發送到指定頻道');
  } catch (error) {
    console.error('發送自動訊息時出錯:', error);
  }
};

export const handleAutoButton = async (interaction) => {
  if (interaction.customId === 'autoButton') {
    await interaction.reply({ content: '你點擊了自動訊息中的按鈕!', ephemeral: true });
  }
};