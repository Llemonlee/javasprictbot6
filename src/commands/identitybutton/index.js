import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
  .setName("identitybutton")
  .setDescription("顯示遊戲身分按鈕");

export const createButtons = () => {
  const barButton = new ButtonBuilder()
    .setCustomId('barButton')
    .setLabel('視覺小說配音員')
    .setStyle(ButtonStyle.Primary);

  const apexButton = new ButtonBuilder()
    .setCustomId('apexButton')
    .setLabel('APEX瘋狗小隊')
    .setStyle(ButtonStyle.Primary);

  const r6Button = new ButtonBuilder()
    .setCustomId('r6Button')
    .setLabel('R6瘋狗小隊')
    .setStyle(ButtonStyle.Primary);

  const valorantButton = new ButtonBuilder()
    .setCustomId('valorantButton')
    .setLabel('特戰瘋狗小隊')
    .setStyle(ButtonStyle.Primary);

  const minecraftButton = new ButtonBuilder()
    .setCustomId('minecraftButton')
    .setLabel('minecraft好朋朋')
    .setStyle(ButtonStyle.Primary);

  const robloxbutton = new ButtonBuilder()
    .setCustomId('robloxbutton')
    .setLabel('Roblox好朋朋')
    .setStyle(ButtonStyle.Primary);

  const truckbutton = new ButtonBuilder()
    .setCustomId('truckbutton')
    .setLabel('老司機')
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder()
    .addComponents(
        barButton, 
        apexButton, 
        r6Button, 
        valorantButton, 
        minecraftButton,
        robloxbutton,
        truckbutton
    );

  return { 
    content: '選擇你會玩或是想玩但找不到遊戲夥伴的身分組\n以後只要他們就可以召喚啦(｡•̀ᴗ-)✧₊˚\n↓　↓　↓　↓　↓　↓　↓　↓　↓　↓　↓\n－－－－－－－－－－－－－－－－\n喜歡為視覺小說奉獻聲音的人＠視覺小說配音員\n－－－－－－－－－－－－－－－－\nAPEX想多人一起同樂但找不到人？＠APEX\n－－－－－－－－－－－－－－－－\nR6有很多不會溝通的隊友嗎？＠R6瘋狗小隊\n－－－－－－－－－－－－－－－－\n特戰需要隊友配合但沒人？@特戰瘋狗小隊\n－－－－－－－－－－－－－－－－\nMINECRAFT自己玩孤單寂寞覺得冷？＠minecraft好朋朋\n－－－－－－－－－－－－－－－－\n你有RB？太酷了吧！一起玩啊！@Roblox好朋朋\n－－－－－－－－－－－－－－－－\n↑　↑　↑　↑　↑　↑　↑　↑　↑　↑　↑', 
    components: [row] 
  };
};

export const action = async (ctx) => {
  await ctx.reply(createButtons());
};

export const identitybuttonAction = async (interaction) => {
  const roleMappings = {
    barButton: { id: '1257554437724045343', label: '視覺小說配音員' },
    apexButton: { id: '1257708549090578502', label: 'APEX瘋狗小隊' },
    r6Button: { id: '1257554395885998111', label: 'R6瘋狗小隊' },
    valorantButton: { id: '1257551617662779452', label: '特戰瘋狗小隊' },
    minecraftButton: { id: '1257730185814605854', label: 'minecraft好朋朋' },
    robloxbutton: { id: '1257554328302915594', label: 'Roblox好朋朋' },
    truckbutton: { id: '1273895213252743210', label: '老司機' }
  };

  const selectedRole = roleMappings[interaction.customId];
  if (!selectedRole) {
    await interaction.reply({ content: '未知的按鈕!', ephemeral: true });
    return;
  }

  const member = interaction.guild.members.cache.get(interaction.user.id);

  if (member) {
    if (member.roles.cache.has(selectedRole.id)) {
      await interaction.reply({ content: `你已經擁有 ${selectedRole.label} 身分組了`, ephemeral: true });
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
