import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const listHeader = ["Home", "Posts", "Contact"];

  return (
    <div dir="rtl" className="bg-yellow-600 py-4 px-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-row items-center">
          {listHeader.map((item) => {
            return (
              <Link href={`/${item.toLocaleLowerCase()}`} key={item}>
                <div className="px-4">
                  <p className="text-white capitalize">{item}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="/">
          <Image
            src="https://media.geeksforgeeks.org/wp-content/uploads/20230816191453/gfglogo.png"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
    </div>
  );
}
