# <img src="images/icon.png" alt="Tailor" height="40"/>

<div align="center">
  <img src="images/logo.png" alt="Tailor Logo" width="300" style="margin-bottom: 20px"/>
  <br/>
  <p><strong>A library for creating styled React components with Tailwind CSS in an organized and typed way, with support for nested styles, variants, and responsive design.</strong></p>
  
  [![npm version](https://img.shields.io/npm/v/tailor.svg)](https://www.npmjs.com/package/tailor)
  [![license](https://img.shields.io/npm/l/tailor.svg)](https://github.com/yourusername/tailor/blob/main/LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/tailor/pulls)
</div>

## ✨ Features

- **Type Safety**: Full TypeScript support with proper type definitions
- **Nested Styles**: Support for styling nested elements with complex selectors
- **Component Variants**: Easy creation of component variants with shared base styles
- **Responsive Design**: Built-in support for responsive styles with Tailwind breakpoints
- **Smart Class Merging**: Uses `tailwind-merge` for intelligent class conflict resolution
- **State Support**: Built-in support for hover, active, focus, and disabled states
- **Animation Support**: Built-in animation utilities with Tailwind
- **React Integration**: Seamless integration with React components and props

## 📦 Installation

```bash
npm install @dennerrondinely/tailor
# or
yarn add @dennerrondinely/tailor
# or
pnpm add @dennerrondinely/tailor
```

## 🚀 Quick Start

### Creating Basic Components

```tsx
import { createElement } from '@dennerrondinely/tailor';

const Button = createElement('button')({
  base: 'px-4 py-2 bg-blue-500 text-white rounded',
  hover: 'bg-blue-600',
  active: 'bg-blue-700',
  focus: 'ring-2 ring-blue-500',
  disabled: 'opacity-50',
  responsive: {
    base: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    },
    hover: {
      sm: 'bg-blue-400',
      md: 'bg-blue-500',
      lg: 'bg-blue-600'
    }
  }
});

// Usage
function App() {
  return (
    <Button>
      Click me
    </Button>
  );
}
```

### Using with Custom Components

Você pode usar `createElement` ou `craft` com componentes React já existentes:

```tsx
import { craft } from '@dennerrondinely/tailor';

const CustomButton = React.forwardRef((props, ref) => (
  <button ref={ref} {...props} />
));

const StyledCustomButton = craft(CustomButton)({
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    hover: { default: 'hover:opacity-90' },
    active: { default: 'active:scale-95' }
  },
  responsive: {
    base: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }
  }
});
```

## 📚 Documentation

### Helper Functions

#### tailorFit

Create responsive styles with ease:

```tsx
import { tailorFit } from '@dennerrondinely/tailor';

const responsiveStyles = tailorFit({
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
});

const Card = createElement('div')({
  responsive: {
    base: responsiveStyles,
    hover: tailorFit({
      sm: 'hover:shadow-md',
      md: 'hover:shadow-lg',
      lg: 'hover:shadow-xl'
    })
  }
});
```

#### embroider

Style nested elements within a component:

```tsx
import { embroider } from '@dennerrondinely/tailor';

const cardStyles = embroider({
  'h2': 'text-xl font-bold mb-2',
  'p': 'text-gray-600',
  'button': 'mt-4 bg-blue-500 text-white px-4 py-2 rounded',
  'div > span': 'text-sm text-gray-500'
});

const Card = createElement('div')({
  base: 'bg-white rounded-lg shadow p-6',
  nested: cardStyles
});
```

#### spinThread

Add animations to your components:

```tsx
import { spinThread } from '@dennerrondinely/tailor';

const Spinner = createElement('div')({
  base: spinThread({
    type: 'spin',
    duration: '1000',
    iteration: 'infinite'
  })
});
```

#### craft

A powerful utility that combines all features in a single, intuitive API. Agora aceita tanto string quanto componente React:

```tsx
import { craft } from '@dennerrondinely/tailor';

const Button = craft('button')({
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    hover: { default: 'hover:bg-blue-600', outline: 'hover:bg-blue-50' },
    active: { default: 'active:bg-blue-700', outline: 'active:bg-blue-100' }
  },
  responsive: {
    base: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
    hover: { sm: 'hover:bg-blue-500', md: 'hover:bg-blue-600' }
  },
  nested: {
    'span': 'text-sm text-gray-500',
    'div > svg': 'w-4 h-4'
  },
  animation: {
    type: 'pulse',
    duration: '500',
    iteration: 'infinite'
  }
});

// Exemplo com componente customizado
const CustomButton = React.forwardRef((props, ref) => (
  <button ref={ref} {...props} />
));

const StyledCustomButton = craft(CustomButton)({
  base: 'px-4 py-2 rounded font-medium',
  variants: {
    hover: { default: 'hover:opacity-90' },
    active: { default: 'active:scale-95' }
  },
  responsive: {
    base: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }
  }
});
```

### Responsive Config

A configuração responsiva agora segue o formato:

```ts
responsive: {
  base?: { sm?: string; md?: string; ... };
  hover?: { sm?: string; ... };
  active?: { ... };
  focus?: { ... };
  disabled?: { ... };
}
```

## 📖 API Reference

### Core Functions

#### createElement(tagOrComponent)

Cria um componente React estilizado com Tailwind.

- `tagOrComponent`: HTML tag (ex: 'div', 'button', etc.) ou um componente React
- Retorna uma função que aceita um objeto de configuração:
  - `base`: Base element classes
  - `hover`: Classes applied on hover
  - `active`: Classes applied on active
  - `focus`: Classes applied on focus
  - `disabled`: Classes applied when disabled
  - `nested`: Object with styles for nested elements
  - `responsive`: Objeto com configurações responsivas (ver acima)

#### craft(tagOrComponent)

Cria um componente com uma API de configuração unificada. Aceita tanto string quanto componente React.

- `tagOrComponent`: HTML tag ou componente React
- Retorna uma função que aceita um objeto `CraftConfig`:
  - `base`: Base styles
  - `variants`: Component variants
  - `responsive`: Responsive styles
  - `nested`: Nested styles
  - `animation`: Animation configuration

## 🎯 TypeScript Support

The library is fully typed and provides autocompletion for all available properties.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

<div align="center" style="margin: 60px 0; padding: 40px; background: linear-gradient(to right, #f3f4f6, #e5e7eb, #f3f4f6); border-radius: 16px;">
  <img src="images/icon.png" alt="Tailor" height="150" style="filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));"/>
  <br/>
  <p style="margin-top: 20px; font-size: 1.2em; color: #374151;">Crafted with ❤️ for React developers</p>
</div>

## 📄 License

MIT 