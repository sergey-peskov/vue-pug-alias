# vue-pug-alias

Creates aliases for pug-plain-loader

## Installation

``` sh
npm install -D vue-pug-alias
```

## Usage

With this loader you can create aliases for pug. 

Add the following entry to your "webpack.config".

Attention! the path to the alias must start at the root of the project.

``` js
{
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'vue-pug-alias',
                options: {
                    alias: { // A list of your aliases
                        ['@img']: 'src/assets/img',
                    }
                }
            }
        ]
    }
}
```
