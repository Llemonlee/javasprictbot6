import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
  .setName("joinbutton")
  .setDescription("顯示身分組按鈕");

export const createButtons = () => {
  const visitorButton = new ButtonBuilder()
    .setCustomId('KDButton')
    .setLabel('KD邀我的!')
    .setStyle(ButtonStyle.Primary);

  const demonButton = new ButtonBuilder()
    .setCustomId('DemonButton')
    .setLabel('DEMONALNNS邀我的!')
    .setStyle(ButtonStyle.Danger);

  const foolButton = new ButtonBuilder()
    .setCustomId('FriendButton')
    .setLabel('我的朋朋邀的!')
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder()
    .addComponents(visitorButton, demonButton, foolButton);

  return { 
    content: '是誰發送邀請給你讓你跳入這火坑此伺服器的?\n請不要亂選 這個正確答案就只有如實回答 ٩(๑ `н´๑)۶\n－－－－－－－－－－－－－－－－－－\n⚠️ 未領取這邊身分組是看不到任何東西的喔', 
    components: [row] 
  };
};

export const action = async (ctx) => {
  await ctx.reply(createButtons());
};

export const joinbuttonAction = async (interaction) => {
  const roleMappings = {
    KDButton: { id: '1257691227789328435', label: 'KD邀我的!' },
    DemonButton: { id: '1257691227789328436', label: 'DEMONALNNS邀我的!' },
    FriendButton: { id: '1257691227789328437', label: '我的朋朋邀的!' }
  };

  const selectedRole = roleMappings[interaction.customId];
  if (!selectedRole) {
    await interaction.reply({ content: '未知的按鈕!', ephemeral: true });
    return;
  }

  const member = interaction.guild.members.cache.get(interaction.user.id);

  if (member) {
    const ownedRole = Object.values(roleMappings).find(role => member.roles.cache.has(role.id));

    if (ownedRole) {
      if (ownedRole.id === selectedRole.id) {
        await interaction.reply({ content: `你已經擁有 ${ownedRole.label} 身分組了`, ephemeral: true });
      } else {
        const taunts = [
          `你已經按下 ${ownedRole.label} 按鈕，你這個三心二意的人渣!!(°ㅂ° ╬)`,
          `你就按了 ${ownedRole.label} 看不出來只有一次機會嗎ᕙ( ︡'︡益'︠)ง`,
          `你明明就是 ${ownedRole.label}，你個智障!!`
        ];
        const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
        await interaction.reply({ content: randomTaunt, ephemeral: true });
      }
    } else {
      try {
        await member.roles.add(selectedRole.id);
        await interaction.reply({ content: `你選擇了 ${selectedRole.label}，記得選取你想要的身份角色!`, ephemeral: true });
      } catch (error) {
        console.error('添加角色时出错:', error);
        await interaction.reply({ content: '無法添加角色。', ephemeral: true });
      }
    }
  } else {
    await interaction.reply({ content: '無法找到用戶。', ephemeral: true });
  }
};
