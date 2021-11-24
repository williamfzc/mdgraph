export enum NodeType {
    // url can be:
    // - remote link
    // - local abs path
    // - default (none)
    REMOTE,
    LOCAL,
    DEFAULT,
}

class BaseNode {
    title: string = ""
    path: string = ""
    nodeType: NodeType = NodeType.DEFAULT

    constructor(title: string, path: string, nodeType: NodeType) {
        this.title = title
        // if local, this path should be absolute
        this.path = path
        this.nodeType = nodeType
    }
}

export class Node extends BaseNode {
    // layer
    subNodes: Set<Node> = new Set()
    parentNode: string = ""

    getId(): string {
        return `${this.title}-${this.path}`
    }

    get id(): string {
        return this.getId()
    }

    flatten(): Set<Node> {
        let ret = new Set<Node>()
        ret.add(this)
        this.subNodes.forEach((each) => {
            each.flatten().forEach((eachSub) => {
                if (!ret.has(eachSub)) {
                    ret.add(eachSub)
                }
            })
        })
        return ret
    }
}
