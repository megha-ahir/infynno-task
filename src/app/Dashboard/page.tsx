import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import News from '../News/page'
import styles from './Dashboard.module.css'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import moment from 'moment'
import { Calendar } from '@/components/ui/calendar'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'

const Dashboard: FC = () => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [dateLabels, setDateLabels] = useState<DateLabels[]>()
    const [isLoading, setIsLoading] = useState(true);
    const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
    const [liveCount, setLiveCount] = useState(0)

    // Toggle expanded state for a specific item
    const handleToggle = (id: number) => {
        setExpandedItemId(expandedItemId === id ? null : id);
    };

    const fetchMatches = async (date: Date) => {
        const isoDate = moment(date).format('YYYY-MM-DD')
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}football/fixtures/date/${isoDate}?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`).catch(
            (err) => {
                alert(err?.response?.data?.message ?? "Somthing went wrong")
            }
        );
        return response?.data
    };

    const { data: matches, error, isLoading: dataLoading, refetch } = useQuery<ImatchesData>({
        queryKey: ['matches'],
        queryFn: () => fetchMatches(selectedDate),

    });

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    const generateDateRange = (selectedDate: Date) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const result: DateLabels[] = [];

        const today = new Date();

        // Get yesterday's date for comparison
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);


        for (let i = -2; i <= 3; i++) {
            const date = new Date(selectedDate);
            date.setDate(selectedDate.getDate() + i);
            date.setHours(0, 0, 0, 0);

            let dayLabel;
            let dateLabel;

            if (date.getDate() === today.getDate()) {
                dayLabel = "Today";
            } else if (date.getDate() === tomorrow.getDate()) {
                dayLabel = "tomorrow";
            } else if (date.getDate() === yesterday.getDate()) {
                dayLabel = "yesterday";
            } else {
                dayLabel = days[date.getDay()];
            }

            dateLabel = `${date.getDate()} ${months[date.getMonth()]}`;

            result.push({ dayLabel, dateLabel, currentDateISO: date });
        }

        setDateLabels(result);
    };

    useEffect(() => {
        generateDateRange(selectedDate);
    }, [])

    useEffect(() => {
        setIsLoading(dateLabels ? false : true)
    }, [dateLabels])

    useEffect(() => {
        refetch()
    }, [selectedDate])

    const isLive = (startingAt: Date): boolean => {
        const startTime = moment(startingAt);
        const endTime = startTime.clone().add(90, 'minutes');
        const currentTime = moment();
        return currentTime.isBetween(startTime, endTime);
    };

    useEffect(() => {
        let count = 0;
        matches?.data?.forEach((item) => {
            if (isLive(item.starting_at as Date)) {
                count++;
            }
        });
        setLiveCount(count);
    }, [matches]);

    return (
        <div className={`${styles.main} w-100 flex flex-col lg:flex-row gap-3 lg:mx-3 lg:mt-3`}>
            <div className={`${styles.dashboardContiner} mh-full flex flex-col flex-1 gap-3 overflow-scroll`}>
                <div className="bg-white  rounded-lg">
                    <Image src={require('@/assets/dashboard/Banner.png')} alt='Banner' className="w-full rounded-t-lg" />
                </div>
                <div className="bg-white rounded-lg p-3 background-card h-full">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                            <div className="tab flex items-center px-4 py-2 text-theme rounded-xl space-x-2">
                                <Image src={require('@/assets/icons/Ellipse.png')} alt='Banner' className="mr-1" />Live{" "}<span className='text-white ps-1'> ({liveCount})</span></div>

                            <div className={`${styles.searchContainer} tab w-full rounded-xl`}>
                                <Image
                                    src={require('@/assets/icons/search.png')}
                                    alt="Search"
                                    width={22}
                                    height={22}
                                    className={styles.searchIcon}
                                />
                                <Input
                                    type="text"
                                    placeholder="Search All matchesa"
                                    className="tab border-none ps-10"
                                />
                            </div>
                            <Select  >
                                <SelectTrigger className="w-[180px] tab rounded-xl">
                                    <SelectValue placeholder="All Matches" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Option 1</SelectItem>
                                    <SelectItem value="dark">Option 2</SelectItem>
                                    <SelectItem value="system">Option 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid lg:flex  text-center  gap-2 text-sm ">
                            <div className='flex flex-1 text-center mw-full gap-2  overflow-x-scroll scrollbar-none '>
                                {isLoading ? (
                                    // Skeleton loader for the entire div
                                    <div className="flex w-full gap-2 overflow-x-scroll scrollbar-none">
                                        {Array(5).fill(null).map((_, index) => (
                                            <div
                                                key={index}
                                                className="tab flex-1 min-w-24 px-2 py-1 cursor-pointer rounded-xl animate-pulse bg-gray-300"
                                            >
                                                <div className="h-3 bg-gray-400 rounded w-3/4 mb-2"></div>
                                                <div className="h-3 bg-gray-400 rounded w-1/2"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Actual content when not loading
                                    dateLabels?.map((item: any, index: number) => (
                                        <div
                                            key={index}
                                            className={`${selectedDate?.getDate() === item.currentDateISO.getDate() ? "border-theme" : ""
                                                } tab flex-1 min-w-24 px-2 py-1 cursor-pointer rounded-xl`}
                                            onClick={() => handleDateClick(item.currentDateISO)}
                                        >
                                            <p>{item.dayLabel}</p>
                                            <p>{item.dateLabel}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                            <Popover>
                                <PopoverTrigger>
                                    <div className="tab flex min-w-max items-center px-2 py-1 cursor-pointer rounded-xl border-theme justify-center"
                                    >
                                        <Image src={require('@/assets/icons/calendar.png')} height={28} width={28} alt='Calender' />
                                        <p className='grid text-start ps-2'>
                                            View <span>Calendar</span></p>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <PopoverClose>
                                        <Calendar
                                            mode="single"
                                            selected={new Date()}
                                            onSelect={(date) => {
                                                setSelectedDate(date as Date ?? new Date());
                                                generateDateRange(date as Date);
                                            }}
                                        /></PopoverClose>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-none">
                            <div className="rounded-lg overflow-hidden">
                                <div className="bg-black text-white flex items-center justify-between lg:justify-start p-3 py-2">
                                    <div className='flex w-50 lg:w-2/5 items-center gap-2'>
                                        <Image className='rounded-full' src={require('@/assets/dashboard/header-image.png')} height={28} width={28} alt='Calender' />
                                        <h3 className='text-sm'>World-FIFA Women's World Cup</h3>
                                    </div>
                                    <p>(quarter finals)</p>
                                </div>
                                {matches?.data?.map((item, id) => (
                                    <div className="flex p-3 tab odd:bg-neutral-800" key={id}>
                                        {dataLoading ? (
                                            <>
                                                <div className='w-32'>
                                                    <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4"></div>
                                                </div>
                                                <div className='w-full flex text-center justify-center'>
                                                    <div className="animate-pulse h-6 bg-gray-300 rounded w-1/2"></div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-full">
                                                    <div
                                                        className='flex items-center cursor-pointer mb-2'
                                                        onClick={() => handleToggle(id)}
                                                    >
                                                        {/* {isLive("2024-08-15 21:57:00") ? <span className='text-theme'>Live</span> : moment(item.starting_at).format('HH:mm')} */}
                                                        {isLive(item.starting_at as Date) ? <span className='text-theme'>Live</span> : moment(item.starting_at).format('HH:mm')}

                                                        <div className='w-full flex text-center justify-center'>
                                                            <h3>{item.name}</h3>
                                                        </div>
                                                        <div className='ml-2'>
                                                            {expandedItemId === id ? (
                                                                <span className="text-white">-</span> // Minus sign when expanded
                                                            ) : (
                                                                <span className="text-white">+</span> // Plus sign when collapsed
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${expandedItemId === id ? 'max-h-96' : 'max-h-0'}`}
                                                    >
                                                        <div className='px-6 py-3 text-gray-600'>
                                                            <Separator />
                                                        </div>
                                                        <div className="odd:bg-neutral-600">
                                                            <h3 className="text-center ">Result: {" "}<span className='text-green-600'>{item.result_info ? item.result_info : "panding..."}</span> </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}

                                {!matches &&
                                    <>
                                        <div className='w-full flex p-3 tab odd:bg-neutral-800 justify-center'>
                                            No Match Found
                                        </div>
                                    </>}

                            </div>
                            {matches?.message && <h4 className='tab h-full rounded-lg p-3 px-7 text-alert text-center text-theme'> {matches?.message}</h4>}

                        </div>
                    </div>
                </div>
            </div>
            <News />

        </div >
    )
}

export default Dashboard
