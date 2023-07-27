import Head from 'next/head'
import Layout from "@/components/layout";
import Image from "next/image";
import profilePic from "../../public/images/profile/Hero_image_portrait_primary.png";
import profilePicDark from "../../public/images/profile/Hero_image_portrait_primary_dark.png";
import AnimatedText from "@/components/animatedText";
import Link from "next/link";
import {LinkArrow} from "@/components/icons";
import HireMe from "@/components/hireMe";
import TransitionEffect from "@/components/transitionEffect";

export default function Home({mode}) {
    return (
        <>
            <Head>
                <title>Home | Steven Geudens</title>
                <meta name="description"
                      content="Steven Geudens is a versatile developer, network engineer, and programmer with a passion for building high-performance, user-friendly websites and applications. Explore his portfolio to discover his impressive range of skills and expertise in development, network engineering, and programming."/>
            </Head>
            <TransitionEffect/>
            <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
                <Layout className="pt-0 md:pt-16 sm:pt-8">
                    <div className="flex items-center justify-between w-full lg:flex-col">
                        <div className="w-1/2 md:w-full">
                            <Image src={mode === "dark" ? profilePicDark : profilePic} alt="Steven Geudens"
                                   className="w-full h-auto lg:hidden md:inline-block md:w-full"
                                   priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"/>
                        </div>
                        <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
                            <AnimatedText text="Turning Vision Into Reality With Code And Design." className="!text-6xl !text-left
                      xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"/>
                            <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                                Hey there! I&apos;m Steven Geudens, a passionate and driven junior Developer ready for new challenges. I bring fresh ideas, top-notch coding skills, and a hunger for learning. Let&apos;s turn your ideas into reality and achieve success together!
                            </p>
                            <div className="flex items-center self-start mt-2 lg:self-center">
                                <Link href="/CV Steven Geudens v2 EN.pdf" target={"_blank"}
                                      className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold
                          hover:bg-light hover:text-dark border border-solid border-transparent hover:border-dark
                          border-2 dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
                          hover:dark:border-light md:p-2 md:px-4 md:text-base">Resume <LinkArrow className="w-6 ml-1"/></Link>
                                <Link href="/contact"
                                      className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base">Contact</Link>
                            </div>
                        </div>
                    </div>
                </Layout>
                <HireMe/>
            </main>
        </>
    )
}
