import Image from 'next/image';
import { getBasePath } from '@/utils/fileUtils';
import { title } from 'process';

const Introduction = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-lg shadow-sm">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Introduction</h2>
                <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl shadow-sm">
                    <p className="text-base text-gray-700 leading-relaxed mb-4">
                        {/* <strong className="text-blue-600">LiveSQLBench (BIRD-SQL Pro v0.5)</strong>  */}
                        We conduct a <strong className="text-blue-600">moderate-scale contamination-free</strong> (to some extent) evaluation of current large reasoning models with some preliminary findings.
                        We also release <strong className="text-blue-600">ROME</strong>, our evaluation benchmark for vision language models intended to test reasoning from visual clues. To highlight a few:
                    </p>

                    <ul className="space-y-2">
                        {[
                            {
                                desc: (
                                    <>
                                        We observe concerning signals of <strong className="text-blue-600">misaligned thinking and answers</strong>, more or less appearing on all LRMs we have investigated: the actual answer given in the model response may differ from what has been concluded in the reasoning process. It has also been prevalent that the reasoning process implies clear uncertainty but the LRM finally gives a very deterministic answer. Even many of the top-tier LRMs do not seem to know when to abstain.
                                    </>
                                )
                            },
                            {
                                desc: (
                                    <>
                                        Many top-tier LRMs may <strong className="text-blue-600">pretend to have used an external tool or conducted a web search</strong> during reasoning even when they do not have real access, leaving a big question mark on credibility and reliability. We appeal for more transparency in revealing more reasoning details to enable sufficient awareness during usage, especially for conversations involving multimodal reasoning.
                                    </>
                                )
                            },
                            {
                                desc: (
                                    <>
                                        Current open-weight LRMs may tend to show more vulnerability against harmful content prompts or jailbreaking, implying necessity of more careful deployment.
                                    </>
                                )
                            },
                            {
                                desc: (
                                    <>
                                        Some recent findings on LRMs (versus non-thinking counterparts) might be model-specific or data-specific. For instance, we observe degradation in (verifiable) instruction following only on Claude Sonnet 4 and DeepSeek series, but more LRMs show weaknesses in multi-turn settings.
                                    </>
                                )
                            },
                            {
                                desc: (
                                    <>
                                        Text-based inference-time scaling has not yet brought as notable gains on visual reasoning.
                                    </>
                                )
                            },
                            {
                                desc: (
                                    <>
                                        Performance varies too much for generally difficult subsets, which implies a big challenge in conducting statistically reliable evaluation at moderate cost.
                                    </>
                                )
                            },
                            {
                                desc: (
                                    <>
                                        Different model developers might have been prioritizing things differently: GPT-5 series comprehensively show superiority in textual problem solving. On visual questions (our new benchmark named ROME), Gemini 2.5 Pro marginally tops in overall accuracy, o4-mini and GPT-5 strike a better balance with token consumption, while Claude Sonnet 4 is showing relatively the best controlled thinking behaviors overall.
                                    </>
                                )
                            },
                        ].map((item, index) => (
                            <li key={index} className="group flex items-start space-x-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 px-2">
                                <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-200"></span>
                                <div className="flex-1">
                                    {/* <strong className="text-gray-900 text-sm block mb-0.5">{item.title}:</strong> */}
                                    <span className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-200">{item.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <br />

                    {/* Results Overview - Embedded Image */}
                    <p className="text-base text-gray-700 leading-relaxed mb-6">
                        We evaluate 30+ large reasoning models on textual and visual reasoning tasks(4 runs).
                        Scatter plots of mean±std on overall averaged accuracy scores and token consumption for textual (first) and visual (second) tasks.
                    </p>
                    <div className="my-8 -mx-5">
                        <div className="relative w-full h-96 md:h-128 lg:h-160 rounded-lg overflow-hidden border border-gray-200 bg-white">
                            <Image
                                src={`${getBasePath()}/LLM-overall_scatter.png`}
                                alt="Textual Tasks Overall Performance Results"
                                fill
                                className="object-contain p-2"
                                sizes="(max-width: 1024px) 100vw, 100vw"
                            />
                        </div>
                    </div>

                    {/* Results Overview - Embedded Image */}
                    <p className="text-base text-gray-700 leading-relaxed mb-6">
                        Scatter plots of mean±std on overall averaged accuracy scores and token consumption for visual tasks.
                    </p>
                    <div className="my-8 -mx-5">
                        <div className="relative w-full h-96 md:h-128 lg:h-160 rounded-lg overflow-hidden border border-gray-200 bg-white">
                            <Image
                                src={`${getBasePath()}/VLM-overall_scatter.png`}
                                alt="Visual Tasks Overall Performance Results"
                                fill
                                className="object-contain p-2"
                                sizes="(max-width: 1024px) 100vw, 100vw"
                            />
                        </div>
                    </div>

                </div>

                
                {/* <p className="text-base text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
                    <strong className="text-blue-600">LiveSQLBench</strong>'s updating databases, tasks, and HKB support <a href="https://bird-interact.github.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">BIRD-Interact</a>'s conversational and agentic evaluation. <strong className="text-blue-600">BIRD-Interact</strong> evaluates LLMs' text-to-SQL ability in dynamic interactive settings with database and user simulation.
                </p> */}
            </div>
        </div>
    );
}

export default Introduction;