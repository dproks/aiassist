import { styled } from "@mui/material/styles"
import { Button, Paper } from "@mui/material"

export const sizes = {
  xxs: 2,
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 32,
  xxl: 48,
}

export const colors = {
  red: "#d32f2f",
  blue: "#0288d1",
  geryBlue: "#153f64",
  darkBlue: "#1A2027",
}

export const Papir = styled(Paper)({
  padding: `${sizes.l}px`,
  boxSizing: "border-box",
  background: "linear-gradient(45deg, #fda9bb 30%, #fdba97 90%)",
})

export const FButton = styled(Button)({
  backgroundImage:
    "linear-gradient(to right, #ff512f 0%, #dd2476 51%, #ff512f 100% )",
  transition: "0.5s",
  backgroundSize: "200% auto",
  color: "#fff",
  textShadow: "#000000 1px 1px 0",
  "&:hover": {
    backgroundPosition: "right center",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
})
