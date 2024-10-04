'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Navbar.module.css' 

const Navbar = () => {
  const [text, setText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const fullText = 'MyShopReview';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(intervalId);
        setIsTypingDone(true);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isTypingDone ? styles.typingDone : ''} flex items-center bg-white justify-center w-fit px-4 py-2 max-w-[340px] mx-auto mt-5 rounded-full`}>
      <div className="mr-4">
        <Image 
          className=" mt-2"
          src="/main-logo.svg" 
          alt="logo" 
          width={50} 
          height={41} 
        />
      </div>
      <div className={`${styles.animatedText} flex items-center`}>
        <h1 className="text-lg font-bold ml-[-15px] text-[#94BF46]">{text}{!isTypingDone && <span className={styles.cursor}>|</span>}</h1>
      </div>
    </nav>
  )
}

export default Navbar