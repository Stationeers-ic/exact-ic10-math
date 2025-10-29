import { readdir, rename, rm, mkdir } from "fs/promises"
import { join, dirname } from "path"

const distTemp = "./dist-temp"
const dist = "./dist"

// readdirSync(distTemp).forEach((file) => {
// 	if (file.endsWith(".js")) {
// 		const oldPath = join(distTemp, file)
// 		const newPath = join(dist, file.replace(".js", ".cjs"))
// 		renameSync(oldPath, newPath)
// 	}
// })

// rmSync(distTemp, { recursive: true, force: true })
const files = await readdir(distTemp)
for (const file of files) {
	if (file.endsWith(".js")) {
		const oldPath = join(distTemp, file)
		const newPath = join(dist, file.replace(".js", ".cjs"))
		await mkdir(dirname(newPath), { recursive: true })
		await rename(oldPath, newPath)
	}
}
await rm(distTemp, { recursive: true, force: true })

console.log("✓ CJS files moved to dist/")
