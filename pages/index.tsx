import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { sanityFetch } from "../lib/sanity";
import MailerLiteForm from "../components/MailerLiteForm";

type HandpickedHome = {
  _id: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  squareFeet: number;
  acreage: string;
  trailName: string;
  listingAgent: string;
  slug: string;
  mainImage: string;
};

export async function getStaticProps() {
  try {
    // Fetch all handpicked homes from Sanity
    const query = `*[_type == "handpick"]{
      _id,
      address,
      price,
      beds,
      baths,
      squareFeet,
      acreage,
      trailName,
      listingAgent,
      "slug": slug.current,
      "mainImage": gallery[0].asset->url
    }`;

    let handpickedHomes = await sanityFetch(query);
    
    // If no homes were returned or an error occurred, use empty array
    if (!handpickedHomes || !Array.isArray(handpickedHomes)) {
      console.warn('No homes returned from Sanity, using empty array');
      handpickedHomes = [];
    }

    return {
      props: {
        handpickedHomes,
      }
    };
  } catch (error) {
    console.error("Error fetching homes:", error);
    return {
      props: {
        handpickedHomes: [],
      },
    };
  }
}

export default function HomePage({ handpickedHomes }: { handpickedHomes: HandpickedHome[] }) {
  return (
    <>
      <Head>
        <title>Northwest Arkansas Trail Homes</title>
        <meta name="description" content="Discover perfect trail homes in Northwest Arkansas - homes with direct access to bike trails." />
      </Head>
      <main>
        <header className="limit">
          <Link href="/">
            <Image src="./trail-homes-logo.svg" alt="Trail Homes Logo" width={100} height={48} unoptimized />
          </Link>
          <nav id="navigation">
            <Link href="/" className="active">Home</Link>
            <Link href="https://www.instagram.com/nwatrailhomes/" target="_blank">Instagram</Link>
          </nav>
        </header>

        <section 
          className="hero" 
          style={{ 
            backgroundImage: "url('./hero-background-2.jpg')",
            backgroundSize: "cover", 
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="limit hero-content">
            <h1>Bentonville and Bella Vista, AR Trail Homes</h1>
            <h2>HOMES ON THE TRAILS</h2>
          </div>
        </section>

        <section className="handpicked-trail-homes">
          <div className="limit handpicked-content">
            <div className="title-row">
              <h3>Handpicked Trail Homes</h3>
            </div>
            {handpickedHomes.length > 0 ? (
              <ul className="picks">
                {handpickedHomes.map((home) => (
                  <li key={home._id} className="pick">
                    <Link href={`/trailhome/${home.slug}`}>
                      <div className="img-container">
                        <Image
                          src={home.mainImage || "/fallback-image.jpg"}
                          alt={home.address || "No address available"}
                          width={400}
                          height={300}
                          unoptimized
                        />
                        <span className="handpicked-flag">{home.trailName}</span>
                      </div>
                      <div className="info-container">
                        <h5>${home.price.toLocaleString()}</h5>
                        <h6>{home.beds} Br | {home.baths} Ba | {home.squareFeet} Sq Ft | {home.acreage} Acre</h6>
                        <h4>{home.address}</h4>
                        <p>Listed by: {home.listingAgent}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-listings">No trail homes are currently listed. Please check back soon!</p>
            )}
          </div>
        </section>

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
            <Image src="./back40-01.jpg" alt="Trail Homes Logo" width={500} height={500} />
          </div>
        </section>

        <footer>
          <div className="limit footer-content">
            <div className="contact-info">
              <Image src="./trail-homes-logo-white.svg" alt="Trail Homes Logo" width={150} height={50} unoptimized />
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
            <img className="broker-logo" src="./no-place-like-home.png" alt="No Place Like Home Realty" />
          </div>
        </footer>
      </main>
    </>
  )
}