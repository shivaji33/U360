import { MasterData } from "../../../api/api";

export interface Expense {
  id: string,
  uid: string,
  expenseDate: string;
  expenseType: MasterData;
  expenseAmount: string,
  transactionId: string | null,
  expenseDetails: string,
  expenseAttachment: {rawURL: string,size: number, fileType: string, downloadURL?: string}[],
  bankDetails: MasterData | null,
  paymentType: MasterData,
}
