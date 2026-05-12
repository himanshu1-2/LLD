class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.balanceSheet = new BalanceSheet();
    }
}

class BalanceSheet {
    constructor() {
        //this.totalYouOwe = 0;
        //this.totalYouGetBack = 0;
        this.userBalances = new Map(); // key: userId, value: amount
    }

    updateBalance(userId, amount) {
        const prev = this.userBalances.get(userId) || 0;
        this.userBalances.set(userId, prev + amount);
    }
}
class Split {
    constructor(user, amount = 0) {
        this.user = user;
        this.amount = amount;
    }
}

class Expense {
    constructor(id, amount, paidBy, splits, splitStrategy) {
        this.id = id;
        this.amount = amount;
        this.paidBy = paidBy;
        this.splits = splits;
        this.splitStrategy = splitStrategy;
    }

    validateAndCalculate() {
        this.splitStrategy.validate(this);
        this.splitStrategy.calculate(this);
    }
}
class SplitStrategy {
    validate(expense) {}
    calculate(expense) {}
}
class EqualSplitStrategy extends SplitStrategy {
    validate(expense) {
        if (!expense.splits.length) {
            throw new Error("No splits provided");
        }
    }

    calculate(expense) {
        const splitAmount = expense.amount / expense.splits.length;

        expense.splits.forEach(split => {
            split.amount = parseFloat(splitAmount.toFixed(2));
        });
    }
}

class ExpenseManager {
    constructor() {
        this.users = new Map();
        this.expenses = [];
    }

    addUser(user) {
        this.users.set(user.id, user);
    }

    addExpense(expense) {
        expense.validateAndCalculate();
        //this.expenses.push(expense);

        const paidBy = expense.paidBy;
         //console.log('expense',expense.splits.length)
        expense.splits.forEach(split => {
           
            if (split.user.id === paidBy.id) return;

            //paidBy.balanceSheet.totalYouGetBack += split.amount;
            //split.user.balanceSheet.totalYouOwe += split.amount;

            paidBy.balanceSheet.updateBalance(split.user.id, split.amount);
            split.user.balanceSheet.updateBalance(paidBy.id, -split.amount);
        });
    }

    showBalances() {
        this.users.forEach(user => {
            //console.log(`Balances for ${user.name}`);
            //console.log(' user.balanceSheet.userBalances',user.balanceSheet.userBalances)
            user.balanceSheet.userBalances.forEach((amount, userId) => {
                if (amount > 0) {
                    console.log(`${this.users.get(userId).id}  ${this.users.get(userId).name} owes ${amount}`);
                }
            });
        });
    }
}

const manager = new ExpenseManager();

const u1 = new User(1, "Himanshu", "h@gmail.com");
const u2 = new User(2, "Rahul", "r@gmail.com");
const u3 = new User(3, "Aman", "a@gmail.com");

manager.addUser(u1);
manager.addUser(u2);
manager.addUser(u3);

const splits = [
    new Split(u1),
    new Split(u2),
    new Split(u3)
];

const expense = new Expense(
    1,
    3000,
    u1,
    splits,
    new EqualSplitStrategy()
);

const expense2 = new Expense(
    2,
    1000,
    u2,
    splits,
    new EqualSplitStrategy()
);

manager.addExpense(expense);
manager.addExpense(expense2);
manager.showBalances();