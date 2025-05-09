import React from 'react';
import { createElement, createNested } from './index';

// Definir estilos aninhados para artigos
const articleNested = createNested({
  h1: 'text-4xl mb-8 mt-12',
  h2: 'text-3xl mb-6 mt-10',
  h3: 'text-2xl mb-4 mt-8',
  p: 'text-lg leading-7 mb-6',
  'p>a': 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300',
  strong: 'text-text-primary font-semibold',
  ul: 'my-6 space-y-2',
  ol: 'my-6 space-y-2',
  li: 'text-lg leading-7 marker:text-text-secondary',
  'li>p': 'my-2',
  'li>ul': 'my-2',
  'li>ol': 'my-2',
  blockquote: 'border-l-4 border-link pl-4 italic',
  pre: 'p-4',
  code: 'text-sm font-mono bg-background-secondary px-1.5 py-0.5 rounded before:content-none after:content-none',
  img: 'rounded-lg shadow-lg',
  hr: 'my-8 border-border',
  'hr+*': 'mt-8',
});

// Criar componente de artigo
const Article = createElement('article')({
  root: 'prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold prose-a:text-link hover:prose-a:text-link/80 prose-pre:bg-background-secondary prose-pre:border prose-pre:border-border',
  hover: '',
  nested: articleNested,
});

// Criar componentes de botão com variantes
const buttonBase = {
  root: 'px-4 py-2 rounded-md font-medium transition-colors',
  focus: 'ring-2 ring-offset-2',
};

const PrimaryButton = createElement('button')({
  ...buttonBase,
  root: `${buttonBase.root} bg-blue-500 text-white`,
  hover: 'bg-blue-600',
  active: 'bg-blue-700',
  disabled: 'bg-blue-300 cursor-not-allowed',
});

const SecondaryButton = createElement('button')({
  ...buttonBase,
  root: `${buttonBase.root} bg-gray-200 text-gray-800`,
  hover: 'bg-gray-300',
  active: 'bg-gray-400',
  disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
});

// Exemplo de uso
export function Example() {
  return (
    <div className="p-8">
      <Article>
        <h1>Título Principal</h1>
        <p>
          Este é um parágrafo com <a href="#">um link</a> e <strong>texto em negrito</strong>.
        </p>
        <h2>Subtítulo</h2>
        <ul>
          <li>Item 1</li>
          <li>
            Item 2
            <p>Com parágrafo aninhado</p>
            <ul>
              <li>Subitem 1</li>
              <li>Subitem 2</li>
            </ul>
          </li>
        </ul>
        <blockquote>
          Esta é uma citação que demonstra o estilo de blockquote.
        </blockquote>
        <pre>
          <code>
            // Exemplo de código
            const x = 42;
          </code>
        </pre>
        <hr />
        <p>Conteúdo após a linha horizontal</p>
        <div className="flex gap-4 mt-8">
          <PrimaryButton>Botão Primário</PrimaryButton>
          <SecondaryButton>Botão Secundário</SecondaryButton>
          <PrimaryButton disabled>Botão Desabilitado</PrimaryButton>
        </div>
      </Article>
    </div>
  );
} 