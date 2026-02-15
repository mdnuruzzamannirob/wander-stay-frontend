import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={className}>
      <Image src="/logo.png" alt="Logo" width={100} height={40} />
    </Link>
  );
};

export default Logo;
