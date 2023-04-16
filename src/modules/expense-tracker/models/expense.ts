import { MasterData } from "../../../api/api";

export interface Expense {
  id: string,
  uid: string,
  expenseDate: string;
  expenseType: MasterData;
  expenseAmount: string,
  expenseDetails: string,
  expenseAttachment: {rawURL: string,size: number, fileType: string, downloadURL?: string}[],
  paymentDetails: {paymentType: MasterData; bankDetails?: MasterData | null;transactionId?: string | null;}[]
}
