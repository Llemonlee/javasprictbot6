import { Events } from 'discord.js';
import { buttonAction } from '@/commands/button/index.js';

export const event = {
  name: Events.InteractionCreate,
};

export const action = async (interaction) => {
  if (interaction.isButton()) {
    await buttonAction(interaction);
  }
};
