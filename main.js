import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

try {
  const result = await fetch("scrimba-info.txt")
  const text = await result.text()
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
    separators: ["\n\n", "\n", " ", ""], // default setting
  })

  const output = await splitter.createDocuments([text])
} catch (err) {
  console.log(err)
}
