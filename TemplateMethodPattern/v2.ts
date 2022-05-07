namespace TemplateMethod {
	abstract class AbstractDisplay {
		abstract open(): void
		abstract print(): void
		abstract close(): void

		// TSってfinal使えないんだ・・・
		display() {
			this.open()
			for (let i = 0; i < 5; i++) {
				this.print()
			}
			this.close()
		}
	}

	class CharDisplay extends AbstractDisplay {
		private c: string

		// TSにはcharはないらしい。独自定義する必要がある
		constructor(c: string) {
			super()

			this.c = c
		}

		open(): void {
			console.log('<<')
		}
		print(): void {
			console.log(this.c)
		}
		close(): void {
			console.log('>>')
		}
	}

	class StringDisplay extends AbstractDisplay {
		private str: string

		constructor(str: string) {
			super()

			this.str = str
		}

		open(): void {
			this.printLine()
		}
		print(): void {
			console.log(`| ${this.str} |`)
		}
		close(): void {
			this.printLine()
		}

		private printLine() {
			let line = '+'
			for (let i = 0; i < this.str.length; i++) {
				line += '-'
			}
			line += '+'
			console.log(line)
		}
	}

	class Main {
		main() {
			const displays: AbstractDisplay[] = []
			displays.push(new CharDisplay('c'))
			displays.push(new StringDisplay('hello'))
			displays.push(new StringDisplay('こんにちは'))

			for (const display in displays) {
				displays[display].display()
			}
		}
	}

	new Main().main()
}
