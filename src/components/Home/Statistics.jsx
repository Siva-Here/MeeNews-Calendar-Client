import React from 'react'

const Statistics = () => {
    return (
        <>
            <div className=" h-full w-full dark:bg-gray-700 flex justify-center items-center">

                <div className="max-w-7xl mb-auto px-4 sm:px-6 lg:py-24 lg:px-8">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl dark:text-white">Your
                        statistics Mandal Wise</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
                        <div className="bg-white overflow-hidden drop-shadow-lg sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">No of Ads Uploaded</dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-[#9b59b6] dark:text-indigo-400">1.6M</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden drop-shadow-lg sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Amount Collected</dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-[#9b59b6] dark:text-indigo-400">19.2K
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden drop-shadow-lg sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Available Ads</dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-[#9b59b6] dark:text-indigo-400">4.9K</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden drop-shadow-lg sm:rounded-lg dark:bg-gray-900">
                            <div className="px-4 py-5 sm:p-6 ">
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Completed Ads
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-[#9b59b6] dark:text-indigo-400">166.7K
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Statistics