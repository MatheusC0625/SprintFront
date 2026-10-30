import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Solucao from './pages/Solucao'
import Integrantes from './pages/Integrantes'
import IntegranteDetalhe from './pages/IntegranteDetalhe'
import Faq from './pages/Faq'
import Contato from './pages/Contato'
import Missoes from './pages/Missoes'
import MissaoDetalhe from './pages/MissaoDetalhe'
import Ranking from './pages/Ranking'
import Carteira from './pages/Carteira'
import Usuarios from './pages/Usuarios'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="solucao" element={<Solucao />} />
          <Route path="missoes" element={<Missoes />} />
          <Route path="missoes/:id" element={<MissaoDetalhe />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="carteira" element={<Carteira />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="integrantes" element={<Integrantes />} />
          <Route path="integrantes/:id" element={<IntegranteDetalhe />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contato" element={<Contato />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
