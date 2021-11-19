const fs = require("fs")
import { Link } from "./model"

// different platforms
class Reader {
    private data: string = ""
    private ENCODING: string = "utf8"
    private SPLIT_FLAG: string = "\n"

    readFromFile(filePath: string) {
        this.data = fs.readFileSync(filePath, this.ENCODING)
    }

    readFromString(content: string) {
        this.data = content
    }

    reset() {
        this.data = ""
    }

    getData(): string {
        return this.data
    }

    getDataList(): Array<string> {
        return this.data.split(this.SPLIT_FLAG)
    }
}

export class Processor {
    private REGEX_LINK: RegExp = /\[.*?\]\(.*?\)/
    private REGEX_LINK_TITLE: RegExp = /\[(.*?)\]/
    private REGEX_LINK_URL: RegExp = /\((.*?)\)/

    processFile(filePath: string) {
        let reader = new Reader()
        reader.readFromFile(filePath)
        return this.process(reader)
    }

    processString(content: string) {
        let reader = new Reader()
        reader.readFromString(content)
        return this.process(reader)
    }

    process(reader: Reader) {
        reader
            .getDataList()
            .filter((value: string) => {
                return value.match(this.REGEX_LINK)
            })
            .map((value) => {
                let title = value.match(this.REGEX_LINK_TITLE)?.[1]
                let link = value.match(this.REGEX_LINK_URL)?.[1]
                if (title == null || title == "") {
                    return null
                }
                return new Link(title, link)
            })
            .filter((value) => value != null)
            .forEach((value) => {
                this.processLink(value!)
            })

        // recursily
    }

    processLink(link: Link) {
        if (link.isLocal()) {
            this.processLocalLink(link)
        } else if (link.isRemote()) {
            this.processRemoteLink(link)
        } else {
            // do nothing
        }
    }

    processLocalLink(link: Link) {
        console.log(`local link: ${link.getPath()}`)
    }

    processRemoteLink(link: Link) {
        console.log(`remote link: ${link.getPath()}`)
    }
}
