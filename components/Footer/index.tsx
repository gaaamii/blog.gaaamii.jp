const Footer = ({ children }: { children: React.ReactNode }) => (
  <footer
    className={
      "bg-black py-10 underline text-center text-white flex justify-center gap-10 flex-col sm:flex-row"
    }
  >
    {children}
  </footer>
);

export default Footer;
