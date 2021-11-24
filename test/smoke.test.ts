import { MDG } from "../src/api"
const path = require("path")

describe("add function", () => {
    it("smoke", () => {
        let root = MDG.file2tree(path.resolve("test/res/a.md"))
        console.log(JSON.stringify(root))
        root.subNodes.forEach((v) => {
            console.log(`son: ${JSON.stringify(v)}`)
        })
    })

    it("tosvg", () => {
        let root = MDG.file2tree(path.resolve("test/res/a.md"))
        MDG.tree2file(root, "test/res/abc.svg", () => {})
    })
})
