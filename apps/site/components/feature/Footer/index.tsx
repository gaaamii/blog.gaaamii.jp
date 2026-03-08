import Link from "next/link";

const Footer = ({ children }: { children: React.ReactNode }) => (
  <footer
    className={
      "bg-black py-20 underline text-center text-white flex justify-center gap-8 sm:gap-10 flex-col sm:flex-row sm:text-center"
    }
  >
    {children}
  </footer>
);

export default Footer;

export const FooterLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link href={href}>
      <div className="w-60 flex gap-1 mx-auto sm:w-auto py-4">{children}</div>
    </Link>
  );
};
