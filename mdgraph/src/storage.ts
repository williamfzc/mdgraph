import { Node } from "./model"

export class NodeStorage {
    private nodeStorage: Map<String, Node> = new Map()

    add(newNode: Node) {
        this.nodeStorage.set(newNode.getId(), newNode)
    }

    has(target: Node): boolean {
        return this.nodeStorage.has(target.getId())
    }
}
