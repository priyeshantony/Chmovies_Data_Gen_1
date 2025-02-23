// app/videos/category/page.tsx
import Adminstrators from "@/app/components/users/adminstrators";
import ClientLayout from '../../ClientLayout';

export default function AdminstratorLists() {
  return (
    <ClientLayout>
      <div>
        <h1>Adminstrators List</h1>
        <Adminstrators />
      </div>
    </ClientLayout>
  );
}