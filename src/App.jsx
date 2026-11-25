import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CirclePause,
  CirclePlay,
  Compass,
  Code2,
  CreditCard,
  Gauge,
  Globe2,
  HeartHandshake,
  Leaf,
  Layers3,
  Menu,
  MoveUpRight,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react'

const OFFICIAL_URL = 'https://nubank.com.br/ultravioleta'
const ABOUT_URL = 'https://nu.com/pt/quem-somos'
const ENVIRONMENT_URL = 'https://nubank.com.br/ultravioleta'

const benefits = [
  {
    key: 'cartao',
    label: 'Cartão',
    eyebrow: 'Cartão Mastercard® Black',
    title: 'Os detalhes fazem a diferença.',
    text: 'Cashback ou pontos, experiências em viagens e benefícios pensados para acompanhar seus planos.',
    accents: ['Cashback ou pontos', 'Viagens', 'Experiências'],
    icon: CreditCard,
    image: '/assets/benefit-card.webp',
    imageAlt: 'Mão segurando um smartphone com uma carteira digital roxa e cartões em destaque',
  },
  {
    key: 'viagens',
    label: 'Viagens',
    eyebrow: 'Experiência pelo mundo',
    title: 'O mundo é seu próximo destino.',
    text: 'Uma experiência de viagens com benefícios, conforto e soluções para acompanhar você além das fronteiras.',
    accents: ['Salas VIP', 'Conta global', 'Experiência'],
    icon: Plane,
    image: '/assets/benefit-travel.webp',
    imageAlt: 'Lounge de aeroporto sofisticado com mala, passaporte e cartão roxo',
  },
  {
    key: 'investimentos',
    label: 'Investimentos',
    eyebrow: 'Patrimônio e possibilidades',
    title: 'O amanhã começa com escolhas.',
    text: 'Explore um universo de investimentos e soluções financeiras que fazem sentido para suas próximas conquistas.',
    accents: ['Planejamento', 'Possibilidades', 'Futuro'],
    icon: TrendingUp,
    image: '/assets/benefit-investments.webp',
    imageAlt: 'Smartphone com gráficos abstratos em um cenário tecnológico roxo',
  },
]

const questions = [
  {
    q: 'Este é o site oficial do Nubank?',
    a: 'Não. Este é um estudo independente de redesign visual e experiência do usuário, criado para portfólio. Não existe vínculo ou endosso do Nubank.',
  },
  {
    q: 'Posso solicitar um cartão nesta página?',
    a: 'Não. Esta página é uma demonstração conceitual e não coleta dados pessoais. Para conhecer produtos, condições e elegibilidade, acesse o site oficial do Nubank.',
  },
  {
    q: 'Os benefícios mostrados estão atualizados?',
    a: 'Os temas foram inspirados na página institucional consultada em novembro de 2026. As condições, taxas e benefícios podem mudar; confira as informações vigentes no site oficial antes de tomar decisões.',
  },
]

function Fade({ children, className = '', delay = 0, ...props }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function NuMark({ light = false }) {
  return (
    <span className={`brand-mark ${light ? 'brand-mark--light' : ''}`} aria-label="Nu">
      nu
    </span>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const closeOnEscape = event => { if (event.key === 'Escape') setOpen(false) }
    const updateHeader = () => setScrolled(window.scrollY > 28)
    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('scroll', updateHeader, { passive: true })
    updateHeader()
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('scroll', updateHeader)
    }
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} id="topo">
      <div className="header-inner container">
        <a className="brand" href="#inicio" aria-label="Voltar ao início" onClick={() => setOpen(false)}>
          <NuMark light />
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-sub">ultravioleta<span className="brand-dot">.</span></span>
        </a>
        <nav className={`main-nav ${open ? 'is-open' : ''}`} id="main-nav" aria-label="Navegação principal">
          <a href="#experiencia" onClick={() => setOpen(false)}>A experiência</a>
          <a href="#beneficios" onClick={() => setOpen(false)}>Benefícios</a>
          <a href="#diversidade" onClick={() => setOpen(false)}>Nosso mundo</a>
          <a href="#sobre" onClick={() => setOpen(false)}>Sobre nós</a>
          <a href="#projeto" onClick={() => setOpen(false)}>O projeto</a>
          <a className="nav-mobile-cta" href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">Site oficial <ArrowUpRight size={16} /></a>
        </nav>
        <a className="header-cta" href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">Site oficial <ArrowUpRight size={16} /></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(current => !current)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

const heroMobileQuery = '(max-width: 740px), (pointer: coarse) and (max-height: 540px)'

function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [mobile, setMobile] = useState(() => window.matchMedia(heroMobileQuery).matches)
  const reduceMotion = useReducedMotion()
  const animateHero = !reduceMotion && !mobile
  const autoplay = !reduceMotion && navigator.connection?.saveData !== true
  const videoSrc = mobile ? '/assets/cartoes-animados-mobile.mp4' : '/assets/cartoes-animados.mp4'
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 68, damping: 26, mass: 0.55, restDelta: 0.001 })
  const videoScale = useTransform(smoothProgress, [0, 0.62, 1], [1, 1.045, 1.09])
  const shadeOpacity = useTransform(smoothProgress, [0, 0.3, 0.72], [0.12, 0.44, 0.8])
  const copyExitOpacity = useTransform(smoothProgress, [0.82, 1], [1, 0.3])
  const eyebrowOpacity = useTransform(smoothProgress, [0.08, 0.25], [0, 1])
  const eyebrowY = useTransform(smoothProgress, [0.08, 0.27], [22, 0])
  const titleOpacity = useTransform(smoothProgress, [0.13, 0.35], [0, 1])
  const titleY = useTransform(smoothProgress, [0.13, 0.38], [52, 0])
  const titleBlur = useTransform(smoothProgress, [0.13, 0.35], ['blur(12px)', 'blur(0px)'])
  const descriptionOpacity = useTransform(smoothProgress, [0.22, 0.42], [0, 1])
  const descriptionY = useTransform(smoothProgress, [0.22, 0.44], [30, 0])
  const actionsOpacity = useTransform(smoothProgress, [0.29, 0.49], [0, 1])
  const actionsY = useTransform(smoothProgress, [0.29, 0.51], [24, 0])

  useEffect(() => {
    const media = window.matchMedia(heroMobileQuery)
    const update = () => setMobile(media.matches)
    media.addListener(update)
    return () => media.removeListener(update)
  }, [])

  useEffect(() => {
    if (!autoplay) videoRef.current?.pause()
  }, [autoplay])

  async function toggleVideo() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      try {
        if (!video.getAttribute('src')) video.src = videoSrc
        await video.play()
      } catch { setPlaying(false) }
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <section className="hero" ref={heroRef} id="inicio" aria-labelledby="hero-title">
      <div className="hero-sticky">
      <motion.div className="hero-video-shell" style={animateHero ? { scale: videoScale } : undefined} aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          key={videoSrc}
          src={autoplay ? videoSrc : undefined}
          autoPlay={autoplay}
          muted
          loop
          playsInline
          preload="none"
          poster="/assets/cartoes-poster.jpg"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </motion.div>
      <motion.div className="hero-shade" style={!animateHero ? undefined : { opacity: shadeOpacity }} aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="container hero-content">
        <motion.div className="hero-copy" style={!animateHero ? undefined : { opacity: copyExitOpacity }}>
          <motion.p className="eyebrow eyebrow--light" style={!animateHero ? undefined : { opacity: eyebrowOpacity, y: eyebrowY }}><span className="glow-dot" /> UMA NOVA PERSPECTIVA DO EXTRAORDINÁRIO</motion.p>
          <motion.h1 id="hero-title" style={!animateHero ? undefined : { opacity: titleOpacity, y: titleY, filter: titleBlur }}>
            O seu mundo merece ir <span className="serif-accent">além.</span>
          </motion.h1>
          <motion.p className="hero-description" style={!animateHero ? undefined : { opacity: descriptionOpacity, y: descriptionY }}>
            Mais experiências. Mais possibilidades. Uma nova forma de olhar para o que realmente importa.
          </motion.p>
          <motion.div className="hero-actions" style={!animateHero ? undefined : { opacity: actionsOpacity, y: actionsY }}>
            <a href="#experiencia" className="btn btn--white">Explore a experiência <ArrowUpRight size={18} /></a>
            <a href="#beneficios" className="text-link text-link--light">Conheça os benefícios <ArrowRight size={17}/></a>
          </motion.div>
        </motion.div>
      </div>
      <div className="hero-bottom container">
        <a href="#experiencia" className="scroll-hint"><span className="scroll-hint-line"><ArrowDown size={16}/></span><span>DESCUBRA MAIS</span></a>
        <div className="hero-play-wrap">
          <span>EXPERIÊNCIA EM MOVIMENTO</span>
          <button type="button" className="video-toggle" onClick={toggleVideo} aria-label={playing ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}>
            {playing ? <CirclePause size={26} /> : <CirclePlay size={26} />}
          </button>
        </div>
      </div>
      <div className="hero-transition" aria-hidden="true" />
      </div>
    </section>
  )
}

function Statement() {
  return (
    <section className="statement" id="experiencia">
      <div className="container statement-grid">
        <Fade className="statement-visual"><img src="/assets/statement-wallet.webp" alt="Carteira digital Ultravioleta em um smartphone" loading="lazy" /></Fade>
        <Fade className="statement-main">
          <p className="eyebrow eyebrow--light"><Sparkles size={17} /> UMA EXPERIÊNCIA SEM RÓTULOS</p>
          <h2>O melhor da vida não cabe em uma única definição. <em>Nem a sua experiência financeira deveria.</em></h2>
          <p>Uma experiência que conecta diferentes momentos da vida à liberdade de escolher o que vem depois.</p>
        </Fade>
      </div>
    </section>
  )
}

function Benefits() {
  const [active, setActive] = useState('cartao')
  const [direction, setDirection] = useState(1)
  const tabRefs = useRef([])
  const item = benefits.find(b => b.key === active) || benefits[0]
  const Icon = item.icon
  const activeIndex = benefits.findIndex(b => b.key === active)

  function selectBenefit(key) {
    const nextIndex = benefits.findIndex(b => b.key === key)
    setDirection(nextIndex >= activeIndex ? 1 : -1)
    setActive(key)
  }

  function handleTabKeyDown(event) {
    let nextIndex = activeIndex
    if (event.key === 'ArrowRight') nextIndex = (activeIndex + 1) % benefits.length
    else if (event.key === 'ArrowLeft') nextIndex = (activeIndex - 1 + benefits.length) % benefits.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = benefits.length - 1
    else return
    event.preventDefault()
    selectBenefit(benefits[nextIndex].key)
    tabRefs.current[nextIndex]?.focus()
  }
  return (
    <section className="benefits section-pad" id="beneficios">
      <div className="container">
        <Fade className="section-head section-head--between">
          <div>
            <p className="eyebrow eyebrow--dark"><span className="small-purple-dot" /> A EXPERIÊNCIA ULTRAVIOLETA</p>
            <h2>Seu próximo capítulo começa <em>aqui.</em></h2>
          </div>
          <p className="section-intro">Experiências relevantes para quem busca novas formas de viver, conquistar e explorar.</p>
        </Fade>
        <Fade className="benefits-stage">
          <div className="benefit-tabs" role="tablist" aria-label="Categorias de benefícios" onKeyDown={handleTabKeyDown}>
            {benefits.map((b, index) => (
              <button
                ref={element => { tabRefs.current[index] = element }}
                role="tab"
                aria-selected={active === b.key}
                aria-controls="benefit-panel"
                id={`tab-${b.key}`}
                tabIndex={active === b.key ? 0 : -1}
                key={b.key}
                className={`benefit-tab ${active === b.key ? 'active' : ''}`}
                onClick={() => selectBenefit(b.key)}
                type="button"
              >
                {active === b.key && <motion.span className="benefit-tab-active" layoutId="active-benefit-tab" transition={{ type: 'spring', stiffness: 360, damping: 32 }} />}
                <span className="benefit-tab-label">{b.label}</span><ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              className="benefit-panel"
              id="benefit-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 38 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="benefit-panel-copy">
                <div className="panel-kicker"><Icon size={19} strokeWidth={1.6} /> {item.eyebrow}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="benefit-chips">{item.accents.map(acc => <span key={acc}><Check size={13} />{acc}</span>)}</div>
                <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="panel-cta">Ver informações oficiais <ArrowUpRight size={18} /></a>
              </div>
              <div className={`benefit-panel-art benefit-art--${active}`}>
                <img src={item.image} alt={item.imageAlt} loading="lazy" />
                <div className="benefit-image-shade" aria-hidden="true" />
                <span className="benefit-image-label"><Icon size={16} /> {item.label}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </Fade>
        <div className="mini-facts">
          <Fade className="mini-fact"><span className="mini-fact-icon"><Plane size={23} strokeWidth={1.6}/></span><div><strong>Um mundo de possibilidades</strong><span>Experiências e viagens</span></div></Fade>
          <Fade className="mini-fact"><span className="mini-fact-icon"><ShieldCheck size={23} strokeWidth={1.6}/></span><div><strong>Mais tranquilidade</strong><span>Benefícios no dia a dia</span></div></Fade>
          <Fade className="mini-fact"><span className="mini-fact-icon"><Compass size={23} strokeWidth={1.6}/></span><div><strong>Seu jeito de escolher</strong><span>Flexibilidade e controle</span></div></Fade>
        </div>
      </div>
    </section>
  )
}

function Diversity() {
  return (
    <section className="diversity" id="diversidade">
      <div className="diversity-content">
        <div className="diversity-inner">
          <Fade>
            <p className="eyebrow eyebrow--light">GENTE DE VERDADE</p>
            <h2>O futuro fica maior quando <em>todo mundo faz parte.</em></h2>
            <p>Histórias diferentes. Novas perspectivas. Um olhar para a inclusão que começa pelas pessoas e se traduz em experiências mais acessíveis.</p>
            <div className="diversity-tags"><span><HeartHandshake size={16}/> Inclusão</span><span><Globe2 size={16}/> Diversidade</span><span><Sparkles size={16}/> Possibilidades</span></div>
          </Fade>
        </div>
      </div>
      <div className="diversity-photo"><img src="/assets/diversidade.webp" alt="Mãos de pessoas com diferentes tons de pele segurando juntas um cartão roxo do Nubank" loading="lazy" /></div>
    </section>
  )
}

function Nature() {
  return (
    <section className="nature" id="impacto">
      <div className="nature-bg" role="img" aria-label="Fotografia ilustrativa de floresta tropical vista de cima" />
      <div className="nature-overlay" aria-hidden="true" />
      <div className="container nature-content">
        <Fade className="nature-box">
          <p className="eyebrow eyebrow--light"><Leaf size={17}/> OLHAR PARA O FUTURO</p>
          <h2>O amanhã também vive <em>fora das telas.</em></h2>
          <p>A biodiversidade faz parte de um mundo que merece atenção. Neste conceito, abrimos espaço para conversar sobre futuro e responsabilidade socioambiental — com informação e transparência.</p>
          <a className="btn btn--outline-light" href="https://nu.com/pt/quem-somos" target="_blank" rel="noopener noreferrer">Conhecer o Nu <ArrowUpRight size={18} /></a>
        </Fade>
      </div>
      <span className="nature-credit">Imagem conceitual criada para este projeto</span>
    </section>
  )
}

function About() {
  return (
    <section className="about section-pad" id="sobre">
      <div className="container about-grid">
        <Fade className="about-visual">
          <img src="/assets/smartphone.webp" alt="Mão segurando um smartphone com cartões Nubank Ultravioleta na tela" loading="lazy" />
        </Fade>
        <Fade className="about-copy">
          <p className="eyebrow eyebrow--dark"><span className="small-purple-dot"/> SOBRE O NU</p>
          <h2>É sobre tecnologia. Mas, acima de tudo, <em>é sobre pessoas.</em></h2>
          <p>O Nubank nasceu para simplificar a relação das pessoas com a vida financeira. Este redesign interpreta esse propósito por meio de um visual expressivo, acessível e contemporâneo.</p>
          <div className="about-lines"><span>Simplicidade com personalidade <ArrowUpRight size={16} /></span><span>Tecnologia com propósito <ArrowUpRight size={16} /></span><span>Experiências para diferentes histórias <ArrowUpRight size={16} /></span></div>
          <a className="text-link" href={ABOUT_URL} target="_blank" rel="noopener noreferrer">Conheça a história oficial <ArrowUpRight size={18}/></a>
        </Fade>
      </div>
    </section>
  )
}

function CaseStudy() {
  const details = [
    { icon: Compass, label: 'Objetivo', text: 'Reinterpretar a experiência Ultravioleta com uma direção mais editorial, imersiva e humana.' },
    { icon: Code2, label: 'Tecnologias', text: 'React 19, Vite, Motion, Lucide e CSS responsivo desenvolvido especificamente para o conceito.' },
    { icon: Layers3, label: 'Decisões de UX', text: 'Narrativa guiada por scroll, hierarquia clara, conteúdo acessível e interações sem coleta de dados.' },
    { icon: Gauge, label: 'Entrega', text: 'Assets locais otimizados, experiência adaptativa e respeito à preferência por movimento reduzido.' },
  ]
  return (
    <section className="case-study section-pad" id="projeto">
      <div className="container">
        <Fade className="case-head">
          <p className="eyebrow eyebrow--light"><Sparkles size={16} /> ESTUDO DE CASO</p>
          <div className="case-head-grid">
            <h2>Um redesign pensado como <em>experiência de marca.</em></h2>
            <p>Projeto autoral de UX/UI criado para portfólio. Minha atuação envolveu direção visual, arquitetura da página, prototipação, desenvolvimento front-end e otimização dos assets.</p>
          </div>
        </Fade>
        <div className="case-cards">
          {details.map(({ icon: DetailIcon, label, text }, index) => (
            <Fade className="case-card" delay={index * 0.08} key={label}>
              <span className="case-icon"><DetailIcon size={22} strokeWidth={1.5} /></span>
              <h3>{label}</h3>
              <p>{text}</p>
            </Fade>
          ))}
        </div>
        <Fade className="case-note">
          <span>Conceito independente</span>
          <p>Sem vínculo, endosso ou associação comercial com o Nubank.</p>
        </Fade>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq section-pad" id="perguntas">
      <div className="container faq-grid">
        <Fade className="faq-left"><p className="eyebrow eyebrow--light">TRANSPARÊNCIA</p><h2>Algumas coisas precisam ficar <em>claras.</em></h2><p>Um redesign pode inspirar, mas também deve ser transparente sobre o que é e o que não é.</p></Fade>
        <Fade className="faq-right">
          {questions.map((entry, index) => (
            <div className={`faq-item ${open === index ? 'expanded' : ''}`} key={entry.q}>
              <h3><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} aria-controls={`answer-${index}`}><span>{entry.q}</span><ChevronDown size={20} /></button></h3>
              {open === index && <div className="faq-answer" id={`answer-${index}`}><p>{entry.a}</p></div>}
            </div>
          ))}
        </Fade>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-glow" aria-hidden="true" />
      <div className="container final-content">
        <Fade>
          <p className="eyebrow eyebrow--light">REDESIGN ULTRAVIOLETA / CONCEITO INDEPENDENTE</p>
          <h2>O extraordinário é o que você <em>faz dele.</em></h2>
          <a className="btn btn--white" href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">Visitar o Nubank oficial <MoveUpRight size={18}/></a>
        </Fade>
      </div>
      <span className="final-giant" aria-hidden="true">nu</span>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div><div className="footer-brand"><NuMark light /><span>ultravioleta.</span></div><p>Estudo autoral de redesign de interface e experiência do usuário. Projeto independente para fins de portfólio.</p></div>
          <div className="footer-links"><a href="#inicio">Início</a><a href="#beneficios">Benefícios</a><a href="#diversidade">Inclusão</a><a href="#sobre">Sobre nós</a><a href="#projeto">O projeto</a><a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">Site oficial <ArrowUpRight size={14}/></a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 • Projeto conceitual não oficial. Sem afiliação com o Nubank.</span><a href="#inicio">Voltar ao topo ↑</a></div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="concept-banner"><span>PROJETO DE PORTFÓLIO</span> <span className="concept-divider">•</span> Redesign independente, não oficial</div>
      <Header />
      <main id="conteudo">
        <Hero />
        <Statement />
        <Benefits />
        <Diversity />
        <Nature />
        <About />
        <CaseStudy />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
