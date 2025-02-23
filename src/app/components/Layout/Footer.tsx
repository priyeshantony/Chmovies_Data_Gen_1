
"use client"; // Mark this component as a client component

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-xs p-4 w-full text-center pt-6">
      <p>OTPCP © {new Date().getFullYear()} - OTT Control Panel</p>
    </footer>
  );
};

export default Footer;
  