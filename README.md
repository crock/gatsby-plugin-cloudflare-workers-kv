# Cloudflare Workers KV - Gstsby Source Plugin

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
                uniqueKey: ``, // Defaults to "id"
                typeName: `` // This is the generated GraphQL type
            }
        },
        ...
    ]
}
```