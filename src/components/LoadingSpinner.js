import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <Spinner animation='border'>
      <span className='visually-hidden'/>
    </Spinner>
  )
}

export default LoadingSpinner