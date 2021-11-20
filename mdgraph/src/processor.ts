import { Node, NodeType } from "./model"
import { Reader } from "./reader"
import { NodeStorage } from "./storage";
const path = require('path');

export class Processor {
    private REGEX_LINK: RegExp = /\[.*?\]\(.*?\)/
    private REGEX_LINK_TITLE: RegExp = /\[(.*?)\]/
    private REGEX_LINK_URL: RegExp = /\((.*?)\)/
    
    private nodeStorage = new NodeStorage()

    processAbsFile(filePath: string) {
        console.log(`process file: ${filePath}`)
        let root = new Node(path.basename(filePath), filePath, NodeType.LOCAL)
        this.nodeStorage.add(root)

        // analyse this file
        let reader = new Reader()
        reader.readFromFile(filePath)
        return this.process(root, reader)
    }

    process(rootNode: Node, reader: Reader) {
        reader
            .getDataList()
            .filter((value: string) => {
                return value.match(this.REGEX_LINK)
            })
            .map((value) => {
                let title = value.match(this.REGEX_LINK_TITLE)?.[1]
                let url = value.match(this.REGEX_LINK_URL)?.[1]
                if (title == null || title == "" || url == null || url == "") {
                    return null
                }
                // valid node
                // do not know its info yet
                return new Node(title, url, NodeType.DEFAULT)
            })
            .filter((value) => value != null)
            .forEach((value) => {
                this.processNode(rootNode, value!)
            })
        // scan finished
    }

    processNode(rootNode: Node, node: Node) {
        if (this.nodeStorage.has(node)) {
            return
        }
        // remote node, stop diving in
        // save it to storage
        if (node.path.startsWith("http")) {
            node.nodeType = NodeType.REMOTE
            this.nodeStorage.add(node)
            return
        }
        // rel path
        if (node.path.startsWith(".")) {
            node.path = path.resolve(path.dirname(rootNode.path), node.path)
        }
        this.processAbsFile(node.path)
    }
}
