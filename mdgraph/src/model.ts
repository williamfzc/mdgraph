const path = require("path")

export class Link {
    title: string = ""
    url: string = ""

    constructor(title: string, url: string | undefined) {
        this.title = title
        this.url = url || ""
    }

    isEmpty(): boolean {
        return this.url == ""
    }

    isRemote(): boolean {
        if (this.url.startsWith("http")) {
            return true
        }
        // maybe is empty
        return false
    }

    isLocal(): boolean {
        return !this.isEmpty() && !this.isRemote()
    }

    isRelPath(): boolean {
        return this.url.startsWith(".")
    }

    getPath(): string {
        if (!this.isRelPath()) {
            return this.url
        }
        return path.resolve(this.url)
    }
}
