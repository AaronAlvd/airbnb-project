import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as spotActions from '../../../store/spots';
import './SpotFormPage.css'

function SpotFormPage () {
  

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    name: "",
    lat: "",
    lng: "",
    description: "",
    price: ""
  })
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { address, lng, lat, city, state, country, description, price, name, imageUrl} = formData;

    return dispatch(
      spotActions.createSpot({
        address,
        city,
        state,
        country,
        name,
        lat,
        lng,
        description,
        price,
        imageUrl, // New field for the image URL
    }))
    .then(() => console.log(formData)) 
    .catch(async (res) => {
      const data = await res.json();
      if (data?.errors) {
        setErrors(data.errors);

    }
    });
  }

  const handleChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div className='form-container'>
      <div className="div-spotForm">
        <form onSubmit={(e) => handleSubmit(e)}>

         {/* Displaying errors if any */}
         {errors && Object.keys(errors).map((key, index) => (
            <div key={index} className="error-message">{errors[key]}</div>
          ))}

        <div className='location'>
          <div className='spacer'>
            <p className='form-header'>Where&apos;s your place located?</p>
            <p className='form-sub-header'>Guest will only get your exact location once they&apos;ve booked a reservation.</p>
          </div>
          <div className='spacer'>
                      <label className="spotForm-inputLabel">Country</label> </div>
                      <select className='scroll-input' value={formData.country} name="country" onChange={(e) => handleChange(e)}>
                          <option value="">Select a country...</option>
                          <option value="United States">United States</option>
                      </select>

                    <div className='spacer'>
            <label className="spotForm-inputLabel">State</label></div>
            <select className='scroll-input' name="state" value={formData.state} onChange={(e) => handleChange(e)}>
              <option value="">Select a state...</option> <option value="AL">Alabama</option> <option value="AK">Alaska</option> 
              <option value="AZ">Arizona</option> <option value="AR">Arkansas</option> <option value="CA">California</option>
              <option value="CO">Colorado</option> <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option> <option value="FL">Florida</option><option value="GA">Georgia</option> 
              <option value="HI">Hawaii</option> <option value="ID">Idaho</option>  <option value="IL">Illinois</option>
              <option value="IN">Indiana</option> <option value="IA">Iowa</option> <option value="KS">Kansas</option> 
              <option value="KY">Kentucky</option> <option value="LA">Louisiana</option> <option value="ME">Maine</option>
              <option value="MD">Maryland</option> <option value="MA">Massachusetts</option> <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option> <option value="MS">Mississippi</option>< option value="MO">Missouri</option>
              <option value="MT">Montana</option> <option value="NE">Nebraska</option> <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option> <option value="NJ">New Jersey</option> <option value="NM">New Mexico</option> 
              <option value="NY">New York</option> <option value="NC">North Carolina</option> <option value="ND">North Dakota</option> 
              <option value="OH">Ohio</option> <option value="OK">Oklahoma</option> <option value="OR">Oregon</option> 
              <option value="PA">Pennsylvania</option> <option value="RI">Rhode Island</option> <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option> <option value="TN">Tennessee</option> <option value="TX">Texas</option> 
              <option value="UT">Utah</option> <option value="VT">Vermont</option> <option value="VA">Virginia</option> 
              <option value="WA">Washington</option> <option value="WV">West Virginia</option> <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          

          <div className='spacer'>

            <label className="spotForm-inputLabel" >Address</label>
            </div>
            <input type="text" name="address" placeholder='Address' value={formData.address} onChange={(e) => handleChange(e)}/>
          

          <div className='spacer'>
            <label className="spotForm-inputLabel">City</label>
          </div>
          <input type="text" placeholder='City' name="city" value={formData.city} onChange={(e) => handleChange(e)}/>
          

         
          

          <div className='spacer'> 
            <label className="spotForm-inputLabel">Name</label>
            </div>
            <input type="text" placeholder='Name' name="name" value={formData.name} onChange={(e) => handleChange(e)}/>
          
          <div id="latlng-box">

              <div id="lat-box">
                <div>
                  <label id="lat-header"className="spotForm-inputLabel">Latitude</label> 
                </div>
                <input id="lat" type="number" placeholder='Lat' name="lat" value={formData.lat} onChange={(e) => handleChange(e)}/>
              </div>
              
              <div id="lng-box">
                <div>
                  <label id="lng-header"className="spotForm-inputLabel">Longitude</label>
                </div>
                  <input id="lng" type="number" placeholder='Lng' name="lng" value={formData.lng} onChange={(e) => handleChange(e)}/>
                </div>
              </div>

          </div> 

          <div className='spacer'>
            <p className='form-header'>Describe your place to a guest.</p> 
            </div>
            <p className='form-sub-header'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

         
          <div id="spot-form-description-box">
              <div className='spacer'>
                <label className="spotForm-inputLabel">Description</label>
              </div>
              <textarea id="location-description" placeholder="Please write at least 30 characters."name="description" value={formData.description} onChange={(e) => handleChange(e)}></textarea>
          </div>

          <div id="spot-form-price-box">
              <div className='spacer'>
                <label className="spotForm-inputLabel">Price</label>
                </div>
                <input id="spot-form-price-input" type="number" placeholder="Price" name="price" value={formData.price} min="0" onChange={(e) => handleChange(e)}></input>
          </div>

          <div className='spacer'>
            <label className="spotForm-inputLabel">Image URL</label>
          </div>
          <input
            type="text"
            name="imageUrl"
            placeholder="Enter image URL"
            value={formData.imageUrl}
            onChange={(e) => handleChange(e)}
          />


          <div id="spot-form-submit-button-box">
              <div className='spacer'>
                <button id="spot-form-submit-button"type="submit">Submit</button>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SpotFormPage;