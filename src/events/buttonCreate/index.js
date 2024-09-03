import { Events } from 'discord.js';
import { joinbuttonAction } from '@/commands/joinbutton/index.js';
import { identitybuttonAction } from '@/commands/identitybutton';

export const event = {
  name: Events.InteractionCreate,
};

export const action = async (interaction) => {
  if (interaction.isButton()) {
    const customId = interaction.customId;

    // 判断customId属于哪一类按钮，并调用对应的处理函数
    if (['KDButton', 'DemonButton', 'FriendButton'].includes(customId)) {
      await joinbuttonAction(interaction);
    } else if (['barButton', 'apexButton', 'r6Button', 'valorantButton', 'minecraftButton', 'robloxbutton', 'truckbutton'].includes(customId)) {
      await identitybuttonAction(interaction);
    } else {
      await interaction.reply({ content: '未知的按鈕!', ephemeral: true });
    }
  }
};
