import '@/styles/globals.css'
import {Montserrat} from 'next/font/google'
import Head from "next/head";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import {AnimatePresence} from "framer-motion";
import {useRouter} from "next/router";
import {ChakraProvider} from "@chakra-ui/react";
import useThemeSwitcher from "@/components/hooks/useThemeSwitcher";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-mont"
})

export default function App({Component, pageProps}) {
    const router = useRouter();
    const [mode, setMode] = useThemeSwitcher();
    return (
        <ChakraProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
                    <NavBar mode={mode} setMode={setMode}/>
                        <AnimatePresence mode="wait">
                            <Component key={router.asPath} {...pageProps} mode={mode}/>
                        </AnimatePresence>
                    <Footer/>
            </main>
        </ChakraProvider>
    )
}
