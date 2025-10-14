'use client'; 

import Image from 'next/image';
import { getBasePath } from '@/utils/fileUtils';
import { useEffect, useState } from 'react';

const PhenomenonCard = ({ item, onImageClick }: { item: any; onImageClick: (src: string) => void }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeExample = item.examples[activeIndex];

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prevIndex) => (prevIndex + 1) % item.examples.length);
    };
    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prevIndex) => (prevIndex - 1 + item.examples.length) % item.examples.length);
    };

    return (
        <div
            onClick={() => onImageClick(activeExample.src)}
            className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
            <figure className="w-full">
                <div className="group relative w-full h-80 sm:h-96 md:h-120 lg:h-144 rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-b from-white to-gray-50 hover:ring-2 hover:ring-indigo-200">
                    <Image
                        src={activeExample.src}
                        alt={activeExample.alt || item.title}
                        fill
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.01]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {item.examples.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                aria-label="Previous image"
                                className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/80 text-gray-700 shadow ring-1 ring-black/10 hover:bg-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={handleNext}
                                aria-label="Next image"
                                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/80 text-gray-700 shadow ring-1 ring-black/10 hover:bg-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </>
                    )}
                </div>
                <figcaption className="mt-2 text-xs text-gray-500 text-center">
                    {activeExample.note}
                </figcaption>
            </figure>

            {item.examples.length > 1 && (
                <div className="mt-3 flex justify-center items-center gap-2 w-full">
                    {item.examples.map((_: any, index: any) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveIndex(index);
                            }}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${activeIndex === index ? 'bg-indigo-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                            aria-label={`Go to example ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Introduction = () => {
    const basePath = getBasePath();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    useEffect(() => {
        if (!selectedImage) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [selectedImage]);

    const phenomena = [
        {
            title: 'Inconsistent Answer',
            tag: 'Incons Ans',
            description: 'The response differs from the conclusion reached during the reasoning process.',
            summary: 'Inconsistent answer in response that diﬀers from what has been concluded in reasoning',
            sketch: `${basePath}/reasoning_analyser/incon.png`,
            examples: [
                {
                    title: 'Inconsistent Answer',
                    src: `${basePath}/misaligned_thinking_and_answering.png`,
                    alt: 'Misaligned thinking and answering',
                    note: 'Generated by Gemini2.5-Flash',
                }
            ]
        },
        {
            title: 'Inconsistent Certainty',
            tag: 'Incons Cert',
            description: 'A discrepancy between the level of certainty expressed in the reasoning and the final answer.',
            summary: 'Inconsistent certainty expressed in reasoning and the actual response',
            sketch: `${basePath}/reasoning_analyser/uncertain.png`,
            examples: [
                // {
                //     title: 'Hallucinated Visual Details',
                //     src: `${basePath}/hallucinated_visual_details.png`,
                //     alt: 'Hallucinated visual details',
                //     note: 'Generated by Gemini2.5-Flash',
                // },
                {
                    title: 'Inconsistent Certainty',
                    src: `${basePath}/uncertainty_in_reasoning.png`,
                    alt: 'Uncertainty in reasoning',
                    note: 'Generated by Claude Sonnet 4',
                }
            ]
        },
        {
            title: 'Hallucinated Web Search',
            tag: 'Hallu. Search',
            description: 'Models may claim to conduct a web search, but no search is actually performed under standard API calls.',
            summary: 'Hallucinated web search, as we find that models may claim but not really conduct a web search during standard API calls with default settings',
            sketch: `${basePath}/reasoning_analyser/hallu_search.png`,
            examples: [
                {
                    title: 'Hallucinated Inverse Image Search',
                    src: `${basePath}/inverse_image_search.png`,
                    alt: 'Inverse image search',
                    note: 'Generated by Gemini2.5-Pro',
                },
                {
                    title: 'Hallucinated Web Search',
                    src: `${basePath}/web_search.png`,
                    alt: 'Hallucinated web search',
                    note: 'Generated by Qwen3-235B-A22B-thinking-2507',
                }
            ]
        },
        {
            title: 'Hallucinated Tool Use',
            tag: 'Hallu. Tools',
            description: 'Models may claim to use specific tools to derive an answer, but those tools are not actually used.',
            summary: 'Hallucinated use of external tools, as we find that models may claim but not really use those tools for a correct or accurate answer',
            sketch: `${basePath}/reasoning_analyser/hall_code.png`,
            examples: [
                {
                    title: 'Hallucinated Tool Use',
                    src: `${basePath}/hallucinated_tool_use.png`,
                    alt: 'Hallucinated tool use',
                    note: 'Generated by Gemini2.5-Pro',
                }
            ]
        }
    ];

    const contributions = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M18.75 21a.75.75 0 00.75-.75V8.813a.75.75 0 00-.325-.625l-7.5-5.25a.75.75 0 00-.85 0l-7.5 5.25a.75.75 0 00-.325.625v11.437c0 .414.336.75.75.75h15zM4.5 8.324L12 3.402l7.5 4.922V19.5H4.5V8.324z" />
                    <path d="M12 10.5a.75.75 0 00-.75.75v6a.75.75 0 001.5 0v-6a.75.75 0 00-.75-.75z" />
                    <path d="M9.75 12.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5z" />
                    <path d="M14.25 12a.75.75 0 00-.75.75v5.25a.75.75 0 001.5 0v-5.25a.75.75 0 00-.75-.75z" />
                </svg>
            ),
            title: 'LLM-assisted Reasoning Analyzer',
            description: 'We release an open-source tool to help researchers inspect and understand the complex reasoning traces produced by LRMs.',
            href: 'https://github.com/jyao11os/llm_reasoning_analyzer',
            cta: 'View on GitHub'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c.236-.468.42-1.02.532-1.604a.75.75 0 01.884-.665 6.47 6.47 0 00-.422-2.463.75.75 0 01.944-.569 8.26 8.26 0 012.232 2.164.75.75 0 01-.64 1.2.503.503 0 00-.39 0 .75.75 0 01-.714.752 5.07 5.07 0 00-1.464.364.75.75 0 01-.936-.645zm-3.232-2.736a.75.75 0 01.574-.949 7.02 7.02 0 012.333 1.25.75.75 0 01-.767 1.159 5.57 5.57 0 00-1.522-.88.75.75 0 01-.618-.58zm-1.88 4.026a.75.75 0 01.948-.567 6.132 6.132 0 012.114 2.242.75.75 0 01-1.118.865 4.86 4.86 0 00-1.488-1.74.75.75 0 01-.456-.8zM15 12a3 3 0 11-6 0 3 3 0 016 0zm-3.82 4.172a.75.75 0 01-.569.949 7.02 7.02 0 01-2.333-1.25.75.75 0 11.767-1.159 5.57 5.57 0 001.522.88.75.75 0 01.618.58zm3.064-2.181a.75.75 0 01.865 1.118 4.856 4.856 0 00-2.242 2.114.75.75 0 01-1.403-.544 6.132 6.132 0 011.78-2.688z" clipRule="evenodd" />
                </svg>
            ),
            title: 'ROME Benchmark',
            description: 'We introduce ROME, a new benchmark for evaluating vision-language models on tasks requiring reasoning from visual evidence.',
            href: 'https://github.com/flageval-baai/ROME-evaluation',
            cta: 'View on GitHub'
        }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 bg-white">
            <div className="space-y-16">
                {/* Introduction Text */}
                <div className="max-w-5xl mx-auto p-6 rounded-3xl border border-gray-200 bg-gradient-to-r from-indigo-50 via-white to-purple-50 shadow-sm ring-1 ring-gray-200/50">
                    <p className="text-base md:text-lg text-gray-700 leading-8 text-center">
                        We present a moderate-scale evaluation of contemporary large reasoning models designed to minimize contamination. Our preliminary analyses reveal characteristic behaviors in model reasoning traces, including <span className="text-indigo-600 font-medium">misaligned thinking and answering</span>, <span className="text-indigo-600 font-medium">hallucinated tool use</span>, <span className="text-indigo-600 font-medium">hallucinated visual details</span>, and <span className="text-indigo-600 font-medium">hallucinated web search</span>.
                    </p>
                </div>

                {/* Key Findings Section */}
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Key Findings: Observed Reasoning Phenomena</h3>
                    <p className="text-center text-gray-600 mb-8">(Click on any image to see a detailed example of the observed behavior.)</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse align-top">
                            <thead>
                                <tr className="bg-white">
                                    <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-1/2">Phenomena</th>
                                    <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-1/2">Examples</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {phenomena.map((item: any) => (
                                    <tr key={item.title} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 align-top">
                                            <div className="flex flex-col items-center justify-start h-full space-y-4 pt-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    <p className="font-semibold text-gray-800 text-center text-xl">{item.title}</p>
                                                    <span className="hidden sm:inline-block text-[10px] uppercase tracking-wide bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">{item.tag}</span>
                                                </div>
                                                <div className="relative w-48 h-48 mx-auto">
                                                    <Image
                                                        src={item.sketch}
                                                        alt={`${item.title} sketch`}
                                                        fill
                                                        className="object-contain"
                                                        sizes="192px"
                                                    />
                                                </div>
                                                <p className="text-sm text-gray-600 text-center max-w-xs pb-6">{item.summary}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <PhenomenonCard item={item} onImageClick={setSelectedImage} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                 {/* Our Contributions Section */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Contributions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {contributions.map((item) => (
                             <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-blue-100 to-purple-200 text-indigo-600 p-3 rounded-full ring-2 ring-white">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800">{item.title}</h4>
                                </div>
                                <p className="text-gray-600 mt-4 flex-grow">{item.description}</p>
                                <a
                                    href={item.href}
                                    target={item.href === '#' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-block text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 duration-300"
                                >
                                    {item.cta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overall Performance Section */}
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Overall Performance Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Textual Tasks */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <p className="text-base text-gray-700 leading-relaxed mb-4">
                                We evaluate more than thirty large reasoning models on textual and visual reasoning tasks (four runs per model). The scatter plots display the mean ± standard deviation of overall accuracy versus token usage for textual (first) and visual (second) tasks.
                            </p>
                            <div
                                onClick={() => setSelectedImage(`${basePath}/LLM-overall_scatter.png`)}
                                className="relative w-full h-96 md:h-[28rem] rounded-xl overflow-hidden border border-gray-200 bg-white block cursor-pointer mt-6 hover:ring-2 hover:ring-indigo-200"
                            >
                                <Image
                                    src={`${basePath}/LLM-overall_scatter.png`}
                                    alt="Textual Tasks Overall Performance Results"
                                    fill
                                    className="object-contain p-2"
                                    sizes="(max-width: 1024px) 100vw, 100vw"
                                />
                            </div>
                            <p className="mt-2 text-center text-sm text-gray-500">Textual tasks: accuracy vs. token usage</p>
                        </div>

                        {/* Visual Tasks */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <p className="text-base text-gray-700 leading-relaxed mb-4">
                                We also release <span className="text-emerald-600 font-medium">ROME</span>, an evaluation benchmark for vision-language models designed to assess reasoning from visual evidence. The figure reports the mean ± standard deviation of overall accuracy versus token usage for visual tasks.
                            </p>
                            <div
                                onClick={() => setSelectedImage(`${basePath}/VLM-overall_scatter.png`)}
                                className="relative w-full h-96 md:h-[28rem] rounded-xl overflow-hidden border border-gray-200 bg-white block cursor-pointer mt-6 hover:ring-2 hover:ring-indigo-200"
                            >
                                <Image
                                    src={`${basePath}/VLM-overall_scatter.png`}
                                    alt="Visual Tasks Overall Performance Results"
                                    fill
                                    className="object-contain p-2"
                                    sizes="(max-width: 1024px) 100vw, 100vw"
                                />
                            </div>
                            <p className="mt-2 text-center text-sm text-gray-500">Visual tasks: accuracy vs. token usage</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal Component */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-5xl w-full h-full max-h-[90vh] transform transition-transform"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog" aria-modal="true"
                    >
                        <Image
                            src={selectedImage}
                            alt="Enlarged view"
                            fill
                            className="object-contain rounded-lg"
                        />
                         <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 text-gray-800 hover:bg-white backdrop-blur-sm"
                            aria-label="Close image view"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Introduction;