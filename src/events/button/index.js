import { Events } from "discord.js";
import { buttonAction } from "../../commands/button/index.js";

export const event = {
    name: Events.InteractionCreate,
    once: false,
};

export const action = async (interaction) => {
    if (!interaction.isButton()) return;

    try {
        await buttonAction(interaction);
    } catch (error) {
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: '處理您的請求時發生錯誤。', ephemeral: true });
        }
    }
};