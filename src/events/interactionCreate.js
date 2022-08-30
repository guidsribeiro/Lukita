import { Event } from '../structures/Event.js';

export default class InteractionCreate extends Event {
  constructor() {
    super();
    this.eventName = 'interactionCreate';
  }

  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.guild) return;

    const command = client.commands.getCommand(interaction.commandName);

    
    try {
        if (command.devOnly === true && !client.dev.some((id) => id === interaction.user.id)) {
        return interaction.reply({ content: `⚠️・<@${interaction.member.id}>, Você não é meu desenvolvedor.`, fetchReply: true, ephemeral: true })
        } command?.execute({ interaction });
        } catch (error) {
            await interaction.reply({ content: `> ⚠️・<@${interaction.member.id}>, Ocorreu um erro ao executar o comando! Já avisei meu desenvolvedor.`, ephemeral: true });
        }
    }
}
