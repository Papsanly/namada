import { Dispatch, SetStateAction } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

export default function NamadaNotDetected(props: {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Namada Extension not detected</AlertDialogTitle>
          <AlertDialogDescription>
            Would you like to download it?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() =>
              window.open(
                'https://chromewebstore.google.com/detail/namada-extension/hnebcbhjpeejiclgbohcijljcnjdofek'
              )
            }
          >
            Download
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
