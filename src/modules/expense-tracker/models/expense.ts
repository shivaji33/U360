import { MasterData } from "../../../api/api";

export interface Expense {
  id: string,
  uid: string,
  expenseDate: string;
  expenseType: MasterData;
  expenseAmount: string,
  transactionId: string,
  expenseDetails: string,
  expenseAttachments: string[],
  bankDetails: MasterData,
  paymentType: MasterData
}
