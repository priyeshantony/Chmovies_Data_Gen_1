// app/videos/category/page.tsx
import Subscribers from "@/app/components/users/subscribers";
import ClientLayout from '../../ClientLayout';

export default function SubscribersList() {
  return (
    <ClientLayout>
      <div>
        <h1>Subscribers List</h1>
        <Subscribers />
      </div>
    </ClientLayout>
  );
  
}