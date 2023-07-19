import { ChangeEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  selectIsSettingsModalOpen,
  selectSettingsFields,
  setIsSettingsModalOpen,
} from "@/app/settings.slice"
import { FButton, sizes } from "@/ui/common"
import { Box, Modal, TextField } from "@mui/material"
import { useSetUserSettingsMutation } from "@/app/apis.slice"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fbab7e",
  backgroundImage: "linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%)",
  boxShadow: 24,
  p: `${sizes.xl}px`,
  "& .MuiTextField-root": {
    display: "block",
    marginBottom: `${sizes.l}px`,
  },
}

export default function Settings() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectIsSettingsModalOpen)
  const settings = useAppSelector(selectSettingsFields)

  const [setUserSettings] = useSetUserSettingsMutation()

  const [originLanguage, setOriginLanguage] = useState(settings.originLanguage)
  const [targetLanguage, setTargetLanguage] = useState(settings.targetLanguage)
  const [messagesLimit, setMessagesLimit] = useState(settings.messagesLimit)

  const onOriginLanguageChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setOriginLanguage(e.target.value)
  }

  const onTargetLanguageChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setTargetLanguage(e.target.value)
  }

  const onMessagesLimitChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setMessagesLimit(Number(e.target.value))
  }

  const handleClose = () => {
    dispatch(setIsSettingsModalOpen(false))
  }

  const handleSubmit = () => {
    setUserSettings({
      originLanguage,
      targetLanguage,
      messagesLimit,
    })
    dispatch(setIsSettingsModalOpen(false))
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Your Language"
            defaultValue={settings.originLanguage}
            onChange={onOriginLanguageChange}
          />
        </div>
        <div>
          <TextField
            label="Target Language"
            defaultValue={settings.targetLanguage}
            onChange={onTargetLanguageChange}
          />
        </div>
        <div>
          <TextField
            label="Output messages limit"
            type="number"
            defaultValue={settings.messagesLimit}
            onChange={onMessagesLimitChange}
          />
        </div>
        <FButton onClick={handleSubmit} sx={{ float: "right" }}>
          Save
        </FButton>
      </Box>
    </Modal>
  )
}
