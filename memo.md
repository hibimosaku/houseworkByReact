# ロジックと

# 作成したこと
・restapi(django)からデータ取得し、フロントで実装
・フロント
　- react(router,recoil)
　- フォルダ構成
  　- component:atomic design
  　- router
  　- store
  　- type:型

機能ごとでわける
userに提供に分ける仕組みごと
・分析、record、stock・・・規模大きければこっちもあり

# やりたいこと
・ユーザ認証(JWT)
httpsで作る

・restapi　件数制限
　- dashbord用　当月、前月のrecord
　- 分析用　全件分のrecord
　- 開発者目線・・考えることを減らす
  ロジックをサーバーですることもできる。

  ↑これ同じデータなので、分ける意味ない？
  　全件とって、フロントでdashbord用と分析用にわける？
  　現状、全件とって、recoil管理している
・useSWR

# できていないこと
・try,catch
・非同期のcatchとfinally
・loading
・在庫詳細に増加の方の数がないのでDB変更
・css
・reminder機能追加



# 先生に質問7/31
・レンタリングがコントロールできない、多い Records.tsx
　これが良いのか悪いのかも不明。多分悪い

　「私の知識」
  以下はレンタリングされるパターン
  
  - stateが更新されたコンポーネント
  - propsが変更されたコンポーネント
  - 再レンダリングされたコンポーネント配下の子要素
- useEffect分レンタリング
- もう一回更新されている。
- useEffectでuseStateを使うべきでない（アンチ）

・useCallback
子コンポーネントで使う関数を再レンタリング防ぐ役割
・memo
propsの変更以外は、子コンポーネントは再レンタリングさせない役割




・データ管理
  - recoil管理。redux?
  - ページ開いたときにデータ取得
  - 違うページだととれないときがある
  - どこでapi取得？
  - いまのところ、ページごとでとってるところもあり
  - ex.stockの場合,以下3ページで利用
  　RecodCreate.tsx,Stocks.tsx,StockDetail.tsx
  　→App.tsxでコントロール？
  →場所をApp.tsxでrecoilでつくる。
  →useswの利用を検討

react


・型定義
 - component自体の定義で、FC
   propsの型、Records.tsxのとこ

# 先生質問8/21
・レンダリング回数制限

・SWR使う？stockで試したがrecoilつかっているし。
restapiのgetを取得する際に便利。そのページで使うとき。
他のページにも値を渡したい場合はrecoil利用として、swrは適さない？
・commponetとセットでデータ保持
・suspenseの使いどころ
・
フォルダ整理。ビジネス概念ごとにしたが、そこにcomponentも含めてよい？

# 知識
【整理】
・親子コンポーネントでは、memoを利用するか検討
・親コンポーネントに、子に渡す関数があれば、usecallbackにする

  以下はレンタリングされるパターン
  - stateが更新されたコンポーネント
  - propsが変更されたコンポーネント
  - 再レンダリングされたコンポーネント配下の子要素


useEffect使う場合
・状態管理したい場合
ローディング後、値の変更がある場合.

?api時に使うのは？
