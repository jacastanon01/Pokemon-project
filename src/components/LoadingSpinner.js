import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <Spinner animation='border' className='d-block m-auto'>
      <span className='visually-hidden'/>
    </Spinner>
  )
}

export default LoadingSpinner