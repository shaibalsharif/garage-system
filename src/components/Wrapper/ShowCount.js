const ShowCount = ({bg, title, iname, count}) => {
  return  <div className="col-sm-2 col-md-3" >
  <div className={`card bg-${bg} text-white`}>
      <div className="card-body">
          <div className="row">
              <div className="col-3"><h3><i className={`fa fa-${iname}`} /></h3></div>
              <div className="col-9">
                  <h4>{title}</h4>
                  <h4>{count}</h4>
              </div>
          </div>
      </div>
  </div>
</div>
};

export default ShowCount;
