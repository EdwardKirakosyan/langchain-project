import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { createClient } from "@supabase/supabase-js"
import { SupabaseVectorStore } from "langchain/vectorstores/supabase"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"

try {
  const result = await fetch("info.txt")
  const text = await result.text()
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
    separators: ["\n\n", "\n", " ", ""], // default setting
  })

  const output = await splitter.createDocuments([text])

  const sbApiKey = process.env.SUPABASE_KEY
  const sbUrl = supabase
  const openAIApiKey = process.env.SUPABASE_KEY

  const client = createClient(sbUrl, sbApiKey)

  await SupabaseVectorStore.fromDocuments(
    output,
    new OpenAIEmbeddings({ openAIApiKey }),
    {
      client,
      tableName: "documents",
    }
  )
} catch (err) {
  console.log(err)
}
