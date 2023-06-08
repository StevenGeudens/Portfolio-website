import Head from "next/head";
import AnimatedText from "@/components/animatedText";
import Layout from "@/components/layout";
import Image from "next/image";
import ProfilePic from "../../public/images/profile/About_portrait.png";
import {useEffect, useRef} from "react";
import {useInView, useMotionValue, useSpring} from "framer-motion";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Education from "@/components/education";
import TransitionEffect from "@/components/transitionEffect";
import {supabase} from "@/lib/supabaseClient";

const AnimatedNumbers = ({value}) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {duration: 3000});
    const isInView = useInView(ref, {once: true});

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);
    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current && latest.toFixed(0) <= value) {
                ref.current.textContent = latest.toFixed(0);
            }
        })
    }, [springValue, value]);

    return <span ref={ref}></span>
}

export async function getServerSideProps() {
    const supabaseClient = supabase;
    let {data: experiences} = await supabaseClient.from('Experience').select().order('endDate', {ascending: true});
    let {data: educations} = await supabase.from('Education').select().order('achievementDate', {ascending: true});

    return {
        props: {
            experiences: experiences,
            educations: educations
        },
    }
}

const About = ({experiences, educations}) => {
    return (
        <>
            <Head>
                <title>About | Steven Geudens</title>
                <meta name="description"
                      content="Learn more about Steven Geudens, a web developer, network engineer, and programmer with a passion for creating innovative digital solutions. Discover his background, experience, and expertise in web development, network engineering, and programming, and see why he is the perfect fit for your next project."/>
            </Head>
            <TransitionEffect/>
            <main className="flex w-full flex-col items-center justify-center dark:text-light">
                <Layout className="pt-16">
                    <AnimatedText text="Passion Fuels Purpose!"
                                  className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"/>
                    <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
                        <div
                            className="col-start-2 col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
                            <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">Biography</h2>
                            <p className="font-medium">
                                Hi, I'm Steven Geudens, a full-stack developer with a passion for
                                creating beautiful, functional, and user-centered digital experiences and applications.
                            </p>
                            <p className="mt-4 font-medium">
                                As a recent graduate in programming and computer science network management, I bring a unique perspective to my work as
                                a full-stack developer. My background in network management has equipped me with a strong understanding
                                of the underlying infrastructure and technologies that power the digital world. This knowledge allows
                                me to create web applications that are not only visually appealing but also efficient, scalable,
                                and secure.
                            </p>
                            <p className="mt-4 font-medium">
                                One of the things that sets me apart is my eagerness to learn and take on challenging new projects.
                                I thrive in dynamic environments where I can continuously expand my knowledge and skills.
                                Staying up to date with the latest industry trends and best practices is important to me,
                                as it allows me to deliver cutting-edge solutions that exceed client expectations.
                            </p>
                        </div>
                        <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8
                        dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8">
                            <div
                                className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light"/>
                            <Image src={ProfilePic} alt="Steven Geudens" className="w-full h-auto rounded-2xl" priority
                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                        </div>
                        {/*<div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center
                        md:order-3">
                            <div className="flex flex-col items-end justify-center xl:items-center">
                                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                                    <AnimatedNumbers value={50}/>+
                                </span>
                                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center
                                md:text-lg sm:text-base xs:text-sm">
                                    Satisfied clients
                                </h2>
                            </div>
                            <div className="flex flex-col items-end justify-center xl:items-center">
                                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                                    <AnimatedNumbers value={40}/>+
                                </span>
                                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center
                                md:text-lg sm:text-base xs:text-sm">
                                    Projects completed
                                </h2>
                            </div>
                            <div className="flex flex-col items-end justify-center xl:items-center">
                                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                                    <AnimatedNumbers value={4}/>+
                                </span>
                                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center
                                md:text-lg sm:text-base xs:text-sm">
                                    Years of experience
                                </h2>
                            </div>
                        </div>*/}
                    </div>
                    <Skills/>
                    <Experience experiences={experiences}/>
                    <Education educations={educations}/>
                </Layout>
            </main>
        </>
    )
}

export default About;