async function updateHashes(url: string, path: string) {
	const r = await fetch(url)
	const { data } = (await r.json()) as { data: { PrefabName: string; PrefabHash: number }[] }
	let result: string = "[\n"
	for (let i = 0; i < data.length; i++) {
		const item = data[i]
		result += `  ["${item.PrefabName}", ${item.PrefabHash}]${i === data.length - 1 ? "" : ","}\n`
	}
	return Bun.write(path, result + "]\n")
}

Promise.all([
	updateHashes("https://assets.ic10.dev/languages/EN/devices.json", "src/test/crc_devices.json"),
	updateHashes("https://assets.ic10.dev/languages/EN/items.json", "src/test/crc_items.json"),
]).then(() => console.log("Done."))
