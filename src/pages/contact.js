import Head from "next/head";
import TransitionEffect from "@/components/transitionEffect";
import Layout from "@/components/layout";
import AnimatedText from "@/components/animatedText";
import {Button, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea, useToast} from "@chakra-ui/react";
import {useState} from "react";
import SendContactForm from "@/lib/api";
import Link from "next/link";
import {GithubIcon} from "@/components/icons";

const initValues = {
    name: "",
    email: "",
    message: ""
};

const initState = {values: initValues};

const Contact = () => {
    const toast = useToast();
    const [state, setState] = useState(initState);
    const [touched, setTouched] = useState({});

    const {values, isLoading, error} = state;

    const onBlur = ({target}) => setTouched((prev) => ({
        ...prev,
        [target.name]: true
    }));

    const handleChange = ({target}) => setState((prev) => ({
        ...prev,
        values: {
            ...prev.values,
            [target.name]: target.value
        }
    }));

    const onSubmit = async () => {
      setState((prev) => ({
          ...prev,
          isLoading: true
      }));
      try {
          await SendContactForm(values);
          setTouched({});
          setState(initState);
          toast({
              title: "Message sent",
              status: "success",
              duration: 2000,
              position: "top"
          });
      } catch (err) {
          setState((prev) => ({
              ...prev,
              isLoading: false,
              error: err.message
          }));
      }
    };

    return (
        <>
            <Head>
                <title>Contact | Steven Geudens</title>
                <meta name="description"
                      content="Get in touch with Steven Geudens, a full-stack web developer, network engineer, and programmer. Whether you need help with a project or want to learn more about his services, Steven is here to help. Contact him today to start your digital journey and take your business to the next level."/>
            </Head>
            <TransitionEffect/>
            <main className="flex w-full flex-col items-center justify-center dark:text-light">
                <Layout className="pt-16">
                    <AnimatedText text="Let's Bring Your Ideas to Life!"
                                  className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"/>
                    <div className="grid grid-cols-6">
                        <article className="col-start-2 col-span-4 md:col-start-0 md:col-span-6 rounded-3xl border border-solid border-dark bg-light
            shadow-2xl p-12 relative rounded-br-2xl dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl
            xs:p-4">
                            <FormControl isRequired isInvalid={touched.name && !values.name} className="mb-5">
                                <FormLabel>Name</FormLabel>
                                <Input type="text" name="name" value={values.name} onChange={handleChange}
                                       errorBorderColor="red.300" onBlur={onBlur}/>
                                <FormErrorMessage>Please provide your name.</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={touched.email && !values.email} className="mb-5">
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" value={values.email} onChange={handleChange}
                                       errorBorderColor="red.300" onBlur={onBlur}/>
                                <FormErrorMessage>Please provide your email address.</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={touched.message && !values.message} className="mb-5">
                                <FormLabel>Message</FormLabel>
                                <Textarea type="text" name="message" rows={4}
                                          value={values.message} onChange={handleChange}
                                          errorBorderColor="red.300" onBlur={onBlur}/>
                                <FormErrorMessage>Please provide a message.</FormErrorMessage>
                            </FormControl>
                            <Button className="rounded-lg !bg-primary !text-light p-2 px-6 text-lg
                    font-semibold dark:!bg-primaryDark dark:!text-dark sm:px-4 sm:text-base" onClick={onSubmit}
                                    isDisabled={!values.name || !values.email || !values.message} isLoading={isLoading}>Submit</Button>
                            {
                                error && (
                                    <Text color="red.300" my={4} fontSize="xl">
                                        {error}
                                    </Text>
                                )
                            }
                            <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl
                dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]"/>
                        </article>
                    </div>
                </Layout>
            </main>
        </>
    )
}

export default Contact;