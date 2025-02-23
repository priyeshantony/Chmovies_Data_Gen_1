// app/videos/category/page.tsx
import Series from "@/app/components/videos/series";
import ClientLayout from '../../ClientLayout';

export default function VideoSeriesPage() {
  return (
    <ClientLayout>
    <div>
      <h1>Video Series</h1>
      <Series />
    </div>
    </ClientLayout>
  );
}