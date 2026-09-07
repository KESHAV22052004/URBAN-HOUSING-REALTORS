import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import {
  LayoutDashboard,
  Home,
  Users,
  FileText,
  Settings,
  TrendingUp,
  DollarSign,
  Eye,
  CheckCircle,
  XCircle,
  Star,
  Menu,
  X,
  Search,
  Filter,
} from "lucide-react";

type TabType = "dashboard" | "properties" | "users" | "featured" | "settings";

const propertyApprovals = [
  {
    id: "1",
    title: "Luxury 3BHK Apartment in Downtown",
    owner: "John Doe",
    location: "Downtown, New York",
    price: "$425,000",
    status: "Pending",
    submitted: "2 hours ago",
  },
  {
    id: "2",
    title: "Modern Villa with Pool & Garden",
    owner: "Sarah Johnson",
    location: "Beverly Hills, LA",
    price: "$850,000",
    status: "Pending",
    submitted: "5 hours ago",
  },
  {
    id: "3",
    title: "Cozy 2BHK Apartment Near Metro",
    owner: "Mike Davis",
    location: "San Francisco",
    price: "$295,000",
    status: "Approved",
    submitted: "1 day ago",
  },
  {
    id: "4",
    title: "Executive Bungalow with Lawn",
    owner: "Emma Wilson",
    location: "Malibu, California",
    price: "$725,000",
    status: "Pending",
    submitted: "3 hours ago",
  },
];

const usersList = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    role: "Owner",
    properties: 3,
    joined: "Dec 2025",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    role: "Owner",
    properties: 5,
    joined: "Nov 2025",
    status: "Active",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@email.com",
    role: "Agent",
    properties: 12,
    joined: "Oct 2025",
    status: "Active",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.w@email.com",
    role: "Owner",
    properties: 2,
    joined: "Jan 2026",
    status: "Inactive",
  },
];

const featuredProperties = [
  {
    id: "1",
    title: "Luxury 3BHK Apartment",
    location: "Downtown, New York",
    price: "$425,000",
    featured: true,
    featuredUntil: "Jan 15, 2026",
  },
  {
    id: "2",
    title: "Modern Villa with Pool",
    location: "Beverly Hills, LA",
    price: "$850,000",
    featured: true,
    featuredUntil: "Jan 20, 2026",
  },
  {
    id: "3",
    title: "Spacious Penthouse",
    location: "Manhattan, NY",
    price: "$1,200,000",
    featured: false,
    featuredUntil: null,
  },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: "dashboard" as TabType, icon: LayoutDashboard, label: "Dashboard" },
    { id: "properties" as TabType, icon: Home, label: "Properties" },
    { id: "users" as TabType, icon: Users, label: "Users" },
    { id: "featured" as TabType, icon: Star, label: "Featured" },
    { id: "settings" as TabType, icon: Settings, label: "Settings" },
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
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Admin Panel</h3>
                  <p className="text-sm text-muted-foreground">RealEstate Portal</p>
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
                  <h2 className="text-xl font-semibold">Admin Menu</h2>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
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
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                {/* Analytics Cards */}
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
                    <p className="text-3xl font-bold mb-1">1,247</p>
                    <p className="text-sm text-muted-foreground">Total Listings</p>
                  </div>

                  <div className="bg-white rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-secondary" />
                      </div>
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +8%
                      </span>
                    </div>
                    <p className="text-3xl font-bold mb-1">4,521</p>
                    <p className="text-sm text-muted-foreground">Registered Users</p>
                  </div>

                  <div className="bg-white rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +24%
                      </span>
                    </div>
                    <p className="text-3xl font-bold mb-1">45.2K</p>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                  </div>

                  <div className="bg-white rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-yellow-600" />
                      </div>
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +18%
                      </span>
                    </div>
                    <p className="text-3xl font-bold mb-1">$2.4M</p>
                    <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="bg-white rounded-lg border border-border p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Pending Approvals</h2>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                      {propertyApprovals.filter(p => p.status === "Pending").length} Pending
                    </span>
                  </div>
                  <div className="space-y-4">
                    {propertyApprovals.filter(p => p.status === "Pending").slice(0, 3).map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold mb-1">{property.title}</p>
                          <p className="text-sm text-muted-foreground mb-1">
                            Owner: {property.owner} • {property.location}
                          </p>
                          <p className="text-sm font-medium text-primary">{property.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-border p-6">
                    <h3 className="font-semibold mb-4">Recent Signups</h3>
                    <div className="space-y-3">
                      {usersList.slice(0, 4).map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{user.joined}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-border p-6">
                    <h3 className="font-semibold mb-4">Top Performing Cities</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New York</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "85%" }} />
                          </div>
                          <span className="text-sm font-medium">342</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Los Angeles</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "72%" }} />
                          </div>
                          <span className="text-sm font-medium">289</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Chicago</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "58%" }} />
                          </div>
                          <span className="text-sm font-medium">234</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">San Francisco</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "45%" }} />
                          </div>
                          <span className="text-sm font-medium">182</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === "properties" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold">Property Management</h1>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Search
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Property</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Owner</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Submitted</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {propertyApprovals.map((property) => (
                          <tr key={property.id} className="hover:bg-muted/50">
                            <td className="px-6 py-4">
                              <p className="font-medium">{property.title}</p>
                            </td>
                            <td className="px-6 py-4 text-sm">{property.owner}</td>
                            <td className="px-6 py-4 text-sm">{property.location}</td>
                            <td className="px-6 py-4 font-semibold text-primary">{property.price}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 text-xs rounded-full ${
                                  property.status === "Approved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {property.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{property.submitted}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {property.status === "Pending" && (
                                  <>
                                    <button className="p-2 hover:bg-green-100 rounded-lg transition-colors">
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    </button>
                                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                                      <XCircle className="w-4 h-4 text-red-600" />
                                    </button>
                                  </>
                                )}
                                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                  <Eye className="w-4 h-4 text-muted-foreground" />
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

            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold">User Management</h1>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Search
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Properties</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {usersList.map((user) => (
                          <tr key={user.id} className="hover:bg-muted/50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                                  {user.name.charAt(0)}
                                </div>
                                <p className="font-medium">{user.name}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">{user.properties}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 text-xs rounded-full ${
                                  user.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                  <Eye className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                  <Settings className="w-4 h-4 text-muted-foreground" />
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

            {/* Featured Properties Tab */}
            {activeTab === "featured" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold">Featured Properties</h1>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                    Add Featured
                  </button>
                </div>

                <div className="space-y-4">
                  {featuredProperties.map((property) => (
                    <div key={property.id} className="bg-white rounded-lg border border-border p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{property.title}</h3>
                            {property.featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{property.location}</p>
                          <p className="text-sm font-semibold text-primary">{property.price}</p>
                          {property.featuredUntil && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Featured until: {property.featuredUntil}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {property.featured ? (
                            <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted">
                              Remove
                            </button>
                          ) : (
                            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2">
                              <Star className="w-4 h-4" />
                              Make Featured
                            </button>
                          )}
                          <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted">
                            Extend
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h1 className="text-3xl font-bold mb-8">Settings</h1>
                <div className="bg-white rounded-lg border border-border p-12 text-center">
                  <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">Settings panel will be displayed here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Configure site settings, payment options, email templates, etc.
                  </p>
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
