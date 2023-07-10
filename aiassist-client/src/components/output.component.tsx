import { useEffect, useState } from "react"
import { useAppSelector } from "@/app/hooks"
import { styled } from "@mui/material/styles"
import { selectEntriesList } from "@/app/prompt.slice"
import { Papir, colors, sizes } from "@/ui/common"
import { EEntryTypes } from "@/app/types"
import { useGetEntriesQuery } from "@/app/apis.slice"

const Question = styled("div")({
  color: colors.geryBlue,
  fontWeight: "bold",
})
const Answer = styled("div")({
  color: colors.darkBlue,
})

function ChatOutput() {
  const entriesList = useAppSelector(selectEntriesList)

  const { error: getEntriesError, isLoading: isGetEntriesLoading } =
    useGetEntriesQuery({})

  useEffect(() => {
    console.log(getEntriesError, isGetEntriesLoading)
  }, [getEntriesError, isGetEntriesLoading])

  return (
    <Papir
      elevation={3}
      sx={{
        padding: sizes.xs,
      }}
    >
      {isGetEntriesLoading && "Loading..."}
      {entriesList.map((entry) =>
        entry.type === EEntryTypes.question ? (
          <Question key={entry.uuid}>{entry.value}</Question>
        ) : (
          <Answer key={entry.uuid}>{entry.value}</Answer>
        ),
      )}
    </Papir>
  )
}

export default ChatOutput
