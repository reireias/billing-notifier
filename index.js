const { IncomingWebhook } = require('@slack/webhook')
const AWS = require('./AWS')
const GCP = require('./GCP')

const webhookUrl = process.env.WEBHOOK_URL
const awsBucket = process.env.AWS_BUCKET
const awsPrefix = process.env.AWS_PREFIX
const gcpBucket = process.env.GCP_BUCKET

const main = async () => {
  const text = []

  if (awsBucket) {
    const awsCost = await AWS.getCost(awsBucket, awsPrefix)
    text.push(`aws: $ ${awsCost}`)
  }

  if (gcpBucket) {
    const gcpCost = await GCP.getCost(gcpBucket)
    text.push(`gcp: ￥${gcpCost}`)
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
