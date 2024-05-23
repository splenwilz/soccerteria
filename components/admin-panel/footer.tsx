import Link from "next/link";
import age_limit from "../../assets/images/age-limit.png";
import Image from "next/image";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
        <div className="flex gap-2">
          <Image src={age_limit} alt="age_limit" width={25} height={25} />
          <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left mt-[2px]">
            You must be 18 or over
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/faq"
            className="font-medium underline underline-offset-4 text-[14px]"
          >
            FAQ
          </Link>

          <Link
            href="/terms-of-service"
            className="font-medium underline underline-offset-4 text-[14px]"
          >
            Terms Of Service
          </Link>
          <Link
            href="/privacy-policy"
            className="font-medium underline underline-offset-4 text-[14px]"
          >
            Privacy Policy
          </Link>
        </div>
        <p className="text-[12px] leading-loose text-muted-foreground text-left">
          Lorem Ipsum is simply dummy text of the printing
        </p>

      </div>
    </div>
  );
}
