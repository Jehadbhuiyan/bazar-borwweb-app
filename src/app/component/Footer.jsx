
import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className='flex flex-col mt-4 md:flex-row justify-evenly items-center gap-2 md:gap-4 bg-base-100 text-gray-400 text-center px-4 py-3'>
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </footer>
    );
};

export default Footer;
