import Image from "next/image";
import styles from "./page1.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section
        className={`${styles.back} flex justify-center items-center min-h-screen px-4`}
      >
        <div
          className={`${styles.bgmain} flex flex-col justify-center items-center text-center bg-linear-to-b from-black/60 via-black/50 to-white/20 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg`}>
          <h1 className="text-white/80 text-2xl sm:text-3xl md:text-4xl mb-3 font-semibold">
            Scientific Calculator
          </h1>
          <h3 className="text-white/90 text-base sm:text-lg md:text-xl mb-6">
            An online calculator to calculate mathematical problems
          </h3>

          <Link
            href="/calculator"
            className={`${styles.bgbutton} inline-block w-full sm:w-3/4 md:w-1/2 bg-black text-white py-3 px-6 text-lg sm:text-xl rounded-lg hover:shadow-lg hover:shadow-white/30 transition duration-300`}>
            Click to Calculate
          </Link>
        </div>
      </section>
    </>
  );
}
