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

    it("smoke-nodes", () => {
        let nodes = MDG.file2nodes(path.resolve("test/res/a.md"))
        console.log(`nodes: ${nodes.values}`)
    })

    it("tosvg", () => {
        let root = MDG.file2tree(path.resolve("test/res/a.md"))
        MDG.tree2svg(root, "test/res/abc.svg", (err) => {
            console.error(err)
        })
    })

    it("tocanvas", () => {
        let root = MDG.file2tree(path.resolve("test/res/a.md"))
        MDG.tree2canvas(root, (canvas: any) => {
            console.log(canvas)
        })
    })
})
