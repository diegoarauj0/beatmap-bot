import "./setup";
import client from "@discord/app";

const TOKEN = process.env.DISCORD_TOKEN;

client.login(TOKEN);
