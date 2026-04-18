import { useState } from 'react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    services: [],
    address: '',
    city: '',
    state: '',
    postal: '',
    country: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        services: checked 
          ? [...prev.services, value]
          : prev.services.filter(s => s !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create form data object
    const formDataToSend = new FormData(e.target)
    
    // Send to Formspree
    fetch('https://formspree.io/f/xvgonjvn', {
      method: 'POST',
      body: formDataToSend,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        alert('Thank you for signing up! We will contact you soon.')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          services: [],
          address: '',
          city: '',
          state: '',
          postal: '',
          country: ''
        })
        e.target.reset()
      } else {
        alert('There was an error submitting the form. Please try again.')
      }
    }).catch(error => {
      console.error('Error:', error)
      alert('There was an error submitting the form. Please try again.')
    })
  }

  const services = [
    {
      id: 1,
      title: 'Purpose-Driven Waste Separation',
      desc: 'Weekly household collections with recycling bags',
      day: 'Wednesdays',
      image: '/Services/Purpose-Driven Waste Separation.jpg'
    },
    {
      id: 2,
      title: 'Purposeful School Recycling',
      desc: 'Educational recycling programs for schools',
      day: 'Thursdays',
      image: '/Services/Purposeful School Recycling.jpg'
    },
    {
      id: 3,
      title: 'Waste Purpose Solutions',
      desc: 'Business waste collection and management',
      day: 'Fridays',
      image: '/Services/Waste Purpose Solutions.jpg'
    },
    {
      id: 4,
      title: 'Purpose Clean-Up Campaigns',
      desc: 'Community-driven environmental clean-ups',
      image: '/Services/Purpose Clean-Up Campaigns.jpg'
    },
    {
      id: 5,
      title: 'Purpose Clean-Out',
      desc: 'Responsible clearance and recycling services',
      image: '/Services/Purpose Clean-Out.jpg'
    },
    {
      id: 6,
      title: 'Community Engagement & Awareness',
      desc: 'Education and community participation programs',
      image: '/Services/Purpose Community Engagement & Awareness.jpg'
    }
  ]

  const team = [
    {
      id: 1,
      name: 'Shannon Boer',
      position: 'Director & Project Manager',
      image: '/Meet The Team/Shannon Boer.jpg'
    },
    {
      id: 2,
      name: 'Adrian Coxen',
      position: '',
      image: '/Meet The Team/Adrian Coxen.jpg'
    },
    {
      id: 3,
      name: 'Aljeandre Morgan',
      position: '',
      image: '/Meet The Team/Aljeandre Morgan.jpg'
    },
    {
      id: 4,
      name: 'Audrey Caster',
      position: '',
      image: '/Meet The Team/Audrey Caster.jpg'
    },
    {
      id: 5,
      name: 'Charlton Marshall',
      position: '',
      image: '/Meet The Team/Charlton Marshall.jpg'
    },
    {
      id: 6,
      name: 'Ethan Taai',
      position: '',
      image: '/Meet The Team/Ethan Taai.jpg'
    },
    {
      id: 7,
      name: 'Jerome Scholtz',
      position: '',
      image: '/Meet The Team/Jerome Scholtz.jpg'
    },
    {
      id: 8,
      name: 'Leevoo Lawrence',
      position: '',
      image: '/Meet The Team/Leevoo Lawrence.jpg'
    },
    {
      id: 9,
      name: 'Linroy Lewis',
      position: '',
      image: '/Meet The Team/Linroy Lewis.jpg'
    },
    {
      id: 10,
      name: 'Maxwell Mauritz',
      position: '',
      image: '/Meet The Team/Maxwell Mauritz.jpg'
    },
    {
      id: 11,
      name: 'Michael Kok',
      position: '',
      image: '/Meet The Team/Michael Kok.jpg'
    },
    {
      id: 12,
      name: 'Peter Michaels',
      position: '',
      image: '/Meet The Team/Peter Michaels.jpg'
    },
    {
      id: 13,
      name: 'Shanton Jacobs',
      position: '',
      image: '/Meet The Team/Shanton Jacobs.jpg'
    }
  ]

  const partners = [
    {
      id: 1,
      name: 'CCBSA',
      logo: '/Our Partners/CCBSA.jpg'
    },
    {
      id: 2,
      name: 'CJ & PIP',
      logo: '/Our Partners/CJ&PIP.jpg'
    },
    {
      id: 3,
      name: 'EWASA',
      logo: '/Our Partners/EWASA.jpg'
    },
    {
      id: 4,
      name: 'FC',
      logo: '/Our Partners/FC.jpg'
    },
    {
      id: 5,
      name: 'GDEV',
      logo: '/Our Partners/GDEV.png'
    },
    {
      id: 6,
      name: 'MSA',
      logo: '/Our Partners/MSA.jpg'
    },
    {
      id: 7,
      name: 'P',
      logo: '/Our Partners/P.jpg'
    },
    {
      id: 8,
      name: 'POLYCO',
      logo: '/Our Partners/POLYCO.jpg'
    },
    {
      id: 9,
      name: 'PS',
      logo: '/Our Partners/PS.jpg'
    },
    {
      id: 10,
      name: 'PSA',
      logo: '/Our Partners/PSA.jpg'
    },
    {
      id: 11,
      name: 'UNICA',
      logo: '/Our Partners/UNICA.jpg'
    }
  ]

  const recyclingMaterials = [
    {
      title: 'Plastic Waste',
      headline: 'Plastic Never Really Disappears, But It Can Be Reclaimed.',
      image: '/Recycling Knowledge/Plastic.jpg',
      fact: 'Recycling 1 ton of plastic saves over 6,000 kWh of energy.'
    },
    {
      title: 'Paper Waste',
      headline: 'Every Ton of Reclaimed Paper Saves 17 Trees.',
      image: '/Recycling Knowledge/Paper.jpg',
      fact: 'Recycling 1 ton of paper saves enough energy to power an average home for 6 months.'
    },
    {
      title: 'Glass Waste',
      headline: 'Glass Can Be Reused Forever.',
      image: '/Recycling Knowledge/glass.jpg',
      fact: 'Recycling one glass bottle saves enough energy to power a light bulb for 4 hours.'
    },
    {
      title: 'Metal Waste',
      headline: 'Waste Metal = Hidden Treasure.',
      image: '/Recycling Knowledge/Metal.jpg',
      fact: 'Recycling metal reduces the need for mining and saves significant energy.'
    }
  ]

  return (
    <>
      {/* Header/Navigation */}
      <header className="navbar">
        <div className="container navbar-content">
          <div className="logo-section">
            <img src="/Site Icon Logo.jpg" alt="Purpose Recycling Logo" className="logo" />
            <h1 className="brand-name">Purpose Recycling</h1>
          </div>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About Us</a>
            <a href="#team">Team</a>
            <a href="#partners">Our Partners</a>
            <a href="#knowledge">Recycling Knowledge</a>
            <a href="#signup" className="cta-button">Sign Up</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Let's Create A Greener, Cleaner South Africa</h1>
          <p>Join 500+ households in our mission to reduce landfill waste and build a sustainable future</p>
          <a href="#signup" className="hero-button">Get Started Today</a>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Our Services</h2>
          <p className="section-subtitle">Comprehensive waste management solutions for households, schools, and businesses</p>
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <img src={service.image} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                {service.day && <span className="day-badge">{service.day}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Purpose Recycling</h2>
              <p className="highlight">Purpose Recycling is a socially responsible organization committed to developing effective waste management solutions.</p>
              
              <div className="about-blocks">
                <div className="block">
                  <h3>🎯 Our Vision</h3>
                  <p>A waste-free future where recycling and sustainability are integral to everyday life. We aim to revolutionize waste management practices and promote a healthier environment.</p>
                </div>
                
                <div className="block">
                  <h3>💡 Our Mission</h3>
                  <p>As people of faith, we believe that protecting the Earth is a divine imperative. We're committed to honoring this sacred trust, caring for the Earth, and preserving its beauty for future generations.</p>
                </div>
              </div>

              <h3 className="values-title">Our P.U.R.P.O.S.E Values</h3>
              <ul className="values-list">
                <li><strong>P</strong> – Passionate about Sustainability</li>
                <li><strong>U</strong> – Unwavering Commitment</li>
                <li><strong>R</strong> – Responsible Stewardship</li>
                <li><strong>P</strong> – Partnerships for Progress</li>
                <li><strong>O</strong> – Outstanding Quality</li>
                <li><strong>S</strong> – Sustainable Solutions</li>
                <li><strong>E</strong> – Educating and Empowering</li>
              </ul>
            </div>
            <div className="about-image">
              <img src="/About Us/IMG_9597.jpg" alt="About Purpose Recycling" />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="team" className="team">
        <div className="container">
          <h2>Meet the Team</h2>
          <p className="section-subtitle">Dedicated professionals committed to environmental stewardship and community impact</p>
          <div className="team-grid">
            {team.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} className="team-image" />
                </div>
                <h3>{member.name}</h3>
                <p className="position">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section id="partners" className="partners">
        <div className="container">
          <h2>Our Partners</h2>
          <p className="section-subtitle">Working together with leading organizations to amplify our environmental impact</p>
          <div className="partners-grid">
            {partners.map(partner => (
              <div key={partner.id} className="partner-card">
                <img src={partner.logo} alt={partner.name} className="partner-logo" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recycling Knowledge Section */}
      <section id="knowledge" className="knowledge">
        <div className="container">
          <h2>Recycling Knowledge</h2>
          <p className="section-subtitle">Learn about different types of waste and their environmental impact</p>
          <div className="knowledge-grid">
            {recyclingMaterials.map((material, idx) => (
              <div key={idx} className="knowledge-card">
                <img src={material.image} alt={material.title} />
                <h3>{material.title}</h3>
                <p className="headline">{material.headline}</p>
                <p className="fact">💡 {material.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section id="signup" className="signup">
        <div className="container">
          <h2>Join Our Mission</h2>
          <p>Be part of a cleaner, greener South Africa. Sign up for our collection services and help transform waste into a better future.</p>
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="services-checkbox">
              <label>Which services are you interested in?</label>
              <div className="checkbox-grid">
                <label>
                  <input type="checkbox" name="services" value="House Collection" onChange={handleInputChange} />
                  House Collection – Purpose-Driven Waste Separation
                </label>
                <label>
                  <input type="checkbox" name="services" value="School Collection" onChange={handleInputChange} />
                  School Collection – Purposeful School Recycling
                </label>
                <label>
                  <input type="checkbox" name="services" value="Business Collection" onChange={handleInputChange} />
                  Business Collection – Waste Purpose Solutions
                </label>
                <label>
                  <input type="checkbox" name="services" value="Purpose Clean-Out" onChange={handleInputChange} />
                  Purpose Clean-Out
                </label>
                <label>
                  <input type="checkbox" name="services" value="Clean-Up Campaigns" onChange={handleInputChange} />
                  Purpose Clean-Up Campaigns
                </label>
                <label>
                  <input type="checkbox" name="services" value="Community Engagement" onChange={handleInputChange} />
                  Purpose Community Engagement & Awareness
                </label>
              </div>
            </div>

            <div className="form-row">
              <input
                type="text"
                name="address"
                placeholder="Address Line 1"
                value={formData.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                name="state"
                placeholder="State / Province"
                value={formData.state}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="postal"
                placeholder="Postal Code"
                value={formData.postal}
                onChange={handleInputChange}
              />
            </div>

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
            />

            <button type="submit" className="submit-button">Sign Up Now</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Purpose Recycling</h3>
              <p>Committed to developing effective waste management solutions and building a sustainable future.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#partners">Our Partners</a></li>
                <li><a href="#knowledge">Recycling Knowledge</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: info@purposerecycling.co.za</p>
              <p>Phone: +27 XX XXX XXXX</p>
              <p>South Africa</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Purpose Recycling. All rights reserved. | Protecting the Earth, One Recycling Bin at a Time.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
