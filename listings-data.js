// Active Listings — data source
//
// This is the file to edit for the monthly update (see listings-process.md).
// Each listing is one object below. Add, edit, or delete entries — the page
// re-renders automatically from whatever is in this array.
//
// status: "Available" | "Coming Soon" | "Under Contract"
// category: "Commercial Lease" | "Investment Sale" | "Commercial Sale"
// stats: exactly 3 short strings — shown as pills on the card and in the popup

const listingsData = [
  {
    status: "Available",
    category: "Commercial Lease",
    title: "1420 9th Ave N, Saint Petersburg, FL",
    stats: ["3,200 SF", "$18/SF/YR NNN", "Retail"],
    photo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80",
    description: "Prime retail suite in a high-traffic corridor near downtown Saint Petersburg. Recently updated interior, ample on-site parking, and strong visibility from 9th Ave. Ideal for retail, service, or small office use.",
  },
  {
    status: "Available",
    category: "Investment Sale",
    title: "Pinellas County, FL — Off-Market",
    stats: ["24 Units", "$2.4M", "Multifamily"],
    photo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=80",
    description: "Off-market 24-unit multifamily opportunity in Pinellas County. Stabilized occupancy with room for further value-add through unit renovations. Full financials available upon request.",
  },
  {
    status: "Coming Soon",
    category: "Commercial Sale",
    title: "8100 4th St N, Tampa, FL",
    stats: ["6,500 SF", "$1.1M", "Industrial"],
    photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&q=80",
    description: "Freestanding industrial building with dock-high loading and clear-span warehouse space. Positioned for an owner-user or investor. Not yet on market — available Q3 2026.",
  },
];
