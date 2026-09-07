import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  Users,
  User,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  TrendingUp,
  Heart,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

type TabType = "dashboard" | "properties" | "add" | "leads" | "profile";

const myProperties = [
  {
    id: "1",
    title: "Luxury 3BHK Apartment",
    location: "Downtown, New York",
    price: "$425,000",
    status: "Active",
    views: 234,
    leads: 12,
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "Modern Villa with Pool",
    location: "Beverly Hills, LA",
    price: "$850,000",
    status: "Active",
    views: 456,
    leads: 28,
    posted: "1 week ago",
  },
  {
    id: "3",
    title: "Cozy Studio Apartment",
    location: "San Francisco",
    price: "$195,000",
    status: "Pending",
    views: 123,
    leads: 5,
    posted: "3 days ago",
  },
];

const recentLeads = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    property: "Luxury 3BHK Apartment",
    message: "I'm interested in viewing this property. When is a good time?",
    date: "2 hours ago",
    status: "New",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    property: "Modern Villa with Pool",
    message: "Looking for immediate possession. Is this ready to move?",
    date: "5 hours ago",
    status: "Contacted",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "+1 (555) 456-7890",
    property: "Luxury 3BHK Apartment",
    message: "Can we negotiate on the price?",
    date: "1 day ago",
    status: "New",
  },
];

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: "dashboard" as TabType, icon: LayoutDashboard, label: "Dashboard" },
    { id: "properties" as TabType, icon: Home, label: "My Properties" },
    { id: "add" as TabType, icon: PlusCircle, label: "Add Property" },
    { id: "leads" as TabType, icon: Users, label: "Leads" },
    { id: "profile" as TabType, icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Property Owner</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed bottom-4 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-40"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Property Owner</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-primary text-white"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div>
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Home className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +12%
                      </span>
                    </div>
                    <p className="text-3xl font-bold mb-1">3</p>
                    <p className="text-sm text-muted-foreground">Active Properties</p>
                  </div>

                  <div className="bg-white rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-secondary" />
                      </div>
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +24%
                      </span>
                    </div>
                    <p className="text-3xl font-bold mb-1">813</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>

                  <div className="bg-white rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +8%
                      </span>
                    </div>
                    <p className="text-3xl font-bold mb-1">45</p>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                  </div>

                  <div className="bg-white rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-6 h-6 text-pink-600" />
                      </div>
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +18%
                      </span>
                    </div>
                    <p className="text-3xl font-bold mb-1">127</p>
                    <p className="text-sm text-muted-foreground">Saved by Users</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-border p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-6">Recent Leads</h2>
                  <div className="space-y-4">
                    {recentLeads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{lead.name}</p>
                            <p className="text-sm text-muted-foreground">{lead.property}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                            lead.status === "New" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {lead.status}
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">{lead.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 text-primary hover:underline">
                    View All Leads
                  </button>
                </div>
              </div>
            )}

            {/* My Properties Tab */}
            {activeTab === "properties" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold">My Properties</h1>
                  <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Add New Property
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Property</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Views</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Leads</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {myProperties.map((property) => (
                          <tr key={property.id} className="hover:bg-muted/50">
                            <td className="px-6 py-4">
                              <p className="font-medium">{property.title}</p>
                              <p className="text-sm text-muted-foreground">{property.posted}</p>
                            </td>
                            <td className="px-6 py-4 text-sm">{property.location}</td>
                            <td className="px-6 py-4 font-semibold text-primary">{property.price}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 text-xs rounded-full ${
                                property.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}>
                                {property.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">{property.views}</td>
                            <td className="px-6 py-4 text-sm font-medium">{property.leads}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                  <Eye className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                  <Edit className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Leads Tab */}
            {activeTab === "leads" && (
              <div>
                <h1 className="text-3xl font-bold mb-8">Leads Management</h1>

                <div className="space-y-6">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="bg-white rounded-lg border border-border p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{lead.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{lead.property}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{lead.email}</span>
                              <span>{lead.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 text-xs rounded-full mb-2 ${
                            lead.status === "New" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {lead.status}
                          </span>
                          <p className="text-sm text-muted-foreground">{lead.date}</p>
                        </div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <p className="text-sm">{lead.message}</p>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Reply
                        </button>
                        <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                          Mark as Contacted
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="max-w-2xl">
                    <form className="space-y-6">
                      <div className="flex items-center gap-6 pb-6 border-b border-border">
                        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl">
                          JD
                        </div>
                        <div>
                          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mb-2">
                            Upload Photo
                          </button>
                          <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 5MB</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm mb-2">First Name</label>
                          <input
                            type="text"
                            defaultValue="John"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Last Name</label>
                          <input
                            type="text"
                            defaultValue="Doe"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="john.doe@email.com"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2">Bio</label>
                        <textarea
                          rows={4}
                          defaultValue="Experienced real estate professional with over 10 years in property sales and management."
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Add Property Placeholder */}
            {activeTab === "add" && (
              <div>
                <h1 className="text-3xl font-bold mb-8">Add New Property</h1>
                <div className="bg-white rounded-lg border border-border p-12 text-center">
                  <PlusCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">Multi-step form will be displayed here</p>
                  <p className="text-sm text-muted-foreground mt-2">See the Add Property Page component for the full form</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
