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

  const socialMedia = [
    { platform: 'youtube', link: 'https://guthib.com/' },
    { platform: 'instagram', link: 'https://guthib.com/' },
    { platform: 'twitter', link: 'https://guthib.com/' },
    { platform: 'facebook', link: 'https://guthib.com/' },
    { platform: 'tiktok', link: 'https://guthib.com/' },
  ];

  const avatars = [
    { url: 'uploads/avatars/av-1.png' },
    { url: 'uploads/avatars/av-2.png' },
    { url: 'uploads/avatars/av-3.png' },
    { url: 'uploads/avatars/av-4.png' },
    { url: 'uploads/avatars/av-5.png' },
  ];

  // Define Dummy Artists
  const artistsData = [
    {
      name: 'Alice Smith',
      age: 28,
      email: 'alice.smith@example.com',
      phone: '123-456-7890',
      password: 'securepass123',
      bio: 'Hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music...',
    },
    {
      name: 'Bob Johnson',
      age: 35,
      email: 'bob.johnson@example.com',
      phone: '234-567-8901',
      password: 'securepass456',
      bio: 'Hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music...',
    },
    {
      name: 'Clara Lee',
      age: 22,
      email: 'clara.lee@example.com',
      phone: '345-678-9012',
      password: 'securepass789',
      bio: 'Hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music...',
    },
    {
      name: 'David Brown',
      age: 40,
      email: 'david.brown@example.com',
      phone: '456-789-0123',
      password: 'securepass012',
      bio: 'Hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music...',
    },
    {
      name: 'Emma Davis',
      age: null,
      email: 'emma.davis@example.com',
      phone: '567-890-1234',
      password: 'securepass345',
      bio: 'Hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music hey its me i love Music, hey its me i love Music hey its me i love Music hey its me i love Music...',
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
    });

    const artist = await prisma.artist.create({
      data: {
        ...artistsData[i],
        locationId: location.id,
        avatarId: avatar.id,
        socialMedia: {
          create: socialMedia,
        },
      },
      include: { socialMedia: true },
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
        title: `Video ${i + 1} Title`,
        description: `Description for video ${i + 1}, a ${categories[i % categories.length]} masterpiece.`,
        category: categories[i % categories.length],
        url: `uploads/videos/video-${i}.mp4`,
        artistId: artist.id,
      },
    });
  }

  console.log('🌱 Seeding completed!');
}
