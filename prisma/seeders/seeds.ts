import { PrismaClient } from '@prisma/client';

// This funciton creates dummy data for testing
export async function seed(prisma: PrismaClient) {
  // Define Dummy Locations
  const locations = [
    { country: 'USA', address: '123 Main St, New York, NY 10001' },
    { country: 'UK', address: '456 High St, London, SW1A 1AA' },
    { country: 'Canada', address: '789 Maple Ave, Toronto, ON M5V 2T6' },
    { country: 'Australia', address: '321 Ocean Rd, Sydney, NSW 2000' },
    { country: 'Germany', address: '654 Berliner Str, Berlin, 10115' },
  ];

  const avatars = [
    { url: "uploads/avatars/av-1.jpeg"},
    { url: "uploads/avatars/av-2.jpeg"},
    { url: "uploads/avatars/av-3.jpeg"},
    { url: "uploads/avatars/av-4.jpeg"},
    { url: "uploads/avatars/av-5.jpeg"},
  ];

  // Define Dummy Artists
  const artistsData = [
    {
      name: 'Alice Smith',
      age: 28,
      email: 'alice.smith@example.com',
      phone: '123-456-7890',
      password: 'securepass123',
    },
    {
      name: 'Bob Johnson',
      age: 35,
      email: 'bob.johnson@example.com',
      phone: '234-567-8901',
      password: 'securepass456',
    },
    {
      name: 'Clara Lee',
      age: 22,
      email: 'clara.lee@example.com',
      phone: '345-678-9012',
      password: 'securepass789',
    },
    {
      name: 'David Brown',
      age: 40,
      email: 'david.brown@example.com',
      phone: '456-789-0123',
      password: 'securepass012',
    },
    {
      name: 'Emma Davis',
      age: null,
      email: 'emma.davis@example.com',
      phone: '567-890-1234',
      password: 'securepass345',
    },
  ];

  // Create locations and artist

  const artists = [];
  for (let i = 0; i < artistsData.length; i++) {
    const location = await prisma.location.create({
      data: locations[i],
    });
    const avatar = await prisma.avatar.create({
        data: avatars[i],
    })
    const artist = await prisma.artist.create({
      data: {
        ...artistsData[i],
        locationId: location.id,
        avatarId: avatar.id,
      },
    });
    artists.push(artist);
  }

  // Define Dummy video categories
  const categories = [
    'Hip Pop',
    'Rap',
    'RNB',
    'Afrobeat',
    'Raggae',
    'Dancehall',
    'Reggarton',
    'Others',
  ];

  // Create Videos
  const videosCount = 22;
  for (let i = 0; i < videosCount; i++) {
    const artist = artists[i % artists.length];
    const video = await prisma.video.create({
      data: {
        title: `Video ${i + 1} by ${artist.name}`,
        description: `Description for video ${i + 1}, a ${categories[i % categories.length]} masterpiece.`,
        category: categories[i % categories.length],
        url: `uploads/videos/video-${i}.mp4`,
        artistId: artist.id,
      },
    });
  }

  console.log(
    'Database seeded successfully with 5 artists, 5 locations, and 21 videos.',
  );
}


