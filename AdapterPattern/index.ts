// サードパーティの API を使用した時、そのバージョンによるインターフェースの差分を吸収する例です。Adaptor パターンには 委譲 と 継承 の 2 つの構文があります。

interface ThirdPartyApi {
	refreshToken(token: string): string
}

/*
Adapter(移譲)
*/
class ThirdPartyApiImpl implements ThirdPartyApi {
	private api = new ApiForV1()
  // privateでapiをnewしてそれをメソッドで返すようにしている(wrapper)

	refreshToken(token: string): string {
		return this.api.refreshToken(token)
	}
}

/*
Adaptee
*/
class ApiForV1 implements ThirdPartyApi {
  sdk = new SdkForV1();

  refreshToken(token: string): string {
    return this.sdk.getTokenInfo(token).refresh().token()
  }
}

class ApiForV2 implements ThirdPartyApi {
  sdk = new SdkForV2();

  refreshToken(token: string): string {
    return this.sdk.login(token).generateNewToken();
  }
}
