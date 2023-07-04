import { useEffect, useRef } from "react"
import { useAppSelector } from "@/app/hooks"
import { styled } from "@mui/material/styles"
import { selectEntriesList } from "@/app/prompt.slice"
import { Papir, colors, sizes } from "@/ui/common"
import { EEntryTypes } from "@/app/types"
import { useGetEntriesQuery } from "@/app/apis.slice"
import HelperProvider from "./helper-provider.component"
import Markdown from "react-markdown"

const ListWrapper = styled("div")({
  minHeight: "100%",
})
const Question = styled("div")({
  color: colors.geryBlue,
  fontWeight: "bold",
  padding: `${sizes.s}px 0 ${sizes.xs}px`,
})
const Answer = styled("div")({
  color: colors.darkBlue,
})

function ChatOutput() {
  const entriesList = useAppSelector(selectEntriesList)
  const anchorRef = useRef<null | HTMLDivElement>(null)

  const { error: getEntriesError, isLoading: isGetEntriesLoading } =
    useGetEntriesQuery({})

  useEffect(() => {
    console.log(getEntriesError, isGetEntriesLoading)
  }, [getEntriesError, isGetEntriesLoading])

  useEffect(() => {
    anchorRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [entriesList.length])

  return (
    <Papir
      elevation={3}
      sx={{
        paddingTop: 0,
        height: "100%",
        overflowY: "scroll",
        position: "relative",
        borderRadius: "0",
      }}
    >
      <HelperProvider>
        <ListWrapper>
          {isGetEntriesLoading && "Loading..."}
          {entriesList.map((entry) =>
            entry.type === EEntryTypes.question ? (
              <Question key={entry.uuid}>{entry.value}</Question>
            ) : (
              <Answer key={entry.uuid}>
                <Markdown>{entry.value}</Markdown>
              </Answer>
            ),
          )}
          <div ref={anchorRef}></div>
        </ListWrapper>
      </HelperProvider>
    </Papir>
  )
}

export default ChatOutput
