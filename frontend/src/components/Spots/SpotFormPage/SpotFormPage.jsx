import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as spotActions from '../../../store/spots';

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
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { address, lng, lat, city, state, country, description, price, name} = formData;

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
        price
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
    <div>
      <div className="div-spotForm">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="spotForm-inputLabel">Address</label>
            <input type="text" name="address" value={formData.address} onChange={(e) => handleChange(e)}/>
          </div>

          <div>
            <label className="spotForm-inputLabel">City</label>
            <input type="text" name="city" value={formData.city} onChange={(e) => handleChange(e)}/>
          </div>

          <div>
            <label className="spotForm-inputLabel">State</label>
            <select name="state" value={formData.state} onChange={(e) => handleChange(e)}>
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
          </div>

          <div>
            <label className="spotForm-inputLabel">Country</label>
            <select value={formData.country} name="country" onChange={(e) => handleChange(e)}>
              <option>Select a country...</option>
              <option>United States</option>
            </select>
          </div>

          <div>
            <label className="spotForm-inputLabel">Name</label>
            <input type="text" name="name" value={formData.name} onChange={(e) => handleChange(e)}/>
          </div>

          <div>
            <label className="spotForm-inputLabel">lat</label>
            <input type="text" name="lat" value={formData.lat} onChange={(e) => handleChange(e)}/>
          </div>

          <div>
            <label className="spotForm-inputLabel">lng</label>
            <input type="text" name="lng" value={formData.lng} onChange={(e) => handleChange(e)}/>
          </div>

          <div>
            <label className="spotForm-inputLabel">Description</label>
            <textarea name="description" value={formData.description} onChange={(e) => handleChange(e)}></textarea>
          </div>

          <div>
            <label className="spotForm-inputLabel">Price</label>
            <input type="text" name="price" value={formData.price} onChange={(e) => handleChange(e)}></input>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SpotFormPage;