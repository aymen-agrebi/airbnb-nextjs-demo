import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'
import { FunctionComponent } from 'react'

const Home: FunctionComponent = (props?) => {
  return (
    <div className="">
      <Head>
        <title>airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <main className="mx-auto max-w-7xl px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="pb-5 text-4xl font-semibold">Explore near by</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {props.exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                img={img}
                location={location}
                distance={distance}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="py-8 text-4xl font-semibold">Live Anywhere</h2>
          <div className="-ml-3 flex space-x-3 overflow-scroll p-3 scrollbar-hide ">
            {props.cardData?.map(({ img, title }) => (
              <MediumCard key={img} title={title} img={img} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoor"
          description="Wishlist created by Airbnb"
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  )
}
export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  )
  const cardData = await fetch('https://links.papareact.com/zp1').then((res) =>
    res.json()
  )
  return {
    props: {
      exploreData,
      cardData,
    },
  }
}
export default Home
