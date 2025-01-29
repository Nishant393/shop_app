import { Github, Linkedin, Mail } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='m-auto' >
      <footer className="bg-black text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Nishant393" className="hover:text-blue-400">
              <Github size={24} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Linkedin size={24} />
            </a>
            <a href="mailto:nishantpawar393@gmail.com" className="hover:text-blue-400">
              <Mail size={24} />
            </a>
          </div>
          <p className="text-center mt-4 text-gray-400">
            © {new Date().getFullYear()} Nishant Pawar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
