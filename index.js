const { IncomingWebhook } = require('@slack/webhook')
const AWS = require('./AWS')

const webhookUrl = process.env.WEBHOOK_URL
const awsBucket = process.env.AWS_BUCKET
const awsPrefix = process.env.AWS_PREFIX

const main = async () => {
  const text = []

  if (awsBucket) {
    const awsCost = await AWS.getCost(awsBucket, awsPrefix)
    text.push(`aws: $ ${awsCost}`)
  }

  if (text.length) {
    const webhook = new IncomingWebhook(webhookUrl)
    await webhook.send({
      text: text.join('\n')
    })
  }
}

;(async () => {
  await main()
})()
