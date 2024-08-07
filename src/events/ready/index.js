import {Events} from "discord.js"
import {sendAutoMessage} from '@/commands/button/index.js'

export const event ={
    name:Events.ClientReady,
    once:true,
}

export const action = (readyClient) =>{
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
    sendAutoMessage(readyClient);
}