import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectInputValue, updateInputValue } from "@/app/input.slice"
import { getInputPromptResponse } from "@/app/actions"
// import { styled } from "@mui/material/styles"

import { TextField } from "@mui/material"
import { appendOutputEntry } from "@/app/output.slice"
import { generateEntry } from "@/utils/utils"
import { EEntryTypes } from "@/app/types"

function ChatInput() {
  const dispatch = useAppDispatch()
  const inputValue = useAppSelector(selectInputValue)
  const [value, setValue] = useState(inputValue)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    setValue("")
    const entry = generateEntry(value, EEntryTypes.question)
    dispatch(updateInputValue(value))
    dispatch(appendOutputEntry(entry))
    dispatch(getInputPromptResponse(entry))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{
          width: "100%",
        }}
        title="How can I help?"
        focused
        variant="outlined"
        value={value}
        onChange={handleInputChange}
      />
    </form>
  )
}

export default ChatInput
