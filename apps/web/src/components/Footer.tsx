export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">Contact Us</p>
            <p className="mt-2 text-sm text-gray-300">Email: blog@gmail.com</p>
            <p className="text-sm text-gray-300">Phone: +1234567890</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-lg font-semibold">Follow Us</p>
          </div>
        </div>
        <hr className="my-4 border-gray-700" />
        <p className="text-center text-sm text-gray-300">&copy; 2024 Blogs. All rights reserved.</p>
      </div>
    </footer>
  );
};
