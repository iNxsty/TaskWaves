import { useState } from "react"
import { User, Bell, Shield, Palette, Globe, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Settings() {
  const [settings, setSettings] = useState({
    profile: {
      name: "John Doe",
      email: "john.doe@example.com",
      timezone: "UTC-3",
      language: "English"
    },
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      projectUpdates: false,
      weeklyReports: true
    },
    privacy: {
      profileVisibility: true,
      dataSharing: false,
      analytics: true
    },
    appearance: {
      theme: "dark",
      compactMode: false,
      animations: true
    }
  })

  const handleSave = () => {
    // Save settings logic would go here
    console.log("Settings saved:", settings)
  }

  const updateSettings = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={settings.profile.name}
                onChange={(e) => updateSettings('profile', 'name', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.profile.email}
                onChange={(e) => updateSettings('profile', 'email', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={settings.profile.timezone}
                onChange={(e) => updateSettings('profile', 'timezone', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={settings.profile.language}
                onChange={(e) => updateSettings('profile', 'language', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) => updateSettings('notifications', 'email', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) => updateSettings('notifications', 'push', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Task Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming tasks</p>
              </div>
              <Switch
                checked={settings.notifications.taskReminders}
                onCheckedChange={(checked) => updateSettings('notifications', 'taskReminders', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Project Updates</Label>
                <p className="text-sm text-muted-foreground">Notifications about project changes</p>
              </div>
              <Switch
                checked={settings.notifications.projectUpdates}
                onCheckedChange={(checked) => updateSettings('notifications', 'projectUpdates', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Receive weekly productivity reports</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyReports}
                onCheckedChange={(checked) => updateSettings('notifications', 'weeklyReports', checked)}
              />
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Security
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Make your profile visible to team members</p>
              </div>
              <Switch
                checked={settings.privacy.profileVisibility}
                onCheckedChange={(checked) => updateSettings('privacy', 'profileVisibility', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Data Sharing</Label>
                <p className="text-sm text-muted-foreground">Share anonymous usage data</p>
              </div>
              <Switch
                checked={settings.privacy.dataSharing}
                onCheckedChange={(checked) => updateSettings('privacy', 'dataSharing', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Analytics</Label>
                <p className="text-sm text-muted-foreground">Enable analytics tracking</p>
              </div>
              <Switch
                checked={settings.privacy.analytics}
                onCheckedChange={(checked) => updateSettings('privacy', 'analytics', checked)}
              />
            </div>
            
            <div className="pt-4 border-t border-border">
              <Button variant="outline" className="w-full mb-2">Change Password</Button>
              <Button variant="outline" className="w-full">Two-Factor Authentication</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Appearance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Dark Theme</Label>
              <p className="text-sm text-muted-foreground">Use dark color scheme</p>
            </div>
            <Switch
              checked={settings.appearance.theme === 'dark'}
              onCheckedChange={(checked) => updateSettings('appearance', 'theme', checked ? 'dark' : 'light')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Use compact layout</p>
            </div>
            <Switch
              checked={settings.appearance.compactMode}
              onCheckedChange={(checked) => updateSettings('appearance', 'compactMode', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Animations</Label>
              <p className="text-sm text-muted-foreground">Enable interface animations</p>
            </div>
            <Switch
              checked={settings.appearance.animations}
              onCheckedChange={(checked) => updateSettings('appearance', 'animations', checked)}
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-xl p-6 border border-destructive/20">
        <h3 className="font-semibold text-destructive mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-destructive">Export Data</Label>
              <p className="text-sm text-muted-foreground">Download all your data</p>
            </div>
            <Button variant="outline">Export</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-destructive">Delete Account</Label>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  )
}