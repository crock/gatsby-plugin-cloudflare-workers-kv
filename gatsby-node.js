const axios = require("axios")

exports.sourceNodes = async (
	{ actions, reporter, createNodeId, createContentDigest },
	{ accountId, namespaceId, apiToken, email, uniqueKey, typeName }
) => {
	const { createNode } = actions

	if (!accountId) {
		let error = "accountId config option is not set on cfkv-plugin"
		reporter.error(error, new Error(error))
		process.exit(1)
	}

	if (!namespaceId) {
		let error = "namespaceId config option is not set on cfkv-plugin"
		reporter.error(error, new Error(error))
		process.exit(1)
	}

	if (!apiToken) {
		let error = "apiToken config option is not set on cfkv-plugin"
		reporter.error(error, new Error(error))
		process.exit(1)
	}

	if (!email) {
		let error = "email config option is not set on cfkv-plugin"
		reporter.error(error, new Error(error))
		process.exit(1)
	}

	if (!uniqueKey) {
		let error = "uniqueKey config option is not set on cfkv-plugin"
		reporter.error(error, new Error(error))
		process.exit(1)
	}

	if (!typeName) {
		let error = "typeName config option is not set on cfkv-plugin"
		reporter.error(error, new Error(error))
		process.exit(1)
	}

	const cloudflare = axios.create({
		baseURL: `https://api.cloudflare.com/client/v4/accounts/${accountId}`,
		headers: {
			"X-Auth-Key": apiToken,
			"X-Auth-Email": email,
		},
	})

	const response = await cloudflare.get(
		`/storage/kv/namespaces/${namespaceId}/keys`
	)

	if (response.data && response.data.result.length) {
		response.data.result.forEach(async (result) => {
			const listing = await cloudflare.get(
				`/storage/kv/namespaces/${namespaceId}/values/${result.name}`
			)

			if (listing.status !== 200) return

			const { value, metadata, ...other } = listing.data
			const obj = JSON.parse(value)

			const meta = JSON.parse(metadata)

			const attributes = { ...obj, ...meta, ...other }

			createNode({
				id: createNodeId(obj[uniqueKey || "id"]),
				parent: null,
				children: [],
				internal: {
					type: typeName,
					mediaType: `application/json`,
					content: JSON.stringify(attributes),
					contentDigest: createContentDigest(attributes),
				},
				...attributes,
			})

			reporter.info(`Created node for KV namespace key ${result.name}`)
		})
	}
}