"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImagePlus, Send } from 'lucide-react'
import { format } from 'date-fns'

interface Message {
  id: string
  content: string
  sender: {
    name: string
    role: "tenant" | "landlord"
    avatar?: string
  }
  timestamp: Date
  attachments?: Array<{
    name: string
    url: string
  }>
}

export function MaintenanceConversation({ maintenanceId }: { maintenanceId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi, I've noticed a leak in the bathroom faucet. It's been dripping constantly for the past few days.",
      sender: {
        name: "Sarah Wilson",
        role: "tenant",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      timestamp: new Date("2024-02-10T09:00:00"),
      attachments: [
        {
          name: "faucet-leak.jpg",
          url: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    {
      id: "2",
      content: "Thanks for letting me know, Sarah. I'll send someone over to take a look at it tomorrow.",
      sender: {
        name: "John Doe",
        role: "landlord",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      timestamp: new Date("2024-02-10T10:00:00"),
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [newAttachment, setNewAttachment] = useState<File | null>(null)

  const handleSendMessage = () => {
    if (newMessage.trim() || newAttachment) {
      const message: Message = {
        id: (messages.length + 1).toString(),
        content: newMessage,
        sender: {
          name: "John Doe",
          role: "landlord",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        timestamp: new Date(),
        attachments: newAttachment
          ? [
              {
                name: newAttachment.name,
                url: URL.createObjectURL(newAttachment),
              },
            ]
          : undefined,
      }
      setMessages([...messages, message])
      setNewMessage("")
      setNewAttachment(null)
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-background border rounded-lg overflow-hidden">
      <ScrollArea className="flex-grow">
        <div className="space-y-4 p-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender.role === 'landlord' ? 'justify-end' : 'justify-start'}`}>
              <Card className={`max-w-[80%] ${message.sender.role === 'landlord' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                <CardContent className="p-3">
                  <div className="flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="font-semibold">{message.sender.name}</p>
                        <time className="text-xs text-muted-foreground">
                          {format(message.timestamp, "EEEE, d MMMM : h:mma")}
                        </time>
                      </div>
                      <p className="mt-1">{message.content}</p>
                      {message.attachments && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.attachments.map((attachment, index) => (
                            <a
                              key={index}
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline"
                            >
                              {attachment.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow"
          />
          <div className="flex flex-col space-y-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <ImagePlus className="h-4 w-4" />
            </Button>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => setNewAttachment(e.target.files?.[0] || null)}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {newAttachment && (
          <div className="mt-2 text-sm text-muted-foreground">
            Attachment: {newAttachment.name}
          </div>
        )}
      </div>
    </div>
  )
}

