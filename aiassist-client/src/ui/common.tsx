import { styled } from "@mui/material/styles"
import { Paper } from "@mui/material"

export const sizes = {
	xxs: 2,
	xs: 4,
	s: 8,
	m: 12,
	l: 16,
	xl: 32,
}

export const colors = {
	red: "#d32f2f",
	blue: "#0288d1",
	geryBlue: "#3E5060",
	darkBlue: "#1A2027",
}

export const Papir = styled(Paper)({ padding: sizes.s })
