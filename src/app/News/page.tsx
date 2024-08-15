import { FC, useState } from 'react';
import Image from 'next/image';
import bookmark from '@/assets/news/bookmark.png';
import bookmarkfill from '@/assets/news/bookmark-fill.png';
import data from './data.json';
import { useToast } from '@/components/ui/use-toast';

interface NewsItem {
    id: number;
    title: string;
    date: string;
    image: string;
    saved: boolean;
}

const News: FC = () => {

    const { toast } = useToast()
    const [newsArray, setNewsArray] = useState<NewsItem[]>(data.data);

    const handleBookmarkClick = (id: number) => {
        setNewsArray(prevState =>
            prevState.map(item =>
                item.id === id ? { ...item, saved: !item.saved } : item
            )
        );
        toast({
            description: "News has been Saved.",
        })
    };

    return (
        <div className="w-full lg:w-4/12 background-card rounded-lg p-4 max-h-full">
            <h2 className="flex items-center justify-between w-full text-lg font-semibold pb-2">
                Trending News
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 11L6.5 6L1.5 1" stroke="#C3CC5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </h2>

            <div>
                <Image src={require('@/assets/news/banner.png')} alt='Trending' className="w-full rounded-lg" />
                <div className='flex items-start justify-between py-3'>
                    <div>
                        <h3 className="text-sm font-medium">Results And Scores From The Premier League...!</h3>
                        <p className="text-xs text-gray-500">5 Hours Ago</p>
                    </div>
                    <Image
                        src={bookmark}
                        alt='Bookmark'
                        height={24}
                        width={24}
                        onClick={() => handleBookmarkClick(0)} // Assuming this is for the banner, you can handle it differently if needed
                        className="cursor-pointer"
                    />
                </div>
            </div>

            <div className="max-h-[44vh] overflow-y-scroll flex flex-col mt-2 scrollbar-none">
                {newsArray?.map((item: NewsItem, id: number) => {
                    return (
                        <div className="flex items-center gap-3" key={id}>
                            <Image src={require(`@/assets/news/${item.image}`)} alt='Trending' height={35} width={45} className="rounded-lg" />
                            <div className='w-full flex items-start justify-between py-3'>
                                <div>
                                    <h3 className="text-sm font-medium">{item.title}</h3>
                                    <p className="text-xs text-gray-500">{item.date}</p>
                                </div>
                                <Image
                                    src={item.saved ? bookmarkfill : bookmark}
                                    alt='Bookmark'
                                    height={24}
                                    width={24}
                                    onClick={() => handleBookmarkClick(item.id)}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default News;
