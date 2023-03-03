export interface Expense {
  id: number,
  createDate: Date;
  expenseType: string;
  amount: number;
  paidFrom: {
    sourceType: string;
    account: string;
  };
}
