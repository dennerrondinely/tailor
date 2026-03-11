/**
 * TailorShowcase — a tab panel that shows all tailor APIs in action
 * This is the "playground" area of the dashboard
 */
import { craft, stitch } from '@dennerrondinely/tailor'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from './Button'
import { Badge } from './Badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'

// ── Section: Variants demo ───────────────────────────────────────

const DemoSection = craft('section')({
  base: 'space-y-3',
  nested: stitch({
    'h3': 'text-sm font-semibold text-muted-foreground uppercase tracking-wider',
  }),
})

const Row = craft('div')({
  base: 'flex flex-wrap items-center gap-3',
})

// ── Section: Nested selectors demo ──────────────────────────────

const ArticlePreview = craft('article')({
  base: 'rounded-lg border p-6 text-sm leading-relaxed max-w-lg bg-card',
  nested: stitch({
    'h4':         'text-base font-bold mb-2 text-foreground',
    'p':          'mb-3 text-muted-foreground',
    'p > strong': 'text-foreground font-semibold',
    'ul':         'list-disc pl-5 mb-3 text-muted-foreground space-y-1',
    'code':       'bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground',
    '[data-highlight]': 'bg-primary/10 text-primary px-1 rounded',
  }),
})

// ── Section: Animation demo ──────────────────────────────────────

const Spinner = craft('div')({
  base: 'h-8 w-8 rounded-full border-2 border-primary border-t-transparent',
  animation: { type: 'spin' },
})

const Pulsing = craft('div')({
  base: 'h-8 w-8 rounded-full bg-primary/30',
  animation: { type: 'pulse' },
})

const Bouncing = craft('div')({
  base: 'h-3 w-3 rounded-full bg-primary',
  animation: { type: 'bounce' },
})

// ── Section: Dynamic classes demo ───────────────────────────────

interface LoaderBtnProps { loading?: boolean }

const LoaderButton = craft<LoaderBtnProps>('button')({
  base: 'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all border',
  dynamic: {
    'opacity-60 cursor-not-allowed': (p) => !!p.loading,
    'bg-primary text-primary-foreground hover:bg-primary/90': (p) => !p.loading,
    'bg-muted text-muted-foreground': (p) => !!p.loading,
  },
})

// ── Showcase component ───────────────────────────────────────────

export function TailorShowcase() {
  return (
    <Card elevation="raised" padding="lg">
      <CardHeader>
        <CardTitle>Tailor Showcase</CardTitle>
        <CardDescription>
          Every component on this card is built with <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">@dennerrondinely/tailor</code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="variants" className="mt-4">
          <TabsList>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="nested">Nested</TabsTrigger>
            <TabsTrigger value="animation">Animation</TabsTrigger>
            <TabsTrigger value="dynamic">Dynamic</TabsTrigger>
            <TabsTrigger value="polymorphic">Polymorphic</TabsTrigger>
          </TabsList>

          {/* ── Variants ── */}
          <TabsContent value="variants" className="space-y-6 pt-4">
            <DemoSection>
              <h3>Button — variant prop</h3>
              <Row>
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </Row>
            </DemoSection>

            <DemoSection>
              <h3>Button — size prop</h3>
              <Row>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </Row>
            </DemoSection>

            <DemoSection>
              <h3>Badge — intent prop</h3>
              <Row>
                <Badge intent="default">Default</Badge>
                <Badge intent="secondary">Secondary</Badge>
                <Badge intent="success">Success</Badge>
                <Badge intent="warning">Warning</Badge>
                <Badge intent="info">Info</Badge>
                <Badge intent="destructive">Error</Badge>
                <Badge intent="outline">Outline</Badge>
              </Row>
            </DemoSection>

            <DemoSection>
              <h3>Card — elevation + intent (compound variant)</h3>
              <Row>
                <Card elevation="flat"    intent="default" padding="sm" className="w-32 text-center text-xs">flat / default</Card>
                <Card elevation="raised"  intent="muted"   padding="sm" className="w-32 text-center text-xs">raised / muted</Card>
                <Card elevation="floating" intent="accent"  padding="sm" className="w-32 text-center text-xs">floating / accent</Card>
              </Row>
            </DemoSection>
          </TabsContent>

          {/* ── Nested selectors ── */}
          <TabsContent value="nested" className="pt-4">
            <DemoSection>
              <h3>stitch() — CSS-like selectors on article content</h3>
              <ArticlePreview>
                <h4>Getting started with Tailor</h4>
                <p>
                  Use <code>craft()</code> to define components. Apply{' '}
                  <strong>variants</strong> for semantic states.
                </p>
                <ul>
                  <li>HTML tag selectors: <code>h1</code>, <code>p</code></li>
                  <li>Class selectors: <code>.icon</code></li>
                  <li>Descendant: <code>p &gt; a</code></li>
                  <li>Attribute: <code>[data-highlight]</code></li>
                </ul>
                <p>
                  The <span data-highlight>nested selector engine</span> runs at
                  render time and produces stable class strings.
                </p>
              </ArticlePreview>
            </DemoSection>
          </TabsContent>

          {/* ── Animation ── */}
          <TabsContent value="animation" className="pt-4">
            <DemoSection>
              <h3>spinThread() — animation helpers</h3>
              <Row>
                <div className="flex flex-col items-center gap-2">
                  <Spinner />
                  <span className="text-xs text-muted-foreground">spin</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Pulsing />
                  <span className="text-xs text-muted-foreground">pulse</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Bouncing />
                  <span className="text-xs text-muted-foreground">bounce</span>
                </div>
              </Row>
            </DemoSection>
          </TabsContent>

          {/* ── Dynamic ── */}
          <TabsContent value="dynamic" className="pt-4">
            <DemoSection>
              <h3>dynamic — prop-driven class conditions</h3>
              <Row>
                <LoaderButton>Ready</LoaderButton>
                <LoaderButton loading>Loading…</LoaderButton>
              </Row>
            </DemoSection>
          </TabsContent>

          {/* ── Polymorphic ── */}
          <TabsContent value="polymorphic" className="pt-4">
            <DemoSection>
              <h3>as prop — render as any element</h3>
              <Row>
                <Button>button (default)</Button>
                <Button as="a" href="#" target="_blank" rel="noreferrer">
                  anchor tag
                </Button>
                <Button as="div" role="button" tabIndex={0}>
                  div role=button
                </Button>
              </Row>
            </DemoSection>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
