import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { getBasePath } from '@/utils/fileUtils';

interface ModelResult {
  name: string;
  completionRate: number;
  standardDeviation: number;
  logo: string;
  fullName: string;
  category: string;
  organization: string;
  link: string;
  hasReasoning: boolean;
}

type MainCategory = 'Visual Tasks' | 'Text Tasks';
type RomeSubcategory = 'overall' | 'Academic' | 'NYT connections' | 'NPR word puzzles' | 'Deciphering' | 'LeetCode' | 'Instruction Following' | 'Multi-Turn instruction following' | 'Long-context queries' | 'Factuality and abstention';
type RomeVSubcategory = 'overall' | 'academic' | 'diagrams' | 'puzzles-game' | 'memes' | 'geolocation' | 'recognition' | 'multi-image' | 'spatial';

const Leaderboard = () => {
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategory>('Text Tasks');
  const [activeRomeTab, setActiveRomeTab] = useState<RomeSubcategory>('Academic');
  const [activeRomeVTab, setActiveRomeVTab] = useState<RomeVSubcategory>('overall');

  // Helper function to get model information for ROME models
  const getRomeModelInfo = (modelName: string) => {
    const modelMap: Record<string, { fullName: string, organization: string, logo: string, hasReasoning: boolean, link: string }> = {
      'gpt-oss-120b':{
        fullName: 'GPT-OSS 120B',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'qwen3-next-80b-a3b-instruct':{
        fullName: 'Qwen3 Next 80B A3B Instruct',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'qwen3-next-80b-a3b-thinking':{
        fullName: 'Qwen3 Next 80B A3B Thinking',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'DeepSeek-Chat': {
        fullName: 'DeepSeek Chat',
        organization: 'DeepSeek',
        logo: `${getBasePath()}/model_logos/deepseek_logo.png`,
        hasReasoning: true,
        link: 'https://deepseek.com'
      },
      'DeepSeek-R1': {
        fullName: 'DeepSeek R1',
        organization: 'DeepSeek',
        logo: `${getBasePath()}/model_logos/deepseek_logo.png`,
        hasReasoning: true,
        link: 'https://deepseek.com'
      },
      'Kimi-k2': {
        fullName: 'Kimi-k2',
        organization: 'Moonshot AI',
        logo: `${getBasePath()}/model_logos/kimi-logo.png`,
        hasReasoning: true,
        link: 'https://kimi.moonshot.cn'
      },
      'Phi-4-reasoning-plus': {
        fullName: 'Phi-4 Reasoning Plus',
        organization: 'Microsoft',
        logo: `${getBasePath()}/model_logos/ms.png`,
        hasReasoning: true,
        link: 'https://microsoft.com'
      },
      'claude-sonnet-4': {
        fullName: 'Claude Sonnet 4',
        organization: 'Anthropic',
        logo: `${getBasePath()}/model_logos/claude_logo.png`,
        hasReasoning: true,
        link: 'https://www.anthropic.com'
      },
      'claude-sonnet-4 (no thinking)': {
        fullName: 'Claude Sonnet 4 (No Thinking)',
        organization: 'Anthropic',
        logo: `${getBasePath()}/model_logos/claude_logo.png`,
        hasReasoning: true,
        link: 'https://www.anthropic.com'
      },
      'gemini-2.5-flash': {
        fullName: 'Gemini 2.5 Flash',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gemini-2.5-pro': {
        fullName: 'Gemini 2.5 Pro',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gpt-4.1': {
        fullName: 'GPT-4.1',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-4.1-mini': {
        fullName: 'GPT-4.1 Mini',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-high': {
        fullName: 'GPT-5 (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-low': {
        fullName: 'GPT-5 (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-medium': {
        fullName: 'GPT-5 (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-minimal': {
        fullName: 'GPT-5 (Minimal)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-high': {
        fullName: 'GPT-5 Mini (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-low': {
        fullName: 'GPT-5 Mini (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-medium': {
        fullName: 'GPT-5 Mini (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-minimal': {
        fullName: 'GPT-5 Mini (Minimal)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'grok-3-mini-beta': {
        fullName: 'Grok-3 Mini Beta',
        organization: 'xAI',
        logo: `${getBasePath()}/model_logos/grok.png`,
        hasReasoning: true,
        link: 'https://x.ai'
      },
      'magistral-medium-2506-thinking': {
        fullName: 'Magistral Medium-thinking',
        organization: 'Mistral AI',
        logo: `${getBasePath()}/model_logos/mistral.png`,
        hasReasoning: true,
        link: 'https://mistral.ai'
      },
      'o3-2025-04-16': {
        fullName: 'o3',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o4-mini-2025-04-16': {
        fullName: 'o4-mini',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'qwen3-235b-a22b': {
        fullName: 'Qwen3-235B',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'qwen3-235b-a22b-thinking': {
        fullName: 'Qwen3-235B-thinking',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'qwen3-235b-a22b-instruct-2507': {
        fullName: 'Qwen3-235B Instruct(2507)',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'qwen3-235b-a22b-thinking-2507': {
        fullName: 'Qwen3-235B Thinking(2507)',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      // Added from text_accuracy.json (missing entries)
      'DeepSeek-V3-0324': {
        fullName: 'DeepSeek V3 (0324)',
        organization: 'DeepSeek',
        logo: `${getBasePath()}/model_logos/deepseek_logo.png`,
        hasReasoning: true,
        link: 'https://deepseek.com'
      },
      'DeepSeek-V3.1-Think': {
        fullName: 'DeepSeek V3.1 Think',
        organization: 'DeepSeek',
        logo: `${getBasePath()}/model_logos/deepseek_logo.png`,
        hasReasoning: true,
        link: 'https://deepseek.com'
      },
      'DeepSeek-V3.1': {
        fullName: 'DeepSeek V3.1',
        organization: 'DeepSeek',
        logo: `${getBasePath()}/model_logos/deepseek_logo.png`,
        hasReasoning: true,
        link: 'https://deepseek.com'
      },
      'gemini-2.5-flash-thinking': {
        fullName: 'Gemini 2.5 Flash (Thinking)',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gpt-4.1-2025-04-14': {
        fullName: 'GPT-4.1',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-4.1-mini-2025-04-14': {
        fullName: 'GPT-4.1 Mini',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'claude-sonnet-4-thinking': {
        fullName: 'Claude Sonnet 4 (Thinking)',
        organization: 'Anthropic',
        logo: `${getBasePath()}/model_logos/claude_logo.png`,
        hasReasoning: true,
        link: 'https://www.anthropic.com'
      },
      'qwen3-235b-a22b (thinking)': {
        fullName: 'Qwen3-235B-a22b-Thinking',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      }
    };

    return modelMap[modelName] || {
      fullName: modelName,
      organization: 'Unknown',
      logo: `${getBasePath()}/model_logos/openai.png`,
      hasReasoning: true,
      link: '#'
    };
  };

  // Parse text_accuracy.json (Text Tasks) into ROME buckets
  const createEmptyRomeBuckets = (): Record<RomeSubcategory, ModelResult[]> => ({
    overall: [],
    'Academic': [],
    'NYT connections': [],
    'NPR word puzzles': [],
    'Deciphering': [],
    'LeetCode': [],
    'Instruction Following': [],
    'Multi-Turn instruction following': [],
    'Long-context queries': [],
    'Factuality and abstention': []
  });

  const [romeData, setRomeData] = useState<Record<RomeSubcategory, ModelResult[]>>(createEmptyRomeBuckets());

  useEffect(() => {
    const loadTextResultsFromJson = async () => {
      try {
        const res = await fetch(`${getBasePath()}/data/rome/text_accuracy_new.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const buckets = createEmptyRomeBuckets();
        const models = data?.models || {};

        Object.keys(models).forEach((modelName) => {
          const m = models[modelName];
          const info = getRomeModelInfo(modelName);

          // overall from mean/std
          if (m?.accuracy?.mean != null && m?.accuracy?.std != null) {
            buckets.overall.push({
              name: modelName,
              completionRate: Number(m.accuracy.mean),
              standardDeviation: Number(m.accuracy.std),
              logo: info.logo,
              fullName: info.fullName,
              category: 'overall',
              organization: info.organization,
              link: info.link,
              hasReasoning: info.hasReasoning
            });
          }

          const per = m?.per_benchmark || {};
          const mapping: Record<string, RomeSubcategory> = {
            // Verbose keys (if any appear in JSON)
            'Academic': 'Academic',
            'NYT connections': 'NYT connections',
            'NPR word puzzles': 'NPR word puzzles',
            'Deciphering': 'Deciphering',
            'LeetCode': 'LeetCode',
            'Instruction Following': 'Instruction Following',
            'Multi-Turn instruction following': 'Multi-Turn instruction following',
            'Long-context queries': 'Long-context queries',
            'Factuality': 'Factuality and abstention',
            'Factuality and abstention': 'Factuality and abstention',
            // Canonical short keys from text_accuracy.json metadata
            'cipherbench': 'Deciphering',
            'academic': 'Academic',
            'npr': 'NPR word puzzles',
            'connections': 'NYT connections',
            'ifeval': 'Instruction Following',
            'mt': 'Multi-Turn instruction following',
            'longctx': 'Long-context queries',
            'factuality': 'Factuality and abstention',
            'leetcode': 'LeetCode'
          };

          Object.keys(mapping).forEach((key) => {
            const bench = per[key];
            if (bench && bench.accuracy != null) {
              const std = bench.accuracy_std != null ? Number(bench.accuracy_std) : 1.5;
              const category = mapping[key];
              buckets[category].push({
                name: modelName,
                completionRate: Number(bench.accuracy),
                standardDeviation: std,
                logo: info.logo,
                fullName: info.fullName,
                category,
                organization: info.organization,
                link: info.link,
                hasReasoning: info.hasReasoning
              });
            }
          });
        });

        setRomeData(buckets);
      } catch (err) {
        setRomeData(createEmptyRomeBuckets());
      }
    };

    loadTextResultsFromJson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  // Helper function to parse accuracy string (e.g., "61.1 ± 0.6")
  const parseAccuracy = (accuracyStr: string): { accuracy: number, std: number } => {
    const parts = accuracyStr.split(' ± ');
    return {
      accuracy: parseFloat(parts[0]),
      std: parseFloat(parts[1])
    };
  };

  // Helper function to get model information based on model name
  const getModelInfo = (modelName: string) => {
    const modelMap: Record<string, { fullName: string, organization: string, logo: string, hasReasoning: boolean, link: string }> = {
      'gemini-2.5-pro': {
        fullName: 'Gemini 2.5 Pro',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gemini-2.5-flash-thinking': {
        fullName: 'Gemini 2.5 Flash (Thinking)',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gemini-2.5-flash': {
        fullName: 'Gemini 2.5 Flash',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gpt-5-high': {
        fullName: 'GPT-5 (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-medium': {
        fullName: 'GPT-5 (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-low': {
        fullName: 'GPT-5 (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-minimal': {
        fullName: 'GPT-5 (Minimal)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-medium': {
        fullName: 'GPT-5 Mini (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o3-high': {
        fullName: 'o3 (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o3-medium': {
        fullName: 'o3 (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o3-low': {
        fullName: 'o3 (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o4-mini-high': {
        fullName: 'o4-mini (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o4-mini-medium': {
        fullName: 'o4-mini (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o4-mini-low': {
        fullName: 'o4-mini (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'claude-sonnet-4-thinking': {
        fullName: 'Claude Sonnet 4 (Thinking)',
        organization: 'Anthropic',
        logo: `${getBasePath()}/model_logos/claude_logo.png`,
        hasReasoning: true,
        link: 'https://www.anthropic.com'
      },
      'claude-sonnet-4': {
        fullName: 'Claude Sonnet 4',
        organization: 'Anthropic',
        logo: `${getBasePath()}/model_logos/claude_logo.png`,
        hasReasoning: true,
        link: 'https://www.anthropic.com'
      },
      'gpt-4-1': {
        fullName: 'GPT-4.1',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'QVQ-72B': {
        fullName: 'QVQ-72B',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'Qwen2.5-VL-72B': {
        fullName: 'Qwen2.5-VL-72B',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'Qwen2.5-VL-7B': {
        fullName: 'Qwen2.5-VL-7B',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'llama-4-maverick': {
        fullName: 'Llama 4 Maverick',
        organization: 'Meta',
        logo: `${getBasePath()}/model_logos/meta.png`,
        hasReasoning: true,
        link: 'https://llama.meta.com'
      },
      'mistral-medium-3': {
        fullName: 'Mistral Medium 3',
        organization: 'Mistral AI',
        logo: `${getBasePath()}/model_logos/mistral.png`,
        hasReasoning: true,
        link: 'https://mistral.ai'
      },
      'mistral-medium-3-1': {
        fullName: 'Mistral Medium 3.1',
        organization: 'Mistral AI',
        logo: `${getBasePath()}/model_logos/mistral.png`,
        hasReasoning: true,
        link: 'https://mistral.ai'
      },
      // New visual models from updated CSV
      'qwen3-vl-235b-a22b-instruct': {
        fullName: 'Qwen3-VL-235B Instruct',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'qwen3-vl-235b-a22b-thinking': {
        fullName: 'Qwen3-VL-235B Thinking',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'qwen-vl-max-2025-08-13': {
        fullName: 'Qwen VL Max (2025-08-13)',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'seed-1-6-vision': {
        fullName: 'Seed 1.6 Vision',
        organization: 'Bytedance',
        logo: `${getBasePath()}/model_logos/seed.png`,
        hasReasoning: true,
        link: '#'
      },
      'ernie-4.5-vl-424b-a47b': {
        fullName: 'ERNIE 4.5-VL',
        organization: 'Baidu',
        logo: `${getBasePath()}/model_logos/ernie.png`,
        hasReasoning: true,
        link: '#'
      },
      'glm-4.5v': {
        fullName: 'GLM-4.5V',
        organization: 'Zhipu AI',
        logo: `${getBasePath()}/model_logos/zhipu.png`,
        hasReasoning: true,
        link: '#'
      },
      'hunyuan-t1-vision-20250619': {
        fullName: 'Hunyuan T1 Vision (2025-06-19)',
        organization: 'Tencent',
        logo: `${getBasePath()}/model_logos/hunyuan.png`,
        hasReasoning: true,
        link: '#'
      },
      'step-3':{
        fullName: 'Step 3',
        organization: 'StepFun',
        logo: `${getBasePath()}/model_logos/step.png`,
        hasReasoning: true,
        link: '#'
      }
    };

    return modelMap[modelName] || {
      fullName: modelName,
      organization: 'Unknown',
      logo: `${getBasePath()}/model_logos/openai.png`,
      hasReasoning: true,
      link: '#'
    };
  };

  // Parse CSV text and create Rome-V data buckets
  const parseCSVToRomeVData = (csvText: string): Record<RomeVSubcategory, ModelResult[]> => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const models = lines.slice(1);

    const categoryMapping: Record<string, RomeVSubcategory> = {
      'Overall': 'overall',
      'Academic': 'academic', 
      'Diagrams': 'diagrams',
      'Puzzles Games': 'puzzles-game',
      'Memes': 'memes',
      'Geo': 'geolocation',
      'Recognition': 'recognition',
      'Multi': 'multi-image',
      'Spatial': 'spatial'
    };

    const result: Record<RomeVSubcategory, ModelResult[]> = {
      overall: [],
      academic: [],
      diagrams: [],
      'puzzles-game': [],
      memes: [],
      geolocation: [],
      recognition: [],
      'multi-image': [],
      spatial: []
    };

    // Process each model
    models.forEach(modelLine => {
      const values = modelLine.split(',');
      const modelName = values[0];
      const modelInfo = getModelInfo(modelName);

      // Process each category
      headers.slice(1).forEach((header, headerIndex) => {
        const categoryKey = categoryMapping[header];
        if (categoryKey && values[headerIndex + 1]) {
          const { accuracy, std } = parseAccuracy(values[headerIndex + 1]);
          
          result[categoryKey].push({
            name: modelName,
            completionRate: accuracy,
            standardDeviation: std,
            logo: modelInfo.logo,
            fullName: modelInfo.fullName,
            category: categoryKey,
            organization: modelInfo.organization,
            link: modelInfo.link,
            hasReasoning: modelInfo.hasReasoning
          });
        }
      });
    });

    return result;
  };

  // Create empty Rome-V buckets
  const createEmptyRomeVBuckets = (): Record<RomeVSubcategory, ModelResult[]> => ({
    overall: [],
    academic: [],
    diagrams: [],
    'puzzles-game': [],
    memes: [],
    geolocation: [],
    recognition: [],
    'multi-image': [],
    spatial: []
  });

  // Rome-V dataset state - Visual reasoning tasks
  const [romeVData, setRomeVData] = useState<Record<RomeVSubcategory, ModelResult[]>>(createEmptyRomeVBuckets());

  useEffect(() => {
    const loadVisualResultsFromCsv = async () => {
      try {
        const res = await fetch(`${getBasePath()}/data/rome/accuracy_table.csv`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const csvText = await res.text();
        const parsed = parseCSVToRomeVData(csvText);
        setRomeVData(parsed);
      } catch (err) {
        setRomeVData(createEmptyRomeVBuckets());
      }
    };
    loadVisualResultsFromCsv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 判断两个模型是否应该并列
  const shouldTie = (model1: ModelResult, model2: ModelResult) => {
    const acc1 = model1.completionRate;
    const std1 = model1.standardDeviation;
    const acc2 = model2.completionRate;
    const std2 = model2.standardDeviation;
    
    // accuracy_2在accuracy_1-std，accuracy_1+std范围内
    const condition1 = acc2 >= (acc1 - std1) && acc2 <= (acc1 + std1);
    // accuracy_1在accuracy_2-std，accuracy_2+std范围内
    const condition2 = acc1 >= (acc2 - std2) && acc1 <= (acc2 + std2);
    
    return condition1 && condition2;
  };

  // 将模型按并列规则分组并分配排名
  const sortAndRankModels = (models: ModelResult[]) => {
    // 首先按accuracy排序
    const sorted = [...models].sort((a, b) => b.completionRate - a.completionRate);
    
    if (sorted.length === 0) return [];
    
    const groups: ModelResult[][] = [];
    let currentGroup = [sorted[0]];
    
    for (let i = 1; i < sorted.length; i++) {
      const currentModel = sorted[i];
      
      // 检查当前模型是否与当前组中的所有模型都满足并列条件
      const canJoinGroup = currentGroup.every(groupModel => shouldTie(currentModel, groupModel));
      
      if (canJoinGroup) {
        // 还需要检查加入这个模型后，组内所有模型是否仍然满足两两并列的条件
        const potentialGroup = [...currentGroup, currentModel];
        const allTied = potentialGroup.every((model1, index1) => 
          potentialGroup.every((model2, index2) => 
            index1 === index2 || shouldTie(model1, model2)
          )
        );
        
        if (allTied) {
          currentGroup.push(currentModel);
        } else {
          groups.push(currentGroup);
          currentGroup = [currentModel];
        }
      } else {
        groups.push(currentGroup);
        currentGroup = [currentModel];
      }
    }
    
    groups.push(currentGroup);
    
    // 分配排名
    const rankedModels: (ModelResult & { rank: number })[] = [];
    let currentRank = 1;
    
    for (const group of groups) {
      for (const model of group) {
        rankedModels.push({ ...model, rank: currentRank });
      }
      currentRank += group.length;
    }
    
    return rankedModels;
  };

  // Get organization color
  const getOrganizationColor = (organization: string) => {
    const colors = {
      'OpenAI': 'bg-blue-100 text-blue-700 border-blue-200',
      'Anthropic': 'bg-orange-100 text-orange-700 border-orange-200',
      'Google': 'bg-green-100 text-green-700 border-green-200',
      'DeepSeek': 'bg-purple-100 text-purple-700 border-purple-200',
      'Qwen': 'bg-teal-100 text-teal-700 border-teal-200',
      'Meta': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Mistral AI': 'bg-pink-100 text-pink-700 border-pink-200',
      'Moonshot AI': 'bg-red-100 text-red-700 border-red-200',
      'Microsoft': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'xAI': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'Bytedance': 'bg-blue-100 text-blue-700 border-blue-200',
      'Baidu': 'bg-purple-100 text-purple-700 border-purple-200',
      'Zhipu AI': 'bg-teal-100 text-teal-700 border-teal-200',
      'Tencent': 'bg-red-100 text-red-700 border-purple-200',
      'StepFun': 'bg-yellow-100 text-yellow-700 border-blue-200'
    };
    return colors[organization as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Get current data based on active category and tab
  const getCurrentData = () => {
    if (activeMainCategory === 'Text Tasks') {
      // For LeetCode, show "See our technical report for more details."
      if (activeRomeTab === 'LeetCode') {
        return [];
      }
      return sortAndRankModels(romeData[activeRomeTab]);
    } else {
      return sortAndRankModels(romeVData[activeRomeVTab]);
    }
  };

  const currentData = getCurrentData();

  return (
    <section className="w-full mb-12">
      <div className="max-w-7xl mx-auto px-4 py-6 bg-white rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {/* {activeMainCategory === 'rome' ? 'ROME' : 'ROME-V'} Leaderboard */}
            Detailed Results
          </h2>
          <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
        
        {/* Main Category Selection */}
        <div className="mb-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveMainCategory('Text Tasks')}
              className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
                activeMainCategory === 'Text Tasks'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Text Tasks
            </button>
            <button
              onClick={() => setActiveMainCategory('Visual Tasks')}
              className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
                activeMainCategory === 'Visual Tasks'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Visual Tasks
            </button>
          </div>
        </div>

        {/* Task Types Illustration */}
        <div className="mb-8">
          {/* <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
            {activeMainCategory === 'rome' ? 'Text-based Reasoning Tasks' : 'Visual Reasoning Tasks'}
          </h3> */}
          {activeMainCategory === 'Text Tasks' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-7xl mx-auto">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-1">Course questions</h4>
                <p className="text-xs text-gray-700">College-level questions from course and lecture materials across STEM, humanities, and social sciences.</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-1">NYT Connections</h4>
                <p className="text-xs text-gray-700">The Connections game by The New York Times.</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-1">NPR-style puzzles</h4>
                <p className="text-xs text-gray-700">New puzzles emulating the style of the NPR Sunday Puzzle.</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-1">Deciphering</h4>
                <p className="text-xs text-gray-700">Decipher text containing encrypted or hidden information.</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-1">LeetCode</h4>
                <p className="text-xs text-gray-700">Coding problems from recent weekly and biweekly LeetCode contests.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-1">Instruction following</h4>
                <p className="text-xs text-gray-700">Generated, verifiable instructions with few-shot examples from IFEval.</p>
              </div>
              <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                <h4 className="font-medium text-cyan-900 mb-1">Multi-turn instructions</h4>
                <p className="text-xs text-gray-700">Includes reminders and triggers, role-playing, and explaining concepts in prescribed ways.</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                <h4 className="font-medium text-pink-900 mb-1">Long-context queries</h4>
                <p className="text-xs text-gray-700">Manually written questions requiring understanding of long arXiv papers (LaTeX source).</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-indigo-900 mb-1">Factuality and abstention</h4>
                <p className="text-xs text-gray-700">Long-tailed knowledge that is very infrequent in web-scale corpora.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <h4 className="font-medium text-emerald-900 mb-1">Course problems</h4>
                <p className="text-xs text-gray-700">Questions from college courses.</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                <h4 className="font-medium text-pink-900 mb-1">Diagrams</h4>
                <p className="text-xs text-gray-700">Charts and figures from recent scientific papers, reports, and blog posts.</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-indigo-900 mb-1">Puzzles & Games</h4>
                <p className="text-xs text-gray-700">Raven's tests, rebus puzzles, and gameplay.</p>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                <h4 className="font-medium text-teal-900 mb-1">Memes</h4>
                <p className="text-xs text-gray-700">Recreated memes.</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-900 mb-1">Geolocation</h4>
                <p className="text-xs text-gray-700">Geolocation inference.</p>
              </div>
              <div className="bg-rose-50 p-3 rounded-lg border border-rose-200">
                <h4 className="font-medium text-rose-900 mb-1">Recognition</h4>
                <p className="text-xs text-gray-700">Fine-grained recognition.</p>
              </div>
              <div className="bg-violet-50 p-3 rounded-lg border border-violet-200">
                <h4 className="font-medium text-violet-900 mb-1">Multi-image</h4>
                <p className="text-xs text-gray-700">Find-the-difference and video frame reordering.</p>
              </div>
              <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                <h4 className="font-medium text-cyan-900 mb-1">Spatial</h4>
                <p className="text-xs text-gray-700">Relative positions, depths/distances, height, etc.</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-8">
          {/* <div className="w-full">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              <span className="font-semibold">Metric: Success Rate.</span> Defined by the ratio of the number of tasks passing the test cases to the total number of tasks.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2">Evaluation Methodology</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>SELECT queries: Compare execution results with golden SQL outputs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Management SQLs: Verify through comprehensive test cases</span>
                </li>
              </ul>
            </div>
          </div> */}
          
          <div className="w-full">
            {/* <div className="text-xs text-gray-600 text-right mb-2">
              Last Updated: 06/09/2025
            </div> */}

            {/* Subcategory Tabs */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {activeMainCategory === 'Visual Tasks' ? (
                [
                  { id: 'overall', label: 'Overall', colors: 'bg-gray-100 text-gray-700 border-gray-200' },
                  { id: 'academic', label: 'Academic', colors: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                  { id: 'diagrams', label: 'Diagrams', colors: 'bg-pink-100 text-pink-700 border-pink-200' },
                  { id: 'puzzles-game', label: 'Puzzles & Games', colors: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
                  { id: 'memes', label: 'Memes', colors: 'bg-teal-100 text-teal-700 border-teal-200' },
                  { id: 'geolocation', label: 'Geolocation', colors: 'bg-amber-100 text-amber-700 border-amber-200' },
                  { id: 'recognition', label: 'Recognition', colors: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
                  { id: 'multi-image', label: 'Multi-image', colors: 'bg-violet-100 text-violet-700 border-violet-200' },
                  { id: 'spatial', label: 'Spatial', colors: 'bg-rose-100 text-rose-700 border-rose-200' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRomeVTab(tab.id as RomeVSubcategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      activeRomeVTab === tab.id
                        ? tab.colors
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))
              ) : (
                [
                  { id: 'Academic', label: 'Academic', colors: 'bg-green-100 text-green-700 border-green-200' },
                  { id: 'NYT connections', label: 'NYT connections', colors: 'bg-green-100 text-green-700 border-green-200' },
                  { id: 'NPR word puzzles', label: 'NPR word puzzles', colors: 'bg-green-100 text-green-700 border-green-200' },
                  { id: 'Deciphering', label: 'Deciphering', colors: 'bg-blue-100 text-blue-700 border-blue-200' },
                  { id: 'LeetCode', label: 'LeetCode', colors: 'bg-purple-100 text-purple-700 border-purple-200' },
                  { id: 'Instruction Following', label: 'Instruction Following', colors: 'bg-green-100 text-green-700 border-green-200' },
                  { id: 'Multi-Turn instruction following', label: 'Multi-Turn instruction following', colors: 'bg-green-100 text-green-700 border-green-200' },
                  { id: 'Long-context queries', label: 'Long-context queries', colors: 'bg-green-100 text-green-700 border-green-200' },
                  { id: 'Factuality and abstention', label: 'Factuality and abstention', colors: 'bg-purple-100 text-purple-700 border-purple-200' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRomeTab(tab.id as RomeSubcategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      activeRomeTab === tab.id
                        ? tab.colors
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))
              )}
            </div>
            <p className="mt-4 text-sm mb-4 text-gray-600">
              <span className="font-medium">Evaluation Metrics:</span> Overall scores are not available for textual tasks due to the use of different evaluation metrics across benchmarks. Visual task accuracy is computed using multiple types of evaluators—please refer to our GitHub repository for details.
            </p>

            <div className="relative w-full overflow-auto rounded-lg border border-gray-200 shadow-sm">
              
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="h-10 px-4 text-center align-middle font-medium text-gray-600">
                      Rank
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-gray-600">
                      Model
                    </th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-gray-600">
                      Organization
                    </th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-gray-600">
                      Accuracy ± Std (avg@4) <ArrowDown className="inline h-4 w-4 text-gray-400" />
                    </th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-gray-600">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((model, index) => (
                      <tr 
                        key={model.name}
                        className={`border-b hover:bg-gray-50 transition-colors ${
                          model.rank === 1 ? 'bg-blue-50' : 
                          activeMainCategory === 'Text Tasks' ? 'bg-blue-50/30' : 'bg-purple-50/30'
                        }`}
                      >
                        <td className="py-2 px-4 align-middle text-center">
                          {model.completionRate > 0 ? (
                            <div className="flex items-center justify-center gap-1">
                              {model.rank === 1 && <span className="text-yellow-500">🥇</span>}
                              {model.rank === 2 && <span className="text-gray-400">🥈</span>}
                              {model.rank === 3 && <span className="text-amber-600">🥉</span>}
                              <span className={`font-medium ${
                                model.rank <= 3 ? 'text-gray-700' : 'text-gray-500'
                              }`}>
                                {model.rank}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-2 px-4 align-middle">
                          <div className="flex items-center gap-3 justify-start">
                            <img
                              src={model.logo}
                              alt={`${model.fullName} logo`}
                              className={`w-5 h-5 object-contain ${!model.hasReasoning ? 'brightness-0' : ''}`}
                            />
                            <span className="font-medium">{model.fullName}</span>
                          </div>
                        </td>
                        <td className="py-2 px-4 align-middle text-center"> 
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getOrganizationColor(model.organization)}`}>
                            {model.organization}
                          </span>
                        </td>
                        <td className="py-2 px-4 align-middle text-center font-medium">
                          {model.completionRate > 0 ? `${model.completionRate.toFixed(1)} ± ${model.standardDeviation.toFixed(1)}` : 'N/A'}
                        </td>
                        <td className="py-2 px-4 align-middle text-center">
                          <a 
                            href={model.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline text-lg"
                            title="Visit Model Page"
                          >
                            🔗
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        See our technical report for more details.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;