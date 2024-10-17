import states from '../../States';

function SpotFormPage () {

  return (
    <div>
      <div className="div-spotForm">
        <form>
          <div>
            <label className="spotForm-inputLabel">Address</label>
            <input type="text"/>
          </div>

          <div>
            <label className="spotForm-inputLabel">City</label>
            <input type="text"/>
          </div>

          <div>
            <label className="spotForm-inputLabel">State</label>
            {states()}
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
            <input type="text"/>
          </div>

          <div>
            <label className="spotForm-inputLabel">lng</label>
            <input type="text"/>
          </div>

          <div>
            <label className="spotForm-inputLabel">Description</label>
            <textarea></textarea>
          </div>

          <div>
            <label className="spotForm-inputLabel">Price</label>
            <input type="text"></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SpotFormPage;