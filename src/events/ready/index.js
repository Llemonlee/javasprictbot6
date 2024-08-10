import { Events } from 'discord.js';
import { createButtons } from '@/commands/button/index.js'; // 使用正确的导入路径

const CHANNEL_ID = '1257348357148508210';
const BUTTON_MESSAGE_ID = 'buttonMessageId'; // 用于存储按钮消息的 ID

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

  // 检查是否已经发送过按钮消息
  const messages = await channel.messages.fetch({ limit: 100 }); // 获取最近的100条消息
  const buttonMessage = messages.find(msg => msg.author.id === client.user.id && msg.components.length > 0);

  if (buttonMessage) {
    console.log('按钮消息已经发送，不需要重复发送。');
    return;
  }

  // 如果没有找到则发送新的按钮消息
  const newButtonMessage = createButtons();
  const sentMessage = await channel.send(newButtonMessage);

  console.log('按钮消息已发送到指定频道!');
};
