// app/videos/category/page.tsx
import VideoCategory from "@/app/components/videos/category";
import ClientLayout from '../../ClientLayout';

export default function VideoCategoryPage() {
  return (
    <ClientLayout>
    <div>
      <h1>Video Category</h1>
      <VideoCategory />
    </div>
    </ClientLayout>
  );
}