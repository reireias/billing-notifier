const { Storage } = require('@google-cloud/storage')

const storage = new Storage()

const lastFileName = async (bucket) => {
  const [files] = await storage.bucket(bucket).getFiles()
  return files[files.length - 1].metadata.name
}

const getReport = async (bucket) => {
  const name = await lastFileName(bucket)
  const [res] = await storage.bucket(bucket).file(name).download()
  return JSON.parse(res.toString())
}

const getCost = async (bucket) => {
  const records = await getReport(bucket)
  let sum = 0
  records.forEach((record) => {
    sum += Number(record.cost.amount)
    if (record.credits) {
      record.credits.forEach((credit) => {
        sum += Number(credit.amount)
      })
    }
  })
  return sum.toFixed(2)
}

module.exports.getCost = getCost
