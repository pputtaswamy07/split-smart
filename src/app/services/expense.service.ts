import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: Expense[] = [];
  private people: Person[] = [];

  constructor() {}

  addExpense(expense: Expense) {
    this.expenses.push(expense);
    this.updateBalances(expense);
  }

  private updateBalances(expense: Expense) {
    const splitAmount = expense.amount / expense.participants.length;

    expense.participants.forEach((participant) => {
      let person = this.people.find((p) => p.name === participant);
      if (!person) {
        person = { name: participant, amountOwed: 0 };
        this.people.push(person);
      }

      if (participant === expense.paidBy) {
        person.amountOwed -= expense.amount - splitAmount;
      } else {
        person.amountOwed += splitAmount;
      }
    });
  }

  getExpense(): Expense[] {
    return this.expenses;
  }

  getBalanaces(): Person[] {
    return this.people;
  }
}
