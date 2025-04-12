import Cliploader from 'react-spinners/CircleLoader'

const override = {
    display: 'block',
    margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <Cliploader
    color='#4338ca'
    loading={loading}
    cssOverride={override}
    />
  )
}

export default Spinner