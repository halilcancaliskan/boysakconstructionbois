import { useEffect } from 'react'

export function SEOSchema() {
  useEffect(() => {
    // Schema.org JSON-LD pour le référencement local
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Boysak Construction Bois",
      "image": "https://boysakconstructionbois.fr/images/hero-bg.jpg",
      "@id": "https://boysakconstructionbois.fr",
      "url": "https://boysakconstructionbois.fr",
      "telephone": "+33768906890",
      "email": "furkan.boysak@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lille",
        "addressRegion": "Hauts-de-France",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 50.6292,
        "longitude": 3.0573
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      "priceRange": "€€",
      "description": "Expert en construction bois dans les Hauts-de-France. Spécialisé dans la charpente traditionnelle, l'ossature bois, les terrasses en bois et le bardage.",
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 50.6292,
          "longitude": 3.0573
        },
        "geoRadius": "50000"
      },
      "serviceType": [
        "Construction bois",
        "Charpente traditionnelle",
        "Ossature bois",
        "Terrasse en bois",
        "Bardage bois",
        "Extension bois",
        "Pergola bois",
        "Abri de jardin"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "12"
      }
    })
    document.head.appendChild(script)

    // Service Schema
    const serviceScript = document.createElement('script')
    serviceScript.type = 'application/ld+json'
    serviceScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Construction et Charpente Bois",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Boysak Construction Bois",
        "telephone": "+33768906890",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lille",
          "addressRegion": "Hauts-de-France",
          "addressCountry": "FR"
        }
      },
      "areaServed": {
        "@type": "State",
        "name": "Hauts-de-France"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services de construction bois",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Charpente Traditionnelle",
              "description": "Conception et installation de charpentes en bois traditionnelles"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ossature Bois",
              "description": "Construction de maisons et extensions en ossature bois"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Terrasse Bois",
              "description": "Installation de terrasses en bois exotique et composite"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bardage Bois",
              "description": "Pose de bardage bois pour isolation et esthétique"
            }
          }
        ]
      }
    })
    document.head.appendChild(serviceScript)

    return () => {
      document.head.removeChild(script)
      document.head.removeChild(serviceScript)
    }
  }, [])

  return null
}
