/*
コンストラクタに対して数多くのパラメータをセットする必要がある時に、代わりに使うことが推奨されている実装方法。

「作成過程」を決定する Director と呼ばれるものと「表現形式」を決定する Builder と呼ばれるものを組み合わせることで、オブジェクトの生成をより柔軟にし、そのオブジェクトの「作成過程」をもコントロールすることができるようにするためのパターンです。
*/

class User {
	private _firstName: string
	private _lastName: string
	private _age: number
	private _street: string

	constructor(
		firstName: string,
		lastName: string,
		age: number,
		street: string
	) {
		this._firstName = firstName
		this._lastName = lastName
		this._age = age
		this._street = street
	}
	public print(): void {
		console.log('=== User ===')
		console.log('Name: ', this._firstName, this._lastName)
		console.log('Age: ', this._age)
		console.log('Street: ', this._street)
	}
}

class UserBuilder {
	private _firstName: string
	private _lastName: string
	private _age: number
	private _street: string

	private constructor() {
		this._firstName = ''
		this._lastName = ''
		this._age = -1
		this._street = ''
	}

	// constructorがないと以下のエラーが生じる
	/*
  apple:~/Desktop/ts-design-pattrern (main %=) $ ./node_modules/.bin/ts-node BuilderPattern/index.ts
/Users/apple/Desktop/ts-design-pattrern/node_modules/ts-node/src/index.ts:820
    return new TSError(diagnosticText, diagnosticCodes);
           ^
TSError: ⨯ Unable to compile TypeScript:
BuilderPattern/index.ts:33:10 - error TS2564: Property '_firstName' has no initializer and is not definitely assigned in the constructor.

33  private _firstName: string
            ~~~~~~~~~~
BuilderPattern/index.ts:34:10 - error TS2564: Property '_lastName' has no initializer and is not definitely assigned in the constructor.

34  private _lastName: string
            ~~~~~~~~~
BuilderPattern/index.ts:35:10 - error TS2564: Property '_age' has no initializer and is not definitely assigned in the constructor.

35  private _age: number
            ~~~~
BuilderPattern/index.ts:36:10 - error TS2564: Property '_street' has no initializer and is not definitely assigned in the constructor.

36  private _street: string
            ~~~~~~~

    at createTSError (/Users/apple/Desktop/ts-design-pattrern/node_modules/ts-node/src/index.ts:820:12)
    at reportTSError (/Users/apple/Desktop/ts-design-pattrern/node_modules/ts-node/src/index.ts:824:19)
    at getOutput (/Users/apple/Desktop/ts-design-pattrern/node_modules/ts-node/src/index.ts:1014:36)
    at Object.compile (/Users/apple/Desktop/ts-design-pattrern/node_modules/ts-node/src/index.ts:1322:43)
    at Module.m._compile (/Users/apple/Desktop/ts-design-pattrern/node_modules/ts-node/src/index.ts:1454:30)
    at Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Object.require.extensions.<computed> [as .ts] (/Users/apple/Desktop/ts-design-pattrern/node_modules/ts-node/src/index.ts:1458:12)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12) {
  diagnosticCodes: [ 2564, 2564, 2564, 2564 ]
}
  */

	public static user(): UserBuilder {
		return new UserBuilder()
	}

	public withFirstName(name: string): UserBuilder {
		this._firstName = name
		return this
	}

	public withLastName(name: string): UserBuilder {
		this._lastName = name
		return this
	}

	public withAge(age: number): UserBuilder {
		this._age = age
		return this
	}

	public liveInStreet(street: string): UserBuilder {
		this._street = street
		return this
	}

	public build(): User {
		return new User(
			this._firstName,
			this._lastName,
			this._age,
			this._street
		)
	}
}

let user: User = UserBuilder.user()
	.withFirstName('Dave')
	.withLastName('Johnson')
	.withAge(55)
	.liveInStreet('Example Street 123')
	.build()

console.log('indexの79行目のuser.print()は' + user.print())
