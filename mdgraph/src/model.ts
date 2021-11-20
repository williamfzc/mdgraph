export enum NodeType {
    // url can be:
    // - remote link
    // - local abs path
    // - default (none)
    REMOTE,
    LOCAL,
    DEFAULT,
}

export class Node {
    title: string = ""
    path: string = ""
    nodeType: NodeType = NodeType.DEFAULT

    constructor(title: string, path: string, nodeType: NodeType) {
        this.title = title
        // if local, this path should be absolute
        this.path = path
        this.nodeType = nodeType
    }

    getId(): String {
        return `${this.title}-${this.path}-${this.nodeType}`
    }
}
