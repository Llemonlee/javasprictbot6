import { Events } from 'discord.js';
import { createButtons } from '@/commands/button/index.js'; // 使用正确的导入路径

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

  const buttonMessage = createButtons();
  await channel.send(buttonMessage);
  console.log('按钮消息已发送到指定频道!');
};
