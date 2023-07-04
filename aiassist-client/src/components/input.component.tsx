import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectInputValue, appendPromptEntry } from "@/app/prompt.slice"
// import { styled } from "@mui/material/styles"

import { Box, TextField } from "@mui/material"
import { generateEntry } from "@/utils/utils"
import { EEntryTypes } from "@/app/types"
import { useAddEntryMutation } from "@/app/apis.slice"
import { sizes } from "@/ui/common"

function ChatInput() {
  const dispatch = useAppDispatch()
  const inputValue = useAppSelector(selectInputValue)
  const [value, setValue] = useState(inputValue)
  const [addEntry] = useAddEntryMutation()

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    if (value === "") return
    setValue("")
    const entry = generateEntry(value, EEntryTypes.question)
    dispatch(appendPromptEntry(entry))
    addEntry(entry)
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: `${sizes.m}px ${sizes.m * 2}px`,
        background: "linear-gradient(125deg, #c31432, #240b36 80%)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              color: "#fff",
              textShadow: "#000000 1px 1px 0",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fe6b8b !important",
            },
          }}
          title="How can I help?"
          focused
          variant="outlined"
          value={value}
          onChange={handleInputChange}
        />
      </form>
    </Box>
  )
}

export default ChatInput
