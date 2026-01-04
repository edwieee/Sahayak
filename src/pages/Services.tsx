import { Search, MapPin, Star, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const categories = [
  "All",
  "Healthcare",
  "Education", 
  "Jobs",
  "Legal",
  "Government",
];

const mockServices = [
  {
    id: "1",
    name: "Primary Health Centre - Andheri",
    category: "Healthcare",
    distance: "1.2 km",
    rating: 4.2,
    hours: "Open 24/7",
    status: "open",
  },
  {
    id: "2",
    name: "Ayushman Bharat Registration",
    category: "Healthcare",
    distance: "2.5 km",
    rating: 4.5,
    hours: "9 AM - 5 PM",
    status: "open",
  },
  {
    id: "3",
    name: "Government ITI - Skill Training",
    category: "Education",
    distance: "3.1 km",
    rating: 4.0,
    hours: "9 AM - 4 PM",
    status: "open",
  },
  {
    id: "4",
    name: "District Legal Services Authority",
    category: "Legal",
    distance: "4.2 km",
    rating: 4.3,
    hours: "10 AM - 5 PM",
    status: "closed",
  },
  {
    id: "5",
    name: "Employment Exchange Office",
    category: "Jobs",
    distance: "2.8 km",
    rating: 3.8,
    hours: "10 AM - 3 PM",
    status: "open",
  },
  {
    id: "6",
    name: "Ration Card Office",
    category: "Government",
    distance: "1.8 km",
    rating: 3.5,
    hours: "10 AM - 4 PM",
    status: "open",
  },
];

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout topBarTitle="Services">
      <div className="container-mobile py-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredServices.length} services found
        </p>

        {/* Service List */}
        <div className="space-y-3">
          {filteredServices.map((service) => (
            <Link
              key={service.id}
              to={`/service/${service.id}`}
              className="service-card"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    service.status === "open" ? "bg-secondary" : "bg-muted-foreground"
                  }`} />
                  <span className="text-xs text-muted-foreground">
                    {service.category}
                  </span>
                </div>
                
                <h3 className="font-semibold truncate">{service.name}</h3>
                
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {service.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning" />
                    {service.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {service.hours}
                  </span>
                </div>
              </div>
              
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
