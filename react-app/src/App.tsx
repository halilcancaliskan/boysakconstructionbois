import React from 'react'
import emailjs from '@emailjs/browser'
import { db } from './firebase'
import { push, ref, serverTimestamp } from 'firebase/database'

const EMAILJS_SERVICE_ID = 'service_7thf6rj'
const EMAILJS_TEMPLATE_ID = 'template_savgei6'
const EMAILJS_PUBLIC_KEY = 'GGcucHhcABacJLBZm'

const INITIAL_FORM_VALUES = {
  name: '',
  email: '',
  telephone: '',
  subject: '',
  message: '',
  newsletter: false
}

function AccordionItem({ id, question, answer }: { id: string, question: string, answer: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="accordion-item">
      <h2>
        <button className={`accordion-button ${open ? '' : 'collapsed'}`} type="button" onClick={() => setOpen(v => !v)}>
          {question}
        </button>
      </h2>
      <div id={id} style={{ display: open ? 'block' : 'none' }}>{answer}</div>
    </div>
  )
}

export default function App() {
  const [formData, setFormData] = React.useState({ ...INITIAL_FORM_VALUES })
  const [status, setStatus] = React.useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target
    const { name, value } = target
    const nextValue = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : value
    setFormData((prev) => ({
      ...prev,
      [name]: nextValue
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Merci de compléter les champs obligatoires avant l\'envoi.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    const subject = formData.subject.trim() || 'Demande de contact'
    const templateParams = {
      name: formData.name,
      from_name: formData.name,
      user_name: formData.name,
      email: formData.email,
      from_email: formData.email,
      user_email: formData.email,
      reply_to: formData.email,
      phone: formData.telephone,
      subject,
      message: formData.message,
      newsletter: formData.newsletter ? 'Oui' : 'Non'
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      await push(ref(db, 'contactMessages'), {
        name: formData.name,
        email: formData.email,
        phone: formData.telephone,
        subject,
        message: formData.message,
        newsletter: formData.newsletter,
        source: 'react-app',
        createdAt: serverTimestamp()
      })

  setStatus({ type: 'success', message: 'Merci ! Votre message a bien été envoyé.' })
  setFormData({ ...INITIAL_FORM_VALUES })
    } catch (error) {
      console.error('Échec de l\'envoi du formulaire de contact', error)
      setStatus({ type: 'error', message: 'Une erreur est survenue pendant l\'envoi. Merci de réessayer dans quelques instants.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header>
        <div className="top-wrap">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-6 d-flex align-items-center number-set ps-0">
                <div className="text-sec">
                  <p className="contacts-head">Appel gratuit: <a href="tel:123445678910">+33 7 68 90 68 90</a></p>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-lg-end align-items-center pe-0 topper">
                <div className="d-flex  text-sec">
                  <p className="contacts-head">Adresse mail: <a href="mailto:furkan.boysak@gmail.com">furkan.boysak@gmail.com</a></p>
                </div>
                <ul className="d-flex pe-3">
                  <li><a href="https://g.co/kgs/yHNaev" target="_blank" rel="noreferrer"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                  <li><a href="https://g.co/kgs/yHNaev" target="_blank" rel="noreferrer"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                  <li><a href="https://www.instagram.com/boysak_construction_bois/" target="_blank" rel="noreferrer"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div id="accueil" className="container-xl">
            <a className="navbar-brand aside-stretch" href="#accueil">Boysak Construction Bois</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              Menu
            </button>
            <div className="navbar-collapse  align-items-center collapse" id="navbarSupportedContent">
              <ul className="navbar-nav list-item ms-auto mb-2 mb-lg-0">
                <li className="nav-item"><a href="#accueil" className="nav-link active">Accueil</a></li>
                <li className="nav-item"><a href="#aproposde" className="nav-link">A propos de</a></li>
                <li className="nav-item"><a href="#service" className="nav-link">Services</a></li>
                <li className="nav-item"><a href="#projets" className="nav-link">Projets</a></li>
                <li className="nav-item"><a href="#devis" className="nav-link">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section className="hero-wrap mobilebg">
        <div className="overlay"></div>
        <div className="container-xl">
          <div className="row  slider-text align-items-center justify-content-center text-center">
            <div className="col-lg-9">
              <div className="mt-5">
                <span className="subheading">Depuis 2020</span>
                <h1 className="mb-5">Construisons votre <span>maison</span>, construisons votre <span>rêve</span></h1>
                <p className="mb-5">
                  <a href="#aproposde" className=" btn-sec p-4 py-3">A propos de nous <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                  <a href="#devis" className="btn btn-right p-4 py-3">Demander un devis<i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

  <section id="devis" className="fiitco-appointment img" style={{ background: 'url(/images/xbg_2.jpg.pagespeed.ic.ybfVuIBiJn.webp)' }}>
        <div className="overlay"></div>
        <div className="container-xl">
          <div className="row">
            <div className="col-lg-6 col-md-6 d-flex align-item-center">
              <form className="appointment aside-stretch2" id="contactForm" onSubmit={handleSubmit}>
                <span className="subheading">Un devis toiture ou charpente ? B.C.B vous renseigne.</span>
                <h2 className="mb-4 appointment-head">Je dépose mon projet</h2>
                <div className="row">
                  {status.type !== 'idle' && (
                    <div className="col-12 mb-3">
                      <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                        {status.message}
                      </div>
                    </div>
                  )}
                  <div className="col-lg-6 col-md-12 mb-3">
                    <label htmlFor="name">Nom complet</label>
                    <input
                      required
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nom, prénom"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 mb-3">
                    <label htmlFor="email">Adresse mail</label>
                    <input
                      required
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 mb-3">
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                      required
                      className="form-control"
                      type="tel"
                      id="telephone"
                      name="telephone"
                      placeholder="Téléphone"
                      value={formData.telephone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 mb-3">
                    <label htmlFor="subject">Sujet</label>
                    <input
                      className="form-control"
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Sujet de votre demande"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="message">Message</label>
                    <textarea
                      required
                      className="p-2 w-100 form-control"
                      id="message"
                      name="message"
                      cols={30}
                      rows={10}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="newsletter">
                        Je souhaite recevoir la newsletter
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-sec py-3 px-4" disabled={isSubmitting}>
                      {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6 col-md-6 d-flex align-item-center py-5 ps-5">
              <div className="heading-sec pb-2">
                <span className="subheading">FAQ</span>
                <h2 className="mb-3">Faites une demande de devis gratuitement!</h2>
                <p>Nous réalisons des devis détaillés qui vous offrent  une transparence totale sur les coûts, garantissant ainsi la qualité et la satisfaction à chaque étape de votre construction.</p>
                <AccordionItem id="content1" question="Comment pouvez-vous m'assurer que le projet sera terminé dans les délais convenus ?" answer="Nous nous engageons à respecter les délais convenus en planifiant soigneusement chaque étape du projet et en nous assurant d'avoir les ressources nécessaires à chaque étape." />
                <AccordionItem id="content2" question="Quelles sont vos approches pour garantir la qualité des matériaux utilisés dans la construction de mon projet ?" answer="Nous privilégions l'utilisation de matériaux de haute qualité, en nous assurant qu'ils répondent aux normes de l'industrie et en les sélectionnant soigneusement pour assurer la durabilité et la satisfaction à long terme." />
                <AccordionItem id="content3" question="Comment gérez-vous la communication tout au long du projet pour assurer une collaboration fluide et transparente ?" answer="Nous maintenons une communication ouverte à chaque étape du projet, vous tenant informé des progrès, des éventuels ajustements et des échéances à venir. Notre objectif est de garantir une collaboration transparente pour répondre pleinement à vos attentes." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="img-eng">
                <div className="d-flex counter-wrap">
                  <div className="icon"><img src="/images/engineer (1).png" alt="" /></div>
                  <div className="img-text">
                    <span>Localisation</span>
                    <p>Haut-De-France</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="aproposde" className="col-md-6  align-items-center heading-sec ">
              <span>Bienvenue sur Boysak Construction Bois</span>
              <h2>Artisanat de qualité à prix abordable</h2>
              <p>Chez Boysak Construction Bois, nous sommes fiers de vous offrir un artisanat de qualité à prix abordable. Notre engagement envers l'excellence artisanale ne se traduit pas seulement par la réalisation de projets exceptionnels, mais aussi par la garantie d'une accessibilité financière pour nos clients.</p>
              <h4>Qualité abordable exceptionnelle</h4>
              <div className="row">
                <div className="col-lg-6 service-wrap">
                  <div className="services x-services123 d-flex  mt-2">
                    <div className="icon"><img src="/images/building.png" alt="" /></div>
                    <div className="text">
                      <h2>Charpente</h2>
                      <p>Bois façonné, structures durables, charpenterie d'excellence.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 service-wrap">
                  <div className="services x-services123 d-flex  mt-2">
                    <div className="icon"><img src="/images/blueprint.png" alt="" /></div>
                    <div className="text">
                      <h2>Architecture</h2>
                      <p>Design innovant, espaces uniques, esthétique fonctionnelle.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 service-wrap">
                  <div className="services x-services123 d-flex mt-2">
                    <div className="icon"><img src="/images/consult.png" alt="" /></div>
                    <div className="text">
                      <h2>Conseil</h2>
                      <p>Expertise personnalisée, guidance éclairée, projets réussis.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 service-wrap">
                  <div className="services x-services123 d-flex  mt-2">
                    <div className="icon"><img src="/images/helmet.png" alt="" /></div>
                    <div className="text">
                      <h2>Travaux Mécaniques</h2>
                      <p>Excellence intégrée, norme permanente, satisfaction garantie.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-intro">
        <div className="fitco-img">
          <div className="overlay"></div>
          <div className="container-xl">
            <div className="row">
              <div className="col-lg-10">
                <div className="row">
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="bottom-text">
                      <span>C'est simple !</span>
                      <h1>Demandez votre devis personnalisé dès maintenant !</h1>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <p><a href="#devis" className="btn btn-sec">Demander un devis </a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="service" className="ftco-section">
        <div className="container-xl">
          <div className="row justify-content-center">
            <div className="col-md-8 mb-3 text-center heading-sec">
              <span className="subheading">Charpente, Ossature bois, rénovation</span>
              <h2>Nos Services</h2>
            </div>
          </div>
          <div className="row">
                <div className="col-md-6 d-flex services-sec2 "></div>
            <div className="col-md-6 ">
              <div className="services d-flex active mb-3">
                <div className="icon"><img src="/images/construction.png" alt="" /></div>
                <div className="text inner">
                  <h2>Charpente</h2>
                  <p>Maîtrise du bois, structures solides, charpenterie raffinée. Notre art transcende les matériaux, façonnant l'excellence dans chaque détail.</p>
                  <p><a href="#devis" className="btn-custom">En savoir plus</a></p>
                </div>
              </div>
              <div className="services d-flex active2 mb-3">
                <div className="icon"><img src="/images/home.png" alt="" /></div>
                <div className="text inner">
                  <h2>Ossature bois</h2>
                  <p>Construction de maison, extension et surélévation à ossature bois.</p>
                  <p><a href="#devis" className="btn-custom">En savoir plus</a></p>
                </div>
              </div>
              <div className="services d-flex active3 mb-3">
                <div className="icon"><img src="/images/engineer (1).png" alt="" /></div>
                <div className="text inner23">
                  <h2>Étanchéité</h2>
                  <p style={{ color: 'gray' }}>Réalisation des étanchéités de nos constructions, nous sommes spécialiste de la toiture EPDM et de la pose de tuiles. Nous aimons vous fournir un lot de construction hors d'eau.</p>
                  <p><a href="#devis" className="btn-custom">En savoir plus</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="fitco-section counter">
          <div className="overlay"></div>
          <div className="container-xl">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                <div className="counter-wrap-2 d-flex align-items-center">
                  <div className="icon"><img src="/images/engineer (1).png" alt="" /></div>
                  <div className="text">
                    <h2 className="number">Nord</h2>
                    <span className="caption">Localisation</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                <div className="counter-wrap-2 d-flex align-items-center">
                  <div className="icon"><img src="/images/engineer (1).png" alt="" /></div>
                  <div className="text">
                    <h2 className="number">Oui</h2>
                    <span className="caption">Devis sur mesure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-gallery ftco-section">
        <div id="projets" className="container-xl-fluid">
          <div className="row justify-content-center">
            <div className="col-md-7 mb-3 text-center heading-sec">
              <span className="sunheading">Portfolio</span>
              <h2>Galerie Projets</h2>
            </div>
          </div>
          <div className="row g-0">
            {/* Use same external images as placeholders; local images should be placed into /public/images */}
            {[
              'https://lh3.googleusercontent.com/p/AF1QipOjfDo2Lw0bh-cY440_LgkeDtFbt2CSzVNtFaP_=s3072-w3072-h1414-rw',
              'https://lh3.googleusercontent.com/p/AF1QipOnAwhOZLp-W4yey882LC5m0divZzdCxurkHewg=s3072-w3072-h1414-rw',
              'https://lh3.googleusercontent.com/p/AF1QipO4DIrj8noPqAPywVCYHaAryS1Lv4-AtNLK5IsX=s3072-w3072-h1414-rw'
            ].map((url, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="gallery-wrap img d-flex align-items-end justify-content-center" style={{ backgroundImage: `url(${url})` }}>
                  <a href="https://g.co/kgs/gVL2dX" className="icon d-flex align-items-center justify-content-center glightbox"><i className="fa fa-search" aria-hidden="true"></i></a>
                  <div className="desc w-100 px-4">
                    <span>Nord</span>
                    <h2><a href="https://g.co/kgs/gVL2dX">Boysak Construction Bois</a></h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="speacial-sec">
        <div className="container-xl">
          <div className="row justify-content-center">
            <div className="col-md-7 mb-3 text-center heading-sec">
              <span className="sunheading">Avis Google</span>
              <h2>Avis de nos clients</h2>
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-4">
              <div className="testimory">
                <div className="text">
                  <div className="d-flex align-item-center mb-4">
                    <div className="user-img" style={{ backgroundImage: 'url(/images/avis.png)' }}>
                      <div className="icon d-flex justify-content-center align-item-center">
                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                      </div>
                    </div>
                    <a href="https://g.co/kgs/yHNaev"><div className="ps-3">
                      <p className="name">Mathieu L.</p>
                      <span className="position">Local Guide®42 avis•26 photos</span>
                    </div></a>
                  </div>
                  <p className="mb-4">Nous sommes très content de notre terrasse posée par Furkan Boysak. C'est une terrasse en cumaru avec des fixations invisibles, et reliée à la piscine. Bref pas un chantier facile, mais parfaitement réalisé, avec beaucoup d'attention et de précision. En plus discret, ponctuel et très sympa. Je recommande vivement.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimory wrap">
                <div className="text">
                  <div className="d-flex align-item-center mb-4">
                    <div className="user-img" style={{ backgroundImage: 'url(/images/avis.png)' }}>
                      <div className="icon d-flex justify-content-center align-item-center">
                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                      </div>
                    </div>
                    <a href="https://g.co/kgs/yHNaev"><div className="ps-3">
                      <p className="name">Camille G.</p>
                      <span className="position">Local Guide®26 avis•11 photos</span>
                    </div></a>
                  </div>
                  <p className="mb-4 msg">Nous avons fait appel à Mr Boysak pour la réalisation de la toiture de notre extension. Un travail de qualité, fait en temps et en heure. Nous recommandons vivement cet artisan. Très professionnel et de très bon conseil. Il est rare de trouver un artisan de cette qualité aujourd'hui. Nous pensons sûrement refaire appel à lui.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimory">
                <div className="text">
                  <div className="d-flex align-item-center mb-4">
                    <div className="user-img" style={{ backgroundImage: 'url(/images/avis.png)' }}>
                      <div className="icon d-flex justify-content-center align-item-center">
                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                      </div>
                    </div>
                    <a href="https://g.co/kgs/yHNaev"><div className="ps-3">
                      <p className="name">Nicolas L.</p>
                      <span className="position">13 avis</span>
                    </div></a>
                  </div>
                  <p className="mb-4">J'ai fait appel à Furkan suite à une recommandation pour réparer un muret abîmé, réaliser une pergola et faire ma terrasse en bois. Le travail a été parfaitement exécuté. Furkan est professionnel, réfléchi et travaille lentement, mais très sûrement. Depuis, je lui fais de la publicité un peu partout, car il le mérite très largement. J'ai enfin trouvé un très bon artisan !! Un grand merci encore pour le travail.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="ftco-footer">
        <div className="container-xl">
          <div className="row mb-5 pb-5 justify-content-between">
            <div className="col-lg-3 col-md-6">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2 logo d-flex"><a href="#0" className="navbar-brand align-items-center">BCB</a></h2>
                <p>Construisons votre maison, construisons votre rêve.</p>
                <ul className="ftco-footer-social list-unstyled mt-2">
                  <li><a href="https://g.co/kgs/yHNaev" target="_blank" rel="noreferrer"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                  <li><a href="https://g.co/kgs/yHNaev" target="_blank" rel="noreferrer"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                  <li><a href="https://www.instagram.com/boysak_construction_bois/" target="_blank" rel="noreferrer"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2 logo d-flex">Avis</h2>
                <div className="block-21 mb-4 d-flex">
                  <div className="blog-img me-4 img" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/p/AF1QipNNYLa2BChpDgmW2LBY39RIK1qp7eDj0WRUDp8i=s157-p-k-rw)' }}></div>
                  <div className="text">
                    <h3 className="heading"><a href="#0">Terrasse</a></h3>
                    <div className="meta">
                      <div><a href="https://www.google.com/localservices/prolist?spp=Cg0vZy8xMXY1czFmNV8z&src=2&slp=UhUIARIREg8iDS9nLzExdjVzMWY1XzM#ts=3"><i className="fa fa-user" aria-hidden="true"></i> Mathieu L.</a></div>
                      <div><a href="https://www.google.com/localservices/prolist?spp=Cg0vZy8xMXY1czFmNV8z&src=2&slp=UhUIARIREg8iDS9nLzExdjVzMWY1XzM#ts=3"><i className="fa fa-comment" aria-hidden="true"></i> 1</a></div>
                    </div>
                  </div>
                </div>
                <div className="block-21 mb-4 d-flex">
                  <div className="blog-img me-4 img" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/p/AF1QipO4DIrj8noPqAPywVCYHaAryS1Lv4-AtNLK5IsX=s3072-w3072-h1414-rw)' }}></div>
                  <div className="text">
                    <h3 className="heading"><a href="#0">Charpente</a></h3>
                    <div className="meta">
                      <div><a href="https://www.google.com/localservices/prolist?spp=Cg0vZy8xMXY1czFmNV8z&src=2&slp=UhUIARIREg8iDS9nLzExdjVzMWY1XzM#ts=3"><i className="fa fa-user" aria-hidden="true"></i> BCB</a></div>
                      <div><a href="https://www.google.com/localservices/prolist?spp=Cg0vZy8xMXY1czFmNV8z&src=2&slp=UhUIARIREg8iDS9nLzExdjVzMWY1XzM#ts=3"><i className="fa fa-comment" aria-hidden="true"></i> 1</a></div>
                    </div>
                  </div>
                </div>
                <div className="block-21 mb-4 d-flex">
                  <div className="blog-img me-4 img" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/p/AF1QipPfOjhcs_XAZTNVeZ_vQdR9iEOA0fm4yusUxuDn=s3072-w3072-h1414-rw)' }}></div>
                  <div className="text">
                    <h3 className="heading"><a href="#0">Toiture</a></h3>
                    <div className="meta">
                      <div><a href="https://www.google.com/localservices/prolist?spp=Cg0vZy8xMXY1czFmNV8z&src=2&slp=UhUIARIREg8iDS9nLzExdjVzMWY1XzM#ts=3"><i className="fa fa-user" aria-hidden="true"></i> BCB</a></div>
                      <div><a href="https://www.google.com/localservices/prolist?spp=Cg0vZy8xMXY1czFmNV8z&src=2&slp=UhUIARIREg8iDS9nLzExdjVzMWY1XzM#ts=3"><i className="fa fa-comment" aria-hidden="true"></i> 1</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2 logo d-flex">Recherche rapide</h2>
                <ul className="list-unstyled">
                  <li><a href="#accueil"><i className="fa fa-chevron-right" aria-hidden="true"></i>Accueil</a></li>
                  <li><a href="#aproposde"><i className="fa fa-chevron-right" aria-hidden="true"></i>A propos de</a></li>
                  <li><a href="#service"><i className="fa fa-chevron-right" aria-hidden="true"></i>Nos services</a></li>
                  <li><a href="#projets"><i className="fa fa-chevron-right" aria-hidden="true"></i>Projet</a></li>
                  <li><a href="#devis"><i className="fa fa-chevron-right" aria-hidden="true"></i>Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2 logo d-flex">Une question ?</h2>
                <div className="block-23 mb-3">
                  <ul className="ps-0">
                    <li><a href="#0"><i className="fa fa-map" aria-hidden="true"></i></a>Lille et Haut-De-France</li>
                    <li><a href="tel:+33 7 68 90 68 90"><i className="fa fa-phone" aria-hidden="true"></i>+33 7 68 90 68 90</a></li>
                    <li><a href="mailto:furkan.boysak@gmail.com"><i className="fa fa-paper-plane" aria-hidden="true"></i>furkan.boysak@gmail.com</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-0 py-5 bg-darken">
          <div className=" text-center">
            <p className="mb-0 last-word">Copyright ©2024 Tous droits réservés | Ce site a été créé par <a href="https://www.Web-Caliskan.fr/">WebCaliskan</a></p>
          </div>
        </div>
      </footer>
    </>
  )
}
