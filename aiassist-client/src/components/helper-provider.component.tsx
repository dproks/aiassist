import { useGetHelpMutation } from "@/app/apis.slice"
import { FButton, Papir } from "@/ui/common"
import { styled } from "@mui/material/styles"
import { useState, MouseEvent } from "react"

interface IWithHelperProps {
  children: React.ReactNode
}

const HelperTooltip = styled(Papir, {
  shouldForwardProp: (propName) =>
    propName !== "top" && propName !== "left" && propName !== "show",
})<any>(({ top, left, show }) => ({
  position: "fixed",
  top,
  left,
  display: show ? "block" : "none",
  backgroundImage: "linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%)",
}))

function HelperProvider({ children }: IWithHelperProps) {
  const [tltpShow, setTltpShow] = useState(false)
  const [tltpTop, setTltpTop] = useState(0)
  const [tltpLeft, setTltpLeft] = useState(0)
  const [tltpValue, setTltpValue] = useState("")
  const [getHelp] = useGetHelpMutation()

  // useEffect(() => {
  //   setTimeout(() => setTltpShow(false), 5000)
  // }, [tltpShow])

  function handleMouseUp(e: MouseEvent<HTMLDivElement>) {
    const selectedText = window?.getSelection()?.toString().trim()
    if (!selectedText || tltpShow) return
    setTltpLeft(e.clientX)
    setTltpTop(e.clientY)
    setTltpShow(true)
    setTltpValue(selectedText)
  }

  function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
    setTltpShow(false)
  }

  function handleClick() {
    getHelp(tltpValue)
    setTltpShow(false)
  }

  return (
    <>
      <div onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
        {children}
      </div>
      <HelperTooltip top={tltpTop} left={tltpLeft} show={tltpShow}>
        <FButton variant="contained" onClick={handleClick}>
          Help with: {tltpValue}
        </FButton>
      </HelperTooltip>
    </>
  )
}

export default HelperProvider
