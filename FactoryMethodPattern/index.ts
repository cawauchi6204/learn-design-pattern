/*
Template Methodパターンをインスタン生成を行う際に適用したデザインパターンのこと。

インスタンスの作り方をスーパークラス側で定めます（具体的なクラス名までは定めません）。
そして、具体的な肉付けはサブクラスで行います。
*/

interface SlimeStatus {
	name: string
	hitPoint: number
	magicPoint: number
	experiencePoint: number
	gold: number
}

const SlimeType = {
	normal: {
		name: 'Slime',
		hitPoint: 6,
		magicPoint: 2,
		experiencePoint: 1,
		gold: 1,
	},
	she: {
		name: 'SheSlime',
		hitPoint: 10,
		magicPoint: 3,
		experiencePoint: 2,
		gold: 1,
	},
	metal: {
		name: 'MetalSlime',
		hitPoint: 4,
		magicPoint: 999,
		experiencePoint: 2010,
		gold: 14,
	},
	liquidMetal: {
		name: 'LiquidMetalSlime',
		hitPoint: 8,
		magicPoint: 999,
		experiencePoint: 20100,
		gold: 21,
	},
}

class Slime {
	name: string
	hitPoint: number
	magicPoint: number
	experiencePoint: number
	gold: number

	constructor(status: SlimeStatus) {
		this.name = status.name
		this.hitPoint = status.hitPoint
		this.magicPoint = status.magicPoint
		this.experiencePoint = status.experiencePoint
		this.gold = status.gold
	}

	public static makeNormal(): Slime {
		return new Slime(SlimeType.normal)
	}
	public static makeShe(): Slime {
		return new Slime(SlimeType.metal)
	}
	public static makeMetal(): Slime {
		return new Slime(SlimeType.metal)
	}
	public static makeLiquidMetal(): Slime {
		return new Slime(SlimeType.liquidMetal)
	}
}

module Runner {
	function viewStatus(slime: Slime): void {
		console.log('Name is: ' + slime.name)
		console.log('Hit Point is: ' + slime.hitPoint)
		console.log('Magic Point is: ' + slime.magicPoint)
		console.log('Experience Point is: ' + slime.experiencePoint)
		console.log('Gold is: ' + slime.gold)
	}

	export function blame() {
		const slimes: Slime[] = [
			Slime.makeNormal(),
			Slime.makeShe(),
			Slime.makeMetal(),
			Slime.makeLiquidMetal(),
		]
		slimes.map((s) => {
			console.log('--------')
			viewStatus(s)
		})
	}
}

Runner.blame()
