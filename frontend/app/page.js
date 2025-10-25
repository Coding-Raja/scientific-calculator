import Image from "next/image";
import styles from "./page1.module.css"

export default function Home() {
  return (
    <>
      <section className={`${styles.back} flex w-full justify-center items-center sm:w-1/2 md:w-3/4 lg:w-full`}>
        <div className=" flex flex-col justify-center items-center bg-gradient-to-b from-black/50 via-black/40 to-white/20 w-1/2 h-1/2 rounded-lg">
          <h1 className="text-white/80 text-center text-3xl mb-3 ">Scientific Calculator</h1>
          <h3 className="text-white/90 text-center text-xl mb-4 ">An online calculator to calculate mathematical problems</h3>
          <div className="w-1/2 bg-black p-4 text-white text-center text-xl rounded-lg">Click to calculate</div>
        </div>
      </section>
    </>
  );
}
