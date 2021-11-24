import { Node } from "./model"
import { Processor } from "./processor"
import { Drawer } from "./drawer"
const fs = require("fs")

export namespace MDG {
    export function file2tree(filePath: string): Node {
        let processor = new Processor()
        return processor.processAbsFile(filePath)
    }

    export function file2nodes(filePath: string): Set<Node> {
        return file2tree(filePath).flatten()
    }

    export function tree2svg(
        node: Node,
        outputPath: string,
        errCb: (arg1: any) => any
    ) {
        new Drawer()
            .draw(node)
            .toSVG()
            .then((content: string) => {
                fs.writeFile(outputPath, content, (err: any) => {
                    if (err) {
                        errCb(err)
                    }
                })
            })
    }

    export function tree2canvas(
        node: Node,
        cb: (canvas: any) => any
    ) {
        new Drawer().draw(node).toCanvas().then(cb)
    }
}
