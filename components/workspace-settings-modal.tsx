"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { UserPlus } from 'lucide-react'

interface WorkspaceSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  workspace: { id: number; name: string }
  teamMembers: { id: number; name: string; email: string }[]
  setTeamMembers: React.Dispatch<React.SetStateAction<{ id: number; name: string; email: string }[]>>
}

export function WorkspaceSettingsModal({ isOpen, onClose, workspace, teamMembers, setTeamMembers }: WorkspaceSettingsModalProps) {
  const [workspaceName, setWorkspaceName] = useState(workspace.name)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [primaryColor, setPrimaryColor] = useState("#000000")
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [memberToRemove, setMemberToRemove] = useState<number | null>(null);

  const handleNameChange = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle workspace name change logic here
    console.log("Changing workspace name to:", workspaceName)
    onClose()
  }

  const handleDelete = (event: React.FormEvent) => {
    event.preventDefault()
    if (deleteConfirmation === "DELETE") {
      // Handle workspace deletion logic here
      console.log("Deleting workspace:", workspace.id)
      onClose()
    }
  }

  const handleBrandingChange = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle branding change logic here
    console.log("Updating branding:", { logo, primaryColor })
    onClose()
  }

  const handleAddMember = () => {
    if (newMemberEmail) {
      setTeamMembers([...teamMembers, { id: Date.now(), name: '', email: newMemberEmail }])
      setNewMemberEmail('')
    }
  }

  const handleRemoveMember = (memberId: number) => {
    setMemberToRemove(memberId);
  };

  const confirmRemoveMember = () => {
    if (memberToRemove !== null) {
      setTeamMembers(teamMembers.filter(member => member.id !== memberToRemove));
      setMemberToRemove(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Workspace Settings</DialogTitle>
          <DialogDescription>
            Manage your workspace settings here.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <form onSubmit={handleNameChange}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="workspace-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="workspace-name"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="branding">
            <form onSubmit={handleBrandingChange}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="logo" className="text-right">
                    Logo
                  </Label>
                  <FileUploader
                    id="logo"
                    accept="image/*"
                    onChange={(file) => setLogo(file)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="primary-color" className="text-right">
                    Primary Color
                  </Label>
                  <Input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Branding</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="team">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Team Members</h3>
                </div>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleRemoveMember(member.id)}>Remove</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Label htmlFor="new-member-email">Add New Member</Label>
                  <div className="flex mt-2">
                    <Input
                      id="new-member-email"
                      placeholder="Enter email address"
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="mr-2"
                    />
                    <Button type="button" onClick={handleAddMember}>Add</Button>
                  </div>
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="danger">
            <form onSubmit={handleDelete}>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                  To delete this workspace, type "DELETE" in the field below:
                </p>
                <Input
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <Button type="submit" variant="destructive" disabled={deleteConfirmation !== "DELETE"}>
                  Delete Workspace
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
      <Dialog open={memberToRemove !== null} onOpenChange={() => setMemberToRemove(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this team member? Type REMOVE to confirm.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Type REMOVE to confirm"
            onChange={(e) => e.target.value === "REMOVE" && confirmRemoveMember()}
          />
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}

