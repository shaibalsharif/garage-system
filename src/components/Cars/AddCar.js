const AddCar = () => {
    return <div class="container">
            <h2>Car Entry Form</h2>
            <div class="card">
                <div class="card-body">
                    <form oSubmit="submitCar()">

                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="cate">Customer Reg. No.</label>
                                <select className="form-control" id="cate" name="customer" >
                                    <option ></option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="Name">Car Barnd</label>
                                <input type="text" className="form-control" id="Name" name="brand" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="model">Car Model</label>
                                <input type="text" className="form-control" id="model" name="model" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="reg">Car No. Plate</label>
                                <input type="text" className="form-control" id="reg" name="carRegNo" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="dob">Entry Time</label>
                                <input type="time" className="form-control" id="dob" name="entryTime" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="qunt">Color</label>
                                <input type="text" className="form-control" id="qunt" name="color" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="buy">Engin No.</label>
                                <input type="text" className="form-control" id="buy" name="enginNo" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="sell">Emrgency Contact</label>
                                <input type="text" className="form-control" id="sell" name="emrgencyContact" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Initial Problem <small>(optional)</small></label>
                            <textarea type="text" className="form-control" id="endDate" name="initProblem" defaultValue={""} />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
};

export default AddCar;
