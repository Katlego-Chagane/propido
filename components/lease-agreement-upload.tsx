"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadIcon } from "lucide-react"

export function LeaseAgreementUpload() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      // Here you would typically upload the file to your server or cloud storage
      console.log("Uploading file:", file.name)
      // Reset the file input after upload
      setFile(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Lease Agreement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="lease-agreement">Lease Agreement Document</Label>
          <Input 
            id="lease-agreement" 
            type="file" 
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file}>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardFooter>
    </Card>
  )
}

