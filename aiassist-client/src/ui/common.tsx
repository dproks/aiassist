import { styled } from "@mui/material/styles"
import { Paper } from "@mui/material"

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
