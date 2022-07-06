import { readdirSync } from 'fs'
import { success, getTime } from '../utils/Logger.js'

export default async (client) => {

    console.log(`${success('[ Handler - Commands ]')} [${getTime()}] Carregando comandos...`)

    readdirSync(`./src/commands/`).forEach(async (dir) => {
        const commands = readdirSync(`./src/commands/${dir}`).filter((file) => file.endsWith(`.js`))
      console.log(dir)

        for (let file of commands) {
            const p = await import(`../commands/${dir}/${file}`)
            const pull = await p.default
            console.log(pull)

            if (pull.name) client.commands.set(pull.name, pull)
        }
    })

    console.log(`${success('[ Handler - Commands ]')} [${getTime()}] Comandos carregado!`)
}