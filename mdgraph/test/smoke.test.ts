import {Processor} from '../src/processor'
const path = require('path')

describe("add function", () => {
  it("smoke", () => {
    let processor = new Processor()
    processor.processFile(path.resolve("test/res/a.md"))
  });
});