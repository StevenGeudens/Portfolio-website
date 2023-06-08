import Head from "next/head";
import TransitionEffect from "@/components/transitionEffect";
import Layout from "@/components/layout";
import AnimatedText from "@/components/animatedText";
import {supabase} from "@/lib/supabaseClient";
import Carousel from "@/components/carousel";
import {GithubIcon} from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import {GetProjectById} from "@/pages/api/supabase";

export async function getServerSideProps(context) {
    let project = await GetProjectById(context.query.id);

    return {
        props: {
            project: project
        },
    }
}

const ViewProject = ({project}) => {
    return(
        <>
            <Head>
                <title>{project.title} | Steven Geudens</title>
                <meta name="description" content="" />
            </Head>
            <TransitionEffect/>
            <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
                <Layout className="pt-16">
                    <AnimatedText text={project.title} className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"/>
                    {project.Image.length > 0 && <Carousel images={project.Image}/>}
                    <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
                        <div
                            className="col-start-2 col-span-6 flex flex-col items-center justify-center md:col-span-8 mt-4">
                            <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">Summary</h2>
                            <p className="font-medium text-center">
                                {project.summary}
                            </p>
                            <div className="mt-7 flex sm:flex-col items-center">
                                {project.github && <Link href={project.github} target="_blank" className="w-10"><GithubIcon/></Link>}
                                {project.link && <Link href={project.link} target="_blank" className="ml-4 sm:ml-0 rounded-lg bg-dark text-light p-2 px-6 text-lg
                    font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base sm:mt-3">Visit Project</Link>}
                            </div>
                        </div>
                    </div>
                </Layout>
            </main>
        </>
    )
}

export default ViewProject;