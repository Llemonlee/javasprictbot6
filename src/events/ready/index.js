import { Events,ActionRowBuilder } from 'discord.js';
import { createButtons as createJoinButtons } from '@/commands/joinbutton/index.js'; // 为 joinbutton 重命名
import { createButtons as createIdentityButtons } from '@/commands/identitybutton/index.js'; // 为 identitybutton 重命名

const CHANNEL_ID = '1257348357148508210';

export const event = {
  name: Events.ClientReady,
  once: true,
};

export const action = async (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(CHANNEL_ID);
  if (!channel) {
    console.error('找不到指定的频道!');
    return;
  }

  const messages = await channel.messages.fetch({ limit: 100 });
  const buttonMessage = messages.find(msg => msg.author.id === client.user.id && msg.components.length > 0);

  if (buttonMessage) {
    console.log('按钮消息已经发送，不需要重复发送。');
    return;
  }

  const joinButtonsMessage = createJoinButtons();
  const identityButtonsMessage = createIdentityButtons();

  // 将 identityButtonsMessage 中的按钮分成两个 ActionRow
  const firstRowButtons = identityButtonsMessage.components[0].components.slice(0, 5);
  const secondRowButtons = identityButtonsMessage.components[0].components.slice(5);

  const firstRow = new ActionRowBuilder().addComponents(firstRowButtons);
  const secondRow = new ActionRowBuilder().addComponents(secondRowButtons);

  // 发送 join 和 identity 的按钮消息
  await channel.send(joinButtonsMessage);
  await channel.send({ 
    content: identityButtonsMessage.content, 
    components: [firstRow, secondRow] 
  });

  console.log('按钮消息已发送到指定频道!');
};
