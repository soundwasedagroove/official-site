# 早稲田祭ライブ2024 - 静的サイト版

このフォルダには、GitHub Pages で公開可能な静的バージョンの早稲田祭ライブ2024公式サイトが含まれています。

## ファイル構成

```
static-site/
├── index.html          # メインHTMLファイル
├── css/
│   └── styles.css      # すべてのスタイル
├── js/
│   └── script.js       # JavaScript機能
├── images/             # 画像ファイル用（空）
├── audio/              # 音楽ファイル用（空）
└── README.md           # このファイル
```

## 機能

このサイトには元のReactバージョンと同じ機能がすべて含まれています：

- ✅ レスポンシブデザイン（デスクトップ・モバイル対応）
- ✅ アーティスト写真のスライドショー（自動切り替え＋手動操作）
- ✅ スムーズスクロールナビゲーション
- ✅ モバイルハンバーガーメニュー
- ✅ BGM音楽プレイヤー（再生・一時停止・ミュート）
- ✅ 5つのメインセクション（物販・企画詳細・アーティスト・スケジュール・会場案内）
- ✅ SNSリンク付きフッター
- ✅ フェスティバルテーマのデザイン

## GitHub Pages へのデプロイ手順

1. **GitHubリポジトリの準備**
   - GitHubリポジトリを作成済みの場合、このフォルダの中身をすべてルートディレクトリにアップロードしてください

2. **ファイルのアップロード**
   ```
   your-repo/
   ├── index.html
   ├── css/
   │   └── styles.css
   ├── js/
   │   └── script.js
   ├── images/
   └── audio/
   ```

3. **GitHub Pages の設定**
   - リポジトリの Settings > Pages
   - Source: Deploy from a branch
   - Branch: main (または master) 
   - Folder: / (root)
   - Save

4. **公開確認**
   - 数分後に `https://yourusername.github.io/your-repo-name` でアクセス可能

## カスタマイズ

### スライドショー画像の変更
スライドショーの画像は現在外部Unsplash URLを使用していますが、ローカル環境で表示されない場合は以下の方法で修正できます：

**方法1: 自動フォールバック (推奨)**
- 画像が読み込めない場合、自動的に美しいグラデーション背景が表示されます
- インターネット接続不要でサイトが正常に動作します

**方法2: ローカル画像を使用**
- `images/` フォルダに画像ファイル（slide1.jpg、slide2.jpg、slide3.jpg等）を追加
- `index.html` の82-91行目のUnsplash URLを以下のように変更：
  ```html
  <!-- 変更前 -->
  <img src="https://images.unsplash.com/..." alt="...">
  
  <!-- 変更後 -->
  <img src="images/slide1.jpg" alt="...">
  ```

### その他の画像変更
- `images/` フォルダに画像を追加
- `index.html` の `src` 属性を変更

### BGM音楽の追加
- `audio/` フォルダに音楽ファイル（MP3）を追加
- `index.html` の `<audio>` タグの `src` を変更

### 内容の更新
- `index.html` を編集してテキストやデータを変更
- `css/styles.css` で色やデザインを変更

## ブラウザ対応

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 注意事項

- 音楽の自動再生はブラウザのポリシーにより、ユーザーの操作後にのみ開始されます
- 外部画像URLを使用している場合、インターネット接続が必要です
- レスポンシブデザインのため、様々な画面サイズで正常に表示されます

## サポート

このサイトに関する質問がある場合は、元のReplitプロジェクトを参照してください。