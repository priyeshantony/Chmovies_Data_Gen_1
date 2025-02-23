import { FC } from "react";

import Footer from "@/app/components/Layout/Footer";

const Subscriber: FC = () => {
  return (
    <>
    <main className="flex-1 ml-5 pt-10 p-6">
      <h2 className="text-2xl font-bold mb-4 mt-5">Subscriber</h2>
      <p>Welcome to the Subscriber dashboard.</p>
    </main>
    <Footer />
    </>
  );
};

export default Subscriber;
