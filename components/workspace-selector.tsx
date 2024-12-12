"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusIcon, Settings, ChevronDown } from 'lucide-react'
import { CreateWorkspaceModal } from "@/components/create-workspace-modal"
import { WorkspaceSettingsModal } from "@/components/workspace-settings-modal"
import { UserPlus } from 'lucide-react'
import { Input } from "@/components/ui/input"

const workspaces = [
  { id: 1, name: "Personal Properties" },
  { id: 2, name: "Investment Portfolio" },
]

export function WorkspaceSelector() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between text-[hsl(221.2,83.2%,53.3%)]">
            {selectedWorkspace.name}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {workspaces.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              onClick={() => setSelectedWorkspace(workspace)}
            >
              {workspace.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsCreateModalOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create New Workspace
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsSettingsModalOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Workspace Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <WorkspaceSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        workspace={selectedWorkspace}
        className="hover:bg-gray-800"
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
      />
    </>
  )
}

