const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const sampleListings = [
  {
    title: 'Beach House',
    description: 'Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!',
    image: {
      url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 300,
    location: 'Malibu',
    country: 'USA',
    reviews: [],
    owner: new ObjectId('676d79345f523d07ce795129'),
    geometry: { type: 'Point', coordinates: [ -118.7798, 34.0259 ] },
    category:"Amazing Pools",
  },
  {
    title: 'Mountain Cabin',
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 250,
    location: 'Aspen',
    country: 'USA',
    reviews: [],
    owner: new ObjectId('676d79345f523d07ce795129'),
    geometry: { type: 'Point', coordinates: [ -106.8371, 39.1911 ] },
    category:"Mountains",
  },
  {
    title: 'City Apartment',
    description: 'Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.',
    image: {
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 500,
    location: 'New York',
    country: 'USA',
    reviews: [],
    owner: new ObjectId('676d79345f523d07ce795129'),
    geometry: { type: 'Point', coordinates: [ -74.006, 40.7128 ] },
    category:"Iconic Cities",
  },
  {
   
    title: 'Countryside Villa',
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 450,
    location: 'Tuscany',
    country: 'Italy',
    reviews: [],
    owner: new ObjectId('676d79345f523d07ce795129'),
    geometry: { type: 'Point', coordinates: [ 11.2558, 43.7696 ] },
    category:"Trending",

  },
  {
  
    title: 'Desert Retreat',
    image: {
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'listingimage'
    },
    price: 200,
    location: 'Phoenix',
    country: 'USA',
    reviews: [],
    owner: new ObjectId('676d79345f523d07ce795129'),
    geometry: { type: 'Point', coordinates: [ -112.074, 33.4484 ] },
    Category:"Camping",

  },
  {
  
    title: 'Lakefront Cottage',
    description: 'A charming cottage overlooking the serene Lake Tahoe. Perfect for a peaceful getaway with stunning views, outdoor activities, and cozy interiors.',
    image: {
      url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736150855/wanderlust_DEV/jfqbnkw7k1wmbzyy5gu2.jpg',
      filename: 'wanderlust_DEV/jfqbnkw7k1wmbzyy5gu2'
    },
    price: 9000,
    location: 'Lake Tahoe',
    country: 'USA',
    reviews: [],
    owner: new ObjectId('676cfb1656a91e4fb3e0cdc1'),
    geometry: {
      type: 'Point',
      coordinates: [ -120.05035277301698, 39.08854049999999 ]
    },
    category:"Farms",
   
  },
  {
    
    title: 'Cozy Cottage in the Himalayas',
    description: 'Experience serenity in a quaint cottage surrounded by the majestic Himalayan mountains.',
    image: {
      url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171410/wanderlust_DEV/oxyznww5usn54hcjl6nt.jpg',
      filename: 'wanderlust_DEV/oxyznww5usn54hcjl6nt'
    },
    price: 97000,
    location: 'Manali, Himachal Pradesh',
    country: 'India',
    reviews: [],
    owner: new ObjectId('676cfb1656a91e4fb3e0cdc1'),
    geometry: { type: 'Point', coordinates: [ 77.1872926, 32.2454608 ] },
    category:"Arctic",

  },
  {
   
    title: 'Beachfront Villa in Goa',
    description: 'Luxurious beachfront villa with stunning sea views and modern amenities.',
    image: {
      url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171796/wanderlust_DEV/u4inurpwfqp3qpdfaezt.jpg',
      filename: 'wanderlust_DEV/u4inurpwfqp3qpdfaezt'
    },
    price: 56000,
    location: 'Calangute, Goa',
    country: 'India',
    reviews: [],
    owner: new ObjectId('676cfb1656a91e4fb3e0cdc1'),
    geometry: { type: 'Point', coordinates: [ 73.763253, 15.5460146 ] },
    category:"Camping",

  },
  {
    
    title: 'Heritage Haveli in Jaipur',
    description: 'Stay in a traditional haveli featuring authentic Rajasthani architecture and decor.',
    image: {
      url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171869/wanderlust_DEV/dhozo1lhzrjus6kgdd6t.jpg',
      filename: 'wanderlust_DEV/dhozo1lhzrjus6kgdd6t'
    },
    price: 80000,
    location: 'Jaipur, Rajasthan',
    country: 'India',
    reviews: [],
    owner: new ObjectId('676cfb1656a91e4fb3e0cdc1'),
    geometry: { type: 'Point', coordinates: [ 75.8189817, 26.9154576 ] },
    category:"Castles",
   
  },
  {
    
    title: 'Modern Apartment in Mumbai',
    description: 'Chic and modern apartment in the heart of the city, close to popular attractions.',
    image: {
      url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171918/wanderlust_DEV/wyxdwivbapmruevc0wi8.jpg',
      filename: 'wanderlust_DEV/wyxdwivbapmruevc0wi8'
    },
    price: 87000,
    location: 'Bandra, Mumbai',
    country: 'India',
    reviews: [],
    owner: new ObjectId('676cfb1656a91e4fb3e0cdc1'),
    geometry: { type: 'Point', coordinates: [ 72.8402203, 19.0549792 ] },
    category:"Trending",
 
  },
  {
    
    title: 'Houseboat in Kerala Backwaters',
    description: 'Relax in a traditional houseboat cruising through the serene backwaters of Kerala.',
    image: {
      url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171970/wanderlust_DEV/xunr0vgrii0pdvdcfror.jpg',
      filename: 'wanderlust_DEV/xunr0vgrii0pdvdcfror'
    },
    price: 75000,
    location: 'Alleppey, Kerala',
    country: 'India',
    reviews: [],
    owner: new ObjectId('676cfb1656a91e4fb3e0cdc1'),
    geometry: { type: 'Point', coordinates: [ 76.48560323219155, 9.19893415 ] },
    category:"Farms",

  }
]

module.exports = { data: sampleListings };






// db.listings.find()
// [
//   {
//     _id: ObjectId('677b8e8b50c4468c9ab4c262'),
//     title: 'Beach House',
//     description: 'Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!',
//     image: {
//       url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
//       filename: 'listingimage'
//     },
//     price: 300,
//     location: 'Malibu',
//     country: 'USA',
//     reviews: [],
//     owner: ObjectId('676d79345f523d07ce795129'),
//     geometry: { type: 'Point', coordinates: [ -118.7798, 34.0259 ] },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677b8e8b50c4468c9ab4c263'),
//     title: 'Mountain Cabin',
//     description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
//     image: {
//       url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
//       filename: 'listingimage'
//     },
//     price: 250,
//     location: 'Aspen',
//     country: 'USA',
//     reviews: [],
//     owner: ObjectId('676d79345f523d07ce795129'),
//     geometry: { type: 'Point', coordinates: [ -106.8371, 39.1911 ] },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677b8e8b50c4468c9ab4c264'),
//     title: 'City Apartment',
//     description: 'Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.',
//     image: {
//       url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
//       filename: 'listingimage'
//     },
//     price: 500,
//     location: 'New York',
//     country: 'USA',
//     reviews: [],
//     owner: ObjectId('676d79345f523d07ce795129'),
//     geometry: { type: 'Point', coordinates: [ -74.006, 40.7128 ] },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677b8e8b50c4468c9ab4c265'),
//     title: 'Countryside Villa',
//     description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
//     image: {
//       url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
//       filename: 'listingimage'
//     },
//     price: 450,
//     location: 'Tuscany',
//     country: 'Italy',
//     reviews: [],
//     owner: ObjectId('676d79345f523d07ce795129'),
//     geometry: { type: 'Point', coordinates: [ 11.2558, 43.7696 ] },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677b8e8b50c4468c9ab4c266'),
//     title: 'Desert Retreat',
//     image: {
//       url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
//       filename: 'listingimage'
//     },
//     price: 200,
//     location: 'Phoenix',
//     country: 'USA',
//     reviews: [],
//     owner: ObjectId('676d79345f523d07ce795129'),
//     geometry: { type: 'Point', coordinates: [ -112.074, 33.4484 ] },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677b8f49f93099fc481dedcc'),
//     title: 'Lakefront Cottage',
//     description: 'A charming cottage overlooking the serene Lake Tahoe. Perfect for a peaceful getaway with stunning views, outdoor activities, and cozy interiors.',
//     image: {
//       url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736150855/wanderlust_DEV/jfqbnkw7k1wmbzyy5gu2.jpg',
//       filename: 'wanderlust_DEV/jfqbnkw7k1wmbzyy5gu2'
//     },
//     price: 9000,
//     location: 'Lake Tahoe',
//     country: 'USA',
//     reviews: [],
//     owner: ObjectId('676cfb1656a91e4fb3e0cdc1'),
//     geometry: {
//       type: 'Point',
//       coordinates: [ -120.05035277301698, 39.08854049999999 ]
//     },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677bdf938fcd92df462ae376'),
//     title: 'Cozy Cottage in the Himalayas',
//     description: 'Experience serenity in a quaint cottage surrounded by the majestic Himalayan mountains.',
//     image: {
//       url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171410/wanderlust_DEV/oxyznww5usn54hcjl6nt.jpg',
//       filename: 'wanderlust_DEV/oxyznww5usn54hcjl6nt'
//     },
//     price: 97000,
//     location: 'Manali, Himachal Pradesh',
//     country: 'India',
//     reviews: [],
//     owner: ObjectId('676cfb1656a91e4fb3e0cdc1'),
//     geometry: { type: 'Point', coordinates: [ 77.1872926, 32.2454608 ] },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677be1158fcd92df462ae385'),
//     title: 'Beachfront Villa in Goa',
//     description: 'Luxurious beachfront villa with stunning sea views and modern amenities.',
//     image: {
//       url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171796/wanderlust_DEV/u4inurpwfqp3qpdfaezt.jpg',
//       filename: 'wanderlust_DEV/u4inurpwfqp3qpdfaezt'
//     },
//     price: 56000,
//     location: 'Calangute, Goa',
//     country: 'India',
//     reviews: [],
//     owner: ObjectId('676cfb1656a91e4fb3e0cdc1'),
//     geometry: { type: 'Point', coordinates: [ 73.763253, 15.5460146 ] },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677be15e8fcd92df462ae398'),
//     title: 'Heritage Haveli in Jaipur',
//     description: 'Stay in a traditional haveli featuring authentic Rajasthani architecture and decor.',
//     image: {
//       url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171869/wanderlust_DEV/dhozo1lhzrjus6kgdd6t.jpg',
//       filename: 'wanderlust_DEV/dhozo1lhzrjus6kgdd6t'
//     },
//     price: 80000,
//     location: 'Jaipur, Rajasthan',
//     country: 'India',
//     reviews: [],
//     owner: ObjectId('676cfb1656a91e4fb3e0cdc1'),
//     geometry: { type: 'Point', coordinates: [ 75.8189817, 26.9154576 ] },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677be1908fcd92df462ae3a0'),
//     title: 'Modern Apartment in Mumbai',
//     description: 'Chic and modern apartment in the heart of the city, close to popular attractions.',
//     image: {
//       url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171918/wanderlust_DEV/wyxdwivbapmruevc0wi8.jpg',
//       filename: 'wanderlust_DEV/wyxdwivbapmruevc0wi8'
//     },
//     price: 87000,
//     location: 'Bandra, Mumbai',
//     country: 'India',
//     reviews: [],
//     owner: ObjectId('676cfb1656a91e4fb3e0cdc1'),
//     geometry: { type: 'Point', coordinates: [ 72.8402203, 19.0549792 ] },
//     __v: 0
//   },
//   {
//     _id: ObjectId('677be1c48fcd92df462ae3a8'),
//     title: 'Houseboat in Kerala Backwaters',
//     description: 'Relax in a traditional houseboat cruising through the serene backwaters of Kerala.',
//     image: {
//       url: 'https://res.cloudinary.com/dnc5euo95/image/upload/v1736171970/wanderlust_DEV/xunr0vgrii0pdvdcfror.jpg',
//       filename: 'wanderlust_DEV/xunr0vgrii0pdvdcfror'
//     },
//     price: 75000,
//     location: 'Alleppey, Kerala',
//     country: 'India',
//     reviews: [],
//     owner: ObjectId('676cfb1656a91e4fb3e0cdc1'),
//     geometry: { type: 'Point', coordinates: [ 76.48560323219155, 9.19893415 ] },
//     __v: 0
//   }
// ]

// module.exports = { data: sampleListings };
