
function MovieSearch({ params }: { params: { query: string } }) {

  return (
    <div>{params.query}</div>
  )
}

export default MovieSearch