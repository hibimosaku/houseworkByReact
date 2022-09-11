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
### 失敗
・stockの型

### 悩み
とりあえず作ったレベルで、最適なコードになっていない。
reactのサイトを読んで、改善点をみつけていく。

・レンダリング回数制限
https://blog.microcms.io/react-best-practices-part2/
重たくなければ気にしないのもあり→最適化必要
毎回stateを作り直す

・suspense
・非同期

### 設計
components → hook   →　model  
　　　　　　　　　　　→　store  →　apiService
                    →　SWR    →　apiService

api →　SWR　→　model →　hooks →　component

特化型api
commondモデル、readモデル
user体験を担保するためにmodelを作成。
各モデルが複雑

コンポーネントとモデルの粒度。

※失敗
機能追加していくうちにコードがぐちゃぐちゃ
・usecase
  規模によってでよいと思っていたが、この規模でもコード書くうちに、どこに書くか迷い
  始めた

・関数の整理が×
・責任がぐちゃぐちゃ



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

# 先生に質問
・モーダル機能の作成失敗
・テストは必須ですよね？
　くせで、UI操作で試してしまう
  チームで分割して作業している？
・型定義　替えたい場合
  - 変数　as
  - 関数  is

# 未着手
・グラフ作成
  - Recharts利用
  
・汎用的な関数を作ろう（リーダブルコード）