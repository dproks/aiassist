import { useEffect, useState } from "react"
import { useAppSelector } from "@/app/hooks"
import { styled } from "@mui/material/styles"
import { selectOutputValue, selectOutputValuesList } from "@/app/output.slice"
import { Papir, colors, sizes } from "@/ui/common"
import { EEntryTypes } from "@/app/types"

const Question = styled("div")({
	color: colors.geryBlue,
	fontWeight: "bold",
})
const Answer = styled("div")({
	color: colors.darkBlue,
})

function ChatOutput() {
	const outputValue = useAppSelector(selectOutputValue)
	const outputEntriesList = useAppSelector(selectOutputValuesList)
	const [value, setValue] = useState(outputValue)

	useEffect(() => {
		setValue(outputValue)
	}, [outputValue])

	return (
		<Papir
			elevation={3}
			sx={{
				padding: sizes.m,
			}}
		>
			{outputEntriesList.map((entry) =>
				entry.type === EEntryTypes.question ? (
					<Question key={entry.id}>{entry.value}</Question>
				) : (
					<Answer key={entry.id}>{entry.value}</Answer>
				),
			)}
		</Papir>
	)
}

export default ChatOutput
