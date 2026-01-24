import Link from "next/link";
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa6";

/**
 * Şimdilik MOCK
 * Sonra burası API / settings tablosundan gelir
 */
const SOCIALS = {
  instagram: "https://instagram.com/diyet",
  twitter: "https://x.com/diyet",
  youtube: "https://youtube.com/@diyet",
  facebook: "https://facebook.com/diyet",
};

export default function HeaderSocials() {
  return (
    <div className="flex items-center gap-3">
      {SOCIALS.instagram && (
        <Link
          href={SOCIALS.instagram}
          target="_blank"
          aria-label="Instagram"
          className="text-gray-500 hover:text-emerald-600 transition"
        >
          <FaInstagram size={18} />
        </Link>
      )}

      {SOCIALS.twitter && (
        <Link
          href={SOCIALS.twitter}
          target="_blank"
          aria-label="X"
          className="text-gray-500 hover:text-emerald-600 transition"
        >
          <FaXTwitter size={18} />
        </Link>
      )}

      {SOCIALS.youtube && (
        <Link
          href={SOCIALS.youtube}
          target="_blank"
          aria-label="YouTube"
          className="text-gray-500 hover:text-emerald-600 transition"
        >
          <FaYoutube size={18} />
        </Link>
      )}

      {SOCIALS.facebook && (
        <Link
          href={SOCIALS.facebook}
          target="_blank"
          aria-label="Facebook"
          className="text-gray-500 hover:text-emerald-600 transition"
        >
          <FaFacebookF size={18} />
        </Link>
      )}
    </div>
  );
}
