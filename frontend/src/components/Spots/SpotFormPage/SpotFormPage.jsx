import States from '../../States';
import { useState } from 'react';

function SpotFormPage () {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
    description: "",
    price: ""
  })

  const handleSubmit = () => {

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
        <form>
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
            <States value={formData.state} onChange={(e) => handleChange(e)}/>
          </div>

          <div>
            <label className="spotForm-inputLabel">Country</label>
            <select>
              <option>Select a country...</option>
              <option>United States</option>
            </select>
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
            <button onClick={() => handleSubmit()}>Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SpotFormPage;