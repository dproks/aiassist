import { useEffect, useRef } from "react"
import { useAppSelector } from "@/app/hooks"
import { styled } from "@mui/material/styles"
import { selectEntriesList, selectPendingValue } from "@/app/prompt.slice"
import { Papir, colors, sizes } from "@/ui/common"
import { useGetEntriesQuery } from "@/app/apis.slice"
import HelperProvider from "./helper-provider.component"
import ChatOutputEntry from "./entry.component"

const ListWrapper = styled("div")({
  minHeight: "100%",
})

const PendingQuestion = styled("div")({
  color: colors.geryBlue,
  fontWeight: "bold",
  padding: `${sizes.s}px 0 ${sizes.xs}px`,
})

function ChatOutput() {
  const entriesList = useAppSelector(selectEntriesList)
  const pendingValue = useAppSelector(selectPendingValue)
  const anchorRef = useRef<null | HTMLDivElement>(null)

  const { error: getEntriesError, isLoading: isGetEntriesLoading } =
    useGetEntriesQuery({})

  useEffect(() => {
    console.log(getEntriesError, isGetEntriesLoading)
  }, [getEntriesError, isGetEntriesLoading])

  useEffect(() => {
    anchorRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [entriesList.length, pendingValue])

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
          {entriesList.map((entry) => (
            <ChatOutputEntry key={entry.uuid} entry={entry} />
          ))}
          {pendingValue !== "" && <ChatOutputEntry entry={pendingValue} />}
          <div ref={anchorRef}></div>
        </ListWrapper>
      </HelperProvider>
    </Papir>
  )
}

export default ChatOutput
