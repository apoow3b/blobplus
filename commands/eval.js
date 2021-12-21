module.exports.run = async (client, message, args) => {

  
  if(!ids.includes(message.author.id)) return;
  
  const content = message.content.split(" ").slice(1).join(" ")
  try {
      const result = new Promise(async (resolve) => resolve(await eval(content)))
      return result.then(async (output) => {
          if (typeof output !== "string") {
              output = require("util").inspect(output, { depth: 0 })
          }
          if (output.includes(client.token)) {
              output = output.replace(client.token, "T0K3N")
          }
          message.channel.send(output, {
              code: "js"
          })
      })
  } catch  (err) {
      if (err.includes(client.token)) {
          err = err.replace(client.token, "T0K3N");
      }
      message.channel.send(err.stack, {
          code: "js"
      });
  }

}
const ids = ["758561030644170752"]
module.exports.help = {
  name: "eval",
  aliases: []
};