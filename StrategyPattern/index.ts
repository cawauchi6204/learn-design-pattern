// ストラテジパターンなし写経
/*
class Ticket {
	private _type: 'Adult' | 'Child' | 'Pair'

	constructor(type: 'Adult' | 'Child' | 'Pair') {
		this._type = type
	}

	public getPrice(): number {
		switch (this._type) {
			case 'Adult':
				return 3000
			case 'Child':
				return 1000
			case 'Pair':
				return 5000
		}
	}

	public getUserCount(): number {
		switch (this._type) {
			case 'Adult':
			case 'Child':
				return 1
			case 'Pair':
				return 2
		}
	}

	public isAvailableChildAttraction(): boolean {
		switch (this._type) {
			case 'Adult':
			case 'Pair':
				return false
			case 'Child':
				return true
		}
	}
}
*/

// ストラテジパターン
interface TicketStrategy {
	getPrice(): number
	getUserCount(): number
	isAvailableChildAttraction(): boolean
}

// 子供用チケットストラテジ
class ChildTicketStrategy implements TicketStrategy {
	getPrice = () => 1000
	getUserCount = () => 1
	isAvailableChildAttraction = () => true
}

// 大人用チケットストラテジ
class AdultTicketStrategy implements TicketStrategy {
	getPrice = () => 3000
	getUserCount = () => 1
	isAvailableChildAttraction = () => false
}

//ペアチケットストラテジ
class PairTicketStrategy implements TicketStrategy {
	getPrice = () => 5000
	getUserCount = () => 2
	isAvailableChildAttraction = () => false
}

class Ticket {
	private _strategy: TicketStrategy
	constructor(strategy: TicketStrategy) {
		this._strategy = strategy
	}
}
