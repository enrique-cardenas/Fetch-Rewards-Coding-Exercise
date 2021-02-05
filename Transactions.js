const { MinPriorityQueue } = require('@datastructures-js/priority-queue')
const TransactionRecord = require('./TransactionRecord')


class Transactions {
  constructor() {
    // Min Priority Queue with date as priority
    this.history = new MinPriorityQueue({ priority: (transaction) => transaction.date })

    // Map payer's name to total amount points contributed to the user
    this.payerTotalPoints = new Map()
  }

  addTransaction(transaction){
    this.history
      .enqueue({transaction, date: transaction.date})

    const payerName = transaction.payerName

    // Calculate payer's total points or set initial
    this.payerTotalPoints.set(payerName,
      this.payerTotalPoints.has(payerName) ? 
        this.payerTotalPoints.get(payerName) + transaction.points
        :
        transaction.points
    )
  }

  deductPoints(totalDeductionPoints){
    if(this.history.size() === 0){
      return []
    }

    // Map payer's name to the total amount of deduction points
    const deductionMap = new Map()

    while(totalDeductionPoints > 0 && this.history.size() > 0){
      const element = this.history.dequeue().element
      const curTransaction = element.transaction

      let curDeduction = 0

      // Check if the current transaction's points will make total deduction points zero
      // This will decide the value of curDeduction
      if(totalDeductionPoints - curTransaction.points <= 0){
        // if total deduction points is zero, subtract it from current transaction and enqueue transaction
        curTransaction.points -= totalDeductionPoints
        this.history.enqueue(element)
        curDeduction = totalDeductionPoints
        totalDeductionPoints = 0
      }
      else{
        // else subtract current transaction's points from total deduction points
        totalDeductionPoints -= curTransaction.points
        curDeduction = curTransaction.points
      }

      // Set each payer's total deduction
      deductionMap.set(curTransaction.payerName,
        deductionMap.has(curTransaction.payerName) ?
          deductionMap.get(curTransaction.payerName) - curDeduction
          :
          -curDeduction
      )

    }


    const deductionRecords = []
    for(let payerName of deductionMap.keys()){
      const deductionAmount = deductionMap.get(payerName)
      const deductionRecord = new TransactionRecord(payerName, deductionAmount, 'now')
      
      // Track total points deducted from payer
      deductionRecords.push(deductionRecord)

      // Calculate payer's new total points
      this.payerTotalPoints.set(payerName,
        this.payerTotalPoints.get(payerName) + deductionAmount
      )
    }
    return deductionRecords
  }

  getPointBalance() {
    const pointBalance = []

    for(let payerName of this.payerTotalPoints.keys()){
      pointBalance.push(
        {
          payerName, 
          points: this.payerTotalPoints.get(payerName)
        })
    }
    
    return pointBalance
  }
}

module.exports = Transactions