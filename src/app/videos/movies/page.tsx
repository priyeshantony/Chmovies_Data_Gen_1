// app/videos/category/page.tsx
import Movies from "@/app/components/videos/movies";
import ClientLayout from '../../ClientLayout';

export default function VideoMoviesPage() {
  return (
    <ClientLayout>
    <div>
      <h1>Video Movies</h1>
      <Movies />
    </div>
    </ClientLayout>
  );
}