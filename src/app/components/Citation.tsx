import React, { useState } from 'react';
import { Mail, MessageSquare, Copy } from 'lucide-react';

const Citation = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const citations = [
    {
      id: 'lrm-eval',
      title: '',
      content: `@misc{qin2025flageval,
    title={FlagEval Findings Report: A Preliminary Evaluation of Large Reasoning Models on Automatically Verifiable Textual and Visual Questions},
    author={Bowen Qin and Chen Yue and Fang Yin and Hui Wang and JG Yao and Jiakang Liu and Jing-Shu Zheng and Miguel Hu Chen and Richeng Xuan and Shibei Meng and Shiqi Zhou and Teng Dai and Tong-Shuai Ren and Wei Cui and Xi Yang and Xialin Du and Xiaojing Xu and Xue Sun and Xuejing Li and Yaming Liu and Yesheng Liu and Ying Liu and Yonghua Lin and Yu Zhao and Yunduo Zhang and Yuwen Luo and Zheqi He and Zhiyuan He and Zhongyuan Wang},
    year={2025},
    eprint={2509.17177},
    archivePrefix={arXiv},
    primaryClass={cs.CL}
}`
    }
  ];

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="mb-12 w-full">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Citation
        </h2>
        
        <div className="mx-auto mb-6 h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        
        <div className="space-y-6">
          {citations.map((citation) => (
            <div key={citation.id} className="relative">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{citation.title}</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <pre className="max-h-[200px] overflow-y-scroll whitespace-pre-wrap text-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {citation.content}
                </pre>
                <button 
                  className="absolute right-2 top-2 rounded-md bg-gray-200 p-2 hover:bg-gray-300 transition-colors" 
                  title="Copy to clipboard"
                  onClick={() => handleCopy(citation.id, citation.content)}
                >
                  {copied === citation.id ? (
                    <span className="text-green-600 text-sm">Copied!</span>
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <div className="flex flex-col items-start text-sm sm:text-base text-gray-700 sm:flex-row sm:items-center">
            <Mail className="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
            <span>
              For any inquiries or feedback, please contact us at{' '}
              <a href="flageval@baai.ac.cn" className="text-blue-600 hover:underline">
              flageval@baai.ac.cn
              </a>, 
            </span>
          </div>

          {/* <div className="flex flex-col items-start text-sm sm:text-base text-gray-700 sm:flex-row sm:items-center">
            <MessageSquare className="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
            <span>
              Submit feedback to questions in the dataset via{' '}
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeKpLKLd9mOGJy9e4SPyIASa3RioEBfqJ1QukL0BB6LvSEOAQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                this form
              </a>
            </span>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Citation;
