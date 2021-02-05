class TransactionRecord {
  constructor(payerName, points, date){
    this.payerName = payerName
    this.points = points
    this.date = date
  }

  toJSON(){
    return {
      payerName: this.payerName,
      points: this.points,
      date: this.date,
    }
  }
}

module.exports = TransactionRecord