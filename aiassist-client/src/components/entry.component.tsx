import { styled } from "@mui/material/styles"
import { Papir, colors, sizes } from "@/ui/common"
import { IPromptEntry } from "@/app/types"
import { LinearProgress } from "@mui/material"
import Markdown from "react-markdown"

const Question = styled("div")({
  color: colors.geryBlue,
  fontWeight: "bold",
  padding: `${sizes.s}px 0 ${sizes.xs}px`,
})
const Answer = styled("div")({
  color: colors.darkBlue,
})
const Error = styled("div")({ color: colors.red })

function ChatOutputEntry({ entry }: { entry: IPromptEntry | string }) {
  if (typeof entry === "string")
    return (
      <Question>
        {entry}
        <LinearProgress sx={{ marginTop: `${sizes.s}px` }} color="inherit" />
      </Question>
    )

  return (
    <>
      {entry.input && (
        <Question>
          <p>{entry.input.originLanguage}</p>
          <p>{entry.input.targetLanguage}</p>
        </Question>
      )}
      {entry.output && (
        <Answer>
          <Markdown>{entry.output.originLanguage}</Markdown>
          <Markdown>{entry.output.targetLanguage}</Markdown>
        </Answer>
      )}
      {entry.error && <Error>{entry.error}</Error>}
    </>
  )
}

export default ChatOutputEntry
