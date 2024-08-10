import { SlashCommandBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
  .setName('clear')
  .setDescription('清除頻道消息');

export const action = async (ctx) => {
  if (!ctx.member.permissions.has('MANAGE_MESSAGES')) {
    await ctx.reply('你不能用啦!!');
    return;
  }

  // 获取频道的消息
  const fetchedMessages = await ctx.channel.messages.fetch({ limit: 100 });

  // 删除所有获取的消息
  try {
    await Promise.all(fetchedMessages.map(message => message.delete()));
    await ctx.reply('清除!!');
  } catch (error) {
    console.error('清除消息失败:', error);
    await ctx.reply('清除消息时发生错误。');
  }
};
