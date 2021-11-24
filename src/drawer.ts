import { json } from "stream/consumers"
import { Node } from "./model"
const lite = require("vega-lite")
const vega = require("vega")

export class Drawer {
    draw(node: Node): Promise<string> {
        let values = node.flatten()

        var yourVlSpec = {
            $schema: "https://vega.github.io/schema/vega/v5.json",
            description: "A specification outline example.",
            width: 500,
            height: 200,
            padding: 5,
            autosize: "pad",

            data: [
                {
                    name: "tree",
                    values: Array.from(values),
                    transform: [
                        {
                            type: "stratify",
                            key: "id",
                            parentKey: "parentNode",
                        },
                        {
                            type: "tree",
                            size: [{ signal: "height" }, { signal: "width" }],
                            separation: false,
                            as: ["y", "x", "depth", "children"],
                        },
                    ],
                },
                {
                    name: "links",
                    source: "tree",
                    transform: [
                        { type: "treelinks" },
                        {
                            type: "linkpath",
                            orient: "horizontal",
                            shape: "diagonal",
                        },
                    ],
                },
            ],

            marks: [
                {
                    type: "symbol",
                    from: { data: "tree" },
                    encode: {
                        enter: {
                            size: { value: 100 },
                            stroke: { value: "#fff" },
                        },
                        update: {
                            x: { field: "x" },
                            y: { field: "y" },
                            fill: { value: "black" },
                        },
                    },
                },
                {
                    type: "path",
                    from: { data: "links" },
                    encode: {
                        update: {
                            path: { field: "path" },
                            stroke: { value: "#000000" },
                        },
                    },
                },
            ],
        }

        var view = new vega.View(vega.parse(yourVlSpec), { renderer: "none" })
        return view.toSVG()
    }
}
