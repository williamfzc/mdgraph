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

    export function tree2graph(
        node: Node,
        cb: (arg0: string) => any,
        errCb: (arg1: any) => any
    ) {
        new Drawer()
            .draw(node)
            .then((ret) => {
                cb(ret)
            })
            .catch((err) => {
                errCb(err)
            })
    }

    export function tree2file(
        node: Node,
        outputPath: string,
        errCb: (arg1: any) => any
    ) {
        tree2graph(
            node,
            (content: string) => {
                fs.writeFile(outputPath, content, (err: any) => {
                    if (err) {
                        console.error(err)
                    }
                })
            },
            errCb
        )
    }
}
