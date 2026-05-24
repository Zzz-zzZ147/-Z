import { useEffect, useMemo, useState } from 'react'
import { works } from './portfolioData'

const portfolioCategories = ['private', 'society', 'commercial', 'city']

const subcategoryOrder = {
  private: [
    '26-5-14-刘文刀-北大-个人-悉大',
    '26-5-7-谢礼谦-个人-unsw毕业照约拍',
    '26-5-9-中国花园-花开富贵-汉服',
    '26-4-1-悉尼歌剧院',
  ],
  society: [
    '26-3-7-penta-手工',
    '26-4-3-penta-彩蛋',
    '26-5-9-penta-团建-晚-调酒',
    '26-3-27-acisic-披萨',
  ],
  commercial: [
    '26-5-1-dy-总部合作',
    '26-5-17elsa-混沌商学-救急拍摄',
    '26-4-30-晚宴-澳洲移民公司',
  ],
  city: ['城市风光'],
}

const serviceVisuals = [
  { key: 'private', image: '/images/services/private-session.png' },
  { key: 'graduation', image: '/images/services/graduation.png' },
  { key: 'society', image: '/images/services/society.png' },
  { key: 'commercial', image: '/images/services/commercial.png' },
]

const subcategoryLabels = {
  zh: {
    '26 4 1 悉尼歌剧院': '悉尼歌剧院',
    '26 5 14 刘文刀 北大 个人 悉大': '悉大个人约拍',
    '26 5 7 谢礼谦 个人 UNSW毕业照约拍': 'UNSW 毕业照约拍',
    '26 5 9 中国花园 花开富贵 汉服': '中国花园汉服',
    '26 3 27 acisic 披萨': 'ACISC 披萨活动',
    '26 3 7 penta 手工': 'PENTA 手工活动',
    '26 4 3 penta 彩蛋': 'PENTA 彩蛋活动',
    '26 5 9 penta 团建 晚 调酒': 'PENTA 团建调酒',
    '26 4 30 晚宴 澳洲移民公司': '澳洲移民公司晚宴',
    '26 5 1 dy 总部合作': '抖音总部合作',
    '26 5 17Elsa｜混沌商学 救急拍摄': '混沌商学拍摄',
    城市风光: '城市风光',
  },
  en: {
    '26 4 1 悉尼歌剧院': 'Opera House',
    '26 5 14 刘文刀 北大 个人 悉大': 'USYD personal session',
    '26 5 7 谢礼谦 个人 UNSW毕业照约拍': 'UNSW graduation',
    '26 5 9 中国花园 花开富贵 汉服': 'Chinese Garden Hanfu',
    '26 3 27 acisic 披萨': 'ACISC pizza event',
    '26 3 7 penta 手工': 'PENTA workshop',
    '26 4 3 penta 彩蛋': 'PENTA egg event',
    '26 5 9 penta 团建 晚 调酒': 'PENTA cocktail gathering',
    '26 4 30 晚宴 澳洲移民公司': 'Migration agency dinner',
    '26 5 1 dy 总部合作': 'Douyin HQ collaboration',
    '26 5 17Elsa｜混沌商学 救急拍摄': 'Chaos business session',
    城市风光: 'City landscapes',
  },
}

const content = {
  zh: {
    brand: '漫游桑Z',
    studio: '小Z拍了拍悉尼',
    switchLabel: 'EN',
    nav: [
      ['作品集', '#portfolio'],
      ['服务', '#services'],
      ['约拍信息', '#booking'],
      ['流程', '#process'],
      ['联系', '#contact'],
    ],
    hero: {
      eyebrow: '07留子｜悉尼大学在读｜常驻悉尼',
      title: '为你在悉尼的每一次出现，留下更有质感的影像。',
      copy: '我是漫游桑Z，也可以叫我小Z，常驻悉尼的摄影师和影像创作者。现在在悉尼大学读书，平时拍人像、海边、街拍、毕业照、社团活动和商拍，也能胜任照片与视频拍摄。我更在意一张照片里的状态、氛围和故事感：不只是把人拍清楚，而是把你当时的情绪、关系、地点和光线一起留下。拍摄时我会全程耐心引导，从动作、表情到走位都会慢慢调整，社恐或者第一次面对镜头也不用紧张。',
      primary: '看作品',
      secondary: '直接私信',
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: '作品集',
      copy: '从真实拍摄项目中筛选整理，按商拍、私人约拍、社团拍摄和城市风光展开。选择一个分类后，再进入对应作品。',
      categories: {
        commercial: '商拍',
        private: '私人约拍',
        society: '社团拍摄',
        city: '城市风光',
      },
    },
    services: {
      eyebrow: 'Services',
      title: '拍摄服务',
      copy: '从个人纪念到商业表达，每一次拍摄都围绕画面质感、情绪状态和最终使用场景来设计。拍摄过程会保留自然感，也会在动作、表情和节奏上给予清晰引导。',
      items: [
        ['私人约拍', '适合人像、海边、街拍、情侣、朋友与主题写真。拍摄不会只追求“出片”，而是把地点、穿搭、光线和人物状态放在一起考虑，让照片自然、有氛围，也有可以长期保留的质感。'],
        ['毕业照', '悉尼范围内的毕业照都可以拍，支持个人、朋友、情侣和家庭合影。画面会兼顾正式感和生活感，不把毕业照拍成僵硬模板，而是保留这段经历里真实的人和关系。'],
        ['社团/活动拍摄', '适合校园社团、聚会、workshop、晚间活动和线下活动记录。重点不只是拍到现场，而是捕捉氛围、互动、细节和关键瞬间，让活动之后仍然有完整、可传播的视觉回忆。'],
        ['商拍合作', '适合品牌内容、企业形象、门店空间、服务场景、活动宣传和社交媒体素材。拍摄会从用途出发，保证画面统一、干净、可信赖，适合发布、展示和长期使用。'],
      ],
    },
    booking: {
      eyebrow: 'Booking Info',
      title: '约拍海报与标价图',
      copy: '毕业照与日常约拍的基础信息可以在这里快速查看。',
      posters: ['悉尼毕业照约拍', '悉尼日常约拍'],
    },
    graduation: {
      eyebrow: 'Graduation Photography',
      title: '毕业照：正式，但不僵硬',
      copy: '毕业照不只是穿上学士服拍几张照片，而是把学校、朋友、家人和这段经历一起留下。拍摄时会引导动作和表情，也保留自然互动。',
      bullets: ['悉大、UNSW 与悉尼城市路线建议', '个人、情侣、朋友、家庭均可', '全程耐心引导，社恐也不用怕'],
    },
    commercial: {
      eyebrow: 'Commercial Photography',
      title: '商拍：清楚、耐看、能用',
      copy: '商拍会围绕实际使用场景来拍：社交媒体、官网、宣传图、活动复盘或品牌内容。画面保持统一、干净、可信赖。',
      bullets: ['品牌内容与企业形象', '空间、人物、服务场景拍摄', '照片与视频拍摄都可沟通'],
    },
    about: {
      eyebrow: 'About',
      title: '关于我',
      paragraphs: [
        '07 留子，悉尼大学在读，常驻悉尼。社交媒体名字叫漫游桑Z，也可以叫我小Z。',
        '我主要拍人像、海边、街拍、毕业照、社团活动和商拍。能拍各种风格，照片和视频都能胜任。拍摄过程会尽量轻松、耐心地引导，不擅长面对镜头也没关系。',
        '悉尼约拍或商业合作，可以直接私信或通过邮箱、微信联系我。',
      ],
    },
    process: {
      eyebrow: 'Process',
      title: '拍摄流程',
      copy: '流程简单一点，拍摄体验会舒服很多。尤其是第一次约拍或社恐客户，提前沟通会更安心。',
      steps: [
        ['01', '沟通需求', '确认拍摄类型、日期、地点、人数、预算和参考风格。'],
        ['02', '确定路线', '根据风格建议地点、时间段、服装和大致拍摄节奏。'],
        ['03', '现场引导', '全程耐心引导动作和表情，也会抓自然瞬间。'],
        ['04', '后期交付', '精选、调色、修图后，通过线上链接交付照片。'],
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: '悉尼约拍 / 商业合作，直接私',
      copy: '联系时可以告诉我：想拍什么类型、日期、地点、人数，以及有没有参考风格。',
      phone: '手机',
      wechat: '微信',
      email: '邮箱',
      instagram: 'Instagram',
      douyin: '抖音',
      xiaohongshu: '小红书',
      cta: '邮件咨询',
    },
    footer: '悉尼摄影作品集网站',
  },
  en: {
    brand: 'Manyousang Z',
    studio: 'Z Photographs Sydney',
    switchLabel: '中文',
    nav: [
      ['Portfolio', '#portfolio'],
      ['Services', '#services'],
      ['Booking', '#booking'],
      ['Process', '#process'],
      ['Contact', '#contact'],
    ],
    hero: {
      eyebrow: 'USYD student photographer｜Based in Sydney',
      title: 'Refined imagery for the people, places, and stories you want remembered.',
      copy: 'I am Manyousang Z, also known as Xiao Z, a Sydney-based photographer and visual creator studying at the University of Sydney. I shoot portraits, seaside sessions, street photography, graduation, society events, and commercial projects, with both photo and video work available. My focus is not only making people look good, but preserving the atmosphere, emotion, place, and quiet story inside each frame. During the session, I guide posing, expression, movement, and rhythm patiently, so first-time or camera-shy clients can settle into the shoot naturally.',
      primary: 'View work',
      secondary: 'Message me',
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Selected work',
      copy: 'A curated archive organized by commercial work, private sessions, society shoots, and Sydney city landscapes. Choose one category to expand the corresponding work.',
      categories: {
        commercial: 'Commercial',
        private: 'Private sessions',
        society: 'Society shoots',
        city: 'City landscapes',
      },
    },
    services: {
      eyebrow: 'Services',
      title: 'Photography services',
      copy: 'From personal memories to commercial storytelling, each session is shaped around visual quality, atmosphere, and how the final images will be used.',
      items: [
        ['Private Sessions', 'Portraits, seaside sessions, street photos, couples, friends, and creative concepts for people who want to document their Sydney life with images that feel natural, refined, and personal.'],
        ['Graduation Photography', 'Graduation sessions across Sydney for solo portraits, friends, couples, and families. The approach balances ceremony with real connection, so the images feel polished without becoming stiff.'],
        ['Society / Event Shoots', 'Coverage for student societies, workshops, evening events, and offline gatherings, with attention to atmosphere, interaction, details, and the moments that make an event memorable.'],
        ['Commercial Collaboration', 'Brand content, business profiles, spaces, services, event promotion, and social media assets planned around clarity, consistency, and long-term usability.'],
      ],
    },
    booking: {
      eyebrow: 'Booking Info',
      title: 'Booking posters and pricing images',
      copy: 'Quick reference for graduation and everyday portrait booking information.',
      posters: ['Sydney graduation booking', 'Sydney daily portrait booking'],
    },
    graduation: {
      eyebrow: 'Graduation Photography',
      title: 'Graduation photos that feel polished, not stiff',
      copy: 'Graduation photos should preserve the school, friends, family, and feeling around this milestone. I guide posing and expression while keeping the session relaxed.',
      bullets: ['USYD, UNSW, and Sydney route suggestions', 'Solo, couples, friends, and family sessions', 'Patient direction for camera-shy clients'],
    },
    commercial: {
      eyebrow: 'Commercial Photography',
      title: 'Commercial images that are clean, useful, and lasting',
      copy: 'Commercial shoots are planned around real usage: social media, websites, promo visuals, event recaps, or brand content.',
      bullets: ['Brand content and business profiles', 'Space, people, product, and service scenes', 'Photo and video work available by request'],
    },
    about: {
      eyebrow: 'About',
      title: 'About',
      paragraphs: [
        'I am Manyousang Z, also known as Xiao Z, a University of Sydney student based in Sydney.',
        'I shoot portraits, seaside sessions, street photos, graduation, society events, and commercial work. I am comfortable with different styles and can handle both photo and video. During shoots, I guide patiently and keep the atmosphere relaxed, especially for camera-shy clients.',
        'For Sydney private sessions or commercial collaborations, feel free to message me directly or contact me by email or WeChat.',
      ],
    },
    process: {
      eyebrow: 'Process',
      title: 'How it works',
      copy: 'A simple process makes the shoot easier, especially for first-time or camera-shy clients.',
      steps: [
        ['01', 'Brief', 'Confirm shoot type, date, location, people, budget, and references.'],
        ['02', 'Route', 'Plan location, timing, outfits, and the overall shoot rhythm.'],
        ['03', 'Shoot', 'Patient direction on posing and expression, plus natural candid moments.'],
        ['04', 'Deliver', 'Selected, edited, and color-graded photos delivered through an online link.'],
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Sydney bookings / commercial collaborations',
      copy: 'When enquiring, send the shoot type, date, location, number of people, and any reference style you like.',
      phone: 'Phone',
      wechat: 'WeChat',
      email: 'Email',
      instagram: 'Instagram',
      douyin: 'Douyin',
      xiaohongshu: 'Xiaohongshu',
      cta: 'Email enquiry',
    },
    footer: 'Sydney photography portfolio',
  },
}

const contactInfo = {
  phoneDisplay: '0481 913 620',
  phoneHref: 'tel:+61481913620',
  wechat: 'o3530130',
  email: 'zmail2714@gmail.com',
  emailHref: 'mailto:zmail2714@gmail.com',
  instagram: 'zovc_zh',
  instagramHref: 'https://www.instagram.com/zovc_zh',
  douyin: '78287670797',
  xiaohongshu: '2826662526',
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-widerest text-taupe">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 text-sm leading-7 text-zinc-600 sm:text-base">{copy}</p> : null}
    </div>
  )
}

export default function App() {
  const [language, setLanguage] = useState('zh')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('private')
  const [openSubcategories, setOpenSubcategories] = useState([])

  const t = content[language]

  const groupedWorks = useMemo(() => {
    const categoryWorks = works.filter((work) => work.category === activeCategory)
    const groups = new Map()

    categoryWorks.forEach((work) => {
      if (!groups.has(work.subcategoryKey)) {
        groups.set(work.subcategoryKey, {
          key: work.subcategoryKey,
          zhLabel: subcategoryLabels.zh[work.subcategoryZh] ?? work.subcategoryZh,
          enLabel: subcategoryLabels.en[work.subcategoryZh] ?? work.subcategoryEn,
          works: [],
        })
      }

      groups.get(work.subcategoryKey).works.push(work)
    })

    const order = subcategoryOrder[activeCategory] ?? []
    return [...groups.values()].sort((a, b) => {
      const aIndex = order.indexOf(a.key)
      const bIndex = order.indexOf(b.key)
      const normalizedA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex
      const normalizedB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex
      return normalizedA - normalizedB
    })
  }, [activeCategory])

  useEffect(() => {
    setOpenSubcategories(groupedWorks[0] ? [groupedWorks[0].key] : [])
  }, [groupedWorks])

  function handleCategoryChange(category) {
    setActiveCategory(category)
  }

  function closeSubcategory(key) {
    const albumSection = document.getElementById(`album-${key}`)

    setOpenSubcategories((current) => current.filter((item) => item !== key))

    window.requestAnimationFrame(() => {
      if (albumSection) {
        albumSection.scrollIntoView({ block: 'start' })
      }
    })
  }

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    document.title = language === 'zh' ? '漫游桑Z｜小Z拍了拍悉尼' : 'Manyousang Z | Sydney Photography'
  }, [language])


  useEffect(() => {
    const scrollToHashTarget = () => {
      if (!window.location.hash) return
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      if (!target) return

      window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'start' })
      })
    }

    scrollToHashTarget()
    window.addEventListener('hashchange', scrollToHashTarget)

    return () => window.removeEventListener('hashchange', scrollToHashTarget)
  }, [])


  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollMotion = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY >= lastScrollY ? 'down' : 'up'
      const portfolioSection = document.getElementById('portfolio')
      const portfolioRect = portfolioSection?.getBoundingClientRect()
      const viewingPortfolio =
        location.hash === '#portfolio' ||
        (portfolioRect && portfolioRect.top < window.innerHeight * 0.9 && portfolioRect.bottom > window.innerHeight * 0.08)

      document.documentElement.dataset.scrollDirection = direction
      document.documentElement.dataset.viewingPortfolio = viewingPortfolio ? 'true' : 'false'
      document.documentElement.style.setProperty('--scroll-y', `${currentScrollY}px`)
      document.documentElement.style.setProperty('--scroll-sway', `${Math.sin(currentScrollY / 360) * 18}px`)

      if (viewingPortfolio) {
        document.documentElement.style.setProperty('--decor-shift-slow', '0px')
        document.documentElement.style.setProperty('--decor-shift-fast', '0px')
        document.documentElement.style.setProperty('--decor-tilt', '0deg')
      } else {
        document.documentElement.style.setProperty('--decor-shift-slow', `${currentScrollY * -0.018}px`)
        document.documentElement.style.setProperty('--decor-shift-fast', `${currentScrollY * -0.045}px`)
        document.documentElement.style.setProperty('--decor-tilt', `${Math.sin(currentScrollY / 520) * 5}deg`)
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollMotion)
        ticking = true
      }
    }

    updateScrollMotion()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    window.addEventListener('hashchange', handleScroll)
    const delayedChecks = [
      window.setTimeout(updateScrollMotion, 350),
      window.setTimeout(updateScrollMotion, 900),
      window.setTimeout(updateScrollMotion, 1500),
    ]

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('hashchange', handleScroll)
      delayedChecks.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  useEffect(() => {
    const portfolioSection = document.getElementById('portfolio')
    if (!portfolioSection || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (location.hash === '#portfolio' || entry.isIntersecting) {
          document.documentElement.dataset.viewingPortfolio = 'true'
          document.documentElement.style.setProperty('--decor-shift-slow', '0px')
          document.documentElement.style.setProperty('--decor-shift-fast', '0px')
          document.documentElement.style.setProperty('--decor-tilt', '0deg')
        } else {
          document.documentElement.dataset.viewingPortfolio = 'false'
        }
      },
      { threshold: 0.08, rootMargin: '-6% 0px -18% 0px' },
    )

    observer.observe(portfolioSection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const magneticItems = [...document.querySelectorAll('a[href], button')]

    const handlePointerMove = (event) => {
      magneticItems.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = event.clientX - centerX
        const distanceY = event.clientY - centerY
        const distance = Math.hypot(distanceX, distanceY)
        const radius = Math.max(96, Math.min(170, rect.width * 1.35))

        if (distance < radius) {
          const strength = (1 - distance / radius) * 10
          const moveX = (distanceX / radius) * strength
          const moveY = (distanceY / radius) * strength

          element.style.setProperty('--magnet-x', `${moveX}px`)
          element.style.setProperty('--magnet-y', `${moveY}px`)
          element.classList.add('is-magnetic')
        } else {
          element.style.setProperty('--magnet-x', '0px')
          element.style.setProperty('--magnet-y', '0px')
          element.classList.remove('is-magnetic')
        }
      })
    }

    const resetMagnet = () => {
      magneticItems.forEach((element) => {
        element.style.setProperty('--magnet-x', '0px')
        element.style.setProperty('--magnet-y', '0px')
        element.classList.remove('is-magnetic')
      })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', resetMagnet, { passive: true })
    window.addEventListener('pointerleave', resetMagnet)

    return () => {
      resetMagnet()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', resetMagnet)
      window.removeEventListener('pointerleave', resetMagnet)
    }
  }, [language, menuOpen, activeCategory, openSubcategories])

  useEffect(() => {
    document.documentElement.classList.remove('motion-ready')
    const observedElements = document.querySelectorAll(
      '.section-reveal, .album-reveal, .portfolio-photo-reveal',
    )
    const getHiddenOffset = () =>
      document.documentElement.dataset.scrollDirection === 'up' ? '-42px' : '58px'

    const moveElement = (element, y, scale = 1) => {
      if (element.classList.contains('section-reveal')) {
        element.style.transform = `translateY(${y})`
        return
      }

      element.style.transform = `translateY(${y}) scale(${scale})`
    }

    const revealElement = (element) => {
      element.classList.add('is-visible')
      element.style.setProperty('--section-y', '0px')
      element.style.setProperty('--reveal-y', '0px')
      element.style.setProperty('--reveal-scale', '1')
      moveElement(element, '0px', 1)
      window.setTimeout(() => {
        if (element.classList.contains('is-visible')) {
          element.style.transform = ''
        }
      }, 900)
    }

    const hideElement = (element) => {
      const rect = element.getBoundingClientRect()
      const resetBuffer = 220

      if (rect.bottom > -resetBuffer && rect.top < window.innerHeight + resetBuffer) {
        return
      }

      if (!element.classList.contains('is-visible')) {
        return
      }

      const y = getHiddenOffset()

      element.classList.remove('is-visible')
      element.style.setProperty('--section-y', y)
      element.style.setProperty('--reveal-y', y)
      element.style.setProperty('--reveal-scale', '0.972')
      moveElement(element, y, 0.972)
    }

    if (!('IntersectionObserver' in window)) {
      observedElements.forEach((element) => revealElement(element))
      return undefined
    }

    document.documentElement.classList.add('motion-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains('is-visible')) {
              revealElement(entry.target)
            }
          } else {
            hideElement(entry.target)
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '180px 0px 180px 0px',
      },
    )

    observedElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        revealElement(element)
      }

      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [activeCategory, openSubcategories])

  return (
    <div className="site-shell min-h-screen bg-paper text-ink">
      <div className="background-decor" aria-hidden="true">
        <img className="decor decor-aperture" src="/images/decor/aperture.svg" alt="" />
        <img className="decor decor-frame" src="/images/decor/viewfinder.svg" alt="" />
        <img className="decor decor-film" src="/images/decor/film-strip.svg" alt="" />
        <img className="decor decor-spark" src="/images/decor/light-leak.svg" alt="" />
        <img className="decor decor-aperture-soft" src="/images/decor/aperture.svg" alt="" />
        <img className="decor decor-frame-small" src="/images/decor/viewfinder.svg" alt="" />
        <img className="decor decor-film-left" src="/images/decor/film-strip.svg" alt="" />
        <img className="decor decor-focus-ring" src="/images/decor/aperture.svg" alt="" />
        <img className="decor decor-light-right" src="/images/decor/light-leak.svg" alt="" />
        <img className="decor decor-film-far" src="/images/decor/film-strip.svg" alt="" />
        <img className="decor decor-frame-bottom" src="/images/decor/viewfinder.svg" alt="" />
      </div>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-paper/95 shadow-[0_12px_40px_rgba(23,23,23,0.045)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="#top" className="brand-lockup flex items-baseline gap-3">
            <span className="brand-mark font-serif text-xl tracking-[0.12em]">{t.brand}</span>
            <span className="brand-subtitle hidden text-xs uppercase tracking-[0.24em] text-taupe sm:inline">{t.studio}</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-zinc-700 lg:flex">
            {t.nav.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-black">{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-black/10 px-4 py-2 text-sm transition hover:border-black/20 hover:bg-white"
              onClick={() => {
                setLanguage((current) => (current === 'zh' ? 'en' : 'zh'))
                setMenuOpen(false)
              }}
              aria-label="Switch language"
            >
              {t.switchLabel}
            </button>
            <button
              type="button"
              className="rounded-full border border-black/10 px-4 py-2 text-sm"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
            >
              Menu
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="border-t border-black/5 px-5 py-4">
            <div className="mx-auto grid max-w-7xl gap-3 text-sm text-zinc-700">
              {t.nav.map(([label, href]) => (
                <a key={href} href={href} className="py-1" onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <div className="portfolio-floating-switcher" aria-label="Portfolio quick switch">
        <p className="portfolio-floating-label">Portfolio</p>
        <div className="portfolio-floating-actions">
          {portfolioCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={activeCategory === category ? 'is-active' : ''}
            >
              {t.portfolio.categories[category]}
            </button>
          ))}
        </div>
      </div>

      <main id="top" className="pt-[73px]">
        <section className="section-reveal pb-20 lg:pb-28">
          <div className="relative h-52 overflow-hidden bg-mist sm:h-72 lg:h-[360px]">
            <div className="mx-auto h-full max-w-7xl sm:px-8 lg:px-10">
              <img
                src="/images/signature.png"
                alt={language === 'zh' ? '小Z拍了拍悉尼主页封面图' : 'Z Photographs Sydney profile cover'}
                className="h-full w-full object-cover object-center sm:rounded-b-[2rem]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-paper/45" />
          </div>

          <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10">
            <div className="hero-content">
                <div className="mb-6 flex items-end gap-4">
                  <div className="-mt-14 grid h-24 w-24 shrink-0 place-items-center rounded-full border-4 border-white bg-paper shadow-lg sm:h-28 sm:w-28">
                    <span className="font-serif text-4xl">Z</span>
                  </div>
                  <div className="pb-2 pt-1">
                    <p className="text-xs font-medium uppercase tracking-widerest text-taupe">{t.hero.eyebrow}</p>
                    <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-5xl">{t.brand}</h1>
                    <p className="mt-1 text-sm text-zinc-500">{t.studio}</p>
                  </div>
                </div>

                <h2 className="hero-title max-w-3xl font-serif text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
                  {language === 'zh' ? (
                    <>
                      <span className="block">为你在悉尼的每一次出现，</span>
                      <span className="block">留下更有质感的影像。</span>
                    </>
                  ) : (
                    t.hero.title
                  )}
                </h2>
                <p className="hero-copy hero-copy-card mt-7 text-sm leading-8 text-zinc-600 sm:text-base lg:text-lg">{t.hero.copy}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#portfolio" className="rounded-full bg-ink px-5 py-3 text-sm text-white transition hover:bg-black">{t.hero.primary}</a>
                  <a href="#contact" className="rounded-full border border-black/10 px-5 py-3 text-sm transition hover:border-black/20 hover:bg-paper">{t.hero.secondary}</a>
                </div>
            </div>

          </div>
        </section>

        <section id="portfolio" className="section-reveal mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <SectionHeading eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} copy={t.portfolio.copy} />

          <div className="portfolio-layout mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="portfolio-sidebar self-start rounded-[1.75rem] border border-black/5 bg-white/55 p-3 lg:sticky lg:top-28">
              <div className="grid gap-2">
                {portfolioCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`rounded-2xl px-4 py-4 text-left transition ${
                      activeCategory === category
                        ? 'bg-ink text-white'
                        : 'text-zinc-700 hover:bg-paper'
                    }`}
                  >
                    <span className="font-serif text-2xl">{t.portfolio.categories[category]}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="grid gap-4">
              {groupedWorks.map((group) => (
                <section
                  key={group.key}
                  id={`album-${group.key}`}
                  className="album-reveal scroll-mt-28 rounded-[1.75rem] border border-black/5 bg-white/45"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpenSubcategories((current) =>
                        current.includes(group.key)
                          ? current.filter((key) => key !== group.key)
                          : [...current, group.key],
                      )
                    }}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <div>
                      <p className="album-kicker text-xs uppercase tracking-widerest">
                        {t.portfolio.categories[activeCategory]}
                      </p>
                      <h3 className="mt-2 font-serif text-3xl">
                        {language === 'zh' ? group.zhLabel : group.enLabel}
                      </h3>
                    </div>
                    <span className="rounded-full border border-black/10 px-4 py-2 text-sm text-zinc-500">
                      {openSubcategories.includes(group.key)
                        ? language === 'zh'
                          ? '收起'
                          : 'Close'
                        : language === 'zh'
                          ? '展开'
                          : 'Open'}
                    </span>
                  </button>

                  {openSubcategories.includes(group.key) ? (
                  <div className="px-5 pb-5">
                    <div className="portfolio-grid grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                      {group.works.map((work) => (
                        <article key={work.src} className="portfolio-photo-reveal">
                          <div className="portfolio-photo-card group relative overflow-hidden rounded-3xl bg-white">
                            <img
                              src={work.src}
                              alt={language === 'zh' ? work.zhTitle : work.enTitle}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                            <span className="absolute bottom-3 right-3 rounded-full bg-paper/90 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-ink backdrop-blur">
                              {t.portfolio.categories[work.category]}
                            </span>
                          </div>
                        </article>
                      ))}
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => closeSubcategory(group.key)}
                        className="rounded-full border border-black/10 px-4 py-2 text-sm text-zinc-500 transition hover:border-black/20 hover:bg-paper"
                      >
                        {language === 'zh' ? '收起' : 'Close'}
                      </button>
                    </div>
                  </div>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-reveal border-y border-black/5 bg-white/60">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
            <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} copy={t.services.copy} />
            <div className="services-grid mt-12 grid gap-6">
              {t.services.items.map(([title, description], index) => {
                const visual = serviceVisuals[index]
                return (
                  <article
                    key={title}
                    className="service-card group grid overflow-hidden rounded-[2rem] border border-black/5 bg-paper shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
                  >
                    <div className="service-visual overflow-hidden bg-mist">
                      <img
                        src={visual.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="service-copy flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                      <p className="text-xs uppercase tracking-widerest text-taupe">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">{title}</h3>
                      <p className="mt-5 max-w-3xl text-sm leading-8 text-zinc-600 sm:text-base">
                        {description}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="booking" className="section-reveal mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <SectionHeading eyebrow={t.booking.eyebrow} title={t.booking.title} copy={t.booking.copy} />
          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2">
            {[
              ['/images/posters/graduation-poster.webp', t.booking.posters[0]],
              ['/images/posters/daily-poster.webp', t.booking.posters[1]],
            ].map(([src, title]) => (
              <article
                key={src}
                className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-soft"
              >
                <div className="grid aspect-[4/5] place-items-center bg-[#dcebfa]">
                  <img
                    src={src}
                    alt={title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex min-h-24 items-center justify-center border-t border-black/5 p-5 text-center">
                  <h3 className="font-serif text-2xl">{title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section-reveal mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} copy={t.process.copy} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map(([number, title, description]) => (
              <article key={number} className="rounded-3xl border border-black/5 p-6">
                <p className="text-xs uppercase tracking-widerest text-taupe">{number}</p>
                <h3 className="mt-6 font-serif text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-reveal px-5 pb-20 pt-4 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-ink px-6 py-10 text-white sm:px-10 sm:py-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-widerest text-white/60">{t.contact.eyebrow}</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">{t.contact.title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">{t.contact.copy}</p>
                <a href={contactInfo.emailHref} className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm text-ink transition hover:bg-mist">{t.contact.cta}</a>
              </div>

              <div className="grid gap-3 text-sm text-white/80 sm:grid-cols-2 lg:text-right">
                <ContactLine label={t.contact.phone} value={contactInfo.phoneDisplay} href={contactInfo.phoneHref} />
                <ContactLine label={t.contact.wechat} value={contactInfo.wechat} />
                <ContactLine label={t.contact.email} value={contactInfo.email} href={contactInfo.emailHref} />
                <ContactLine label={t.contact.instagram} value={`@${contactInfo.instagram}`} href={contactInfo.instagramHref} />
                <ContactLine label={t.contact.douyin} value={contactInfo.douyin} />
                <ContactLine label={t.contact.xiaohongshu} value={contactInfo.xiaohongshu} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 px-5 py-6 text-sm text-zinc-500 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {t.brand}. All rights reserved.</p>
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  )
}

function ContactLine({ label, value, href }) {
  const content = (
    <>
      <span className="block text-xs uppercase tracking-[0.2em] text-white/45">{label}</span>
      <span className="mt-1 block text-white">{value}</span>
    </>
  )

  if (href) {
    return <a href={href} className="contact-card rounded-2xl border border-white/10 p-4 transition hover:border-white/30">{content}</a>
  }

  return <div className="contact-card rounded-2xl border border-white/10 p-4">{content}</div>
}
