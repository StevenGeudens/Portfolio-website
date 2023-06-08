import Image from "next/image";
import { useState } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {motion} from "framer-motion";
import {AnimatePresence} from "framer-motion";

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */

const FramerImage = motion(Image)

export default function Carousel({ images }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

    const handlePrevSlide = () => {
        let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
    };

    return (
        <div className="relative">
            <AiOutlineLeft
                onClick={handlePrevSlide}
                className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
            />
            <div className="w-full h-[50vh] flex overflow-hidden relative m-auto">
                <Swipe
                    onSwipeLeft={handleNextSlide}
                    onSwipeRight={handlePrevSlide}
                    className="relative z-10 w-full h-full"
                >
                    <AnimatePresence>
                    {images.map((image, index) => index === currentSlide &&
                            <FramerImage key={image.id} src={image.src} fill={true}
                                         style={{objectFit: "contain"}} className="animate-fadeIn"
                                         alt={image.alt} priority
                                         initial={{opacity: 0}} animate={{opacity: 1}}
                                         exit={{ opacity:0 }}
                            />
                    )}
                    </AnimatePresence>
                </Swipe>
            </div>
            <AiOutlineRight
                onClick={handleNextSlide}
                className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
            />

            <div className="relative flex justify-center p-2 mt-3">
                {images.map((_, index) => {
                    return (
                        <div
                            className={
                                index === currentSlide
                                    ? "h-4 w-4 bg-primary dark:bg-primaryDark rounded-full mx-2 mb-2 cursor-pointer"
                                    : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                            }
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}