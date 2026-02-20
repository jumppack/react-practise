
import './App.css'
import Carousel from './components/Carousel'

function App() {
  const PICSUM_API_URL = 'https://picsum.photos/v2/list';

  return (
    <>
      <h1>Image Carousel</h1>
      <div className="card">
        <Carousel url={PICSUM_API_URL} limit={10} />
      </div>
      <p className="read-the-docs">
        Click on the arrows to navigate through the images.
      </p>
    </>
  )
}

export default App
