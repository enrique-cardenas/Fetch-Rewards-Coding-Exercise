const express = require('express')
const Transactions = require('./Transactions')
const TransactionRecord = require('./TransactionRecord')

const app = express()

app.use(express.json())


const users = new Map()

users.set('Enrique', new Transactions())

// Get point balance
app.get('/api/point-balance/:user', (request, response) => {
  const user = request.params.user
  if(!users.has(user)){
    response.send('User does not exist')
  }

  const userTransactions = users.get(user)
  
  response.send(JSON.stringify(userTransactions.getPointBalance()))
})

/**
 * 
 * @param {string} date string formatted in 'MM/DD HrXM' format
 * return Date object
 */
const parseDate = (date) => {
  const [monthDay, hourXM] = date.split(' ')
  const year = 2021

  let [month, day] = monthDay.split('/')
  month = Number(month)
  day = Number(day)

  let [hour, XM] = hourXM.match(/[\d]{1,2}|AM|PM/g)
  hour = Number(hour)

  if(XM === 'PM'){
    hour = hour + 12
  }

  return new Date(year, month - 1, day, hour, 0, 0)
}

// Deduct points from user
app.post('/api/deduct-points/:user', (request, response) => {
  const user = request.params.user
  if(!users.has(user)){
    response.send('User does not exist')
  }

  const userTransactions = users.get(user)
  const deductionRecords = userTransactions.deductPoints(request.body.points)
  response.send(JSON.stringify(deductionRecords))
})

// Add transaction to user
app.post('/api/add-points/:user', (request, response) => {
  const user = request.params.user
  if(!users.has(user)){
    response.send('User does not exist')
  }


  const date = parseDate(request.body.transactionDate)

  const transaction = new TransactionRecord(
    request.body.payerName,
    request.body.points,
    date
  )

  const userTransactions = users.get(user)
  userTransactions.addTransaction(transaction)

  response.send(request.body)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})