import { Component, importProvidersFrom } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  description = '';
  amount = 0;
  paidBy = '';
  participants: string[] = [];
  participantInput = '';

  constructor(private expenseService: ExpenseService) {}

  addParticipant() {
    if (this.participantInput) {
      this.participants.push(this.participantInput);
      this.participantInput = '';
    }
  }

  addExpense() {
    const newExpense: Expense = {
      id: Date.now(),
      description: this.description,
      amount: this.amount,
      paidBy: this.paidBy,
      participants: this.participants,
      date: new Date(),
    };

    this.expenseService.addExpense(newExpense);
    this.resetForm();
  }
  resetForm() {
    this.description = '';
    this.amount = 0;
    this.paidBy = '';
    this.participants = [];
  }
}
