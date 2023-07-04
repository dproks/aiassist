import { Container, Grid } from "@mui/material"
import ChatInput from "@/components/input.component"
import ChatOutput from "@/components/output.component"
import { sizes } from "./ui/common"
import { useEffect } from "react"
import { useAppDispatch } from "./app/hooks"
import { getIndexResponse } from "./app/actions"

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getIndexResponse())
  }, [])

  return (
    <Container
      maxWidth={false}
      sx={{
        marginTop: sizes.xxs,
      }}
    >
      <ChatInput />
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <ChatOutput />
        </Grid>
        <Grid item xs={4}>
          translate assist will be here...
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
