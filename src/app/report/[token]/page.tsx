import './report-styles.css'
import PrintButton from './PrintButton'
import ReactMarkdown from 'react-markdown'

interface ReportData {
  report: string
  status: 'ready' | 'generating'
}

interface Section {
  title: string
  emoji: string
  content: string
  tag: string
}

const SECTION_TAGS: { key: string; tag: string }[] = [
  { key: 'BIRTHDAY NUMBER', tag: 'CORE GIFT' },
  { key: 'LIFE CYCLE', tag: 'ACTIVE PHASE' },
  { key: 'PINNACLE', tag: 'BACKGROUND CLIMATE' },
  { key: 'PERSONAL YEAR', tag: 'YEARLY THEME' },
  { key: 'PERSONAL MONTH', tag: 'THIS MONTH' },
  { key: 'CONNECT', tag: 'SYNTHESIS' },
  { key: 'CHAPTER', tag: 'INTEGRATION' },
  { key: 'ABOUT', tag: 'LEGAL NOTE' },
]

function getTag(title: string): string {
  const upper = title.toUpperCase()
  return SECTION_TAGS.find(({ key }) => upper.includes(key))?.tag ?? 'REFLECTION'
}

function extractEmoji(title: string): { emoji: string; clean: string } {
  const match = title.match(/^([\p{Emoji_Presentation}\p{Extended_Pictographic}✨🌀🏔🔗🌙🌟📋✦★◆\s]+)/u)
  if (match) {
    return { emoji: match[1].trim(), clean: title.slice(match[1].length).trim() }
  }
  return { emoji: '', clean: title }
}

function parseReport(text: string): {
  calculationsSummary: string
  sections: Section[]
} {
  const lines = text.split('\n')

  let calculationsSummary = ''
  const sections: Section[] = []
  let inCalculations = false
  let inReport = false
  let currentSection: Section | null = null

  for (const line of lines) {
    if (/^## CALCULATIONS/i.test(line) || /^## CALC/i.test(line)) {
      inCalculations = true
      inReport = false
      if (currentSection) { sections.push(currentSection); currentSection = null }
      continue
    }

    if (/^# (YOUR|LAYER)/i.test(line) && inCalculations) {
      inCalculations = false
      inReport = true
      continue
    }

    if (/^## /.test(line) && inReport) {
      if (currentSection) sections.push(currentSection)
      const rawTitle = line.replace(/^## /, '').trim()
      const { emoji, clean } = extractEmoji(rawTitle)
      currentSection = { title: clean, emoji, content: '', tag: getTag(rawTitle) }
      continue
    }

    if (/^### /.test(line)) {
      const subTitle = line.replace(/^### /, '').trim()
      if (inCalculations) {
        calculationsSummary += `\n**${subTitle}**\n`
      } else if (currentSection) {
        currentSection.content += `\n**${subTitle}**\n`
      }
      continue
    }

    if (/^---+$/.test(line.trim())) continue
    if (/^# /.test(line)) continue

    if (inCalculations) {
      calculationsSummary += line + '\n'
    } else if (inReport && currentSection) {
      currentSection.content += line + '\n'
    }
  }

  if (currentSection) sections.push(currentSection)

  return {
    calculationsSummary: calculationsSummary.trim(),
    sections: sections.filter(s => !s.tag.includes('LEGAL')),
  }
}

function MarkdownBlock({ children, pClass = 'rw-p' }: { children: string; pClass?: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className={pClass}>{children}</p>,
        strong: ({ children }) => <strong style={{ fontWeight: 500, color: 'inherit' }}>{children}</strong>,
        em: ({ children }) => <em className="rw-em">{children}</em>,
        blockquote: ({ children }) => (
          <div className="rw-callout">
            <div className="rw-callout-text">{children}</div>
          </div>
        ),
        h3: ({ children }) => <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: '#C17F5A', margin: '20px 0 8px' }}>{children}</p>,
        h4: ({ children }) => <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: '#C17F5A', margin: '20px 0 8px' }}>{children}</p>,
        ul: ({ children }) => <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>{children}</ul>,
        li: ({ children }) => <li className="rw-p" style={{ paddingLeft: 16, position: 'relative' }}>{children}</li>,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

async function getReport(token: string): Promise<ReportData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/numerology-layer2?token=${token}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const data = await getReport(token)

  if (!data || data.status === 'generating') {
    return (
      <div className="rw" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="rw-wordmark">Life Path Numerology</div>
          <p className="rw-p" style={{ color: '#9B8E82', marginTop: 24 }}>
            Your report is being prepared...
          </p>
        </div>
      </div>
    )
  }

  const { calculationsSummary, sections } = parseReport(data.report)
  const sectionLabels = ['01', '02', '03', '04', '05', '06', '07', '08']
  const generatedDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="rw">

      {/* Hero */}
      <div className="rw-hero">
        <div className="rw-wordmark">Life Path Numerology</div>
        <h1 className="rw-title">Your Personal Report</h1>
        <div className="rw-sub">Layer 2 — Deep Analysis</div>
        <div className="rw-chips">
          <div className="rw-chip">Generated <span>{generatedDate}</span></div>
          <div className="rw-chip">Personalised <span>to your birth date</span></div>
        </div>
      </div>

      {/* Divider */}
      <div className="rw-divider">
        <div className="rw-divider-line" />
        <div className="rw-divider-dot" />
        <div className="rw-divider-dot" style={{ opacity: 0.4 }} />
        <div className="rw-divider-dot" style={{ opacity: 0.2 }} />
        <div className="rw-divider-line" />
      </div>

      <div className="rw-body">

        <PrintButton />

        {/* Calculations summary */}
        {calculationsSummary && (
          <div className="rw-section" style={{ marginBottom: 40 }}>
            <div className="rw-section-header">
              <span className="rw-section-num">00</span>
              <h2 className="rw-section-title">Your Numbers</h2>
              <span className="rw-section-tag">Calculations</span>
            </div>
            <div className="rw-section-body">
              <MarkdownBlock>{calculationsSummary}</MarkdownBlock>
            </div>
          </div>
        )}

        {/* Main sections */}
        {sections.map((section, i) => {
          const isSynthesis = section.tag === 'SYNTHESIS' || section.tag === 'INTEGRATION'

          if (isSynthesis) {
            return (
              <div key={i} className="rw-synthesis">
                <span className="rw-synth-label">✦ &nbsp; {section.title} &nbsp; ✦</span>
                <div className="rw-synth-rule" />
                <MarkdownBlock pClass="rw-synth-p">{section.content.trim()}</MarkdownBlock>
              </div>
            )
          }

          return (
            <div key={i} className="rw-section">
              <div className="rw-section-header">
                <span className="rw-section-num">{sectionLabels[i] ?? `0${i + 1}`}</span>
                <h2 className="rw-section-title">{section.title}</h2>
                <span className="rw-section-tag">{section.tag}</span>
              </div>
              <div className="rw-section-body">
                <MarkdownBlock>{section.content.trim()}</MarkdownBlock>
              </div>
            </div>
          )
        })}

        {/* Disclaimer */}
        <div className="rw-disclaimer">
          <p>
            This report is provided for entertainment and personal self-reflection purposes only.
            Numerology is a centuries-old symbolic tradition and is not a science. Nothing in this
            report constitutes medical, psychological, financial, or legal advice. Results are based
            on numerological interpretation and should not be used as the basis for any life decision.
            Individual results may vary. You remain solely responsible for any decisions you make.
          </p>
          <p style={{ marginTop: 8 }}>
            &copy; Life Path Numerology Calculator — for personal use only.
          </p>
        </div>

      </div>
    </div>
  )
}
