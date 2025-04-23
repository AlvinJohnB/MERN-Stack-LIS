import React from 'react';

export default function TestForm({ handleSubmit, type, test = {} }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row justify-content-center">
        {/* Left section */}
        <div className="col-12 col-md-5 mx-md-3 mb-4">
          <div className="form-group">
            <label htmlFor="name">Test Name</label>
            <input
              required
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Enter test name"
              defaultValue={test.name || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="testcode">Test Code</label>
            <input
              required
              type="text"
              name="testcode"
              className="form-control"
              id="testcode"
              placeholder="Test code"
              defaultValue={test.testcode || ''}
            />
            <small className="form-text text-muted">
              Test code should be unique for each test.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="section" className="form-label">Section</label>
            <select
              className="form-select"
              name="section"
              id="section"
              defaultValue={test.section || 'Select one'}
            >
              <option disabled>Select one</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Hematology">Hematology</option>
              <option value="Clinical Microscopy">Clinical Microscopy</option>
              <option value="Serology">Serology</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              name="unit"
              className="form-control"
              id="unit"
              placeholder="Enter unit"
              defaultValue={test.unit || ''}
            />
            <small className="form-text text-muted">Leave as blank if none.</small>
          </div>

          <div className="form-group">
            <label htmlFor="options">Options</label>
            <input
              type="text"
              name="options"
              className="form-control"
              id="options"
              placeholder="Enter options"
              defaultValue={test.options || ''}
            />
            <small className="form-text text-muted">
              If results expected is Negative or Positive, enter "Positive,Negative".
            </small>
          </div>
        </div>

        {/* Right section */}
        <div className="col-12 col-md-5 mx-md-3 mb-4">
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              required
              type="text"
              name="price"
              className="form-control"
              id="price"
              placeholder="Enter price"
              defaultValue={test.price || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="discounted_price">Discounted Price</label>
            <input
              type="text"
              name="discounted_price"
              className="form-control"
              id="discounted_price"
              placeholder="Enter discounted price"
              defaultValue={test.discounted_price || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reference_value_male">Reference Value for Male</label>
            <input
              type="text"
              name="reference_value_male"
              className="form-control"
              id="reference_value_male"
              placeholder="Enter reference value for male"
              defaultValue={test.reference_value_male || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reference_value_female">Reference Value for Female</label>
            <input
              type="text"
              name="reference_value_female"
              className="form-control"
              id="reference_value_female"
              placeholder="Enter reference value for female"
              defaultValue={test.reference_value_female || ''}
            />
          </div>

          <div className="form-check mt-3">
            <input
              type="checkbox"
              name="show"
              className="form-check-input"
              id="show"
              defaultChecked={test.show || false}
            />
            <label className="form-check-label" htmlFor="show">
              Show in test list?
            </label>
          </div>

          <div>
            <button type="submit" className="btn btn-primary mt-3">
              {type === 'add' ? 'Add Test' : 'Update Test'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}