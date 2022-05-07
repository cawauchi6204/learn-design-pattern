abstract class Department {
	static fiscalYear = 2021
	protected employees: string[] = []

	static createEmployee(name: string) {
		return { name }
	}

	constructor(protected readonly id: string, public name: string) {
		console.log(Department.fiscalYear)
	}

	abstract describe(this: Department): void
}

class AccountingDepartment extends Department {
	private lastReport: string
	private static instance: AccountingDepartment // クラスの中からのみアクセス可能

	private constructor(id: string, private reports: string[]) {
		super(id, 'Accounting')
		this.lastReport = reports[0]
	}

	static getInstance() {
		if (AccountingDepartment.instance) {
			return this.instance
		}

		this.instance = new AccountingDepartment('d2', [])
		return this.instance
	}

	describe() {
		console.log('会計部門 - ID:' + this.id)
	}
}

// const accounting = new AccountingDepartment('d2', []); //クラス外部でnewをさせない

const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance()

console.log(accounting, accounting2)

// constructorにprivateをつけるとnewさせない
