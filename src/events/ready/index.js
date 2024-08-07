import { Events } from 'discord.js';
import { createButton } from '@/commands/button/index.js';

const CHANNEL_ID = '1257348357148508210';

export const event = {
  name: Events.ClientReady,
  once: true,
};

export const action = async (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(CHANNEL_ID);
  if (!channel) {
    console.error('找不到指定的頻道!');
    return;
  }

  const buttonMessage = createButton();
  await channel.send(buttonMessage);
  console.log('按鈕消息已發送到指定頻道!');
};
