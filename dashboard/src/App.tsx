import { craft } from '@dennerrondinely/tailor'
import { Sidebar } from '@/components/tailor/Sidebar'
import { Topbar } from '@/components/tailor/Topbar'
import { DashboardPage } from '@/pages/DashboardPage'

const Layout = craft('div')({
  base: 'flex h-screen overflow-hidden bg-background',
})

const Main = craft('div')({
  base: 'flex flex-1 flex-col overflow-hidden',
})

const Content = craft('main')({
  base: 'flex-1 overflow-y-auto p-6',
})

export default function App() {
  return (
    <Layout>
      <Sidebar />
      <Main>
        <Topbar />
        <Content>
          <DashboardPage />
        </Content>
      </Main>
    </Layout>
  )
}
