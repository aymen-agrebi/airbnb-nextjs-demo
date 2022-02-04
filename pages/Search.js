import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'
const Search = ({ searchResults }) => {
  const router = useRouter()
  const { location, startDate, endDate, numOfGuests } = router.query
  let range = null
  if (router.query.startDate && router.query.endDate) {
    const formatedStartDate = format(new Date(startDate), 'dd MMMM yy')
    const formatedendtDate = format(new Date(endDate), 'dd MMMM yy')
    range = `${formatedStartDate} - ${formatedendtDate}`
  }

  return (
    <React.Fragment>
      <Header
        placeholder={
          range ? `${location} | ${range} | ${numOfGuests} guests` : 'search'
        }
      />
      <main className="flex">
        <section className="flex-grow px-6 pt-14 ">
          <p className="text-xs  ">
            300+ Stays from {range} for {numOfGuests} guests
          </p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold  ">
            Stays in {location}{' '}
          </h1>
          <div className="mb-5 hidden space-x-3 whitespace-nowrap  text-gray-800 lg:inline-flex">
            <p className="button ">Cancelation Flexibility</p>
            <p className="button ">Type of Place</p>
            <p className="button ">Price</p>
            <p className="button ">Rooms and Beds</p>
            <p className="button ">More Filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults?.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )
  return {
    props: { searchResults },
  }
}

export default Search
