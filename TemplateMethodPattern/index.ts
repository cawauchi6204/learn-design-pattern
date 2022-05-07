abstract class Display {
	protected abstract open(): void
	protected abstract print(): void
	protected abstract close(): void

	// 実際に使用させたいテンプレートは大元のクラスにおく
	display(): void {
		this.open()
		for (let i = 0; i < 5; i++) {
			this.print()
		}
		this.close()
	}
}

class CharDisplay extends Display {
	private readonly char: string
	constructor(char: string) {
		super()
		this.char = char
	}
	open() {
		process.stdout.write('<<')
	}
	print() {
		process.stdout.write(this.char)
	}
	close() {
		console.log('>>')
	}
}

class StringDisplay extends Display {
	private readonly str: string
	private readonly width: number

	constructor(str: string) {
		super()
		this.str = str
		this.width = this.getWidth()
	}

	open() {
		this.printLine()
	}

	print() {
		console.log(`|${this.str}|`)
	}

	close() {
		this.printLine()
	}

	private printLine() {
		console.log(`+${Array(this.width).fill('-').join('')}+`)
	}

	private getWidth(): number {
		let width = 0
		for (const s of this.str) {
			width += s.match(/[ -~]/) ? 1 : 2
		}
		return width
	}
}

const charDisplayInstance: Display = new CharDisplay('A')
charDisplayInstance.display()

const enStrDisplay: Display = new StringDisplay('Hello World.')
enStrDisplay.display()

const jpStrDisplay: Display = new StringDisplay('こんにちは。')
jpStrDisplay.display()

/*
今回の例では、前処理(open())→メインの処理(print()×5回)→後処理(close()) という大枠については、スーパークラスで定義されたものをそのままサブクラスで利用していました。

もし、CharDisplayクラスとStringDisplayクラスだけをいきなり書き始めた場合は、 それぞれのクラスで独自にdisplay()メソッドを実装する必要があるため、 同じ処理が重複して記述されることになります。 そのため、いざdisplay()の処理内容を変えようとした場合、それぞれのクラスで修正が必要になってしまうので、 保守性も低くなってしまうと思います。

処理の枠組みは同じで、細かい挙動が違うようなクラスを複数定義するときに、 Template Methodが使えないかを検討してみると良さそうですね。
*/
