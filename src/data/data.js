/**
 * Mock fault data for Indian Railways train inspections.
 * Backend team will replace or extend this with live API integration later.
 */

const trainData = [
  {
    train_id: "12345",
    train_route: "Delhi - Mumbai Central",
    fault_locations: ["Near Kota Junction", "Before Vadodara Station", "Approaching Surat"],
    crack_descriptions: [
      "Crack of approx. 2cm length on rail joint",
      "Rusting observed around crack perimeter",
      "Crack near welding joint shows stress concentration",
      "Multiple hairline fractures detected in vicinity",
      "Depth measurement requires ultrasonic testing",
      "Irregular metal surface indicating wear",
      "Vibration-sensitive area needs monitoring",
      "Possible fatigue crack from repeated loading",
      "Water damage visible around crack edges",
      "Loose fitting detected requiring immediate attention"
    ],
    media_links: {
      images: [
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
      ],
      videos: ["https://www.w3schools.com/html/mov_bbb.mp4"]
    },
    priority: "High",
    status: "Under Process"
  },
  {
    train_id: "67890",
    train_route: "Chennai Central - Bangalore City",
    fault_locations: ["Near Arakkonam Junction"],
    crack_descriptions: [
      "Surface scratch only, no structural damage",
      "Minor wear pattern observed",
      "Regular maintenance required",
      "No immediate safety concerns",
      "Preventive measures recommended"
    ],
    media_links: {
      images: ["https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400"],
      videos: []
    },
    priority: "Low",
    status: "Not Started"
  },
  {
    train_id: "13579",
    train_route: "Kolkata - New Delhi",
    fault_locations: ["Approaching Kanpur Central", "Near Allahabad Junction"],
    crack_descriptions: [
      "Medium-priority crack in rail head",
      "Length approximately 1.5cm",
      "No immediate danger to operations",
      "Scheduled for next maintenance cycle",
      "Temperature variations may affect growth",
      "Monitoring frequency increased",
      "Documentation updated in system"
    ],
    media_links: {
      images: ["https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400"],
      videos: []
    },
    priority: "Medium",
    status: "Under Process"
  },
  {
    train_id: "24680",
    train_route: "Mumbai Central - Ahmedabad",
    fault_locations: ["Surat Station Approach"],
    crack_descriptions: [
      "Hairline crack successfully repaired",
      "Quality assurance completed",
      "Track certified for normal operations",
      "Repair documentation filed"
    ],
    media_links: {
      images: ["https://images.unsplash.com/photo-1602490036506-2fa9b3899e5e?w=400"],
      videos: []
    },
    priority: "Medium",
    status: "Solved"
  }
];

export default trainData;