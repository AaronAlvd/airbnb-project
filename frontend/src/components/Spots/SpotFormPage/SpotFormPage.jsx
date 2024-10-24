import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as spotActions from '../../../store/spots';
import './SpotFormPage.css';

function SpotFormPage () {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { address, lng, lat, city, state, country, description, price, name} = formData;

    setErrors({
      address: address === "",
      city: city === "",
      state: state === "",
      description: description === "",
      price: price === "",
      name: name === "",
    })

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
    .then(() => {
      if (!errors.address || !errors.state || !errors.city || !errors.price || !errors.description || !errors.name) {
        navigate('/');
      }
      console.log(formData)
    }) 
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  return (
    <div className='outerDiv-spotForm'>
      <div className="div-spotForm">
        <form className="spotForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="div-inputSpotForm">
            <label className="spotForm-inputLabel">Address</label> {errors.address && <p className='SFL-addressError'>Address is required</p>}
            <input type="text" name="address" className="formInput formInput01" value={formData.address} onChange={(e) => handleChange(e)}/>
          </div>

          <div className='div-spotFormLocation div-inputSpotForm'>
            <div className="">
              <label className="SFIL-02">City</label> {errors.city && <p className='SFL-cityStateError'>City is required</p>}
              <input type="text" name="city" className="formInput formInputCity" value={formData.city} onChange={(e) => handleChange(e)}/>
            </div>
            <h2 className="SFI-h2">,</h2>
            <div className="">
              <label className="SFIL-02">State</label> {errors.state && <p className='SFL-cityStateError'>State is required</p>}
              <input type="text" name="state" className="formInput" value={formData.state} onChange={(e) => handleChange(e)}/>
            </div>
          </div>

          <div className="div-inputSpotForm">
            <label className="spotForm-inputLabel">Country </label> {errors.country && <p className="SFL-countryError">Country is required</p>}
            <input type="text" value={formData.country} name="country" className="formInput formInput01" onChange={(e) => handleChange(e)}/>
          </div>

          <div className="div-inputSpotForm03" >
            <div className="">
              <label className="SFIL-02">lat</label> 
              <input type="text" name="lat" className="formInput formInput03" value={formData.lat} onChange={(e) => handleChange(e)}/>
            </div>
            <h2 className="SFI-h2">,</h2>
            <div className="">
              <label className="SFIL-02">lng</label>
              <input type="text" name="lng" className="formInput formInput03" value={formData.lng} onChange={(e) => handleChange(e)}/>
            </div>
          </div>

          <div className="div-inputSpotForm">
            <label className="spotForm-inputLabel">Name</label> {errors.name && <p className='SFL-nameError'>Name is required</p>}
            <input type="text" name="name" className="formInput formInput01" value={formData.name} onChange={(e) => handleChange(e)}/>
          </div>

          <div className="div-inputSpotForm">
            <label className="SFL-07">Description</label> {errors.description && <p className='SFL-descriptionError'>Description is required</p>}
            <textarea name="description" className="formInput formInput07" value={formData.description} onChange={(e) => handleChange(e)}></textarea>
          </div>

          <div className="div-inputSpotForm">
            <label className="spotForm-inputLabel">Price</label> {errors.price && <p className='SFL-priceError'>Price is required</p>}
            <input type="text" name="price" className="formInput formInput01" value={formData.price} onChange={(e) => handleChange(e)}></input>
          </div>

          <div className="div-inputSpotForm div-ISF-button">
            <button type="submit" className="spotFormButton">Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SpotFormPage;