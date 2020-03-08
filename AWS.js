const zlib = require('zlib')
const S3 = require('aws-sdk/clients/s3')
const CSV = require('csv-string')

const dateKey = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = 1 + now.getMonth()
  const from = `${year}${String(month).padStart(2, '0')}`
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year
  const to = `${nextYear}${String(nextMonth).padStart(2, '0')}`
  return `${from}01-${to}01`
}

const reportKey = async (bucket, prefix) => {
  const client = new S3()
  const params = {
    Bucket: bucket,
    Key: `${prefix}/${dateKey()}/billing-Manifest.json`
  }
  const result = await client.getObject(params).promise()
  const data = JSON.parse(result.Body.toString())
  return data.reportKeys[0]
}

const getReport = async (bucket, prefix) => {
  const client = new S3()
  const params = {
    Bucket: bucket,
    Key: await reportKey(bucket, prefix)
  }
  const result = await client.getObject(params).promise()
  return zlib.gunzipSync(result.Body).toString()
}

const getCost = async (bucket, prefix) => {
  const body = await getReport(bucket, prefix)
  const [header, ...records] = CSV.parse(body)
  const costIndex = header.indexOf('lineItem/BlendedCost')
  let sum = 0
  records.forEach(record => {
    sum += Number(record[costIndex])
  })
  return sum.toFixed(2)
}

module.exports.getCost = getCost
