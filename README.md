# Tailor

Uma biblioteca para criar componentes React estilizados com Tailwind CSS de forma organizada e tipada, com suporte a estilos aninhados e variantes.

## Instalação

```bash
npm install tailor
# ou
yarn add tailor
# ou
pnpm add tailor
```

## Uso

### Criando Componentes Básicos

```tsx
import { createElement } from 'tailor';

const Button = createElement('button')({
  root: 'px-4 py-2 rounded-md font-medium',
  hover: 'bg-blue-600',
  active: 'bg-blue-700',
  focus: 'ring-2 ring-offset-2',
  disabled: 'opacity-50 cursor-not-allowed',
});

// Uso
function App() {
  return (
    <Button onClick={() => alert('Clicado!')}>
      Clique aqui
    </Button>
  );
}
```

### Estilos Aninhados

```tsx
import { createElement, createNested } from 'tailor';

// Definir estilos para elementos aninhados
const articleNested = createNested({
  h1: 'text-4xl mb-8',
  h2: 'text-3xl mb-6',
  p: 'text-lg mb-4',
  'p>a': 'text-blue-500 hover:text-blue-600',
  ul: 'list-disc pl-6 mb-4',
  'li>p': 'mb-2',
});

// Criar componente com estilos aninhados
const Article = createElement('article')({
  root: 'prose max-w-none',
  nested: articleNested,
});

// Uso
function BlogPost() {
  return (
    <Article>
      <h1>Título</h1>
      <p>Texto com <a href="#">link</a></p>
      <ul>
        <li>
          <p>Item com parágrafo</p>
        </li>
      </ul>
    </Article>
  );
}
```

### Variantes de Componentes

```tsx
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
```

## API

### createElement(tag)

Cria um componente React estilizado com Tailwind.

- `tag`: Tag HTML do elemento (ex: 'div', 'button', etc)
- Retorna uma função que aceita um objeto de configuração:
  - `root`: Classes base do elemento
  - `hover`: Classes aplicadas no hover
  - `active`: Classes aplicadas no active
  - `focus`: Classes aplicadas no focus
  - `disabled`: Classes aplicadas quando disabled
  - `nested`: Objeto com estilos para elementos aninhados

### createNested(styles)

Cria um objeto de estilos aninhados.

- `styles`: Objeto com seletores e suas classes
  - Chaves podem ser tags HTML ou seletores combinados (ex: 'p>a', 'li>p')
  - Valores são strings com classes Tailwind

## Configurações Disponíveis

A função `tailor` aceita dois parâmetros:
1. O nome da tag HTML
2. Um objeto de configuração com as seguintes opções:

### Espaçamento (spacing)
- `padding`: Define o padding do elemento
- `margin`: Define a margem do elemento

### Layout
- `display`: Define a propriedade display
- `position`: Define a posição do elemento
- `width`: Define a largura
- `height`: Define a altura

### Tipografia (typography)
- `fontSize`: Define o tamanho da fonte
- `fontWeight`: Define o peso da fonte
- `textColor`: Define a cor do texto

### Fundo (background)
- `color`: Define a cor de fundo
- `opacity`: Define a opacidade

### Borda (border)
- `width`: Define a largura da borda
- `color`: Define a cor da borda
- `radius`: Define o raio da borda

### Flex
- `direction`: Define a direção do flex
- `wrap`: Define o wrap do flex
- `justify`: Define o justify-content
- `align`: Define o align-items
- `grow`: Define o flex-grow
- `shrink`: Define o flex-shrink

### Grid
- `cols`: Define o número de colunas
- `rows`: Define o número de linhas
- `gap`: Define o espaçamento entre os itens

## Typescript

A biblioteca é totalmente tipada e oferece autocompleção para todas as propriedades disponíveis.

## Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request. 