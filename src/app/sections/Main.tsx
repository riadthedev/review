'use client'    
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Navbar.module.css' 

const Main = () => {
    const [url, setUrl] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        // Log environment variables to verify they're being loaded correctly
        console.log("Table ID:", process.env.NEXT_PUBLIC_TABLE_ID)
        console.log("Token:", process.env.NEXT_PUBLIC_XC_TOKEN)
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        const data = { URL: url, Email: email }
        
        try {
            const apiUrl = `https://database.myshopdevs.com/api/v2/tables/${process.env.NEXT_PUBLIC_TABLE_ID}/records`
            console.log("Sending request to:", apiUrl)
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'xc-token': `${process.env.NEXT_PUBLIC_XC_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const responseData = await response.json()
            console.log("Response:", responseData)
            
            setIsSubmitted(true)
        } catch (error) {
            console.error('Error submitting form:', error)
            setError(`Failed to submit form: ${error instanceof Error ? error.message : 'Unknown error'}`)
            setIsSubmitted(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='px-10 py-10'>
            <header className='flex flex-col items-center justify-center gap-3'>
                <Image src="/shopifypartner.svg" alt="logo" width={184} height={34}/>
                <h1 className='text-[32px] font-bold text-center leading-[40px] tracking-tight'>
                    GET A FREE LOOM REVIEW OF YOUR SHOPIFY STORE
                </h1>
                <p className="text-[#555555] text-[14px] leading-[22px] text-center font-medium">
                    We'll record a <b>FREE</b> 3-minute 
                    Loom video reviewing your Shopify store. Our experienced Shopify 
                    pros will highlight key improvements and optimization tips for better results.
                </p>
            </header>
            <main>
                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3 mt-10'>
                        <div className={`${styles.input} rounded-full w-full lg:w-[50%]`}>
                            <input 
                                onChange={(e) => setUrl(e.target.value)} 
                                className="focus:outline-none rounded-full py-4 px-6 w-full" 
                                type="text" 
                                placeholder="Enter Your Store URL" 
                                disabled={isLoading}
                                required 
                            />
                        </div>
                        <div className={`${styles.input} rounded-full w-full lg:w-[50%]`}>
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="focus:outline-none rounded-full py-4 px-6 w-full" 
                                type="email" 
                                placeholder="Enter Your Email" 
                                disabled={isLoading}
                                required 
                            />
                        </div>
                        <div className='flex flex-col items-center justify-center mt-4'>
                            <button 
                                className={`${styles.button} rounded-full bg-black text-white py-4 px-6 flex items-center justify-center`} 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Get A Free Review'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className='text-center mt-10'>
                        <p className='text-xl font-bold'>Thank you!</p>
                        <p className='mt-2'>You'll get your review within the next 24 hours.</p>
                    </div>
                )}
                <p className='mt-3 text-[#555555] text-[14px] leading-[22px] text-center font-medium'>
                    Powered by <a className='underline font-bold' href="https://myshopdevs.com" target='_blank'> MyShopDevs</a>
                </p>
            </main>
        </section>
    )
}

export default Main