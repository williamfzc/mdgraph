import { Node } from "./model"

export class NodeStorage {
    private nodeStorage: Map<String, Node> = new Map()
    rootNode: Node | undefined

    add(newNode: Node) {
        this.nodeStorage.set(newNode.getId(), newNode)
    }

    has(target: Node): boolean {
        return this.nodeStorage.has(target.getId())
    }

    getAll(): Map<String, Node> {
        return this.nodeStorage
    }
}
