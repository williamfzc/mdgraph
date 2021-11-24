import { Node } from "./model"
const lite = require("vega-lite")
const vega = require("vega")

export class Drawer {
    draw(node: Node): Promise<string> {
        var yourVlSpec = {
            $schema: "https://vega.github.io/schema/vega-lite/v2.0.json",
            description: "A simple bar chart with embedded data.",
            data: {
                values: [
                    { a: "A", b: 28 },
                    { a: "B", b: 55 },
                    { a: "C", b: 43 },
                    { a: "D", b: 91 },
                    { a: "E", b: 81 },
                    { a: "F", b: 53 },
                    { a: "G", b: 19 },
                    { a: "H", b: 87 },
                    { a: "I", b: 52 },
                ],
            },
            mark: "bar",
            encoding: {
                x: { field: "a", type: "ordinal" },
                y: { field: "b", type: "quantitative" },
            },
        }
        let vegaspec = lite.compile(yourVlSpec).spec
        var view = new vega.View(vega.parse(vegaspec), { renderer: "none" })
        return view.toSVG()
    }
}
