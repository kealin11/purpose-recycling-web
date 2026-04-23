import { useState } from 'react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  const headerSlides = [
    '/Header/1st Page.png',
    '/Header/2nd Page.png',
    '/Header/3rd Page.png',
    '/Header/4TH Page.png',
    '/Header/Last Page.png'
  ]

  const services = [
    {
      id: 1,
      title: 'Purpose-Driven Waste Separation',
      desc: 'Weekly household collections with recycling bags',
      day: 'Wednesdays',
      image: '/Services/Purpose-Driven Waste Separation.png'
    },
    {
      id: 2,
      title: 'Purposeful School Recycling',
      desc: 'Educational recycling programs for schools',
      day: 'Thursdays',
      image: '/Services/Purposeful School Recycling.png'
    },
    {
      id: 3,
      title: 'Waste Purpose Solutions',
      desc: 'Business waste collection and management',
      day: 'Fridays',
      image: '/Services/Waste Purpose Solutions.png'
    },
    {
      id: 4,
      title: 'Purpose Clean-Up Campaigns',
      desc: 'Community-driven environmental clean-ups',
      image: '/Services/Purpose Clean-Up Campaigns.png'
    },
    {
      id: 5,
      title: 'Purpose Clean-Out',
      desc: 'Responsible clearance and recycling services',
      image: '/Services/Purpose Clean-Out.png'
    },
    {
      id: 6,
      title: 'Community Engagement & Awareness',
      desc: 'Education and community participation programs',
      image: '/Services/Community Engagement & Awareness.png'
    }
  ]

  const team = [
    {
      id: 1,
      name: 'Audrey Caster',
      position: 'Managing Director',
      image: '/Meet The Team/Audrey Caster.jpg',
    
    },
    {
      id: 2,
      name: 'Shannon Boer',
      position: 'Director & Project Manager',
      image: '/Meet The Team/Shannon Boer.jpg',
    
    },
    {
      id: 3,
      name: 'Shanton Jacobs',
      position: 'Site Manager',
      image: '/Meet The Team/Shanton Jacobs.jpg',
    
    },
    {
      id: 4,
      name: 'Charlton Marshall',
      position: 'Reclaimer Supervisor',
      image: '/Meet The Team/Charlton Marshall.jpg',
      category: 'Operations'
    },
    {
      id: 5,
      name: 'Jerome Scholtz',
      position: 'E-Waste Specialist',
      image: '/Meet The Team/Jerome Scholtz.jpg',
      category: 'Operations'
    },
    {
      id: 6,
      name: 'Peter Michaels',
      position: 'Glass Specialist',
      image: '/Meet The Team/Peter Michaels.jpg',
      category: 'Operations'
    },
    {
      id: 7,
      name: 'Maxwell Mauritz',
      position: 'Waste Sorters',
      image: '/Meet The Team/Maxwell Mauritz.jpg',
      category: 'Operations'
    },
    {
      id: 8,
      name: 'Leevoo Lawrence',
      position: 'Waste Sorters',
      image: '/Meet The Team/Leevoo Lawrence.jpg',
      category: 'Operations'
    },
    {
      id: 9,
      name: 'Aljeandre Morgan',
      position: 'Waste Reclaimer',
      image: '/Meet The Team/Aljeandre Morgan.jpg',
      category: 'Operations'
    },
    {
      id: 10,
      name: 'Ethan Taai',
      position: 'Waste Reclaimer',
      image: '/Meet The Team/Ethan Taai.jpg',
      category: 'Operations'
    },
    {
      id: 11,
      name: 'Linroy Lewis',
      position: 'Data Analyst',
      image: '/Meet The Team/Linroy Lewis.jpg',
      category: 'Operations'
    },
    {
      id: 12,
      name: 'Adrian Coxen',
      position: 'Waste Sorters',
      image: '/Meet The Team/Adrian Coxen.jpg',
      category: 'Operations'
    },
    {
      id: 13,
      name: 'Michael Kok',
      position: 'Waste Reclaimer',
      image: '/Meet The Team/Michael Kok.jpg',
      category: 'Operations'
    }
  ]

  const leadershipTeam = team.filter(member => member.category === 'Leadership')
  const operationsTeam = team.filter(member => member.category === 'Operations')

  const partners = [
    {
      id: 1,
      name: 'Gauteng Provincial Government',
      logo: '/Our Partners/GDEV.png',
      website: 'https://www.gauteng.gov.za/'
    },
    {
      id: 2,
      name: 'Pikitup',
      logo: '/Our Partners/CJ&PIP.jpg',
      website: 'https://pikitup.co.za/'
    },
    {
      id: 3,
      name: 'Fibre Circle',
      logo: '/Our Partners/FC.jpg',
      website: 'https://fibrecircle.co.za/'
    },
    {
      id: 4,
      name: 'EWASA',
      logo: '/Our Partners/EWASA.jpg',
      website: 'https://ewasa.org/'
    },
    {
      id: 5,
      name: 'MetPac-SA',
      logo: '/Our Partners/MSA.jpg',
      website: 'https://www.metpacsa.org.za/'
    },
    {
      id: 6,
      name: 'Polyco',
      logo: '/Our Partners/POLYCO.jpg',
      website: 'https://www.polyco.co.za/'
    },
    {
      id: 7,
      name: 'PETCO',
      logo: '/Our Partners/P.jpg',
      website: 'https://petco.co.za/'
    },
    {
      id: 8,
      name: 'Plastics SA',
      logo: '/Our Partners/PSA.jpg',
      website: 'https://www.plasticsinfo.co.za/'
    },
    {
      id: 9,
      name: 'CCBSA',
      logo: '/Our Partners/CCBSA.jpg',
      website: 'https://www.ccbsaco.com/'
    },
    {
      id: 10,
      name: 'Unica',
      logo: '/Our Partners/UNICA.jpg',
      website: 'https://plastics.unica.co.za/'
    },
    {
      id: 11,
      name: 'Phambili Services',
      logo: '/Our Partners/PS.jpg',
      website: 'https://phambiliservices.co.za/'
    }
  ]

  const recyclingMaterials = [
    {
      id: 1,
      title: 'Plastic Waste',
      headline: 'Plastic Never Really Disappears, But It Can Be Reclaimed.',
      image: '/Recycling Knowledge/Plastic.jpg',
      overview: 'Plastic waste is one of the biggest visible pollution challenges, but with the right systems it can be recovered, reworked, and turned into practical new products.',
      environmentalImpact: 'Without intervention, plastics remain in the environment for decades and often break into smaller harmful fragments that affect drainage systems, soil, and waterways.',
      recyclingProcess: 'At Purpose Recycling, we collect and sort different types of plastic, including PET bottles, HDPE containers, and LDPE wraps. We partner with local collection points, schools, and community clean-up drives to recover materials that would otherwise become pollution. These plastics are then washed, shredded, and transformed into usable pellets or creative upcycled products such as eco-bricks, furniture, and art pieces.',
      communityImpact: 'Our plastic reclaim program creates jobs for local collectors and raises environmental awareness among youth and households. By seeing waste as a resource, we empower communities to earn income and protect their environment at the same time.',
      facts: [
        'Recycling 1 ton of plastic saves over 6,000 kWh of energy.',
        'Plastic bottles can be turned into fabrics, building materials, and even eco-tiles.'
      ]
    },
    {
      id: 2,
      title: 'Paper Waste',
      headline: 'Every Ton of Reclaimed Paper Saves 17 Trees.',
      image: '/Recycling Knowledge/Paper.jpg',
      overview: 'Paper is one of the most recyclable materials, yet so much of it still ends up in landfills. From school worksheets to business packaging, used paper can easily be reclaimed and transformed into new products without harming our forests.',
      environmentalImpact: 'Producing new paper requires cutting down trees, consuming water, and releasing greenhouse gases. For every ton of paper we recycle, we save 17 trees, 26,000 liters of water, and reduce air pollution by 70%.',
      recyclingProcess: 'We collect office paper, newspapers, cardboard, and packaging from schools, businesses, and households. These materials are sorted, shredded, and pulped into new paper products, like tissue, notebooks, and packaging boards.',
      communityImpact: 'Through educational drives, we teach schools and offices how to separate recyclable paper from general waste. Our partnerships with local recyclers ensure that every page counts toward a greener future.',
      facts: [
        'Paper can be recycled up to 7 times before its fibers weaken.',
        'Recycling 1 ton of paper saves enough energy to power an average home for 6 months.'
      ]
    },
    {
      id: 3,
      title: 'Glass Waste',
      headline: 'Glass Can Be Reused Forever.',
      image: '/Recycling Knowledge/glass.jpg',
      overview: 'Glass is 100% recyclable and can be melted down and reused endlessly without losing quality. Yet, much of it ends up shattered in our communities or dumped in landfills.',
      environmentalImpact: 'Broken glass poses hazards to people and animals, and when thrown into landfills, it takes thousands of years to break down. Recycling glass not only prevents injuries but also saves raw materials like sand, limestone, and soda ash.',
      recyclingProcess: 'We reclaim bottles and jars from households, bars, restaurants, and clean-up campaigns. The glass is sorted by color, cleaned, and crushed into cullet, small pieces ready to be melted and molded into new bottles and jars.',
      communityImpact: 'By encouraging bottle return systems and creative glass upcycling like using bottles for decor, lighting, or garden art, we turn what was once waste into value. These initiatives also help reduce local litter and foster sustainable business models.',
      facts: [
        'Recycling one glass bottle saves enough energy to power a light bulb for 4 hours.',
        'Glass can be recycled endlessly without losing purity or quality.'
      ]
    },
    {
      id: 4,
      title: 'Metal Waste',
      headline: 'Waste Metal = Hidden Treasure.',
      image: '/Recycling Knowledge/Metal.jpg',
      overview: 'Metals are some of the most valuable recyclable materials on Earth. From drink cans and pots to car parts and tools, metals can be melted down and reused repeatedly without losing their strength or quality.',
      environmentalImpact: 'Mining new metal ores is energy-intensive and destructive to ecosystems. Recycling metal reduces the need for mining, saves energy, and limits air and water pollution.',
      recyclingProcess: 'We collect and sort aluminum, steel, copper, and other scrap metals from households, workshops, and community drives. The materials are cleaned and sent to certified recycling facilities where they are melted down and shaped into new products like frames, tools, or components for local industries.',
      communityImpact: 'By reclaiming metal, we create opportunities for informal waste collectors and small-scale recyclers to earn a fair income. We also reinvest profits into local sustainability and job creation programs.',
      facts: [
        'Recycling aluminum saves 95% of the energy required to make new aluminum from raw materials.',
        'Steel is the most recycled material in the world.'
      ]
    },
    {
      id: 5,
      title: 'Electrical Waste (E-Waste)',
      headline: 'Even Wires Have Purpose.',
      image: '/Recycling Knowledge/Ewaste.jpg',
      overview: 'Electrical waste, or e-waste, includes cables, appliances, phones, and electronic parts that are no longer in use. These items contain precious metals like copper, silver, and gold, but also hazardous materials that can pollute the environment if not handled properly.',
      environmentalImpact: 'When e-waste is burned or dumped, toxic substances like lead and mercury leak into the soil and water. This endangers human health and wildlife. Yet, less than 20% of global e-waste is recycled responsibly.',
      recyclingProcess: 'At Purpose Recycling, we collect old cables, chargers, and electronic components. Instead of burning wires, we safely strip and recover valuable metals such as copper. We then partner with certified facilities that specialize in electronic recycling to handle the complex components.',
      communityImpact: 'By safely processing e-waste, we reduce toxic pollution and teach communities the importance of proper disposal. This initiative supports a circular economy where valuable materials are continually reused instead of wasted.',
      facts: [
        'One ton of recycled cell phones yields more gold than one ton of mined ore.',
        'Recycling copper uses 85% less energy than producing new copper.'
      ]
    }
  ]

  const contactDetails = {
    phones: [
      { label: 'Audrey', value: '072 336 9934', href: 'tel:+27723369934' },
      { label: 'Shannon', value: '062 543 9458', href: 'tel:+27625439458' }
    ],
    emails: [
      { label: 'Audrey', value: 'audreycaster4@gmail.com', href: 'mailto:audreycaster4@gmail.com' },
      { label: 'Shannon', value: 'shannonboer99@gmail.com', href: 'mailto:shannonboer99@gmail.com' }
    ],
    address: '25 Industrial Crescent, Eldorado Park, Extension 5, Johannesburg, 1811',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=25+Industrial+Crescent,+Eldorado+Park,+Extension+5,+Johannesburg,+1811',
    socialLinks: [
      { id: 1, name: 'Facebook', handle: 'Purpose Recycling', href: 'https://www.facebook.com/people/Purpose-Recycling/61571398726559/' },
      { id: 2, name: 'Instagram', handle: '@purposerecycling', href: 'https://www.instagram.com/purposerecycling/' },
      { id: 3, name: 'TikTok', handle: '@purpose.recycling', href: 'https://www.tiktok.com/@purpose.recycling' },
      { id: 4, name: 'LinkedIn', handle: 'Purpose Recycling', href: 'https://www.linkedin.com/posts/purposerecycling-enforcingpurpose-recyclingmatters-share-7369423446042128385-ULmI/' }
    ]
  }

  return (
    <>
      {/* Header/Navigation */}
      <header className="navbar">
        <div className="navbar-container">
          <a href="#home" className="logo-section" aria-label="Purpose Recycling home">
            <img src="/pr-logo.png" alt="Purpose Recycling" className="navbar-logo" />
            <span className="logo-badge">Purpose Recycling</span>
          </a>
          <button
            className="menu-toggle"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About Us</a>
            <a href="#team">Team</a>
            <a href="#partners">Our Partners</a>
            <a href="#knowledge">Recycling Knowledge</a>
            <a href="#contact" className="cta-button">Contact Us</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-slides" aria-hidden="true">
          {headerSlides.map((image, index) => (
            <div
              key={image}
              className="hero-slide"
              style={{
                backgroundImage: `url("${image}")`,
                animationDelay: `${index * 5}s`
              }}
            />
          ))}
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Let's Create A Greener, Cleaner South Africa</h1>
          <p>Join 500+ households in our mission to reduce landfill waste and build a sustainable future</p>
          <a href="#contact" className="hero-button">Contact Us</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="services-heading">
            <span className="section-kicker">What We Do</span>
            <h2>Our Services</h2>
            <p className="section-subtitle">Thoughtful recycling programs and clean-up services designed to create visible impact in homes, schools, and communities.</p>
          </div>
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <img src={service.image} alt={service.title} />
                <div className="service-card-body">
                  {service.day && <span className="day-badge">{service.day}</span>}
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
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
              <span className="section-kicker">Who We Are</span>
              <h2>About Purpose Recycling</h2>
              <p className="highlight">Purpose Recycling is a socially responsible organization committed to developing effective waste management solutions that leave communities cleaner, stronger, and more connected.</p>
              
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
            <div className="about-media">
              <div className="about-image about-image-primary">
                <img src="/About Us/Team Photo.png" alt="Purpose Recycling team together outdoors" />
              </div>
              <div className="about-image about-image-secondary">
                <img src="/About Us/Team Photo 2.png" alt="Purpose Recycling team supporting community recycling efforts" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="team" className="team">
        <div className="container">
          <div className="team-heading">
            <span className="section-kicker">Meet The Team</span>
            <h2>Dedicated People Behind The Mission</h2>
            <p className="section-subtitle">Purpose Recycling is led by a committed management team and supported by a growing operational crew focused on practical, day-to-day environmental impact.</p>
          </div>

          <div className="leadership-grid">
            {leadershipTeam.map(member => (
              <div key={member.id} className="team-card team-card-leadership">
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} className="team-image" />
                </div>
                <div className="team-card-body">
                  <span className="team-badge">Leadership</span>
                  <h3>{member.name}</h3>
                  <p className="position">{member.position}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="team-grid">
            {operationsTeam.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} className="team-image" />
                </div>
                <div className="team-card-body">
                  <h3>{member.name}</h3>
                  <p className="position">{member.position}</p>
                </div>
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
              <a
                key={partner.id}
                className="partner-card"
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${partner.name}`}
              >
                <img src={partner.logo} alt={partner.name} className="partner-logo" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recycling Knowledge Section */}
      <section id="knowledge" className="knowledge">
        <div className="container">
          <div className="knowledge-heading">
            <span className="section-kicker">Learn & Act</span>
            <h2>Recycling Knowledge</h2>
            <p className="section-subtitle">Explore how different waste streams are reclaimed, why responsible recycling matters, and how Purpose Recycling turns everyday waste into real community value.</p>
          </div>
          <div className="knowledge-grid">
            {recyclingMaterials.map((material) => (
              <div key={material.id} className="knowledge-card">
                <img src={material.image} alt={material.title} />
                <div className="knowledge-card-body">
                  <h3>{material.title}</h3>
                  <p className="headline">{material.headline}</p>
                  <p className="knowledge-overview">{material.overview}</p>
                  <p className="fact">Did you know? {material.facts[0]}</p>
                  <button
                    type="button"
                    className="knowledge-button"
                    onClick={() => setSelectedMaterial(material)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedMaterial && (
        <div className="knowledge-modal-backdrop" onClick={() => setSelectedMaterial(null)}>
          <div
            className="knowledge-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="knowledge-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="knowledge-modal-close"
              aria-label="Close recycling details"
              onClick={() => setSelectedMaterial(null)}
            >
              ×
            </button>
            <img
              src={selectedMaterial.image}
              alt={selectedMaterial.title}
              className="knowledge-modal-image"
            />
            <div className="knowledge-modal-body">
              <span className="section-kicker">Recycling Insight</span>
              <h3 id="knowledge-modal-title">{selectedMaterial.title}</h3>
              <p className="knowledge-modal-headline">{selectedMaterial.headline}</p>

              <div className="knowledge-modal-section">
                <h4>Overview</h4>
                <p>{selectedMaterial.overview}</p>
              </div>

              <div className="knowledge-modal-section">
                <h4>Environmental Impact</h4>
                <p>{selectedMaterial.environmentalImpact}</p>
              </div>

              <div className="knowledge-modal-section">
                <h4>Our Recycling Process</h4>
                <p>{selectedMaterial.recyclingProcess}</p>
              </div>

              <div className="knowledge-modal-section">
                <h4>Community Impact</h4>
                <p>{selectedMaterial.communityImpact}</p>
              </div>

              <div className="knowledge-modal-section">
                <h4>Did You Know?</h4>
                <ul className="knowledge-modal-facts">
                  {selectedMaterial.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-panel">
              <span className="section-kicker">Contact Us</span>
              <h2>Let's Work Together For A Cleaner Community</h2>
              <p className="section-subtitle">We're eager to work with households, schools, businesses, and partners who want to protect our planet and strengthen our community.</p>

              <div className="contact-list">
                <div className="contact-item">
                  <span className="contact-icon">Call</span>
                  <div>
                    <h3>Phone</h3>
                    {contactDetails.phones.map((phone) => (
                      <a key={phone.value} href={phone.href} className="contact-link">
                        {phone.label} - {phone.value}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">Mail</span>
                  <div>
                    <h3>Email</h3>
                    {contactDetails.emails.map((email) => (
                      <a key={email.value} href={email.href} className="contact-link">
                        {email.value}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">Pin</span>
                  <div>
                    <h3>Pin Location</h3>
                    <a href={contactDetails.mapHref} target="_blank" rel="noreferrer" className="contact-link">
                      {contactDetails.address}
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-socials">
                <h3>Follow Purpose Recycling</h3>
                <div className="contact-social-grid">
                  {contactDetails.socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-social-card"
                    >
                      <span className="contact-social-name">{social.name}</span>
                      <span className="contact-social-handle">{social.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-side">
              <form
                className="contact-form"
                action="https://formsubmit.co/audreycaster4@gmail.com"
                method="POST"
              >
                <input type="hidden" name="_subject" value="New Purpose Recycling website enquiry" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <h3>Send Us A Message</h3>
                <p className="contact-form-copy">Share your details and we will get back to you as soon as possible.</p>

                <div className="contact-form-grid">
                  <input type="text" name="first_name" placeholder="First Name" required />
                  <input type="text" name="last_name" placeholder="Last Name" required />
                </div>

                <div className="contact-form-grid">
                  <input type="email" name="email" placeholder="Email Address" required />
                  <input type="tel" name="phone" placeholder="Phone Number" />
                </div>

                <select name="service_interest" defaultValue="">
                  <option value="" disabled>Select A Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>

                <textarea
                  name="message"
                  placeholder="Tell us how we can help"
                  rows="5"
                  required
                />

                <button type="submit" className="contact-submit">Send Enquiry</button>
              </form>

              <div className="contact-map-card">
                <div className="contact-map-header">
                  <span className="contact-icon">Map</span>
                  <div>
                    <h3>Find Us</h3>
                    <a href={contactDetails.mapHref} target="_blank" rel="noreferrer" className="contact-link">
                      Open in Google Maps
                    </a>
                  </div>
                </div>
                <iframe
                  className="contact-map"
                  title="Purpose Recycling location"
                  src="https://maps.google.com/maps?q=25%20Industrial%20Crescent%2C%20Eldorado%20Park%2C%20Extension%205%2C%20Johannesburg%2C%201811&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {false && (
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
              <div className="checkbox-grid checkbox-grid-services">
                {services.map(service => (
                  <label key={service.id}>
                    <input type="checkbox" name="services" value={service.title} onChange={handleInputChange} />
                    {service.title}
                  </label>
                ))}
              </div>
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
      )}

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
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: audreycaster4@gmail.com</p>
              <p>Email: shannonboer99@gmail.com</p>
              <p>Phone: 072 336 9934 / 062 543 9458</p>
              <p>25 Industrial Crescent, Eldorado Park, Extension 5, Johannesburg, 1811</p>
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
