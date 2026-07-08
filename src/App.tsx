import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './Components/Game'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/header" element={<Header />} />
            <Route path="/" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
