import axios from 'axios'
import React from 'react'
import { useQuery, QueryClientProvider, QueryClient } from 'react-query'
const queryClient = new QueryClient()

// Higher order component
const Pokemons = () => {
  const { isLoading, isFetching, data, isError, error } = useQuery(
    'pokemons',
    () =>
      axios.get('https://pokeapi.co/api/v2/pokemon').then((res) => {
        try {
          const result = res.data.results
          return result
        } catch (error) {
          console.log(error)
        }
      })
  )

  //Check the various query states
  return isLoading ? (
    'Loading....'
  ) : isError ? (
    `An error occured: ${error.message}`
  ) : (
    <div>
      {data.map((res) => {
        return <div key={res.name}>{res.name}</div>
      })}
    </div>
  )
}
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemons />
    </QueryClientProvider>
  )
}

export default App
