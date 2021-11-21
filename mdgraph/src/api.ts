import { Node } from "./model"
import { Processor } from "./processor"

export module MDG {
    export function file2tree(filePath: string): Node {
        let processor = new Processor()
        return processor.processAbsFile(filePath)
    }
}
