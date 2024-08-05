import { Client, Events, GatewayIntentBits } from "discord.js"
import vueinit from '@/core/vue'
import dotenv from 'dotenv'

import {loadCommands} from '@/core/loader'

loadCommands()
vueinit()
dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);