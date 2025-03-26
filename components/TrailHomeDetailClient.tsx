export const dynamic = "force-static";

import Image from 'next/image'
import Link from 'next/link'
import MailerLiteForm from './MailerLiteForm'
import PropertyGallery from './PropertyGallery'

type GalleryImage = { url: string }

type HandpickedHome = {
  _id: string
  address: string
  price: number
  beds: number
  baths: number
  squareFeet: number
  acreage: string
  description?: string
  gallery: GalleryImage[]
  trailName?: string
  distanceToTrail?: number
  rideWithGPSID?: string
  listingAgent?: string
  date?: string
}

export default function TrailHomeDetailClient({ home }: { home: HandpickedHome }) {
  return (
    <main className="property-page">
      <header className="limit">
        <Link href="/">
          <Image src="/trail-homes-logo.svg" alt="Trail Homes Logo" width={100} height={48} unoptimized />
        </Link>
        <nav id="navigation">
          <Link href="/">Home</Link>
          <Link href="https://www.instagram.com/nwatrailhomes/" target="_blank">Instagram</Link>
        </nav>
      </header>

      <div className="feature limit">
      <p className="listing">Listed by: {home.listingAgent}</p>



        <PropertyGallery gallery={home.gallery} address={home.address} />

        <section className="property-details">
          <div className="basic">
            <div className="location-price">
              <h2 className="property-price">${home.price.toLocaleString()}</h2>
              <h1 className="property-title">{home.address}</h1>
            </div>

            <div className="data-points">
              <div className="data-point"><h3>{home.beds}</h3><p>Bedrooms</p></div>
              <div className="data-point"><h3>{home.baths}</h3><p>Bathrooms</p></div>
              <div className="data-point"><h3>{home.squareFeet}</h3><p>Sq. Feet</p></div>
              <div className="data-point"><h3>{home.acreage}</h3><p>Acres</p></div>
            </div>
          </div>
        </section>

        <section className="trail-homes-pov">
          <div className="thoughts-contact">
            <h4>Jenna&apos;s notes</h4>
            <p className="thoughts">&quot;{home.description}&quot;</p>
            <p className="label"><strong>Nearby Trail:</strong> {home.trailName} ({home.distanceToTrail} miles)</p>

            <div className="contact-details">
              <Image className="headshot" src="/jenna.jpg" alt="Jenna Gragg" width={100} height={100} />
              <div className="info">
                <p className="name"><strong>Jenna Gragg</strong></p>
                <p className="broker">No Place Like Home Realty Co</p>
                <p className="phone">Mobile: (412) 708-0303</p>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=jenna@bellavistatrailhomes.com&su=${home.address}&body=Hi Jenna,`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email Jenna
                </a>
              </div>
            </div>
          </div>

          <iframe
            src={`https://ridewithgps.com/embeds?type=route&id=${home.rideWithGPSID}&sampleGraph=true`}
            width={100}
            height={100}
          />
        </section>
      </div>

      <section className="introduction">
        <div className="limit intro-content">
          <div className="newsletter">
            <h3>Best. Decision. Ever.</h3>
            <p>
              My name is Jenna Gragg, and my family and I relocated to Bella Vista for the incredible bike trails. Now, I specialize in helping fellow cyclists find their ideal homes with direct trail access.
            </p>
            <p>
              Keep up with the latest real estate development news and handpicked trail homes in Bella Vista, AR.
            </p>
            <MailerLiteForm />
          </div>
          <Image src="/back40-01.jpg" alt="Trail Homes Logo" width={500} height={500} />
        </div>
      </section>

      <footer>
        <div className="limit footer-content">
          <div className="contact-info">
            <Image src="/trail-homes-logo-white.svg" alt="Trail Homes Logo" width={150} height={50} />
            <div className="name">Jenna Gragg</div>
            <ul className="details">
              <li>AR Real Estate License #AR 97513</li>
              <li>Call or Text Direct: 412-708-0303</li>
              <li>Email: jenna@back40trailhomes.com</li>
            </ul>
            <ul className="broker">
              <li>No Place Like Home Realty Co.</li>
              <li>Principal Broker Sandra Wellesley, Lic #AR 87022</li>
              <li>1801 Forest Hills Blvd #119 Bella Vista, AR 72715</li>
              <li>Bella Vista, AR, USA</li>
              <li>Office Phone: 479-208-7153</li>
            </ul>
          </div>
          <img className="broker-logo" src="/no-place-like-home.png" alt="No Place Like Home Realty"/>
        </div>
      </footer>
    </main>
  )
}
