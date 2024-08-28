'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLink.module.scss';
import Image from 'next/image';

interface INavLinkProps {
  href: string;
  label: string;
}
export default function NavLink({ href, label }: INavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${styles.linkBtn} ${isActive && styles.active}`}>
      <p className={isActive ? styles.active : ''}>{label}</p>
      {isActive && (
        <div className={styles.underline}>
          <Image src={'/assets/icons/underline.svg'} alt="underline" fill />
        </div>
      )}
    </Link>
  );
}
