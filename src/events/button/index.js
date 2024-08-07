import { Events } from "discord.js";
import { handleAutoButton } from "@/commands/button/index.js";

export const event = {
    name: Events.InteractionCreate,
    once: false,
};

export const action = async (interaction) => {
    if (!interaction.isButton()) return;

    try {
        await handleAutoButton(interaction);
    } catch (error) {
        console.error('處理按鈕交互時出錯:', error);
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: '處理您的請求時發生錯誤。', ephemeral: true });
        } else {
            await interaction.followUp({ content: '處理您的請求時發生錯誤。', ephemeral: true });
        }
    }
};