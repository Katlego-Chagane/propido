import { Input } from "@/components/ui/input"

interface FileUploaderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (file: File | null) => void
}

export function FileUploader({ onChange, ...props }: FileUploaderProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    onChange(file)
  }

  return <Input type="file" onChange={handleFileChange} {...props} />
}

