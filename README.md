# Nubank Ultravioleta — Redesign conceitual (v2)

**Projeto de portfólio, independente e não oficial.** Não há associação, parceria, endosso ou vínculo com o Nubank. Não é um serviço financeiro, não possui autenticação e não coleta dados pessoais.

## Começar no VS Code

Requisitos: Node.js 20.19+ ou 22.12+ e acesso à internet para instalar dependências.

```bash
npm install
npm run dev
```

Acesse a URL local exibida no terminal, normalmente `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Tecnologias

- React 19 com Vite 6
- Motion para animação de entrada e reação ao scroll
- Lucide React para ícones
- CSS responsivo próprio, com breakpoints desktop/tablet/mobile e animação reduzida por preferência do sistema
- Vídeos MP4 locais adaptados para desktop e mobile, com `autoplay`, `muted`, `loop`, `playsInline`, poster e botão pausar/reproduzir
- Imagens locais em WebP para reduzir o peso de carregamento

## Estrutura do projeto

```
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── styles.css
└── public/assets/
    ├── cartoes-animados.mp4
    ├── cartoes-animados-mobile.mp4
    ├── cartoes-poster.jpg
    ├── benefit-card.webp
    ├── benefit-travel.webp
    ├── benefit-investments.webp
    ├── statement-wallet.webp
    ├── diversidade.webp
    ├── smartphone.webp
    └── floresta-conceitual.webp
```

## Referências visuais utilizadas

1. Vídeo animado de cartões feito por IA — Hero com movimento real, em loop e parallax ao rolar a página.
2. Imagem original de várias mãos segurando um cartão Nubank — seção de diversidade e inclusão.
3. Imagem do smartphone com cartões Nubank Ultravioleta — seção Sobre.
4. Seção de biodiversidade — imagem conceitual de floresta criada para o projeto e armazenada localmente.

## Principais mudanças da segunda interface

- Cabeçalho responsivo, fixo e com mudança visual suave durante a rolagem.
- Hero cinematográfico com vídeo centralizado, área fixa durante a rolagem e revelação progressiva do título.
- Vídeo específico e mais leve para mobile, controle de reprodução, economia de dados e suporte a preferência por movimento reduzido.
- Seção de visão reequilibrada com imagem editorial à esquerda.
- Abas interativas sem numeração, com transições direcionais, navegação por teclado e fotografias próprias para cartão, viagens e investimentos.
- Seção Sobre simplificada, sem selo sobreposto e sem listas numeradas.
- FAQ com nova paleta escura, contraste reforçado e perguntas expansíveis.
- Seções Sobre, diversidade/inclusão, biodiversidade e FAQ com perguntas expansíveis.
- Animações de revelação, navegação por âncoras e foco visível para teclado.
- Estudo de caso integrado com objetivo, papel, decisões de UX, tecnologias e indicadores de entrega.
- Links externos direcionam apenas para o domínio oficial do Nubank/Nu.
- Avisos explícitos de que o projeto é conceitual e não oficial.


## Fontes institucionais consultadas em 23/11/2026

- https://nubank.com.br/ultravioleta
- https://nu.com/pt/quem-somos

**Observação:** texto de marketing e composições da v2 são uma interpretação criativa, não declarações ou campanhas institucionais do banco.
