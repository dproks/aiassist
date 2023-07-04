import { useGetHelpMutation } from "@/app/apis.slice"
import { Papir } from "@/ui/common"
import { Button } from "@mui/material"
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

const HelpButton = styled(Button)({
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
        <HelpButton variant="contained" onClick={handleClick}>
          Help with: {tltpValue}
        </HelpButton>
      </HelperTooltip>
    </>
  )
}

export default HelperProvider
