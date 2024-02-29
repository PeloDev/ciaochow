import Logo from "../components/Logo";
import womanWithGroceries from "../assets/vectors/woman-groceries.svg";
import manWithGroceries from "../assets/vectors/man-groceries.svg";
import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="px-5 py-9 w-full flex-1 flex flex-col bg-[center_top_-44px] bg-green_ellipse bg-no-repeat bg-contain justify-around">
      <div className="flex w-full items-center justify-center">
        <Logo />
      </div>
      <div className="flex justify-center">
        <Image
          src={womanWithGroceries}
          alt="Happy woman holding a bag of groceries"
          width={125}
          height={285}
          priority
        />
        <Image
          src={manWithGroceries}
          alt="Happy man holding a bag of groceries"
          width={145}
          height={290}
          priority
        />
      </div>
      <p className="text-[18px] text-center font-normal">
        Hungry? <span className="font-bold">CiaoChow</span> helps
        <br />
        you find something to eat.
      </p>
      <Link
        href="/register"
        className="bg-white justify-center flex text-ccGreen rounded-[10px] p-[16px] font-semibold text-[18px]"
      >
        Get Started
      </Link>
      {/* The UI below currently serves no other purpose than to be accurate to Figma design */}
      <div className="flex justify-center gap-1">
        <circle className=" bg-ccGray w-2 h-2 rounded-full" />
        <circle className=" bg-ccGray w-2 h-2 rounded-full" />
        <circle className=" bg-white w-2 h-2 rounded-full" />
      </div>
    </div>
  );
}
