MochaとSinon.jsを使用したテストコードを作成します。Mocha + Sinon.jsを使用した包括的なテストスイートを作成しました。以下の特徴があります：

## テストの特徴

1. **包括的なカバレッジ**
   - 全ての`mode`(`wait`, `go`, `goSub`, `end`, `back`, `resetBack`)をテスト
   - エラーハンドリングのテスト
   - レスポンス結合のテスト

2. **Sinonによるモック・スタブ**
   - `context`オブジェクトのすべてのメソッドをスタブ化
   - 関数の戻り値を制御
   - 呼び出し回数と引数の検証

3. **テストケースの詳細**
   - **wait mode**: 即座にリターンすることを確認
   - **go mode**: `getExecuteFunction`が呼ばれ、次の関数が実行されることを確認
   - **goSub mode**: `goSub`と`enterSubworkflow`が適切に呼ばれることを確認
   - **end mode**: `endSub`の戻り値によって分岐することを確認
   - **back mode**: `back`関数が呼ばれることを確認
   - **resetBack mode**: `reset`と`enterSubworkflow`が呼ばれることを確認

4. **エラーハンドリング**
   - 未知のmodeに対してエラーがthrowされることを確認

## 実行方法

```bash
npm install --save-dev mocha chai sinon
npx mocha workflow-executor.test.js
```

このテストスイートにより、`executeWorkflow`関数の動作が仕様通りであることを確認できます。各テストは独立しており、`beforeEach`でモックオブジェクトが初期化され、`afterEach`でSinonの状態がリセットされます。