import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as spotActions from '../../../store/spots';
import './EditSpots.css'

function EditSpots({ spotId }) {
  const [errors, setErrors] = useState({});
  const spots = useSelector((state) => state.spots.spots)
  const spot = spots.find((data) => data.id === Number(spotId));
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
    price: "",
  });
  const [photoUrl, setPhotoUrl] = useState({
    url01: "",
    url02: "",
    url03: "",
    url04: "",
    url05: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const { address, lng, lat, city, state, country, description, price, name} = formData;

    setErrors(() => {
      const err = {};
      if (description !== "" && description.length < 30) {
        err.description = "Description must be at least 30 characters"
      }

      return err;
    })

    return dispatch(
      spotActions.editSpot({
        address: address !== "" ? address : spot.address,
        city: city !== "" ? city : spot.city,
        state: state !== "" ? state : spot.state,
        country: country !== "" ? country : spot.country,
        name: name !== "" ? name : spot.name,
        lat: lat !== "" ? lat : spot.lat,
        lng: lng !== "" ? lng : spot.lng,
        description: description !== "" ? description : spot.description,
        price: price !== "" ? price : spot.price,
    }))
    .then((response) => {
        dispatch(spotActions.addSpotImage(response.id, photoUrl.url01));
    }) 
    .catch(async (res) => {
      const data = await res.json();
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

  const handleChangeURL = (e) => {
    const { name, value } = e.target;

    setPhotoUrl({
      ...photoUrl,
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
        <h2>Update Spot</h2>
        <form className="spotForm" onSubmit={(e) => handleSubmit(e)}>
          <div className='div-SF-location'>
            <h4 className='SF-title'>Where's your place located?</h4>
            <p className="SF-caption"><small>Guests will only get your exact address once they booked a reservation.</small></p>
            <div className="div-inputSpotForm">
              <label className="spotForm-inputLabel">Address</label> {errors.address && <p className='SFL-addressError'>{errors.address}</p>}
              <input type="text" name="address" className="formInput formInput01" value={formData.address} onChange={(e) => handleChange(e)}/>
            </div>
            <div className='div-SF-cityState div-inputSpotForm'>
              <div className="">
                <label className="SFIL-02">City</label> {errors.city && <p className='SFL-cityStateError'>{errors.city}</p>}
                <input type="text" name="city" className="formInput formInputCity" value={formData.city} onChange={(e) => handleChange(e)}/>
              </div>
              <h2 className="SFI-h2">,</h2>
              <div className="">
                <label className="SFIL-02">State</label> {errors.state && <p className='SFL-cityStateError'>{errors.state}</p>}
                <input type="text" name="state" className="formInput" value={formData.state} onChange={(e) => handleChange(e)}/>
              </div>
            </div>
            <div className="div-inputSpotForm">
              <label className="spotForm-inputLabel">Country </label> {errors.country && <p className="SFL-countryError">{errors.country}</p>}
              <input type="text" value={formData.country} name="country" className="formInput formInput01" onChange={(e) => handleChange(e)}/>
            </div>
            <div className="div-SF-coordinates div-inputSpotForm" >
              <div className="div-SFIL03">
                <label className="SFIL-02">Latitude</label>
                <input type="text" name="lat" className="formInput formInput03" value={formData.lat} onChange={(e) => handleChange(e)}/>
              </div>
              <h2 className="SFI-h2">,</h2>
              <div className="div-SFIL03">
                <label className="SFIL-02">Longitude</label>
                <input type="text" name="lng" className="formInput formInput03" value={formData.lng} onChange={(e) => handleChange(e)}/>
              </div>
            </div>
          </div>

          <div className='div-SF-description'>
            <h4 className='SF-title'>Describe your place to guests</h4>
            <p className="SF-caption"><small>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</small></p>
            <div className="div-inputSpotForm">
              <label className="SFL-07">Description</label> {errors.description && <p className='SFL-descriptionError'>{errors.description}</p>}
              <textarea name="description" className="formInput formInput07" value={formData.description} onChange={(e) => handleChange(e)}
              placeholder='Please write at least 30 characters'></textarea>
            </div>
          </div>

          <div>
            <h4 className='SF-title'>Create a title for your spot</h4>
            <p className="SF-caption"><small>Catch guests' attention with a spot title that highlights what makes your place special.</small></p>
            <div className="div-inputSpotForm">
              <label className="spotForm-inputLabel">Name</label> {errors.name && <p className='SFL-nameError'>{errors.name}</p>}
              <input type="text" name="name" className="formInput formInput01" value={formData.name} onChange={(e) => handleChange(e)} 
              placeholder='Name of your spot'/>
            </div>
          </div>

          <div>
            <h4 className='SF-title'>Set a base price for yout spot</h4>
            <p className="SF-caption"><small>Competitive pricing can help your listing stand out and rank higher in search results.</small></p>
            <div className="div-inputSpotForm">
              <label className="spotForm-inputLabel">Price</label> {errors.price && <p className='SFL-priceError'>{errors.price}</p>}
              <input type="text" name="price" className="formInput formInput01" value={formData.price} onChange={(e) => handleChange(e)}
              placeholder='Price per night (USD)'/>
            </div>
          </div>

          <div>
            <h4 className='SF-title'>Liven up your spot with photos</h4>
            <p className="SF-caption"><small>Submit a link to at least one photo to publish your spot.</small></p>
              <div className="div-ISF-URL">
                <label className="SF-image">Preview image URL</label> {errors.image && <p className='SFL-imageError'>Image is required</p>}
                <input type="text" name="url01" className="formInput formInput01" value={photoUrl.url01} onChange={(e) => handleChangeURL(e)}
                placeholder='Preview Image URL'/>
              </div>

              <div className="div-ISF-URL">
                <label className="SF-image">Image URL</label> {errors.image && <p className='SFL-imageError'>Image is required</p>}
                <input type="text" name="url02" className="formInput formInput01" value={photoUrl.url02} onChange={(e) => handleChangeURL(e)}
                placeholder='Image URL'/>
              </div>

              <div className="div-ISF-URL">
                <label className="SF-image">Image URL</label> {errors.image && <p className='SFL-imageError'>Image is required</p>}
                <input type="text" name="url03" className="formInput formInput01" value={photoUrl.url03} onChange={(e) => handleChangeURL(e)}
                placeholder='Image URL'/>
              </div>

              <div className="div-ISF-URL">
                <label className="SF-image">Image URL</label> {errors.image && <p className='SFL-imageError'>Image is required</p>}
                <input type="text" name="url04" className="formInput formInput01" value={photoUrl.url04} onChange={(e) => handleChangeURL(e)}
                placeholder='Image URL'/>
              </div>

              <div className="div-ISF-URL">
                <label className="SF-image">Image URL</label> {errors.image && <p className='SFL-imageError'>Image is required</p>}
                <input type="text" name="url05" className="formInput formInput01" value={photoUrl.url05} onChange={(e) => handleChangeURL(e)}
                placeholder='Image URL'/>
              </div>
          </div>

          <div className="div-inputSpotForm div-ISF-button">
            <button type="submit" className="spotFormButton">Create Spot</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSpots;