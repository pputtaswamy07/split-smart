export interface Expense {
  id: number;
  description: string;
  amount: number;
  paidBy: string; // Person who paid
  participants: string[]; // List of participants
  date: Date;
}
