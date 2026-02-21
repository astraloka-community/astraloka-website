export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: string;
  youtubeVideos: {
    title: string;
    videoId: string;
  }[];
  tiktokLinks: {
    title: string;
    url: string;
  }[];
}

export const galleryItems: GalleryItem[] = [
    {
        id: 'jalan-rusak',
        title: 'Dokumentasi Jalan Rusak',
        description: 'Pendokumentasian jalan yang rusak di berbagai wilayah untuk menaikkan kesadaran masyarakat.',
        icon: '🛣️',
        content: 'Kami berusaha melakukan aksi pendokumentasian jalan yang rusak di berbagai wilayah. Jalan-jalan yang rusak dan kami mampu jangkau akan kami dokumentasikan dengan baik. Dokumentasi ini kami lakukan untuk menaikkan kesadaran masyarakat tentang pentingnya infrastruktur yang baik dan mendorong pemerintah untuk segera melakukan perbaikan.',
        youtubeVideos: [
            {
                title: 'Pendokumentasian Jalan Rusak - Part 1',
                videoId: 'dQw4w9WgXcQ'
            },
            {
                title: 'Kampanye Perbaikan Infrastruktur Jalan',
                videoId: 'jNQXAC9IVRw'
            }
        ],
        tiktokLinks: [
            {
                title: 'Edukasi Hutan Indonesia',
                url: 'https://www.tiktok.com/@astraloka.community.id/video/7608942566674943240'
            }
        ]
    }
];

export function getGalleryItem(id: string): GalleryItem | undefined {
  return galleryItems.find(item => item.id === id);
}
