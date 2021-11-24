import { Node } from "./model"
const vega = require("vega")

export class Drawer {
    draw(node: Node): Promise<string> {
        let values = node.flatten()

        var yourVlSpec = {
            $schema: "https://vega.github.io/schema/vega/v5.json",
            description: "A specification outline example.",
            width: 720,
            height: 720,
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
                            size: [{ signal: "height" }, { signal: "width - 100" }],
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

            "scales": [
                {
                  "name": "color",
                  "type": "linear",
                  "range": {"scheme": "magma"},
                  "domain": {"data": "tree", "field": "depth"},
                  "zero": true
                }
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
                        "update": {
                            "x": {"field": "x"},
                            "y": {"field": "y"},
                            "fill": {"scale": "color", "field": "depth"}
                          }
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
                {
                    "type": "text",
                    "from": {"data": "tree"},
                    "encode": {
                      "enter": {
                        "text": {"field": "title"},
                        "fontSize": {"value": 24},
                        "baseline": {"value": "middle"}
                      },
                      "update": {
                        "x": {"field": "x"},
                        "y": {"field": "y"},
                        "dx": {"signal": "datum.children ? -7 : 7"},
                        "align": {"signal": "datum.children ? 'right' : 'left'"},
                        "opacity": {"value": 1}
                      }
                    }
                  }
            ],
        }

        var view = new vega.View(vega.parse(yourVlSpec), { renderer: "none" })
        return view.toSVG()
    }
}
