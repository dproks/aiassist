import { useEffect } from "react"
import { Container, Box } from "@mui/material"
import Grid from "@mui/system/Unstable_Grid"
import ChatInput from "@/components/input.component"
import ChatOutput from "@/components/output.component"
import { sizes } from "@/ui/common"
import { Helper } from "@/components/helper.component"
import Settings from "@/components/settings.component"
import { useGetUserSettingsQuery } from "@/app/apis.slice"

function App() {
  const { error } = useGetUserSettingsQuery()

  useEffect(() => {
    console.log("Error loading settings:", error)
  }, [error])

  return (
    <Container
      maxWidth={false}
      sx={{
        marginTop: 0,
        height: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <Grid
          container
          spacing={2}
          alignItems={"stretch"}
          alignContent={"flex-start"}
          sx={{
            height: "100%",
            minWidth: "100%",
            paddingBottom: `${sizes.xxl + sizes.xxl}px`,
          }}
        >
          <Grid xs={8} sx={{ height: "100%" }}>
            <ChatOutput />
          </Grid>
          <Grid xs={4} sx={{ height: "100%" }}>
            <Helper />
          </Grid>
        </Grid>
      </Box>
      <ChatInput />
      <Settings />
    </Container>
  )
}

export default App
