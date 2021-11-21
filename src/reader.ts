const fs = require("fs")

// different platforms
export class Reader {
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
