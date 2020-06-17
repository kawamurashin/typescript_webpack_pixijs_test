module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/Main.ts',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    output: {
        path: __dirname + '/script',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: 'ts-loader',
            }
        ]
    },
    // import 文で .ts ファイルを解決するため
    // これを定義しないと import 文で拡張子を書く必要が生まれる
    // フロントエンドの開発では拡張子を省略することが多いので、
    // 記載したほうがトラブルに巻き込まれにくい
    resolve: {
        // 拡張子を配列で指定
        extensions: [
            '.ts', '.js',
        ],
    },
};