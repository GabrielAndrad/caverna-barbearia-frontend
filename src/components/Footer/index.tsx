import React from 'react'
import './index.scss'

const Footer = () => {
  const texto = 'Olá, tudo bem? Gostaria de tirar algumas duvidas sobre o agendamento.'

  return (
    <footer className="landing-footer">
      <strong>CAVERNA BARBEARIA</strong>
      <p>Siga a gente nas redes sociais</p>
      <div className="landing-footer__socials">
        <a href="https://www.instagram.com/_capitao_cavernna/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="social-icon__dot" /></svg>
        </a>
        <a href={`https://api.whatsapp.com/send?phone=5515%99189-1072&text=${encodeURIComponent(texto)}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.3-.4.7-.4.9 0l.7 1.4c.2.3.1.6-.1.8l-.6.5c.6 1.2 1.5 2.1 2.7 2.7l.5-.6c.2-.2.5-.3.8-.1l1.4.7c.4.2.4.6 0 .9-.5.6-1.3.9-2.1.7-2.6-.7-5-3.1-5.7-5.7-.2-.8.1-1.6.7-2.1Z" /></svg>
        </a>
        <a href="https://www.facebook.com/gabriel.ibanhes.3" target="_blank" rel="noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2V4.5c-.4-.1-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V11H7v3.5h2.3V21H13v-6.5h2.8l.5-3.5H13V9c0-.7.2-1 1-1Z" className="social-icon--filled" /></svg>
        </a>
      </div>
      <small>© 2026 Caverna Barbearia</small>
    </footer>
  )
}

export default Footer
