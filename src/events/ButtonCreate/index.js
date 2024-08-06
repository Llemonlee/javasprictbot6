const handleReceiveGift = async (interaction) => {
    await interaction.reply('你接收禮物');
  };
  
  module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction) {
      if (!interaction.isButton()) return;
  
      switch (interaction.customId) {
        case 'receive_gift':
          handleReceiveGift(interaction);
          break;
        // 可以在這裡添加其他按鈕的處理邏輯
        default:
          console.log(`未知的按鈕 ID: ${interaction.customId}`);
      }
    },
  };