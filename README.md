# ToDo
**TypeScript / Next.js / NestJS / GraphQL / PostgreSQL / Docker / Chakra UI**を使用して作成したToDoアプリケーションです。

アプリケーションの新規性や機能性が目的ではなく、これらの技術を使用することが目的となっています。

 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"  width="50" height="50"  /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="50" height="50" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"  width="50" height="50" />  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg"  width="50" height="50"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  width="50" height="50"  /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg"  width="50" height="50" />

## 構成

https://github.com/ryhara/ToDo/assets/89718149/f46ff8f4-6e39-4a77-a489-6ee1d6c8b2e9

## 機能
- ToDoの追加
- ToDoのStatus更新
- ToDoの詳細情報更新
- ToDoの削除

https://github.com/ryhara/ToDo/assets/89718149/ea7d0929-ace1-43c0-99d9-eea2c8986f3f

## 実行方法
### backend
backendディレクトリ直下にて実行
```
make up
```

### graphql
graphqlディレクトリ直下でコマンド実行。または、NPMスクリプトから`start:dev`実行
```
nest start --watch
```

### frontend
frontendディレクトリ直下でコマンド実行。または、NPMスクリプトから`dev`を実行
```
npx dev -p 3001
```
## 確認方法
### アプリケーション
http://localhost:3000 にアクセス

### DBの確認
graphqlディレクトリにおいて
```
pnpm prisma studio
```
からの http://localhost:5555 にアクセス


### graphqlのクエリのテスト
http://localhost:3000/graphql にアクセス


## 開発環境

- M1 MacBook Air / macOS Sonoma 14.2.1
- Docker version 24.0.6, build ed223bc
- npm 9.8.1
- pnpm 8.15.1
- node v18.18.2

## 参考資料
- [NestJSでGraphQLサーバを実装する](https://zenn.dev/hakushun/articles/7daac74ae9af25)
- [Next.js + GrapqhQLでTodoアプリを構築する(前編)](https://qiita.com/maaaashi/items/fe52db19759ea8a0be31)
- [NestJSで始めるGraphQLサーバ開発（コードファースト編）](https://qiita.com/G-awa/items/3e15f954c42c86aec659)
- [NestJS+prismaでGraphQLを実装する](https://zenn.dev/karabiner_inc/articles/27ed067c3505a6)
