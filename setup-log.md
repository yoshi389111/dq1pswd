# Setup log - 2025-03-19

初期開発時（実際には create-react-app から vite に切り替えたとき）の手順メモ。

主に、整合性をとったままバージョンを最新化する際の参考にするためのもの。

- node v20.18.3
- npm 11.2.0

```shell-session
npm create vite@latest dq1pswd
```

- Select a framework: React
- Select a variant: TypeScript + SWC

```shell-session
cd dq1pswd
npm install
npm install -D vitest
npm install -D @types/node
```
