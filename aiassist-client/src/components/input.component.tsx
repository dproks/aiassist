import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectInputValue, updateInputValue } from "@/app/prompt.slice"
// import { styled } from "@mui/material/styles"

import { TextField } from "@mui/material"
import { generateEntry } from "@/utils/utils"
import { EEntryTypes } from "@/app/types"
import { useAddEntryMutation } from "@/app/apis.slice"

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
    dispatch(updateInputValue(value))
    addEntry(entry)
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
