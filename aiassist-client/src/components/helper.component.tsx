import { useGetHelpMutation } from "@/app/apis.slice"
import { selectHelpersCard, selectHelpersIsLoading } from "@/app/helpers.slice"
import { useAppSelector } from "@/app/hooks"
import { IHelpersCard } from "@/app/types"
import { Papir } from "@/ui/common"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

export function Helper() {
  const card = useAppSelector(selectHelpersCard)
  const isLoading = useAppSelector(selectHelpersIsLoading)

  if (isLoading) return <Papir>Loading</Papir>

  if (!isLoading && !card)
    return <Papir>select text from output, and get help;)</Papir>

  function renderSynonyms(card: IHelpersCard) {
    const originHasSynonyms = card.origin.synonyms.length > 0
    const translationHasSynonyms = card.translation.synonyms.length > 0
    const noSynonyms = !originHasSynonyms && !translationHasSynonyms

    if (noSynonyms) return <TableCell colSpan={2}>No synonyms found</TableCell>
    return (
      <>
        <TableCell>
          {card.origin.synonyms.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </TableCell>
        <TableCell>
          {card.translation.synonyms.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </TableCell>
      </>
    )
  }

  if (card)
    return (
      <TableContainer
        component={Papir}
        sx={{ height: "100%", overflowY: "scroll" }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{card.origin.input}</TableCell>
              <TableCell>{card.translation.input}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{card.origin.definition}</TableCell>
              <TableCell>{card.translation.definition}</TableCell>
            </TableRow>

            <TableRow>{renderSynonyms(card)}</TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
}
