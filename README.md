# Cloudflare Workers KV - Gatsby Source Plugin

## Usage

Add this plugin to the plugins array in `gatsby-config.js` like so...
```js
module.exports = {
    plugins: [
        {
            resolve: `gatsby-source-cloudflare-workers-kv`,
            options: {
                accountId: ``,
                namespaceId: ``,
                apiToken: ``,
                email: ``,
                isBase64Encoded: false, // defaults to false
                uniqueKey: ``, // Defaults to "id"
                typeName: ``,
            }
        },
        ...
    ]
}
```