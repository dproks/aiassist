import { Container, Box } from "@mui/material"
import Grid from "@mui/system/Unstable_Grid"
import ChatInput from "@/components/input.component"
import ChatOutput from "@/components/output.component"
import { sizes } from "./ui/common"
import { styled } from "@mui/material/styles"
import { Helper } from "./components/helper.component"

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}))

function App() {
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
            paddingBottom: `${sizes.xl + sizes.xl}px`,
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
    </Container>
  )
}

export default App
