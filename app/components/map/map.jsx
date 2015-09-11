import React, {PropTypes, Component} from 'react/addons';
import Marker from './marker';
import { connect, Provider } from 'react-redux';
import { fetchParks } from './actions';

import GoogleMap from 'google-map-react';
import Picker from './picker';

export default class SimpleMapPage extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className='test'>
        <Picker value='CA'
                onChange={this.handleChange}
                options={['CA', 'IN', 'GA', 'NY']} />
         <GoogleMap
          // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
          center={this.props.center}
          zoom={this.props.zoom}>
          {this.props.parks.map((Park, i) =>
            <Marker lat={Park.lat} lng={Park.lng} text={Park.title} />
          )}
        </GoogleMap>
      </div>
    );
  }

  handleChange(val) {
    this.props.dispatch(fetchParks(val));
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchParks('CA'));
  }
  // componentWillReceiveProps(nextProps) {
  //   const { dispatch } = nextProps;
  //
  //   dispatch(fetchParks());
  // }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return state.fetchParks
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(SimpleMapPage);
