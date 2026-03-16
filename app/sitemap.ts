import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.umarsiddique.dev', lastModified: new Date() },
    { url: 'https://www.umarsiddique.dev/projects', lastModified: new Date() },
    { url: 'https://www.umarsiddique.dev/about', lastModified: new Date() },
    { url: 'https://www.umarsiddique.dev/blogs', lastModified: new Date() },
    { url: 'https://www.umarsiddique.dev/contact', lastModified: new Date() },
  ];
}
